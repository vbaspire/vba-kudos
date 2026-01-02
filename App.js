{\rtf1\ansi\ansicpg1252\cocoartf2821
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 .AppleSystemUIFontMonospaced-Regular;\f1\fnil\fcharset0 .AppleSystemUIFontMonospaced-RegularItalic;}
{\colortbl;\red255\green255\blue255;\red147\green0\blue147;\red255\green255\blue255;\red42\green44\blue51;
\red66\green147\blue62;\red50\green94\blue238;\red167\green87\blue5;\red219\green63\blue57;\red143\green144\blue150;
}
{\*\expandedcolortbl;;\cssrgb\c65098\c14902\c64314;\cssrgb\c100000\c100000\c100000;\cssrgb\c21961\c22745\c25882;
\cssrgb\c31373\c63137\c30980;\cssrgb\c25098\c47059\c94902;\cssrgb\c71765\c41961\c392;\cssrgb\c89412\c33725\c28627;\cssrgb\c62745\c63137\c65490;
}
\margl1440\margr1440\vieww40460\viewh21120\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs28 \cf2 \cb3 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 import\cf4 \strokec4  React, \{ useState, useEffect \} \cf2 \strokec2 from\cf4 \strokec4  \cf5 \strokec5 'react'\cf4 \strokec4 ;\
\cf2 \strokec2 import\cf4 \strokec4  \{ Gift, Award, TrendingUp, History, ShieldCheck, LogOut \} \cf2 \strokec2 from\cf4 \strokec4  \cf5 \strokec5 'lucide-react'\cf4 \strokec4 ;\
\cf2 \strokec2 import\cf4 \strokec4  \{ supabase \} \cf2 \strokec2 from\cf4 \strokec4  \cf5 \strokec5 './supabaseClient'\cf4 \strokec4 ;\
\
\cf2 \strokec2 const\cf4 \strokec4  \cf6 \strokec6 VBAKudos\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  () \cf6 \strokec6 =>\cf4 \strokec4  \{\
  \cf2 \strokec2 const\cf4 \strokec4  [currentUser, setCurrentUser] \cf6 \strokec6 =\cf4 \strokec4  \cf6 \strokec6 useState\cf4 \strokec4 (\cf2 \strokec2 null\cf4 \strokec4 );\
  \cf2 \strokec2 const\cf4 \strokec4  [activeScreen, setActiveScreen] \cf6 \strokec6 =\cf4 \strokec4  \cf6 \strokec6 useState\cf4 \strokec4 (\cf5 \strokec5 'home'\cf4 \strokec4 );\
  \cf2 \strokec2 const\cf4 \strokec4  [employees, setEmployees] \cf6 \strokec6 =\cf4 \strokec4  \cf6 \strokec6 useState\cf4 \strokec4 ([]);\
  \cf2 \strokec2 const\cf4 \strokec4  [balances, setBalances] \cf6 \strokec6 =\cf4 \strokec4  \cf6 \strokec6 useState\cf4 \strokec4 ([]);\
  \cf2 \strokec2 const\cf4 \strokec4  [transactions, setTransactions] \cf6 \strokec6 =\cf4 \strokec4  \cf6 \strokec6 useState\cf4 \strokec4 ([]);\
  \cf2 \strokec2 const\cf4 \strokec4  [redemptions, setRedemptions] \cf6 \strokec6 =\cf4 \strokec4  \cf6 \strokec6 useState\cf4 \strokec4 ([]);\
  \cf2 \strokec2 const\cf4 \strokec4  [showNotification, setShowNotification] \cf6 \strokec6 =\cf4 \strokec4  \cf6 \strokec6 useState\cf4 \strokec4 (\cf2 \strokec2 null\cf4 \strokec4 );\
  \cf2 \strokec2 const\cf4 \strokec4  [isLoading, setIsLoading] \cf6 \strokec6 =\cf4 \strokec4  \cf6 \strokec6 useState\cf4 \strokec4 (\cf7 \strokec7 true\cf4 \strokec4 );\
\
  \cf2 \strokec2 const\cf4 \strokec4  \cf7 \strokec7 ADMIN_EMAILS\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  [\cf5 \strokec5 'kowenby@vbaspire.com'\cf4 \strokec4 , \cf5 \strokec5 'jblue@vbaspire.com'\cf4 \strokec4 , \cf5 \strokec5 'bpeebles@vbaspire.com'\cf4 \strokec4 ];\
\
  \cf6 \strokec6 useEffect\cf4 \strokec4 (() \cf6 \strokec6 =>\cf4 \strokec4  \{\
    \cf6 \strokec6 initializeSystem\cf4 \strokec4 ();\
  \}, []);\
\
  \cf2 \strokec2 const\cf4 \strokec4  \cf6 \strokec6 initializeSystem\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  \cf2 \strokec2 async\cf4 \strokec4  () \cf6 \strokec6 =>\cf4 \strokec4  \{\
    \cf2 \strokec2 await\cf4 \strokec4  \cf6 \strokec6 loadData\cf4 \strokec4 ();\
    \cf2 \strokec2 await\cf4 \strokec4  \cf6 \strokec6 checkMonthlyReset\cf4 \strokec4 ();\
    \cf6 \strokec6 setIsLoading\cf4 \strokec4 (\cf7 \strokec7 false\cf4 \strokec4 );\
  \};\
\
  \cf2 \strokec2 const\cf4 \strokec4  \cf6 \strokec6 loadData\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  \cf2 \strokec2 async\cf4 \strokec4  () \cf6 \strokec6 =>\cf4 \strokec4  \{\
    \cf2 \strokec2 try\cf4 \strokec4  \{\
      \cf2 \strokec2 const\cf4 \strokec4  \{ \cf8 \strokec8 data\cf6 \strokec6 :\cf4 \strokec4  empData, \cf8 \strokec8 error\cf6 \strokec6 :\cf4 \strokec4  empError \} \cf6 \strokec6 =\cf4 \strokec4  \cf2 \strokec2 await\cf4 \strokec4  supabase.\cf2 \strokec2 from\cf4 \strokec4 (\cf5 \strokec5 'employees'\cf4 \strokec4 ).\cf6 \strokec6 select\cf4 \strokec4 (\cf5 \strokec5 '*'\cf4 \strokec4 );\
      \cf2 \strokec2 const\cf4 \strokec4  \{ \cf8 \strokec8 data\cf6 \strokec6 :\cf4 \strokec4  balData, \cf8 \strokec8 error\cf6 \strokec6 :\cf4 \strokec4  balError \} \cf6 \strokec6 =\cf4 \strokec4  \cf2 \strokec2 await\cf4 \strokec4  supabase.\cf2 \strokec2 from\cf4 \strokec4 (\cf5 \strokec5 'balances'\cf4 \strokec4 ).\cf6 \strokec6 select\cf4 \strokec4 (\cf5 \strokec5 '*'\cf4 \strokec4 );\
      \cf2 \strokec2 const\cf4 \strokec4  \{ \cf8 \strokec8 data\cf6 \strokec6 :\cf4 \strokec4  txnData, \cf8 \strokec8 error\cf6 \strokec6 :\cf4 \strokec4  txnError \} \cf6 \strokec6 =\cf4 \strokec4  \cf2 \strokec2 await\cf4 \strokec4  supabase.\cf2 \strokec2 from\cf4 \strokec4 (\cf5 \strokec5 'transactions'\cf4 \strokec4 ).\cf6 \strokec6 select\cf4 \strokec4 (\cf5 \strokec5 '*'\cf4 \strokec4 ).\cf6 \strokec6 order\cf4 \strokec4 (\cf5 \strokec5 'created_on'\cf4 \strokec4 , \{ \cf8 \strokec8 ascending\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 false\cf4 \strokec4  \});\
      \cf2 \strokec2 const\cf4 \strokec4  \{ \cf8 \strokec8 data\cf6 \strokec6 :\cf4 \strokec4  redData, \cf8 \strokec8 error\cf6 \strokec6 :\cf4 \strokec4  redError \} \cf6 \strokec6 =\cf4 \strokec4  \cf2 \strokec2 await\cf4 \strokec4  supabase.\cf2 \strokec2 from\cf4 \strokec4 (\cf5 \strokec5 'redemptions'\cf4 \strokec4 ).\cf6 \strokec6 select\cf4 \strokec4 (\cf5 \strokec5 '*'\cf4 \strokec4 ).\cf6 \strokec6 order\cf4 \strokec4 (\cf5 \strokec5 'requested_at'\cf4 \strokec4 , \{ \cf8 \strokec8 ascending\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 false\cf4 \strokec4  \});\
\
      \cf2 \strokec2 if\cf4 \strokec4  (empError \cf6 \strokec6 ||\cf4 \strokec4  balError \cf6 \strokec6 ||\cf4 \strokec4  txnError \cf6 \strokec6 ||\cf4 \strokec4  redError) \{\
        \cf2 \strokec2 throw\cf4 \strokec4  \cf2 \strokec2 new\cf4 \strokec4  \cf7 \strokec7 Error\cf4 \strokec4 (\cf5 \strokec5 'Error loading data'\cf4 \strokec4 );\
      \}\
\
      \cf6 \strokec6 setEmployees\cf4 \strokec4 (empData \cf6 \strokec6 ||\cf4 \strokec4  []);\
      \cf6 \strokec6 setBalances\cf4 \strokec4 (balData \cf6 \strokec6 ||\cf4 \strokec4  []);\
      \cf6 \strokec6 setTransactions\cf4 \strokec4 (txnData \cf6 \strokec6 ||\cf4 \strokec4  []);\
      \cf6 \strokec6 setRedemptions\cf4 \strokec4 (redData \cf6 \strokec6 ||\cf4 \strokec4  []);\
    \} \cf2 \strokec2 catch\cf4 \strokec4  (error) \{\
      \cf7 \strokec7 console\cf4 \strokec4 .\cf6 \strokec6 error\cf4 \strokec4 (\cf5 \strokec5 'Error loading data:'\cf4 \strokec4 , error);\
      \cf6 \strokec6 notify\cf4 \strokec4 (\cf5 \strokec5 'Error loading system data'\cf4 \strokec4 , \cf5 \strokec5 'error'\cf4 \strokec4 );\
    \}\
  \};\
\
  \cf2 \strokec2 const\cf4 \strokec4  \cf6 \strokec6 checkMonthlyReset\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  \cf2 \strokec2 async\cf4 \strokec4  () \cf6 \strokec6 =>\cf4 \strokec4  \{\
    \cf2 \strokec2 try\cf4 \strokec4  \{\
      \cf2 \strokec2 const\cf4 \strokec4  now \cf6 \strokec6 =\cf4 \strokec4  \cf2 \strokec2 new\cf4 \strokec4  \cf7 \strokec7 Date\cf4 \strokec4 ();\
      \cf2 \strokec2 const\cf4 \strokec4  currentMonth \cf6 \strokec6 =\cf4 \strokec4  now.\cf6 \strokec6 getMonth\cf4 \strokec4 ();\
      \
      \cf2 \strokec2 if\cf4 \strokec4  (now.\cf6 \strokec6 getDate\cf4 \strokec4 () \cf6 \strokec6 ===\cf4 \strokec4  \cf7 \strokec7 1\cf4 \strokec4 ) \{\
        \cf2 \strokec2 const\cf4 \strokec4  \{ \cf8 \strokec8 data\cf6 \strokec6 :\cf4 \strokec4  balData \} \cf6 \strokec6 =\cf4 \strokec4  \cf2 \strokec2 await\cf4 \strokec4  supabase.\cf2 \strokec2 from\cf4 \strokec4 (\cf5 \strokec5 'balances'\cf4 \strokec4 ).\cf6 \strokec6 select\cf4 \strokec4 (\cf5 \strokec5 '*'\cf4 \strokec4 );\
        \cf2 \strokec2 const\cf4 \strokec4  needsReset \cf6 \strokec6 =\cf4 \strokec4  balData.\cf6 \strokec6 some\cf4 \strokec4 (bal \cf6 \strokec6 =>\cf4 \strokec4  \{\
          \cf2 \strokec2 const\cf4 \strokec4  lastReset \cf6 \strokec6 =\cf4 \strokec4  \cf2 \strokec2 new\cf4 \strokec4  \cf7 \strokec7 Date\cf4 \strokec4 (bal.last_reset);\
          \cf2 \strokec2 return\cf4 \strokec4  lastReset.\cf6 \strokec6 getMonth\cf4 \strokec4 () \cf6 \strokec6 !==\cf4 \strokec4  currentMonth;\
        \});\
\
        \cf2 \strokec2 if\cf4 \strokec4  (needsReset) \{\
          \cf2 \strokec2 await\cf4 \strokec4  \cf6 \strokec6 resetMonthlyAllowance\cf4 \strokec4 ();\
        \}\
      \}\
    \} \cf2 \strokec2 catch\cf4 \strokec4  (error) \{\
      \cf7 \strokec7 console\cf4 \strokec4 .\cf6 \strokec6 error\cf4 \strokec4 (\cf5 \strokec5 'Error checking monthly reset:'\cf4 \strokec4 , error);\
    \}\
  \};\
\
  \cf2 \strokec2 const\cf4 \strokec4  \cf6 \strokec6 resetMonthlyAllowance\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  \cf2 \strokec2 async\cf4 \strokec4  () \cf6 \strokec6 =>\cf4 \strokec4  \{\
    \cf2 \strokec2 try\cf4 \strokec4  \{\
      \cf2 \strokec2 const\cf4 \strokec4  \{ error \} \cf6 \strokec6 =\cf4 \strokec4  \cf2 \strokec2 await\cf4 \strokec4  supabase\
        .\cf2 \strokec2 from\cf4 \strokec4 (\cf5 \strokec5 'balances'\cf4 \strokec4 )\
        .\cf6 \strokec6 update\cf4 \strokec4 (\{ \
          \cf8 \strokec8 points_to_give\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 25\cf4 \strokec4 , \
          \cf8 \strokec8 points_given\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 0\cf4 \strokec4 ,\
          \cf8 \strokec8 last_reset\cf6 \strokec6 :\cf4 \strokec4  \cf2 \strokec2 new\cf4 \strokec4  \cf7 \strokec7 Date\cf4 \strokec4 ().\cf6 \strokec6 toISOString\cf4 \strokec4 ()\
        \})\
        .\cf6 \strokec6 neq\cf4 \strokec4 (\cf5 \strokec5 'user_id'\cf4 \strokec4 , \cf5 \strokec5 ''\cf4 \strokec4 );\
\
      \cf2 \strokec2 if\cf4 \strokec4  (error) \cf2 \strokec2 throw\cf4 \strokec4  error;\
      \cf2 \strokec2 await\cf4 \strokec4  \cf6 \strokec6 loadData\cf4 \strokec4 ();\
    \} \cf2 \strokec2 catch\cf4 \strokec4  (error) \{\
      \cf7 \strokec7 console\cf4 \strokec4 .\cf6 \strokec6 error\cf4 \strokec4 (\cf5 \strokec5 'Error resetting monthly allowance:'\cf4 \strokec4 , error);\
    \}\
  \};\
\
  \cf2 \strokec2 const\cf4 \strokec4  \cf6 \strokec6 getUserBalance\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  (userId) \cf6 \strokec6 =>\cf4 \strokec4  \{\
    \cf2 \strokec2 return\cf4 \strokec4  balances.\cf6 \strokec6 find\cf4 \strokec4 (b \cf6 \strokec6 =>\cf4 \strokec4  b.user_id \cf6 \strokec6 ===\cf4 \strokec4  userId) \cf6 \strokec6 ||\cf4 \strokec4  \{\
      \cf8 \strokec8 points_to_give\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 25\cf4 \strokec4 ,\
      \cf8 \strokec8 points_given\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 0\cf4 \strokec4 ,\
      \cf8 \strokec8 points_earned\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 0\cf4 \strokec4 ,\
      \cf8 \strokec8 points_redeemed\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 0\cf4 \strokec4 \
    \};\
  \};\
\
  \cf2 \strokec2 const\cf4 \strokec4  \cf6 \strokec6 isAdmin\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  (user) \cf6 \strokec6 =>\cf4 \strokec4  \{\
    \cf2 \strokec2 return\cf4 \strokec4  user \cf6 \strokec6 &&\cf4 \strokec4  \cf7 \strokec7 ADMIN_EMAILS\cf4 \strokec4 .\cf6 \strokec6 includes\cf4 \strokec4 (user.email);\
  \};\
\
  \cf2 \strokec2 const\cf4 \strokec4  \cf6 \strokec6 giveKudos\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  \cf2 \strokec2 async\cf4 \strokec4  (receiverId, points, reason) \cf6 \strokec6 =>\cf4 \strokec4  \{\
    \cf2 \strokec2 if\cf4 \strokec4  (\cf6 \strokec6 !\cf4 \strokec4 currentUser \cf6 \strokec6 ||\cf4 \strokec4  receiverId \cf6 \strokec6 ===\cf4 \strokec4  currentUser.id) \{\
      \cf6 \strokec6 notify\cf4 \strokec4 (\cf5 \strokec5 'Cannot give kudos to yourself'\cf4 \strokec4 , \cf5 \strokec5 'error'\cf4 \strokec4 );\
      \cf2 \strokec2 throw\cf4 \strokec4  \cf2 \strokec2 new\cf4 \strokec4  \cf7 \strokec7 Error\cf4 \strokec4 (\cf5 \strokec5 'Cannot give kudos to yourself'\cf4 \strokec4 );\
    \}\
\
    \cf2 \strokec2 const\cf4 \strokec4  giverBalance \cf6 \strokec6 =\cf4 \strokec4  \cf6 \strokec6 getUserBalance\cf4 \strokec4 (currentUser.id);\
    \cf2 \strokec2 if\cf4 \strokec4  (points \cf6 \strokec6 >\cf4 \strokec4  giverBalance.points_to_give) \{\
      \cf6 \strokec6 notify\cf4 \strokec4 (\cf5 \strokec5 'Insufficient points remaining'\cf4 \strokec4 , \cf5 \strokec5 'error'\cf4 \strokec4 );\
      \cf2 \strokec2 throw\cf4 \strokec4  \cf2 \strokec2 new\cf4 \strokec4  \cf7 \strokec7 Error\cf4 \strokec4 (\cf5 \strokec5 'Insufficient points'\cf4 \strokec4 );\
    \}\
\
    \cf2 \strokec2 try\cf4 \strokec4  \{\
      
\f1\i \cf9 \strokec9 // Update giver balance
\f0\i0 \cf4 \strokec4 \
      \cf2 \strokec2 const\cf4 \strokec4  \{ \cf8 \strokec8 error\cf6 \strokec6 :\cf4 \strokec4  giverError \} \cf6 \strokec6 =\cf4 \strokec4  \cf2 \strokec2 await\cf4 \strokec4  supabase\
        .\cf2 \strokec2 from\cf4 \strokec4 (\cf5 \strokec5 'balances'\cf4 \strokec4 )\
        .\cf6 \strokec6 update\cf4 \strokec4 (\{\
          \cf8 \strokec8 points_to_give\cf6 \strokec6 :\cf4 \strokec4  giverBalance.points_to_give \cf6 \strokec6 -\cf4 \strokec4  points,\
          \cf8 \strokec8 points_given\cf6 \strokec6 :\cf4 \strokec4  giverBalance.points_given \cf6 \strokec6 +\cf4 \strokec4  points\
        \})\
        .\cf6 \strokec6 eq\cf4 \strokec4 (\cf5 \strokec5 'user_id'\cf4 \strokec4 , currentUser.id);\
\
      \cf2 \strokec2 if\cf4 \strokec4  (giverError) \cf2 \strokec2 throw\cf4 \strokec4  giverError;\
\
      
\f1\i \cf9 \strokec9 // Update receiver balance
\f0\i0 \cf4 \strokec4 \
      \cf2 \strokec2 const\cf4 \strokec4  receiverBalance \cf6 \strokec6 =\cf4 \strokec4  \cf6 \strokec6 getUserBalance\cf4 \strokec4 (receiverId);\
      \cf2 \strokec2 const\cf4 \strokec4  \{ \cf8 \strokec8 error\cf6 \strokec6 :\cf4 \strokec4  receiverError \} \cf6 \strokec6 =\cf4 \strokec4  \cf2 \strokec2 await\cf4 \strokec4  supabase\
        .\cf2 \strokec2 from\cf4 \strokec4 (\cf5 \strokec5 'balances'\cf4 \strokec4 )\
        .\cf6 \strokec6 update\cf4 \strokec4 (\{\
          \cf8 \strokec8 points_earned\cf6 \strokec6 :\cf4 \strokec4  receiverBalance.points_earned \cf6 \strokec6 +\cf4 \strokec4  points\
        \})\
        .\cf6 \strokec6 eq\cf4 \strokec4 (\cf5 \strokec5 'user_id'\cf4 \strokec4 , receiverId);\
\
      \cf2 \strokec2 if\cf4 \strokec4  (receiverError) \cf2 \strokec2 throw\cf4 \strokec4  receiverError;\
\
      
\f1\i \cf9 \strokec9 // Create transaction
\f0\i0 \cf4 \strokec4 \
      \cf2 \strokec2 const\cf4 \strokec4  \{ \cf8 \strokec8 error\cf6 \strokec6 :\cf4 \strokec4  txnError \} \cf6 \strokec6 =\cf4 \strokec4  \cf2 \strokec2 await\cf4 \strokec4  supabase\
        .\cf2 \strokec2 from\cf4 \strokec4 (\cf5 \strokec5 'transactions'\cf4 \strokec4 )\
        .\cf6 \strokec6 insert\cf4 \strokec4 (\{\
          \cf8 \strokec8 id\cf6 \strokec6 :\cf4 \strokec4  \cf5 \strokec5 `txn_\cf4 \strokec4 $\{\cf7 \strokec7 Date\cf4 \strokec4 .\cf6 \strokec6 now\cf4 \strokec4 ()\}\cf5 \strokec5 `\cf4 \strokec4 ,\
          \cf8 \strokec8 giver_id\cf6 \strokec6 :\cf4 \strokec4  currentUser.id,\
          \cf8 \strokec8 receiver_id\cf6 \strokec6 :\cf4 \strokec4  receiverId,\
          points,\
          reason,\
          \cf8 \strokec8 created_on\cf6 \strokec6 :\cf4 \strokec4  \cf2 \strokec2 new\cf4 \strokec4  \cf7 \strokec7 Date\cf4 \strokec4 ().\cf6 \strokec6 toISOString\cf4 \strokec4 ()\
        \});\
\
      \cf2 \strokec2 if\cf4 \strokec4  (txnError) \cf2 \strokec2 throw\cf4 \strokec4  txnError;\
\
      \cf2 \strokec2 await\cf4 \strokec4  \cf6 \strokec6 loadData\cf4 \strokec4 ();\
\
      \cf2 \strokec2 const\cf4 \strokec4  receiver \cf6 \strokec6 =\cf4 \strokec4  employees.\cf6 \strokec6 find\cf4 \strokec4 (e \cf6 \strokec6 =>\cf4 \strokec4  e.id \cf6 \strokec6 ===\cf4 \strokec4  receiverId);\
      \cf6 \strokec6 notify\cf4 \strokec4 (\cf5 \strokec5 `Kudos sent to \cf4 \strokec4 $\{receiver.name\}\cf5 \strokec5 !`\cf4 \strokec4 , \cf5 \strokec5 'success'\cf4 \strokec4 );\
      \cf6 \strokec6 setActiveScreen\cf4 \strokec4 (\cf5 \strokec5 'home'\cf4 \strokec4 );\
    \} \cf2 \strokec2 catch\cf4 \strokec4  (error) \{\
      \cf7 \strokec7 console\cf4 \strokec4 .\cf6 \strokec6 error\cf4 \strokec4 (\cf5 \strokec5 'Error giving kudos:'\cf4 \strokec4 , error);\
      \cf6 \strokec6 notify\cf4 \strokec4 (\cf5 \strokec5 'Error giving kudos. Please try again.'\cf4 \strokec4 , \cf5 \strokec5 'error'\cf4 \strokec4 );\
      \cf2 \strokec2 throw\cf4 \strokec4  error;\
    \}\
  \};\
\
  \cf2 \strokec2 const\cf4 \strokec4  \cf6 \strokec6 redeemPoints\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  \cf2 \strokec2 async\cf4 \strokec4  () \cf6 \strokec6 =>\cf4 \strokec4  \{\
    \cf2 \strokec2 const\cf4 \strokec4  balance \cf6 \strokec6 =\cf4 \strokec4  \cf6 \strokec6 getUserBalance\cf4 \strokec4 (currentUser.id);\
    \cf2 \strokec2 if\cf4 \strokec4  (balance.points_earned \cf6 \strokec6 <\cf4 \strokec4  \cf7 \strokec7 100\cf4 \strokec4 ) \{\
      \cf6 \strokec6 notify\cf4 \strokec4 (\cf5 \strokec5 'Need at least 100 points to redeem'\cf4 \strokec4 , \cf5 \strokec5 'error'\cf4 \strokec4 );\
      \cf2 \strokec2 return\cf4 \strokec4 ;\
    \}\
\
    \cf2 \strokec2 try\cf4 \strokec4  \{\
      
\f1\i \cf9 \strokec9 // Update balance
\f0\i0 \cf4 \strokec4 \
      \cf2 \strokec2 const\cf4 \strokec4  \{ \cf8 \strokec8 error\cf6 \strokec6 :\cf4 \strokec4  balError \} \cf6 \strokec6 =\cf4 \strokec4  \cf2 \strokec2 await\cf4 \strokec4  supabase\
        .\cf2 \strokec2 from\cf4 \strokec4 (\cf5 \strokec5 'balances'\cf4 \strokec4 )\
        .\cf6 \strokec6 update\cf4 \strokec4 (\{\
          \cf8 \strokec8 points_earned\cf6 \strokec6 :\cf4 \strokec4  balance.points_earned \cf6 \strokec6 -\cf4 \strokec4  \cf7 \strokec7 100\cf4 \strokec4 ,\
          \cf8 \strokec8 points_redeemed\cf6 \strokec6 :\cf4 \strokec4  balance.points_redeemed \cf6 \strokec6 +\cf4 \strokec4  \cf7 \strokec7 100\cf4 \strokec4 \
        \})\
        .\cf6 \strokec6 eq\cf4 \strokec4 (\cf5 \strokec5 'user_id'\cf4 \strokec4 , currentUser.id);\
\
      \cf2 \strokec2 if\cf4 \strokec4  (balError) \cf2 \strokec2 throw\cf4 \strokec4  balError;\
\
      
\f1\i \cf9 \strokec9 // Create redemption
\f0\i0 \cf4 \strokec4 \
      \cf2 \strokec2 const\cf4 \strokec4  \{ \cf8 \strokec8 error\cf6 \strokec6 :\cf4 \strokec4  redError \} \cf6 \strokec6 =\cf4 \strokec4  \cf2 \strokec2 await\cf4 \strokec4  supabase\
        .\cf2 \strokec2 from\cf4 \strokec4 (\cf5 \strokec5 'redemptions'\cf4 \strokec4 )\
        .\cf6 \strokec6 insert\cf4 \strokec4 (\{\
          \cf8 \strokec8 id\cf6 \strokec6 :\cf4 \strokec4  \cf5 \strokec5 `red_\cf4 \strokec4 $\{\cf7 \strokec7 Date\cf4 \strokec4 .\cf6 \strokec6 now\cf4 \strokec4 ()\}\cf5 \strokec5 `\cf4 \strokec4 ,\
          \cf8 \strokec8 requestor_id\cf6 \strokec6 :\cf4 \strokec4  currentUser.id,\
          \cf8 \strokec8 points_used\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 100\cf4 \strokec4 ,\
          \cf8 \strokec8 credit_amount\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 5\cf4 \strokec4 ,\
          \cf8 \strokec8 status\cf6 \strokec6 :\cf4 \strokec4  \cf5 \strokec5 'pending'\cf4 \strokec4 ,\
          \cf8 \strokec8 requested_at\cf6 \strokec6 :\cf4 \strokec4  \cf2 \strokec2 new\cf4 \strokec4  \cf7 \strokec7 Date\cf4 \strokec4 ().\cf6 \strokec6 toISOString\cf4 \strokec4 ()\
        \});\
\
      \cf2 \strokec2 if\cf4 \strokec4  (redError) \cf2 \strokec2 throw\cf4 \strokec4  redError;\
\
      \cf2 \strokec2 await\cf4 \strokec4  \cf6 \strokec6 loadData\cf4 \strokec4 ();\
      \cf6 \strokec6 notify\cf4 \strokec4 (\cf5 \strokec5 'Redemption submitted! Credit will arrive within 24 business hours.'\cf4 \strokec4 , \cf5 \strokec5 'success'\cf4 \strokec4 );\
    \} \cf2 \strokec2 catch\cf4 \strokec4  (error) \{\
      \cf7 \strokec7 console\cf4 \strokec4 .\cf6 \strokec6 error\cf4 \strokec4 (\cf5 \strokec5 'Error processing redemption:'\cf4 \strokec4 , error);\
      \cf6 \strokec6 notify\cf4 \strokec4 (\cf5 \strokec5 'Error processing redemption'\cf4 \strokec4 , \cf5 \strokec5 'error'\cf4 \strokec4 );\
    \}\
  \};\
\
  \cf2 \strokec2 const\cf4 \strokec4  updateRedemptionStatus \cf6 \strokec6 =\cf4 \strokec4  \cf2 \strokec2 async\cf4 \strokec4  (redemptionId, status, notes \cf6 \strokec6 =\cf4 \strokec4  \cf5 \strokec5 ''\cf4 \strokec4 ) \cf6 \strokec6 =>\cf4 \strokec4  \{\
    \cf2 \strokec2 try\cf4 \strokec4  \{\
      \cf2 \strokec2 const\cf4 \strokec4  \{ error \} \cf6 \strokec6 =\cf4 \strokec4  \cf2 \strokec2 await\cf4 \strokec4  supabase\
        .\cf2 \strokec2 from\cf4 \strokec4 (\cf5 \strokec5 'redemptions'\cf4 \strokec4 )\
        .\cf6 \strokec6 update\cf4 \strokec4 (\{\
          status,\
          notes,\
          \cf8 \strokec8 approved_by\cf6 \strokec6 :\cf4 \strokec4  status \cf6 \strokec6 ===\cf4 \strokec4  \cf5 \strokec5 'issued'\cf4 \strokec4  \cf6 \strokec6 ?\cf4 \strokec4  currentUser.id \cf6 \strokec6 :\cf4 \strokec4  \cf2 \strokec2 null\cf4 \strokec4 ,\
          [\cf5 \strokec5 `\cf4 \strokec4 $\{status\}\cf5 \strokec5 _at`\cf4 \strokec4 ]\cf6 \strokec6 :\cf4 \strokec4  \cf2 \strokec2 new\cf4 \strokec4  \cf7 \strokec7 Date\cf4 \strokec4 ().\cf6 \strokec6 toISOString\cf4 \strokec4 ()\
        \})\
        .\cf6 \strokec6 eq\cf4 \strokec4 (\cf5 \strokec5 'id'\cf4 \strokec4 , redemptionId);\
\
      \cf2 \strokec2 if\cf4 \strokec4  (error) \cf2 \strokec2 throw\cf4 \strokec4  error;\
\
      \cf2 \strokec2 await\cf4 \strokec4  \cf6 \strokec6 loadData\cf4 \strokec4 ();\
      \cf6 \strokec6 notify\cf4 \strokec4 (\cf5 \strokec5 `Redemption \cf4 \strokec4 $\{status\}\cf5 \strokec5 `\cf4 \strokec4 , \cf5 \strokec5 'success'\cf4 \strokec4 );\
    \} \cf2 \strokec2 catch\cf4 \strokec4  (error) \{\
      \cf7 \strokec7 console\cf4 \strokec4 .\cf6 \strokec6 error\cf4 \strokec4 (\cf5 \strokec5 'Error updating redemption:'\cf4 \strokec4 , error);\
      \cf6 \strokec6 notify\cf4 \strokec4 (\cf5 \strokec5 'Error updating redemption'\cf4 \strokec4 , \cf5 \strokec5 'error'\cf4 \strokec4 );\
    \}\
  \};\
\
  \cf2 \strokec2 const\cf4 \strokec4  \cf6 \strokec6 notify\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  (message, type) \cf6 \strokec6 =>\cf4 \strokec4  \{\
    \cf6 \strokec6 setShowNotification\cf4 \strokec4 (\{ message, type \});\
    \cf6 \strokec6 setTimeout\cf4 \strokec4 (() \cf6 \strokec6 =>\cf4 \strokec4  \cf6 \strokec6 setShowNotification\cf4 \strokec4 (\cf2 \strokec2 null\cf4 \strokec4 ), \cf7 \strokec7 3000\cf4 \strokec4 );\
  \};\
\
  \cf2 \strokec2 const\cf4 \strokec4  \cf6 \strokec6 getRecentActivity\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  () \cf6 \strokec6 =>\cf4 \strokec4  \{\
    \cf2 \strokec2 return\cf4 \strokec4  transactions\
      .\cf6 \strokec6 filter\cf4 \strokec4 (t \cf6 \strokec6 =>\cf4 \strokec4  t.receiver_id \cf6 \strokec6 ===\cf4 \strokec4  currentUser\cf6 \strokec6 ?.\cf4 \strokec4 id)\
      .\cf6 \strokec6 slice\cf4 \strokec4 (\cf7 \strokec7 0\cf4 \strokec4 , \cf7 \strokec7 5\cf4 \strokec4 );\
  \};\
\
  \cf2 \strokec2 const\cf4 \strokec4  \cf6 \strokec6 getLeaderboardData\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  () \cf6 \strokec6 =>\cf4 \strokec4  \{\
    \cf2 \strokec2 const\cf4 \strokec4  currentMonth \cf6 \strokec6 =\cf4 \strokec4  \cf2 \strokec2 new\cf4 \strokec4  \cf7 \strokec7 Date\cf4 \strokec4 ().\cf6 \strokec6 getMonth\cf4 \strokec4 ();\
    \cf2 \strokec2 const\cf4 \strokec4  monthTransactions \cf6 \strokec6 =\cf4 \strokec4  transactions.\cf6 \strokec6 filter\cf4 \strokec4 (t \cf6 \strokec6 =>\cf4 \strokec4  \
      \cf2 \strokec2 new\cf4 \strokec4  \cf7 \strokec7 Date\cf4 \strokec4 (t.created_on).\cf6 \strokec6 getMonth\cf4 \strokec4 () \cf6 \strokec6 ===\cf4 \strokec4  currentMonth\
    );\
\
    \cf2 \strokec2 const\cf4 \strokec4  receivers \cf6 \strokec6 =\cf4 \strokec4  \{\};\
    \cf2 \strokec2 const\cf4 \strokec4  givers \cf6 \strokec6 =\cf4 \strokec4  \{\};\
\
    monthTransactions.\cf6 \strokec6 forEach\cf4 \strokec4 (t \cf6 \strokec6 =>\cf4 \strokec4  \{\
      receivers[t.receiver_id] \cf6 \strokec6 =\cf4 \strokec4  (receivers[t.receiver_id] \cf6 \strokec6 ||\cf4 \strokec4  \cf7 \strokec7 0\cf4 \strokec4 ) \cf6 \strokec6 +\cf4 \strokec4  t.points;\
      givers[t.giver_id] \cf6 \strokec6 =\cf4 \strokec4  (givers[t.giver_id] \cf6 \strokec6 ||\cf4 \strokec4  \cf7 \strokec7 0\cf4 \strokec4 ) \cf6 \strokec6 +\cf4 \strokec4  t.points;\
    \});\
\
    \cf2 \strokec2 return\cf4 \strokec4  \{\
      \cf8 \strokec8 topReceivers\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 Object\cf4 \strokec4 .\cf6 \strokec6 entries\cf4 \strokec4 (receivers)\
        .\cf6 \strokec6 sort\cf4 \strokec4 ((a, b) \cf6 \strokec6 =>\cf4 \strokec4  b[\cf7 \strokec7 1\cf4 \strokec4 ] \cf6 \strokec6 -\cf4 \strokec4  a[\cf7 \strokec7 1\cf4 \strokec4 ])\
        .\cf6 \strokec6 slice\cf4 \strokec4 (\cf7 \strokec7 0\cf4 \strokec4 , \cf7 \strokec7 5\cf4 \strokec4 )\
        .\cf6 \strokec6 map\cf4 \strokec4 (([id, points]) \cf6 \strokec6 =>\cf4 \strokec4  (\{ \cf8 \strokec8 employee\cf6 \strokec6 :\cf4 \strokec4  employees.\cf6 \strokec6 find\cf4 \strokec4 (e \cf6 \strokec6 =>\cf4 \strokec4  e.id \cf6 \strokec6 ===\cf4 \strokec4  id), points \})),\
      \cf8 \strokec8 topGivers\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 Object\cf4 \strokec4 .\cf6 \strokec6 entries\cf4 \strokec4 (givers)\
        .\cf6 \strokec6 sort\cf4 \strokec4 ((a, b) \cf6 \strokec6 =>\cf4 \strokec4  b[\cf7 \strokec7 1\cf4 \strokec4 ] \cf6 \strokec6 -\cf4 \strokec4  a[\cf7 \strokec7 1\cf4 \strokec4 ])\
        .\cf6 \strokec6 slice\cf4 \strokec4 (\cf7 \strokec7 0\cf4 \strokec4 , \cf7 \strokec7 5\cf4 \strokec4 )\
        .\cf6 \strokec6 map\cf4 \strokec4 (([id, points]) \cf6 \strokec6 =>\cf4 \strokec4  (\{ \cf8 \strokec8 employee\cf6 \strokec6 :\cf4 \strokec4  employees.\cf6 \strokec6 find\cf4 \strokec4 (e \cf6 \strokec6 =>\cf4 \strokec4  e.id \cf6 \strokec6 ===\cf4 \strokec4  id), points \}))\
    \};\
  \};\
\
  \cf2 \strokec2 const\cf4 \strokec4  \cf6 \strokec6 HomeScreen\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  () \cf6 \strokec6 =>\cf4 \strokec4  \{\
    \cf2 \strokec2 const\cf4 \strokec4  balance \cf6 \strokec6 =\cf4 \strokec4  \cf6 \strokec6 getUserBalance\cf4 \strokec4 (currentUser.id);\
    \cf2 \strokec2 const\cf4 \strokec4  recentActivity \cf6 \strokec6 =\cf4 \strokec4  \cf6 \strokec6 getRecentActivity\cf4 \strokec4 ();\
    \cf2 \strokec2 const\cf4 \strokec4  progressToNext100 \cf6 \strokec6 =\cf4 \strokec4  balance.points_earned \cf6 \strokec6 %\cf4 \strokec4  \cf7 \strokec7 100\cf4 \strokec4 ;\
    \cf2 \strokec2 const\cf4 \strokec4  canRedeem \cf6 \strokec6 =\cf4 \strokec4  balance.points_earned \cf6 \strokec6 >=\cf4 \strokec4  \cf7 \strokec7 100\cf4 \strokec4 ;\
\
    \cf2 \strokec2 return\cf4 \strokec4  (\
      \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "space-y-6"\cf6 \strokec6 >\cf4 \strokec4 \
        \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "grid grid-cols-1 md:grid-cols-3 gap-6"\cf6 \strokec6 >\cf4 \strokec4 \
          \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "bg-white rounded-lg shadow p-6"\cf6 \strokec6 >\cf4 \strokec4 \
            \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "flex items-center justify-between mb-2"\cf6 \strokec6 >\cf4 \strokec4 \
              \cf6 \strokec6 <\cf4 \strokec4 h3 className\cf6 \strokec6 =\cf5 \strokec5 "text-gray-600 font-medium"\cf6 \strokec6 >\cf4 \strokec4 Points to Give\cf6 \strokec6 </\cf4 \strokec4 h3\cf6 \strokec6 >\cf4 \strokec4 \
              \cf6 \strokec6 <\cf4 \strokec4 Gift className\cf6 \strokec6 =\cf5 \strokec5 "w-5 h-5 text-blue-600"\cf4 \strokec4  \cf6 \strokec6 />\cf4 \strokec4 \
            \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
            \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "text-3xl font-bold text-gray-800"\cf6 \strokec6 >\cf4 \strokec4 \{balance.points_to_give\}\cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
            \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "text-sm text-gray-500 mt-1"\cf6 \strokec6 >\cf2 \strokec2 of\cf4 \strokec4  \cf7 \strokec7 25\cf4 \strokec4  monthly\cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
          \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
\
          \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "bg-white rounded-lg shadow p-6"\cf6 \strokec6 >\cf4 \strokec4 \
            \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "flex items-center justify-between mb-2"\cf6 \strokec6 >\cf4 \strokec4 \
              \cf6 \strokec6 <\cf4 \strokec4 h3 className\cf6 \strokec6 =\cf5 \strokec5 "text-gray-600 font-medium"\cf6 \strokec6 >\cf4 \strokec4 Points Earned\cf6 \strokec6 </\cf4 \strokec4 h3\cf6 \strokec6 >\cf4 \strokec4 \
              \cf6 \strokec6 <\cf4 \strokec4 Award className\cf6 \strokec6 =\cf5 \strokec5 "w-5 h-5 text-green-600"\cf4 \strokec4  \cf6 \strokec6 />\cf4 \strokec4 \
            \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
            \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "text-3xl font-bold text-gray-800"\cf6 \strokec6 >\cf4 \strokec4 \{balance.points_earned\}\cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
            \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "text-sm text-gray-500 mt-1"\cf6 \strokec6 >\cf4 \strokec4 total earned\cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
          \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
\
          \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "bg-white rounded-lg shadow p-6"\cf6 \strokec6 >\cf4 \strokec4 \
            \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "flex items-center justify-between mb-2"\cf6 \strokec6 >\cf4 \strokec4 \
              \cf6 \strokec6 <\cf4 \strokec4 h3 className\cf6 \strokec6 =\cf5 \strokec5 "text-gray-600 font-medium"\cf6 \strokec6 >\cf4 \strokec4 Points Redeemed\cf6 \strokec6 </\cf4 \strokec4 h3\cf6 \strokec6 >\cf4 \strokec4 \
              \cf6 \strokec6 <\cf4 \strokec4 TrendingUp className\cf6 \strokec6 =\cf5 \strokec5 "w-5 h-5 text-purple-600"\cf4 \strokec4  \cf6 \strokec6 />\cf4 \strokec4 \
            \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
            \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "text-3xl font-bold text-gray-800"\cf6 \strokec6 >\cf4 \strokec4 \{balance.points_redeemed\}\cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
            \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "text-sm text-gray-500 mt-1"\cf6 \strokec6 >\cf4 \strokec4 lifetime\cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
          \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
        \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
\
        \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "bg-white rounded-lg shadow p-6"\cf6 \strokec6 >\cf4 \strokec4 \
          \cf6 \strokec6 <\cf4 \strokec4 h3 className\cf6 \strokec6 =\cf5 \strokec5 "text-lg font-semibold text-gray-800 mb-4"\cf6 \strokec6 >\cf4 \strokec4 Progress to Next Redemption\cf6 \strokec6 </\cf4 \strokec4 h3\cf6 \strokec6 >\cf4 \strokec4 \
          \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "flex items-center space-x-4"\cf6 \strokec6 >\cf4 \strokec4 \
            \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "flex-1"\cf6 \strokec6 >\cf4 \strokec4 \
              \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "w-full bg-gray-200 rounded-full h-4"\cf6 \strokec6 >\cf4 \strokec4 \
                \cf6 \strokec6 <\cf4 \strokec4 div\
                  className\cf6 \strokec6 =\cf5 \strokec5 "bg-blue-600 h-4 rounded-full transition-all"\cf4 \strokec4 \
                  style\cf6 \strokec6 =\cf4 \strokec4 \{\{ \cf8 \strokec8 width\cf6 \strokec6 :\cf4 \strokec4  \cf5 \strokec5 `\cf4 \strokec4 $\{progressToNext100\}\cf5 \strokec5 %`\cf4 \strokec4  \}\}\
                \cf6 \strokec6 />\cf4 \strokec4 \
              \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
              \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "text-sm text-gray-600 mt-2"\cf6 \strokec6 >\cf4 \strokec4 \
                \{progressToNext100\} \cf2 \strokec2 of\cf4 \strokec4  \cf7 \strokec7 100\cf4 \strokec4  points\
              \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
            \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
            \cf6 \strokec6 <\cf4 \strokec4 button\
              onClick\cf6 \strokec6 =\cf4 \strokec4 \{redeemPoints\}\
              disabled\cf6 \strokec6 =\cf4 \strokec4 \{\cf6 \strokec6 !\cf4 \strokec4 canRedeem\}\
              className\cf6 \strokec6 =\cf4 \strokec4 \{\cf5 \strokec5 `px-6 py-3 rounded-lg font-semibold transition-colors \cf4 \strokec4 $\{\
                canRedeem\
                  \cf6 \strokec6 ?\cf4 \strokec4  \cf5 \strokec5 'bg-blue-600 hover:bg-blue-700 text-white'\cf4 \strokec4 \
                  \cf6 \strokec6 :\cf4 \strokec4  \cf5 \strokec5 'bg-gray-300 text-gray-500 cursor-not-allowed'\cf4 \strokec4 \
              \}\cf5 \strokec5 `\cf4 \strokec4 \}\
            \cf6 \strokec6 >\cf4 \strokec4 \
              Redeem \cf2 \strokec2 for\cf4 \strokec4  $5 Store Credit\
            \cf6 \strokec6 </\cf4 \strokec4 button\cf6 \strokec6 >\cf4 \strokec4 \
          \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
        \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
\
        \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "bg-white rounded-lg shadow p-6"\cf6 \strokec6 >\cf4 \strokec4 \
          \cf6 \strokec6 <\cf4 \strokec4 h3 className\cf6 \strokec6 =\cf5 \strokec5 "text-lg font-semibold text-gray-800 mb-4"\cf6 \strokec6 >\cf4 \strokec4 Recent Activity\cf6 \strokec6 </\cf4 \strokec4 h3\cf6 \strokec6 >\cf4 \strokec4 \
          \{recentActivity.length \cf6 \strokec6 ===\cf4 \strokec4  \cf7 \strokec7 0\cf4 \strokec4  \cf6 \strokec6 ?\cf4 \strokec4  (\
            \cf6 \strokec6 <\cf4 \strokec4 p className\cf6 \strokec6 =\cf5 \strokec5 "text-gray-500 text-center py-8"\cf6 \strokec6 >\cf4 \strokec4 No kudos received yet\cf6 \strokec6 </\cf4 \strokec4 p\cf6 \strokec6 >\cf4 \strokec4 \
          ) \cf6 \strokec6 :\cf4 \strokec4  (\
            \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "space-y-3"\cf6 \strokec6 >\cf4 \strokec4 \
              \{recentActivity.\cf6 \strokec6 map\cf4 \strokec4 (txn \cf6 \strokec6 =>\cf4 \strokec4  \{\
                \cf2 \strokec2 const\cf4 \strokec4  giver \cf6 \strokec6 =\cf4 \strokec4  employees.\cf6 \strokec6 find\cf4 \strokec4 (e \cf6 \strokec6 =>\cf4 \strokec4  e.id \cf6 \strokec6 ===\cf4 \strokec4  txn.giver_id);\
                \cf2 \strokec2 return\cf4 \strokec4  (\
                  \cf6 \strokec6 <\cf4 \strokec4 div key\cf6 \strokec6 =\cf4 \strokec4 \{txn.id\} className\cf6 \strokec6 =\cf5 \strokec5 "flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"\cf6 \strokec6 >\cf4 \strokec4 \
                    \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold"\cf6 \strokec6 >\cf4 \strokec4 \
                      \{giver\cf6 \strokec6 ?.\cf4 \strokec4 name.\cf6 \strokec6 charAt\cf4 \strokec4 (\cf7 \strokec7 0\cf4 \strokec4 )\}\
                    \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
                    \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "flex-1"\cf6 \strokec6 >\cf4 \strokec4 \
                      \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "flex items-center justify-between"\cf6 \strokec6 >\cf4 \strokec4 \
                        \cf6 \strokec6 <\cf4 \strokec4 span className\cf6 \strokec6 =\cf5 \strokec5 "font-semibold text-gray-800"\cf6 \strokec6 >\cf4 \strokec4 \{giver\cf6 \strokec6 ?.\cf4 \strokec4 name\}\cf6 \strokec6 </\cf4 \strokec4 span\cf6 \strokec6 >\cf4 \strokec4 \
                        \cf6 \strokec6 <\cf4 \strokec4 span className\cf6 \strokec6 =\cf5 \strokec5 "text-blue-600 font-bold"\cf6 \strokec6 >+\cf4 \strokec4 \{txn.points\}\cf6 \strokec6 </\cf4 \strokec4 span\cf6 \strokec6 >\cf4 \strokec4 \
                      \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
                      \cf6 \strokec6 <\cf4 \strokec4 p className\cf6 \strokec6 =\cf5 \strokec5 "text-gray-600 text-sm mt-1"\cf6 \strokec6 >\cf4 \strokec4 \{txn.reason\}\cf6 \strokec6 </\cf4 \strokec4 p\cf6 \strokec6 >\cf4 \strokec4 \
                      \cf6 \strokec6 <\cf4 \strokec4 p className\cf6 \strokec6 =\cf5 \strokec5 "text-gray-400 text-xs mt-1"\cf6 \strokec6 >\cf4 \strokec4 \
                        \{\cf2 \strokec2 new\cf4 \strokec4  \cf7 \strokec7 Date\cf4 \strokec4 (txn.created_on).\cf6 \strokec6 toLocaleDateString\cf4 \strokec4 ()\}\
                      \cf6 \strokec6 </\cf4 \strokec4 p\cf6 \strokec6 >\cf4 \strokec4 \
                    \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
                  \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
                );\
              \})\}\
            \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
          )\}\
        \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
      \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
    );\
  \};\
\
  \cf2 \strokec2 const\cf4 \strokec4  \cf6 \strokec6 GiveKudosScreen\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  () \cf6 \strokec6 =>\cf4 \strokec4  \{\
    \cf2 \strokec2 const\cf4 \strokec4  [selectedEmployee, setSelectedEmployee] \cf6 \strokec6 =\cf4 \strokec4  \cf6 \strokec6 useState\cf4 \strokec4 (\cf5 \strokec5 ''\cf4 \strokec4 );\
    \cf2 \strokec2 const\cf4 \strokec4  [points, setPoints] \cf6 \strokec6 =\cf4 \strokec4  \cf6 \strokec6 useState\cf4 \strokec4 (\cf7 \strokec7 5\cf4 \strokec4 );\
    \cf2 \strokec2 const\cf4 \strokec4  [reason, setReason] \cf6 \strokec6 =\cf4 \strokec4  \cf6 \strokec6 useState\cf4 \strokec4 (\cf5 \strokec5 ''\cf4 \strokec4 );\
    \cf2 \strokec2 const\cf4 \strokec4  [isSubmitting, setIsSubmitting] \cf6 \strokec6 =\cf4 \strokec4  \cf6 \strokec6 useState\cf4 \strokec4 (\cf7 \strokec7 false\cf4 \strokec4 );\
    \cf2 \strokec2 const\cf4 \strokec4  balance \cf6 \strokec6 =\cf4 \strokec4  \cf6 \strokec6 getUserBalance\cf4 \strokec4 (currentUser.id);\
\
    \cf2 \strokec2 const\cf4 \strokec4  \cf6 \strokec6 handleSubmit\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  \cf2 \strokec2 async\cf4 \strokec4  () \cf6 \strokec6 =>\cf4 \strokec4  \{\
      \cf2 \strokec2 if\cf4 \strokec4  (isSubmitting) \cf2 \strokec2 return\cf4 \strokec4 ;\
      \
      \cf2 \strokec2 if\cf4 \strokec4  (\cf6 \strokec6 !\cf4 \strokec4 selectedEmployee) \{\
        \cf6 \strokec6 notify\cf4 \strokec4 (\cf5 \strokec5 'Please select an employee'\cf4 \strokec4 , \cf5 \strokec5 'error'\cf4 \strokec4 );\
        \cf2 \strokec2 return\cf4 \strokec4 ;\
      \}\
      \
      \cf2 \strokec2 if\cf4 \strokec4  (\cf6 \strokec6 !\cf4 \strokec4 reason.\cf6 \strokec6 trim\cf4 \strokec4 ()) \{\
        \cf6 \strokec6 notify\cf4 \strokec4 (\cf5 \strokec5 'Please provide a reason'\cf4 \strokec4 , \cf5 \strokec5 'error'\cf4 \strokec4 );\
        \cf2 \strokec2 return\cf4 \strokec4 ;\
      \}\
      \
      \cf2 \strokec2 if\cf4 \strokec4  (points \cf6 \strokec6 <\cf4 \strokec4  \cf7 \strokec7 1\cf4 \strokec4  \cf6 \strokec6 ||\cf4 \strokec4  points \cf6 \strokec6 >\cf4 \strokec4  \cf7 \strokec7 10\cf4 \strokec4 ) \{\
        \cf6 \strokec6 notify\cf4 \strokec4 (\cf5 \strokec5 'Points must be between 1 and 10'\cf4 \strokec4 , \cf5 \strokec5 'error'\cf4 \strokec4 );\
        \cf2 \strokec2 return\cf4 \strokec4 ;\
      \}\
      \
      \cf6 \strokec6 setIsSubmitting\cf4 \strokec4 (\cf7 \strokec7 true\cf4 \strokec4 );\
      \
      \cf2 \strokec2 try\cf4 \strokec4  \{\
        \cf2 \strokec2 await\cf4 \strokec4  \cf6 \strokec6 giveKudos\cf4 \strokec4 (selectedEmployee, points, reason);\
        \cf6 \strokec6 setSelectedEmployee\cf4 \strokec4 (\cf5 \strokec5 ''\cf4 \strokec4 );\
        \cf6 \strokec6 setPoints\cf4 \strokec4 (\cf7 \strokec7 5\cf4 \strokec4 );\
        \cf6 \strokec6 setReason\cf4 \strokec4 (\cf5 \strokec5 ''\cf4 \strokec4 );\
      \} \cf2 \strokec2 catch\cf4 \strokec4  (error) \{\
        \cf7 \strokec7 console\cf4 \strokec4 .\cf6 \strokec6 error\cf4 \strokec4 (\cf5 \strokec5 'Error submitting kudos:'\cf4 \strokec4 , error);\
      \} \cf2 \strokec2 finally\cf4 \strokec4  \{\
        \cf6 \strokec6 setIsSubmitting\cf4 \strokec4 (\cf7 \strokec7 false\cf4 \strokec4 );\
      \}\
    \};\
\
    \cf2 \strokec2 return\cf4 \strokec4  (\
      \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "max-w-2xl mx-auto"\cf6 \strokec6 >\cf4 \strokec4 \
        \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "bg-white rounded-lg shadow p-6"\cf6 \strokec6 >\cf4 \strokec4 \
          \cf6 \strokec6 <\cf4 \strokec4 h2 className\cf6 \strokec6 =\cf5 \strokec5 "text-2xl font-bold text-gray-800 mb-6"\cf6 \strokec6 >\cf4 \strokec4 Give Kudos\cf6 \strokec6 </\cf4 \strokec4 h2\cf6 \strokec6 >\cf4 \strokec4 \
          \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "space-y-6"\cf6 \strokec6 >\cf4 \strokec4 \
            \cf6 \strokec6 <\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
              \cf6 \strokec6 <\cf4 \strokec4 label className\cf6 \strokec6 =\cf5 \strokec5 "block text-sm font-medium text-gray-700 mb-2"\cf6 \strokec6 >\cf4 \strokec4 \
                Select Coworker\
              \cf6 \strokec6 </\cf4 \strokec4 label\cf6 \strokec6 >\cf4 \strokec4 \
              \cf6 \strokec6 <\cf4 \strokec4 select\
                value\cf6 \strokec6 =\cf4 \strokec4 \{selectedEmployee\}\
                onChange\cf6 \strokec6 =\cf4 \strokec4 \{(e) \cf6 \strokec6 =>\cf4 \strokec4  \cf6 \strokec6 setSelectedEmployee\cf4 \strokec4 (e.target.value)\}\
                className\cf6 \strokec6 =\cf5 \strokec5 "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"\cf4 \strokec4 \
              \cf6 \strokec6 >\cf4 \strokec4 \
                \cf6 \strokec6 <\cf4 \strokec4 option value\cf6 \strokec6 =\cf5 \strokec5 ""\cf6 \strokec6 >\cf4 \strokec4 Choose an employee\cf6 \strokec6 ...</\cf4 \strokec4 option\cf6 \strokec6 >\cf4 \strokec4 \
                \{employees\
                  .\cf6 \strokec6 filter\cf4 \strokec4 (emp \cf6 \strokec6 =>\cf4 \strokec4  emp.id \cf6 \strokec6 !==\cf4 \strokec4  currentUser.id \cf6 \strokec6 &&\cf4 \strokec4  emp.active)\
                  .\cf6 \strokec6 map\cf4 \strokec4 (emp \cf6 \strokec6 =>\cf4 \strokec4  (\
                    \cf6 \strokec6 <\cf4 \strokec4 option key\cf6 \strokec6 =\cf4 \strokec4 \{emp.id\} value\cf6 \strokec6 =\cf4 \strokec4 \{emp.id\}\cf6 \strokec6 >\cf4 \strokec4 \
                      \{emp.name\} \cf6 \strokec6 -\cf4 \strokec4  \{emp.department\}\
                    \cf6 \strokec6 </\cf4 \strokec4 option\cf6 \strokec6 >\cf4 \strokec4 \
                  ))\}\
              \cf6 \strokec6 </\cf4 \strokec4 select\cf6 \strokec6 >\cf4 \strokec4 \
            \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
\
            \cf6 \strokec6 <\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
              \cf6 \strokec6 <\cf4 \strokec4 label className\cf6 \strokec6 =\cf5 \strokec5 "block text-sm font-medium text-gray-700 mb-2"\cf6 \strokec6 >\cf4 \strokec4 \
                \cf6 \strokec6 Points\cf4 \strokec4  (\cf7 \strokec7 1\cf6 \strokec6 -\cf7 \strokec7 10\cf4 \strokec4 )\
              \cf6 \strokec6 </\cf4 \strokec4 label\cf6 \strokec6 >\cf4 \strokec4 \
              \cf6 \strokec6 <\cf4 \strokec4 input\
                type\cf6 \strokec6 =\cf5 \strokec5 "number"\cf4 \strokec4 \
                min\cf6 \strokec6 =\cf5 \strokec5 "1"\cf4 \strokec4 \
                max\cf6 \strokec6 =\cf4 \strokec4 \{\cf7 \strokec7 Math\cf4 \strokec4 .\cf6 \strokec6 min\cf4 \strokec4 (\cf7 \strokec7 10\cf4 \strokec4 , balance.points_to_give)\}\
                value\cf6 \strokec6 =\cf4 \strokec4 \{points\}\
                onChange\cf6 \strokec6 =\cf4 \strokec4 \{(e) \cf6 \strokec6 =>\cf4 \strokec4  \{\
                  \cf2 \strokec2 const\cf4 \strokec4  val \cf6 \strokec6 =\cf4 \strokec4  \cf6 \strokec6 parseInt\cf4 \strokec4 (e.target.value) \cf6 \strokec6 ||\cf4 \strokec4  \cf7 \strokec7 1\cf4 \strokec4 ;\
                  \cf6 \strokec6 setPoints\cf4 \strokec4 (\cf7 \strokec7 Math\cf4 \strokec4 .\cf6 \strokec6 max\cf4 \strokec4 (\cf7 \strokec7 1\cf4 \strokec4 , \cf7 \strokec7 Math\cf4 \strokec4 .\cf6 \strokec6 min\cf4 \strokec4 (val, \cf7 \strokec7 Math\cf4 \strokec4 .\cf6 \strokec6 min\cf4 \strokec4 (\cf7 \strokec7 10\cf4 \strokec4 , balance.points_to_give))));\
                \}\}\
                className\cf6 \strokec6 =\cf5 \strokec5 "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"\cf4 \strokec4 \
              \cf6 \strokec6 />\cf4 \strokec4 \
              \cf6 \strokec6 <\cf4 \strokec4 p className\cf6 \strokec6 =\cf5 \strokec5 "text-sm text-gray-500 mt-1"\cf6 \strokec6 >\cf4 \strokec4 \
                You have \{balance.points_to_give\} points remaining \cf2 \strokec2 this\cf4 \strokec4  month\
              \cf6 \strokec6 </\cf4 \strokec4 p\cf6 \strokec6 >\cf4 \strokec4 \
            \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
\
            \cf6 \strokec6 <\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
              \cf6 \strokec6 <\cf4 \strokec4 label className\cf6 \strokec6 =\cf5 \strokec5 "block text-sm font-medium text-gray-700 mb-2"\cf6 \strokec6 >\cf4 \strokec4 \
                Reason \cf2 \strokec2 for\cf4 \strokec4  Kudos\
              \cf6 \strokec6 </\cf4 \strokec4 label\cf6 \strokec6 >\cf4 \strokec4 \
              \cf6 \strokec6 <\cf4 \strokec4 textarea\
                value\cf6 \strokec6 =\cf4 \strokec4 \{reason\}\
                onChange\cf6 \strokec6 =\cf4 \strokec4 \{(e) \cf6 \strokec6 =>\cf4 \strokec4  \cf6 \strokec6 setReason\cf4 \strokec4 (e.target.value)\}\
                rows\cf6 \strokec6 =\cf5 \strokec5 "4"\cf4 \strokec4 \
                placeholder\cf6 \strokec6 =\cf5 \strokec5 "What did they do that deserves recognition?"\cf4 \strokec4 \
                className\cf6 \strokec6 =\cf5 \strokec5 "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"\cf4 \strokec4 \
              \cf6 \strokec6 />\cf4 \strokec4 \
            \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
\
            \cf6 \strokec6 <\cf4 \strokec4 button\
              type\cf6 \strokec6 =\cf5 \strokec5 "button"\cf4 \strokec4 \
              onClick\cf6 \strokec6 =\cf4 \strokec4 \{handleSubmit\}\
              disabled\cf6 \strokec6 =\cf4 \strokec4 \{isSubmitting \cf6 \strokec6 ||\cf4 \strokec4  \cf6 \strokec6 !\cf4 \strokec4 selectedEmployee \cf6 \strokec6 ||\cf4 \strokec4  \cf6 \strokec6 !\cf4 \strokec4 reason.\cf6 \strokec6 trim\cf4 \strokec4 ()\}\
              className\cf6 \strokec6 =\cf4 \strokec4 \{\cf5 \strokec5 `w-full font-semibold py-3 rounded-lg transition-colors \cf4 \strokec4 $\{\
                isSubmitting \cf6 \strokec6 ||\cf4 \strokec4  \cf6 \strokec6 !\cf4 \strokec4 selectedEmployee \cf6 \strokec6 ||\cf4 \strokec4  \cf6 \strokec6 !\cf4 \strokec4 reason.\cf6 \strokec6 trim\cf4 \strokec4 ()\
                  \cf6 \strokec6 ?\cf4 \strokec4  \cf5 \strokec5 'bg-gray-400 cursor-not-allowed text-white'\cf4 \strokec4 \
                  \cf6 \strokec6 :\cf4 \strokec4  \cf5 \strokec5 'bg-blue-600 hover:bg-blue-700 text-white'\cf4 \strokec4 \
              \}\cf5 \strokec5 `\cf4 \strokec4 \}\
            \cf6 \strokec6 >\cf4 \strokec4 \
              \{isSubmitting \cf6 \strokec6 ?\cf4 \strokec4  \cf5 \strokec5 'Sending...'\cf4 \strokec4  \cf6 \strokec6 :\cf4 \strokec4  \cf5 \strokec5 'Give Kudos'\cf4 \strokec4 \}\
            \cf6 \strokec6 </\cf4 \strokec4 button\cf6 \strokec6 >\cf4 \strokec4 \
          \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
        \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
      \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
    );\
  \};\
\
  \cf2 \strokec2 const\cf4 \strokec4  \cf6 \strokec6 HistoryScreen\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  () \cf6 \strokec6 =>\cf4 \strokec4  \{\
    \cf2 \strokec2 const\cf4 \strokec4  given \cf6 \strokec6 =\cf4 \strokec4  transactions.\cf6 \strokec6 filter\cf4 \strokec4 (t \cf6 \strokec6 =>\cf4 \strokec4  t.giver_id \cf6 \strokec6 ===\cf4 \strokec4  currentUser.id);\
    \cf2 \strokec2 const\cf4 \strokec4  received \cf6 \strokec6 =\cf4 \strokec4  transactions.\cf6 \strokec6 filter\cf4 \strokec4 (t \cf6 \strokec6 =>\cf4 \strokec4  t.receiver_id \cf6 \strokec6 ===\cf4 \strokec4  currentUser.id);\
\
    \cf2 \strokec2 return\cf4 \strokec4  (\
      \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "space-y-6"\cf6 \strokec6 >\cf4 \strokec4 \
        \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "bg-white rounded-lg shadow p-6"\cf6 \strokec6 >\cf4 \strokec4 \
          \cf6 \strokec6 <\cf4 \strokec4 h2 className\cf6 \strokec6 =\cf5 \strokec5 "text-2xl font-bold text-gray-800 mb-4"\cf6 \strokec6 >\cf4 \strokec4 Kudos \cf7 \strokec7 I\cf4 \strokec4  Gave\cf6 \strokec6 </\cf4 \strokec4 h2\cf6 \strokec6 >\cf4 \strokec4 \
          \{given.length \cf6 \strokec6 ===\cf4 \strokec4  \cf7 \strokec7 0\cf4 \strokec4  \cf6 \strokec6 ?\cf4 \strokec4  (\
            \cf6 \strokec6 <\cf4 \strokec4 p className\cf6 \strokec6 =\cf5 \strokec5 "text-gray-500 text-center py-8"\cf6 \strokec6 >\cf4 \strokec4 No kudos given yet\cf6 \strokec6 </\cf4 \strokec4 p\cf6 \strokec6 >\cf4 \strokec4 \
          ) \cf6 \strokec6 :\cf4 \strokec4  (\
            \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "space-y-3"\cf6 \strokec6 >\cf4 \strokec4 \
              \{given.\cf6 \strokec6 map\cf4 \strokec4 (txn \cf6 \strokec6 =>\cf4 \strokec4  \{\
                \cf2 \strokec2 const\cf4 \strokec4  receiver \cf6 \strokec6 =\cf4 \strokec4  employees.\cf6 \strokec6 find\cf4 \strokec4 (e \cf6 \strokec6 =>\cf4 \strokec4  e.id \cf6 \strokec6 ===\cf4 \strokec4  txn.receiver_id);\
                \cf2 \strokec2 return\cf4 \strokec4  (\
                  \cf6 \strokec6 <\cf4 \strokec4 div key\cf6 \strokec6 =\cf4 \strokec4 \{txn.id\} className\cf6 \strokec6 =\cf5 \strokec5 "flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"\cf6 \strokec6 >\cf4 \strokec4 \
                    \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold"\cf6 \strokec6 >\cf4 \strokec4 \
                      \{receiver\cf6 \strokec6 ?.\cf4 \strokec4 name.\cf6 \strokec6 charAt\cf4 \strokec4 (\cf7 \strokec7 0\cf4 \strokec4 )\}\
                    \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
                    \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "flex-1"\cf6 \strokec6 >\cf4 \strokec4 \
                      \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "flex items-center justify-between"\cf6 \strokec6 >\cf4 \strokec4 \
                        \cf6 \strokec6 <\cf4 \strokec4 span className\cf6 \strokec6 =\cf5 \strokec5 "font-semibold text-gray-800"\cf6 \strokec6 >\cf4 \strokec4 \{receiver\cf6 \strokec6 ?.\cf4 \strokec4 name\}\cf6 \strokec6 </\cf4 \strokec4 span\cf6 \strokec6 >\cf4 \strokec4 \
                        \cf6 \strokec6 <\cf4 \strokec4 span className\cf6 \strokec6 =\cf5 \strokec5 "text-green-600 font-bold"\cf6 \strokec6 >-\cf4 \strokec4 \{txn.points\}\cf6 \strokec6 </\cf4 \strokec4 span\cf6 \strokec6 >\cf4 \strokec4 \
                      \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
                      \cf6 \strokec6 <\cf4 \strokec4 p className\cf6 \strokec6 =\cf5 \strokec5 "text-gray-600 text-sm mt-1"\cf6 \strokec6 >\cf4 \strokec4 \{txn.reason\}\cf6 \strokec6 </\cf4 \strokec4 p\cf6 \strokec6 >\cf4 \strokec4 \
                      \cf6 \strokec6 <\cf4 \strokec4 p className\cf6 \strokec6 =\cf5 \strokec5 "text-gray-400 text-xs mt-1"\cf6 \strokec6 >\cf4 \strokec4 \
                        \{\cf2 \strokec2 new\cf4 \strokec4  \cf7 \strokec7 Date\cf4 \strokec4 (txn.created_on).\cf6 \strokec6 toLocaleDateString\cf4 \strokec4 ()\}\
                      \cf6 \strokec6 </\cf4 \strokec4 p\cf6 \strokec6 >\cf4 \strokec4 \
                    \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
                  \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
                );\
              \})\}\
            \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
          )\}\
        \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
\
        \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "bg-white rounded-lg shadow p-6"\cf6 \strokec6 >\cf4 \strokec4 \
          \cf6 \strokec6 <\cf4 \strokec4 h2 className\cf6 \strokec6 =\cf5 \strokec5 "text-2xl font-bold text-gray-800 mb-4"\cf6 \strokec6 >\cf4 \strokec4 Kudos \cf7 \strokec7 I\cf4 \strokec4  Received\cf6 \strokec6 </\cf4 \strokec4 h2\cf6 \strokec6 >\cf4 \strokec4 \
          \{received.length \cf6 \strokec6 ===\cf4 \strokec4  \cf7 \strokec7 0\cf4 \strokec4  \cf6 \strokec6 ?\cf4 \strokec4  (\
            \cf6 \strokec6 <\cf4 \strokec4 p className\cf6 \strokec6 =\cf5 \strokec5 "text-gray-500 text-center py-8"\cf6 \strokec6 >\cf4 \strokec4 No kudos received yet\cf6 \strokec6 </\cf4 \strokec4 p\cf6 \strokec6 >\cf4 \strokec4 \
          ) \cf6 \strokec6 :\cf4 \strokec4  (\
            \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "space-y-3"\cf6 \strokec6 >\cf4 \strokec4 \
              \{received.\cf6 \strokec6 map\cf4 \strokec4 (txn \cf6 \strokec6 =>\cf4 \strokec4  \{\
                \cf2 \strokec2 const\cf4 \strokec4  giver \cf6 \strokec6 =\cf4 \strokec4  employees.\cf6 \strokec6 find\cf4 \strokec4 (e \cf6 \strokec6 =>\cf4 \strokec4  e.id \cf6 \strokec6 ===\cf4 \strokec4  txn.giver_id);\
                \cf2 \strokec2 return\cf4 \strokec4  (\
                  \cf6 \strokec6 <\cf4 \strokec4 div key\cf6 \strokec6 =\cf4 \strokec4 \{txn.id\} className\cf6 \strokec6 =\cf5 \strokec5 "flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"\cf6 \strokec6 >\cf4 \strokec4 \
                    \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold"\cf6 \strokec6 >\cf4 \strokec4 \
                      \{giver\cf6 \strokec6 ?.\cf4 \strokec4 name.\cf6 \strokec6 charAt\cf4 \strokec4 (\cf7 \strokec7 0\cf4 \strokec4 )\}\
                    \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
                    \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "flex-1"\cf6 \strokec6 >\cf4 \strokec4 \
                      \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "flex items-center justify-between"\cf6 \strokec6 >\cf4 \strokec4 \
                        \cf6 \strokec6 <\cf4 \strokec4 span className\cf6 \strokec6 =\cf5 \strokec5 "font-semibold text-gray-800"\cf6 \strokec6 >\cf4 \strokec4 \{giver\cf6 \strokec6 ?.\cf4 \strokec4 name\}\cf6 \strokec6 </\cf4 \strokec4 span\cf6 \strokec6 >\cf4 \strokec4 \
                        \cf6 \strokec6 <\cf4 \strokec4 span className\cf6 \strokec6 =\cf5 \strokec5 "text-blue-600 font-bold"\cf6 \strokec6 >+\cf4 \strokec4 \{txn.points\}\cf6 \strokec6 </\cf4 \strokec4 span\cf6 \strokec6 >\cf4 \strokec4 \
                      \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
                      \cf6 \strokec6 <\cf4 \strokec4 p className\cf6 \strokec6 =\cf5 \strokec5 "text-gray-600 text-sm mt-1"\cf6 \strokec6 >\cf4 \strokec4 \{txn.reason\}\cf6 \strokec6 </\cf4 \strokec4 p\cf6 \strokec6 >\cf4 \strokec4 \
                      \cf6 \strokec6 <\cf4 \strokec4 p className\cf6 \strokec6 =\cf5 \strokec5 "text-gray-400 text-xs mt-1"\cf6 \strokec6 >\cf4 \strokec4 \
                        \{\cf2 \strokec2 new\cf4 \strokec4  \cf7 \strokec7 Date\cf4 \strokec4 (txn.created_on).\cf6 \strokec6 toLocaleDateString\cf4 \strokec4 ()\}\
                      \cf6 \strokec6 </\cf4 \strokec4 p\cf6 \strokec6 >\cf4 \strokec4 \
                    \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
                  \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
                );\
              \})\}\
            \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
          )\}\
        \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
      \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
    );\
  \};\
\
  \cf2 \strokec2 const\cf4 \strokec4  \cf6 \strokec6 LeaderboardScreen\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  () \cf6 \strokec6 =>\cf4 \strokec4  \{\
    \cf2 \strokec2 const\cf4 \strokec4  \{ topReceivers, topGivers \} \cf6 \strokec6 =\cf4 \strokec4  \cf6 \strokec6 getLeaderboardData\cf4 \strokec4 ();\
\
    \cf2 \strokec2 return\cf4 \strokec4  (\
      \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "grid grid-cols-1 md:grid-cols-2 gap-6"\cf6 \strokec6 >\cf4 \strokec4 \
        \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "bg-white rounded-lg shadow p-6"\cf6 \strokec6 >\cf4 \strokec4 \
          \cf6 \strokec6 <\cf4 \strokec4 h2 className\cf6 \strokec6 =\cf5 \strokec5 "text-2xl font-bold text-gray-800 mb-4"\cf6 \strokec6 >\cf4 \strokec4 Top Receivers\cf6 \strokec6 </\cf4 \strokec4 h2\cf6 \strokec6 >\cf4 \strokec4 \
          \{topReceivers.length \cf6 \strokec6 ===\cf4 \strokec4  \cf7 \strokec7 0\cf4 \strokec4  \cf6 \strokec6 ?\cf4 \strokec4  (\
            \cf6 \strokec6 <\cf4 \strokec4 p className\cf6 \strokec6 =\cf5 \strokec5 "text-gray-500 text-center py-8"\cf6 \strokec6 >\cf4 \strokec4 No data yet\cf6 \strokec6 </\cf4 \strokec4 p\cf6 \strokec6 >\cf4 \strokec4 \
          ) \cf6 \strokec6 :\cf4 \strokec4  (\
            \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "space-y-3"\cf6 \strokec6 >\cf4 \strokec4 \
              \{topReceivers.\cf6 \strokec6 map\cf4 \strokec4 ((item, idx) \cf6 \strokec6 =>\cf4 \strokec4  (\
                \cf6 \strokec6 <\cf4 \strokec4 div key\cf6 \strokec6 =\cf4 \strokec4 \{item.employee\cf6 \strokec6 ?.\cf4 \strokec4 id\} className\cf6 \strokec6 =\cf5 \strokec5 "flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"\cf6 \strokec6 >\cf4 \strokec4 \
                  \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "text-2xl font-bold text-gray-400 w-8"\cf6 \strokec6 >\cf4 \strokec4 #\{idx \cf6 \strokec6 +\cf4 \strokec4  \cf7 \strokec7 1\cf4 \strokec4 \}\cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
                  \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold"\cf6 \strokec6 >\cf4 \strokec4 \
                    \{item.employee\cf6 \strokec6 ?.\cf4 \strokec4 name.\cf6 \strokec6 charAt\cf4 \strokec4 (\cf7 \strokec7 0\cf4 \strokec4 )\}\
                  \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
                  \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "flex-1"\cf6 \strokec6 >\cf4 \strokec4 \
                    \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "font-semibold text-gray-800"\cf6 \strokec6 >\cf4 \strokec4 \{item.employee\cf6 \strokec6 ?.\cf4 \strokec4 name\}\cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
                    \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "text-sm text-gray-500"\cf6 \strokec6 >\cf4 \strokec4 \{item.employee\cf6 \strokec6 ?.\cf4 \strokec4 department\}\cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
                  \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
                  \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "text-blue-600 font-bold text-xl"\cf6 \strokec6 >\cf4 \strokec4 \{item.points\}\cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
                \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
              ))\}\
            \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
          )\}\
        \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
\
        \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "bg-white rounded-lg shadow p-6"\cf6 \strokec6 >\cf4 \strokec4 \
          \cf6 \strokec6 <\cf4 \strokec4 h2 className\cf6 \strokec6 =\cf5 \strokec5 "text-2xl font-bold text-gray-800 mb-4"\cf6 \strokec6 >\cf4 \strokec4 Top Givers\cf6 \strokec6 </\cf4 \strokec4 h2\cf6 \strokec6 >\cf4 \strokec4 \
          \{topGivers.length \cf6 \strokec6 ===\cf4 \strokec4  \cf7 \strokec7 0\cf4 \strokec4  \cf6 \strokec6 ?\cf4 \strokec4  (\
            \cf6 \strokec6 <\cf4 \strokec4 p className\cf6 \strokec6 =\cf5 \strokec5 "text-gray-500 text-center py-8"\cf6 \strokec6 >\cf4 \strokec4 No data yet\cf6 \strokec6 </\cf4 \strokec4 p\cf6 \strokec6 >\cf4 \strokec4 \
          ) \cf6 \strokec6 :\cf4 \strokec4  (\
            \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "space-y-3"\cf6 \strokec6 >\cf4 \strokec4 \
              \{topGivers.\cf6 \strokec6 map\cf4 \strokec4 ((item, idx) \cf6 \strokec6 =>\cf4 \strokec4  (\
                \cf6 \strokec6 <\cf4 \strokec4 div key\cf6 \strokec6 =\cf4 \strokec4 \{item.employee\cf6 \strokec6 ?.\cf4 \strokec4 id\} className\cf6 \strokec6 =\cf5 \strokec5 "flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"\cf6 \strokec6 >\cf4 \strokec4 \
                  \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "text-2xl font-bold text-gray-400 w-8"\cf6 \strokec6 >\cf4 \strokec4 #\{idx \cf6 \strokec6 +\cf4 \strokec4  \cf7 \strokec7 1\cf4 \strokec4 \}\cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
                  \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold"\cf6 \strokec6 >\cf4 \strokec4 \
                    \{item.employee\cf6 \strokec6 ?.\cf4 \strokec4 name.\cf6 \strokec6 charAt\cf4 \strokec4 (\cf7 \strokec7 0\cf4 \strokec4 )\}\
                  \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
                  \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "flex-1"\cf6 \strokec6 >\cf4 \strokec4 \
                    \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "font-semibold text-gray-800"\cf6 \strokec6 >\cf4 \strokec4 \{item.employee\cf6 \strokec6 ?.\cf4 \strokec4 name\}\cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
                    \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "text-sm text-gray-500"\cf6 \strokec6 >\cf4 \strokec4 \{item.employee\cf6 \strokec6 ?.\cf4 \strokec4 department\}\cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
                  \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
                  \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "text-green-600 font-bold text-xl"\cf6 \strokec6 >\cf4 \strokec4 \{item.points\}\cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
                \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
              ))\}\
            \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
          )\}\
        \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
      \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
    );\
  \};\
\
  \cf2 \strokec2 const\cf4 \strokec4  \cf6 \strokec6 AdminScreen\cf4 \strokec4  \cf6 \strokec6 =\cf4 \strokec4  () \cf6 \strokec6 =>\cf4 \strokec4  \{\
    \cf2 \strokec2 const\cf4 \strokec4  pendingRedemptions \cf6 \strokec6 =\cf4 \strokec4  redemptions.\cf6 \strokec6 filter\cf4 \strokec4 (r \cf6 \strokec6 =>\cf4 \strokec4  r.status \cf6 \strokec6 ===\cf4 \strokec4  \cf5 \strokec5 'pending'\cf4 \strokec4 );\
\
    \cf2 \strokec2 return\cf4 \strokec4  (\
      \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "bg-white rounded-lg shadow p-6"\cf6 \strokec6 >\cf4 \strokec4 \
        \cf6 \strokec6 <\cf4 \strokec4 h2 className\cf6 \strokec6 =\cf5 \strokec5 "text-2xl font-bold text-gray-800 mb-6"\cf6 \strokec6 >\cf4 \strokec4 Pending Redemptions\cf6 \strokec6 </\cf4 \strokec4 h2\cf6 \strokec6 >\cf4 \strokec4 \
        \{pendingRedemptions.length \cf6 \strokec6 ===\cf4 \strokec4  \cf7 \strokec7 0\cf4 \strokec4  \cf6 \strokec6 ?\cf4 \strokec4  (\
          \cf6 \strokec6 <\cf4 \strokec4 p className\cf6 \strokec6 =\cf5 \strokec5 "text-gray-500 text-center py-8"\cf6 \strokec6 >\cf4 \strokec4 No pending redemptions\cf6 \strokec6 </\cf4 \strokec4 p\cf6 \strokec6 >\cf4 \strokec4 \
        ) \cf6 \strokec6 :\cf4 \strokec4  (\
          \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "space-y-4"\cf6 \strokec6 >\cf4 \strokec4 \
            \{pendingRedemptions.\cf6 \strokec6 map\cf4 \strokec4 (red \cf6 \strokec6 =>\cf4 \strokec4  \{\
              \cf2 \strokec2 const\cf4 \strokec4  requestor \cf6 \strokec6 =\cf4 \strokec4  employees.\cf6 \strokec6 find\cf4 \strokec4 (e \cf6 \strokec6 =>\cf4 \strokec4  e.id \cf6 \strokec6 ===\cf4 \strokec4  red.requestor_id);\
              \cf2 \strokec2 return\cf4 \strokec4  (\
                \cf6 \strokec6 <\cf4 \strokec4 div key\cf6 \strokec6 =\cf4 \strokec4 \{red.id\} className\cf6 \strokec6 =\cf5 \strokec5 "border border-gray-200 rounded-lg p-4"\cf6 \strokec6 >\cf4 \strokec4 \
                  \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "flex items-start justify-between"\cf6 \strokec6 >\cf4 \strokec4 \
                    \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "flex items-start space-x-3"\cf6 \strokec6 >\cf4 \strokec4 \
                      \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-lg"\cf6 \strokec6 >\cf4 \strokec4 \
                        \{requestor\cf6 \strokec6 ?.\cf4 \strokec4 name.\cf6 \strokec6 charAt\cf4 \strokec4 (\cf7 \strokec7 0\cf4 \strokec4 )\}\
                      \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
                      \cf6 \strokec6 <\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
                        \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "font-semibold text-gray-800"\cf6 \strokec6 >\cf4 \strokec4 \{requestor\cf6 \strokec6 ?.\cf4 \strokec4 name\}\cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
                        \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "text-sm text-gray-500"\cf6 \strokec6 >\cf4 \strokec4 \{requestor\cf6 \strokec6 ?.\cf4 \strokec4 department\}\cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
                        \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "text-sm text-gray-600 mt-2"\cf6 \strokec6 >\cf4 \strokec4 \
                          \cf6 \strokec6 <\cf4 \strokec4 span className\cf6 \strokec6 =\cf5 \strokec5 "font-medium"\cf6 \strokec6 >\cf4 \strokec4 Amount\cf6 \strokec6 :</\cf4 \strokec4 span\cf6 \strokec6 >\cf4 \strokec4  $\{red.credit_amount\} store credit\
                        \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
                        \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "text-sm text-gray-600"\cf6 \strokec6 >\cf4 \strokec4 \
                          \cf6 \strokec6 <\cf4 \strokec4 span className\cf6 \strokec6 =\cf5 \strokec5 "font-medium"\cf6 \strokec6 >\cf4 \strokec4 Points Used\cf6 \strokec6 :</\cf4 \strokec4 span\cf6 \strokec6 >\cf4 \strokec4  \{red.points_used\}\
                        \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
                        \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "text-sm text-gray-500 mt-1"\cf6 \strokec6 >\cf4 \strokec4 \
                          \cf8 \strokec8 Requested\cf6 \strokec6 :\cf4 \strokec4  \{\cf2 \strokec2 new\cf4 \strokec4  \cf7 \strokec7 Date\cf4 \strokec4 (red.requested_at).\cf6 \strokec6 toLocaleString\cf4 \strokec4 ()\}\
                        \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
                      \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
                    \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
                    \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "flex space-x-2"\cf6 \strokec6 >\cf4 \strokec4 \
                      \cf6 \strokec6 <\cf4 \strokec4 button\
                        onClick\cf6 \strokec6 =\cf4 \strokec4 \{() \cf6 \strokec6 =>\cf4 \strokec4  \cf6 \strokec6 updateRedemptionStatus\cf4 \strokec4 (red.id, \cf5 \strokec5 'issued'\cf4 \strokec4 )\}\
                        className\cf6 \strokec6 =\cf5 \strokec5 "px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"\cf4 \strokec4 \
                      \cf6 \strokec6 >\cf4 \strokec4 \
                        Issue\
                      \cf6 \strokec6 </\cf4 \strokec4 button\cf6 \strokec6 >\cf4 \strokec4 \
                      \cf6 \strokec6 <\cf4 \strokec4 button\
                        onClick\cf6 \strokec6 =\cf4 \strokec4 \{() \cf6 \strokec6 =>\cf4 \strokec4  \cf6 \strokec6 updateRedemptionStatus\cf4 \strokec4 (red.id, \cf5 \strokec5 'rejected'\cf4 \strokec4 , \cf5 \strokec5 'Please contact administrator'\cf4 \strokec4 )\}\
                        className\cf6 \strokec6 =\cf5 \strokec5 "px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"\cf4 \strokec4 \
                      \cf6 \strokec6 >\cf4 \strokec4 \
                        Reject\
                      \cf6 \strokec6 </\cf4 \strokec4 button\cf6 \strokec6 >\cf4 \strokec4 \
                    \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
                  \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
                \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
              );\
            \})\}\
          \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
        )\}\
      \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
    );\
  \};\
\
  \cf2 \strokec2 if\cf4 \strokec4  (isLoading) \{\
    \cf2 \strokec2 return\cf4 \strokec4  (\
      \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center"\cf6 \strokec6 >\cf4 \strokec4 \
        \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "text-center"\cf6 \strokec6 >\cf4 \strokec4 \
          \cf6 \strokec6 <\cf4 \strokec4 Award className\cf6 \strokec6 =\cf5 \strokec5 "w-16 h-16 text-blue-600 mx-auto mb-4 animate-pulse"\cf4 \strokec4  \cf6 \strokec6 />\cf4 \strokec4 \
          \cf6 \strokec6 <\cf4 \strokec4 p className\cf6 \strokec6 =\cf5 \strokec5 "text-gray-600"\cf6 \strokec6 >\cf4 \strokec4 Loading \cf7 \strokec7 VBA\cf4 \strokec4  Kudos\cf6 \strokec6 ...</\cf4 \strokec4 p\cf6 \strokec6 >\cf4 \strokec4 \
        \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
      \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
    );\
  \}\
\
  \cf2 \strokec2 if\cf4 \strokec4  (\cf6 \strokec6 !\cf4 \strokec4 currentUser) \{\
    \cf2 \strokec2 return\cf4 \strokec4  (\
      \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4"\cf6 \strokec6 >\cf4 \strokec4 \
        \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "bg-white rounded-lg shadow-xl p-8 max-w-md w-full"\cf6 \strokec6 >\cf4 \strokec4 \
          \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "text-center mb-6"\cf6 \strokec6 >\cf4 \strokec4 \
            \cf6 \strokec6 <\cf4 \strokec4 Award className\cf6 \strokec6 =\cf5 \strokec5 "w-16 h-16 text-blue-600 mx-auto mb-4"\cf4 \strokec4  \cf6 \strokec6 />\cf4 \strokec4 \
            \cf6 \strokec6 <\cf4 \strokec4 h1 className\cf6 \strokec6 =\cf5 \strokec5 "text-3xl font-bold text-gray-800 mb-2"\cf6 \strokec6 >\cf7 \strokec7 VBA\cf4 \strokec4  Kudos\cf6 \strokec6 </\cf4 \strokec4 h1\cf6 \strokec6 >\cf4 \strokec4 \
            \cf6 \strokec6 <\cf4 \strokec4 p className\cf6 \strokec6 =\cf5 \strokec5 "text-gray-600"\cf6 \strokec6 >\cf4 \strokec4 Recognize great work\cf6 \strokec6 </\cf4 \strokec4 p\cf6 \strokec6 >\cf4 \strokec4 \
          \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
          \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "space-y-3"\cf6 \strokec6 >\cf4 \strokec4 \
            \{employees.\cf6 \strokec6 map\cf4 \strokec4 (emp \cf6 \strokec6 =>\cf4 \strokec4  (\
              \cf6 \strokec6 <\cf4 \strokec4 button\
                key\cf6 \strokec6 =\cf4 \strokec4 \{emp.id\}\
                onClick\cf6 \strokec6 =\cf4 \strokec4 \{() \cf6 \strokec6 =>\cf4 \strokec4  \cf6 \strokec6 setCurrentUser\cf4 \strokec4 (emp)\}\
                className\cf6 \strokec6 =\cf5 \strokec5 "w-full p-4 text-left border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all"\cf4 \strokec4 \
              \cf6 \strokec6 >\cf4 \strokec4 \
                \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "font-semibold text-gray-800"\cf6 \strokec6 >\cf4 \strokec4 \{emp.name\}\cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
                \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "text-sm text-gray-500"\cf6 \strokec6 >\cf4 \strokec4 \{emp.department\}\cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
              \cf6 \strokec6 </\cf4 \strokec4 button\cf6 \strokec6 >\cf4 \strokec4 \
            ))\}\
          \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
        \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
      \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
    );\
  \}\
\
  \cf2 \strokec2 return\cf4 \strokec4  (\
    \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "min-h-screen bg-gray-50"\cf6 \strokec6 >\cf4 \strokec4 \
      \{showNotification \cf6 \strokec6 &&\cf4 \strokec4  (\
        \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf4 \strokec4 \{\cf5 \strokec5 `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg \cf4 \strokec4 $\{\
          showNotification.type \cf6 \strokec6 ===\cf4 \strokec4  \cf5 \strokec5 'success'\cf4 \strokec4  \cf6 \strokec6 ?\cf4 \strokec4  \cf5 \strokec5 'bg-green-500'\cf4 \strokec4  \cf6 \strokec6 :\cf4 \strokec4  \cf5 \strokec5 'bg-red-500'\cf4 \strokec4 \
        \}\cf5 \strokec5  text-white`\cf4 \strokec4 \}\cf6 \strokec6 >\cf4 \strokec4 \
          \{showNotification.message\}\
        \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
      )\}\
\
      \cf6 \strokec6 <\cf4 \strokec4 header className\cf6 \strokec6 =\cf5 \strokec5 "bg-blue-600 text-white shadow-lg"\cf6 \strokec6 >\cf4 \strokec4 \
        \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "max-w-7xl mx-auto px-4 py-4 flex items-center justify-between"\cf6 \strokec6 >\cf4 \strokec4 \
          \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "flex items-center space-x-3"\cf6 \strokec6 >\cf4 \strokec4 \
            \cf6 \strokec6 <\cf4 \strokec4 Award className\cf6 \strokec6 =\cf5 \strokec5 "w-8 h-8"\cf4 \strokec4  \cf6 \strokec6 />\cf4 \strokec4 \
            \cf6 \strokec6 <\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
              \cf6 \strokec6 <\cf4 \strokec4 h1 className\cf6 \strokec6 =\cf5 \strokec5 "text-2xl font-bold"\cf6 \strokec6 >\cf7 \strokec7 VBA\cf4 \strokec4  Kudos\cf6 \strokec6 </\cf4 \strokec4 h1\cf6 \strokec6 >\cf4 \strokec4 \
              \cf6 \strokec6 <\cf4 \strokec4 p className\cf6 \strokec6 =\cf5 \strokec5 "text-blue-100 text-sm"\cf6 \strokec6 >\cf4 \strokec4 \{currentUser.name\}\cf6 \strokec6 </\cf4 \strokec4 p\cf6 \strokec6 >\cf4 \strokec4 \
            \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
          \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
          \cf6 \strokec6 <\cf4 \strokec4 button\
            onClick\cf6 \strokec6 =\cf4 \strokec4 \{() \cf6 \strokec6 =>\cf4 \strokec4  \cf6 \strokec6 setCurrentUser\cf4 \strokec4 (\cf2 \strokec2 null\cf4 \strokec4 )\}\
            className\cf6 \strokec6 =\cf5 \strokec5 "flex items-center space-x-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors"\cf4 \strokec4 \
          \cf6 \strokec6 >\cf4 \strokec4 \
            \cf6 \strokec6 <\cf4 \strokec4 LogOut className\cf6 \strokec6 =\cf5 \strokec5 "w-4 h-4"\cf4 \strokec4  \cf6 \strokec6 />\cf4 \strokec4 \
            \cf6 \strokec6 <\cf4 \strokec4 span\cf6 \strokec6 >\cf4 \strokec4 Sign Out\cf6 \strokec6 </\cf4 \strokec4 span\cf6 \strokec6 >\cf4 \strokec4 \
          \cf6 \strokec6 </\cf4 \strokec4 button\cf6 \strokec6 >\cf4 \strokec4 \
        \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
      \cf6 \strokec6 </\cf4 \strokec4 header\cf6 \strokec6 >\cf4 \strokec4 \
\
      \cf6 \strokec6 <\cf4 \strokec4 nav className\cf6 \strokec6 =\cf5 \strokec5 "bg-white border-b shadow-sm"\cf6 \strokec6 >\cf4 \strokec4 \
        \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "max-w-7xl mx-auto px-4"\cf6 \strokec6 >\cf4 \strokec4 \
          \cf6 \strokec6 <\cf4 \strokec4 div className\cf6 \strokec6 =\cf5 \strokec5 "flex space-x-1"\cf6 \strokec6 >\cf4 \strokec4 \
            \{[\
              \{ \cf8 \strokec8 id\cf6 \strokec6 :\cf4 \strokec4  \cf5 \strokec5 'home'\cf4 \strokec4 , \cf8 \strokec8 label\cf6 \strokec6 :\cf4 \strokec4  \cf5 \strokec5 'Home'\cf4 \strokec4 , \cf8 \strokec8 icon\cf6 \strokec6 :\cf4 \strokec4  Award \},\
              \{ \cf8 \strokec8 id\cf6 \strokec6 :\cf4 \strokec4  \cf5 \strokec5 'give'\cf4 \strokec4 , \cf8 \strokec8 label\cf6 \strokec6 :\cf4 \strokec4  \cf5 \strokec5 'Give Kudos'\cf4 \strokec4 , \cf8 \strokec8 icon\cf6 \strokec6 :\cf4 \strokec4  Gift \},\
              \{ \cf8 \strokec8 id\cf6 \strokec6 :\cf4 \strokec4  \cf5 \strokec5 'history'\cf4 \strokec4 , \cf8 \strokec8 label\cf6 \strokec6 :\cf4 \strokec4  \cf5 \strokec5 'My History'\cf4 \strokec4 , \cf8 \strokec8 icon\cf6 \strokec6 :\cf4 \strokec4  History \},\
              \{ \cf8 \strokec8 id\cf6 \strokec6 :\cf4 \strokec4  \cf5 \strokec5 'leaderboard'\cf4 \strokec4 , \cf8 \strokec8 label\cf6 \strokec6 :\cf4 \strokec4  \cf5 \strokec5 'Leaderboard'\cf4 \strokec4 , \cf8 \strokec8 icon\cf6 \strokec6 :\cf4 \strokec4  TrendingUp \},\
              \cf6 \strokec6 ...\cf4 \strokec4 (\cf6 \strokec6 isAdmin\cf4 \strokec4 (currentUser) \cf6 \strokec6 ?\cf4 \strokec4  [\{ \cf8 \strokec8 id\cf6 \strokec6 :\cf4 \strokec4  \cf5 \strokec5 'admin'\cf4 \strokec4 , \cf8 \strokec8 label\cf6 \strokec6 :\cf4 \strokec4  \cf5 \strokec5 'Admin'\cf4 \strokec4 , \cf8 \strokec8 icon\cf6 \strokec6 :\cf4 \strokec4  ShieldCheck \}] \cf6 \strokec6 :\cf4 \strokec4  [])\
            ].\cf6 \strokec6 map\cf4 \strokec4 ((\{ id, label, \cf8 \strokec8 icon\cf6 \strokec6 :\cf4 \strokec4  Icon \}) \cf6 \strokec6 =>\cf4 \strokec4  (\
              \cf6 \strokec6 <\cf4 \strokec4 button\
                key\cf6 \strokec6 =\cf4 \strokec4 \{id\}\
                onClick\cf6 \strokec6 =\cf4 \strokec4 \{() \cf6 \strokec6 =>\cf4 \strokec4  \cf6 \strokec6 setActiveScreen\cf4 \strokec4 (id)\}\
                className\cf6 \strokec6 =\cf4 \strokec4 \{\cf5 \strokec5 `flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors \cf4 \strokec4 $\{\
                  activeScreen \cf6 \strokec6 ===\cf4 \strokec4  id\
                    \cf6 \strokec6 ?\cf4 \strokec4  \cf5 \strokec5 'border-blue-600 text-blue-600'\cf4 \strokec4 \
                    \cf6 \strokec6 :\cf4 \strokec4  \cf5 \strokec5 'border-transparent text-gray-600 hover:text-gray-800'\cf4 \strokec4 \
                \}\cf5 \strokec5 `\cf4 \strokec4 \}\
              \cf6 \strokec6 >\cf4 \strokec4 \
                \cf6 \strokec6 <\cf4 \strokec4 Icon className\cf6 \strokec6 =\cf5 \strokec5 "w-4 h-4"\cf4 \strokec4  \cf6 \strokec6 />\cf4 \strokec4 \
                \cf6 \strokec6 <\cf4 \strokec4 span className\cf6 \strokec6 =\cf5 \strokec5 "font-medium"\cf6 \strokec6 >\cf4 \strokec4 \{label\}\cf6 \strokec6 </\cf4 \strokec4 span\cf6 \strokec6 >\cf4 \strokec4 \
              \cf6 \strokec6 </\cf4 \strokec4 button\cf6 \strokec6 >\cf4 \strokec4 \
            ))\}\
          \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
        \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
      \cf6 \strokec6 </\cf4 \strokec4 nav\cf6 \strokec6 >\cf4 \strokec4 \
\
      \cf6 \strokec6 <\cf4 \strokec4 main className\cf6 \strokec6 =\cf5 \strokec5 "max-w-7xl mx-auto px-4 py-8"\cf6 \strokec6 >\cf4 \strokec4 \
        \{activeScreen \cf6 \strokec6 ===\cf4 \strokec4  \cf5 \strokec5 'home'\cf4 \strokec4  \cf6 \strokec6 &&\cf4 \strokec4  \cf6 \strokec6 <\cf4 \strokec4 HomeScreen \cf6 \strokec6 />\cf4 \strokec4 \}\
        \{activeScreen \cf6 \strokec6 ===\cf4 \strokec4  \cf5 \strokec5 'give'\cf4 \strokec4  \cf6 \strokec6 &&\cf4 \strokec4  \cf6 \strokec6 <\cf4 \strokec4 GiveKudosScreen \cf6 \strokec6 />\cf4 \strokec4 \}\
        \{activeScreen \cf6 \strokec6 ===\cf4 \strokec4  \cf5 \strokec5 'history'\cf4 \strokec4  \cf6 \strokec6 &&\cf4 \strokec4  \cf6 \strokec6 <\cf4 \strokec4 HistoryScreen \cf6 \strokec6 />\cf4 \strokec4 \}\
        \{activeScreen \cf6 \strokec6 ===\cf4 \strokec4  \cf5 \strokec5 'leaderboard'\cf4 \strokec4  \cf6 \strokec6 &&\cf4 \strokec4  \cf6 \strokec6 <\cf4 \strokec4 LeaderboardScreen \cf6 \strokec6 />\cf4 \strokec4 \}\
        \{activeScreen \cf6 \strokec6 ===\cf4 \strokec4  \cf5 \strokec5 'admin'\cf4 \strokec4  \cf6 \strokec6 &&\cf4 \strokec4  \cf6 \strokec6 <\cf4 \strokec4 AdminScreen \cf6 \strokec6 />\cf4 \strokec4 \}\
      \cf6 \strokec6 </\cf4 \strokec4 main\cf6 \strokec6 >\cf4 \strokec4 \
    \cf6 \strokec6 </\cf4 \strokec4 div\cf6 \strokec6 >\cf4 \strokec4 \
  );\
\};\
\
\cf2 \strokec2 export\cf4 \strokec4  \cf2 \strokec2 default\cf4 \strokec4  VBAKudos;}