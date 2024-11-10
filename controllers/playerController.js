import Player from '../models/player.js';

export const addPlayer = async (req, res) => {
 const { firstName, lastName } = req.body;
 try {
  const newPlayer = await Player.create({firstName, lastName});
  res.status(201).json(newPlayer);
 } catch (error) {
  console.error('Error creating player:', error);
  res.status(500).json({error: "Error creating player"});
 }
};

export const getAllPlayers = async (req, res) => {
 try{
  const players = await Player.findAll();
  res.status(200).json(players);
 } catch (error) {
  console.error('Error getting players:', error);
  res.status(500).json({error: "Error getting players"});
 }
};

export const getPlayer = async (req, res) => {
 const {id} = req.params;
 try {
  const player = await Player.findByPk(id);
  if(!player) {
   return res.status(404).json({error: "Player not found"});
  }
  res.status(200).json(player);
 } catch (error) {
  console.error('Error retrieving player:', error);
  res.status(500).json({error: "Error retrieving player"});
 }
};
