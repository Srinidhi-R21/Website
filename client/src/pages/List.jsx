import { useEffect, useState } from 'react'
import axios from 'axios'

export default function List() {
  const [form, setForm] = useState({ name: '', phone: '', email: '' })
  const [items, setItems] = useState([])
  const [error, setError] = useState('')

  const load = async () => {
    const res = await axios.get('/api/contacts')
    setItems(res.data)
  }

  useEffect(() => {
    load()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await axios.post('/api/contacts', form)
      setItems((prev) => [...prev, res.data])
      setForm({ name: '', phone: '', email: '' })
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to save')
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/contacts/${id}`)
      setItems((prev) => prev.filter((i) => i.id !== id))
    } catch (err) {
      setError('Failed to delete')
    }
  }

  return (
    <div>
      <form onSubmit={handleSave} style={{ display: 'grid', gap: 12, maxWidth: 520 }}>
        <div>
          <label>Name</label>
          <input name="name" value={form.name} onChange={handleChange} required style={{ width: '100%', padding: 8 }} />
        </div>
        <div>
          <label>Phone</label>
          <input name="phone" value={form.phone} onChange={handleChange} required style={{ width: '100%', padding: 8 }} />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required style={{ width: '100%', padding: 8 }} />
        </div>
        <button type="submit" style={{ padding: '10px 12px', background: '#2563eb', color: 'white', borderRadius: 6 }}>Save</button>
      </form>

      {error && <p style={{ color: 'red', marginTop: 8 }}>{error}</p>}

      <div style={{ marginTop: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: 8 }}>Name</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: 8 }}>Phone</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: 8 }}>Email</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: 8 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td style={{ padding: 8 }}>{item.name}</td>
                <td style={{ padding: 8 }}>{item.phone}</td>
                <td style={{ padding: 8 }}>{item.email}</td>
                <td style={{ padding: 8 }}>
                  <button onClick={() => handleDelete(item.id)} style={{ padding: '6px 10px', background: '#dc2626', color: 'white', borderRadius: 6 }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}