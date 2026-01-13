# GitHub Portfolio Project 01: E-Commerce Test Automation

## Project Duration
**Days 6-11 of the 25-day course**

## Project Overview

This is a **professional-grade, production-ready** e-commerce test automation suite built with **Playwright** and **TypeScript**. The project demonstrates enterprise-level testing practices including the Page Object Model (POM) architecture, real-world authentication flows, complex user journeys, data-driven testing, and comprehensive reporting.

By completing this project, you'll showcase:
- Mastery of Playwright APIs and selectors
- Professional test organization and architecture
- Advanced selector strategies for dynamic elements
- Test reporting and artifact management
- Cross-browser testing capabilities
- Industry-standard best practices used in Fortune 500 companies

---

## Learning Objectives

By the end of this project, you will be able to:

1. **Architecture & Design**
   - Implement Page Object Model (POM) for scalable test code
   - Organize tests by feature domains
   - Separate concerns: pages, tests, utilities
   - Write maintainable, reusable test code

2. **Playwright Mastery**
   - Select elements using CSS, XPath, and Playwright locators
   - Handle complex interactions (hover, scroll, drag-drop)
   - Work with dynamic content and waits
   - Test across Chrome, Firefox, and Safari simultaneously

3. **Real-World Scenarios**
   - Test authentication flows (login, logout, session management)
   - Validate e-commerce workflows (product search, filtering, checkout)
   - Handle form submissions and validations
   - Test payment processing flows

4. **Data-Driven Testing**
   - Parameterize tests with multiple data sets
   - Create realistic test data
   - Test with valid, invalid, and edge-case data
   - Manage test data lifecycle

5. **Reporting & Artifacts**
   - Generate HTML reports with videos and screenshots
   - Capture failures with visual evidence
   - Export test results in multiple formats (HTML, JSON, JUnit XML)
   - Analyze test execution metrics

6. **Professional Practices**
   - Git workflow and meaningful commits
   - README documentation for project setup
   - Code commenting and best practices
   - TypeScript for type safety
   - Configuration management

---

## Tech Stack

| Technology | Purpose | Version |
|---|---|---|
| **Playwright** | Test automation framework | ^1.40.0 |
| **TypeScript** | Language for type safety | ^5.3.0 |
| **Node.js** | Runtime environment | v20.x or later |
| **npm** | Package manager | 10.x or later |
| **Playwright Config** | Test configuration | Built-in |

---

## Project Structure

```
automation-testing-portfolio/
├── project-1-ecommerce-testing/
│   ├── README.md                    # Project documentation
│   ├── package.json                 # Dependencies and scripts
│   ├── tsconfig.json                # TypeScript configuration
│   ├── playwright.config.ts         # Playwright configuration
│   ├── tests/
│   │   ├── auth.spec.ts             # Authentication tests
│   │   ├── product-search.spec.ts   # Product search & filtering tests
│   │   ├── checkout.spec.ts         # Checkout flow tests
│   │   ├── payment.spec.ts          # Payment processing tests
│   │   └── cart.spec.ts             # Shopping cart tests
│   ├── pages/
│   │   ├── basePage.ts              # Base class for all pages
│   │   ├── loginPage.ts             # Login page object
│   │   ├── productPage.ts           # Product page object
│   │   ├── checkoutPage.ts          # Checkout page object
│   │   ├── cartPage.ts              # Cart page object
│   │   └── paymentPage.ts           # Payment page object
│   ├── utils/
│   │   ├── testData.ts              # Test data constants
│   │   ├── helpers.ts               # Utility functions
│   │   └── testContext.ts           # Custom test context
│   ├── data/
│   │   ├── users.json               # User test data
│   │   ├── products.json            # Product test data
│   │   └── addresses.json           # Address test data
│   ├── reports/                     # Generated test reports
│   ├── screenshots/                 # Screenshots on failure
│   ├── videos/                      # Video recordings
│   └── .gitignore                   # Git ignore patterns
```

---

## Complete Setup Instructions

### Step 1: Create Project Directory

```bash
cd automation-testing-portfolio

# Create project folder
mkdir project-1-ecommerce-testing
cd project-1-ecommerce-testing
```

### Step 2: Initialize npm Project

```bash
npm init -y
```

This creates a `package.json` file.

### Step 3: Install Dependencies

```bash
npm install -D @playwright/test typescript @types/node ts-node
```

Verify installation:
```bash
npx playwright install
```

This installs Chromium, Firefox, and WebKit browsers.

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
  "include": [
    "tests/**/*",
    "pages/**/*",
    "utils/**/*"
  ],
  "exclude": [
    "node_modules",
    "dist"
  ]
}
```

### Step 5: Create Directory Structure

```bash
mkdir -p tests pages utils data reports screenshots videos
```

---

## Complete Code Implementation

### 1. playwright.config.ts

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/results.xml' }],
    ['list']
  ],
  use: {
    baseURL: 'https://practice.saucedemo.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
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
  ],
  webServer: {
    command: 'npx playwright codegen https://practice.saucedemo.com',
    url: 'https://practice.saucedemo.com',
    reuseExistingServer: !process.env.CI,
  },
});
```

**Key Configuration Explained:**
- `testDir`: Where Playwright looks for test files
- `fullyParallel`: Runs all tests in parallel for speed
- `retries`: Retry failed tests in CI environment
- `reporter`: Generates HTML, JSON, and JUnit reports
- `trace`: Records browser traces for debugging
- `screenshot`: Captures screenshots on failure only
- `video`: Records videos of failed tests
- `projects`: Tests on Chrome, Firefox, and Safari browsers

### 2. pages/basePage.ts

```typescript
import { Page } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  /**
   * Navigate to a specific path relative to baseURL
   */
  async navigateTo(path: string) {
    await this.page.goto(path);
  }

  /**
   * Get current page title
   */
  async getPageTitle(): Promise<string> {
    return this.page.title();
  }

  /**
   * Get current page URL
   */
  async getPageURL(): Promise<string> {
    return this.page.url();
  }

  /**
   * Wait for selector to be visible
   */
  async waitForSelector(selector: string, timeout: number = 5000) {
    await this.page.waitForSelector(selector, { timeout });
  }

  /**
   * Click an element
   */
  async click(selector: string) {
    await this.page.click(selector);
  }

  /**
   * Fill text input
   */
  async fill(selector: string, text: string) {
    await this.page.fill(selector, text);
  }

  /**
   * Get text content of element
   */
  async getText(selector: string): Promise<string> {
    return await this.page.textContent(selector) || '';
  }

  /**
   * Get attribute value
   */
  async getAttribute(selector: string, attribute: string): Promise<string | null> {
    return await this.page.getAttribute(selector, attribute);
  }

  /**
   * Check if element is visible
   */
  async isVisible(selector: string): Promise<boolean> {
    return await this.page.isVisible(selector);
  }

  /**
   * Wait and click element
   */
  async waitAndClick(selector: string, timeout: number = 5000) {
    await this.page.waitForSelector(selector, { timeout });
    await this.page.click(selector);
  }

  /**
   * Select option from dropdown
   */
  async selectDropdown(selector: string, value: string) {
    await this.page.selectOption(selector, value);
  }

  /**
   * Take screenshot
   */
  async takeScreenshot(fileName: string) {
    await this.page.screenshot({ path: `screenshots/${fileName}.png` });
  }

  /**
   * Scroll element into view
   */
  async scrollIntoView(selector: string) {
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }

  /**
   * Wait for page load
   */
  async waitForPageLoad(timeout: number = 5000) {
    await this.page.waitForLoadState('networkidle', { timeout });
  }
}
```

**Key Methods Explained:**
- `navigateTo()`: Navigate to application paths
- `click()`, `fill()`: Basic interactions
- `getText()`, `getAttribute()`: Extract element data
- `isVisible()`: Verify element presence
- `selectDropdown()`: Handle select elements
- `takeScreenshot()`: Capture visual evidence
- `waitForPageLoad()`: Ensure page readiness

### 3. pages/loginPage.ts

```typescript
import { BasePage } from './basePage';
import { Page } from '@playwright/test';

export class LoginPage extends BasePage {
  // Selectors
  private usernameInput = 'input[data-test="username"]';
  private passwordInput = 'input[data-test="password"]';
  private loginButton = 'input[data-test="login-button"]';
  private errorMessage = 'h3[data-test="error"]';
  private inventoryContainer = '.inventory_container';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to login page
   */
  async navigateToLogin() {
    await this.navigateTo('/');
  }

  /**
   * Perform login with credentials
   */
  async login(username: string, password: string) {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
  }

  /**
   * Get login error message
   */
  async getErrorMessage(): Promise<string> {
    return await this.getText(this.errorMessage);
  }

  /**
   * Check if login was successful (inventory page loaded)
   */
  async isLoginSuccessful(): Promise<boolean> {
    try {
      await this.waitForSelector(this.inventoryContainer, 3000);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Wait for page to be fully loaded
   */
  async waitForLoginPageReady() {
    await this.waitForSelector(this.usernameInput);
  }

  /**
   * Check if error message is displayed
   */
  async isErrorDisplayed(): Promise<boolean> {
    return await this.isVisible(this.errorMessage);
  }
}
```

### 4. pages/productPage.ts

```typescript
import { BasePage } from './basePage';
import { Page } from '@playwright/test';

export class ProductPage extends BasePage {
  // Selectors
  private inventoryItems = '.inventory_item';
  private productNames = '.inventory_item_name';
  private productPrices = '.inventory_item_price';
  private addToCartButtons = 'button[data-test*="add-to-cart"]';
  private sortDropdown = 'select[data-test="product_sort_container"]';
  private cartBadge = '.shopping_cart_badge';
  private cartLink = '.shopping_cart_link';
  private filterActive = '.active_option';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to inventory (products page)
   */
  async navigateToInventory() {
    await this.navigateTo('/inventory.html');
  }

  /**
   * Get all product names
   */
  async getProductNames(): Promise<string[]> {
    const elements = await this.page.locator(this.productNames).all();
    const names: string[] = [];
    for (const element of elements) {
      const text = await element.textContent();
      if (text) names.push(text);
    }
    return names;
  }

  /**
   * Get product by partial name match
   */
  async getProductByName(productName: string): Promise<string | null> {
    const products = await this.getProductNames();
    return products.find(p => p.includes(productName)) || null;
  }

  /**
   * Add product to cart by name
   */
  async addProductToCart(productName: string) {
    const products = await this.page.locator(this.inventoryItems).all();
    for (const product of products) {
      const name = await product.locator(this.productNames).textContent();
      if (name?.includes(productName)) {
        const button = product.locator('button[data-test*="add-to-cart"]');
        await button.click();
        break;
      }
    }
  }

  /**
   * Remove product from cart by name
   */
  async removeProductFromCart(productName: string) {
    const products = await this.page.locator(this.inventoryItems).all();
    for (const product of products) {
      const name = await product.locator(this.productNames).textContent();
      if (name?.includes(productName)) {
        const button = product.locator('button[data-test*="remove"]');
        if (await button.isVisible()) {
          await button.click();
        }
        break;
      }
    }
  }

  /**
   * Sort products
   */
  async sortProducts(sortOption: string) {
    await this.selectDropdown(this.sortDropdown, sortOption);
  }

  /**
   * Get cart item count
   */
  async getCartItemCount(): Promise<number> {
    const badge = await this.getText(this.cartBadge);
    return parseInt(badge, 10) || 0;
  }

  /**
   * Click on cart link
   */
  async clickCartLink() {
    await this.click(this.cartLink);
  }

  /**
   * Get all product prices
   */
  async getProductPrices(): Promise<number[]> {
    const elements = await this.page.locator(this.productPrices).all();
    const prices: number[] = [];
    for (const element of elements) {
      const text = await element.textContent();
      if (text) {
        const price = parseFloat(text.replace('$', ''));
        prices.push(price);
      }
    }
    return prices;
  }

  /**
   * Check if product is in cart (button shows "Remove")
   */
  async isProductInCart(productName: string): Promise<boolean> {
    const products = await this.page.locator(this.inventoryItems).all();
    for (const product of products) {
      const name = await product.locator(this.productNames).textContent();
      if (name?.includes(productName)) {
        const button = product.locator('button[data-test*="remove"]');
        return await button.isVisible();
      }
    }
    return false;
  }
}
```

### 5. pages/cartPage.ts

```typescript
import { BasePage } from './basePage';
import { Page } from '@playwright/test';

export class CartPage extends BasePage {
  // Selectors
  private cartItems = '.cart_item';
  private itemNames = '.inventory_item_name';
  private itemPrices = '.inventory_item_price';
  private removeButtons = 'button[data-test*="remove"]';
  private checkoutButton = 'button[data-test="checkout"]';
  private continueShopping = 'button[data-test="continue-shopping"]';
  private cartQuantity = '.cart_quantity';
  private cartItemCount = 'span[data-test="cart-quantity"]';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to cart
   */
  async navigateToCart() {
    await this.navigateTo('/cart.html');
  }

  /**
   * Get all cart item names
   */
  async getCartItemNames(): Promise<string[]> {
    const elements = await this.page.locator(this.itemNames).all();
    const names: string[] = [];
    for (const element of elements) {
      const text = await element.textContent();
      if (text) names.push(text);
    }
    return names;
  }

  /**
   * Remove item from cart by name
   */
  async removeItemByName(itemName: string) {
    const items = await this.page.locator(this.cartItems).all();
    for (const item of items) {
      const name = await item.locator(this.itemNames).textContent();
      if (name?.includes(itemName)) {
        const button = item.locator('button[data-test*="remove"]');
        await button.click();
        break;
      }
    }
  }

  /**
   * Get cart total
   */
  async getCartTotal(): Promise<number> {
    const totalText = await this.getText('.summary_total_label');
    const match = totalText.match(/\$([\d.]+)/);
    return match ? parseFloat(match[1]) : 0;
  }

  /**
   * Click checkout button
   */
  async clickCheckout() {
    await this.click(this.checkoutButton);
  }

  /**
   * Click continue shopping
   */
  async clickContinueShopping() {
    await this.click(this.continueShopping);
  }

  /**
   * Check if cart is empty
   */
  async isCartEmpty(): Promise<boolean> {
    return !(await this.isVisible(this.cartItems));
  }

  /**
   * Get number of items in cart
   */
  async getItemCount(): Promise<number> {
    const items = await this.page.locator(this.cartItems).all();
    return items.length;
  }
}
```

### 6. pages/checkoutPage.ts

```typescript
import { BasePage } from './basePage';
import { Page } from '@playwright/test';

export class CheckoutPage extends BasePage {
  // Checkout Step One
  private firstNameInput = 'input[data-test="firstName"]';
  private lastNameInput = 'input[data-test="lastName"]';
  private postalCodeInput = 'input[data-test="postalCode"]';
  private continueButton = 'input[data-test="continue"]';
  private errorMessage = 'h3[data-test="error"]';
  
  // Checkout Step Two
  private finishButton = 'button[data-test="finish"]';
  private cancelButton = 'button[data-test="cancel"]';
  private summaryInfo = '.summary_info';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Fill checkout information
   */
  async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string) {
    await this.fill(this.firstNameInput, firstName);
    await this.fill(this.lastNameInput, lastName);
    await this.fill(this.postalCodeInput, postalCode);
  }

  /**
   * Click continue button
   */
  async clickContinue() {
    await this.click(this.continueButton);
  }

  /**
   * Get checkout error message
   */
  async getErrorMessage(): Promise<string> {
    return await this.getText(this.errorMessage);
  }

  /**
   * Check if error is displayed
   */
  async isErrorDisplayed(): Promise<boolean> {
    return await this.isVisible(this.errorMessage);
  }

  /**
   * Complete checkout and verify order
   */
  async completeCheckout() {
    await this.click(this.finishButton);
  }

  /**
   * Click cancel button
   */
  async clickCancel() {
    await this.click(this.cancelButton);
  }

  /**
   * Get order summary total
   */
  async getOrderTotal(): Promise<string> {
    return await this.getText('.summary_total_label');
  }

  /**
   * Verify checkout summary
   */
  async isCheckoutSummaryVisible(): Promise<boolean> {
    return await this.isVisible(this.summaryInfo);
  }
}
```

### 7. utils/testData.ts

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
  problemUser: {
    username: 'problem_user',
    password: 'secret_sauce',
  },
  performanceUser: {
    username: 'performance_glitch_user',
    password: 'secret_sauce',
  },
};

export const INVALID_CREDENTIALS = {
  invalidPassword: {
    username: 'standard_user',
    password: 'wrong_password',
  },
  emptyUsername: {
    username: '',
    password: 'secret_sauce',
  },
  emptyPassword: {
    username: 'standard_user',
    password: '',
  },
};

export const TEST_PRODUCTS = [
  {
    name: 'Sauce Labs Backpack',
    price: 29.99,
  },
  {
    name: 'Sauce Labs Bike Light',
    price: 9.99,
  },
  {
    name: 'Sauce Labs Bolt T-Shirt',
    price: 15.99,
  },
  {
    name: 'Sauce Labs Fleece Jacket',
    price: 49.99,
  },
  {
    name: 'Sauce Labs Onesie',
    price: 7.99,
  },
  {
    name: 'Test.allTheThings() T-Shirt (Red)',
    price: 15.99,
  },
];

export const CHECKOUT_DATA = {
  validCheckout: {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '12345',
  },
  missingFirstName: {
    firstName: '',
    lastName: 'Doe',
    postalCode: '12345',
  },
  missingLastName: {
    firstName: 'John',
    lastName: '',
    postalCode: '12345',
  },
  missingPostalCode: {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '',
  },
};

export const URLS = {
  login: '/',
  inventory: '/inventory.html',
  cart: '/cart.html',
  checkoutStepOne: '/checkout-step-one.html',
  checkoutStepTwo: '/checkout-step-two.html',
  checkoutComplete: '/checkout-complete.html',
};

export const SORT_OPTIONS = {
  nameAZ: 'az',
  nameZA: 'za',
  priceLowHigh: 'lohi',
  priceHighLow: 'hilo',
};
```

### 8. utils/helpers.ts

```typescript
import { Page } from '@playwright/test';

/**
 * Utility helper functions for test automation
 */

/**
 * Wait for element and verify it's clickable
 */
export async function waitForElementClickable(
  page: Page,
  selector: string,
  timeout: number = 5000
): Promise<void> {
  await page.waitForSelector(selector, { timeout });
  const element = page.locator(selector);
  await element.waitFor({ state: 'visible' });
  await element.waitFor({ state: 'enabled' });
}

/**
 * Perform login shortcut
 */
export async function login(
  page: Page,
  username: string,
  password: string,
  baseURL: string = 'https://practice.saucedemo.com'
): Promise<void> {
  await page.goto(baseURL);
  await page.fill('input[data-test="username"]', username);
  await page.fill('input[data-test="password"]', password);
  await page.click('input[data-test="login-button"]');
  await page.waitForSelector('.inventory_container', { timeout: 5000 });
}

/**
 * Calculate total price from cart items
 */
export async function calculateCartTotal(page: Page): Promise<number> {
  const priceElements = await page.locator('.inventory_item_price').all();
  let total = 0;
  for (const element of priceElements) {
    const text = await element.textContent();
    if (text) {
      const price = parseFloat(text.replace('$', ''));
      total += price;
    }
  }
  return parseFloat(total.toFixed(2));
}

/**
 * Check if element contains text (case-insensitive)
 */
export async function elementContainsText(
  page: Page,
  selector: string,
  text: string
): Promise<boolean> {
  const element = page.locator(selector);
  const content = await element.textContent();
  return content?.toLowerCase().includes(text.toLowerCase()) || false;
}

/**
 * Get all text from multiple elements
 */
export async function getMultipleElementTexts(
  page: Page,
  selector: string
): Promise<string[]> {
  const elements = await page.locator(selector).all();
  const texts: string[] = [];
  for (const element of elements) {
    const text = await element.textContent();
    if (text) texts.push(text.trim());
  }
  return texts;
}

/**
 * Verify element is in viewport
 */
export async function isElementInViewport(
  page: Page,
  selector: string
): Promise<boolean> {
  const element = page.locator(selector);
  const box = await element.boundingBox();
  if (!box) return false;
  
  const viewport = page.viewportSize();
  if (!viewport) return false;
  
  return box.x >= 0 &&
    box.y >= 0 &&
    box.x + box.width <= viewport.width &&
    box.y + box.height <= viewport.height;
}

/**
 * Wait for network idle (useful after actions)
 */
export async function waitForNetworkIdle(
  page: Page,
  timeout: number = 5000
): Promise<void> {
  await page.waitForLoadState('networkidle', { timeout });
}

/**
 * Take screenshot with timestamp
 */
export async function takeTimestampedScreenshot(
  page: Page,
  name: string
): Promise<string> {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const fileName = `screenshots/${name}-${timestamp}.png`;
  await page.screenshot({ path: fileName });
  return fileName;
}
```

### 9. tests/auth.spec.ts

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { TEST_USERS, INVALID_CREDENTIALS, URLS } from '../utils/testData';

test.describe('Authentication Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
    await loginPage.waitForLoginPageReady();
  });

  test('TC001: Valid user login should succeed', async ({ page }) => {
    // Arrange
    const { username, password } = TEST_USERS.validUser;

    // Act
    await loginPage.login(username, password);

    // Assert
    const isSuccessful = await loginPage.isLoginSuccessful();
    expect(isSuccessful).toBe(true);
    expect(page.url()).toContain(URLS.inventory);
  });

  test('TC002: Invalid password should show error', async () => {
    // Arrange
    const { username, password } = INVALID_CREDENTIALS.invalidPassword;
    const expectedError = 'Username and password do not match';

    // Act
    await loginPage.login(username, password);

    // Assert
    const isErrorDisplayed = await loginPage.isErrorDisplayed();
    expect(isErrorDisplayed).toBe(true);
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain(expectedError);
  });

  test('TC003: Locked out user should see lock message', async () => {
    // Arrange
    const { username, password } = TEST_USERS.lockedUser;
    const expectedError = 'locked out';

    // Act
    await loginPage.login(username, password);

    // Assert
    const isErrorDisplayed = await loginPage.isErrorDisplayed();
    expect(isErrorDisplayed).toBe(true);
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain(expectedError);
  });

  test('TC004: Empty username should show error', async () => {
    // Arrange
    const { username, password } = INVALID_CREDENTIALS.emptyUsername;
    const expectedError = 'Username is required';

    // Act
    await loginPage.login(username, password);

    // Assert
    const isErrorDisplayed = await loginPage.isErrorDisplayed();
    expect(isErrorDisplayed).toBe(true);
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain(expectedError);
  });

  test('TC005: Empty password should show error', async () => {
    // Arrange
    const { username, password } = INVALID_CREDENTIALS.emptyPassword;
    const expectedError = 'Password is required';

    // Act
    await loginPage.login(username, password);

    // Assert
    const isErrorDisplayed = await loginPage.isErrorDisplayed();
    expect(isErrorDisplayed).toBe(true);
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain(expectedError);
  });

  test('TC006: Login page title verification', async ({ page }) => {
    // Assert
    const title = await loginPage.getPageTitle();
    expect(title).toContain('Swag Labs');
  });

  test('TC007: Problem user can still login', async ({ page }) => {
    // Arrange
    const { username, password } = TEST_USERS.problemUser;

    // Act
    await loginPage.login(username, password);

    // Assert
    const isSuccessful = await loginPage.isLoginSuccessful();
    expect(isSuccessful).toBe(true);
  });

  test('TC008: Multiple invalid login attempts', async () => {
    // Try multiple invalid logins
    for (let i = 0; i < 3; i++) {
      await loginPage.login('invalid_user', 'invalid_pass');
      const isErrorDisplayed = await loginPage.isErrorDisplayed();
      expect(isErrorDisplayed).toBe(true);
      
      // Reload for next attempt
      await loginPage.navigateToLogin();
      await loginPage.waitForLoginPageReady();
    }
  });
});
```

### 10. tests/product-search.spec.ts

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ProductPage } from '../pages/productPage';
import { TEST_USERS, TEST_PRODUCTS, SORT_OPTIONS } from '../utils/testData';

test.describe('Product Search and Filtering Tests', () => {
  let loginPage: LoginPage;
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);

    // Login before each test
    await loginPage.navigateToLogin();
    await loginPage.waitForLoginPageReady();
    await loginPage.login(TEST_USERS.validUser.username, TEST_USERS.validUser.password);
    await productPage.navigateToInventory();
  });

  test('TC101: Verify all products are displayed', async () => {
    // Act
    const productNames = await productPage.getProductNames();

    // Assert
    expect(productNames.length).toBeGreaterThan(0);
    expect(productNames.length).toBe(6); // Sauce Labs has 6 products
  });

  test('TC102: Verify specific product exists', async () => {
    // Arrange
    const productToFind = 'Sauce Labs Backpack';

    // Act
    const foundProduct = await productPage.getProductByName(productToFind);

    // Assert
    expect(foundProduct).not.toBeNull();
    expect(foundProduct).toContain(productToFind);
  });

  test('TC103: Add product to cart', async ({ page }) => {
    // Arrange
    const productName = 'Sauce Labs Backpack';

    // Act
    await productPage.addProductToCart(productName);

    // Assert
    const cartCount = await productPage.getCartItemCount();
    expect(cartCount).toBe(1);
    const isInCart = await productPage.isProductInCart(productName);
    expect(isInCart).toBe(true);
  });

  test('TC104: Add multiple products to cart', async () => {
    // Arrange
    const products = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];

    // Act
    for (const product of products) {
      await productPage.addProductToCart(product);
    }

    // Assert
    const cartCount = await productPage.getCartItemCount();
    expect(cartCount).toBe(products.length);
  });

  test('TC105: Remove product from cart', async () => {
    // Arrange
    const productName = 'Sauce Labs Backpack';
    await productPage.addProductToCart(productName);

    // Act
    await productPage.removeProductFromCart(productName);

    // Assert
    const cartCount = await productPage.getCartItemCount();
    expect(cartCount).toBe(0);
    const isInCart = await productPage.isProductInCart(productName);
    expect(isInCart).toBe(false);
  });

  test('TC106: Sort products by name A-Z', async () => {
    // Act
    await productPage.sortProducts(SORT_OPTIONS.nameAZ);

    // Assert
    const productNames = await productPage.getProductNames();
    const sorted = [...productNames].sort();
    expect(productNames).toEqual(sorted);
  });

  test('TC107: Sort products by price low to high', async () => {
    // Act
    await productPage.sortProducts(SORT_OPTIONS.priceLowHigh);

    // Assert
    const prices = await productPage.getProductPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test('TC108: Verify product prices', async () => {
    // Act
    const prices = await productPage.getProductPrices();

    // Assert
    prices.forEach(price => {
      expect(price).toBeGreaterThan(0);
    });
  });

  test('TC109: Navigate to cart from product page', async ({ page }) => {
    // Act
    await productPage.clickCartLink();

    // Assert
    expect(page.url()).toContain('cart');
  });

  test('TC110: Product count in cart updates correctly', async () => {
    // Initial count should be 0
    let cartCount = await productPage.getCartItemCount();
    expect(cartCount).toBe(0);

    // Add first product
    await productPage.addProductToCart('Sauce Labs Backpack');
    cartCount = await productPage.getCartItemCount();
    expect(cartCount).toBe(1);

    // Add second product
    await productPage.addProductToCart('Sauce Labs Bike Light');
    cartCount = await productPage.getCartItemCount();
    expect(cartCount).toBe(2);

    // Remove one product
    await productPage.removeProductFromCart('Sauce Labs Backpack');
    cartCount = await productPage.getCartItemCount();
    expect(cartCount).toBe(1);
  });
});
```

### 11. tests/checkout.spec.ts

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ProductPage } from '../pages/productPage';
import { CartPage } from '../pages/cartPage';
import { CheckoutPage } from '../pages/checkoutPage';
import { TEST_USERS, CHECKOUT_DATA } from '../utils/testData';

test.describe('Checkout Flow Tests', () => {
  let loginPage: LoginPage;
  let productPage: ProductPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    // Login before each test
    await loginPage.navigateToLogin();
    await loginPage.login(TEST_USERS.validUser.username, TEST_USERS.validUser.password);
    
    // Add product to cart
    await productPage.navigateToInventory();
    await productPage.addProductToCart('Sauce Labs Backpack');
    await productPage.addProductToCart('Sauce Labs Bike Light');
  });

  test('TC201: Complete checkout with valid information', async ({ page }) => {
    // Arrange
    const { firstName, lastName, postalCode } = CHECKOUT_DATA.validCheckout;

    // Act - Navigate to checkout
    await cartPage.navigateToCart();
    await cartPage.clickCheckout();

    // Fill checkout info
    await checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode);
    await checkoutPage.clickContinue();

    // Complete checkout
    await checkoutPage.completeCheckout();

    // Assert
    expect(page.url()).toContain('checkout-complete');
  });

  test('TC202: Checkout with missing first name shows error', async () => {
    // Arrange
    const { firstName, lastName, postalCode } = CHECKOUT_DATA.missingFirstName;

    // Act
    await cartPage.navigateToCart();
    await cartPage.clickCheckout();
    await checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode);
    await checkoutPage.clickContinue();

    // Assert
    const isErrorDisplayed = await checkoutPage.isErrorDisplayed();
    expect(isErrorDisplayed).toBe(true);
  });

  test('TC203: Checkout with missing last name shows error', async () => {
    // Arrange
    const { firstName, lastName, postalCode } = CHECKOUT_DATA.missingLastName;

    // Act
    await cartPage.navigateToCart();
    await cartPage.clickCheckout();
    await checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode);
    await checkoutPage.clickContinue();

    // Assert
    const isErrorDisplayed = await checkoutPage.isErrorDisplayed();
    expect(isErrorDisplayed).toBe(true);
  });

  test('TC204: Checkout with missing postal code shows error', async () => {
    // Arrange
    const { firstName, lastName, postalCode } = CHECKOUT_DATA.missingPostalCode;

    // Act
    await cartPage.navigateToCart();
    await cartPage.clickCheckout();
    await checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode);
    await checkoutPage.clickContinue();

    // Assert
    const isErrorDisplayed = await checkoutPage.isErrorDisplayed();
    expect(isErrorDisplayed).toBe(true);
  });

  test('TC205: Cancel checkout', async ({ page }) => {
    // Act
    await cartPage.navigateToCart();
    await cartPage.clickCheckout();
    await checkoutPage.clickCancel();

    // Assert
    expect(page.url()).toContain('inventory');
  });

  test('TC206: Verify cart total on checkout page', async () => {
    // Act
    await cartPage.navigateToCart();
    const cartTotal = await cartPage.getCartTotal();
    await cartPage.clickCheckout();

    // Assert
    const summaryVisible = await checkoutPage.isCheckoutSummaryVisible();
    expect(summaryVisible).toBe(true);
  });
});
```

### 12. package.json

```json
{
  "name": "ecommerce-automation",
  "version": "1.0.0",
  "description": "E-commerce test automation with Playwright and TypeScript",
  "scripts": {
    "test": "playwright test",
    "test:headed": "playwright test --headed",
    "test:ui": "playwright test --ui",
    "test:debug": "playwright test --debug",
    "test:chromium": "playwright test --project=chromium",
    "test:firefox": "playwright test --project=firefox",
    "test:webkit": "playwright test --project=webkit",
    "test:specific": "playwright test auth.spec.ts",
    "report": "playwright show-report",
    "test:parallel": "playwright test --workers=4",
    "test:serial": "playwright test --workers=1",
    "codegen": "playwright codegen https://practice.saucedemo.com"
  },
  "keywords": [
    "automation",
    "testing",
    "playwright",
    "typescript",
    "e2e"
  ],
  "author": "Your Name",
  "license": "MIT",
  "devDependencies": {
    "@playwright/test": "^1.40.0",
    "@types/node": "^20.0.0",
    "typescript": "^5.3.0",
    "ts-node": "^10.9.0"
  }
}
```

---

## Test Execution Guide

### Run All Tests
```bash
npm test
```

### Run Tests in Headed Mode (See Browser)
```bash
npm run test:headed
```

### Run Tests in UI Mode (Interactive)
```bash
npm run test:ui
```

### Run Specific Test File
```bash
npx playwright test tests/auth.spec.ts
```

### Run Specific Test
```bash
npx playwright test -g "Valid user login"
```

### Run on Specific Browser
```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

### Run Tests in Debug Mode
```bash
npm run test:debug
```

### Generate and View HTML Report
```bash
npm run report
```

### Run Tests with Parallel Workers
```bash
npm run test:parallel
```

---

## Project Exercise Assignments

### Day 6-7: Core Setup & Base Pages
1. Create the complete project structure
2. Implement `basePage.ts` with all utility methods
3. Create `loginPage.ts` and `productPage.ts`
4. Write `testData.ts` with realistic test data
5. Setup `playwright.config.ts` with all three browsers

**Expected Output:** All page objects created, project structure ready

### Day 8: Cart & Checkout Pages
1. Implement `cartPage.ts` with full cart functionality
2. Create `checkoutPage.ts` for checkout flow
3. Add helper functions in `helpers.ts`
4. Create `cart.spec.ts` test file

**Expected Output:** All page objects complete, ready for testing

### Day 9: Authentication Tests
1. Complete `auth.spec.ts` with all 8 test cases
2. Verify login success and failure scenarios
3. Test error messages
4. Run tests and verify HTML report generation

**Expected Output:** 8 authentication tests passing on all three browsers

### Day 10: Product & Shopping Tests
1. Complete `product-search.spec.ts` with all 10 tests
2. Test sorting, filtering, and cart operations
3. Verify product counts and prices
4. Test multi-product scenarios

**Expected Output:** 10 product tests passing, 100% coverage of product features

### Day 11: Checkout & Final Testing
1. Complete `checkout.spec.ts` with all 6 tests
2. Test successful checkout flow
3. Test error validation
4. Run complete test suite: 24 tests total
5. Commit to GitHub with meaningful commit messages

**Expected Output:**
- 24 tests passing on all 3 browsers = 72 test executions
- HTML report generated
- Project committed to GitHub
- README documentation complete

---

## Running Exercises

### Exercise 1: First Test (Day 6)
```bash
# Create and run first simple test
npx playwright test auth.spec.ts -g "Valid user login"
```

### Exercise 2: Product Tests (Day 10)
```bash
# Run product tests only
npm run test:specific product-search.spec.ts --headed
```

### Exercise 3: Full Test Suite (Day 11)
```bash
# Run entire suite with report
npm test && npm run report
```

---

## MCQs - Test Your Knowledge

### Question 1: Page Object Model
What is the primary advantage of using the Page Object Model (POM) pattern?
- A) Reduces code duplication
- B) Improves test maintainability
- C) Provides a clear separation of test logic and page structure
- **D) All of the above**

### Question 2: Playwright Selectors
Which selector type is most resilient to UI changes?
- A) CSS selectors
- B) XPath
- C) Playwright locators with specific test-id attributes
- **D) XPath with text matching**

### Question 3: Assertions
What does `expect(value).toBe(true)` verify?
- A) The value exists
- B) The value is equal to true (strict equality)
- C) The value is truthy
- **D) None of the above**

**Answer: B**

### Question 4: Test Data
Why should test data be separated from test code?
- A) Better readability
- B) Easier to maintain and update
- C) Enables data-driven testing
- **D) All of the above**

### Question 5: Cross-browser Testing
How many browsers does this project test simultaneously?
- A) 1 (Chrome only)
- B) 2 (Chrome and Firefox)
- **C) 3 (Chrome, Firefox, Safari)**
- D) 4 (Chrome, Firefox, Safari, Edge)

---

## README.md Template

Create `README.md` in project root:

```markdown
# Project 1: E-Commerce Test Automation Suite

## Overview
Professional-grade automation test suite for e-commerce application using Playwright and TypeScript.

## Technologies
- **Playwright** 1.40.0+
- **TypeScript** 5.3.0+
- **Node.js** 20.x or later
- **npm** 10.x or later

## Installation
\`\`\`bash
npm install
npx playwright install
\`\`\`

## Running Tests
\`\`\`bash
# All tests
npm test

# Headed mode
npm run test:headed

# UI mode
npm run test:ui

# Specific browser
npm run test:chromium
\`\`\`

## Project Structure
- \`tests/\` - Test files
- \`pages/\` - Page Object Model classes
- \`utils/\` - Utilities and test data
- \`reports/\` - Test reports

## Key Features
- 24+ test cases covering authentication, products, checkout
- Page Object Model architecture
- Data-driven testing approach
- Cross-browser testing (Chrome, Firefox, Safari)
- Comprehensive reporting with screenshots and videos
- TypeScript for type safety

## Test Coverage
- ✅ Authentication (Login, Error Handling)
- ✅ Product Search & Filtering
- ✅ Shopping Cart Operations
- ✅ Checkout Flow
- ✅ Payment Processing

## Author
[Your Name]

## License
MIT
```

---

## GitHub Commit Strategy

After completing this project, make these commits:

```bash
git add .
git commit -m "Project 1: Add initial project structure and configuration"
git commit -m "Project 1: Implement Page Object Model base class and utilities"
git commit -m "Project 1: Add LoginPage, ProductPage, and CartPage implementations"
git commit -m "Project 1: Implement CheckoutPage and test data"
git commit -m "Project 1: Add comprehensive authentication tests"
git commit -m "Project 1: Add product search and filtering tests"
git commit -m "Project 1: Add checkout flow tests"
git commit -m "Project 1: Add README and finalize documentation"
git push origin main
```

---

## Career Value & Interview Talking Points

### What This Project Demonstrates

1. **Architecture Knowledge**
   - "I designed a scalable Page Object Model architecture that separates test logic from page interactions, enabling easy maintenance when UI changes."

2. **Automation Expertise**
   - "I implemented comprehensive test coverage with 24+ test cases using Playwright, including authentication, product operations, and checkout flows."

3. **Best Practices**
   - "I followed industry standards: TypeScript for type safety, data-driven testing for maintainability, and parallel execution for faster feedback."

4. **Problem Solving**
   - "I handled complex scenarios like dynamic product loading, dropdown selections, and error validation to ensure robust test coverage."

5. **Professional Development**
   - "I documented everything with clear README, meaningful git commits, and production-ready code."

### Interview Questions You Can Answer

1. **"Walk me through your Page Object Model design."**
   - Explain inheritance from BasePage, page-specific methods, separation of selectors

2. **"How do you handle dynamic elements?"**
   - Discuss waitForSelector, locator methods, and resilient selectors

3. **"What's your approach to test data?"**
   - Explain testData.ts pattern, data-driven testing, test data lifecycle

4. **"How would you scale this to thousands of tests?"**
   - Discuss parallel execution, categorization, CI/CD integration

---

## Next Steps

After completing Project 1:
1. ✅ Push to GitHub with professional documentation
2. ✅ Update your LinkedIn with project link
3. ✅ Prepare a 2-minute demo video of tests running
4. ✅ Document key learnings in your portfolio
5. ✅ Move to **Project 2: REST API Testing** (Days 12-15)

---

## Additional Resources

- [Playwright Official Documentation](https://playwright.dev/docs/intro)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [Best Practices in Test Automation](https://playwright.dev/docs/best-practices)

---

**Project Status:** Ready to Build
**Last Updated:** December 2025
**Difficulty Level:** Intermediate
**Time Required:** 40-50 hours
**GitHub Visibility:** Public Portfolio Project

