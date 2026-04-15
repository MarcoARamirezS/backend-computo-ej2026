import bcrypt from 'bcryptjs'
import { usersRepository } from './users.repository.js'

export class UsersService {
  async list(query) {
    const {
      q = '',
      activo,
      page = 1,
      limit = 10
    } = query

    const allUsers = await usersRepository.findAll()

    let filtered = allUsers

    if (q) {
      const term = q.trim().toLowerCase()

      filtered = filtered.filter((user) => {
        const fullName = `${user.nombre || ''} ${user.apellido || ''}`.trim().toLowerCase()

        return (
          String(user.nombre || '').toLowerCase().includes(term) ||
          String(user.apellido || '').toLowerCase().includes(term) ||
          String(user.email || '').toLowerCase().includes(term) ||
          String(user.usuario || '').toLowerCase().includes(term) ||
          fullName.includes(term)
        )
      })
    }

    if (typeof activo === 'boolean') {
      filtered = filtered.filter((user) => (user.activo ?? true) === activo)
    }

    filtered.sort((a, b) => {
      const aName = `${a.nombre || ''} ${a.apellido || ''}`.trim().toLowerCase()
      const bName = `${b.nombre || ''} ${b.apellido || ''}`.trim().toLowerCase()
      return aName.localeCompare(bName)
    })

    const total = filtered.length
    const start = (page - 1) * limit
    const end = start + limit
    const items = filtered.slice(start, end).map((user) => this.sanitizeUser(user))

    return {
      items,
      total,
      page,
      limit
    }
  }

  async getById(id) {
    const user = await usersRepository.findById(id)

    if (!user) {
      const error = new Error('Usuario no encontrado')
      error.statusCode = 404
      throw error
    }

    return this.sanitizeUser(user)
  }

  async create(payload) {
    const existingByUsuario = await usersRepository.findByUsuario(payload.usuario)

    if (existingByUsuario) {
      const error = new Error('El usuario ya existe')
      error.statusCode = 409
      throw error
    }

    const existingByEmail = await usersRepository.findByEmail(payload.email)

    if (existingByEmail) {
      const error = new Error('El email ya existe')
      error.statusCode = 409
      throw error
    }

    const passwordHash = await bcrypt.hash(payload.password, 10)

    const data = {
      nombre: payload.nombre,
      apellido: payload.apellido,
      email: payload.email,
      usuario: payload.usuario,
      passwordHash,
      role: payload.role || null,
      roleId: payload.roleId || null,
      permissions: Array.isArray(payload.permissions) ? payload.permissions : [],
      activo: payload.activo ?? true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    const created = await usersRepository.create(data)

    return this.sanitizeUser(created)
  }

  async update(id, payload) {
    const currentUser = await usersRepository.findById(id)

    if (!currentUser) {
      const error = new Error('Usuario no encontrado')
      error.statusCode = 404
      throw error
    }

    if (payload.usuario && payload.usuario !== currentUser.usuario) {
      const existingByUsuario = await usersRepository.findByUsuario(payload.usuario)

      if (existingByUsuario && existingByUsuario.id !== id) {
        const error = new Error('El usuario ya existe')
        error.statusCode = 409
        throw error
      }
    }

    if (payload.email && payload.email !== currentUser.email) {
      const existingByEmail = await usersRepository.findByEmail(payload.email)

      if (existingByEmail && existingByEmail.id !== id) {
        const error = new Error('El email ya existe')
        error.statusCode = 409
        throw error
      }
    }

    const data = {
      updatedAt: new Date().toISOString()
    }

    if (payload.nombre !== undefined) data.nombre = payload.nombre
    if (payload.apellido !== undefined) data.apellido = payload.apellido
    if (payload.email !== undefined) data.email = payload.email
    if (payload.usuario !== undefined) data.usuario = payload.usuario
    if (payload.role !== undefined) data.role = payload.role
    if (payload.roleId !== undefined) data.roleId = payload.roleId
    if (payload.permissions !== undefined) data.permissions = payload.permissions
    if (payload.activo !== undefined) data.activo = payload.activo

    if (payload.password) {
      data.passwordHash = await bcrypt.hash(payload.password, 10)
    }

    const updated = await usersRepository.update(id, data)

    return this.sanitizeUser(updated)
  }

  async toggleActive(id, activo) {
    const currentUser = await usersRepository.findById(id)

    if (!currentUser) {
      const error = new Error('Usuario no encontrado')
      error.statusCode = 404
      throw error
    }

    const updated = await usersRepository.update(id, {
      activo,
      updatedAt: new Date().toISOString()
    })

    return this.sanitizeUser(updated)
  }

  async remove(id) {
    const currentUser = await usersRepository.findById(id)

    if (!currentUser) {
      const error = new Error('Usuario no encontrado')
      error.statusCode = 404
      throw error
    }

    await usersRepository.remove(id)

    return {
      success: true
    }
  }

  sanitizeUser(user) {
    return {
      id: user.id,
      nombre: user.nombre || '',
      apellido: user.apellido || '',
      email: user.email || '',
      usuario: user.usuario || '',
      role: user.role || null,
      roleId: user.roleId || null,
      permissions: Array.isArray(user.permissions) ? user.permissions : [],
      activo: user.activo ?? true,
      createdAt: user.createdAt || null,
      updatedAt: user.updatedAt || null
    }
  }
}

export const usersService = new UsersService()