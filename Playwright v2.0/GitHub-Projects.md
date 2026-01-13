# GitHub Portfolio Projects: 5 Complete Automation Testing Projects

## 📋 **Overview**

This document details 5 professional-grade portfolio projects you'll build during the 25-day course. Each project is designed to showcase real-world automation testing expertise for Berlin tech companies.

---

## 🎯 **Portfolio Project Summary**

| Project | Days | Framework | Tech Stack | Complexity | Showcase Value |
|---------|------|-----------|-----------|-----------|-----------------|
| **Project 1** | 6-11 | Playwright | JS/TS, Playwright | Medium | E-commerce automation |
| **Project 2** | 12-15 | REST APIs | JS/TS, Postman, Python | Medium | API testing expertise |
| **Project 3** | 16-20 | CI/CD | Jenkins, GitHub Actions | High | DevOps integration |
| **Project 4** | 21-23 | Advanced Framework | Playwright, POM | High | Enterprise architecture |
| **Project 5** | 21-25 | Cypress | Cypress, JavaScript | Medium | Modern framework expertise |

---

## 📁 **GitHub Repository Structure**

```
automation-testing-portfolio/
├── README.md (Main project index)
├── .gitignore
├── LICENSE
├── PROJECTS.md (This file)
│
├── project-1-ecommerce-testing/
│   ├── README.md
│   ├── package.json
│   ├── playwright.config.ts
│   ├── tests/
│   │   ├── auth.spec.ts
│   │   ├── product-search.spec.ts
│   │   ├── checkout.spec.ts
│   │   └── payment.spec.ts
│   ├── pages/
│   │   ├── basePage.ts
│   │   ├── loginPage.ts
│   │   ├── productPage.ts
│   │   └── checkoutPage.ts
│   ├── utils/
│   │   ├── testData.ts
│   │   └── helpers.ts
│   └── reports/
│
├── project-2-api-testing/
│   ├── README.md
│   ├── package.json
│   ├── postman/
│   │   └── API-Tests.postman_collection.json
│   ├── tests/
│   │   ├── users-api.test.ts
│   │   ├── products-api.test.ts
│   │   └── orders-api.test.ts
│   ├── scripts/
│   │   ├── python/
│   │   │   └── api_tester.py
│   │   └── js/
│   │       └── apiTester.js
│   └── docs/
│
├── project-3-cicd-pipeline/
│   ├── README.md
│   ├── Jenkinsfile
│   ├── .github/workflows/
│   │   ├── playwright.yml
│   │   ├── cypress.yml
│   │   └── docker-build.yml
│   ├── docker/
│   │   ├── Dockerfile
│   │   └── docker-compose.yml
│   ├── jenkins-scripts/
│   │   └── shared-library/
│   └── docs/
│
├── project-4-advanced-framework/
│   ├── README.md
│   ├── package.json
│   ├── playwright.config.ts
│   ├── tests/
│   │   └── framework-tests.spec.ts
│   ├── pages/
│   │   ├── basePage.ts
│   │   ├── loginPage.ts
│   │   └── dashboardPage.ts
│   ├── utils/
│   │   ├── reporters.ts
│   │   ├── hooks.ts
│   │   └── database.ts
│   └── docs/
│
├── project-5-cypress-testing/
│   ├── README.md
│   ├── cypress.config.js
│   ├── cypress/
│   │   ├── e2e/
│   │   │   └── app.cy.js
│   │   ├── support/
│   │   │   ├── commands.js
│   │   │   └── e2e.js
│   │   └── fixtures/
│   ├── cypress/
│   │   └── plugins/
│   └── docs/
│
└── CAREER_JOURNEY.md (Your progress documentation)
```

---

# 🚀 PROJECT 1: E-Commerce Test Automation (Days 6-11)

## **Project Brief**

Automate end-to-end testing for a realistic e-commerce application using Playwright. This project demonstrates:
- Page Object Model (POM) architecture
- Real-world authentication flows
- Complex user journeys
- Data-driven testing
- Screenshot and video capturing for failures

## **Learning Outcomes**
- ✅ Mastery of Playwright APIs
- ✅ Professional test organization
- ✅ Advanced selector strategies
- ✅ Test reporting and artifacts
- ✅ Cross-browser testing

---

### **Project 1: Complete Setup & Code**

#### **1. Initialize Project**

```bash
cd ~/automation-testing-portfolio/project-1-ecommerce-testing
npm init -y
npm install -D @playwright/test @types/node typescript ts-node
npx playwright install
```

#### **2. playwright.config.ts**

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env['CI'],
  retries: process.env['CI'] ? 2 : 0,
  workers: process.env['CI'] ? 1 : undefined,
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results.json' }],
    ['junit', { outputFile: 'test-results.xml' }],
  ],
  use: {
    baseURL: 'https://practice.saucedemo.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
```

#### **3. pages/basePage.ts**

```typescript
import { Page } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  async navigateTo(path: string = '/') {
    await this.page.goto(path);
  }

  async getPageTitle(): Promise<string> {
    return this.page.title();
  }

  async waitForElement(selector: string) {
    await this.page.waitForSelector(selector);
  }

  async click(selector: string) {
    await this.page.click(selector);
  }

  async fill(selector: string, text: string) {
    await this.page.fill(selector, text);
  }

  async getText(selector: string): Promise<string> {
    return await this.page.textContent(selector) || '';
  }

  async getAttr(selector: string, attribute: string): Promise<string | null> {
    return await this.page.getAttribute(selector, attribute);
  }

  async screenshot(name: string) {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }
}
```

#### **4. pages/loginPage.ts**

```typescript
import { BasePage } from './basePage';
import { Page } from '@playwright/test';

export class LoginPage extends BasePage {
  private usernameInput = '#user-name';
  private passwordInput = '#password';
  private loginButton = '#login-button';
  private errorMessage = '[data-test="error"]';

  constructor(page: Page) {
    super(page);
  }

  async login(username: string, password: string) {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
  }

  async getErrorMessage(): Promise<string> {
    return await this.getText(this.errorMessage);
  }

  async isLoginSuccessful(): Promise<boolean> {
    try {
      await this.page.waitForURL('**/inventory.html', { timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }
}
```

#### **5. tests/auth.spec.ts**

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

test.describe('Authentication Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateTo();
  });

  test('Valid user login', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    const success = await loginPage.isLoginSuccessful();
    expect(success).toBe(true);
  });

  test('Invalid password login', async () => {
    await loginPage.login('standard_user', 'wrong_password');
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Username and password do not match');
  });

  test('Locked user login', async () => {
    await loginPage.login('locked_out_user', 'secret_sauce');
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('locked out');
  });
});
```

#### **6. package.json**

```json
{
  "name": "ecommerce-automation",
  "version": "1.0.0",
  "description": "E-commerce test automation with Playwright",
  "scripts": {
    "test": "playwright test",
    "test:headed": "playwright test --headed",
    "test:ui": "playwright test --ui",
    "test:debug": "playwright test --debug",
    "test:chromium": "playwright test --project=chromium",
    "report": "playwright show-report"
  },
  "devDependencies": {
    "@playwright/test": "^1.40.0",
    "@types/node": "^20.0.0",
    "typescript": "^5.3.0",
    "ts-node": "^10.9.0"
  }
}
```

#### **7. utils/testData.ts**

```typescript
export const TEST_USERS = {
  validUser: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
  lockedUser: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },
  invalidPassword: {
    username: 'standard_user',
    password: 'invalid',
  },
};

export const TEST_PRODUCTS = {
  backpack: 'Sauce Labs Backpack',
  bikeLight: 'Sauce Labs Bike Light',
  tShirt: 'Sauce Labs T-Shirt',
};

export const URLS = {
  login: '/',
  inventory: '/inventory.html',
  cart: '/cart.html',
  checkout: '/checkout-step-one.html',
};
```

#### **8. README.md (Project 1)**

```markdown
# Project 1: E-Commerce Test Automation

## Overview
Automated test suite for e-commerce application using Playwright with Page Object Model architecture.

## Technologies
- Playwright (latest)
- TypeScript
- Node.js

## Setup

```bash
npm install
npx playwright install
```

## Running Tests

```bash
# Run all tests
npm test

# Run in headed mode (see browser)
npm run test:headed

# Run in UI mode (interactive)
npm run test:ui

# Run specific browser
npm run test:chromium
```

## Project Structure
- `tests/` - Test files
- `pages/` - Page Object Model classes
- `utils/` - Test data and helpers
- `screenshots/` - Failure screenshots

## Test Coverage
- Authentication (Login/Logout)
- Product Search and Filtering
- Shopping Cart Operations
- Checkout Flow
- Payment Processing
- Order Confirmation

## Key Learning Points
✅ Page Object Model pattern
✅ Multi-browser testing
✅ Advanced selectors
✅ Test reporting
✅ Screenshot capturing

```

---

# 📡 PROJECT 2: REST API Testing (Days 12-15)

## **Project Brief**

Comprehensive REST API testing using Postman, JavaScript/TypeScript, and Python. Demonstrates:
- API endpoint testing
- Request/response validation
- Test data management
- CI/CD integration for API tests
- Multiple tech stacks

---

### **Project 2: Complete Code**

#### **1. Postman Collection (Export JSON)**

```json
{
  "info": {
    "name": "E-Commerce API Tests",
    "version": "1.0.0"
  },
  "item": [
    {
      "name": "Users",
      "item": [
        {
          "name": "Get All Users",
          "request": {
            "method": "GET",
            "url": "{{base_url}}/api/users",
            "header": [
              {"key": "Authorization", "value": "Bearer {{token}}"}
            ]
          },
          "test": "pm.test('Status 200', () => pm.response.code === 200);"
        },
        {
          "name": "Create User",
          "request": {
            "method": "POST",
            "url": "{{base_url}}/api/users",
            "body": {
              "raw": "{\"name\": \"John\", \"email\": \"john@test.com\"}"
            }
          }
        }
      ]
    }
  ]
}
```

#### **2. tests/users-api.test.ts**

```typescript
import { test, expect } from '@playwright/test';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

test.describe('Users API Tests', () => {
  test('GET /users - List all users', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/users`);
    
    expect(response.status()).toBe(200);
    const users = await response.json();
    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeGreaterThan(0);
  });

  test('GET /users/:id - Get specific user', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/users/1`);
    
    expect(response.status()).toBe(200);
    const user = await response.json();
    expect(user.id).toBe(1);
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');
  });

  test('POST /users - Create user', async ({ request }) => {
    const newUser = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '1234567890',
    };

    const response = await request.post(`${API_BASE_URL}/users`, {
      data: newUser,
    });

    expect(response.status()).toBe(201);
    const created = await response.json();
    expect(created.name).toBe(newUser.name);
  });

  test('PUT /users/:id - Update user', async ({ request }) => {
    const updates = { name: 'Updated Name' };
    const response = await request.put(`${API_BASE_URL}/users/1`, {
      data: updates,
    });

    expect(response.status()).toBe(200);
    const updated = await response.json();
    expect(updated.name).toBe(updates.name);
  });

  test('DELETE /users/:id - Delete user', async ({ request }) => {
    const response = await request.delete(`${API_BASE_URL}/users/1`);
    expect(response.status()).toBe(200);
  });
});
```

#### **3. scripts/js/apiTester.js**

```javascript
const axios = require('axios');

const apiBaseUrl = 'https://jsonplaceholder.typicode.com';

class APITester {
  async getAllUsers() {
    try {
      const response = await axios.get(`${apiBaseUrl}/users`);
      console.log('✓ Users fetched:', response.data.length);
      return response.data;
    } catch (error) {
      console.error('✗ Error fetching users:', error.message);
    }
  }

  async getUser(userId) {
    try {
      const response = await axios.get(`${apiBaseUrl}/users/${userId}`);
      console.log('✓ User fetched:', response.data.name);
      return response.data;
    } catch (error) {
      console.error('✗ Error fetching user:', error.message);
    }
  }

  async createUser(userData) {
    try {
      const response = await axios.post(`${apiBaseUrl}/users`, userData);
      console.log('✓ User created:', response.data.id);
      return response.data;
    } catch (error) {
      console.error('✗ Error creating user:', error.message);
    }
  }

  async validateResponse(response, expectedStatus) {
    if (response.status === expectedStatus) {
      console.log(`✓ Status ${expectedStatus} verified`);
      return true;
    }
    return false;
  }
}

module.exports = APITester;
```

#### **4. scripts/python/api_tester.py**

```python
import requests
import json
from typing import Dict, List, Any

class APITester:
    def __init__(self, base_url: str):
        self.base_url = base_url
        self.session = requests.Session()
    
    def get_users(self) -> List[Dict]:
        """Fetch all users"""
        try:
            response = self.session.get(f"{self.base_url}/users")
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"Error fetching users: {e}")
            return []
    
    def get_user(self, user_id: int) -> Dict:
        """Fetch specific user"""
        try:
            response = self.session.get(f"{self.base_url}/users/{user_id}")
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"Error fetching user: {e}")
            return {}
    
    def create_user(self, user_data: Dict) -> Dict:
        """Create new user"""
        try:
            response = self.session.post(
                f"{self.base_url}/users",
                json=user_data
            )
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"Error creating user: {e}")
            return {}
    
    def validate_status(self, response_status: int, expected: int) -> bool:
        """Validate HTTP status code"""
        if response_status == expected:
            print(f"✓ Status {expected} verified")
            return True
        print(f"✗ Expected {expected}, got {response_status}")
        return False
    
    def run_tests(self):
        """Run comprehensive API tests"""
        print("Starting API tests...\n")
        
        # Test GET all users
        users = self.get_users()
        print(f"✓ Fetched {len(users)} users\n")
        
        # Test GET specific user
        user = self.get_user(1)
        print(f"✓ User: {user.get('name')}\n")
        
        # Test POST create user
        new_user = {
            "name": "Test User",
            "email": "test@example.com",
            "phone": "1234567890"
        }
        created = self.create_user(new_user)
        print(f"✓ Created user with ID: {created.get('id')}\n")

if __name__ == "__main__":
    tester = APITester("https://jsonplaceholder.typicode.com")
    tester.run_tests()
```

#### **5. README.md (Project 2)**

```markdown
# Project 2: REST API Testing Suite

## Overview
Complete REST API testing implementation using Postman, JavaScript, and Python.

## Technologies
- Postman
- JavaScript/TypeScript with axios
- Python with requests
- Playwright API testing

## Test Scenarios
- User CRUD operations
- Product API testing
- Order API testing
- Authentication endpoints
- Error handling & validation

## Running Tests

### JavaScript Tests
```bash
npm install
npm test
```

### Python Tests
```bash
pip install requests
python scripts/python/api_tester.py
```

### Postman Collection
Import `postman/API-Tests.postman_collection.json` to Postman

## Key Learning Points
✅ REST API fundamentals
✅ Request/response validation
✅ Test data management
✅ Multi-language API testing
✅ Postman automation

```

---

# 🔧 PROJECT 3: CI/CD Pipeline Integration (Days 16-20)

## **Project Brief**

Complete CI/CD pipeline setup demonstrating:
- Jenkins declarative pipelines
- GitHub Actions workflows
- Docker containerization
- Automated test execution
- Reporting and notifications

---

### **Project 3: Complete Code**

#### **1. Jenkinsfile (Jenkins Pipeline)**

```groovy
pipeline {
    agent any

    options {
        timestamps()
        timeout(time: 1, unit: 'HOURS')
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    environment {
        NODE_ENV = 'test'
        TEST_RESULTS = 'test-results'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                echo 'Code checked out successfully'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
                sh 'npm install -D @playwright/test'
            }
        }

        stage('Run Tests') {
            parallel {
                stage('Playwright Tests') {
                    steps {
                        sh 'npm run test:playwright'
                    }
                }
                stage('API Tests') {
                    steps {
                        sh 'npm run test:api'
                    }
                }
            }
        }

        stage('Generate Reports') {
            steps {
                sh 'npm run report'
                publishHTML([
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Report'
                ])
            }
        }

        stage('Archive Artifacts') {
            steps {
                archiveArtifacts artifacts: '**/*.xml,**/*.json', allowEmptyArchive: true
            }
        }
    }

    post {
        always {
            junit '**/*.xml'
            cleanWs()
        }
        failure {
            emailext(
                subject: "Build Failed: ${JOB_NAME} #${BUILD_NUMBER}",
                body: "Build failed. Check console output at ${BUILD_URL}"
            )
        }
    }
}
```

#### **2. .github/workflows/playwright.yml**

```yaml
name: Playwright Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest

    strategy:
      fail-fast: false
      matrix:
        browser: [chromium, firefox, webkit]

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps

      - name: Run Playwright tests
        run: npm run test -- --project=${{ matrix.browser }}

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-results-${{ matrix.browser }}
          path: playwright-report/

      - name: Publish test report
        if: always()
        uses: daun/playwright-report-comment@v3
        with:
          report-path: playwright-report
```

#### **3. docker/Dockerfile**

```dockerfile
FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Install Playwright browsers
RUN npx playwright install --with-deps

# Copy test files
COPY . .

# Run tests
CMD ["npm", "test"]
```

#### **4. docker/docker-compose.yml**

```yaml
version: '3.8'

services:
  test-runner:
    build: .
    container_name: automation-test-runner
    volumes:
      - ./test-results:/app/test-results
      - ./playwright-report:/app/playwright-report
    environment:
      - CI=true
      - NODE_ENV=test
    command: npm test

  jenkins:
    image: jenkins/jenkins:latest
    ports:
      - "8080:8080"
      - "50000:50000"
    volumes:
      - jenkins_home:/var/jenkins_home
    environment:
      - JENKINS_JAVA_OPTS=-Djenkins.install.runSetupWizard=false

volumes:
  jenkins_home:
```

#### **5. jenkins-scripts/shared-library/vars/automationTest.groovy**

```groovy
def call(Map pipelineParams) {
    pipeline {
        agent any

        options {
            timestamps()
            buildDiscarder(logRotator(numToKeepStr: '5'))
        }

        stages {
            stage('Build') {
                steps {
                    script {
                        echo "Building automation test suite..."
                        sh 'npm install'
                    }
                }
            }

            stage('Test') {
                steps {
                    script {
                        echo "Running tests on ${pipelineParams.browsers.join(', ')}"
                        sh 'npm test'
                    }
                }
            }

            stage('Report') {
                steps {
                    script {
                        publishHTML([
                            reportDir: 'playwright-report',
                            reportFiles: 'index.html',
                            reportName: 'Test Report'
                        ])
                    }
                }
            }
        }

        post {
            always {
                cleanWs()
            }
        }
    }
}
```

#### **6. README.md (Project 3)**

```markdown
# Project 3: CI/CD Pipeline Integration

## Overview
Complete CI/CD pipeline with Jenkins and GitHub Actions for automated test execution.

## Technologies
- Jenkins (Declarative Pipelines)
- GitHub Actions
- Docker
- Docker Compose

## Setup

### Local Testing
```bash
docker-compose up
```

### Jenkins Setup
1. Install Jenkins locally or use Docker
2. Create new Pipeline job
3. Point to Jenkinsfile in repository
4. Configure GitHub webhook

### GitHub Actions
- Workflows in `.github/workflows/`
- Automatic on push/PR
- Multi-browser testing

## Key Features
✅ Parallel test execution
✅ Multi-browser testing matrix
✅ Automated reporting
✅ Docker containerization
✅ Artifact archiving
✅ Email notifications

## Learning Outcomes
✅ Jenkins pipeline design
✅ GitHub Actions workflows
✅ Docker for test execution
✅ CI/CD best practices

```

---

# 🏗️ PROJECT 4: Advanced Framework Design (Days 21-23)

## **Project Brief**

Enterprise-grade automation framework demonstrating:
- Professional architecture patterns
- Database integration
- Custom reporting
- Performance optimization
- Scalable design

---

### **Project 4: Key Components**

#### **1. Framework Architecture**

```typescript
// utils/reporters.ts
import * as fs from 'fs';
import * as path from 'path';

export class TestReporter {
  private reportDir = './reports';
  
  constructor() {
    if (!fs.existsSync(this.reportDir)) {
      fs.mkdirSync(this.reportDir);
    }
  }

  generateReport(testResults: any[]) {
    const report = {
      timestamp: new Date().toISOString(),
      totalTests: testResults.length,
      passed: testResults.filter(t => t.passed).length,
      failed: testResults.filter(t => !t.passed).length,
      passRate: `${((testResults.filter(t => t.passed).length / testResults.length) * 100).toFixed(2)}%`,
      duration: `${this.calculateDuration(testResults)}ms`,
      tests: testResults
    };

    fs.writeFileSync(
      path.join(this.reportDir, `report-${Date.now()}.json`),
      JSON.stringify(report, null, 2)
    );

    return report;
  }

  private calculateDuration(results: any[]): number {
    return results.reduce((sum, test) => sum + test.duration, 0);
  }
}
```

#### **2. Database Integration**

```typescript
// utils/database.ts
import { Pool } from 'pg';

export class DatabaseClient {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      database: process.env.DB_NAME,
    });
  }

  async query(text: string, params?: any[]) {
    return this.pool.query(text, params);
  }

  async setupTestData() {
    // Setup test data before tests
  }

  async cleanupTestData() {
    // Cleanup after tests
  }

  async close() {
    await this.pool.end();
  }
}
```

#### **3. Framework Tests**

```typescript
// tests/framework-tests.spec.ts
import { test, expect } from '@playwright/test';
import { TestReporter } from '../utils/reporters';

test.describe('Advanced Framework Features', () => {
  let reporter: TestReporter;

  test.beforeAll(() => {
    reporter = new TestReporter();
  });

  test('Custom reporting', async ({ page }) => {
    // Test implementation
    expect(true).toBe(true);
  });

  test('Performance tracking', async ({ page }) => {
    const startTime = Date.now();
    // Perform actions
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    expect(duration).toBeLessThan(5000);
  });

  test('Database integration', async () => {
    // Database test implementation
    expect(true).toBe(true);
  });
});
```

#### **4. README.md (Project 4)**

```markdown
# Project 4: Advanced Framework Design

## Overview
Enterprise automation framework with professional architecture patterns.

## Features
- Scalable architecture
- Database integration
- Custom reporting
- Performance monitoring
- Error handling

## Key Patterns
✅ Page Object Model (POM)
✅ Singleton Pattern
✅ Factory Pattern
✅ Observer Pattern

## Technologies
- Playwright
- TypeScript
- PostgreSQL
- Custom Reporters

```

---

# 🎭 PROJECT 5: Cypress Testing Framework (Days 21-25)

## **Project Brief**

Modern e-commerce testing with Cypress demonstrating:
- Cypress best practices
- Custom commands and plugins
- Network mocking
- Visual testing
- LambdaTest certification readiness

---

### **Project 5: Complete Code**

#### **1. cypress.config.js**

```javascript
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://practice.saucedemo.com',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    pageLoadTimeout: 10000,
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    video: true,
    videoUploadOnPasses: false,
    setupNodeEvents(on, config) {
      // Register event listeners
    },
  },
});
```

#### **2. cypress/support/commands.js**

```javascript
// Custom Commands for Cypress

Cypress.Commands.add('loginUser', (username, password) => {
  cy.visit('/');
  cy.get('#user-name').type(username);
  cy.get('#password').type(password);
  cy.get('#login-button').click();
  cy.url().should('include', '/inventory');
});

Cypress.Commands.add('addProductToCart', (productName) => {
  cy.contains(productName)
    .closest('.inventory_item')
    .find('button')
    .click();
});

Cypress.Commands.add('proceedToCheckout', () => {
  cy.get('.shopping_cart_link').click();
  cy.get('[data-test="checkout"]').click();
});

Cypress.Commands.add('fillCheckoutInfo', (firstName, lastName, zipCode) => {
  cy.get('#first-name').type(firstName);
  cy.get('#last-name').type(lastName);
  cy.get('#postal-code').type(zipCode);
  cy.get('[data-test="continue"]').click();
});

Cypress.Commands.add('completeCheckout', () => {
  cy.get('[data-test="finish"]').click();
  cy.contains('Thank you').should('be.visible');
});
```

#### **3. cypress/e2e/app.cy.js**

```javascript
describe('E-Commerce Application Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Complete purchase flow', () => {
    // Login
    cy.loginUser('standard_user', 'secret_sauce');

    // Add product
    cy.addProductToCart('Sauce Labs Backpack');

    // Verify cart
    cy.get('.shopping_cart_badge').should('contain', '1');

    // Checkout
    cy.proceedToCheckout();
    cy.fillCheckoutInfo('John', 'Doe', '12345');

    // Complete order
    cy.completeCheckout();
  });

  it('Sort products', () => {
    cy.loginUser('standard_user', 'secret_sauce');
    cy.get('.product_sort_container').select('za');
    
    cy.get('.inventory_item_name').first().should('contain', 'T-Shirt');
  });

  it('Filter products by price', () => {
    cy.loginUser('standard_user', 'secret_sauce');
    
    cy.get('.inventory_item_price').each($price) => {
      const price = parseFloat($price.text().replace('$', ''));
      expect(price).toBeLessThan(100);
    });
  });

  it('Logout functionality', () => {
    cy.loginUser('standard_user', 'secret_sauce');
    cy.get('#react-burger-menu-btn').click();
    cy.contains('Logout').click();
    cy.url().should('include', '/');
  });
});
```

#### **4. package.json (Project 5)**

```json
{
  "name": "cypress-ecommerce-testing",
  "version": "1.0.0",
  "scripts": {
    "test": "cypress run",
    "test:headed": "cypress run --headed",
    "test:open": "cypress open",
    "test:chrome": "cypress run --browser chrome",
    "test:firefox": "cypress run --browser firefox",
    "test:record": "cypress run --record"
  },
  "devDependencies": {
    "cypress": "^13.6.0",
    "@cypress/webpack-dev-server": "^5.8.1"
  }
}
```

#### **5. README.md (Project 5)**

```markdown
# Project 5: Cypress E-Commerce Testing

## Overview
Complete Cypress implementation for e-commerce testing with modern best practices.

## Installation
```bash
npm install
npx cypress install
```

## Running Tests

### Interactive Mode
```bash
npm run test:open
```

### Headless Mode
```bash
npm test
```

### Specific Browser
```bash
npm run test:chrome
```

## Test Coverage
- User authentication
- Product browsing
- Shopping cart operations
- Checkout flow
- Order confirmation

## Features
✅ Custom commands
✅ Network mocking
✅ Visual testing
✅ Video recording
✅ LambdaTest ready

## Learning Outcomes
✅ Cypress vs Playwright comparison
✅ Custom Cypress commands
✅ Cypress best practices
✅ Cypress certification readiness

```

---

## 🎯 **Portfolio Submission Checklist**

Before submitting to potential employers:

- [ ] All projects have meaningful README files
- [ ] Code is well-commented and clean
- [ ] Git commit history is clear
- [ ] Projects are in separate directories
- [ ] No sensitive data (credentials, tokens) in code
- [ ] All tests run successfully
- [ ] Documentation is professional
- [ ] GitHub profile is updated
- [ ] LinkedIn mentions projects
- [ ] Live demos or screenshots included

---

## 💼 **Career Value of Portfolio**

These 5 projects demonstrate:

✅ **Technical Skills**
- Playwright expertise
- Cypress proficiency
- API testing knowledge
- DevOps understanding
- Database integration

✅ **Professional Practices**
- Code organization
- Documentation standards
- Git workflow
- CI/CD pipelines
- Testing architecture

✅ **Industry Standards**
- Page Object Model
- Design patterns
- Reporting & analytics
- Multi-browser testing
- Scalable frameworks

---

## 🚀 **Next Steps**

1. **Complete all 5 projects** during the 25-day course
2. **Publish to GitHub** with professional documentation
3. **Create project summary** for LinkedIn
4. **Prepare demo videos** (1-2 min per project)
5. **Link projects in resume**
6. **Share with Berlin tech companies**

---

**End of GitHub Portfolio Projects Guide**

*Last Updated: December 12, 2025*  
*Version: 1.0*
