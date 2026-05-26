import * as AuthService from "../services/authService.js";

export async function register(req, res, next) {
  try {
    const id = await AuthService.register(req.body);
    res.json({ message: "Register success", userId: id });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const result = await AuthService.login(req.body);

    if (!result) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login success",
      token: result.token,
      user: result.user,
    });
  } catch (err) {
    next(err);
  }
}
