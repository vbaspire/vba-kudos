# Files to Copy to vba-member-portal

## Step 1: Copy Main Component Files

### TypeScript Version (RECOMMENDED for vba-member-portal)

**Files to copy:**
1. `KudosTab.tsx` → `vba-member-portal/src/components/KudosTab.tsx`
2. `kudos-types.ts` → `vba-member-portal/src/types/kudos-types.ts` (or wherever you keep types)

### JavaScript Version (Alternative)

**File:** `KudosTab-STANDALONE.js` → `vba-member-portal/src/components/KudosTab.js`

**Note:** Since vba-member-portal is a TypeScript project, we recommend using the TypeScript version (KudosTab.tsx + kudos-types.ts).

---

## Step 2: Copy or Merge Supabase Client

**File:** `src/supabaseClient.js`
**Destination:** `vba-member-portal/src/supabaseClient.js` (or wherever your portal keeps it)

If vba-member-portal already has a supabaseClient.js file pointing to the same Supabase instance, you can skip this step and just update the import in KudosTab.js to use the existing one.

---

## Step 3: Update package.json Dependencies

Add these to your `vba-member-portal/package.json` if not already present:

```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.39.0",
    "lucide-react": "^0.263.1"
  }
}
```

Then run:
```bash
npm install
```

---

## Step 4: Integrate into Your Tab System

### Example Integration:

In your main app file (e.g., `App.js` or wherever tabs are managed):

```javascript
import KudosTab from './components/KudosTab';

// In your tab rendering logic:
function MyApp() {
  const [currentUser, setCurrentUser] = useState(/* your auth user */);
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div>
      {/* Your tab navigation */}
      <nav>
        <button onClick={() => setActiveTab('home')}>Home</button>
        <button onClick={() => setActiveTab('kudos')}>Kudos</button>
        {/* other tabs */}
      </nav>

      {/* Tab content */}
      {activeTab === 'home' && <HomeTab />}
      {activeTab === 'kudos' && <KudosTab currentUser={currentUser} />}
      {/* other tabs */}
    </div>
  );
}
```

---

## Step 5: Ensure Current User Format

The `currentUser` prop must have this structure:

```javascript
{
  id: 'user_123',           // Required: User ID from employees table
  name: 'John Doe',         // Required: Full name
  email: 'john@vbaspire.com', // Required: Email address
  department: 'Engineering',  // Required: Department name
  active: true              // Required: Active status
}
```

---

## What's Different from the Original?

1. **No Login Screen**: Login is handled by the parent portal
2. **Accepts currentUser prop**: Gets user from portal's auth system
3. **No header/logout button**: Assumes portal has global header
4. **Tab-ready**: Has internal sub-navigation for kudos features

---

## Database Tables

The component expects these Supabase tables:
- `employees` - Employee information
- `balances` - Points balances for each user
- `transactions` - Kudos transaction history
- `redemptions` - Reward redemption requests

Make sure these exist in your Supabase instance.

---

## Quick Start Checklist

- [ ] Copy `KudosTab-STANDALONE.js` to `vba-member-portal/src/components/KudosTab.js`
- [ ] Copy or verify `supabaseClient.js` exists in portal
- [ ] Update `package.json` with dependencies
- [ ] Run `npm install`
- [ ] Import `KudosTab` in your main app file
- [ ] Add kudos tab to navigation
- [ ] Pass `currentUser` prop with correct format
- [ ] Test the integration

---

## Need Help?

If you need to adjust the styling or layout to match your portal's design system, look for these sections in KudosTab.js:
- Tailwind classes (e.g., `className="bg-white rounded-lg shadow p-6"`)
- Color schemes (blue-600, green-600, etc.)
- Navigation structure (the nav element with sub-tabs)
