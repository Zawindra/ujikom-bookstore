import * as UserService from "../services/userService.js";

export async function getAllUsers(req, res, next) {
  try {
    const users = await UserService.getAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
}

export async function getUserById(req, res, next) {
  try {
    const user = await UserService.getUserById(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function addUser(req, res, next) {
  try {
    const result = await UserService.addUser(req.body);
    res.json({ message: "User added", result });
  } catch (err) {
    next(err);
  }
}

export async function updateUser(req, res, next) {
  try {
    const result = await UserService.updateUser(req.params.id, req.body);
    res.json({ message: "User updated", result });
  } catch (err) {
    next(err);
  }
}

export async function deleteUser(req, res, next) {
  try {
    const result = await UserService.deleteUser(req.params.id);
    res.json({ message: "User deleted", result });
  } catch (err) {
    next(err);
  }
}
