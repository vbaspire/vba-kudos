# VBA Kudos Integration Guide

## Overview
This guide will help you integrate the VBA Kudos feature as a tab in the vba-member-portal.

**Important:** vba-member-portal is a TypeScript project, so we provide both TypeScript and JavaScript versions.

## Files to Copy to vba-member-portal

### TypeScript Version (RECOMMENDED)

1. **`KudosTab.tsx`** → `src/components/KudosTab.tsx`
   - Main component with full TypeScript support

2. **`kudos-types.ts`** → `src/types/kudos-types.ts`
   - Type definitions for Employee, Balance, Transaction, etc.

3. **`src/supabaseClient.js`** → `src/supabaseClient.ts` (or .js)
   - Supabase configuration

### JavaScript Version (Alternative)

1. **`KudosTab-STANDALONE.js`** → `src/components/KudosTab.js`
2. **`src/supabaseClient.js`** → `src/supabaseClient.js`

### 3. Update Dependencies in `package.json`
Add these dependencies if not already present:
```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.39.0",
    "lucide-react": "^0.263.1"
  }
}
```

## Integration Steps

### Step 1: Add the Component Files
1. Copy `KudosTab-STANDALONE.js` to your components folder
2. Copy `src/supabaseClient.js` to your project

### Step 2: Import and Use in Your Tab System
In your main app or tab routing component:

```javascript
import KudosTab from './components/KudosTab';

// Then in your tab system, add:
// <KudosTab currentUser={currentUser} />
```

### Step 3: Pass Current User
The KudosTab component expects a `currentUser` prop with this structure:
```javascript
{
  id: 'user_id',
  name: 'User Name',
  email: 'user@vbaspire.com',
  department: 'Department Name',
  active: true
}
```

### Step 4: Install Dependencies
Run:
```bash
npm install @supabase/supabase-js@^2.39.0 lucide-react@^0.263.1
```

## What Changed from Original
- Removed LoginScreen component
- Removed login/logout logic
- Component now expects `currentUser` as a prop
- Removed loading state for initialization (assumes parent handles auth)

## Database Tables Required
The component uses these Supabase tables:
- `employees`
- `balances`
- `transactions`
- `redemptions`

Make sure these tables exist in your Supabase instance.

## Admin Configuration
Admin emails are configured in the component:
```javascript
const ADMIN_EMAILS = ['kowenby@vbaspire.com', 'jblue@vbaspire.com', 'bpeebles@vbaspire.com'];
```
