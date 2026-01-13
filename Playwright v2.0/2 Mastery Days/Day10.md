# Day 10: Waits & Synchronization - Building Reliable Tests

**Date:** Day 10 of 25  
**Duration:** 8 hours  
**Difficulty:** Advanced  
**Focus Area:** Test Reliability & Robustness

---

## 🎯 **Learning Objectives**

By the end of Day 10, you will:

✅ Understand synchronization problems in testing  
✅ Master Playwright's built-in waits  
✅ Implement explicit wait strategies  
✅ Create custom wait conditions  
✅ Handle dynamic content and AJAX  
✅ Prevent and debug flaky tests  
✅ Wait for API responses and network  
✅ Implement timeouts and retries  

---

## ⏰ **Daily Schedule (8 Hours)**

| Time | Activity | Duration |
|------|----------|----------|
| 8:00 - 8:30 | Review Day 06-09 & objectives | 30 min |
| 8:30 - 10:30 | **Theory Session 1:** Synchronization Problems & Solutions | 2 hours |
| 10:30 - 11:00 | Break | 30 min |
| 11:00 - 1:00 PM | **Exercise Session 1:** Explicit Waits & Conditions | 2 hours |
| 1:00 - 2:00 PM | Lunch break | 1 hour |
| 2:00 - 4:00 PM | **Theory Session 2:** Advanced Wait Strategies | 2 hours |
| 4:00 - 4:30 PM | Break | 30 min |
| 4:30 - 6:30 PM | **Exercise Session 2:** Complex Scenarios & Debugging | 2 hours |

---

## 📚 **THEORY SESSION 1: Synchronization Problems & Solutions (2 hours)**

### **Part 10.1: Why Waits Matter**

```typescript
// ❌ PROBLEM: Without proper waits, tests are flaky
test('flaky test without waits', async ({ page }) => {
  await page.goto('https://example.com');
  
  // Click button that triggers AJAX request
  await page.click('button.load-data');
  
  // Data might not be loaded yet!
  const data = page.locator('.data-container');
  // This might fail randomly - race condition!
  await expect(data).toBeVisible();
});

// ✅ SOLUTION: Use proper waits
test('reliable test with waits', async ({ page }) => {
  await page.goto('https://example.com');
  
  await page.click('button.load-data');
  
  // Wait for element to appear
  const data = page.locator('.data-container');
  await expect(data).toBeVisible(); // Playwright waits automatically!
  
  // Or wait for specific condition
  await page.waitForSelector('.data-loaded');
});
```

#### **Why Tests Fail:**

```
❌ Race Conditions
  - Element not yet loaded
  - AJAX request not complete
  - Page still loading
  - Animation in progress

❌ Timing Issues
  - Hard-coded delays (flaky!)
  - Network speed variations
  - Server response times
  - Resource loading

❌ State Problems
  - Element hidden initially
  - Element removed from DOM
  - Page navigation delayed
  - Modal not yet visible
```

---

### **Part 10.2: Built-in Playwright Waits**

Playwright has smart, automatic waits:

```typescript
test('playwright auto waits', async ({ page }) => {
  // Auto-wait 1: goto waits for page load
  await page.goto('https://example.com');
  
  // Auto-wait 2: click waits for element to be clickable
  await page.click('button');
  
  // Auto-wait 3: fill waits for input to be visible
  await page.fill('input', 'text');
  
  // Auto-wait 4: expect waits for condition
  await expect(page.locator('.message')).toBeVisible();
  
  // These all wait automatically!
  // Default timeout: 30 seconds (configurable)
});
```

#### **What Playwright Auto-Waits For:**

```typescript
test('auto wait conditions', async ({ page }) => {
  // 1. Element is attached to DOM
  // 2. Element is visible (not hidden by CSS)
  // 3. Element is stable (not moving)
  // 4. Element is enabled (not disabled)
  // 5. No other elements cover it
  
  // Example: click() waits for all these
  await page.click('button');
  
  // If any condition fails, retries until timeout
  // Default timeout: 30 seconds
});
```

---

### **Part 10.3: Explicit Waits**

When you need more control:

```typescript
test('explicit waits', async ({ page }) => {
  // Wait for element to exist
  await page.waitForSelector('.data-loaded');
  
  // Wait for element to be visible
  const element = page.locator('.message');
  await element.waitFor({ state: 'visible' });
  
  // Wait for element to be hidden
  await element.waitFor({ state: 'hidden' });
  
  // Wait for element to be attached (in DOM)
  await element.waitFor({ state: 'attached' });
  
  // Wait with custom timeout
  await page.waitForSelector('.slow-element', { timeout: 60000 });
});
```

#### **Wait States:**

```typescript
test('wait for different states', async ({ page }) => {
  const element = page.locator('.dynamic-element');
  
  // Wait for element to appear
  await element.waitFor({ state: 'visible', timeout: 5000 });
  
  // Wait for element to disappear
  await element.waitFor({ state: 'hidden', timeout: 5000 });
  
  // Wait for element to be in DOM (even if hidden)
  await element.waitFor({ state: 'attached', timeout: 5000 });
  
  // Wait for element to be removed from DOM
  await element.waitFor({ state: 'detached', timeout: 5000 });
});
```

---

### **Part 10.4: Custom Wait Conditions**

For complex scenarios:

```typescript
test('custom wait conditions', async ({ page }) => {
  // Wait for function to return true
  await page.waitForFunction(() => {
    return document.querySelectorAll('.item').length > 5;
  });
  
  // Wait for element count
  const items = page.locator('.item');
  await page.waitForFunction(() => {
    return items.count() > 5;
  });
  
  // Wait for specific text
  await page.waitForFunction(() => {
    const element = document.querySelector('.status');
    return element?.textContent?.includes('Ready');
  });
  
  // Wait for API response
  await page.waitForFunction(() => {
    return (window as any).apiResponse !== undefined;
  });
});
```

#### **Wait for Navigation:**

```typescript
test('wait for navigation', async ({ page }) => {
  // Click button that triggers navigation
  await Promise.all([
    page.waitForNavigation(),
    page.click('button.navigate'),
  ]);
  
  // Or wait with specific URL pattern
  await Promise.all([
    page.waitForNavigation({ url: /.*\/dashboard/ }),
    page.click('button'),
  ]);
  
  // Or specify load state
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle' }),
    page.click('button'),
  ]);
});
```

---

### **Part 10.5: Timeout Configuration**

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    // Global timeout for navigation
    navigationTimeout: 30000,
    
    // Global timeout for actions
    actionTimeout: 10000,
  },
  
  timeout: 30000, // Per test timeout
  
  expect: {
    timeout: 5000, // Per assertion timeout
  },
});

test('override timeouts', async ({ page }) => {
  // Override action timeout
  await page.click('button', { timeout: 60000 });
  
  // Override wait timeout
  await page.waitForSelector('.element', { timeout: 60000 });
  
  // Override assertion timeout
  await expect(page.locator('h1')).toBeVisible({ timeout: 10000 });
});
```

---

## 🔨 **EXERCISE SESSION 1 (2 hours)**

### **Exercise 10.1: Explicit Wait Scenarios**

**Objective:** Master explicit wait strategies

**Task:**
```typescript
// Test scenarios requiring explicit waits:
// 1. AJAX loaded content
// 2. Dynamically added elements
// 3. Modal dialogs
// 4. Page navigation
// 5. Element state changes
```

**Solution:**

```typescript
// tests/10-explicit-waits.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Explicit Wait Scenarios', () => {
  
  test('wait for AJAX loaded content', async ({ page }) => {
    await page.setContent(`
      <button id="load-btn">Load Data</button>
      <div id="data-container"></div>
      <script>
        document.getElementById('load-btn').addEventListener('click', () => {
          setTimeout(() => {
            document.getElementById('data-container').innerHTML = 'Data loaded!';
          }, 2000);
        });
      </script>
    `);
    
    // Click button that triggers AJAX
    await page.click('#load-btn');
    
    // Wait for content to appear
    const container = page.locator('#data-container');
    await container.waitFor({ state: 'visible' });
    
    // Or use text content wait
    await page.waitForFunction(() => {
      const element = document.getElementById('data-container');
      return element?.textContent?.includes('Data loaded');
    });
    
    const text = await container.textContent();
    expect(text).toBe('Data loaded!');
  });
  
  test('wait for dynamically added elements', async ({ page }) => {
    await page.setContent(`
      <button id="add-btn">Add Item</button>
      <ul id="list"></ul>
      <script>
        let itemCount = 0;
        document.getElementById('add-btn').addEventListener('click', () => {
          itemCount++;
          setTimeout(() => {
            const item = document.createElement('li');
            item.textContent = 'Item ' + itemCount;
            document.getElementById('list').appendChild(item);
          }, 1000);
        });
      </script>
    `);
    
    // Add first item
    await page.click('#add-btn');
    
    // Wait for specific item to appear
    await page.waitForSelector('li');
    
    let items = page.locator('li');
    let count = await items.count();
    expect(count).toBe(1);
    
    // Add second item
    await page.click('#add-btn');
    
    // Wait for second item
    await page.waitForFunction(() => {
      const items = document.querySelectorAll('li');
      return items.length === 2;
    });
    
    items = page.locator('li');
    count = await items.count();
    expect(count).toBe(2);
  });
  
  test('wait for modal dialog to appear', async ({ page }) => {
    await page.setContent(`
      <button id="modal-btn">Open Modal</button>
      <div id="modal" style="display: none;" class="modal">
        <h2>Modal Title</h2>
        <button id="close-btn">Close</button>
      </div>
      <script>
        document.getElementById('modal-btn').addEventListener('click', () => {
          setTimeout(() => {
            document.getElementById('modal').style.display = 'block';
          }, 500);
        });
        document.getElementById('close-btn').addEventListener('click', () => {
          document.getElementById('modal').style.display = 'none';
        });
      </script>
    `);
    
    // Click to open modal
    await page.click('#modal-btn');
    
    // Wait for modal to be visible
    const modal = page.locator('#modal');
    await modal.waitFor({ state: 'visible' });
    
    // Verify modal is visible
    await expect(modal).toBeVisible();
    
    // Close modal
    await page.click('#close-btn');
    
    // Wait for modal to be hidden
    await modal.waitFor({ state: 'hidden' });
  });
  
  test('wait for page navigation', async ({ page }) => {
    await page.setContent(`
      <button id="nav-btn">Navigate</button>
      <script>
        document.getElementById('nav-btn').addEventListener('click', () => {
          setTimeout(() => {
            window.location.href = 'about:blank';
          }, 500);
        });
      </script>
    `);
    
    // Wait for navigation
    await Promise.all([
      page.waitForNavigation(),
      page.click('#nav-btn'),
    ]);
    
    // Verify navigation happened
    const url = page.url();
    expect(url).toBe('about:blank');
  });
  
  test('wait for element state changes', async ({ page }) => {
    await page.setContent(`
      <button id="state-btn">Change State</button>
      <div id="status" style="display: none;">Ready!</div>
      <script>
        document.getElementById('state-btn').addEventListener('click', () => {
          setTimeout(() => {
            document.getElementById('status').style.display = 'block';
          }, 1500);
        });
      </script>
    `);
    
    const status = page.locator('#status');
    
    // Initially hidden
    await expect(status).not.toBeVisible();
    
    // Click to trigger state change
    await page.click('#state-btn');
    
    // Wait for element to become visible
    await status.waitFor({ state: 'visible' });
    
    // Now visible
    await expect(status).toBeVisible();
  });
});
```

---

### **Exercise 10.2: Custom Wait Functions**

**Objective:** Create reusable wait helpers

**Task:**
```typescript
// Create utility functions for:
// 1. Wait for text to appear
// 2. Wait for element count
// 3. Wait for specific value in input
// 4. Wait for API to be called
// 5. Wait for multiple elements
```

**Solution:**

```typescript
// utils/wait-helpers.ts
import { Page, Locator, expect } from '@playwright/test';

export class WaitHelpers {
  constructor(private page: Page) {}
  
  // Wait for text to appear anywhere on page
  async waitForText(text: string, timeout = 5000) {
    await this.page.waitForFunction(
      (textToFind) => {
        return document.body.innerText.includes(textToFind);
      },
      text,
      { timeout }
    );
  }
  
  // Wait for specific element count
  async waitForElementCount(
    selector: string,
    expectedCount: number,
    timeout = 5000
  ) {
    await this.page.waitForFunction(
      ({ selector, count }) => {
        return document.querySelectorAll(selector).length === count;
      },
      { selector, count: expectedCount },
      { timeout }
    );
  }
  
  // Wait for input value to be set
  async waitForInputValue(
    inputLocator: Locator,
    expectedValue: string,
    timeout = 5000
  ) {
    await this.page.waitForFunction(
      ({ value, expected }) => {
        const input = document.querySelector('input') as any;
        return input?.value === expected;
      },
      { value: expectedValue, expected: expectedValue },
      { timeout }
    );
  }
  
  // Wait for element to have specific class
  async waitForClass(
    locator: Locator,
    className: string,
    timeout = 5000
  ) {
    await this.page.waitForFunction(
      ({ className }) => {
        const element = document.querySelector('[data-testid="element"]');
        return element?.classList.contains(className);
      },
      { className },
      { timeout }
    );
  }
  
  // Wait for multiple elements to be ready
  async waitForMultipleElements(
    locators: Locator[],
    timeout = 5000
  ) {
    for (const locator of locators) {
      await locator.waitFor({ state: 'visible', timeout });
    }
  }
  
  // Wait for loading spinner to disappear
  async waitForLoadingComplete(timeout = 10000) {
    const spinner = this.page.locator('.spinner, .loading');
    try {
      await spinner.waitFor({ state: 'hidden', timeout });
    } catch {
      // Spinner might not exist, that's ok
    }
  }
}

// tests/10-custom-waits.spec.ts
import { test } from '@playwright/test';
import { WaitHelpers } from '../utils/wait-helpers';

test('use custom wait helpers', async ({ page }) => {
  await page.goto('https://example.com');
  
  const waits = new WaitHelpers(page);
  
  // Wait for specific text
  await waits.waitForText('Welcome');
  
  // Wait for elements
  await waits.waitForElementCount('.item', 5);
  
  // Wait for loading to complete
  await waits.waitForLoadingComplete();
});
```

---

## 📚 **THEORY SESSION 2: Advanced Wait Strategies (2 hours)**

### **Part 10.6: Network-Based Waits**

```typescript
test('wait for network requests', async ({ page }) => {
  // Wait for specific request
  const requestPromise = page.waitForRequest(
    request => request.url().includes('/api/data')
  );
  
  await page.click('button.load-data');
  
  const request = await requestPromise;
  console.log(`API called: ${request.url()}`);
  
  // Wait for response
  const responsePromise = page.waitForResponse(
    response => response.url().includes('/api/data') && response.status() === 200
  );
  
  const response = await responsePromise;
  const data = await response.json();
  console.log('Response data:', data);
});
```

#### **Wait for All Network:**

```typescript
test('wait for network to be idle', async ({ page }) => {
  // Wait for all network requests to complete
  await page.goto('https://example.com', { waitUntil: 'networkidle' });
  
  // Click and wait for network to settle
  await page.click('button');
  await page.waitForLoadState('networkidle');
  
  // Now safe to assert
  const content = page.locator('.loaded-content');
  await content.waitFor({ state: 'visible' });
});
```

---

### **Part 10.7: Debugging Waits**

```typescript
test('debug wait timeouts', async ({ page }) => {
  try {
    // This might timeout
    await page.waitForSelector('.element-that-never-appears', { 
      timeout: 5000 
    });
  } catch (error) {
    console.error('Element never appeared!');
    
    // Debug: take screenshot
    await page.screenshot({ path: 'debug-wait-timeout.png' });
    
    // Debug: log page content
    const html = await page.content();
    console.log('Page HTML:', html);
    
    // Debug: check if element exists anywhere
    const allElements = page.locator('*');
    const count = await allElements.count();
    console.log(`Total elements: ${count}`);
    
    throw error;
  }
});
```

#### **Enable Debug Logging:**

```bash
# Run with debug logs
PWDEBUG=1 npm test

# Or in code
test('with debug', async ({ page }) => {
  // Add debug output
  page.on('request', request => console.log('Request:', request.url()));
  page.on('response', response => console.log('Response:', response.status()));
  
  await page.goto('https://example.com');
});
```

---

### **Part 10.8: Preventing Flaky Tests**

```typescript
test('avoid common flakiness issues', async ({ page }) => {
  // ❌ DON'T: Hard-coded delays
  // await page.waitForTimeout(2000); // FLAKY!
  
  // ✅ DO: Use Playwright waits
  const element = page.locator('.content');
  await element.waitFor({ state: 'visible' });
  
  // ❌ DON'T: Check multiple elements separately
  // await expect(element1).toBeVisible();
  // await expect(element2).toBeVisible(); // Might not all be ready
  
  // ✅ DO: Wait for all together
  const elements = page.locator('.item');
  await page.waitForFunction(() => {
    return document.querySelectorAll('.item').length >= 3;
  });
  
  // ❌ DON'T: Race conditions
  // await page.click('button');
  // await expect(modal).toBeVisible(); // Modal might not be ready
  
  // ✅ DO: Chain waits properly
  await page.click('button');
  const modal = page.locator('.modal');
  await modal.waitFor({ state: 'visible' });
  
  // ❌ DON'T: Rely on text that might change
  // const text = await page.locator('h1').textContent();
  // expect(text).toBe('Loading...'); // Text might change before assertion
  
  // ✅ DO: Wait for final state
  await page.waitForFunction(() => {
    return document.querySelector('h1')?.textContent === 'Ready';
  });
});
```

---

### **Part 10.9: Race Condition Prevention**

```typescript
test('handle race conditions', async ({ page }) => {
  // PROBLEM: Race between navigation and action
  // await page.click('link'); // Might navigate before we're ready
  // await expect(page.locator('h1')).toBeVisible(); // Page might change
  
  // SOLUTION: Wait for navigation explicitly
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
    page.click('link'),
  ]);
  
  // Now safe - we know navigation is complete
  const heading = page.locator('h1');
  await expect(heading).toBeVisible();
  
  // PROBLEM: Multiple updates at once
  // await page.click('delete-btn');
  // await expect(list).not.toContainText('item'); // Might still be there
  
  // SOLUTION: Wait for specific state
  await page.click('delete-btn');
  await page.waitForFunction(() => {
    const items = document.querySelectorAll('.item');
    return items.length === 0;
  });
});
```

---

## 🔨 **EXERCISE SESSION 2 (2 hours)**

### **Exercise 10.3: Real-World Wait Scenarios**

**Objective:** Handle complex real-world scenarios

**Task:**
```typescript
// Test scenarios:
// 1. E-commerce: Wait for cart update via AJAX
// 2. Search: Wait for results to load and filter
// 3. Login: Wait for redirect and session
// 4. Data table: Wait for sorting/pagination
// 5. Form: Wait for validation messages
```

**Solution:**

```typescript
// tests/10-real-world-waits.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Real-World Wait Scenarios', () => {
  
  test('e-commerce: add to cart and verify update', async ({ page }) => {
    await page.setContent(`
      <button id="add-cart">Add to Cart</button>
      <div id="cart-count" data-count="0">0</div>
      <div id="loading" style="display:none">Updating...</div>
      <script>
        document.getElementById('add-cart').addEventListener('click', () => {
          document.getElementById('loading').style.display = 'block';
          setTimeout(() => {
            document.getElementById('cart-count').dataset.count = '1';
            document.getElementById('cart-count').textContent = '1';
            document.getElementById('loading').style.display = 'none';
          }, 1500);
        });
      </script>
    `);
    
    // Add to cart
    await page.click('#add-cart');
    
    // Wait for loading to appear and disappear
    const loading = page.locator('#loading');
    await loading.waitFor({ state: 'visible' });
    await loading.waitFor({ state: 'hidden' });
    
    // Verify cart count updated
    const cartCount = page.locator('#cart-count');
    await page.waitForFunction(() => {
      const element = document.getElementById('cart-count');
      return element?.dataset.count === '1';
    });
    
    const count = await cartCount.textContent();
    expect(count).toBe('1');
  });
  
  test('search: wait for results with filter', async ({ page }) => {
    await page.setContent(`
      <input id="search" placeholder="Search...">
      <div id="results" style="display:none"></div>
      <script>
        let timeout;
        document.getElementById('search').addEventListener('input', (e) => {
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            const query = e.target.value;
            const results = document.getElementById('results');
            results.innerHTML = '<div class="item">Result for: ' + query + '</div>';
            results.style.display = 'block';
          }, 1000);
        });
      </script>
    `);
    
    // Type search query
    const searchInput = page.locator('#search');
    await searchInput.fill('laptop');
    
    // Wait for results to appear
    const results = page.locator('#results');
    await results.waitFor({ state: 'visible' });
    
    // Verify result text
    await expect(results).toContainText('Result for: laptop');
  });
  
  test('login: wait for redirect after authentication', async ({ page }) => {
    await page.setContent(`
      <input id="user" placeholder="Username">
      <input id="pass" placeholder="Password">
      <button id="login">Login</button>
      <script>
        document.getElementById('login').addEventListener('click', () => {
          setTimeout(() => {
            window.location.href = 'about:blank#/dashboard';
          }, 1500);
        });
      </script>
    `);
    
    // Fill login form
    await page.fill('#user', 'admin');
    await page.fill('#pass', 'password');
    
    // Click login and wait for navigation
    await Promise.all([
      page.waitForNavigation(),
      page.click('#login'),
    ]);
    
    // Verify we're redirected
    const url = page.url();
    expect(url).toContain('dashboard');
  });
  
  test('data table: wait for sort/pagination', async ({ page }) => {
    await page.setContent(`
      <button id="sort-btn">Sort by Name</button>
      <table>
        <tbody id="table-body">
          <tr><td>Charlie</td></tr>
          <tr><td>Alice</td></tr>
          <tr><td>Bob</td></tr>
        </tbody>
      </table>
      <script>
        document.getElementById('sort-btn').addEventListener('click', () => {
          setTimeout(() => {
            const tbody = document.getElementById('table-body');
            const rows = Array.from(tbody.querySelectorAll('tr'));
            rows.sort((a, b) => {
              const textA = a.textContent || '';
              const textB = b.textContent || '';
              return textA.localeCompare(textB);
            });
            tbody.innerHTML = '';
            rows.forEach(row => tbody.appendChild(row));
          }, 1000);
        });
      </script>
    `);
    
    // Click sort
    await page.click('#sort-btn');
    
    // Wait for sort to complete by checking order
    await page.waitForFunction(() => {
      const rows = document.querySelectorAll('tbody tr');
      const texts = Array.from(rows).map(r => r.textContent);
      return texts[0] === 'Alice' && texts[1] === 'Bob';
    });
    
    // Verify sort results
    const firstRow = page.locator('tbody tr').first();
    const text = await firstRow.textContent();
    expect(text).toBe('Alice');
  });
  
  test('form: wait for validation messages', async ({ page }) => {
    await page.setContent(`
      <form>
        <input id="email" type="email" placeholder="Email">
        <div id="error-msg" style="display:none" class="error"></div>
      </form>
      <script>
        document.getElementById('email').addEventListener('blur', (e) => {
          const email = e.target.value;
          const msg = document.getElementById('error-msg');
          setTimeout(() => {
            if (!email.includes('@')) {
              msg.textContent = 'Invalid email';
              msg.style.display = 'block';
            } else {
              msg.style.display = 'none';
            }
          }, 800);
        });
      </script>
    `);
    
    // Enter invalid email
    const emailInput = page.locator('#email');
    await emailInput.fill('invalidemail');
    await emailInput.blur();
    
    // Wait for validation message
    const errorMsg = page.locator('#error-msg');
    await errorMsg.waitFor({ state: 'visible' });
    
    // Verify error message
    await expect(errorMsg).toContainText('Invalid email');
    
    // Fix email
    await emailInput.clear();
    await emailInput.fill('valid@example.com');
    await emailInput.blur();
    
    // Wait for error to disappear
    await errorMsg.waitFor({ state: 'hidden' });
  });
});
```

---

### **Exercise 10.4: Performance and Timeout Management**

**Objective:** Handle performance issues and timeouts

**Task:**
```typescript
// Test:
// 1. Adjust timeouts for slow operations
// 2. Implement retry logic
// 3. Handle intermittent failures
// 4. Measure wait times
```

**Solution:**

```typescript
// tests/10-timeout-management.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Timeout and Performance Management', () => {
  
  test('adjust timeout for slow operation', async ({ page }) => {
    await page.setContent(`
      <button id="slow-btn">Slow Operation</button>
      <div id="result" style="display:none">Done!</div>
      <script>
        document.getElementById('slow-btn').addEventListener('click', () => {
          setTimeout(() => {
            document.getElementById('result').style.display = 'block';
          }, 8000); // Takes 8 seconds!
        });
      </script>
    `);
    
    await page.click('#slow-btn');
    
    // Use longer timeout for slow operation
    const result = page.locator('#result');
    await result.waitFor({ state: 'visible', timeout: 15000 }); // 15 second timeout
    
    await expect(result).toBeVisible();
  });
  
  test('retry on intermittent failure', async ({ page }) => {
    let attempts = 0;
    const maxRetries = 3;
    let lastError;
    
    for (let i = 0; i < maxRetries; i++) {
      try {
        attempts++;
        
        // Simulate intermittent failure
        if (attempts < 2) {
          throw new Error('Intermittent failure');
        }
        
        // Success on second attempt
        await expect(page.locator('body')).toBeVisible();
        break;
      } catch (error) {
        lastError = error;
        console.log(`Attempt ${attempts} failed, retrying...`);
        
        if (attempts === maxRetries) {
          throw lastError;
        }
        
        // Wait before retry
        await page.waitForTimeout(1000);
      }
    }
    
    expect(attempts).toBeLessThanOrEqual(maxRetries);
  });
  
  test('measure wait time', async ({ page }) => {
    await page.setContent(`
      <button id="measure-btn">Slow Operation</button>
      <div id="result" style="display:none">Done!</div>
      <script>
        document.getElementById('measure-btn').addEventListener('click', () => {
          setTimeout(() => {
            document.getElementById('result').style.display = 'block';
          }, 2000);
        });
      </script>
    `);
    
    const startTime = Date.now();
    
    await page.click('#measure-btn');
    const result = page.locator('#result');
    await result.waitFor({ state: 'visible' });
    
    const waitTime = Date.now() - startTime;
    console.log(`Wait time: ${waitTime}ms`);
    
    // Verify it took approximately correct time
    expect(waitTime).toBeGreaterThan(1900);
    expect(waitTime).toBeLessThan(3000);
  });
  
  test('handle timeout gracefully', async ({ page }) => {
    await page.setContent(`
      <div id="never-appears"></div>
    `);
    
    try {
      // This will timeout
      await page.waitForSelector('.never-appears', { timeout: 2000 });
      
      // Should not reach here
      expect(true).toBe(false);
    } catch (error) {
      // Expected timeout error
      expect(error).toBeTruthy();
      console.log('Timeout handled gracefully');
    }
  });
});
```

---

## ❓ **Quiz: Waits & Synchronization**

**Instructions:** Answer all 10 questions. Target score: 8/10 (80%)

### **Question 1: Auto-Wait**
What does Playwright automatically wait for before clicking?
- A) Element visible and enabled ✅ **CORRECT**
- B) Page fully loaded
- C) Animation complete
- D) Network idle

**Explanation:** Playwright waits for actionability (visible, enabled, etc.).

---

### **Question 2: Default Timeout**
What is Playwright's default timeout?
- A) 5 seconds
- B) 10 seconds
- C) 30 seconds ✅ **CORRECT**
- D) 60 seconds

**Explanation:** Default is 30 seconds for most operations.

---

### **Question 3: Wait States**
What states can you wait for?
- A) visible, hidden
- B) attached, detached
- C) All of the above ✅ **CORRECT**
- D) Only visible

**Explanation:** waitFor supports: visible, hidden, attached, detached.

---

### **Question 4: Custom Wait**
What function creates custom wait conditions?
- A) `page.wait()`
- B) `page.waitForFunction()` ✅ **CORRECT**
- C) `page.waitForCondition()`
- D) `page.customWait()`

**Explanation:** `waitForFunction()` executes JavaScript to wait.

---

### **Question 5: Navigation Wait**
How do you wait for page navigation?
- A) `page.waitForNavigation()` ✅ **CORRECT**
- B) `page.waitForLoad()`
- C) `page.waitForURL()`
- D) `page.onNavigation()`

**Explanation:** `waitForNavigation()` waits for URL to change.

---

### **Question 6: Network Wait**
What does `waitUntil: 'networkidle'` do?
- A) Waits 1 second
- B) Waits for no network activity ✅ **CORRECT**
- C) Waits for page load
- D) Waits for DOM ready

**Explanation:** 'networkidle' means no pending requests.

---

### **Question 7: Hard Delays**
Should you use `page.waitForTimeout()`?
- A) Always
- B) As fallback only ✅ **CORRECT**
- C) Never
- D) For every wait

**Explanation:** Avoid hard delays - use specific waits instead.

---

### **Question 8: Race Condition**
How do you prevent race conditions?
- A) Use longer timeouts
- B) Wait for specific conditions ✅ **CORRECT**
- C) Run tests slowly
- D) Add hard delays

**Explanation:** Wait for actual conditions, not time.

---

### **Question 9: Multiple Waits**
How do you wait for multiple elements?
- A) Wait for each separately
- B) Use Promise.all() ✅ **CORRECT**
- C) Add delays between
- D) Combine into one selector

**Explanation:** Promise.all() waits for multiple async operations.

---

### **Question 10: Wait Override**
How do you override timeout for one action?
- A) Global config only
- B) Use `timeout` option ✅ **CORRECT**
- C) Set environment variable
- D) Can't override

**Explanation:** Pass `{ timeout: ms }` to override.

---

## ✅ **Quiz Answer Key**

| Q | Answer | Topic |
|---|--------|-------|
| 1 | A | Auto-wait |
| 2 | C | Default timeout |
| 3 | C | Wait states |
| 4 | B | Custom wait |
| 5 | A | Navigation |
| 6 | B | Network idle |
| 7 | B | Hard delays |
| 8 | B | Race conditions |
| 9 | B | Multiple waits |
| 10 | B | Override timeout |

**Your Score:** ___/10

**Interpretation:**
- 9-10: ✅ Wait master!
- 7-8: 🟡 Good understanding
- Below 7: 🔴 Review waits again

---

## 📋 **Daily Assignment**

### **Assignment 10.1: Build Reliable Test Suite with Waits**

**Objective:** Create robust test suite with proper synchronization

**Requirements:**
1. Implement explicit waits in all tests
2. Avoid hard-coded delays
3. Handle network operations
4. Wait for element state changes
5. Handle timeouts gracefully
6. Create wait utility functions
7. Test async scenarios
8. Measure and document waits

**Solution includes all exercises above with:**
- Custom wait helpers
- Real-world scenarios
- Timeout management
- Performance monitoring
- Flakiness prevention

---

## 🎯 **Daily Checklist**

Track your Day 10 progress:

- [ ] Reviewed Day 06-09 concepts
- [ ] Completed Theory Session 1 (Sync Problems)
- [ ] Completed Exercise 10.1 (Explicit Waits)
- [ ] Completed Exercise 10.2 (Custom Waits)
- [ ] Completed Theory Session 2 (Advanced Strategies)
- [ ] Completed Exercise 10.3 (Real-World Scenarios)
- [ ] Completed Exercise 10.4 (Timeout Management)
- [ ] Answered all 10 quiz questions
- [ ] Scored 80%+ on quiz (8/10)
- [ ] Completed Assignment 10.1 (Reliable Test Suite)
- [ ] Implemented wait helpers
- [ ] Tested async scenarios
- [ ] Committed code to GitHub
- [ ] Updated personal learning journal

**Daily Metrics:**
- Quiz Score: ___/10
- Confidence Level (1-5): ___
- Time Spent: ___ hours
- Wait strategies implemented: ___ patterns
- Tests made more reliable: ___ count
- Challenges Faced: _________________

---

## 📚 **Key Takeaways from Day 10**

1. **Playwright waits automatically** - use built-in waits first
2. **Explicit waits are powerful** - waitFor for complex scenarios
3. **Custom waits for specific logic** - waitForFunction for edge cases
4. **Avoid hard delays** - always prefer condition-based waits
5. **Network waits are crucial** - AJAX requires networkidle
6. **Timeouts must be configurable** - some operations are slow
7. **Race conditions are real** - prevent with proper waits
8. **Measure and debug** - log wait times in CI/CD

---

## 🔗 **Resources for Review**

- [Playwright Waits Documentation](https://playwright.dev/docs/actionability)
- [Synchronization Best Practices](https://playwright.dev/docs/locators#strictness)
- [Debugging Guide](https://playwright.dev/docs/debug)
- [Flaky Tests Prevention](https://playwright.dev/docs/best-practices#use-locators)

---

## 🚀 **Ready for Day 11 - Final Week 2 Day?**

By completing Day 10, you've mastered:
- ✅ Synchronization problems and solutions
- ✅ Playwright's built-in auto-waits
- ✅ Explicit wait strategies
- ✅ Custom wait conditions
- ✅ Network-based waits
- ✅ Navigation waits
- ✅ Timeout management
- ✅ Preventing flaky tests
- ✅ Debugging wait issues
- ✅ Performance measurement

**Next (Day 11 - FINAL DAY OF WEEK 2):** Test Organization!
- Fixtures and test setup
- Hooks (beforeEach, afterEach, etc.)
- Parallel execution
- Configuration
- CI/CD integration

---

**Outstanding work on Day 10, Karan!** 🎉

You've mastered the **most critical skill for production testing** - proper synchronization! Tests that wait correctly are:
- ✅ Fast (don't waste time with delays)
- ✅ Reliable (don't fail randomly)
- ✅ Maintainable (easy to understand)
- ✅ Professional (enterprise standard)

**Week 2 Status:**
- ✅ Day 06: Playwright Basics
- ✅ Day 07: Advanced Selectors
- ✅ Day 08: Advanced Interactions
- ✅ Day 09: Page Object Model
- ✅ Day 10: Waits & Synchronization (TODAY!)
- 🔜 Day 11: Test Organization (FINAL!)

**You're 1 day away from completing Week 2!** 🏁

---

*Last Updated: December 12, 2025*  
*Day 10 Complete Guide v1.0*  
*Next: Day 11 - Test Organization & Final Week 2 Mastery*

---
