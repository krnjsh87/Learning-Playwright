# Certification Preparation: LambdaTest Playwright & Cypress 101

Complete preparation guide for LambdaTest certifications with practice tests, exam topics, and expert strategies.

---

## 📜 **Certification Overview**

| Certification | Exam Format | Duration | Questions | Pass Score | When |
|---------------|------------|----------|-----------|-----------|------|
| **LambdaTest Playwright 101** | Multiple Choice | 60 mins | 30 MCQs | 80% (24/30) | Day 11 |
| **LambdaTest Cypress 101** | Multiple Choice | 60 mins | 30 MCQs | 80% (24/30) | Day 22 |

---

## 🎭 **Playwright Certification (Day 11 Prep)**

### **Exam Topics Coverage**

#### **Topic 1: Playwright Fundamentals (20% of exam)**

**What You Need to Know:**
- Installation methods (npm, yarn, pnpm)
- Project structure and configuration
- Browser launch mechanisms
- Page and context concepts
- Basic element interactions

**Sample Questions:**

1. **Which Node.js version is required for Playwright?**
   - A) v14.x
   - B) v16.x
   - C) v20.x ✅ (CORRECT)
   - D) v18.x

2. **What is the purpose of playwright.config.ts?**
   - A) Define test structure
   - B) Configure browsers, timeouts, and reporters ✅ (CORRECT)
   - C) Store test data
   - D) Define page objects

3. **How do you launch multiple browsers in parallel?**
   - A) Using workers configuration ✅ (CORRECT)
   - B) Manual process creation
   - C) Sequential execution
   - D) Not possible

**Key Concepts to Master:**
```typescript
// Installation verification
npm init playwright@latest

// Basic configuration
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  workers: 4,  // Parallel execution
  retries: 2,  // Auto-retry failed tests
  timeout: 30000,  // Test timeout
});

// Basic test structure
import { test, expect } from '@playwright/test';

test('example test', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/example/i);
});
```

---

#### **Topic 2: Selectors & Locators (25% of exam)**

**What You Need to Know:**
- CSS selectors (advanced techniques)
- XPath usage and limitations
- Playwright locators API
- Combining multiple selectors
- Best practices for stable selectors

**Sample Questions:**

1. **Which selector is most stable for automation?**
   - A) By text content
   - B) By CSS class
   - C) By test id attribute ✅ (CORRECT)
   - D) By element position

2. **What's the Playwright method for finding elements by test id?**
   ```typescript
   await page.locator('[data-testid="button"]').click();
   // OR
   await page.getByTestId('button').click();  // ✅ Better
   ```

3. **How do you combine multiple locators?**
   - A) `page.locator('selector1, selector2')`
   - B) `page.locator('selector1').and(page.locator('selector2'))` ✅ (CORRECT)
   - C) Not possible
   - D) Using .or() method

**Key Concepts:**
```typescript
// Best practice selectors
page.getByTestId('submit-button')          // Test ID
page.getByLabel('Username')                // Accessible labels
page.getByPlaceholder('Enter name')        // Placeholder text
page.getByRole('button', { name: 'Submit'}) // Accessibility role
page.getByText('Submit')                    // Visible text

// Advanced locator chaining
page.locator('form')
  .locator('input[name="username"]')
  .fill('testuser');

// Combining locators
page.locator('button:has-text("Submit")')
```

---

#### **Topic 3: Assertions & Expectations (15% of exam)**

**What You Need to Know:**
- Available assertion methods
- Soft assertions vs hard assertions
- Custom assertions
- Expectation syntax
- Common assertion patterns

**Sample Questions:**

1. **What's the difference between toHaveText and toContainText?**
   - A) They're identical
   - B) toHaveText matches exact text, toContainText partial ✅ (CORRECT)
   - C) toContainText only works with arrays
   - D) No practical difference

2. **How do you perform a soft assertion?**
   ```typescript
   expect.soft(element).toBeVisible();  // ✅ Continues on failure
   await expect(element).toBeVisible(); // ❌ Hard - stops on failure
   ```

3. **Which assertion checks visibility?**
   - A) `toBeVisible()` ✅ (CORRECT)
   - B) `toExist()`
   - C) `toBePresent()`
   - D) `toBeInViewport()`

**Key Concepts:**
```typescript
// Element assertions
await expect(page.locator('button')).toBeVisible();
await expect(page.locator('button')).toBeEnabled();
await expect(page.locator('button')).toHaveText('Click me');
await expect(page.locator('button')).toHaveAttribute('disabled');

// Page assertions
await expect(page).toHaveTitle(/Home/);
await expect(page).toHaveURL(/example.com/);

// List assertions
await expect(page.locator('li')).toHaveCount(3);
await expect(page.locator('li')).toContainText(['item1', 'item2']);

// Soft assertions (non-blocking)
expect.soft(page.locator('button')).toBeVisible();
expect.soft(page.locator('button')).toBeEnabled();
// Test continues even if soft assertion fails
```

---

#### **Topic 4: Test Organization & Fixtures (20% of exam)**

**What You Need to Know:**
- Test structure (describe, test blocks)
- Setup and teardown (beforeEach, afterEach)
- Fixtures concept and usage
- Page object model basics
- Parallel execution

**Sample Questions:**

1. **What's a fixture in Playwright?**
   - A) Test data
   - B) Reusable test setup with automatic cleanup ✅ (CORRECT)
   - C) CSS styling
   - D) Element selector

2. **How do you create a custom fixture?**
   ```typescript
   test.extend({
     authenticatedPage: async ({ page }, use) => {
       // Setup
       await page.goto('/login');
       await page.fill('input[name="user"]', 'test');
       await page.fill('input[name="pass"]', 'pass');
       await page.click('button[type="submit"]');
       
       // Use
       await use(page);
       
       // Cleanup
       await page.close();
     }
   });
   ```

3. **What's the correct order of test hooks?**
   - A) beforeAll, beforeEach, test, afterEach, afterAll ✅ (CORRECT)
   - B) beforeEach, test, afterEach
   - C) beforeAll, test, afterAll
   - D) No specific order

**Key Concepts:**
```typescript
// Basic test structure
test.describe('User Login', () => {
  let loginPage: LoginPage;

  test.beforeAll(async () => {
    // Runs once before all tests in describe block
  });

  test.beforeEach(async ({ page }) => {
    // Runs before each test
    loginPage = new LoginPage(page);
    await loginPage.navigateTo();
  });

  test('valid login', async () => {
    // Test implementation
  });

  test.afterEach(async () => {
    // Cleanup after each test
  });

  test.afterAll(async () => {
    // Cleanup once after all tests
  });
});

// Custom fixture
test.extend({
  loginPage: async ({ page }, use) => {
    const login = new LoginPage(page);
    await login.navigateTo();
    await use(login);
  }
});
```

---

#### **Topic 5: Synchronization & Waits (20% of exam)**

**What You Need to Know:**
- Auto-wait mechanism in Playwright
- Explicit waits (waitForSelector, waitForFunction)
- Handling dynamic content
- Network waits
- Flaky test solutions

**Sample Questions:**

1. **Does Playwright auto-wait for elements?**
   - A) No, you must always use explicit waits
   - B) Yes, it waits up to timeout value ✅ (CORRECT)
   - C) Only for visible elements
   - D) Only in headed mode

2. **How long does Playwright wait by default?**
   - A) 5 seconds
   - B) 10 seconds
   - C) 30 seconds ✅ (CORRECT)
   - D) 60 seconds

3. **What's the best way to wait for dynamic content?**
   - A) `page.waitForTimeout(1000)` ❌ (Bad - flaky)
   - B) `page.waitForSelector('.dynamic-element')` ✅ (Good)
   - C) `page.waitForFunction(() => ...)` ✅ (Best)
   - D) Add arbitrary delays

**Key Concepts:**
```typescript
// Auto-wait (Playwright does this automatically)
await page.click('button'); // Waits for button to be clickable
await page.fill('input', 'text'); // Waits for input to be visible

// Explicit waits when needed
await page.waitForSelector('.modal');
await page.waitForURL(/checkout/);
await page.waitForFunction(() => {
  return document.querySelectorAll('.item').length > 0;
});

// Network waits
const [popup] = await Promise.all([
  page.waitForPopup(),
  page.click('button[onclick="openPopup()"]')
]);

// Handling flaky tests
await page.locator('.dynamic').waitFor({ state: 'attached' });
await expect(page.locator('.dynamic')).toBeVisible({ timeout: 10000 });
```

---

### **LambdaTest Playwright Practice Test**

**Instructions:** Answer all 30 questions. Aim for 80%+ (24 correct).

#### **Question Set 1-10 (Fundamentals)**

1. Which package manager command initializes a Playwright project?
   - A) `npm create playwright`
   - B) `npm init playwright@latest` ✅
   - C) `npm install playwright`
   - D) `npm setup playwright`

2. What's the default number of workers for parallel execution?
   - A) 1
   - B) 2
   - C) Number of CPU cores ✅
   - D) 4

3. Which browser engines does Playwright support?
   - A) Only Chromium
   - B) Chromium, Firefox, WebKit ✅
   - C) Chromium and Firefox only
   - D) Firefox and Safari only

4. What file contains Playwright configuration?
   - A) playwright.json
   - B) playwright.config.ts ✅
   - C) config.json
   - D) .playwrightrc

5. How do you run Playwright tests in headed mode?
   - A) `playwright test --headed` ✅
   - B) `playwright test --show`
   - C) `playwright test --visible`
   - D) `playwright test --browser`

6. Which assertion method checks if element is visible?
   - A) `toBeShown()`
   - B) `toBeVisible()` ✅
   - C) `toBeDisplayed()`
   - D) `toBePresent()`

7. What's the purpose of fixtures?
   - A) To store test data
   - B) To provide reusable test setup ✅
   - C) To define selectors
   - D) To report results

8. How do you skip a test in Playwright?
   - A) `test.skip('name', ...)`  ✅
   - B) `test.ignore('name', ...)`
   - C) `test.disable('name', ...)`
   - D) `// comment out`

9. What's the default test timeout?
   - A) 5000ms
   - B) 10000ms
   - C) 30000ms ✅
   - D) 60000ms

10. Which locator method is most accessible?
    - A) `getByTestId()`
    - B) `getByRole()` ✅
    - C) `getByXPath()`
    - D) `getByCSS()`

#### **Question Set 11-20 (Selectors & Actions)**

11. How do you find an element by accessible name?
    - A) `getByName()`
    - B) `getByLabel()` ✅
    - C) `getByAriaLabel()`
    - D) `getByTitle()`

12. What's returned by `page.locator()`?
    - A) HTMLElement
    - B) Locator object ✅
    - C) Array of elements
    - D) Boolean

13. How do you chain multiple actions?
    - A) Using `.then()` chains
    - B) Using `await` for each action
    - C) Using `.and()` method
    - D) Using `async/await` syntax ✅

14. What does `toHaveText()` check?
    - A) Partial text match
    - B) Exact text match ✅
    - C) Case-insensitive match
    - D) Regular expression match

15. How do you fill a form field?
    - A) `page.type(selector, text)`
    - B) `page.fill(selector, text)` ✅
    - C) `page.setText(selector, text)`
    - D) `page.input(selector, text)`

16. What's a soft assertion?
    - A) Weak assertion that's unreliable
    - B) Assertion that doesn't stop test on failure ✅
    - C) Assertion used only for logging
    - D) Assertion with timeout

17. How do you handle multiple pages?
    - A) Using `page1`, `page2` variables
    - B) Using context pages
    - C) Using `Promise.all()` ✅
    - D) Not possible

18. What's the purpose of `page.waitForNavigation()`?
    - A) Wait for page load
    - B) Wait for URL change ✅
    - C) Wait for element to appear
    - D) Wait for network requests

19. How do you take a screenshot?
    - A) `page.screenshot()` ✅
    - B) `page.capture()`
    - C) `page.saveImage()`
    - D) `page.takeScreenshot()`

20. What does `beforeEach` do?
    - A) Runs once before all tests
    - B) Runs before each test ✅
    - C) Runs after each test
    - D) Runs conditionally

#### **Question Set 21-30 (Advanced)**

21. How do you mock network responses?
    - A) `page.route()` ✅
    - B) `page.mock()`
    - C) `page.intercept()`
    - D) `page.stub()`

22. What's the Page Object Model?
    - A) A way to organize test data
    - B) Design pattern for encapsulating page elements ✅
    - C) A reporting format
    - D) A browser automation tool

23. How do you parallelize tests?
    - A) Using `workers` configuration ✅
    - B) Using `parallel` flag
    - C) Using `threads`
    - D) Using `Promise.all()`

24. What's a spy in Playwright testing?
    - A) Hidden element tracker
    - B) Network request/response tracker ✅
    - C) User activity tracker
    - D) Performance monitor

25. How do you handle file uploads?
    - A) `page.uploadFile()` ✅
    - B) `page.attach()`
    - C) `page.sendFile()`
    - D) `page.addFile()`

26. What's visual regression testing?
    - A) Testing color schemes
    - B) Comparing screenshots for UI changes ✅
    - C) Testing CSS properties
    - D) Testing animations

27. How do you record test videos?
    - A) Manual video recording
    - B) Using `video: true` in config ✅
    - C) Using third-party tools
    - D) Not possible

28. What's a context in Playwright?
    - A) Test scope
    - B) Isolated browser environment ✅
    - C) Configuration object
    - D) Error handling mechanism

29. How do you persist authentication?
    - A) Using `storageState` ✅
    - B) Using cookies manually
    - C) Using session variables
    - D) Not recommended

30. What does `expect.extend()` do?
    - A) Extends test duration
    - B) Creates custom assertions ✅
    - C) Extends test data
    - D) Extends fixtures

---

### **Answer Key: Playwright Practice Test**

1. B | 2. C | 3. B | 4. B | 5. A | 6. B | 7. B | 8. A | 9. C | 10. B |
11. B | 12. B | 13. D | 14. B | 15. B | 16. B | 17. C | 18. B | 19. A | 20. B |
21. A | 22. B | 23. A | 24. B | 25. A | 26. B | 27. B | 28. B | 29. A | 30. B |

**Scoring:**
- 24-30: Ready for certification ✅
- 20-23: Review weak areas
- Below 20: More study needed

---

## 🎭 **Cypress Certification (Day 22 Prep)**

### **Exam Topics Coverage**

Similar structure to Playwright but with Cypress-specific nuances:

#### **Topic 1: Cypress Fundamentals**

**Key Differences from Playwright:**
- Cypress runs in the same process as the browser
- No page objects by default
- Different command syntax
- Better debugging experience
- Limited multi-tab/window support

**Sample Questions:**

1. **What's unique about Cypress execution?**
   - A) Client-side scripting language
   - B) Runs in same JavaScript runtime as app ✅
   - C) Runs in separate process
   - D) Cloud-only execution

2. **Default timeout in Cypress?**
   - A) 4000ms
   - B) 5000ms ✅
   - C) 10000ms
   - D) 30000ms

---

#### **Topic 2: Cypress Selectors & Commands**

**Key Commands:**
```javascript
// Navigation
cy.visit('https://example.com');
cy.go('back');
cy.reload();

// Element selection
cy.get('button');
cy.contains('Login');
cy.get('[data-test="submit"]');

// Actions
cy.click();
cy.type('text');
cy.select('option');
cy.check(); // checkbox/radio
cy.uncheck();
cy.submit();

// Assertions
cy.get('element').should('be.visible');
cy.get('element').should('contain', 'text');
cy.get('element').should('have.class', 'active');
```

---

#### **Topic 3: Cypress Best Practices**

**What to Know:**
- Avoiding waits (use implicit waits)
- Element visibility and clickability
- Custom commands in `/support/commands.js`
- Aliases for reusable selectors
- Proper async handling

**Sample Questions:**

1. **Should you use cy.wait()?**
   - A) Yes, always for reliability
   - B) No, Cypress auto-waits ✅
   - C) Only for network requests
   - D) Depends on browser

2. **How do you create custom command?**
   ```javascript
   Cypress.Commands.add('login', (username, password) => {
     cy.get('#username').type(username);
     cy.get('#password').type(password);
     cy.get('button[type="submit"]').click();
   });
   ```

---

### **LambdaTest Cypress Practice Test (30 Questions)**

[Similar structure to Playwright test with Cypress-specific questions]

**Topics covered:**
- Installation and setup
- Selector strategies in Cypress
- Command chaining
- Assertions in Cypress
- Custom commands
- Fixtures and aliasing
- Network mocking
- Plugin usage
- Best practices
- Debugging

---

## 📚 **Pre-Exam Study Tips**

### **1 Week Before Exam**

**Monday-Wednesday:**
- Review all topic areas
- Take 2 practice tests
- Note weak areas

**Thursday-Friday:**
- Deep dive into weak topics
- Take 1 full practice test
- Review answers

**Saturday-Sunday:**
- Light review of key concepts
- Get adequate sleep
- Light practice

---

## ⏰ **Exam Day Strategy**

### **Before Starting (5 minutes)**
- Read all instructions carefully
- Note time remaining
- Identify your weakest topic areas

### **During Exam (55 minutes)**
- Easy questions first (2 mins each)
- Medium questions second (3-4 mins each)
- Difficult questions last (4-5 mins each)

### **Time Allocation**
- Reading: 30 seconds per question
- Answering: 1-3 minutes per question
- Review: 5 minutes at end

### **Guessing Strategy**
- Eliminate obviously wrong answers
- Look for patterns in correct answers
- Make educated guesses (not random)

---

## 🎯 **Success Checklist**

Before certification exam:

- [ ] Completed all course materials
- [ ] Taken full practice test (scored 80%+)
- [ ] Reviewed weak topic areas
- [ ] Created flashcards of key concepts
- [ ] Practiced in IDE (not just reading)
- [ ] Got 7+ hours sleep night before
- [ ] Reviewed exam format and instructions
- [ ] Ate healthy meal before exam
- [ ] Mentally prepared and confident

---

## 📞 **Official Resources**

**LambdaTest Certification Pages:**
- Playwright 101: https://lambdatest.com/certifications/playwright-101
- Cypress 101: https://lambdatest.com/certifications/cypress-101

**Official Documentation:**
- Playwright: https://playwright.dev
- Cypress: https://docs.cypress.io
- LambdaTest: https://www.lambdatest.com/learning-hub

---

## 🏆 **Post-Certification**

**After passing:**
1. Add certification to LinkedIn
2. Update resume with certification date
3. Share badge on GitHub profile
4. Mention in job applications
5. Use as portfolio validation

---

**Good luck with your certifications!** 🚀

---

*Last Updated: December 12, 2025*  
*Certification Guide v1.0*
