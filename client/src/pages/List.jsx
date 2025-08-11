import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function List() {
  const [form, setForm] = useState({ name: '', phone: '', email: '' })
  const [items, setItems] = useState([])
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function fetchItems() {
    try {
      setLoading(true)
      const res = await fetch('/api/contacts')
      const data = await res.json()
      setItems(data)
    } catch (e) {
      setError('Failed to load list')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error('Save failed')
      const created = await res.json()
      setItems((prev) => [created, ...prev])
      setForm({ name: '', phone: '', email: '' })
    } catch (e) {
      setError('Failed to save item')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    try {
      const res = await fetch(`/api/contacts/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Delete failed')
      setItems((prev) => prev.filter((x) => x.id !== id))
    } catch (e) {
      setError('Failed to delete item')
    }
  }

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto', padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>List</h2>
        <Link to="/">Home</Link>
      </div>

      <form onSubmit={handleSave} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '0.5rem', alignItems: 'end', marginTop: '1rem' }}>
        <label style={{ display: 'grid', gap: 4 }}>
          <span>Name</span>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </label>
        <label style={{ display: 'grid', gap: 4 }}>
          <span>Phone</span>
          <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
        </label>
        <label style={{ display: 'grid', gap: 4 }}>
          <span>Email</span>
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        </label>
        <button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
      </form>

      {error && <div style={{ color: 'red', marginTop: '0.5rem' }}>{error}</div>}

      <div style={{ marginTop: '1rem' }}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '0.5rem' }}>Name</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '0.5rem' }}>Phone</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '0.5rem' }}>Email</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '0.5rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr><td colSpan={4} style={{ padding: '0.75rem' }}>No items</td></tr>
              ) : (
                items.map(item => (
                  <tr key={item.id}>
                    <td style={{ borderBottom: '1px solid #f0f0f0', padding: '0.5rem' }}>{item.name}</td>
                    <td style={{ borderBottom: '1px solid #f0f0f0', padding: '0.5rem' }}>{item.phone}</td>
                    <td style={{ borderBottom: '1px solid #f0f0f0', padding: '0.5rem' }}>{item.email}</td>
                    <td style={{ borderBottom: '1px solid #f0f0f0', padding: '0.5rem' }}>
                      <button onClick={() => handleDelete(item.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}