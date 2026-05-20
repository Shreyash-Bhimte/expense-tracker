// Custom hook — manages all expense CRUD operations against Supabase.
// Components call these functions and read state without knowing
// anything about the database implementation.

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from './useAuth';

export function useExpenses() {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all expenses for the current user, sorted newest first
  async function fetchExpenses() {
    if (!user) return;

    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setExpenses(data);
    }

    setLoading(false);
  }

  // Add a new expense — user_id is set server-side via RLS context
  async function addExpense(expenseData) {
    const { error } = await supabase
      .from('expenses')
      .insert([{ ...expenseData, user_id: user.id }]);

    if (error) throw error;

    // Refresh the list after successful insert
    await fetchExpenses();
  }

  // Delete an expense by id
  async function deleteExpense(id) {
    const { error } = await supabase
      .from('expenses')
      .delete()
      .eq('id', id);

    if (error) throw error;
    await fetchExpenses();
  }

  // Update an existing expense by id
  async function updateExpense(id, updates) {
    const { error } = await supabase
      .from('expenses')
      .update(updates)
      .eq('id', id);

    if (error) throw error;
    await fetchExpenses();
  }

  // Fetch expenses whenever the logged-in user changes
  useEffect(() => {
    fetchExpenses();
  }, [user]);

  return { expenses, loading, error, addExpense, deleteExpense, updateExpense };
}