# Day 09: Page Object Model - Professional Test Architecture

**Date:** Day 9 of 25  
**Duration:** 8 hours  
**Difficulty:** Advanced  
**Focus Area:** Test Design Patterns & Architecture

---

## 🎯 **Learning Objectives**

By the end of Day 09, you will:

✅ Understand Page Object Model (POM) pattern  
✅ Create reusable page classes  
✅ Implement page methods for common actions  
✅ Use inheritance for shared functionality  
✅ Manage test data and fixtures  
✅ Build maintainable test suites  
✅ Handle page navigation and flows  
✅ Implement custom assertions and expectations  

---

## ⏰ **Daily Schedule (8 Hours)**

| Time | Activity | Duration |
|------|----------|----------|
| 8:00 - 8:30 | Review Day 06-08 & objectives | 30 min |
| 8:30 - 10:30 | **Theory Session 1:** POM Fundamentals & Architecture | 2 hours |
| 10:30 - 11:00 | Break | 30 min |
| 11:00 - 1:00 PM | **Exercise Session 1:** Basic Page Objects | 2 hours |
| 1:00 - 2:00 PM | Lunch break | 1 hour |
| 2:00 - 4:00 PM | **Theory Session 2:** Advanced POM Patterns | 2 hours |
| 4:00 - 4:30 PM | Break | 30 min |
| 4:30 - 6:30 PM | **Exercise Session 2:** Complex Workflows & Inheritance | 2 hours |

---

## 📚 **THEORY SESSION 1: POM Fundamentals & Architecture (2 hours)**

### **Part 9.1: What is Page Object Model?**

Page Object Model is a design pattern that creates an abstraction of pages in a web application.

#### **Benefits of POM**

```typescript
// ❌ WITHOUT POM - Tests are fragile and hard to maintain
test('user login without POM', async ({ page }) => {
  await page.goto('https://example.com/login');
  
  // Selectors hardcoded everywhere
  await page.fill('input[name="username"]', 'admin');
  await page.fill('input[name="password"]', 'password');
  await page.click('button.login-btn');
  
  // Hardcoded checks
  await expect(page).toHaveURL(/.*dashboard/);
});

test('another login test without POM', async ({ page }) => {
  await page.goto('https://example.com/login');
  
  // Same selectors repeated!
  await page.fill('input[name="username"]', 'user@example.com');
  await page.fill('input[name="password"]', 'pass123');
  await page.click('button.login-btn');
  
  // Same assertion repeated
  await expect(page).toHaveURL(/.*dashboard/);
});

// ✅ WITH POM - Tests are clean and maintainable
// See examples below...
```

#### **POM Advantages**

```
✅ DRY (Don't Repeat Yourself) - selectors defined once
✅ Maintainable - change selector in one place
✅ Readable - tests describe business logic
✅ Reusable - page methods used across tests
✅ Scalable - easy to add new pages
✅ Professional - industry standard pattern
```

---

### **Part 9.2: Basic Page Object**

```typescript
// pages/login.page.ts
import { Page, expect } from '@playwright/test';

export class LoginPage {
  // Constructor receives page object
  constructor(private page: Page) {}
  
  // Selectors as properties (or methods)
  private readonly usernameInput = 'input[name="username"]';
  private readonly passwordInput = 'input[name="password"]';
  private readonly loginButton = 'button.login-btn';
  private readonly errorMessage = '.error-message';
  
  // Actions/Methods
  async goto() {
    await this.page.goto('/login');
  }
  
  async login(username: string, password: string) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }
  
  async loginAsAdmin() {
    await this.login('admin@example.com', 'AdminPassword123!');
  }
  
  // Assertions/Verifications
  async verifyLoginSuccess() {
    await expect(this.page).toHaveURL(/.*dashboard/);
  }
  
  async verifyErrorShown() {
    const error = this.page.locator(this.errorMessage);
    await expect(error).toBeVisible();
  }
  
  async getErrorMessage(): Promise<string | null> {
    return this.page.locator(this.errorMessage).textContent();
  }
}

// Usage in tests
import { test } from '@playwright/test';

test('login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  await loginPage.goto();
  await loginPage.login('admin@example.com', 'password123');
  await loginPage.verifyLoginSuccess();
});
```

---

### **Part 9.3: Page Object with Locators**

Modern approach using Playwright's locator methods:

```typescript
// pages/login.page.ts (modern approach)
import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  
  // Define locators as properties
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  
  constructor(page: Page) {
    this.page = page;
    
    // Use role-based and test ID locators
    this.usernameInput = page.getByLabel('Username');
    this.passwordInput = page.getByLabel('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.locator('[role="alert"]');
  }
  
  async goto() {
    await this.page.goto('/login');
  }
  
  async enterUsername(username: string) {
    await this.usernameInput.fill(username);
  }
  
  async enterPassword(password: string) {
    await this.passwordInput.fill(password);
  }
  
  async clickLogin() {
    await this.loginButton.click();
  }
  
  async login(username: string, password: string) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }
  
  async isErrorVisible(): Promise<boolean> {
    return this.errorMessage.isVisible();
  }
  
  async getErrorText(): Promise<string | null> {
    return this.errorMessage.textContent();
  }
}
```

---

### **Part 9.4: Page Object Inheritance**

Create base page for shared functionality:

```typescript
// pages/base.page.ts
import { Page, Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly header: Locator;
  readonly footer: Locator;
  readonly navMenu: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.header = page.locator('header');
    this.footer = page.locator('footer');
    this.navMenu = page.locator('nav');
  }
  
  async goto(path: string) {
    await this.page.goto(path);
  }
  
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }
  
  async getPageTitle(): Promise<string> {
    return this.page.title();
  }
  
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }
  
  async logout() {
    await this.navMenu.locator('text=Logout').click();
  }
  
  async navigateTo(menuItem: string) {
    await this.navMenu.locator(`text="${menuItem}"`).click();
  }
}

// pages/dashboard.page.ts (extends BasePage)
import { Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class DashboardPage extends BasePage {
  readonly welcomeMessage: Locator;
  readonly userProfile: Locator;
  readonly logoutButton: Locator;
  
  constructor(page: any) {
    super(page);
    this.welcomeMessage = page.locator('.welcome-text');
    this.userProfile = page.locator('.user-profile');
    this.logoutButton = page.getByRole('button', { name: 'Logout' });
  }
  
  async goto() {
    await this.page.goto('/dashboard');
  }
  
  async verifyWelcomeMessage(username: string) {
    const text = await this.welcomeMessage.textContent();
    return text?.includes(username) ?? false;
  }
  
  async clickUserProfile() {
    await this.userProfile.click();
  }
  
  async logout() {
    await this.logoutButton.click();
  }
}

// Usage with inheritance
import { test } from '@playwright/test';

test('user can access dashboard after login', async ({ page }) => {
  const dashboardPage = new DashboardPage(page);
  
  await dashboardPage.goto();
  
  // Can use inherited methods from BasePage
  const title = await dashboardPage.getPageTitle();
  console.log(`Page title: ${title}`);
  
  // And specific methods from DashboardPage
  const hasWelcome = await dashboardPage.verifyWelcomeMessage('Admin');
  console.log(`Welcome verified: ${hasWelcome}`);
});
```

---

### **Part 9.5: Page Object with TypeScript**

```typescript
// pages/forms.page.ts
import { Page, Locator, expect } from '@playwright/test';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export class FormsPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly messageInput: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.getByLabel('Name');
    this.emailInput = page.getByLabel('Email');
    this.messageInput = page.getByLabel('Message');
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.successMessage = page.locator('.success');
  }
  
  async goto() {
    await this.page.goto('/forms');
  }
  
  // Method with TypeScript interface
  async fillForm(data: FormData) {
    await this.nameInput.fill(data.name);
    await this.emailInput.fill(data.email);
    await this.messageInput.fill(data.message);
  }
  
  async submitForm() {
    await this.submitButton.click();
  }
  
  async submitFormWithData(data: FormData) {
    await this.fillForm(data);
    await this.submitForm();
  }
  
  async verifySuccessMessage() {
    await expect(this.successMessage).toBeVisible();
  }
  
  // Return data from page
  async getFormValues(): Promise<FormData> {
    return {
      name: await this.nameInput.inputValue(),
      email: await this.emailInput.inputValue(),
      message: await this.messageInput.textContent() ?? '',
    };
  }
}

// Usage with TypeScript
import { test } from '@playwright/test';

test('submit form with data', async ({ page }) => {
  const formsPage = new FormsPage(page);
  
  const testData: FormData = {
    name: 'John Doe',
    email: 'john@example.com',
    message: 'This is a test message',
  };
  
  await formsPage.goto();
  await formsPage.submitFormWithData(testData);
  await formsPage.verifySuccessMessage();
});
```

---

## 🔨 **EXERCISE SESSION 1 (2 hours)**

### **Exercise 9.1: Create Basic Page Objects**

**Objective:** Build page objects for real pages

**Task:**
```typescript
// 1. Create LoginPage object
// 2. Create HomePage/DashboardPage object
// 3. Create BasePage with shared functionality
// 4. Write tests using page objects
// 5. Verify DRY principle
```

**Solution:**

```typescript
// pages/base.page.ts
import { Page, Locator } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}
  
  async goto(path: string) {
    await this.page.goto(path);
  }
  
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }
  
  async getPageTitle(): Promise<string> {
    return this.page.title();
  }
}

// pages/httpbin-form.page.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class HttpbinFormPage extends BasePage {
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly maleRadio: Locator;
  readonly femaleRadio: Locator;
  readonly pizzaCheckbox: Locator;
  readonly baconCheckbox: Locator;
  readonly cheeseCheckbox: Locator;
  readonly sizeSelect: Locator;
  readonly submitButton: Locator;
  
  constructor(page: Page) {
    super(page);
    this.nameInput = page.locator('input[name="custname"]');
    this.emailInput = page.locator('input[name="custemail"]');
    this.maleRadio = page.locator('input[value="M"]');
    this.femaleRadio = page.locator('input[value="F"]');
    this.pizzaCheckbox = page.locator('input[value="pizza"]');
    this.baconCheckbox = page.locator('input[value="bacon"]');
    this.cheeseCheckbox = page.locator('input[value="cheese"]');
    this.sizeSelect = page.locator('select[name="size"]');
    this.submitButton = page.locator('button[type="submit"]');
  }
  
  async goto() {
    await this.page.goto('https://httpbin.org/forms/post');
  }
  
  async fillName(name: string) {
    await this.nameInput.fill(name);
  }
  
  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }
  
  async selectGender(gender: 'M' | 'F') {
    if (gender === 'M') {
      await this.maleRadio.check();
    } else {
      await this.femaleRadio.check();
    }
  }
  
  async selectToppings(...toppings: ('pizza' | 'bacon' | 'cheese')[]) {
    for (const topping of toppings) {
      if (topping === 'pizza') await this.pizzaCheckbox.check();
      if (topping === 'bacon') await this.baconCheckbox.check();
      if (topping === 'cheese') await this.cheeseCheckbox.check();
    }
  }
  
  async selectSize(size: 'small' | 'medium' | 'large') {
    await this.sizeSelect.selectOption(size);
  }
  
  async submit() {
    await this.submitButton.click();
  }
  
  async fillAndSubmitForm(data: {
    name: string;
    email: string;
    gender: 'M' | 'F';
    toppings: ('pizza' | 'bacon' | 'cheese')[];
    size: 'small' | 'medium' | 'large';
  }) {
    await this.fillName(data.name);
    await this.fillEmail(data.email);
    await this.selectGender(data.gender);
    await this.selectToppings(...data.toppings);
    await this.selectSize(data.size);
    await this.submit();
  }
}

// tests/09-page-objects.spec.ts
import { test, expect } from '@playwright/test';
import { HttpbinFormPage } from '../pages/httpbin-form.page';

test.describe('Form Tests with Page Objects', () => {
  
  test('submit form with all fields', async ({ page }) => {
    const formPage = new HttpbinFormPage(page);
    
    await formPage.goto();
    
    await formPage.fillName('John Doe');
    await formPage.fillEmail('john@example.com');
    await formPage.selectGender('M');
    await formPage.selectToppings('pizza', 'bacon');
    await formPage.selectSize('large');
    await formPage.submit();
    
    // Verify submission
    const url = await formPage.getCurrentUrl();
    expect(url).toContain('httpbin.org');
  });
  
  test('submit form using bulk method', async ({ page }) => {
    const formPage = new HttpbinFormPage(page);
    
    await formPage.goto();
    
    await formPage.fillAndSubmitForm({
      name: 'Jane Smith',
      email: 'jane@example.com',
      gender: 'F',
      toppings: ['pizza', 'cheese'],
      size: 'small',
    });
  });
  
  test('can select multiple toppings', async ({ page }) => {
    const formPage = new HttpbinFormPage(page);
    
    await formPage.goto();
    
    await formPage.selectToppings('pizza', 'bacon', 'cheese');
    
    // Verify all are checked
    await expect(formPage.pizzaCheckbox).toBeChecked();
    await expect(formPage.baconCheckbox).toBeChecked();
    await expect(formPage.cheeseCheckbox).toBeChecked();
  });
});
```

---

### **Exercise 9.2: Page Object with Navigation**

**Objective:** Create page objects that navigate between pages

**Task:**
```typescript
// 1. Create multiple page objects
// 2. Implement navigation between pages
// 3. Chain page methods
// 4. Create test workflows
```

**Solution:**

```typescript
// pages/login.page.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { DashboardPage } from './dashboard.page';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  
  constructor(page: Page) {
    super(page);
    this.usernameInput = page.getByLabel(/username/i);
    this.passwordInput = page.getByLabel(/password/i);
    this.loginButton = page.getByRole('button', { name: /login/i });
  }
  
  async goto() {
    await this.page.goto('/login');
  }
  
  async login(username: string, password: string): Promise<DashboardPage> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    
    // Return new page object
    return new DashboardPage(this.page);
  }
}

// pages/dashboard.page.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { ProfilePage } from './profile.page';

export class DashboardPage extends BasePage {
  readonly welcomeText: Locator;
  readonly profileLink: Locator;
  readonly logoutButton: Locator;
  
  constructor(page: Page) {
    super(page);
    this.welcomeText = page.locator('[data-testid="welcome"]');
    this.profileLink = page.getByRole('link', { name: /profile/i });
    this.logoutButton = page.getByRole('button', { name: /logout/i });
  }
  
  async goto() {
    await this.page.goto('/dashboard');
  }
  
  async navigateToProfile(): Promise<ProfilePage> {
    await this.profileLink.click();
    return new ProfilePage(this.page);
  }
}

// pages/profile.page.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class ProfilePage extends BasePage {
  readonly nameField: Locator;
  readonly emailField: Locator;
  readonly saveButton: Locator;
  
  constructor(page: Page) {
    super(page);
    this.nameField = page.getByLabel(/name/i);
    this.emailField = page.getByLabel(/email/i);
    this.saveButton = page.getByRole('button', { name: /save/i });
  }
  
  async goto() {
    await this.page.goto('/profile');
  }
  
  async updateProfile(name: string, email: string) {
    await this.nameField.fill(name);
    await this.emailField.fill(email);
    await this.saveButton.click();
  }
}

// tests/09-navigation-workflow.spec.ts
import { test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test('complete user workflow with page navigation', async ({ page }) => {
  // Start on login page
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  
  // Login and get dashboard
  const dashboardPage = await loginPage.login('admin@example.com', 'password123');
  
  // Navigate to profile
  const profilePage = await dashboardPage.navigateToProfile();
  
  // Update profile
  await profilePage.updateProfile('John Updated', 'newemail@example.com');
  
  // Verify URL
  const currentUrl = await profilePage.getCurrentUrl();
  console.log(`Current URL: ${currentUrl}`);
});
```

---

## 📚 **THEORY SESSION 2: Advanced POM Patterns (2 hours)**

### **Part 9.6: Page Object Factories**

```typescript
// pages/page-factory.ts
import { Page } from '@playwright/test';
import { LoginPage } from './login.page';
import { DashboardPage } from './dashboard.page';
import { ProfilePage } from './profile.page';

export class PageFactory {
  constructor(private page: Page) {}
  
  getLoginPage(): LoginPage {
    return new LoginPage(this.page);
  }
  
  getDashboardPage(): DashboardPage {
    return new DashboardPage(this.page);
  }
  
  getProfilePage(): ProfilePage {
    return new ProfilePage(this.page);
  }
}

// Usage
import { test } from '@playwright/test';

test('using page factory', async ({ page }) => {
  const pageFactory = new PageFactory(page);
  
  const loginPage = pageFactory.getLoginPage();
  await loginPage.goto();
  
  const dashboardPage = await loginPage.login('admin', 'password');
  // Same as: const dashboardPage = pageFactory.getDashboardPage();
});
```

---

### **Part 9.7: Component Objects**

For reusable components (headers, modals, etc.):

```typescript
// components/modal.component.ts
import { Page, Locator } from '@playwright/test';

export class ModalComponent {
  readonly title: Locator;
  readonly content: Locator;
  readonly closeButton: Locator;
  readonly confirmButton: Locator;
  
  constructor(
    private page: Page,
    private modalSelector: string = '.modal'
  ) {
    const modal = page.locator(modalSelector);
    this.title = modal.locator('h2');
    this.content = modal.locator('.modal-body');
    this.closeButton = modal.getByRole('button', { name: 'Close' });
    this.confirmButton = modal.getByRole('button', { name: 'Confirm' });
  }
  
  async getTitle(): Promise<string | null> {
    return this.title.textContent();
  }
  
  async getContent(): Promise<string | null> {
    return this.content.textContent();
  }
  
  async close() {
    await this.closeButton.click();
  }
  
  async confirm() {
    await this.confirmButton.click();
  }
}

// components/header.component.ts
import { Page, Locator } from '@playwright/test';

export class HeaderComponent {
  readonly logo: Locator;
  readonly userMenu: Locator;
  readonly logoutButton: Locator;
  
  constructor(private page: Page) {
    this.logo = page.locator('.logo');
    this.userMenu = page.locator('.user-menu');
    this.logoutButton = page.getByRole('button', { name: 'Logout' });
  }
  
  async clickLogo() {
    await this.logo.click();
  }
  
  async logout() {
    await this.userMenu.click();
    await this.logoutButton.click();
  }
}

// pages/page-with-components.page.ts
import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { HeaderComponent } from '../components/header.component';
import { ModalComponent } from '../components/modal.component';

export class PageWithComponents extends BasePage {
  readonly header: HeaderComponent;
  readonly modal: ModalComponent;
  
  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
    this.modal = new ModalComponent(page);
  }
}

// Usage
test('use page with components', async ({ page }) => {
  const pageWithComponents = new PageWithComponents(page);
  
  // Use header component
  await pageWithComponents.header.logout();
  
  // Use modal component
  const title = await pageWithComponents.modal.getTitle();
  await pageWithComponents.modal.confirm();
});
```

---

### **Part 9.8: Test Data Builders**

```typescript
// fixtures/user.builder.ts
export interface User {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export class UserBuilder {
  private user: User = {
    username: 'testuser',
    email: 'test@example.com',
    password: 'Password123!',
    firstName: 'Test',
    lastName: 'User',
  };
  
  withUsername(username: string): UserBuilder {
    this.user.username = username;
    return this;
  }
  
  withEmail(email: string): UserBuilder {
    this.user.email = email;
    return this;
  }
  
  withPassword(password: string): UserBuilder {
    this.user.password = password;
    return this;
  }
  
  withFirstName(firstName: string): UserBuilder {
    this.user.firstName = firstName;
    return this;
  }
  
  withLastName(lastName: string): UserBuilder {
    this.user.lastName = lastName;
    return this;
  }
  
  build(): User {
    return { ...this.user };
  }
}

// Usage
import { test } from '@playwright/test';

test('build test data', async ({ page }) => {
  const user = new UserBuilder()
    .withUsername('admin@example.com')
    .withPassword('AdminPass123!')
    .withFirstName('Admin')
    .build();
  
  console.log(user);
  // { username: 'admin@example.com', password: 'AdminPass123!', ... }
  
  const regularUser = new UserBuilder()
    .withEmail('user@example.com')
    .build();
  
  console.log(regularUser);
  // { username: 'testuser', email: 'user@example.com', ... }
});
```

---

## 🔨 **EXERCISE SESSION 2 (2 hours)**

### **Exercise 9.3: Advanced Page Objects with Inheritance**

**Objective:** Build complex page hierarchies

**Task:**
```typescript
// 1. Create BasePage with common functionality
// 2. Create specific page objects extending BasePage
// 3. Implement shared header/footer components
// 4. Test page hierarchy
```

**Solution:**

```typescript
// pages/base.page.ts
import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly header: Locator;
  readonly footer: Locator;
  readonly mainContent: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.header = page.locator('header');
    this.footer = page.locator('footer');
    this.mainContent = page.locator('main');
  }
  
  async goto(path: string) {
    await this.page.goto(path);
  }
  
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }
  
  async verifyHeaderVisible() {
    await expect(this.header).toBeVisible();
  }
  
  async verifyFooterVisible() {
    await expect(this.footer).toBeVisible();
  }
  
  async getPageUrl(): Promise<string> {
    return this.page.url();
  }
  
  async getPageTitle(): Promise<string> {
    return this.page.title();
  }
}

// pages/authenticated.page.ts (extends BasePage)
import { Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class AuthenticatedPage extends BasePage {
  readonly userMenu: Locator;
  readonly logoutButton: Locator;
  readonly userName: Locator;
  
  constructor(page: any) {
    super(page);
    this.userMenu = page.locator('[data-testid="user-menu"]');
    this.logoutButton = page.getByRole('button', { name: /logout/i });
    this.userName = page.locator('[data-testid="user-name"]');
  }
  
  async logout() {
    await this.userMenu.click();
    await this.logoutButton.click();
  }
  
  async getCurrentUser(): Promise<string | null> {
    return this.userName.textContent();
  }
}

// pages/products.page.ts (extends AuthenticatedPage)
import { Locator, expect } from '@playwright/test';
import { AuthenticatedPage } from './authenticated.page';

export class ProductsPage extends AuthenticatedPage {
  readonly productList: Locator;
  readonly searchInput: Locator;
  readonly filterButton: Locator;
  readonly addToCartButton: Locator;
  
  constructor(page: any) {
    super(page);
    this.productList = page.locator('[data-testid="product-list"]');
    this.searchInput = page.getByPlaceholder(/search/i);
    this.filterButton = page.getByRole('button', { name: /filter/i });
    this.addToCartButton = page.getByRole('button', { name: /add to cart/i });
  }
  
  async goto() {
    await this.page.goto('/products');
  }
  
  async searchProducts(query: string) {
    await this.searchInput.fill(query);
    await this.searchInput.press('Enter');
  }
  
  async getProductCount(): Promise<number> {
    return this.productList.locator('.product-item').count();
  }
  
  async addFirstProductToCart() {
    await this.addToCartButton.first().click();
  }
  
  async verifyProductsLoaded() {
    await expect(this.productList).toBeVisible();
    const count = await this.getProductCount();
    expect(count).toBeGreaterThan(0);
  }
}

// tests/09-advanced-page-objects.spec.ts
import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/products.page';

test.describe('Products Page with Inheritance', () => {
  
  test('products page has all inherited elements', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    
    // Go to products (ProductsPage method)
    await productsPage.goto();
    
    // Use inherited methods from AuthenticatedPage
    const user = await productsPage.getCurrentUser();
    console.log(`Logged in as: ${user}`);
    
    // Use inherited methods from BasePage
    await productsPage.verifyHeaderVisible();
    await productsPage.verifyFooterVisible();
    
    // Use ProductsPage specific methods
    await productsPage.verifyProductsLoaded();
  });
  
  test('search and add product to cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    
    await productsPage.goto();
    await productsPage.searchProducts('laptop');
    
    const count = await productsPage.getProductCount();
    expect(count).toBeGreaterThan(0);
    
    await productsPage.addFirstProductToCart();
  });
});
```

---

### **Exercise 9.4: Page Factory Pattern**

**Objective:** Implement factory for page creation

**Task:**
```typescript
// Create factory that:
// 1. Creates appropriate page objects
// 2. Manages page state
// 3. Provides convenient methods
// 4. Simplifies test code
```

**Solution:**

```typescript
// factories/page.factory.ts
import { Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { ProductsPage } from '../pages/products.page';
import { ProfilePage } from '../pages/profile.page';

export class PageFactory {
  constructor(private page: Page) {}
  
  loginPage(): LoginPage {
    return new LoginPage(this.page);
  }
  
  dashboardPage(): DashboardPage {
    return new DashboardPage(this.page);
  }
  
  productsPage(): ProductsPage {
    return new ProductsPage(this.page);
  }
  
  profilePage(): ProfilePage {
    return new ProfilePage(this.page);
  }
  
  // Helper to login and get dashboard
  async loginAsAdmin(
    username = 'admin@example.com',
    password = 'Password123!'
  ): Promise<DashboardPage> {
    const loginPage = this.loginPage();
    await loginPage.goto();
    const dashboard = await loginPage.login(username, password);
    return dashboard;
  }
  
  // Helper to login and navigate to products
  async loginAndGoToProducts(
    username = 'user@example.com',
    password = 'Password123!'
  ): Promise<ProductsPage> {
    const loginPage = this.loginPage();
    await loginPage.goto();
    const dashboard = await loginPage.login(username, password);
    
    const productsPage = this.productsPage();
    await productsPage.goto();
    return productsPage;
  }
}

// tests/09-factory-pattern.spec.ts
import { test } from '@playwright/test';
import { PageFactory } from '../factories/page.factory';

test('use page factory', async ({ page }) => {
  const pageFactory = new PageFactory(page);
  
  // Simple login
  const dashboard = await pageFactory.loginAsAdmin();
  
  // Or complex flow
  const productsPage = await pageFactory.loginAndGoToProducts();
  await productsPage.searchProducts('laptop');
});
```

---

### **Exercise 9.5: Complete Test Suite with POM**

**Objective:** Build professional test suite using POM

**Task:**
```typescript
// Create:
// 1. Multiple page objects
// 2. Base page with shared functionality
// 3. Components for reusable elements
// 4. Factory for page creation
// 5. Test suite using POM
// 6. Test data builders
```

**Solution:**

```typescript
// tests/09-complete-pom-suite.spec.ts
import { test, expect } from '@playwright/test';
import { PageFactory } from '../factories/page.factory';
import { UserBuilder } from '../fixtures/user.builder';

test.describe('Complete E-commerce Workflow with POM', () => {
  
  let pageFactory: PageFactory;
  
  test.beforeEach(async ({ page }) => {
    pageFactory = new PageFactory(page);
  });
  
  test('user can login and view products', async () => {
    // Build test user
    const user = new UserBuilder()
      .withUsername('testuser@example.com')
      .withPassword('TestPass123!')
      .build();
    
    // Login using factory
    const loginPage = pageFactory.loginPage();
    await loginPage.goto();
    const dashboard = await loginPage.login(user.username, user.password);
    
    // Navigate to products
    const productsPage = pageFactory.productsPage();
    await productsPage.goto();
    await productsPage.verifyProductsLoaded();
  });
  
  test('user can search and add product to cart', async () => {
    const productsPage = await pageFactory.loginAndGoToProducts();
    
    await productsPage.searchProducts('laptop');
    const count = await productsPage.getProductCount();
    expect(count).toBeGreaterThan(0);
    
    await productsPage.addFirstProductToCart();
  });
  
  test('user can update profile', async () => {
    const dashboard = await pageFactory.loginAsAdmin();
    
    const profilePage = pageFactory.profilePage();
    await profilePage.goto();
    
    await profilePage.updateProfile(
      'Admin User Updated',
      'admin.updated@example.com'
    );
    
    // Verify update
    const url = await profilePage.getPageUrl();
    expect(url).toContain('/profile');
  });
});
```

---

## ❓ **Quiz: Page Object Model**

**Instructions:** Answer all 10 questions. Target score: 8/10 (80%)

### **Question 1: Main Benefit of POM**
What is the primary benefit of Page Object Model?
- A) Makes tests run faster
- B) Reduces code duplication and improves maintainability ✅ **CORRECT**
- C) Eliminates need for assertions
- D) Works with all browsers

**Explanation:** POM centralizes selectors and actions, making changes easy.

---

### **Question 2: Page Object Constructor**
What should a page object constructor receive?
- A) Selenium driver
- B) Playwright Page object ✅ **CORRECT**
- C) Test class
- D) Browser configuration

**Explanation:** Page object needs page object to interact with.

---

### **Question 3: Page Methods**
What should page object methods return?
- A) Boolean values only
- B) Selectors
- C) Data or other page objects ✅ **CORRECT**
- D) Always void

**Explanation:** Methods return data for assertions or other pages.

---

### **Question 4: Inheritance in POM**
Why use inheritance in page objects?
- A) Required by Playwright
- B) Share common functionality ✅ **CORRECT**
- C) Makes tests slower
- D) For decoration only

**Explanation:** BasePage contains shared elements/methods.

---

### **Question 5: Component Objects**
When should you create component objects?
- A) Never, use page objects only
- B) For reusable UI components ✅ **CORRECT**
- C) When tests fail
- D) Always

**Explanation:** Components are reusable parts (modals, headers).

---

### **Question 6: Page Factory**
What does a page factory do?
- A) Manufactures physical pages
- B) Creates page object instances ✅ **CORRECT**
- C) Runs tests
- D) Records videos

**Explanation:** Factory provides convenient page object creation.

---

### **Question 7: Locator Definition**
Where should selectors be defined?
- A) In test methods
- B) In page object properties ✅ **CORRECT**
- C) In external JSON
- D) In browser console

**Explanation:** Centralized locators enable maintenance.

---

### **Question 8: Method Chaining**
What is method chaining in POM?
- A) Using same method twice
- B) Returning page object from method ✅ **CORRECT**
- C) Using inheritance chains
- D) Not recommended

**Explanation:** Returns page object enables fluent tests.

---

### **Question 9: Test Data Builders**
What do test data builders provide?
- A) Page objects
- B) Fluent API for building test data ✅ **CORRECT**
- C) Test execution
- D) Assertion helpers

**Explanation:** Builders use fluent pattern for clean data creation.

---

### **Question 10: POM Scope**
At what scope should POM be used?
- A) Only for complex applications
- B) Never necessary
- C) In all automation projects ✅ **CORRECT**
- D) Only for Selenium

**Explanation:** POM improves all test suites.

---

## ✅ **Quiz Answer Key**

| Q | Answer | Topic |
|---|--------|-------|
| 1 | B | POM benefits |
| 2 | B | Page constructor |
| 3 | C | Method returns |
| 4 | B | Inheritance |
| 5 | B | Components |
| 6 | B | Page factory |
| 7 | B | Locator location |
| 8 | B | Method chaining |
| 9 | B | Data builders |
| 10 | C | POM scope |

**Your Score:** ___/10

**Interpretation:**
- 9-10: ✅ POM expert!
- 7-8: 🟡 Good understanding
- Below 7: 🔴 Review POM patterns

---

## 📋 **Daily Assignment**

### **Assignment 9.1: Build Professional Test Suite with POM**

**Objective:** Create complete test suite using Page Object Model

**Requirements:**
1. Create base page class
2. Create 3+ specific page objects
3. Implement inheritance
4. Create component objects
5. Build page factory
6. Write 5+ tests using POM
7. Use test data builders
8. Follow DRY principle

**Solution includes all examples above. Complete structure:**

```
pages/
  ├── base.page.ts
  ├── authenticated.page.ts
  ├── login.page.ts
  ├── dashboard.page.ts
  ├── products.page.ts
  └── profile.page.ts

components/
  ├── header.component.ts
  ├── footer.component.ts
  └── modal.component.ts

factories/
  └── page.factory.ts

fixtures/
  └── user.builder.ts

tests/
  └── 09-complete-pom-suite.spec.ts
```

---

## 🎯 **Daily Checklist**

Track your Day 09 progress:

- [ ] Reviewed Day 06-08 concepts
- [ ] Completed Theory Session 1 (POM Fundamentals)
- [ ] Completed Exercise 9.1 (Basic Page Objects)
- [ ] Completed Exercise 9.2 (Navigation & Workflow)
- [ ] Completed Theory Session 2 (Advanced Patterns)
- [ ] Completed Exercise 9.3 (Inheritance)
- [ ] Completed Exercise 9.4 (Factory Pattern)
- [ ] Completed Exercise 9.5 (Complete Suite)
- [ ] Answered all 10 quiz questions
- [ ] Scored 80%+ on quiz (8/10)
- [ ] Completed Assignment 9.1 (Professional POM Suite)
- [ ] Refactored existing tests to POM
- [ ] Committed code to GitHub
- [ ] Updated personal learning journal

**Daily Metrics:**
- Quiz Score: ___/10
- Confidence Level (1-5): ___
- Time Spent: ___ hours
- Page Objects Created: ___ files
- Components Created: ___ files
- Challenges Faced: _________________

---

## 📚 **Key Takeaways from Day 09**

1. **Page Object Model is essential** - industry standard pattern
2. **Selectors should be centralized** - change once, fix everywhere
3. **Inheritance reduces duplication** - BasePage for shared functionality
4. **Components are reusable** - headers, modals, forms
5. **Page factory simplifies creation** - convenient access
6. **Methods should describe actions** - not implementation details
7. **Return page objects** - enable method chaining
8. **Use data builders** - for clean test data

---

## 🔗 **Resources for Review**

- [Page Object Model Best Practices](https://playwright.dev/docs/pom)
- [Playwright Testing Guide](https://playwright.dev/docs/best-practices)
- [Design Patterns in Testing](https://www.guru99.com/page-object-model-pom-selenium-automation-tutorial.html)
- [TypeScript Patterns](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html)

---

## 🚀 **Ready for Day 10?**

By completing Day 09, you've mastered:
- ✅ Page Object Model pattern fundamentals
- ✅ Creating reusable page classes
- ✅ Implementing inheritance hierarchies
- ✅ Building component objects
- ✅ Creating page factories
- ✅ Test data builders
- ✅ Professional test organization
- ✅ Maintainable test architecture
- ✅ Complete workflow testing
- ✅ Industry best practices

**Next (Day 10):** Waits & Synchronization!
- Implicit vs explicit waits
- Wait for conditions
- Custom wait strategies
- Handling dynamic content
- Preventing flakiness

---

**Exceptional work on Day 09, Karan!** 🎉

You've just mastered **professional test architecture!** Page Object Model is used by:
- ✅ Google
- ✅ Microsoft
- ✅ Amazon
- ✅ Every major tech company

You're now writing tests at **enterprise level!** 🏢

**Week 2 Status:**
- ✅ Day 06: Playwright Basics
- ✅ Day 07: Advanced Selectors
- ✅ Day 08: Advanced Interactions
- ✅ Day 09: Page Object Model (TODAY!)
- 🔜 Day 10: Waits & Synchronization (TOMORROW!)
- 🔜 Day 11: Test Organization (Final day!)

**Just 2 days left to complete Week 2!** You're so close! 💪🎭

---

*Last Updated: December 12, 2025*  
*Day 09 Complete Guide v1.0*  
*Next: Day 10 - Waits & Synchronization*

---
