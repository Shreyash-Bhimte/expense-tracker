// Custom hook — manages all expense CRUD operations against Supabase.
// All mutations throw on failure so callers can handle errors explicitly.

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from './useAuth';

export function useExpenses() {
  const { user } = useAuth();
  const [expenses, setExpenses]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);

  async function fetchExpenses() {
    if (!user) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const { data, error: fetchError } = await supabase
      .from('expenses')
      .select('*')
      .order('date', { ascending: false });

    if (fetchError) {
      setError(fetchError.message);
    } else {
      setExpenses(data);
    }

    setLoading(false);
  }

  async function addExpense(expenseData) {
    const { error } = await supabase
      .from('expenses')
      .insert([{ ...expenseData, user_id: user.id }]);

    if (error) throw error;
    await fetchExpenses();
  }

  async function deleteExpense(id) {
    const { error } = await supabase
      .from('expenses')
      .delete()
      .eq('id', id);

    if (error) throw error;
    await fetchExpenses();
  }

  async function updateExpense(id, updates) {
    const { error } = await supabase
      .from('expenses')
      .update(updates)
      .eq('id', id);

    if (error) throw error;
    await fetchExpenses();
  }

  useEffect(() => {
    fetchExpenses();
  }, [user]);

  return { expenses, loading, error, addExpense, deleteExpense, updateExpense };
}