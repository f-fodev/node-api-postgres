import { Router } from 'express'
import { pool } from '../db.js';

const router = Router();



router.get( "/usersv1", async (req, res) => {
  const {rows} = await pool.query ('SELECT * FROM users');  
  res.json(rows);
});

router.get( "/users", async (req, res) => {
  const {rows} = await pool.query ('SELECT * FROM users');  
  res.json(rows);
});


router.get('/users/:id', (req, res) => {
  const { id } = req.params
  res.send('obteniendo usuario' + id);
});



router.post('/users', (req, res) => {
  res.send('crear usuario')
})



router.delete('/users/:id', (req, res) => {
  res.send('eliminando usuario')
})


router.put('/users/:id', (req, res) => {
  const { id } = req.params
  res.send('actualizando usuarios' + id)
});






export default router;
