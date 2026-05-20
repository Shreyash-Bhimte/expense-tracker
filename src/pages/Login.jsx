// Login page — email/password form UI.
// Auth logic wired up in Commit 4.

import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Auth.module.css';

function Login() {
  // Controlled inputs — each keystroke updates state, input always reflects state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    // Prevent browser's default form submission (page reload)
    e.preventDefault();
    console.log('Login submitted:', { email, password });
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Welcome back</h1>
        <p className={styles.subtitle}>Sign in to your expense tracker</p>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className={styles.input}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className={styles.input}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.button}>
            Sign in
          </button>
        </form>

        <p className={styles.switchText}>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;