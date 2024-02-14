# vzy node task

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