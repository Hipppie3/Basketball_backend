import express from 'express';
import { addUser, getAllUsers, getUser, deleteUser } from '../controllers/users.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUser);
router.post('/', addUser);
router.delete('/:id', deleteUser);

export default router;