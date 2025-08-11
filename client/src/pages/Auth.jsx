import { useState } from 'react'
import axios from 'axios'

export default function Auth() {
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    try {
      if (mode === 'login') {
        const res = await axios.post('/api/auth/login', {
          email: form.email,
          password: form.password,
        })
        setMessage(res.data.message || 'Logged in')
      } else {
        const res = await axios.post('/api/auth/signup', {
          name: form.name,
          email: form.email,
          password: form.password,
        })
        setMessage(res.data.message || 'Signed up')
      }
    } catch (err) {
      setMessage(err?.response?.data?.message || 'Request failed')
    }
  }

  return (
    <div style={{ maxWidth: 420 }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button
          onClick={() => setMode('login')}
          style={{ padding: '8px 12px', background: mode === 'login' ? '#2563eb' : '#e5e7eb', color: mode === 'login' ? 'white' : 'black', borderRadius: 6 }}
        >Login</button>
        <button
          onClick={() => setMode('signup')}
          style={{ padding: '8px 12px', background: mode === 'signup' ? '#2563eb' : '#e5e7eb', color: mode === 'signup' ? 'white' : 'black', borderRadius: 6 }}
        >Sign up</button>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
        {mode === 'signup' && (
          <div>
            <label>Name</label>
            <input name="name" value={form.name} onChange={handleChange} required style={{ width: '100%', padding: 8 }} />
          </div>
        )}
        <div>
          <label>Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required style={{ width: '100%', padding: 8 }} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required style={{ width: '100%', padding: 8 }} />
        </div>
        <button type="submit" style={{ padding: '10px 12px', background: '#16a34a', color: 'white', borderRadius: 6 }}>
          {mode === 'login' ? 'Login' : 'Sign up'}
        </button>
      </form>

      {message && <p style={{ marginTop: 12 }}>{message}</p>}
    </div>
  )
}