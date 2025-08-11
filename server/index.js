import express from 'express'
import cors from 'cors'
import { v4 as uuidv4 } from 'uuid'

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

// In-memory store for contacts
const contacts = []

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.get('/api/contacts', (req, res) => {
  res.json(contacts)
})

app.post('/api/contacts', (req, res) => {
  const { name, phone, email } = req.body || {}
  if (!name || !phone || !email) {
    return res.status(400).json({ error: 'name, phone, and email are required' })
  }
  const newContact = { id: uuidv4(), name, phone, email }
  contacts.push(newContact)
  res.status(201).json(newContact)
})

app.delete('/api/contacts/:id', (req, res) => {
  const { id } = req.params
  const index = contacts.findIndex(c => c.id === id)
  if (index === -1) {
    return res.status(404).json({ error: 'not found' })
  }
  const [removed] = contacts.splice(index, 1)
  res.json(removed)
})

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})