# Security Implementation Guide

## 🔐 Token Storage Strategy

This application implements a secure token storage strategy to protect against XSS and CSRF attacks.

### Access Token

- **Storage**: React Context (in-memory only)
- **Lifetime**: Short-lived (e.g., 15 minutes)
- **Security**: Not accessible via JavaScript if token is compromised through XSS
- **Usage**: Sent in Authorization header for API requests

### Refresh Token

- **Storage**: HTTP-only cookie (set by backend)
- **Lifetime**: Long-lived (e.g., 7 days)
- **Security**: Cannot be accessed by JavaScript, protected from XSS
- **Flags**: `httpOnly`, `secure`, `sameSite: 'strict'`

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend                              │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  AuthContext (React Context)                          │  │
│  │  - Stores: user, accessToken (in memory)             │  │
│  │  - Methods: setAuth, clearAuth, updateUser           │  │
│  └──────────────────────────────────────────────────────┘  │
│                           ↓                                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  API Fetch (lib/fetch.ts)                            │  │
│  │  - Gets accessToken from context                     │  │
│  │  - Sends with Authorization header                   │  │
│  │  - credentials: 'include' for cookies                │  │
│  └──────────────────────────────────────────────────────┘  │
│                           ↓                                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  HTTP Request                                         │  │
│  │  Authorization: Bearer <accessToken>                 │  │
│  │  Cookie: refreshToken=<httpOnly cookie>              │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                        Backend                               │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Auth Endpoints                                       │  │
│  │  - POST /auth/login                                   │  │
│  │  - POST /auth/register                                │  │
│  │  - POST /auth/refresh                                 │  │
│  │  - POST /auth/logout                                  │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## 📝 Implementation Details

### 1. Login Flow

```typescript
// Frontend: User logs in
const { data } = await authService.login({ email, password });
// Response: { user, accessToken }

// Store in context (memory)
setAuth(data.user, data.accessToken);

// Backend sets HTTP-only cookie automatically:
// Set-Cookie: refreshToken=xyz; HttpOnly; Secure; SameSite=Strict
```

### 2. API Request Flow

```typescript
// Frontend: Make authenticated request
const accounts = await api.get("/accounts");

// Automatically includes:
// - Authorization: Bearer <accessToken> (from context)
// - Cookie: refreshToken=xyz (from browser)
```

### 3. Token Refresh Flow

```typescript
// When accessToken expires (401 response):
const { accessToken } = await authService.refreshToken();
// Uses refreshToken from HTTP-only cookie automatically

// Update context with new accessToken
setAuth(user, accessToken);

// Retry original request
```

### 4. Logout Flow

```typescript
// Frontend: User logs out
await authService.logout();

// Clear context
clearAuth();

// Backend clears HTTP-only cookie:
// Set-Cookie: refreshToken=; HttpOnly; Secure; SameSite=Strict; Max-Age=0
```

## 🛡️ Security Benefits

### Protection Against XSS (Cross-Site Scripting)

- ✅ Access token in memory (Context) - lost on page refresh
- ✅ Refresh token in HTTP-only cookie - cannot be accessed by JavaScript
- ✅ Even if XSS attack injects malicious script, tokens are safe

### Protection Against CSRF (Cross-Site Request Forgery)

- ✅ SameSite cookie attribute prevents cross-origin requests
- ✅ Refresh token cookie sent automatically only from same origin
- ✅ Access token in Authorization header (not cookie) requires explicit JS code

### Additional Security

- ✅ Short-lived access tokens (15 min) limit exposure window
- ✅ Long-lived refresh tokens (7 days) reduce login frequency
- ✅ Token rotation on refresh for additional security
- ✅ Secure flag ensures cookies only sent over HTTPS

## 🔧 Backend Requirements

The backend must implement the following:

### 1. Login/Register Response

```json
{
  "success": true,
  "data": {
    "user": { ... },
    "accessToken": "eyJhbGc..."
  }
}
```

Set HTTP-only cookie:

```javascript
res.cookie("refreshToken", refreshToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
});
```

### 2. Refresh Token Endpoint

```javascript
// POST /auth/refresh
// Reads refreshToken from HTTP-only cookie
app.post("/auth/refresh", (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  // Verify and generate new access token
  const accessToken = generateAccessToken(userId);

  res.json({
    success: true,
    data: { accessToken },
  });
});
```

### 3. Logout Endpoint

```javascript
// POST /auth/logout
// Clears HTTP-only cookie
app.post("/auth/logout", (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.json({ success: true });
});
```

## 📖 Usage Examples

### In Components

```typescript
"use client";

import { useAuth, useLogin } from "@/hooks/useAuth";

function LoginPage() {
  const { isAuthenticated, user } = useAuth();
  const loginMutation = useLogin();

  const handleLogin = async (email: string, password: string) => {
    await loginMutation.mutateAsync({ email, password });
    // User is automatically redirected to dashboard
  };

  if (isAuthenticated) {
    return <div>Welcome, {user?.username}!</div>;
  }

  return <LoginForm onSubmit={handleLogin} />;
}
```

### In API Calls

```typescript
// Access token is automatically included from context
const accounts = await accountService.getAccounts({
  page: 1,
  limit: 20,
});

// Refresh token is automatically included from cookie
// No manual token management needed!
```

## ⚠️ Important Notes

1. **Page Refresh**: Access token is lost on page refresh (it's in memory)

   - User data persisted in localStorage for hydration
   - Access token can be refreshed using refresh token cookie
   - Implement token refresh on app mount if needed

2. **CORS Configuration**: Backend must allow credentials

   ```javascript
   app.use(
     cors({
       origin: process.env.FRONTEND_URL,
       credentials: true,
     })
   );
   ```

3. **Cookie Domain**: Ensure cookie domain matches your deployment
   - Development: localhost
   - Production: your-domain.com

## 🚀 Best Practices

1. ✅ Always use HTTPS in production
2. ✅ Set appropriate token expiration times
3. ✅ Implement token rotation on refresh
4. ✅ Log and monitor failed auth attempts
5. ✅ Implement rate limiting on auth endpoints
6. ✅ Use strong JWT secrets (min 256-bit)
7. ✅ Validate tokens on every protected request
8. ✅ Clear tokens on logout (both client and server)

## 🔍 Debugging

Check tokens in browser DevTools:

- **Application → Local Storage**: Should see `user` only (no tokens)
- **Application → Cookies**: Should see `refreshToken` (HTTP-only)
- **Network → Headers**: Should see `Authorization: Bearer ...`

## 📚 References

- [OWASP: Cross-Site Scripting (XSS)](https://owasp.org/www-community/attacks/xss/)
- [OWASP: Cross-Site Request Forgery (CSRF)](https://owasp.org/www-community/attacks/csrf)
- [HTTP-only Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#restrict_access_to_cookies)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
