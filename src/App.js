import React, { useState, useEffect } from 'react';
import { Gift, Award, TrendingUp, History, ShieldCheck, LogOut } from 'lucide-react';
import { supabase } from './supabaseClient';

const ADMIN_EMAILS = ['kowenby@vbaspire.com', 'jblue@vbaspire.com', 'bpeebles@vbaspire.com'];

export default function VBAKudos() {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeScreen, setActiveScreen] = useState('home');
  const [employees, setEmployees] = useState([]);
  const [balances, setBalances] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [redemptions, setRedemptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  // 🔐 Login state (MUST be top-level)
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    initialize();
  }, []);

  async function initialize() {
    await loadData();
    setIsLoading(false);
  }

  async function loadData() {
    const { data: emp } = await supabase.from('employees').select('*');
    const { data: bal } = await supabase.from('balances').select('*');
    const { data: tx } = await supabase.from('transactions').select('*').order('created_on', { ascending: false });
    const { data: rd } = await supabase.from('redemptions').select('*').order('requested_at', { ascending: false });

    setEmployees(emp || []);
    setBalances(bal || []);
    setTransactions(tx || []);
    setRedemptions(rd || []);
  }

  function notify(message, type = 'success') {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  }

  function getBalance(id) {
    return balances.find(b => b.user_id === id) || {
      points_to_give: 25,
      points_earned: 0,
      points_redeemed: 0
    };
  }

  function handleLogin() {
    const user = employees.find(e => e.id === selectedEmployeeId);
    if (!user) return setLoginError('Select your name');
    if (user.password !== password) return setLoginError('Incorrect password');

    setLoginError('');
    setCurrentUser(user);
  }

  function isAdmin(user) {
    return ADMIN_EMAILS.includes(user.email);
  }

  // ⏳ Loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Award className="animate-pulse w-16 h-16 text-blue-600" />
      </div>
    );
  }

  // 🔐 Login Screen
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow w-full max-w-md space-y-4">
          <h1 className="text-2xl font-bold text-center">VBA Kudos</h1>

          <select
            className="w-full border p-2 rounded"
            value={selectedEmployeeId}
            onChange={e => setSelectedEmployeeId(e.target.value)}
          >
            <option value="">Select your name</option>
            {employees.map(e => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>

          <input
            type="password"
            className="w-full border p-2 rounded"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          {loginError && <p className="text-red-600 text-sm">{loginError}</p>}

          <button
            className="w-full bg-blue-600 text-white py-2 rounded"
            onClick={handleLogin}
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  // ✅ Main App
  return (
    <div className="min-h-screen bg-gray-100">
      {notification && (
        <div className={`fixed top-4 right-4 px-4 py-2 rounded text-white ${
          notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'
        }`}>
          {notification.message}
        </div>
      )}

      <header className="bg-blue-600 text-white p-4 flex justify-between">
        <h2 className="font-bold">VBA Kudos</h2>
        <button onClick={() => setCurrentUser(null)} className="flex items-center gap-2">
          <LogOut size={16} /> Sign out
        </button>
      </header>

      <main className="p-6">
        <h3 className="text-xl font-semibold">Welcome, {currentUser.name}</h3>
        <p className="mt-2">Points earned: {getBalance(currentUser.id).points_earned}</p>
      </main>
    </div>
  );
}
