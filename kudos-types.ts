// Type definitions for VBA Kudos

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  active: boolean;
  password?: string;
}

export interface Balance {
  user_id: string;
  points_to_give: number;
  points_given: number;
  points_earned: number;
  points_redeemed: number;
  last_reset: string;
}

export interface Transaction {
  id: string;
  giver_id: string;
  receiver_id: string;
  points: number;
  reason: string;
  core_value: string | null;
  created_on: string;
}

export interface Redemption {
  id: string;
  requestor_id: string;
  points_used: number;
  credit_amount: number;
  reward_type: 'store' | 'amazon';
  status: 'pending' | 'issued' | 'rejected';
  requested_at: string;
  approved_by?: string | null;
  notes?: string;
  issued_at?: string;
  rejected_at?: string;
}

export interface KudosTabProps {
  currentUser: Employee;
}

export interface Notification {
  message: string;
  type: 'success' | 'error';
}

export type ScreenType = 'home' | 'give' | 'history' | 'leaderboard' | 'rewards' | 'admin';
