const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

// In-memory store
let contacts = [];
let nextId = 1;

// Auth endpoints (dummy)
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  return res.json({ message: 'Login successful', user: { email } });
});

app.post('/api/auth/signup', (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email and password are required' });
  }
  return res.json({ message: 'Signup successful', user: { name, email } });
});

// Contacts endpoints
app.get('/api/contacts', (req, res) => {
  res.json(contacts);
});

app.post('/api/contacts', (req, res) => {
  const { name, phone, email } = req.body || {};
  if (!name || !phone || !email) {
    return res.status(400).json({ message: 'Name, phone, and email are required' });
  }
  const newContact = { id: nextId++, name, phone, email };
  contacts.push(newContact);
  res.status(201).json(newContact);
});

app.delete('/api/contacts/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = contacts.findIndex((c) => c.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Contact not found' });
  }
  const [removed] = contacts.splice(index, 1);
  res.json(removed);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});