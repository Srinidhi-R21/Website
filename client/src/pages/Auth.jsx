import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function Auth() {
  const [isSignup, setIsSignup] = useState(false)
  const navigate = useNavigate()

  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [signupData, setSignupData] = useState({ name: '', phone: '', email: '', password: '' })

  function handleLoginSubmit(e) {
    e.preventDefault()
    // Fake auth: simply navigate to list
    navigate('/list')
  }

  function handleSignupSubmit(e) {
    e.preventDefault()
    // Fake signup: simply navigate to list
    navigate('/list')
  }

  return (
    <div style={{ maxWidth: 480, margin: '3rem auto', padding: '1.5rem', border: '1px solid #ddd', borderRadius: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h2 style={{ margin: 0 }}>{isSignup ? 'Sign Up' : 'Login'}</h2>
        <Link to="/">Home</Link>
      </div>

      {!isSignup ? (
        <form onSubmit={handleLoginSubmit}>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            <label>
              <div>Email</div>
              <input type="email" value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} required />
            </label>
            <label>
              <div>Password</div>
              <input type="password" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} required />
            </label>
            <button type="submit">Login</button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSignupSubmit}>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            <label>
              <div>Name</div>
              <input type="text" value={signupData.name} onChange={(e) => setSignupData({ ...signupData, name: e.target.value })} required />
            </label>
            <label>
              <div>Phone</div>
              <input type="tel" value={signupData.phone} onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })} required />
            </label>
            <label>
              <div>Email</div>
              <input type="email" value={signupData.email} onChange={(e) => setSignupData({ ...signupData, email: e.target.value })} required />
            </label>
            <label>
              <div>Password</div>
              <input type="password" value={signupData.password} onChange={(e) => setSignupData({ ...signupData, password: e.target.value })} required />
            </label>
            <button type="submit">Sign Up</button>
          </div>
        </form>
      )}

      <div style={{ marginTop: '1rem' }}>
        {isSignup ? 'Already have an account?' : "Don't have an account?"} {' '}
        <button onClick={() => setIsSignup((v) => !v)} style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', padding: 0 }}>
          {isSignup ? 'Login' : 'Sign Up'}
        </button>
      </div>
    </div>
  )
}