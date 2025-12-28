import { Router } from 'express'
import { pool } from '../db.js';
import { Result } from 'pg';

const router = Router();


router.get("/users", async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM users');
  res.json(rows);
});




router.get('/users/:id', async (req, res) => {
  const { id } = req.params
  const { rows } = await pool.query('SELECT * FROM users WHERE id  = $1', [id]);

  if (rows.length === 0) {
    return res.status(404).json({ message: "usuario no encontrado" });

  }

  res.json(rows)
});







router.post('/users', async (req, res) => {
  const { name, email } = req.body;

  // Validación básica
  if (!name || !email) {
    return res.status(400).json({
      message: "Name y email son obligatorios"
    });
  }

  const result = await pool.query(
    'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
    [name, email]
  );

  res.status(201).json(result.rows[0]);
});










router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  const result = await pool.query('DELETE FROM users WHERE id = $1', [id] );

  if (result.rowCount === 0) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  return res.json({
    message: "User deleted"
  });
});







router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const result = await pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
      [name, email, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({
      message: 'Usuario actualizado',
      user: result.rows[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar usuario' });
  }
});







export default router;
