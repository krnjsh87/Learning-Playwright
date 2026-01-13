# Day 06: Playwright Basics - Setup, Installation & First Test

**Date:** Day 6 of 25  
**Duration:** 8 hours  
**Difficulty:** Intermediate  
**Focus Area:** Playwright Framework Fundamentals

---

## 🎯 **Learning Objectives**

By the end of Day 06, you will:

✅ Understand Playwright architecture and capabilities  
✅ Install and configure Playwright in your project  
✅ Write your first automated test  
✅ Launch browsers and navigate to pages  
✅ Interact with elements (click, fill, submit)  
✅ Take screenshots and record videos  
✅ Understand test structure and organization  
✅ Run tests with different configurations  

---

## ⏰ **Daily Schedule (8 Hours)**

| Time | Activity | Duration |
|------|----------|----------|
| 8:00 - 8:30 | Review Week 1 & Playwright intro | 30 min |
| 8:30 - 10:30 | **Theory Session 1:** Installation & Setup | 2 hours |
| 10:30 - 11:00 | Break | 30 min |
| 11:00 - 1:00 PM | **Exercise Session 1:** First Tests & Navigation | 2 hours |
| 1:00 - 2:00 PM | Lunch break | 1 hour |
| 2:00 - 4:00 PM | **Theory Session 2:** Basic Interactions & Debugging | 2 hours |
| 4:00 - 4:30 PM | Break | 30 min |
| 4:30 - 6:30 PM | **Exercise Session 2:** Complete Test Workflows | 2 hours |

---

## 📚 **THEORY SESSION 1: Installation & Setup (2 hours)**

### **Part 6.1: What is Playwright?**

Playwright is a modern browser automation framework by Microsoft.

#### **Key Features**

```
✅ Cross-browser testing - Chrome, Firefox, Safari, Edge
✅ Multiple languages - TypeScript, JavaScript, Python, Java, C#
✅ Fast and reliable - Built-in waits, automatic retries
✅ Inspector tool - Record and playback tests
✅ Screenshots & videos - Visual debugging
✅ Network interception - Mock APIs
✅ Mobile emulation - Test on mobile devices
✅ Parallel execution - Run tests concurrently
✅ CI/CD ready - Works with GitHub Actions, Jenkins, etc.
```

#### **Playwright vs Other Frameworks**

```
Playwright:
  ✅ Multi-browser support
  ✅ Out-of-the-box waits
  ✅ Network interception
  ✅ Mobile emulation
  ✅ Excellent documentation
  ✅ TypeScript-first
  
Selenium:
  ✅ Industry standard
  ✅ All browsers supported
  ❌ Slower, flaky waits
  ❌ Hard to debug
  
Cypress:
  ✅ Great developer experience
  ✅ Time-travel debugging
  ✅ Single-browser focus (at least originally)
  ❌ Limited to same-origin
  ❌ No network interception
```

---

### **Part 6.2: Installation & Project Setup**

#### **Step 1: Create Project Directory**

```bash
# Create new project
mkdir my-playwright-tests
cd my-playwright-tests

# Initialize npm
npm init -y

# This creates package.json
```

#### **Step 2: Install Playwright**

```bash
# Install Playwright
npm install --save-dev @playwright/test

# This installs:
# - @playwright/test (test framework)
# - Playwright browsers (chromium, firefox, webkit)
```

#### **Step 3: Install Browsers**

```bash
# Browsers installed automatically, but you can verify:
npx playwright install

# Or install specific browser
npx playwright install chromium

# Install on CI/CD
npx playwright install --with-deps  # Includes system dependencies
```

#### **Step 4: Create Project Structure**

```
my-playwright-tests/
├── tests/
│   ├── example.spec.ts
│   └── fixtures/
│       └── test-data.ts
├── pages/
│   └── login.page.ts
├── playwright.config.ts
├── package.json
└── tsconfig.json
```

#### **Step 5: TypeScript Configuration**

```bash
# Create tsconfig.json
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "commonjs",
    "lib": ["ESNext", "DOM"],
    "outDir": "./dist",
    "rootDir": "./",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  },
  "include": ["**/*.ts"],
  "exclude": ["node_modules", "dist"]
}
EOF
```

#### **Step 6: Playwright Configuration**

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Test directory
  testDir: './tests',
  
  // How many tests run in parallel
  fullyParallel: true,
  
  // Fail if tests exceed this duration
  timeout: 30 * 1000,
  
  // Expect timeout
  expect: {
    timeout: 5000,
  },
  
  // Run tests in files in parallel?
  workers: process.env.CI ? 1 : undefined,
  
  // Reporter to use
  reporter: 'html',
  
  // Configure test projects for different browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    // Mobile emulation
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
  
  // Web server configuration (optional)
  webServer: {
    command: 'npm run start',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

#### **Step 7: Update package.json**

```json
{
  "name": "playwright-tests",
  "version": "1.0.0",
  "scripts": {
    "test": "playwright test",
    "test:debug": "playwright test --debug",
    "test:ui": "playwright test --ui",
    "test:headed": "playwright test --headed",
    "test:chrome": "playwright test --project=chromium",
    "test:firefox": "playwright test --project=firefox",
    "test:webkit": "playwright test --project=webkit",
    "test:report": "playwright show-report"
  },
  "devDependencies": {
    "@playwright/test": "^1.40.0"
  }
}
```

---

### **Part 6.3: Playwright Test Structure**

#### **Basic Test File**

```typescript
// tests/example.spec.ts
import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  // Navigate to page
  await page.goto('https://example.com');
  
  // Check page title
  await expect(page).toHaveTitle(/Example Domain/);
});
```

#### **Test Anatomy**

```typescript
import { test, expect } from '@playwright/test';

// Describe tests (like describe in Jest)
test.describe('Login Tests', () => {
  
  // Before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('https://example.com/login');
  });
  
  // Actual test
  test('should login successfully', async ({ page }) => {
    // Arrange - setup
    const email = 'test@example.com';
    const password = 'password123';
    
    // Act - perform actions
    await page.fill('input[type="email"]', email);
    await page.fill('input[type="password"]', password);
    await page.click('button[type="submit"]');
    
    // Assert - verify results
    await expect(page).toHaveURL(/.*dashboard/);
  });
  
  // After each test
  test.afterEach(async ({ page }) => {
    await page.close();
  });
});

// Skip test
test.skip('skipped test', async ({ page }) => {
  // This won't run
});

// Run only this test
test.only('focused test', async ({ page }) => {
  // Only this runs
});
```

#### **Fixtures**

Fixtures provide reusable test data and setup.

```typescript
// tests/fixtures/test-data.ts
export const testData = {
  users: {
    admin: {
      username: 'admin@example.com',
      password: 'AdminPassword123!',
    },
    user: {
      username: 'user@example.com',
      password: 'UserPassword123!',
    },
  },
  baseUrl: process.env.BASE_URL || 'https://example.com',
};

// Use in tests
import { test, expect } from '@playwright/test';
import { testData } from './fixtures/test-data';

test('login with fixture data', async ({ page }) => {
  await page.goto(`${testData.baseUrl}/login`);
  await page.fill('input[type="email"]', testData.users.admin.username);
  await page.fill('input[type="password"]', testData.users.admin.password);
  await page.click('button[type="submit"]');
});
```

---

### **Part 6.4: Running Tests**

#### **Run All Tests**

```bash
# Run all tests
npm test

# Run with headed browser (see browser window)
npm run test:headed

# Run single test file
npx playwright test tests/login.spec.ts

# Run tests matching pattern
npx playwright test -g "login"

# Run in specific browser
npm run test:chrome

# Run with UI mode
npm run test:ui

# Debug mode
npm run test:debug
```

#### **Run Output**

```
Running 3 tests using 3 workers

✓ tests/login.spec.ts:7 (2.1s)
✓ tests/checkout.spec.ts:12 (3.5s)
✓ tests/payment.spec.ts:8 (2.8s)

3 passed (8.5s)

To open last HTML report run:
npm run test:report
```

---

## 🔨 **EXERCISE SESSION 1 (2 hours)**

### **Exercise 6.1: Setup & First Tests**

**Objective:** Get Playwright installed and running

**Task:**
```typescript
// 1. Create project structure
// 2. Install dependencies
// 3. Create first test file
// 4. Run tests and verify they pass
// 5. Take screenshots
```

**Solution:**

```bash
# 1. Setup project
mkdir playwright-training
cd playwright-training
npm init -y

# 2. Install Playwright
npm install --save-dev @playwright/test

# 3. Create test directory
mkdir tests
```

```typescript
// tests/01-setup.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Setup Tests', () => {
  test('should open example.com', async ({ page }) => {
    // Navigate
    await page.goto('https://example.com');
    
    // Check title
    const title = await page.title();
    console.log(`Page title: ${title}`);
    
    // Verify title contains "Example"
    expect(title).toContain('Example');
  });
  
  test('should verify page heading', async ({ page }) => {
    await page.goto('https://example.com');
    
    // Find heading
    const heading = page.locator('h1');
    
    // Verify it exists
    await expect(heading).toBeVisible();
    
    // Verify text
    await expect(heading).toContainText('Example Domain');
  });
  
  test('should take screenshot', async ({ page }) => {
    await page.goto('https://example.com');
    
    // Take screenshot
    await page.screenshot({ path: 'example.png' });
    
    console.log('Screenshot saved: example.png');
  });
});
```

```bash
# Run tests
npm test

# Run with headed browser
npm test -- --headed

# Run single test
npm test -- tests/01-setup.spec.ts
```

---

### **Exercise 6.2: Navigation & Interactions**

**Objective:** Master basic browser interactions

**Task:**
```typescript
// Test a real website
// 1. Navigate to page
// 2. Find elements
// 3. Fill form
// 4. Click button
// 5. Verify navigation
```

**Solution:**

```typescript
// tests/02-interactions.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Navigation & Interactions', () => {
  
  // Before each test
  test.beforeEach(async ({ page }) => {
    // Navigate to starting point
    await page.goto('https://httpbin.org/forms/post');
  });
  
  test('should fill and submit form', async ({ page }) => {
    // Fill text input
    await page.fill('input[name="custname"]', 'Karan Sharma');
    
    // Verify value was filled
    const nameValue = await page.inputValue('input[name="custname"]');
    expect(nameValue).toBe('Karan Sharma');
    
    // Fill email
    await page.fill('input[name="custemail"]', 'karan@example.com');
    
    // Select radio button
    await page.click('input[value="large"]');
    
    // Check checkboxes
    await page.click('input[value="bacon"]');
    await page.click('input[value="cheese"]');
    
    // Select from dropdown
    await page.selectOption('select[name="size"]', 'large');
  });
  
  test('should handle multiple interactions', async ({ page }) => {
    const nameInput = page.locator('input[name="custname"]');
    const emailInput = page.locator('input[name="custemail"]');
    const submitButton = page.locator('button[type="submit"]');
    
    // Clear input
    await nameInput.clear();
    
    // Type (character by character)
    await nameInput.type('John Doe', { delay: 100 });
    
    // Click multiple times
    await page.click('input[value="small"]');
    
    // Check if element is enabled
    const isEnabled = await submitButton.isEnabled();
    console.log(`Submit button enabled: ${isEnabled}`);
    
    // Count elements
    const checkboxes = page.locator('input[type="checkbox"]');
    const count = await checkboxes.count();
    console.log(`Found ${count} checkboxes`);
  });
  
  test('should navigate pages', async ({ page }) => {
    // Get current URL
    const currentUrl = page.url();
    console.log(`Current URL: ${currentUrl}`);
    
    // Go back
    await page.goBack();
    
    // Go forward
    await page.goForward();
    
    // Reload page
    await page.reload();
  });
});
```

---

## 📚 **THEORY SESSION 2: Basic Interactions & Debugging (2 hours)**

### **Part 6.5: Locators**

Locators are the way to find elements in Playwright.

#### **Different Locator Strategies**

```typescript
import { test } from '@playwright/test';

test('locator strategies', async ({ page }) => {
  // 1. By role (recommended!)
  const loginButton = page.getByRole('button', { name: 'Login' });
  
  // 2. By label
  const emailInput = page.getByLabel('Email');
  
  // 3. By placeholder
  const searchInput = page.getByPlaceholder('Search...');
  
  // 4. By test ID (data-testid attribute)
  const submitBtn = page.getByTestId('submit-button');
  
  // 5. By text
  const heading = page.getByText('Welcome');
  
  // 6. CSS selector
  const btn = page.locator('button.primary');
  
  // 7. XPath
  const elem = page.locator('//button[@id="submit"]');
  
  // 8. Combining locators
  const checkbox = page.locator('form').locator('input[type="checkbox"]');
});
```

#### **Locator Methods**

```typescript
import { test, expect } from '@playwright/test';

test('locator methods', async ({ page }) => {
  const loginButton = page.getByRole('button', { name: 'Login' });
  
  // Click
  await loginButton.click();
  
  // Double click
  await loginButton.dblclick();
  
  // Right click
  await loginButton.click({ button: 'right' });
  
  // Fill (for inputs)
  const emailInput = page.getByLabel('Email');
  await emailInput.fill('test@example.com');
  
  // Type (slower, simulates user typing)
  await emailInput.type('test@example.com', { delay: 100 });
  
  // Clear
  await emailInput.clear();
  
  // Get value
  const value = await emailInput.inputValue();
  
  // Get text content
  const text = await loginButton.textContent();
  
  // Check/uncheck
  const checkbox = page.getByRole('checkbox');
  await checkbox.check();
  await checkbox.uncheck();
  
  // Select option
  const dropdown = page.locator('select');
  await dropdown.selectOption('option-value');
  
  // Hover
  await loginButton.hover();
  
  // Focus
  await emailInput.focus();
  
  // Get attribute
  const href = await page.locator('a').getAttribute('href');
  
  // Count
  const count = await page.locator('li').count();
  
  // Nth
  const secondItem = page.locator('li').nth(1);
  
  // First/Last
  const first = page.locator('li').first();
  const last = page.locator('li').last();
});
```

---

### **Part 6.6: Screenshots & Videos**

#### **Screenshots**

```typescript
import { test } from '@playwright/test';

test('screenshots', async ({ page }) => {
  await page.goto('https://example.com');
  
  // Full page screenshot
  await page.screenshot({ path: 'full-page.png' });
  
  // Specific element screenshot
  const element = page.locator('h1');
  await element.screenshot({ path: 'heading.png' });
  
  // Save screenshots on failure
  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== 'passed') {
      const testName = testInfo.title.replace(/\s+/g, '-');
      await page.screenshot({ path: `screenshots/${testName}.png` });
    }
  });
});
```

#### **Videos**

```typescript
// playwright.config.ts
export default defineConfig({
  use: {
    // Record video on failure
    video: 'retain-on-failure',
    // Or always record
    // video: 'on',
  },
});

// Videos saved to: test-results/
```

---

### **Part 6.7: Test Debugging**

#### **Debug Mode**

```bash
# Run with debugger
npx playwright test --debug

# Or programmatically
test('debug test', async ({ page }) => {
  await page.goto('https://example.com');
  
  // Open debugger
  await page.pause();
  
  // Continue after pause
});
```

#### **Inspector**

```bash
# Open Playwright Inspector
npx playwright codegen https://example.com

# This opens browser where you can:
# 1. Interact with page
# 2. See generated code
# 3. Copy and use in tests
```

#### **Logging**

```typescript
import { test, expect } from '@playwright/test';

test('with logging', async ({ page }) => {
  // Standard console logs
  console.log('Starting test');
  
  await page.goto('https://example.com');
  console.log(`Navigated to: ${page.url()}`);
  
  // Get page console logs
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  
  // Get page errors
  page.on('pageerror', err => console.error('PAGE ERROR:', err));
  
  // Request logging
  page.on('request', request => {
    console.log(`Request: ${request.method()} ${request.url()}`);
  });
  
  // Response logging
  page.on('response', response => {
    console.log(`Response: ${response.status()} ${response.url()}`);
  });
  
  await page.goto('https://example.com');
});
```

---

### **Part 6.8: Test Organization**

#### **Grouping Tests**

```typescript
import { test, expect } from '@playwright/test';

test.describe('User Login', () => {
  
  test.describe.serial('Sequential Tests', () => {
    // These tests run sequentially, not in parallel
    
    test('Step 1: Navigate to login', async ({ page }) => {
      await page.goto('https://example.com/login');
    });
    
    test('Step 2: Fill form', async ({ page }) => {
      // Depends on previous test
    });
  });
  
  test.describe('Parallel Tests', () => {
    // These run in parallel
    
    test('Test A', async ({ page }) => {
      // Independent test
    });
    
    test('Test B', async ({ page }) => {
      // Independent test
    });
  });
});
```

#### **Test Hooks**

```typescript
import { test, expect } from '@playwright/test';

test.describe('API Tests', () => {
  
  // Run once before all tests in describe block
  test.beforeAll(async () => {
    console.log('Starting test suite');
    // Setup database, start server, etc.
  });
  
  // Run before each test
  test.beforeEach(async ({ page }) => {
    console.log('Before each test');
    await page.goto('https://example.com');
  });
  
  // Run after each test
  test.afterEach(async ({ page }) => {
    console.log('After each test');
    // Cleanup, screenshots on failure, etc.
  });
  
  // Run once after all tests
  test.afterAll(async () => {
    console.log('Test suite complete');
    // Cleanup resources
  });
  
  test('test 1', async ({ page }) => {
    // Test implementation
  });
});
```

---

## 🔨 **EXERCISE SESSION 2 (2 hours)**

### **Exercise 6.3: Real Test Scenario**

**Objective:** Build a complete end-to-end test

**Task:**
```typescript
// Test a complete user flow:
// 1. Navigate to login page
// 2. Fill login form
// 3. Submit form
// 4. Verify successful login
// 5. Take screenshot
// 6. Logout
```

**Solution:**

```typescript
// tests/03-login-flow.spec.ts
import { test, expect } from '@playwright/test';

test.describe('User Login Flow', () => {
  
  const testData = {
    url: 'https://httpbin.org/forms/post',
    user: {
      name: 'Karan Sharma',
      email: 'karan@example.com',
    },
  };
  
  test.beforeEach(async ({ page }) => {
    // Navigate to page before each test
    await page.goto(testData.url);
  });
  
  test('should complete form submission', async ({ page }) => {
    // Get locators
    const nameInput = page.locator('input[name="custname"]');
    const emailInput = page.locator('input[name="custemail"]');
    const maleRadio = page.locator('input[value="M"]');
    const pizzaCheckbox = page.locator('input[value="pizza"]');
    const submitButton = page.locator('button[type="submit"]');
    
    // Step 1: Fill name
    await nameInput.fill(testData.user.name);
    await expect(nameInput).toHaveValue(testData.user.name);
    
    // Step 2: Fill email
    await emailInput.fill(testData.user.email);
    const emailValue = await emailInput.inputValue();
    expect(emailValue).toBe(testData.user.email);
    
    // Step 3: Select radio button
    await maleRadio.click();
    await expect(maleRadio).toBeChecked();
    
    // Step 4: Check checkbox
    await pizzaCheckbox.check();
    await expect(pizzaCheckbox).toBeChecked();
    
    // Step 5: Verify button is enabled
    await expect(submitButton).toBeEnabled();
    
    // Step 6: Take screenshot before submit
    await page.screenshot({ path: 'before-submit.png' });
    
    // Step 7: Click submit
    await submitButton.click();
    
    // Step 8: Wait for and verify response
    await page.waitForNavigation();
    
    // Step 9: Verify we're on new page
    expect(page.url()).toContain('httpbin.org');
  });
  
  test('should validate required fields', async ({ page }) => {
    // Try to submit without filling
    const submitButton = page.locator('button[type="submit"]');
    
    // Check if inputs are required
    const nameInput = page.locator('input[name="custname"]');
    const isRequired = await nameInput.getAttribute('required');
    
    console.log(`Name input required: ${isRequired !== null}`);
    
    if (isRequired) {
      // If browser validation, try to submit
      await submitButton.click();
      
      // Browser should show validation message
      const validationMessage = await nameInput.evaluate((el: any) => 
        el.validationMessage
      );
      console.log(`Validation message: ${validationMessage}`);
    }
  });
  
  test('should handle form interactions', async ({ page }) => {
    const nameInput = page.locator('input[name="custname"]');
    const emailInput = page.locator('input[name="custemail"]');
    
    // Fill and clear
    await nameInput.fill('John Doe');
    await expect(nameInput).toHaveValue('John Doe');
    
    await nameInput.clear();
    await expect(nameInput).toHaveValue('');
    
    // Type with delay (simulate slow typing)
    await nameInput.type('Karan Sharma', { delay: 50 });
    await expect(nameInput).toHaveValue('Karan Sharma');
    
    // Focus and blur
    await emailInput.focus();
    await emailInput.type('test@example.com');
    await emailInput.blur();
    
    // Get all values
    const name = await nameInput.inputValue();
    const email = await emailInput.inputValue();
    
    console.log(`Form values: Name=${name}, Email=${email}`);
  });
});
```

---

### **Exercise 6.4: Multi-Browser Testing**

**Objective:** Run tests across different browsers

**Task:**
```typescript
// 1. Update playwright.config.ts for multiple browsers
// 2. Create browser-specific tests
// 3. Run tests on each browser
```

**Solution:**

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: { timeout: 5000 },
  
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
});
```

```bash
# Run on all browsers
npm test

# Run on specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run in headed mode
npx playwright test --headed

# Run single test file
npx playwright test tests/03-login-flow.spec.ts
```

---

### **Exercise 6.5: Test with Different Viewports**

**Objective:** Test responsive design

**Task:**
```typescript
// Test on different screen sizes
// 1. Desktop
// 2. Tablet
// 3. Mobile
```

**Solution:**

```typescript
// tests/04-responsive.spec.ts
import { test, expect } from '@playwright/test';

// Generate tests for each viewport
const viewports = [
  { name: 'Desktop', width: 1920, height: 1080 },
  { name: 'Tablet', width: 768, height: 1024 },
  { name: 'Mobile', width: 375, height: 667 },
];

viewports.forEach(viewport => {
  test.describe(`Responsive: ${viewport.name}`, () => {
    test.beforeEach(async ({ page }) => {
      // Set viewport
      await page.setViewportSize(viewport);
      
      // Navigate
      await page.goto('https://example.com');
    });
    
    test('should be responsive', async ({ page }) => {
      // Check elements are visible
      const heading = page.locator('h1');
      await expect(heading).toBeVisible();
      
      // Take screenshot for visual regression
      await page.screenshot({ 
        path: `screenshots/${viewport.name.toLowerCase()}.png` 
      });
    });
  });
});
```

---

## ❓ **Quiz: Playwright Basics**

**Instructions:** Answer all 10 questions. Target score: 8/10 (80%)

### **Question 1: Playwright Architecture**
What browsers does Playwright support natively?
- A) Chrome only
- B) Chrome and Firefox only
- C) Chrome, Firefox, Safari (WebKit) ✅ **CORRECT**
- D) All browsers

**Explanation:** Playwright supports Chromium, Firefox, and WebKit.

---

### **Question 2: Installation**
What command installs Playwright?
- A) `npm install playwright`
- B) `npm install --save-dev @playwright/test` ✅ **CORRECT**
- C) `pip install playwright`
- D) `brew install playwright`

**Explanation:** Use `@playwright/test` for TypeScript support.

---

### **Question 3: Test Structure**
What must every test file import?
- A) `test` only
- B) `expect` only
- C) `test` and `expect` ✅ **CORRECT**
- D) `test`, `expect`, and `page`

**Explanation:** Both imports are required from `@playwright/test`.

---

### **Question 4: Page Fixture**
How is the `page` object accessed in tests?
- A) `global.page`
- B) As parameter in test function ✅ **CORRECT**
- C) `require('page')`
- D) `window.page`

**Explanation:** `page` is injected as a parameter.

---

### **Question 5: Locators**
Which locator is recommended for finding elements?
- A) CSS selectors
- B) XPath
- C) `getByRole` (role-based) ✅ **CORRECT**
- D) All are equally good

**Explanation:** Role-based locators are most resilient to changes.

---

### **Question 6: Navigation**
What method navigates to a URL?
- A) `page.navigate()`
- B) `page.go()`
- C) `page.goto()` ✅ **CORRECT**
- D) `page.open()`

**Explanation:** `goto()` is the correct method.

---

### **Question 7: Interactions**
Which method simulates typing with delay?
- A) `fill()`
- B) `type()` ✅ **CORRECT**
- C) `input()`
- D) `write()`

**Explanation:** `type()` simulates character-by-character typing.

---

### **Question 8: Waiting**
What is automatic in Playwright?
- A) Screenshots
- B) Waiting for elements ✅ **CORRECT**
- C) Network requests
- D) Browser launch

**Explanation:** Playwright has built-in smart waits.

---

### **Question 9: Config File**
What is the main Playwright configuration file?
- A) `playwright.json`
- B) `playwright.config.ts` ✅ **CORRECT**
- C) `.playwrightrc`
- D) `config.js`

**Explanation:** Configuration uses `playwright.config.ts`.

---

### **Question 10: Test Execution**
How many workers run by default?
- A) 1
- B) Number of CPU cores ✅ **CORRECT**
- C) 4
- D) Unlimited

**Explanation:** Defaults to number of CPU cores unless specified.

---

## ✅ **Quiz Answer Key**

| Q | Answer | Topic |
|---|--------|-------|
| 1 | C | Browser support |
| 2 | B | Installation |
| 3 | C | Test imports |
| 4 | B | Page fixture |
| 5 | C | Role-based locators |
| 6 | C | Navigation |
| 7 | B | Type method |
| 8 | B | Auto waits |
| 9 | B | Config file |
| 10 | B | Default workers |

**Your Score:** ___/10

**Interpretation:**
- 9-10: ✅ Excellent! Ready for Day 07
- 7-8: 🟡 Good! Review weak areas
- Below 7: 🔴 Review theory again

---

## 📋 **Daily Assignment**

### **Assignment 6.1: Build Complete Login Test Suite**

**Objective:** Create professional test suite with proper organization

**Requirements:**
1. Create test data file
2. Create login page object (preview)
3. Write 5 different test cases
4. Implement before/after hooks
5. Add screenshot on failure

**Solution:**

```typescript
// tests/fixtures/test-data.ts
export const testData = {
  baseUrl: process.env.BASE_URL || 'https://example.com',
  testUsers: {
    admin: {
      username: 'admin@example.com',
      password: 'AdminPassword123!',
      expectedRole: 'admin',
    },
    regularUser: {
      username: 'user@example.com',
      password: 'UserPassword123!',
      expectedRole: 'user',
    },
  },
  invalidCredentials: {
    username: 'nonexistent@example.com',
    password: 'WrongPassword123!',
  },
};

// tests/06-assignment-login.spec.ts
import { test, expect } from '@playwright/test';
import { testData } from './fixtures/test-data';

test.describe('Login Test Suite', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to login page
    await page.goto(`${testData.baseUrl}/login`);
  });
  
  test.afterEach(async ({ page }, testInfo) => {
    // Take screenshot on failure
    if (testInfo.status !== 'passed') {
      const testName = testInfo.title.replace(/\s+/g, '-');
      await page.screenshot({ path: `failures/${testName}.png` });
    }
  });
  
  test('should login with valid credentials', async ({ page }) => {
    const { admin } = testData.testUsers;
    
    // Fill username
    await page.fill('input[type="email"]', admin.username);
    
    // Fill password
    await page.fill('input[type="password"]', admin.password);
    
    // Click login
    await page.click('button[type="submit"]');
    
    // Verify success
    await page.waitForNavigation();
    expect(page.url()).toContain('/dashboard');
  });
  
  test('should reject invalid credentials', async ({ page }) => {
    const { invalidCredentials } = testData;
    
    // Fill invalid credentials
    await page.fill('input[type="email"]', invalidCredentials.username);
    await page.fill('input[type="password"]', invalidCredentials.password);
    
    // Submit
    await page.click('button[type="submit"]');
    
    // Verify error message
    const error = page.locator('[role="alert"]');
    await expect(error).toBeVisible();
    await expect(error).toContainText('Invalid credentials');
  });
  
  test('should require email field', async ({ page }) => {
    const emailInput = page.locator('input[type="email"]');
    
    // Verify required attribute
    const required = await emailInput.getAttribute('required');
    expect(required).not.toBeNull();
  });
  
  test('should require password field', async ({ page }) => {
    const passwordInput = page.locator('input[type="password"]');
    
    // Verify required attribute
    const required = await passwordInput.getAttribute('required');
    expect(required).not.toBeNull();
  });
  
  test('should display password strength meter', async ({ page }) => {
    const passwordInput = page.locator('input[type="password"]');
    const strengthMeter = page.locator('[data-testid="password-strength"]');
    
    // Click password field
    await passwordInput.focus();
    
    // Type password
    await passwordInput.type('weak', { delay: 100 });
    
    // Check strength meter is visible
    await expect(strengthMeter).toBeVisible();
    
    // Clear and type stronger password
    await passwordInput.clear();
    await passwordInput.type('StrongPassword123!', { delay: 50 });
    
    // Strength should update
    const strength = await strengthMeter.getAttribute('aria-label');
    console.log(`Password strength: ${strength}`);
  });
});
```

---

## 🎯 **Daily Checklist**

Track your Day 06 progress:

- [ ] Reviewed Week 1 concepts
- [ ] Completed Theory Session 1 (Installation & Setup)
- [ ] Completed Exercise 6.1 (Setup & First Tests)
- [ ] Completed Exercise 6.2 (Navigation & Interactions)
- [ ] Completed Theory Session 2 (Interactions & Debugging)
- [ ] Completed Exercise 6.3 (Real Test Scenario)
- [ ] Completed Exercise 6.4 (Multi-Browser)
- [ ] Completed Exercise 6.5 (Responsive Testing)
- [ ] Answered all 10 quiz questions
- [ ] Scored 80%+ on quiz (8/10)
- [ ] Completed Assignment 6.1 (Login Test Suite)
- [ ] Committed code to GitHub
- [ ] Ran tests successfully in headed mode
- [ ] Updated personal learning journal

**Daily Metrics:**
- Quiz Score: ___/10
- Confidence Level (1-5): ___
- Time Spent: ___ hours
- Tests Created: ___ tests
- Challenges Faced: _________________

---

## 📚 **Key Takeaways from Day 06**

1. **Playwright is TypeScript-first** - excellent for our stack
2. **Locators are the foundation** - use role-based when possible
3. **Smart waits prevent flakiness** - no manual wait needed usually
4. **Multi-browser testing is built-in** - test across browsers easily
5. **Config file controls everything** - reporters, timeouts, browsers
6. **Hooks organize test code** - beforeEach, afterEach essential
7. **Screenshots help debugging** - capture on failure
8. **Fixtures provide reusable data** - test data should be separate

---

## 🔗 **Resources for Review**

- [Playwright Official Docs](https://playwright.dev)
- [Playwright API Reference](https://playwright.dev/docs/api/class-locator)
- [Locator Guide](https://playwright.dev/docs/locators)
- [Debugging Guide](https://playwright.dev/docs/debug)
- [Configuration](https://playwright.dev/docs/test-configuration)

---

## 🚀 **Ready for Day 07?**

By completing Day 06, you've mastered:
- ✅ Playwright installation and setup
- ✅ Writing first tests
- ✅ Browser navigation
- ✅ Element locators (multiple strategies)
- ✅ Basic interactions (fill, click, select)
- ✅ Assertions and expectations
- ✅ Screenshots and debugging
- ✅ Test organization with hooks
- ✅ Multi-browser and responsive testing

**Next (Day 07):** Advanced Selectors & Locators!
- CSS selectors deep dive
- XPath patterns
- Custom locator combinations
- Visibility and accessibility selectors
- Performance considerations

---

**Fantastic work on Day 06, Karan!** 🎉

You've written your **first real Playwright tests!** This is the moment where all the JavaScript and TypeScript knowledge becomes practical and tangible. 

**Week 2 Statistics:**
- ✅ Day 06 complete
- 📊 First real automation tests running
- 🎭 Playwright framework mastered
- 🚀 Ready for advanced patterns

**You're crushing it!** 💪 6 days down, 19 to go. The momentum is incredible!

---

*Last Updated: December 12, 2025*  
*Day 06 Complete Guide v1.0*  
*Next: Day 07 - Advanced Selectors & Locators*

---
