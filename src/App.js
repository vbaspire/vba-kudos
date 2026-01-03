import React, { useState, useEffect } from 'react';
import { Gift, Award, TrendingUp, History, ShieldCheck, LogOut, ShoppingBag } from 'lucide-react';
import { supabase } from './supabaseClient';

const VBAKudos = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeScreen, setActiveScreen] = useState('home');
  const [employees, setEmployees] = useState([]);
  const [balances, setBalances] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [redemptions, setRedemptions] = useState([]);
  const [showNotification, setShowNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const ADMIN_EMAILS = ['kowenby@vbaspire.com', 'jblue@vbaspire.com', 'bpeebles@vbaspire.com'];
  const CORE_VALUES = ['Integrity', 'Innovation', 'Empowerment'];

  const isSystemUser = (emp) => emp?.id === 'system' || emp?.email === 'system@vbaspire.com';

  useEffect(() => {
    initializeSystem();
  }, []);

  const initializeSystem = async () => {
    await loadData();
    await checkMonthlyReset();
    setIsLoading(false);
  };

  const loadData = async () => {
    try {
      const { data: empData } = await supabase.from('employees').select('*');
      const { data: balData } = await supabase.from('balances').select('*');
      const { data: txnData } = await supabase
        .from('transactions')
        .select('*')
        .order('created_on', { ascending: false });
      const { data: redData } = await supabase
        .from('redemptions')
        .select('*')
        .order('requested_at', { ascending: false });

      setEmployees(empData || []);
      setBalances(balData || []);
      setTransactions(txnData || []);
      setRedemptions(redData || []);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const checkMonthlyReset = async () => {
    try {
      const now = new Date();
      const currentMonth = now.getMonth();

      if (now.getDate() === 1) {
        const { data: balData } = await supabase.from('balances').select('*');
        const needsReset = (balData || []).some((bal) => {
          const lastReset = new Date(bal.last_reset);
          return lastReset.getMonth() !== currentMonth;
        });

        if (needsReset) {
          await supabase
            .from('balances')
            .update({
              points_to_give: 25,
              points_given: 0,
              last_reset: new Date().toISOString(),
            })
            .neq('user_id', '');
          await loadData();
        }
      }
    } catch (error) {
      console.error('Error checking monthly reset:', error);
    }
  };

  const getUserBalance = (userId) => {
    return (
      balances.find((b) => b.user_id === userId) || {
        points_to_give: 25,
        points_given: 0,
        points_earned: 0,
        points_redeemed: 0,
      }
    );
  };

  const isAdmin = (user) => {
    return user && ADMIN_EMAILS.includes(user.email);
  };

  const notify = (message, type) => {
    setShowNotification({ message, type });
    setTimeout(() => setShowNotification(null), 3000);
  };

  const giveKudos = async (receiverId, points, reason, coreValue = null) => {
    if (!currentUser || receiverId === currentUser.id) {
      notify('Cannot give kudos to yourself', 'error');
      throw new Error('Cannot give kudos to yourself');
    }

    const giverBalance = getUserBalance(currentUser.id);
    if (points > giverBalance.points_to_give) {
      notify('Insufficient points remaining', 'error');
      throw new Error('Insufficient points');
    }

    try {
      await supabase
        .from('balances')
        .update({
          points_to_give: giverBalance.points_to_give - points,
          points_given: giverBalance.points_given + points,
        })
        .eq('user_id', currentUser.id);

      const receiverBalance = getUserBalance(receiverId);
      await supabase
        .from('balances')
        .update({
          points_earned: receiverBalance.points_earned + points,
        })
        .eq('user_id', receiverId);

      await supabase.from('transactions').insert({
        id: `txn_${Date.now()}`,
        giver_id: currentUser.id,
        receiver_id: receiverId,
        points,
        reason,
        core_value: coreValue,
        created_on: new Date().toISOString(),
      });

      await loadData();
      const receiver = employees.find((e) => e.id === receiverId);
      notify(`Kudos sent to ${receiver?.name || 'employee'}!`, 'success');
      setActiveScreen('home');
    } catch (error) {
      console.error('Error giving kudos:', error);
      notify('Error giving kudos', 'error');
      throw error;
    }
  };

  const redeemPoints = async (rewardType) => {
    const balance = getUserBalance(currentUser.id);

    if (balance.points_earned < 100) {
      notify('Need at least 100 points to redeem', 'error');
      return;
    }

    try {
      await supabase
        .from('balances')
        .update({
          points_earned: balance.points_earned - 100,
          points_redeemed: balance.points_redeemed + 100,
        })
        .eq('user_id', currentUser.id);

      await supabase.from('redemptions').insert({
        id: `red_${Date.now()}`,
        requestor_id: currentUser.id,
        points_used: 100,
        credit_amount: 5,
        reward_type: rewardType, // 'store' | 'amazon'
        status: 'pending',
        requested_at: new Date().toISOString(),
      });

      await loadData();
      notify('Redemption submitted!', 'success');
    } catch (error) {
      console.error('Error processing redemption:', error);
      notify('Error processing redemption', 'error');
    }
  };

  const updateRedemptionStatus = async (redemptionId, status, notes = '') => {
    try {
      await supabase
        .from('redemptions')
        .update({
          status,
          notes,
          approved_by: status === 'issued' ? currentUser.id : null,
          [`${status}_at`]: new Date().toISOString(),
        })
        .eq('id', redemptionId);

      await loadData();
      notify(`Redemption ${status}`, 'success');
    } catch (error) {
      console.error('Error updating redemption:', error);
      notify('Error updating redemption', 'error');
    }
  };

  const getRecentActivity = () => {
    return transactions.filter((t) => t.receiver_id === currentUser?.id).slice(0, 5);
  };

  const getMostUsedCoreValue = () => {
    const currentMonth = new Date().getMonth();
    const counts = {};

    transactions.forEach((t) => {
      const isThisMonth = new Date(t.created_on).getMonth() === currentMonth;
      const isSystem = t.giver_id === 'system';

      if (isThisMonth && !isSystem && t.core_value) {
        counts[t.core_value] = (counts[t.core_value] || 0) + 1;
      }
    });

    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    return sorted.length ? { value: sorted[0][0], count: sorted[0][1] } : null;
  };

  const getLeaderboardData = () => {
    const currentMonth = new Date().getMonth();
    const monthTransactions = transactions.filter(
      (t) => new Date(t.created_on).getMonth() === currentMonth
    );

    const receivers = {};
    const givers = {};

    monthTransactions.forEach((t) => {
      receivers[t.receiver_id] = (receivers[t.receiver_id] || 0) + t.points;
      if (t.giver_id !== 'system') {
        givers[t.giver_id] = (givers[t.giver_id] || 0) + t.points;
      }
    });

    return {
      topReceivers: Object.entries(receivers)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([id, points]) => ({ employee: employees.find((e) => e.id === id), points })),
      topGivers: Object.entries(givers)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([id, points]) => ({ employee: employees.find((e) => e.id === id), points })),
    };
  };

  const LoginScreen = () => {
    const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const handleLogin = () => {
      const employee = employees.find((e) => e.id === selectedEmployeeId);
      if (!employee) {
        setLoginError('Please select an employee');
        return;
      }

      if (!employee.password) {
        setLoginError('Password not set for this user. Ask admin to set it in Supabase.');
        return;
      }

      if (employee.password !== password) {
        setLoginError('Incorrect password');
        return;
      }

      setCurrentUser(employee);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <Award className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">VBA Kudos</h1>
            <p className="text-gray-600">Recognize great work</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Your Name</label>
              <select
                value={selectedEmployeeId}
                onChange={(e) => {
                  setSelectedEmployeeId(e.target.value);
                  setLoginError('');
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose your name...</option>
                {employees
                  .filter((emp) => emp.active && !isSystemUser(emp))
                  .map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name} - {emp.department}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setLoginError('');
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {loginError && <div className="text-red-600 text-sm text-center">{loginError}</div>}

            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  };

  const HomeScreen = () => {
    const balance = getUserBalance(currentUser.id);
    const recentActivity = getRecentActivity();
    const progressToNext100 = balance.points_earned % 100;
    const canRedeem = balance.points_earned >= 100;

    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const daysLeft = Math.ceil((nextMonth - now) / (1000 * 60 * 60 * 24));

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 font-medium">Points to Give</h3>
              <Gift className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-800">{balance.points_to_give}</div>
            <div className="text-sm text-gray-500 mt-1">of 25 monthly</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 font-medium">Points Earned</h3>
              <Award className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-gray-800">{balance.points_earned}</div>
            <div className="text-sm text-gray-500 mt-1">total earned</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 font-medium">Points Redeemed</h3>
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-gray-800">{balance.points_redeemed}</div>
            <div className="text-sm text-gray-500 mt-1">lifetime</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-500 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Monthly Reset Countdown</h3>
              <p className="text-sm text-gray-600">Use your points before they reset!</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-orange-600">{daysLeft}</div>
              <div className="text-sm text-gray-600">days left</div>
            </div>
          </div>
          {balance.points_to_give > 0 && (
            <div className="mt-3 text-sm text-orange-700 bg-orange-100 px-3 py-2 rounded">
              💡 You have {balance.points_to_give} points that will reset!
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Progress to Next Redemption</h3>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-blue-600 h-4 rounded-full transition-all"
                  style={{ width: `${progressToNext100}%` }}
                />
              </div>
              <div className="text-sm text-gray-600 mt-2">{progressToNext100} of 100 points</div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => redeemPoints('store')}
                disabled={!canRedeem}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  canRedeem
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Redeem $5 Store Credit
              </button>

              <button
                onClick={() => redeemPoints('amazon')}
                disabled={!canRedeem}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  canRedeem
                    ? 'bg-orange-500 hover:bg-orange-600 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Redeem $5 Amazon
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
          {recentActivity.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No kudos received yet</p>
          ) : (
            <div className="space-y-3">
              {recentActivity.map((txn) => {
                const giver = employees.find((e) => e.id === txn.giver_id);
                const giverName = giver?.name || (txn.giver_id === 'system' ? 'VBA Kudos System' : 'Unknown');
                const isSystemTxn = txn.giver_id === 'system';

                return (
                  <div key={txn.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                        isSystemTxn ? 'bg-purple-600' : 'bg-blue-600'
                      }`}
                      title={isSystemTxn ? 'System Award' : 'Employee Award'}
                    >
                      {isSystemTxn ? '★' : giverName?.charAt(0) || '?'}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-800">{giverName}</span>
                        <span className={`font-bold ${isSystemTxn ? 'text-purple-600' : 'text-blue-600'}`}>
                          +{txn.points}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mt-1">{txn.reason}</p>
                      {txn.core_value && <p className="text-xs text-blue-600 mt-1">🏆 {txn.core_value}</p>}
                      <p className="text-gray-400 text-xs mt-1">
                        {new Date(txn.created_on + 'Z').toLocaleDateString('en-US', {
                          timeZone: 'America/Chicago',
                        })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  };

  const GiveKudosScreen = () => {
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [points, setPoints] = useState(5);
    const [reason, setReason] = useState('');
    const [coreValue, setCoreValue] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const balance = getUserBalance(currentUser.id);

    const handleSubmit = async () => {
      if (isSubmitting || !selectedEmployee || !reason.trim()) return;
      setIsSubmitting(true);
      try {
        await giveKudos(selectedEmployee, points, reason, coreValue || null);
        setSelectedEmployee('');
        setPoints(5);
        setReason('');
        setCoreValue('');
      } catch (error) {
        console.error(error);
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Give Kudos</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Coworker</label>
              <select
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose an employee...</option>
                {employees
                  .filter((emp) => emp.id !== currentUser.id && emp.active && !isSystemUser(emp))
                  .map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name} - {emp.department}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Points (1-10)</label>
              <input
                type="number"
                min="1"
                max={Math.min(10, balance.points_to_give)}
                value={points}
                onChange={(e) =>
                  setPoints(
                    Math.max(
                      1,
                      Math.min(parseInt(e.target.value, 10) || 1, Math.min(10, balance.points_to_give))
                    )
                  )
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-sm text-gray-500 mt-1">You have {balance.points_to_give} points remaining</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Kudos</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows="4"
                placeholder="What did they do that deserves recognition?"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Core Value (optional)</label>
              <select
                value={coreValue}
                onChange={(e) => setCoreValue(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a core value...</option>
                {CORE_VALUES.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting || !selectedEmployee || !reason.trim()}
              className={`w-full font-semibold py-3 rounded-lg transition-colors ${
                isSubmitting || !selectedEmployee || !reason.trim()
                  ? 'bg-gray-400 cursor-not-allowed text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isSubmitting ? 'Sending...' : 'Give Kudos'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const HistoryScreen = () => {
    const given = transactions.filter((t) => t.giver_id === currentUser.id);
    const received = transactions.filter((t) => t.receiver_id === currentUser.id);

    const renderTxnDate = (iso) =>
      new Date(iso + 'Z').toLocaleDateString('en-US', { timeZone: 'America/Chicago' });

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Kudos I Gave</h2>
          {given.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No kudos given yet</p>
          ) : (
            <div className="space-y-3">
              {given.map((txn) => {
                const receiver = employees.find((e) => e.id === txn.receiver_id);
                return (
                  <div key={txn.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {receiver?.name?.charAt(0) || '?'}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-800">{receiver?.name}</span>
                        <span className="text-green-600 font-bold">-{txn.points}</span>
                      </div>
                      <p className="text-gray-600 text-sm mt-1">{txn.reason}</p>
                      {txn.core_value && <p className="text-xs text-blue-600 mt-1">🏆 {txn.core_value}</p>}
                      <p className="text-gray-400 text-xs mt-1">{renderTxnDate(txn.created_on)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Kudos I Received</h2>
          {received.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No kudos received yet</p>
          ) : (
            <div className="space-y-3">
              {received.map((txn) => {
                const giver = employees.find((e) => e.id === txn.giver_id);
                const giverName = giver?.name || (txn.giver_id === 'system' ? 'VBA Kudos System' : 'Unknown');
                const isSystemTxn = txn.giver_id === 'system';

                return (
                  <div key={txn.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                        isSystemTxn ? 'bg-purple-600' : 'bg-blue-600'
                      }`}
                    >
                      {isSystemTxn ? '★' : giverName?.charAt(0) || '?'}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-800">{giverName}</span>
                        <span className={`font-bold ${isSystemTxn ? 'text-purple-600' : 'text-blue-600'}`}>
                          +{txn.points}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mt-1">{txn.reason}</p>
                      {txn.core_value && <p className="text-xs text-blue-600 mt-1">🏆 {txn.core_value}</p>}
                      <p className="text-gray-400 text-xs mt-1">{renderTxnDate(txn.created_on)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  };

  const LeaderboardScreen = () => {
    const { topReceivers, topGivers } = getLeaderboardData();

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Top Receivers</h2>
          {topReceivers.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No data yet</p>
          ) : (
            <div className="space-y-3">
              {topReceivers.map((item, idx) => (
                <div
                  key={item.employee?.id || idx}
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="text-2xl font-bold text-gray-400 w-8">#{idx + 1}</div>
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {item.employee?.name?.charAt(0) || '?'}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800">{item.employee?.name}</div>
                    <div className="text-sm text-gray-500">{item.employee?.department}</div>
                  </div>
                  <div className="text-blue-600 font-bold text-xl">{item.points}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Top Givers</h2>
          {topGivers.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No data yet</p>
          ) : (
            <div className="space-y-3">
              {topGivers.map((item, idx) => (
                <div
                  key={item.employee?.id || idx}
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="text-2xl font-bold text-gray-400 w-8">#{idx + 1}</div>
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {item.employee?.name?.charAt(0) || '?'}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800">{item.employee?.name}</div>
                    <div className="text-sm text-gray-500">{item.employee?.department}</div>
                  </div>
                  <div className="text-green-600 font-bold text-xl">{item.points}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const RewardsScreen = () => {
    const balance = getUserBalance(currentUser.id);
    const canRedeem = balance.points_earned >= 100;

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Rewards</h2>

          <div className="flex items-center justify-between bg-blue-50 p-6 rounded-lg">
            <div>
              <p className="text-gray-600 text-sm mb-1">Available to Redeem</p>
              <p className="text-4xl font-bold text-blue-600">{balance.points_earned}</p>
              <p className="text-sm text-gray-500 mt-1">points</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Redemption Rate</p>
              <p className="text-2xl font-bold text-gray-800">100 pts = $5</p>
            </div>
          </div>

          {!canRedeem && (
            <div className="mt-4 text-center text-sm text-orange-600 bg-orange-50 py-2 rounded">
              You need {Math.max(0, 100 - (balance.points_earned || 0))} more points to redeem
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">VBA Employee Store</h3>
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <Gift className="w-6 h-6 text-white" />
              </div>
            </div>

            <p className="text-gray-600 mb-4">Shop VBA merchandise, apparel, and gear.</p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 mb-4 rounded text-sm text-gray-700">
              <strong>How it works:</strong> Once approved, you’ll receive instructions to use your store credit at
              vba.ourproshop.com.
            </div>

            <div className="space-y-3">
              <a
                href="https://vba.ourproshop.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold py-3 rounded-lg transition-colors"
              >
                Browse VBA Store →
              </a>

              <button
                onClick={() => redeemPoints('store')}
                disabled={!canRedeem}
                className={`w-full font-semibold py-3 rounded-lg transition-colors ${
                  canRedeem
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {canRedeem ? 'Redeem for $5 Store Credit' : 'Need 100 Points'}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">Amazon Gift Card</h3>
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                <Gift className="w-6 h-6 text-white" />
              </div>
            </div>

            <p className="text-gray-600 mb-4">Redeem your points for an Amazon gift card.</p>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-3 mb-4 rounded text-sm text-gray-700">
              <strong>How it works:</strong> Once approved, a virtual gift card code will be sent to your work email.
            </div>

            <div className="space-y-3">
              <a
                href="https://www.amazon.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-orange-500 hover:bg-orange-600 text-white text-center font-semibold py-3 rounded-lg transition-colors"
              >
                Browse Amazon →
              </a>

              <button
                onClick={() => redeemPoints('amazon')}
                disabled={!canRedeem}
                className={`w-full font-semibold py-3 rounded-lg transition-colors ${
                  canRedeem
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {canRedeem ? 'Redeem for $5 Amazon' : 'Need 100 Points'}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3">Redemption Process</h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { step: 1, title: 'Earn Points', desc: 'Collect 100+ points' },
              { step: 2, title: 'Submit Request', desc: 'Click redeem button' },
              { step: 3, title: 'Admin Approval', desc: 'Processed by HR/Ops' },
              { step: 4, title: 'Receive Reward', desc: 'Credit or gift card' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-xl font-bold text-blue-600">{item.step}</span>
                </div>
                <p className="text-sm font-semibold text-gray-800 mb-1">{item.title}</p>
                <p className="text-xs text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-3">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded text-sm text-gray-700">
              <strong>VBA Store Credit:</strong> Once approved, you’ll receive instructions to apply your credit at
              vba.ourproshop.com.
            </div>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-3 rounded text-sm text-gray-700">
              <strong>Amazon Gift Card:</strong> Once approved, a virtual gift card code will be sent to your work
              email ({currentUser?.email}).
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AdminScreen = () => {
    const pendingRedemptions = redemptions.filter((r) => r.status === 'pending');
    const mostUsedCoreValue = getMostUsedCoreValue();

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Core Value Insight (This Month)</h2>
          {mostUsedCoreValue ? (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Most Used Core Value</p>
                <p className="text-2xl font-bold text-blue-600">{mostUsedCoreValue.value}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-500 text-sm">Times Selected</p>
                <p className="text-2xl font-bold text-gray-800">{mostUsedCoreValue.count}</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No core values selected yet this month.</p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Pending Redemptions</h2>

          {pendingRedemptions.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No pending redemptions</p>
          ) : (
            <div className="space-y-4">
              {pendingRedemptions.map((red) => {
                const requestor = employees.find((e) => e.id === red.requestor_id);

                return (
                  <div key={red.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                          {requestor?.name?.charAt(0) || '?'}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">{requestor?.name}</div>
                          <div className="text-sm text-gray-500">{requestor?.department}</div>

                          <div className="text-sm text-gray-600 mt-2">
                            <span className="font-medium">Reward:</span>{' '}
                            {red.reward_type === 'amazon' ? 'Amazon Gift Card' : 'VBA Store Credit'}
                          </div>

                          <div className="text-sm text-gray-600">
                            <span className="font-medium">Points Used:</span> {red.points_used}
                          </div>

                          <div className="text-sm text-gray-500 mt-1">
                            Requested:{' '}
                            {new Date(red.requested_at + 'Z').toLocaleString('en-US', {
                              timeZone: 'America/Chicago',
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <button
                          onClick={() => updateRedemptionStatus(red.id, 'issued')}
                          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                        >
                          Issue
                        </button>

                        <button
                          onClick={() =>
                            updateRedemptionStatus(red.id, 'rejected', 'Please contact administrator')
                          }
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <Award className="w-16 h-16 text-blue-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Loading VBA Kudos...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <LoginScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {showNotification && (
        <div
          className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg ${
            showNotification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white`}
        >
          {showNotification.message}
        </div>
      )}

      <header className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Award className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">VBA Kudos</h1>
              <p className="text-blue-100 text-sm">{currentUser.name}</p>
            </div>
          </div>
          <button
            onClick={() => {
              setCurrentUser(null);
              setActiveScreen('home');
            }}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      <nav className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-1">
            {[
              { id: 'home', label: 'Home', icon: Award },
              { id: 'give', label: 'Give Kudos', icon: Gift },
              { id: 'history', label: 'My History', icon: History },
              { id: 'leaderboard', label: 'Leaderboard', icon: TrendingUp },
              { id: 'rewards', label: 'Rewards', icon: ShoppingBag },
              ...(isAdmin(currentUser) ? [{ id: 'admin', label: 'Admin', icon: ShieldCheck }] : []),
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveScreen(id)}
                className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors ${
                  activeScreen === id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeScreen === 'home' && <HomeScreen />}
        {activeScreen === 'give' && <GiveKudosScreen />}
        {activeScreen === 'history' && <HistoryScreen />}
        {activeScreen === 'leaderboard' && <LeaderboardScreen />}
        {activeScreen === 'rewards' && <RewardsScreen />}
        {activeScreen === 'admin' && <AdminScreen />}
      </main>
    </div>
  );
};

export default VBAKudos;
