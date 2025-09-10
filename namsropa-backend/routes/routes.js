import express from "express";
import { createUser, getAllUsers, getUserById, updateUserById } from "../controller/userController.js";
const router = express.Router();
// User routes
router.post('/user', createUser);
router.get('/users', getAllUsers);
router.get('/user/:id', getUserById);
router.put('/user/:id', updateUserById);
export default router;