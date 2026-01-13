# Day 12: REST API Testing Fundamentals - HTTP & Postman

**Date:** Day 12 of 25  
**Duration:** 8 hours  
**Difficulty:** Intermediate-Advanced  
**Focus Area:** API Testing & Request/Response Handling

---

## 🎯 **Learning Objectives**

By the end of Day 12, you will:

✅ Understand REST API fundamentals and HTTP protocol  
✅ Master HTTP methods (GET, POST, PUT, DELETE, PATCH)  
✅ Learn request/response structure and headers  
✅ Use Postman for API testing  
✅ Implement API testing in JavaScript/TypeScript  
✅ Validate JSON responses  
✅ Handle authentication (Bearer tokens, API keys)  
✅ Test error scenarios and status codes  
✅ Create reusable API client utilities  
✅ Integrate API tests with Playwright  

---

## ⏰ **Daily Schedule (8 Hours)**

| Time | Activity | Duration |
|------|----------|----------|
| 8:00 - 8:30 | Review Week 2 & course progression | 30 min |
| 8:30 - 10:30 | **Theory Session 1:** REST API Fundamentals | 2 hours |
| 10:30 - 11:00 | Break | 30 min |
| 11:00 - 1:00 PM | **Exercise Session 1:** Postman & API Testing | 2 hours |
| 1:00 - 2:00 PM | Lunch break | 1 hour |
| 2:00 - 4:00 PM | **Theory Session 2:** JavaScript API Client & Testing | 2 hours |
| 4:00 - 4:30 PM | Break | 30 min |
| 4:30 - 6:30 PM | **Exercise Session 2:** Advanced API Scenarios | 2 hours |

---

## 📚 **THEORY SESSION 1: REST API Fundamentals (2 hours)**

### **Part 12.1: Understanding REST APIs**

REST (Representational State Transfer) is an architectural style for building web services. It uses HTTP protocol to:
- **GET** - Retrieve resources
- **POST** - Create new resources
- **PUT** - Replace entire resource
- **PATCH** - Partially update resource
- **DELETE** - Remove resource

#### **Basic REST Principles:**

```
1. Client-Server Architecture
   - Client sends requests
   - Server processes and responds
   
2. Stateless
   - Each request contains all needed information
   - Server doesn't store client context
   
3. Uniform Interface
   - Consistent endpoints and methods
   - Predictable structure
   
4. Cacheable
   - Responses can be cached
   - Improves performance
   
5. Layered System
   - Multiple server layers
   - Client doesn't know which layer it calls
```

---

### **Part 12.2: HTTP Protocol Basics**

#### **Request Structure:**

```
METHOD /endpoint HTTP/1.1
Host: api.example.com
Content-Type: application/json
Authorization: Bearer token_here

{
  "body": "data"
}
```

#### **Response Structure:**

```
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 125

{
  "id": 1,
  "name": "Example",
  "status": "success"
}
```

#### **HTTP Status Codes:**

```
2xx - Success
  200 OK           - Request successful
  201 Created      - Resource created
  204 No Content   - Success, no response body

3xx - Redirection
  301 Moved        - Permanent redirect
  302 Found        - Temporary redirect
  304 Not Modified - Cached response valid

4xx - Client Error
  400 Bad Request  - Invalid request format
  401 Unauthorized - Authentication required
  403 Forbidden    - Access denied
  404 Not Found    - Resource doesn't exist
  409 Conflict     - Duplicate resource

5xx - Server Error
  500 Internal     - Server error
  502 Bad Gateway  - Service unavailable
  503 Service      - Temporarily down
```

---

### **Part 12.3: Common REST Patterns**

#### **Users API Example:**

```
GET    /api/users           → Get all users
GET    /api/users/123       → Get specific user
POST   /api/users           → Create new user
PUT    /api/users/123       → Replace user completely
PATCH  /api/users/123       → Update user partially
DELETE /api/users/123       → Delete user
```

#### **Complex Resources:**

```
GET  /api/users/123/posts        → Get user's posts
GET  /api/users/123/posts/456    → Get specific user post
POST /api/posts/456/comments     → Add comment to post
DELETE /api/users/123/posts/456  → Delete user's post
```

---

### **Part 12.4: JSON & Data Formats**

#### **JSON Structure:**

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "active": true,
  "roles": ["admin", "user"],
  "metadata": {
    "created": "2025-01-01",
    "updated": "2025-01-10"
  }
}
```

#### **Common Content Types:**

```
application/json     - JSON data
application/xml      - XML data
application/x-www-form-urlencoded - Form data
multipart/form-data  - File upload
text/plain          - Plain text
```

---

### **Part 12.5: Request Headers**

#### **Common Headers:**

```
Content-Type: application/json
  - Specifies request body format

Accept: application/json
  - Specifies expected response format

Authorization: Bearer token
  - Authentication credentials

User-Agent: MyApp/1.0
  - Identifies client application

X-API-Key: api-key-value
  - Custom API key header

Cache-Control: no-cache
  - Controls caching behavior

Content-Length: 256
  - Size of request body in bytes
```

#### **Response Headers:**

```
Content-Type: application/json
  - Response data format

Content-Length: 256
  - Response size in bytes

Set-Cookie: session=abc123
  - Sets browser cookie

Cache-Control: max-age=3600
  - Cache validity duration

X-Rate-Limit-Remaining: 99
  - API rate limit info

Server: nginx/1.19.0
  - Server information
```

---

### **Part 12.6: Authentication Methods**

#### **1. API Key Authentication:**

```
GET /api/users HTTP/1.1
Host: api.example.com
X-API-Key: your-api-key-here
```

#### **2. Bearer Token (JWT):**

```
GET /api/users HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

#### **3. Basic Authentication:**

```
GET /api/users HTTP/1.1
Host: api.example.com
Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=
  (base64 encoded: username:password)
```

#### **4. OAuth 2.0:**

```
GET /api/users HTTP/1.1
Host: api.example.com
Authorization: Bearer access_token
  (obtained from OAuth provider)
```

---

## 🔨 **EXERCISE SESSION 1 (2 hours)**

### **Exercise 12.1: Postman Basics & Collections**

**Objective:** Master Postman for API testing

**Task:**
```
1. Create Postman workspace
2. Create requests collection
3. Test different HTTP methods
4. Add variables and environments
5. Create test scripts
6. Run collections
```

**Solution:**

#### **Step 1: Postman Installation & Setup**

```
Download Postman:
https://www.postman.com/downloads/

Create account or use locally

Create new Workspace:
- Name: API Testing Course
- Type: Personal
```

#### **Step 2: Create Collection**

```
1. File → New Collection
2. Name: Users API
3. Add Description:
   "Collection for testing Users REST API"
4. Save
```

#### **Step 3: Create GET Request**

```
Request Details:
Name: Get All Users
Method: GET
URL: https://jsonplaceholder.typicode.com/users

Headers:
- Accept: application/json

Tests (Tab):
pm.test("Status is 200", function() {
  pm.response.to.have.status(200);
});

pm.test("Response is array", function() {
  const jsonData = pm.response.json();
  pm.expect(Array.isArray(jsonData)).to.be.true;
});

pm.test("First user has required fields", function() {
  const jsonData = pm.response.json();
  pm.expect(jsonData[0]).to.have.property('id');
  pm.expect(jsonData[0]).to.have.property('name');
  pm.expect(jsonData[0]).to.have.property('email');
});
```

#### **Step 4: Create POST Request**

```
Request Details:
Name: Create New User
Method: POST
URL: https://jsonplaceholder.typicode.com/users

Headers:
- Content-Type: application/json

Body (raw JSON):
{
  "name": "Test User",
  "email": "test@example.com",
  "username": "testuser",
  "phone": "123-456-7890",
  "website": "example.com"
}

Tests:
pm.test("Status is 201", function() {
  pm.response.to.have.status(201);
});

pm.test("Response contains user data", function() {
  const jsonData = pm.response.json();
  pm.expect(jsonData.name).to.equal("Test User");
  pm.expect(jsonData.email).to.equal("test@example.com");
});

pm.test("Response includes ID", function() {
  const jsonData = pm.response.json();
  pm.expect(jsonData).to.have.property('id');
  pm.expect(jsonData.id).to.be.a('number');
});
```

#### **Step 5: Create GET Single User Request**

```
Request Details:
Name: Get User by ID
Method: GET
URL: https://jsonplaceholder.typicode.com/users/1

Tests:
pm.test("Status is 200", function() {
  pm.response.to.have.status(200);
});

pm.test("User ID matches", function() {
  const jsonData = pm.response.json();
  pm.expect(jsonData.id).to.equal(1);
});

pm.test("User has complete profile", function() {
  const jsonData = pm.response.json();
  const requiredFields = ['id', 'name', 'email', 'username', 'address', 'phone', 'website', 'company'];
  requiredFields.forEach(field => {
    pm.expect(jsonData).to.have.property(field);
  });
});
```

#### **Step 6: Create PUT Request (Update)**

```
Request Details:
Name: Update User
Method: PUT
URL: https://jsonplaceholder.typicode.com/users/1

Body (raw JSON):
{
  "id": 1,
  "name": "Updated User",
  "email": "updated@example.com",
  "username": "updateduser",
  "phone": "999-999-9999"
}

Tests:
pm.test("Status is 200", function() {
  pm.response.to.have.status(200);
});

pm.test("User updated correctly", function() {
  const jsonData = pm.response.json();
  pm.expect(jsonData.name).to.equal("Updated User");
  pm.expect(jsonData.email).to.equal("updated@example.com");
});
```

#### **Step 7: Create DELETE Request**

```
Request Details:
Name: Delete User
Method: DELETE
URL: https://jsonplaceholder.typicode.com/users/1

Tests:
pm.test("Status is 200", function() {
  pm.response.to.have.status(200);
});

pm.test("Delete returns empty object", function() {
  const jsonData = pm.response.json();
  pm.expect(Object.keys(jsonData).length).to.equal(0);
});
```

#### **Step 8: Variables and Environments**

```
Create Environment:
1. Gear icon → Manage Environments
2. Create new environment
3. Name: API Testing
4. Variables:
   - base_url: https://jsonplaceholder.typicode.com
   - user_id: 1
   - api_key: your-api-key-here

Use in requests:
URL: {{base_url}}/users
URL: {{base_url}}/users/{{user_id}}

Headers:
Authorization: Bearer {{api_key}}
```

#### **Step 9: Run Collection**

```
1. Click Collection menu
2. Select "Run" (play icon)
3. Select all requests
4. Set iterations: 1
5. Click "Start Test"
6. View results
```

---

### **Exercise 12.2: Postman Advanced Features**

**Objective:** Use advanced Postman features

**Task:**
```
1. Create test workflow
2. Use pre-request scripts
3. Extract variables from responses
4. Chain requests
5. Generate documentation
```

**Solution:**

#### **Step 1: Pre-request Script (Setup)**

```
Request: Create New User
Pre-request Script Tab:

// Generate unique timestamp
pm.variables.set("timestamp", Date.now());

// Generate random username
const randomUser = "user_" + Date.now();
pm.variables.set("newUsername", randomUser);

// Log for debugging
console.log("Using username:", randomUser);
```

#### **Step 2: Extract Variables from Response**

```
Request: Get All Users
Tests Tab:

// Save first user ID for next request
pm.test("Extract user ID", function() {
  const jsonData = pm.response.json();
  const firstUserId = jsonData[0].id;
  pm.variables.set("selectedUserId", firstUserId);
  console.log("Selected user ID:", firstUserId);
});

// Save multiple values
pm.test("Extract user details", function() {
  const jsonData = pm.response.json();
  const user = jsonData[0];
  
  pm.variables.set("userName", user.name);
  pm.variables.set("userEmail", user.email);
  pm.variables.set("userId", user.id);
});
```

#### **Step 3: Chain Requests**

```
Example workflow:
1. Get all users (extract first user ID)
2. Get user by ID (extracted ID)
3. Update user
4. Get user again (verify update)
5. Delete user
6. Verify deletion

Each request uses output from previous:

Request 2: Get User by ID
URL: {{base_url}}/users/{{selectedUserId}}

Request 3: Update User
URL: {{base_url}}/users/{{selectedUserId}}
Body uses {{userName}}, {{userEmail}}, etc.
```

#### **Step 4: Dynamic Body with Variables**

```
Request: Create User
Pre-request Script:

pm.variables.set("newUserName", "John" + Date.now());
pm.variables.set("newUserEmail", "user" + Date.now() + "@example.com");

Body (raw JSON):
{
  "name": "{{newUserName}}",
  "email": "{{newUserEmail}}",
  "username": "{{newUsername}}",
  "phone": "123-456-7890",
  "website": "https://example.com"
}

Tests:

// Save created user ID for next request
pm.test("Extract created user ID", function() {
  const jsonData = pm.response.json();
  pm.variables.set("createdUserId", jsonData.id);
  console.log("Created user ID:", jsonData.id);
});
```

#### **Step 5: Conditional Logic**

```
Tests Tab:

if (pm.response.code === 200) {
  pm.test("Valid response received", function() {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('id');
  });
} else {
  pm.test("Handle error response", function() {
    const jsonData = pm.response.json();
    console.error("Error:", jsonData.message);
  });
}

// Skip tests conditionally
pm.test("Check if user is admin", function() {
  const jsonData = pm.response.json();
  if (jsonData.role === "admin") {
    pm.expect(jsonData).to.have.property('permissions');
  }
});
```

#### **Step 6: Data Driven Testing**

```
Create CSV data file with test data:
name,email,phone
John,john@example.com,123-456-7890
Jane,jane@example.com,098-765-4321
Bob,bob@example.com,555-555-5555

Run Collection:
1. Runner icon
2. Select collection
3. Data: Select CSV file
4. Run
   (Creates 3 users with different data)
```

---

## 📚 **THEORY SESSION 2: JavaScript API Client & Testing (2 hours)**

### **Part 12.7: API Testing with Fetch API**

#### **Basic Fetch Requests:**

```typescript
// GET Request
async function getUsers() {
  try {
    const response = await fetch('https://api.example.com/users');
    
    // Check if response is OK
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Users:', data);
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

// POST Request
async function createUser(userData) {
  const response = await fetch('https://api.example.com/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer token123'
    },
    body: JSON.stringify(userData)
  });
  
  const data = await response.json();
  return data;
}

// PUT Request (Update)
async function updateUser(userId, userData) {
  const response = await fetch(`https://api.example.com/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  });
  
  return await response.json();
}

// DELETE Request
async function deleteUser(userId) {
  const response = await fetch(`https://api.example.com/users/${userId}`, {
    method: 'DELETE'
  });
  
  if (response.ok) {
    console.log('User deleted successfully');
  }
  
  return response.ok;
}
```

---

### **Part 12.8: Creating an API Client Class**

```typescript
// src/api-client.ts
class APIClient {
  private baseURL: string;
  private headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };
  
  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }
  
  // Set authentication token
  setAuthToken(token: string) {
    this.headers['Authorization'] = `Bearer ${token}`;
  }
  
  // Set custom headers
  setHeaders(headers: Record<string, string>) {
    this.headers = { ...this.headers, ...headers };
  }
  
  // Generic request method
  private async request(
    endpoint: string,
    method: string = 'GET',
    body?: any
  ) {
    const url = `${this.baseURL}${endpoint}`;
    
    const options: RequestInit = {
      method,
      headers: this.headers
    };
    
    if (body) {
      options.body = JSON.stringify(body);
    }
    
    const response = await fetch(url, options);
    
    // Handle response
    if (!response.ok) {
      throw new APIError(
        `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        await response.text()
      );
    }
    
    // Parse JSON if content-type is JSON
    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      return await response.json();
    }
    
    return response;
  }
  
  // GET request
  get(endpoint: string) {
    return this.request(endpoint, 'GET');
  }
  
  // POST request
  post(endpoint: string, body: any) {
    return this.request(endpoint, 'POST', body);
  }
  
  // PUT request
  put(endpoint: string, body: any) {
    return this.request(endpoint, 'PUT', body);
  }
  
  // PATCH request
  patch(endpoint: string, body: any) {
    return this.request(endpoint, 'PATCH', body);
  }
  
  // DELETE request
  delete(endpoint: string) {
    return this.request(endpoint, 'DELETE');
  }
}

// Custom error class
class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public responseBody: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export { APIClient, APIError };
```

---

### **Part 12.9: API Testing with Playwright**

```typescript
// tests/api-testing.spec.ts
import { test, expect } from '@playwright/test';
import { APIClient } from '../src/api-client';

test.describe('API Testing with Playwright', () => {
  let apiClient: APIClient;
  
  test.beforeAll(async () => {
    apiClient = new APIClient('https://jsonplaceholder.typicode.com');
  });
  
  test('GET request - fetch all users', async () => {
    const users = await apiClient.get('/users');
    
    expect(Array.isArray(users)).toBeTruthy();
    expect(users.length).toBeGreaterThan(0);
    
    // Validate first user structure
    const firstUser = users[0];
    expect(firstUser).toHaveProperty('id');
    expect(firstUser).toHaveProperty('name');
    expect(firstUser).toHaveProperty('email');
  });
  
  test('GET request - fetch specific user', async () => {
    const user = await apiClient.get('/users/1');
    
    expect(user.id).toBe(1);
    expect(user.name).toBeTruthy();
    expect(user.email).toBeTruthy();
    expect(user.address).toHaveProperty('city');
  });
  
  test('POST request - create new user', async () => {
    const newUser = {
      name: 'Test User',
      email: 'test@example.com',
      username: 'testuser',
      phone: '123-456-7890'
    };
    
    const response = await apiClient.post('/users', newUser);
    
    expect(response).toHaveProperty('id');
    expect(response.name).toBe('Test User');
    expect(response.email).toBe('test@example.com');
  });
  
  test('PUT request - update user', async () => {
    const updatedUser = {
      id: 1,
      name: 'Updated User',
      email: 'updated@example.com',
      username: 'updateduser',
      phone: '999-999-9999'
    };
    
    const response = await apiClient.put('/users/1', updatedUser);
    
    expect(response.id).toBe(1);
    expect(response.name).toBe('Updated User');
  });
  
  test('PATCH request - partial update', async () => {
    const patch = {
      name: 'Partially Updated'
    };
    
    const response = await apiClient.patch('/users/1', patch);
    
    expect(response.name).toBe('Partially Updated');
  });
  
  test('DELETE request - remove user', async () => {
    // JSONPlaceholder accepts delete but returns empty object
    const response = await apiClient.delete('/users/1');
    expect(response).toBeTruthy();
  });
  
  test('handle 404 error', async () => {
    try {
      await apiClient.get('/users/99999');
      expect(true).toBe(false); // Should not reach here
    } catch (error) {
      expect(error.status).toBe(404);
    }
  });
});
```

---

## 🔨 **EXERCISE SESSION 2 (2 hours)**

### **Exercise 12.3: Build Complete API Test Suite**

**Objective:** Create production-ready API test suite

**Task:**
```
1. Create comprehensive API client
2. Write test suite for REST API
3. Test all CRUD operations
4. Validate error handling
5. Test authentication
6. Test error scenarios
7. Create API documentation
```

**Solution:**

```typescript
// src/api-client.ts (Complete Version)
import { expect } from '@playwright/test';

interface RequestOptions {
  headers?: Record<string, string>;
  timeout?: number;
  retries?: number;
}

interface APIResponse<T = any> {
  status: number;
  statusText: string;
  data: T;
  headers: Record<string, string>;
}

export class APIClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json'
  };
  private timeout = 30000;
  private retries = 3;
  
  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }
  
  // Configuration methods
  setAuthToken(token: string) {
    this.defaultHeaders['Authorization'] = `Bearer ${token}`;
  }
  
  setAPIKey(key: string) {
    this.defaultHeaders['X-API-Key'] = key;
  }
  
  setHeaders(headers: Record<string, string>) {
    this.defaultHeaders = { ...this.defaultHeaders, ...headers };
  }
  
  setTimeout(ms: number) {
    this.timeout = ms;
  }
  
  setRetries(count: number) {
    this.retries = count;
  }
  
  // Core request method with retries
  private async request(
    method: string,
    endpoint: string,
    body?: any,
    options: RequestOptions = {}
  ): Promise<APIResponse> {
    const url = `${this.baseURL}${endpoint}`;
    const headers = { ...this.defaultHeaders, ...options.headers };
    
    const requestOptions: RequestInit = {
      method,
      headers,
      signal: AbortSignal.timeout(options.timeout || this.timeout)
    };
    
    if (body) {
      requestOptions.body = JSON.stringify(body);
    }
    
    let lastError: Error | null = null;
    
    // Retry logic
    for (let attempt = 0; attempt < (options.retries || this.retries); attempt++) {
      try {
        const response = await fetch(url, requestOptions);
        
        // Read headers
        const responseHeaders: Record<string, string> = {};
        response.headers.forEach((value, key) => {
          responseHeaders[key] = value;
        });
        
        // Parse body
        let data: any = null;
        const contentType = response.headers.get('content-type');
        
        if (contentType?.includes('application/json')) {
          data = await response.json();
        } else {
          data = await response.text();
        }
        
        // Check status
        if (!response.ok) {
          const errorMessage = typeof data === 'object' ? data?.message : data;
          throw new APIError(
            `HTTP ${response.status}: ${errorMessage || response.statusText}`,
            response.status,
            data
          );
        }
        
        return {
          status: response.status,
          statusText: response.statusText,
          data,
          headers: responseHeaders
        };
      } catch (error) {
        lastError = error as Error;
        
        // Don't retry on client errors (4xx)
        if (error instanceof APIError && error.status >= 400 && error.status < 500) {
          throw error;
        }
        
        // Wait before retry
        if (attempt < (options.retries || this.retries) - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
        }
      }
    }
    
    throw lastError || new Error('Request failed after retries');
  }
  
  // HTTP Methods
  async get(endpoint: string, options?: RequestOptions) {
    const response = await this.request('GET', endpoint, null, options);
    return response.data;
  }
  
  async post(endpoint: string, body?: any, options?: RequestOptions) {
    const response = await this.request('POST', endpoint, body, options);
    return response.data;
  }
  
  async put(endpoint: string, body?: any, options?: RequestOptions) {
    const response = await this.request('PUT', endpoint, body, options);
    return response.data;
  }
  
  async patch(endpoint: string, body?: any, options?: RequestOptions) {
    const response = await this.request('PATCH', endpoint, body, options);
    return response.data;
  }
  
  async delete(endpoint: string, options?: RequestOptions) {
    const response = await this.request('DELETE', endpoint, null, options);
    return response.data;
  }
  
  // Full response (with headers and status)
  async getFullResponse(endpoint: string, options?: RequestOptions) {
    return this.request('GET', endpoint, null, options);
  }
  
  async postFullResponse(endpoint: string, body?: any, options?: RequestOptions) {
    return this.request('POST', endpoint, body, options);
  }
}

export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message);
    this.name = 'APIError';
  }
}

// tests/api-crud.spec.ts (Complete CRUD Tests)
import { test, expect } from '@playwright/test';
import { APIClient } from '../src/api-client';

test.describe('Complete API CRUD Tests', () => {
  let apiClient: APIClient;
  let createdUserId: number;
  
  test.beforeAll(async () => {
    apiClient = new APIClient('https://jsonplaceholder.typicode.com');
  });
  
  test('CREATE - Post new user', async () => {
    const newUser = {
      name: 'Test User ' + Date.now(),
      email: `test${Date.now()}@example.com`,
      username: 'testuser' + Date.now(),
      phone: '123-456-7890'
    };
    
    const response = await apiClient.post('/users', newUser);
    
    createdUserId = response.id;
    
    expect(response).toHaveProperty('id');
    expect(response.name).toBe(newUser.name);
    expect(response.email).toBe(newUser.email);
  });
  
  test('READ - Get all users', async () => {
    const users = await apiClient.get('/users');
    
    expect(Array.isArray(users)).toBeTruthy();
    expect(users.length).toBeGreaterThan(0);
    
    // Validate structure
    const firstUser = users[0];
    expect(firstUser).toHaveProperty('id');
    expect(firstUser).toHaveProperty('name');
    expect(firstUser).toHaveProperty('email');
  });
  
  test('READ - Get specific user', async () => {
    const user = await apiClient.get('/users/1');
    
    expect(user.id).toBe(1);
    expect(user.name).toBeTruthy();
    expect(user).toHaveProperty('address');
  });
  
  test('UPDATE - Put (replace) user', async () => {
    const updatedData = {
      id: 1,
      name: 'Completely Updated',
      email: 'updated@example.com',
      username: 'newusername',
      phone: '999-999-9999'
    };
    
    const response = await apiClient.put('/users/1', updatedData);
    
    expect(response.name).toBe('Completely Updated');
    expect(response.email).toBe('updated@example.com');
  });
  
  test('UPDATE - Patch (partial) user', async () => {
    const partialUpdate = {
      name: 'Only Name Changed'
    };
    
    const response = await apiClient.patch('/users/1', partialUpdate);
    
    expect(response.name).toBe('Only Name Changed');
  });
  
  test('DELETE - Remove user', async () => {
    const response = await apiClient.delete('/users/1');
    // JSONPlaceholder returns empty object on delete
    expect(typeof response).toBe('object');
  });
  
  test('Error handling - 404 Not Found', async () => {
    try {
      await apiClient.get('/users/99999');
      expect(true).toBe(false); // Should throw
    } catch (error) {
      expect(error.status).toBe(404);
    }
  });
  
  test('Error handling - Invalid request', async () => {
    try {
      await apiClient.post('/users', { name: null });
      // May or may not fail depending on API
    } catch (error) {
      expect(error.status).toBeGreaterThanOrEqual(400);
    }
  });
});
```

---

### **Exercise 12.4: Advanced API Testing Scenarios**

**Objective:** Test complex API scenarios

**Task:**
```
1. Test pagination
2. Test filtering and search
3. Test sorting
4. Test rate limiting
5. Test batch operations
6. Test file upload
```

**Solution:**

```typescript
// tests/api-advanced.spec.ts
import { test, expect } from '@playwright/test';
import { APIClient } from '../src/api-client';

test.describe('Advanced API Testing', () => {
  let apiClient: APIClient;
  
  test.beforeAll(async () => {
    apiClient = new APIClient('https://jsonplaceholder.typicode.com');
  });
  
  test('Pagination - limit results', async () => {
    // Get first page
    const page1 = await apiClient.get('/users?_start=0&_limit=5');
    
    expect(Array.isArray(page1)).toBeTruthy();
    expect(page1.length).toBeLessThanOrEqual(5);
    
    // Get second page
    const page2 = await apiClient.get('/users?_start=5&_limit=5');
    
    expect(Array.isArray(page2)).toBeTruthy();
    
    // Verify different results
    if (page1.length > 0 && page2.length > 0) {
      expect(page1[0].id).not.toBe(page2[0].id);
    }
  });
  
  test('Filtering - query parameters', async () => {
    // Get all users
    const allUsers = await apiClient.get('/users');
    
    // Get user by name
    const filteredUsers = await apiClient.get('/users?name=Leanne Graham');
    
    expect(Array.isArray(filteredUsers)).toBeTruthy();
    if (filteredUsers.length > 0) {
      expect(filteredUsers[0].name).toBe('Leanne Graham');
    }
  });
  
  test('Sorting - order results', async () => {
    const ascending = await apiClient.get('/users?_sort=id&_order=asc');
    const descending = await apiClient.get('/users?_sort=id&_order=desc');
    
    expect(ascending[0].id).toBeLessThan(ascending[ascending.length - 1].id);
    expect(descending[0].id).toBeGreaterThan(descending[descending.length - 1].id);
  });
  
  test('Batch operations - create multiple', async () => {
    const users = [
      { name: 'User 1', email: 'user1@example.com' },
      { name: 'User 2', email: 'user2@example.com' },
      { name: 'User 3', email: 'user3@example.com' }
    ];
    
    const responses = await Promise.all(
      users.map(user => apiClient.post('/users', user))
    );
    
    expect(responses.length).toBe(3);
    responses.forEach((response, index) => {
      expect(response.name).toBe(users[index].name);
    });
  });
  
  test('Complex query - filter, sort, paginate', async () => {
    const response = await apiClient.get(
      '/posts?userId=1&_sort=id&_order=desc&_start=0&_limit=5'
    );
    
    expect(Array.isArray(response)).toBeTruthy();
    expect(response.length).toBeLessThanOrEqual(5);
    
    // Verify IDs are in descending order
    for (let i = 0; i < response.length - 1; i++) {
      expect(response[i].id).toBeGreaterThanOrEqual(response[i + 1].id);
    }
  });
  
  test('Related data - nested resources', async () => {
    // Get user with their posts
    const user = await apiClient.get('/users/1');
    const posts = await apiClient.get('/posts?userId=1');
    
    expect(user.id).toBe(1);
    expect(Array.isArray(posts)).toBeTruthy();
    
    // All posts belong to user 1
    posts.forEach(post => {
      expect(post.userId).toBe(1);
    });
  });
  
  test('Response time measurement', async () => {
    const startTime = performance.now();
    const response = await apiClient.get('/users');
    const endTime = performance.now();
    
    const responseTime = endTime - startTime;
    
    console.log(`Response time: ${responseTime.toFixed(2)}ms`);
    
    // Assert response is reasonably fast
    expect(responseTime).toBeLessThan(5000); // 5 seconds
  });
});
```

---

## ❓ **Quiz: REST API Fundamentals**

**Instructions:** Answer all 10 questions. Target score: 8/10 (80%)

### **Question 1: REST Definition**
What does REST stand for?
- A) Remote Exchange State Transfer
- B) Representational State Transfer ✅ **CORRECT**
- C) Response Exchange Server Transport
- D) Resource Extraction Standard

**Explanation:** REST = Representational State Transfer

---

### **Question 2: HTTP Methods**
Which method is used to update a resource?
- A) GET
- B) POST
- C) PUT ✅ **CORRECT**
- D) DELETE

**Explanation:** PUT replaces entire resource, PATCH for partial.

---

### **Question 3: Status Codes**
What does 201 status code mean?
- A) Bad Request
- B) Unauthorized
- C) Created ✅ **CORRECT**
- D) Not Found

**Explanation:** 201 = Resource successfully created.

---

### **Question 4: Headers**
Which header specifies request body format?
- A) Accept
- B) Authorization
- C) Content-Type ✅ **CORRECT**
- D) User-Agent

**Explanation:** Content-Type specifies request/response format.

---

### **Question 5: Authentication**
How is Bearer token provided?
- A) Header: X-API-Key
- B) Header: Authorization ✅ **CORRECT**
- C) Query parameter
- D) Request body

**Explanation:** Bearer token in Authorization header.

---

### **Question 6: JSON Parsing**
How do you parse JSON response?
- A) `response.text()`
- B) `response.json()` ✅ **CORRECT**
- C) `response.parse()`
- D) `JSON.parse(response)`

**Explanation:** Use .json() method on fetch response.

---

### **Question 7: Error Handling**
What indicates client error?
- A) 2xx status
- B) 3xx status
- C) 4xx status ✅ **CORRECT**
- D) 5xx status

**Explanation:** 4xx = client error, 5xx = server error.

---

### **Question 8: Postman**
What is a Postman collection?
- A) Browser cookies
- B) Grouped API requests ✅ **CORRECT**
- C) Response cache
- D) Header templates

**Explanation:** Collection = organized set of requests.

---

### **Question 9: Pagination**
How is pagination typically implemented?
- A) Multiple endpoints
- B) Query parameters ✅ **CORRECT**
- C) Request headers
- D) Request body

**Explanation:** Use _start, _limit, _page parameters.

---

### **Question 10: Retry Logic**
When should you retry requests?
- A) Always
- B) On 4xx errors
- C) On 5xx errors and timeouts ✅ **CORRECT**
- D) Never

**Explanation:** Retry server errors, not client errors.

---

## ✅ **Quiz Answer Key**

| Q | Answer | Topic |
|---|--------|-------|
| 1 | B | REST definition |
| 2 | C | HTTP methods |
| 3 | C | Status codes |
| 4 | C | Headers |
| 5 | B | Authentication |
| 6 | B | JSON parsing |
| 7 | C | Error handling |
| 8 | B | Collections |
| 9 | B | Pagination |
| 10 | C | Retry logic |

**Your Score:** ___/10

**Interpretation:**
- 9-10: ✅ API master!
- 7-8: 🟡 Good understanding
- Below 7: 🔴 Review API basics

---

## 📋 **Daily Assignment**

### **Assignment 12.1: Complete API Testing Suite**

**Objective:** Build production-ready API test automation

**Requirements:**
1. Complete API client class
2. CRUD test suite
3. Error handling tests
4. Advanced scenarios (pagination, filtering, sorting)
5. Authentication implementation
6. Postman collection
7. Documentation
8. CI/CD integration ready

**Deliverables:**
- APIClient class with full functionality
- 20+ test cases
- Postman collection exported
- README with API documentation
- Example environment variables
- All exercises completed

---

## 🎯 **Daily Checklist**

Track your Day 12 progress:

- [ ] Reviewed Week 2 concepts
- [ ] Completed Theory Session 1 (REST Fundamentals)
- [ ] Completed Exercise 12.1 (Postman Basics)
- [ ] Completed Exercise 12.2 (Postman Advanced)
- [ ] Completed Theory Session 2 (JavaScript API)
- [ ] Completed Exercise 12.3 (API Test Suite)
- [ ] Completed Exercise 12.4 (Advanced Scenarios)
- [ ] Answered all 10 quiz questions
- [ ] Scored 80%+ on quiz (8/10)
- [ ] Completed Assignment 12.1 (Complete API Suite)
- [ ] Built API client class
- [ ] Created Postman collection
- [ ] Tested authentication
- [ ] Committed code to GitHub
- [ ] Updated learning journal

**Daily Metrics:**
- Quiz Score: ___/10
- Confidence Level (1-5): ___
- Time Spent: ___ hours
- API endpoints tested: ___ count
- Test cases written: ___ count
- Challenges Faced: _________________

---

## 📚 **Key Takeaways from Day 12**

1. **REST APIs use HTTP** - GET, POST, PUT, PATCH, DELETE
2. **Status codes matter** - 2xx success, 4xx client error, 5xx server
3. **Headers carry metadata** - Content-Type, Authorization, etc.
4. **JSON is standard format** - Most APIs use JSON
5. **Postman is powerful tool** - For testing and documentation
6. **Fetch API for automation** - Modern JavaScript HTTP client
7. **Error handling is crucial** - Retry 5xx, handle 4xx
8. **Authentication is essential** - Tokens, API keys, OAuth
9. **Testing requires validation** - Status, headers, response body
10. **Batch operations save time** - Promise.all() for parallel requests

---

## 🔗 **Resources for Review**

- [REST API Best Practices](https://restfulapi.net/)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [Postman Documentation](https://learning.postman.com/)
- [Fetch API Guide](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [JSON Schema](https://json-schema.org/)

---

## 🚀 **Ready for Day 13?**

By completing Day 12, you've mastered:
- ✅ REST API fundamentals
- ✅ HTTP protocol and methods
- ✅ Status codes and error handling
- ✅ Postman for API testing
- ✅ JavaScript API client
- ✅ CRUD operations
- ✅ Authentication
- ✅ Advanced scenarios
- ✅ Batch operations
- ✅ API test automation

**Next (Day 13):** Python API Testing & Advanced REST Concepts
- Python requests library
- Advanced authentication
- API contract testing
- Response validation
- Mocking APIs

---

## 📊 **Week 3 Progress**

```
Week 1          Week 2          Week 3          Week 4          Week 5
Foundation      Mastery         API Testing     Jenkins/DevOps  Cypress/Interview
Days 1-5        Days 6-11       Days 12-15      Days 16-20      Days 21-25
✅ 100%         ✅ 100%         🔜 Day 12       🔜 Coming        🔜 Final
                               (33%)            Weeks

Overall: 12/25 Days Complete (48%)
```

---

**Congratulations on Day 12!** 🎉

You've successfully entered **Week 3** and started mastering **API Testing!**

Week 2 (Playwright) was about **browser automation**. Now Week 3 shifts to **API testing** - arguably more important for enterprise automation!

**What makes API testing critical:**
- ✅ Faster than UI tests (no browser overhead)
- ✅ More reliable (no UI flakiness)
- ✅ Closer to backend logic
- ✅ Better integration testing
- ✅ Required for CI/CD pipelines

---

*Last Updated: December 12, 2025*  
*Day 12 Complete Guide v1.0*  
*Week 3 Day 1 - API Testing Begins*