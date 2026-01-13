# GitHub Portfolio Project 02: REST API Testing Suite

## Project Duration
**Days 12-15 of the 25-day course**

## Project Overview

This is a **professional-grade REST API testing suite** designed to demonstrate expertise in testing backend services using **Postman**, **JavaScript/TypeScript**, and **Python**. The project covers comprehensive API testing including authentication, CRUD operations, error handling, performance validation, and contract testing.

By completing this project, you'll showcase:
- Deep understanding of HTTP protocols and REST principles
- Postman collections with pre-request scripts and dynamic testing
- JavaScript/TypeScript API testing with Playwright Request API
- Python API testing with requests library
- Data-driven testing and request chaining
- API performance and load testing basics
- Professional API documentation and test reporting
- Multi-language API client implementations

---

## Learning Objectives

By the end of this project, you will be able to:

1. **API Testing Fundamentals**
   - Understand HTTP methods (GET, POST, PUT, PATCH, DELETE)
   - Work with request/response structures
   - Validate status codes and headers
   - Handle different content types (JSON, XML, form-data)

2. **Postman Expertise**
   - Create and organize collections
   - Use pre-request scripts for test setup
   - Extract and chain API responses
   - Create test assertions and validations
   - Generate reports and documentation
   - Run collections in batch mode

3. **JavaScript/TypeScript API Testing**
   - Build reusable API client class
   - Use Playwright Request API for testing
   - Handle authentication (JWT, OAuth, API Keys)
   - Implement retry logic and error handling
   - Create comprehensive API test suites

4. **Python API Testing**
   - Use requests library for HTTP operations
   - Create session-based API clients
   - Implement request/response validation
   - Handle different authentication methods
   - Build maintainable test scripts

5. **Advanced Concepts**
   - Request/response validation
   - Test data management
   - Error scenario testing
   - API performance testing basics
   - Contract testing principles

6. **Professional Practices**
   - Environment management
   - Sensitive data handling (secrets)
   - Documentation standards
   - CI/CD integration for API tests
   - Real-world API testing patterns

---

## Tech Stack

| Technology | Purpose | Version |
|---|---|---|
| **Postman** | API Testing & Collection | Latest Desktop |
| **JavaScript/TypeScript** | API Client & Tests | ^5.3.0 |
| **Playwright Test** | Test Framework | ^1.40.0 |
| **Python** | Alternative Testing Language | 3.10+ |
| **Requests** | Python HTTP Library | 2.31+ |
| **JSONSchema** | Response Validation | Latest |

---

## Project Structure

```
automation-testing-portfolio/
├── project-2-api-testing/
│   ├── README.md                    # Project documentation
│   ├── package.json                 # npm dependencies
│   ├── tsconfig.json                # TypeScript configuration
│   ├── .env.example                 # Environment variables template
│   ├── .env                         # (Gitignored) Actual credentials
│   │
│   ├── postman/
│   │   ├── E-Commerce-API.postman_collection.json
│   │   ├── API-Testing.postman_environment.json
│   │   ├── Performance.postman_collection.json
│   │   └── README.md
│   │
│   ├── tests/
│   │   ├── users-api.test.ts        # User endpoints tests
│   │   ├── products-api.test.ts     # Product endpoints tests
│   │   ├── orders-api.test.ts       # Order endpoints tests
│   │   ├── auth-api.test.ts         # Authentication tests
│   │   └── performance-api.test.ts  # Performance testing
│   │
│   ├── src/
│   │   ├── api-client.ts            # Main API client class
│   │   ├── auth-manager.ts          # Authentication handling
│   │   ├── request-builder.ts       # Request construction helpers
│   │   ├── response-validator.ts    # Response validation utilities
│   │   └── test-data.ts             # Test data and fixtures
│   │
│   ├── scripts/
│   │   ├── python/
│   │   │   ├── api_client.py        # Python API client
│   │   │   ├── test_users.py        # User API tests
│   │   │   ├── test_products.py     # Product API tests
│   │   │   ├── test_orders.py       # Order API tests
│   │   │   └── requirements.txt     # Python dependencies
│   │   │
│   │   └── js/
│   │       ├── apiTester.js         # JavaScript API client
│   │       ├── test-runner.js       # Test execution runner
│   │       └── performance-tester.js
│   │
│   ├── schemas/
│   │   ├── user-schema.json         # User response schema
│   │   ├── product-schema.json      # Product response schema
│   │   └── order-schema.json        # Order response schema
│   │
│   ├── reports/                     # Generated test reports
│   ├── test-data/                   # CSV files for data-driven testing
│   └── docs/
│       ├── API-DOCUMENTATION.md
│       ├── TEST-SCENARIOS.md
│       └── SETUP-GUIDE.md
```

---

## Complete Setup Instructions

### Step 1: Create Project Directory

```bash
cd automation-testing-portfolio

# Create project folder
mkdir project-2-api-testing
cd project-2-api-testing
```

### Step 2: Initialize npm Project

```bash
npm init -y
```

### Step 3: Install Dependencies

```bash
npm install -D @playwright/test typescript @types/node ts-node dotenv
npm install axios
```

### Step 4: Create TypeScript Configuration

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*", "tests/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Step 5: Create Environment Configuration

Create `.env.example`:

```bash
# API Configuration
API_BASE_URL=https://jsonplaceholder.typicode.com
API_TIMEOUT=5000

# Authentication
AUTH_TYPE=none
API_KEY=
BEARER_TOKEN=
USERNAME=
PASSWORD=

# Test Configuration
ENVIRONMENT=test
DEBUG=false
```

Create `.env` (copy from example and add real values):

```bash
cp .env.example .env
```

Add to `.gitignore`:

```
.env
node_modules/
dist/
reports/
```

### Step 6: Create Directory Structure

```bash
mkdir -p src tests scripts/{python,js} schemas reports test-data docs postman
```

---

## Complete Code Implementation

### 1. src/test-data.ts

```typescript
/**
 * Test data fixtures for API testing
 */

export const TEST_USERS = {
  valid: {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    phone: '1-770-736-8031',
    website: 'hildegard.org',
  },
  newUser: {
    name: 'Test User',
    email: 'test@example.com',
    username: 'testuser',
    phone: '123-456-7890',
    website: 'https://example.com',
  },
  updateUser: {
    name: 'Updated User',
    email: 'updated@example.com',
    username: 'updateduser',
    phone: '999-999-9999',
  },
};

export const TEST_PRODUCTS = {
  valid: {
    id: 1,
    title: 'Test Product',
    price: 99.99,
    description: 'A test product',
    category: 'electronics',
    image: 'https://example.com/image.jpg',
  },
  newProduct: {
    title: 'New Product',
    price: 49.99,
    description: 'New product for testing',
    category: 'books',
    image: 'https://example.com/new.jpg',
  },
};

export const TEST_ORDERS = {
  valid: {
    id: 1,
    userId: 1,
    productIds: [1, 2, 3],
    quantity: 5,
    date: new Date().toISOString(),
    status: 'pending',
  },
  newOrder: {
    userId: 1,
    productIds: [1, 2],
    quantity: 3,
    date: new Date().toISOString(),
  },
};

export const INVALID_DATA = {
  noEmail: {
    name: 'No Email User',
    username: 'noemail',
    phone: '123-456-7890',
  },
  invalidEmail: {
    name: 'Invalid Email',
    email: 'not-an-email',
    username: 'invalidemail',
  },
  emptyName: {
    name: '',
    email: 'test@example.com',
    username: 'emptyname',
  },
  negativePrice: {
    title: 'Negative Price Product',
    price: -10,
    description: 'Should fail',
  },
};

export const HTTP_STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

export const ENDPOINTS = {
  users: '/users',
  products: '/products',
  orders: '/orders',
  posts: '/posts',
  comments: '/comments',
};
```

### 2. src/api-client.ts

```typescript
import fetch from 'node-fetch';
import { config } from 'dotenv';

config();

/**
 * Custom error class for API errors
 */
export class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public responseBody: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

/**
 * Main API Client class for making HTTP requests
 */
export class APIClient {
  private baseURL: string;
  private headers: Record<string, string>;
  private timeout: number;

  constructor(baseURL?: string, timeout?: number) {
    this.baseURL = baseURL || process.env.API_BASE_URL || 'https://jsonplaceholder.typicode.com';
    this.timeout = timeout || parseInt(process.env.API_TIMEOUT || '5000', 10);
    this.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }

  /**
   * Set authentication header
   */
  setAuthToken(token: string, type: 'Bearer' | 'Basic' = 'Bearer'): void {
    this.headers['Authorization'] = `${type} ${token}`;
  }

  /**
   * Set API key authentication
   */
  setApiKey(apiKey: string, headerName: string = 'X-API-Key'): void {
    this.headers[headerName] = apiKey;
  }

  /**
   * Set custom headers
   */
  setHeaders(headers: Record<string, string>): void {
    this.headers = { ...this.headers, ...headers };
  }

  /**
   * Generic request method
   */
  private async request<T>(
    endpoint: string,
    method: string = 'GET',
    body?: any,
    customHeaders?: Record<string, string>
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const headers = { ...this.headers, ...customHeaders };

    const options: any = {
      method,
      headers,
      timeout: this.timeout,
    };

    if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      options.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, options);
      const contentType = response.headers.get('content-type');
      let responseBody: any = '';

      if (contentType?.includes('application/json')) {
        responseBody = await response.json();
      } else {
        responseBody = await response.text();
      }

      if (!response.ok) {
        throw new APIError(
          `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          JSON.stringify(responseBody)
        );
      }

      return responseBody as T;
    } catch (error: any) {
      if (error instanceof APIError) {
        throw error;
      }
      throw new Error(`Request failed: ${error.message}`);
    }
  }

  /**
   * GET request
   */
  get<T>(endpoint: string, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, 'GET', undefined, headers);
  }

  /**
   * POST request
   */
  post<T>(endpoint: string, body: any, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, 'POST', body, headers);
  }

  /**
   * PUT request
   */
  put<T>(endpoint: string, body: any, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, 'PUT', body, headers);
  }

  /**
   * PATCH request
   */
  patch<T>(endpoint: string, body: any, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, 'PATCH', body, headers);
  }

  /**
   * DELETE request
   */
  delete<T>(endpoint: string, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, 'DELETE', undefined, headers);
  }

  /**
   * HEAD request
   */
  head(endpoint: string, headers?: Record<string, string>): Promise<void> {
    return this.request<void>(endpoint, 'HEAD', undefined, headers);
  }
}
```

### 3. src/response-validator.ts

```typescript
import Ajv, { JSONSchemaType } from 'ajv';

/**
 * Response validator using JSON Schema
 */
export class ResponseValidator {
  private ajv: Ajv;

  constructor() {
    this.ajv = new Ajv();
  }

  /**
   * Validate response against schema
   */
  validateAgainstSchema<T>(data: any, schema: JSONSchemaType<T>): boolean {
    const validate = this.ajv.compile(schema);
    return validate(data) as boolean;
  }

  /**
   * Get validation errors
   */
  getErrors(): any[] {
    return this.ajv.errors || [];
  }

  /**
   * Check if response has required properties
   */
  hasRequiredProperties(data: any, properties: string[]): boolean {
    return properties.every(prop => prop in data);
  }

  /**
   * Validate status code
   */
  validateStatusCode(statusCode: number, expected: number | number[]): boolean {
    if (Array.isArray(expected)) {
      return expected.includes(statusCode);
    }
    return statusCode === expected;
  }

  /**
   * Validate response time (in milliseconds)
   */
  validateResponseTime(responseTime: number, maxTime: number): boolean {
    return responseTime <= maxTime;
  }

  /**
   * Validate content type
   */
  validateContentType(contentType: string | null, expected: string): boolean {
    return contentType?.includes(expected) || false;
  }

  /**
   * Deep equality check
   */
  deepEqual(obj1: any, obj2: any): boolean {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  /**
   * Check if array contains element
   */
  arrayContains<T>(array: T[], element: T): boolean {
    return array.includes(element);
  }

  /**
   * Validate numeric range
   */
  isInRange(value: number, min: number, max: number): boolean {
    return value >= min && value <= max;
  }
}
```

### 4. tests/users-api.test.ts

```typescript
import { test, expect } from '@playwright/test';
import { APIClient, APIError } from '../src/api-client';
import { ResponseValidator } from '../src/response-validator';
import { TEST_USERS, ENDPOINTS, HTTP_STATUS_CODES, INVALID_DATA } from '../src/test-data';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone?: string;
  website?: string;
}

test.describe('Users API Tests', () => {
  let apiClient: APIClient;
  let validator: ResponseValidator;

  test.beforeAll(() => {
    apiClient = new APIClient();
    validator = new ResponseValidator();
  });

  test('TC01: GET all users - success', async () => {
    // Act
    const response = await apiClient.get<User[]>(ENDPOINTS.users);

    // Assert
    expect(response).toBeTruthy();
    expect(Array.isArray(response)).toBe(true);
    expect(response.length).toBeGreaterThan(0);
    expect(response[0]).toHaveProperty('id');
    expect(response[0]).toHaveProperty('name');
    expect(response[0]).toHaveProperty('email');
  });

  test('TC02: GET single user - success', async () => {
    // Arrange
    const userId = 1;

    // Act
    const response = await apiClient.get<User>(`${ENDPOINTS.users}/${userId}`);

    // Assert
    expect(response).toBeTruthy();
    expect(response.id).toBe(userId);
    expect(response.name).toBeTruthy();
    expect(response.email).toBeTruthy();
    expect(response.email).toContain('@');
  });

  test('TC03: GET non-existent user - 404', async () => {
    // Arrange
    const userId = 99999;

    // Act & Assert
    try {
      await apiClient.get<User>(`${ENDPOINTS.users}/${userId}`);
      expect.fail('Should have thrown error');
    } catch (error: any) {
      expect(error).toBeInstanceOf(APIError);
      expect(error.statusCode).toBe(HTTP_STATUS_CODES.NOT_FOUND);
    }
  });

  test('TC04: POST create user - success', async () => {
    // Arrange
    const newUser = TEST_USERS.newUser;

    // Act
    const response = await apiClient.post<User>(ENDPOINTS.users, newUser);

    // Assert
    expect(response).toBeTruthy();
    expect(response).toHaveProperty('id');
    expect(response.name).toBe(newUser.name);
    expect(response.email).toBe(newUser.email);
    expect(response.username).toBe(newUser.username);
  });

  test('TC05: POST create user with invalid email - handled', async () => {
    // Arrange
    const invalidUser = INVALID_DATA.invalidEmail;

    // Act
    const response = await apiClient.post<any>(ENDPOINTS.users, invalidUser);

    // Assert
    // JSONPlaceholder doesn't validate, but test framework should handle
    expect(response).toBeTruthy();
    expect(response).toHaveProperty('id');
  });

  test('TC06: PUT update user - success', async () => {
    // Arrange
    const userId = 1;
    const updateData = TEST_USERS.updateUser;

    // Act
    const response = await apiClient.put<User>(
      `${ENDPOINTS.users}/${userId}`,
      updateData
    );

    // Assert
    expect(response).toBeTruthy();
    expect(response.id).toBe(userId);
    expect(response.name).toBe(updateData.name);
    expect(response.email).toBe(updateData.email);
  });

  test('TC07: PATCH partial update user - success', async () => {
    // Arrange
    const userId = 1;
    const partialUpdate = { name: 'Partially Updated' };

    // Act
    const response = await apiClient.patch<User>(
      `${ENDPOINTS.users}/${userId}`,
      partialUpdate
    );

    // Assert
    expect(response).toBeTruthy();
    expect(response.id).toBe(userId);
    expect(response.name).toBe(partialUpdate.name);
  });

  test('TC08: DELETE user - success', async () => {
    // Arrange
    const userId = 1;

    // Act
    const response = await apiClient.delete<any>(`${ENDPOINTS.users}/${userId}`);

    // Assert
    // JSONPlaceholder returns empty object on delete
    expect(response).toBeTruthy();
  });

  test('TC09: Validate user email format', async () => {
    // Act
    const users = await apiClient.get<User[]>(ENDPOINTS.users);

    // Assert
    users.forEach(user => {
      expect(user.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    });
  });

  test('TC10: Verify all required fields in user response', async () => {
    // Arrange
    const requiredFields = ['id', 'name', 'username', 'email'];

    // Act
    const users = await apiClient.get<User[]>(ENDPOINTS.users);

    // Assert
    users.forEach(user => {
      requiredFields.forEach(field => {
        expect(user).toHaveProperty(field);
      });
    });
  });

  test('TC11: Get users with custom headers', async () => {
    // Act
    const response = await apiClient.get<User[]>(
      ENDPOINTS.users,
      { 'X-Custom-Header': 'test-value' }
    );

    // Assert
    expect(response).toBeTruthy();
    expect(Array.isArray(response)).toBe(true);
  });

  test('TC12: Bulk user operations', async () => {
    // Act
    const createResponse1 = await apiClient.post<User>(ENDPOINTS.users, {
      name: 'User 1',
      email: 'user1@example.com',
      username: 'user1',
    });

    const createResponse2 = await apiClient.post<User>(ENDPOINTS.users, {
      name: 'User 2',
      email: 'user2@example.com',
      username: 'user2',
    });

    // Assert
    expect(createResponse1).toHaveProperty('id');
    expect(createResponse2).toHaveProperty('id');
    expect(createResponse1.id).not.toBe(createResponse2.id);
  });
});
```

### 5. tests/products-api.test.ts

```typescript
import { test, expect } from '@playwright/test';
import { APIClient } from '../src/api-client';
import { TEST_PRODUCTS, ENDPOINTS } from '../src/test-data';

interface Product {
  id: number;
  title: string;
  price: number;
  description?: string;
  category?: string;
  image?: string;
}

test.describe('Products API Tests', () => {
  let apiClient: APIClient;

  test.beforeAll(() => {
    apiClient = new APIClient();
  });

  test('TC101: GET all products - success', async () => {
    // Act
    const response = await apiClient.get<Product[]>(ENDPOINTS.products);

    // Assert
    expect(response).toBeTruthy();
    expect(Array.isArray(response)).toBe(true);
    expect(response.length).toBeGreaterThan(0);
    expect(response[0]).toHaveProperty('id');
    expect(response[0]).toHaveProperty('title');
  });

  test('TC102: GET single product - success', async () => {
    // Arrange
    const productId = 1;

    // Act
    const response = await apiClient.get<Product>(
      `${ENDPOINTS.products}/${productId}`
    );

    // Assert
    expect(response).toBeTruthy();
    expect(response.id).toBe(productId);
    expect(response.title).toBeTruthy();
    expect(response.price).toBeGreaterThan(0);
  });

  test('TC103: Product price validation', async () => {
    // Act
    const products = await apiClient.get<Product[]>(ENDPOINTS.products);

    // Assert
    products.forEach(product => {
      expect(product.price).toBeGreaterThan(0);
      expect(typeof product.price).toBe('number');
    });
  });

  test('TC104: POST create product - success', async () => {
    // Arrange
    const newProduct = TEST_PRODUCTS.newProduct;

    // Act
    const response = await apiClient.post<Product>(
      ENDPOINTS.products,
      newProduct
    );

    // Assert
    expect(response).toBeTruthy();
    expect(response).toHaveProperty('id');
    expect(response.title).toBe(newProduct.title);
    expect(response.price).toBe(newProduct.price);
  });

  test('TC105: PUT update product - success', async () => {
    // Arrange
    const productId = 1;
    const updateData = {
      title: 'Updated Product',
      price: 199.99,
      description: 'Updated description',
    };

    // Act
    const response = await apiClient.put<Product>(
      `${ENDPOINTS.products}/${productId}`,
      updateData
    );

    // Assert
    expect(response).toBeTruthy();
    expect(response.title).toBe(updateData.title);
    expect(response.price).toBe(updateData.price);
  });

  test('TC106: DELETE product - success', async () => {
    // Arrange
    const productId = 1;

    // Act
    const response = await apiClient.delete<any>(
      `${ENDPOINTS.products}/${productId}`
    );

    // Assert
    expect(response).toBeTruthy();
  });

  test('TC107: Products by category filtering', async () => {
    // Act
    const products = await apiClient.get<Product[]>(
      `${ENDPOINTS.products}?category=electronics`
    );

    // Assert
    expect(Array.isArray(products)).toBe(true);
    products.forEach(product => {
      expect(product).toHaveProperty('title');
      expect(product).toHaveProperty('price');
    });
  });

  test('TC108: Sorting products by price', async () => {
    // Act
    const allProducts = await apiClient.get<Product[]>(ENDPOINTS.products);

    // Assert (manual sort for validation)
    const sortedByPrice = [...allProducts].sort((a, b) => a.price - b.price);
    expect(sortedByPrice[0].price).toBeLessThanOrEqual(
      sortedByPrice[sortedByPrice.length - 1].price
    );
  });
});
```

### 6. tests/orders-api.test.ts

```typescript
import { test, expect } from '@playwright/test';
import { APIClient } from '../src/api-client';
import { TEST_ORDERS, ENDPOINTS } from '../src/test-data';

interface Order {
  id: number;
  userId: number;
  date: string;
  products?: any[];
}

test.describe('Orders API Tests', () => {
  let apiClient: APIClient;

  test.beforeAll(() => {
    apiClient = new APIClient();
  });

  test('TC201: GET all orders - success', async () => {
    // Act
    const response = await apiClient.get<Order[]>(ENDPOINTS.orders);

    // Assert
    expect(response).toBeTruthy();
    expect(Array.isArray(response)).toBe(true);
  });

  test('TC202: GET order by user ID', async () => {
    // Arrange
    const userId = 1;

    // Act
    const response = await apiClient.get<Order[]>(
      `${ENDPOINTS.orders}?userId=${userId}`
    );

    // Assert
    expect(Array.isArray(response)).toBe(true);
    if (response.length > 0) {
      expect(response[0].userId).toBe(userId);
    }
  });

  test('TC203: Create order - success', async () => {
    // Arrange
    const newOrder = TEST_ORDERS.newOrder;

    // Act
    const response = await apiClient.post<any>(ENDPOINTS.orders, newOrder);

    // Assert
    expect(response).toBeTruthy();
    expect(response).toHaveProperty('id');
    expect(response.userId).toBe(newOrder.userId);
  });

  test('TC204: Order date validation', async () => {
    // Act
    const orders = await apiClient.get<Order[]>(ENDPOINTS.orders);

    // Assert
    orders.forEach(order => {
      expect(order).toHaveProperty('date');
      const dateObj = new Date(order.date);
      expect(dateObj).not.toBeNaN();
    });
  });

  test('TC205: Update order - success', async () => {
    // Arrange
    const orderId = 1;
    const updateData = { date: new Date().toISOString() };

    // Act
    const response = await apiClient.put<Order>(
      `${ENDPOINTS.orders}/${orderId}`,
      updateData
    );

    // Assert
    expect(response).toBeTruthy();
    expect(response.id).toBe(orderId);
  });

  test('TC206: Delete order - success', async () => {
    // Arrange
    const orderId = 1;

    // Act
    const response = await apiClient.delete<any>(`${ENDPOINTS.orders}/${orderId}`);

    // Assert
    expect(response).toBeTruthy();
  });
});
```

### 7. scripts/python/api_client.py

```python
"""
Python API Client for REST API testing
"""

import requests
import json
from typing import Dict, List, Any, Optional
from urllib.parse import urljoin
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()


class APIError(Exception):
    """Custom exception for API errors"""
    def __init__(self, message: str, status_code: int, response_body: str):
        self.message = message
        self.status_code = status_code
        self.response_body = response_body
        super().__init__(self.message)


class APIClient:
    """Main API Client for REST API testing"""

    def __init__(self, base_url: Optional[str] = None, timeout: int = 5):
        """
        Initialize API Client

        Args:
            base_url: Base URL for API (defaults to environment variable)
            timeout: Request timeout in seconds
        """
        self.base_url = base_url or os.getenv(
            'API_BASE_URL',
            'https://jsonplaceholder.typicode.com'
        )
        self.timeout = timeout
        self.session = requests.Session()
        self.headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
        self.session.headers.update(self.headers)

    def set_auth_token(self, token: str, auth_type: str = 'Bearer') -> None:
        """Set authentication token"""
        self.session.headers['Authorization'] = f'{auth_type} {token}'

    def set_api_key(self, api_key: str, header_name: str = 'X-API-Key') -> None:
        """Set API key authentication"""
        self.session.headers[header_name] = api_key

    def set_headers(self, headers: Dict[str, str]) -> None:
        """Set custom headers"""
        self.session.headers.update(headers)

    def _request(
        self,
        method: str,
        endpoint: str,
        data: Optional[Dict[str, Any]] = None,
        headers: Optional[Dict[str, str]] = None,
        **kwargs
    ) -> Any:
        """
        Generic request method

        Args:
            method: HTTP method (GET, POST, PUT, PATCH, DELETE)
            endpoint: API endpoint
            data: Request body data
            headers: Custom headers
            **kwargs: Additional arguments for requests

        Returns:
            Response data as dictionary or list
        """
        url = urljoin(self.base_url, endpoint)
        request_headers = self.session.headers.copy()
        if headers:
            request_headers.update(headers)

        try:
            response = self.session.request(
                method=method,
                url=url,
                json=data,
                headers=request_headers,
                timeout=self.timeout,
                **kwargs
            )

            # Handle response
            if response.status_code >= 400:
                raise APIError(
                    f'HTTP {response.status_code}: {response.reason}',
                    response.status_code,
                    response.text
                )

            # Return JSON if available
            if response.content:
                try:
                    return response.json()
                except json.JSONDecodeError:
                    return response.text
            return None

        except requests.exceptions.RequestException as e:
            raise APIError(str(e), 0, '')

    def get(
        self,
        endpoint: str,
        headers: Optional[Dict[str, str]] = None,
        **kwargs
    ) -> Any:
        """GET request"""
        return self._request('GET', endpoint, headers=headers, **kwargs)

    def post(
        self,
        endpoint: str,
        data: Dict[str, Any],
        headers: Optional[Dict[str, str]] = None,
        **kwargs
    ) -> Any:
        """POST request"""
        return self._request('POST', endpoint, data=data, headers=headers, **kwargs)

    def put(
        self,
        endpoint: str,
        data: Dict[str, Any],
        headers: Optional[Dict[str, str]] = None,
        **kwargs
    ) -> Any:
        """PUT request"""
        return self._request('PUT', endpoint, data=data, headers=headers, **kwargs)

    def patch(
        self,
        endpoint: str,
        data: Dict[str, Any],
        headers: Optional[Dict[str, str]] = None,
        **kwargs
    ) -> Any:
        """PATCH request"""
        return self._request('PATCH', endpoint, data=data, headers=headers, **kwargs)

    def delete(
        self,
        endpoint: str,
        headers: Optional[Dict[str, str]] = None,
        **kwargs
    ) -> Any:
        """DELETE request"""
        return self._request('DELETE', endpoint, headers=headers, **kwargs)

    def close(self) -> None:
        """Close session"""
        self.session.close()
```

### 8. scripts/python/test_users.py

```python
"""
User API tests using Python
"""

import unittest
from api_client import APIClient, APIError


class TestUsersAPI(unittest.TestCase):
    """User API test cases"""

    @classmethod
    def setUpClass(cls):
        """Set up test client"""
        cls.client = APIClient()
        cls.endpoint = '/users'

    @classmethod
    def tearDownClass(cls):
        """Close client"""
        cls.client.close()

    def test_get_all_users(self):
        """Test getting all users"""
        response = self.client.get(self.endpoint)
        self.assertIsInstance(response, list)
        self.assertGreater(len(response), 0)
        self.assertIn('id', response[0])
        self.assertIn('name', response[0])
        self.assertIn('email', response[0])

    def test_get_single_user(self):
        """Test getting single user"""
        user_id = 1
        response = self.client.get(f'{self.endpoint}/{user_id}')
        self.assertEqual(response['id'], user_id)
        self.assertIn('name', response)
        self.assertIn('email', response)

    def test_create_user(self):
        """Test creating user"""
        new_user = {
            'name': 'Test User',
            'email': 'test@example.com',
            'username': 'testuser',
        }
        response = self.client.post(self.endpoint, new_user)
        self.assertIn('id', response)
        self.assertEqual(response['name'], new_user['name'])
        self.assertEqual(response['email'], new_user['email'])

    def test_update_user(self):
        """Test updating user"""
        user_id = 1
        update_data = {
            'name': 'Updated User',
            'email': 'updated@example.com',
        }
        response = self.client.put(f'{self.endpoint}/{user_id}', update_data)
        self.assertEqual(response['id'], user_id)
        self.assertEqual(response['name'], update_data['name'])

    def test_delete_user(self):
        """Test deleting user"""
        user_id = 1
        response = self.client.delete(f'{self.endpoint}/{user_id}')
        self.assertIsNotNone(response)

    def test_user_not_found(self):
        """Test 404 error"""
        with self.assertRaises(APIError) as context:
            self.client.get(f'{self.endpoint}/99999')
        self.assertEqual(context.exception.status_code, 404)

    def test_email_validation(self):
        """Test email format"""
        response = self.client.get(self.endpoint)
        for user in response:
            self.assertIn('@', user['email'])
            self.assertRegex(user['email'], r'^[\w\.-]+@[\w\.-]+\.\w+$')

    def test_required_fields(self):
        """Test required fields present"""
        response = self.client.get(self.endpoint)
        required_fields = ['id', 'name', 'username', 'email']
        for user in response:
            for field in required_fields:
                self.assertIn(field, user)


if __name__ == '__main__':
    unittest.main()
```

### 9. scripts/python/requirements.txt

```
requests==2.31.0
python-dotenv==1.0.0
```

### 10. package.json

```json
{
  "name": "api-testing-suite",
  "version": "1.0.0",
  "description": "Comprehensive REST API testing suite with Postman, JavaScript, and Python",
  "scripts": {
    "test": "playwright test",
    "test:headed": "playwright test --headed",
    "test:ui": "playwright test --ui",
    "test:debug": "playwright test --debug",
    "test:users": "playwright test users-api.test.ts",
    "test:products": "playwright test products-api.test.ts",
    "test:orders": "playwright test orders-api.test.ts",
    "test:parallel": "playwright test --workers=4",
    "test:serial": "playwright test --workers=1",
    "report": "playwright show-report",
    "python:test": "python -m pytest scripts/python/",
    "python:users": "python scripts/python/test_users.py -v"
  },
  "keywords": [
    "api-testing",
    "rest-api",
    "postman",
    "playwright",
    "automation-testing"
  ],
  "author": "Your Name",
  "license": "MIT",
  "devDependencies": {
    "@playwright/test": "^1.40.0",
    "@types/node": "^20.0.0",
    "typescript": "^5.3.0",
    "ts-node": "^10.9.0",
    "dotenv": "^16.3.1"
  },
  "dependencies": {
    "axios": "^1.6.1"
  }
}
```

---

## Postman Collection Setup

### 1. Create Collection in Postman

1. Open Postman
2. Click **File → New Collection**
3. Name it: **E-Commerce API Tests**
4. Create folders:
   - Users
   - Products
   - Orders
   - Authentication

### 2. Users Collection - Requests

**GET All Users**
```
Method: GET
URL: {{baseUrl}}/users
Headers:
  Accept: application/json
Tests:
  pm.test("Status is 200", function() {
    pm.response.to.have.status(200);
  });
  pm.test("Response is array", function() {
    var jsonData = pm.response.json();
    pm.expect(Array.isArray(jsonData)).to.be.true;
  });
```

**POST Create User**
```
Method: POST
URL: {{baseUrl}}/users
Headers:
  Content-Type: application/json
Body:
{
  "name": "New User",
  "email": "user@example.com",
  "username": "newuser",
  "phone": "123-456-7890"
}
Tests:
  pm.test("Status is 201", function() {
    pm.response.to.have.status(201);
  });
  pm.test("Response has ID", function() {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('id');
  });
```

### 3. Environment Variables

1. Click **Manage Environments**
2. Create **API-Testing** environment
3. Add variables:

| Variable | Value |
|----------|-------|
| baseUrl | https://jsonplaceholder.typicode.com |
| userId | 1 |
| productId | 1 |
| orderId | 1 |
| apiKey | (your-api-key) |

---

## Test Execution Guide

### Run JavaScript/TypeScript Tests

```bash
# All tests
npm test

# Specific test file
npx playwright test tests/users-api.test.ts

# Specific test
npx playwright test -g "GET all users"

# With report
npm test && npm run report
```

### Run Python Tests

```bash
# Install dependencies
cd scripts/python
pip install -r requirements.txt

# Run all tests
python -m unittest discover

# Run specific test file
python test_users.py -v

# Run with pytest
pytest test_users.py -v
```

### Run Postman Collection

1. In Postman: **Collection → Run**
2. Select all requests
3. Click **Start Test Run**
4. View results and report

---

## Project Exercise Assignments

### Day 12: Foundation
1. Setup project structure
2. Create Postman collection with CRUD operations
3. Implement APIClient base class
4. Write environment configuration
5. Create test data fixtures

**Expected Output:** Working Postman collection with 5+ requests

### Day 13: JavaScript Implementation
1. Complete APIClient class
2. Write ResponseValidator class
3. Implement users-api.test.ts (12 tests)
4. Implement products-api.test.ts (8 tests)
5. Verify all tests pass

**Expected Output:** 20 JavaScript tests passing

### Day 14: Python Implementation
1. Create Python API client
2. Write test_users.py (8 tests)
3. Write test_products.py
4. Write test_orders.py
5. Run all Python tests

**Expected Output:** All Python tests passing with detailed output

### Day 15: Advanced Features
1. Implement data-driven testing
2. Add performance testing
3. Create contract testing schema
4. Generate comprehensive reports
5. Document all APIs

**Expected Output:** Complete API testing suite with reports and documentation

---

## MCQs - Test Your Knowledge

### Question 1: HTTP Methods
Which HTTP method is idempotent?
- A) POST
- B) GET
- C) DELETE
- **D) Both B and C**

**Answer: D** - GET and DELETE are idempotent; POST is not.

### Question 2: Status Codes
What does HTTP 201 indicate?
- A) OK
- B) Created
- C) Accepted
- **D) No Content**

**Answer: B** - 201 Created indicates resource was successfully created.

### Question 3: REST Principles
What is NOT a REST constraint?
- A) Client-Server Architecture
- B) Statelessness
- C) Caching
- **D) SOAP Protocol**

**Answer: D** - SOAP is not a REST constraint; it's an alternative protocol.

### Question 4: API Testing
Which is best for testing API request/response validation?
- A) Unit testing framework
- B) Schema validation with JSON Schema
- C) Manual testing
- **D) Both A and B**

**Answer: D** - Both approaches are valid for comprehensive testing.

### Question 5: Authentication
Which is most secure for API testing?
- A) Hardcode credentials in tests
- B) Use environment variables for secrets
- C) Store tokens in version control
- **D) Share credentials with team**

**Answer: B** - Environment variables protect sensitive data.

---

## README.md Template

```markdown
# Project 2: REST API Testing Suite

## Overview
Professional REST API testing implementation using Postman, JavaScript/TypeScript, and Python.

## Technologies
- Postman (Desktop)
- JavaScript/TypeScript with Playwright
- Python with requests library
- JSON Schema for validation

## Installation

### Prerequisites
- Node.js 20.x
- Python 3.10+
- Postman Desktop
- npm or yarn

### Setup

\`\`\`bash
npm install
cd scripts/python && pip install -r requirements.txt
\`\`\`

## Running Tests

### JavaScript/TypeScript
\`\`\`bash
npm test
\`\`\`

### Python
\`\`\`bash
python -m unittest discover
\`\`\`

### Postman Collection
- Import JSON file to Postman
- Set environment variables
- Run collection

## Project Structure
- `src/` - API client and utilities
- `tests/` - Test files
- `scripts/python` - Python tests
- `postman/` - Postman collections
- `schemas/` - JSON schemas

## Key Features
- Multi-language API testing
- Comprehensive validation
- Data-driven testing
- Performance testing
- Error scenario handling
- CICD integration ready

## Test Coverage
- User CRUD operations
- Product API testing
- Order API testing
- Authentication endpoints
- Error handling validation

## Documentation
- API Documentation
- Test Scenarios
- Setup Guide

```

---

## GitHub Commit Strategy

```bash
git add .
git commit -m "Project 2: Initial project setup and structure"
git commit -m "Project 2: Implement APIClient and ResponseValidator"
git commit -m "Project 2: Add comprehensive JavaScript/TypeScript tests"
git commit -m "Project 2: Implement Python API client and tests"
git commit -m "Project 2: Create Postman collections and environments"
git commit -m "Project 2: Add test data and fixtures"
git commit -m "Project 2: Add comprehensive documentation and README"
git push origin main
```

---

## Career Value & Interview Points

### What This Project Demonstrates

1. **API Testing Expertise**
   - "I implemented comprehensive REST API testing covering CRUD operations, error scenarios, and edge cases."

2. **Multi-Language Skills**
   - "I demonstrated API testing in Postman, JavaScript/TypeScript, and Python, showing versatility."

3. **Best Practices**
   - "I used environment variables for secrets, schema validation, and proper error handling."

4. **Professional Approach**
   - "I created reusable API client classes, reducing code duplication and improving maintainability."

5. **Testing Strategy**
   - "I covered positive scenarios, negative tests, data validation, and error handling comprehensively."

### Interview Questions You Can Answer

1. **"How do you handle authentication in API testing?"**
   - Explain token management, environment variables, and different auth types

2. **"What's your approach to test data management?"**
   - Discuss test data fixtures, cleanup, and isolation

3. **"How do you validate API responses?"**
   - Explain schema validation, status codes, and field-level assertions

4. **"How would you scale this for thousands of API tests?"**
   - Discuss parallel execution, categorization, and CI/CD integration

---

## Next Steps

After completing Project 2:
1. ✅ Push to GitHub with professional documentation
2. ✅ Create 2-minute demo video of tests running
3. ✅ Update LinkedIn with API testing expertise
4. ✅ Document key learnings in portfolio
5. ✅ Move to **Project 3: CI/CD Pipeline** (Days 16-20)

---

## Additional Resources

- [REST API Best Practices](https://restfulapi.net/)
- [JSON Schema Documentation](https://json-schema.org/)
- [Postman Learning Center](https://learning.postman.com/)
- [Playwright API Testing](https://playwright.dev/docs/api-testing)
- [Python Requests Library](https://requests.readthedocs.io/)

---

**Project Status:** Ready to Build
**Last Updated:** December 2025
**Difficulty Level:** Intermediate
**Time Required:** 40-50 hours
**GitHub Visibility:** Public Portfolio Project

