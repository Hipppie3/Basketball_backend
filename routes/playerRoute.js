import express from 'express';
import { addPlayer, getAllPlayers, getPlayer } from '../controllers/playerController.js'; 

const router = express.Router();

router.get('/', getAllPlayers);
router.get('/:id', getPlayer);
router.post('/', addPlayer);

export default router;