// Signup page — email/password registration form UI.
// Auth logic wired up in Commit 4.

import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Auth.module.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    console.log('Signup submitted:', { email, password, confirmPassword });
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Create account</h1>
        <p className={styles.subtitle}>Start tracking your expenses</p>

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
              placeholder="Min. 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="confirmPassword">Confirm password</label>
            <input
              id="confirmPassword"
              type="password"
              className={styles.input}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.button}>
            Create account
          </button>
        </form>

        <p className={styles.switchText}>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;