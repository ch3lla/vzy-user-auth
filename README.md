# vzy node task

The formatting is slightly incorrect. Here's the corrected version:

## Live URL
[https://vzy-user-auth-api.onrender.com](https://vzy-user-auth-api.onrender.com)

## .env configuration
```
PORT=YOUR PORT
MONGO_URI=YOUR MONGODB URI
JWT_SECRET=YOUR JWT SECRET
STRIPE_TEST_KEY=YOUR STRIPE TEST KEY
ENDPOINT_SECRET=YOUR STRIPE WEBHOOK SIGNING SECRET
```

## Routes

### 1. /api/auth/register
- **Method**: POST
- **Description**: Used for creating new users.
- **Parameters**:
  ```json
  {
      "username": "shawnMichael",
      "password": "underTaker",
      "confirmPassword": "underTaker"
  }
  ```

### 2. /api/auth/login
- **Method**: POST
- **Description**: Used for logging in existing users.
- **Parameters**:
  ```json
  {
      "username": "shawnMichael",
      "password": "underTaker"
  }
  ```

### 3. /api/user
- **Method**: PUT
- **Description**: Used for updating user information.
- **Parameters**:
  ```json
  {
      "username": "shawnMichael",
      "password": "underTaker"
  }
  ```

### 4. /api/checkout/pay
- **Method**: POST
- **Description**: Used for initiating checkout process.

### 5. /api/verifypayment/webhook
- **Method**: POST
- **Description**: Webhook listener for verifying payments.

## When Running Stripe CLI
1. run `stripe login`
2. run `stripe listen --forward-to https://vzy-user-auth-api.onrender.com/api/verifypayment/webhook`
3. run `stripe trigger payment_intent.succeeded --override payment_intent:metadata.x-user-id=${userId}`