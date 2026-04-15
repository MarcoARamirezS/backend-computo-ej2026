import { authService } from './auth.service.js'

export class AuthController {
  async login(req, res) {
    const result = await authService.login(req.body)

    return res.status(200).json(result)
  }

  async me(req, res) {
    const userId = req.user?.sub

    const user = await authService.me(userId)

    return res.status(200).json({
      user
    })
  }
}

export const authController = new AuthController()