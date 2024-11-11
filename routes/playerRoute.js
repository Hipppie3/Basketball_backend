import express from 'express';
import { addPlayer, getAllPlayers, getPlayer, deletePlayer } from '../controllers/playerController.js'; 

const router = express.Router();

router.get('/', getAllPlayers);
router.get('/:id', getPlayer);
router.post('/', addPlayer);
router.delete('/:id', deletePlayer)

export default router;