// Temporary connection test — will be replaced in Commit 3

import { useEffect } from 'react';
import { supabase } from './lib/supabaseClient';

function App() {
  useEffect(() => {
    // Fetches the current auth session — returns null if no user is logged in.
    // A successful response (even null) confirms the Supabase connection works.
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        console.error('Supabase connection error:', error.message);
      } else {
        console.log('Supabase connected. Session:', data.session);
      }
    });
  }, []);

  return (
    <div>
      <h1>Expense Tracker</h1>
      <p>Supabase connection test — check the console.</p>
    </div>
  );
}

export default App;