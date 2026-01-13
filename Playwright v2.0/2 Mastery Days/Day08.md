# Day 08: Advanced Interactions - Clicking, Typing, Dragging & More

**Date:** Day 8 of 25  
**Duration:** 8 hours  
**Difficulty:** Intermediate-Advanced  
**Focus Area:** Complex User Interactions

---

## 🎯 **Learning Objectives**

By the end of Day 08, you will:

✅ Master click interactions (single, double, right-click)  
✅ Handle keyboard input and keyboard events  
✅ Implement drag and drop operations  
✅ Scroll pages and elements  
✅ Upload files with file inputs  
✅ Handle frames and iframes  
✅ Manage alerts, confirms, and prompts  
✅ Work with multiple tabs and windows  
✅ Interact with complex form elements  

---

## ⏰ **Daily Schedule (8 Hours)**

| Time | Activity | Duration |
|------|----------|----------|
| 8:00 - 8:30 | Review Day 06-07 & objectives | 30 min |
| 8:30 - 10:30 | **Theory Session 1:** Click & Keyboard Interactions | 2 hours |
| 10:30 - 11:00 | Break | 30 min |
| 11:00 - 1:00 PM | **Exercise Session 1:** Forms & Input Interactions | 2 hours |
| 1:00 - 2:00 PM | Lunch break | 1 hour |
| 2:00 - 4:00 PM | **Theory Session 2:** Advanced Interactions & Navigation | 2 hours |
| 4:00 - 4:30 PM | Break | 30 min |
| 4:30 - 6:30 PM | **Exercise Session 2:** Complex Scenarios | 2 hours |

---

## 📚 **THEORY SESSION 1: Click & Keyboard Interactions (2 hours)**

### **Part 8.1: Click Interactions**

#### **Basic Clicking**

```typescript
import { test, expect } from '@playwright/test';

test('click interactions', async ({ page }) => {
  await page.goto('https://example.com');
  
  // Simple click
  const button = page.locator('button');
  await button.click();
  
  // Click with coordinates (offset)
  await button.click({ position: { x: 10, y: 20 } });
  
  // Click multiple times
  await button.click({ clickCount: 3 });
  
  // Click with delay between clicks
  await button.click({ clickCount: 2, delay: 500 });
});
```

#### **Advanced Click Types**

```typescript
test('different click types', async ({ page }) => {
  await page.goto('https://example.com');
  
  const element = page.locator('button');
  
  // Double click
  await element.dblclick();
  
  // Right click (context menu)
  await element.click({ button: 'right' });
  
  // Middle click
  await element.click({ button: 'middle' });
  
  // Click with modifier keys
  await element.click({ modifiers: ['Control'] });
  await element.click({ modifiers: ['Shift'] });
  await element.click({ modifiers: ['Alt'] });
  await element.click({ modifiers: ['Meta'] }); // Command on Mac
  
  // Control+Click (open in new tab)
  await element.click({ modifiers: ['Control'] });
});
```

#### **Force Click**

```typescript
test('force click', async ({ page }) => {
  const hiddenButton = page.locator('button.hidden');
  
  // Normal click fails if element not visible
  // await hiddenButton.click(); // Will error
  
  // Force click bypasses visibility check
  await hiddenButton.click({ force: true });
  
  // Useful for:
  // - Testing hidden elements
  // - Working around JavaScript issues
  // - Testing edge cases
});
```

---

### **Part 8.2: Keyboard Interactions**

#### **Type vs Press**

```typescript
test('keyboard input methods', async ({ page }) => {
  const input = page.locator('input[type="text"]');
  
  // Type - simulates user typing with delay
  await input.type('hello world', { delay: 100 });
  
  // Fill - sets value directly (faster)
  await input.fill('hello world');
  
  // Press - press individual keys
  await input.press('Enter');
  await input.press('Tab');
  await input.press('ArrowDown');
  
  // Get current value
  const value = await input.inputValue();
  console.log(`Input value: ${value}`);
});
```

#### **Keyboard Events**

```typescript
test('keyboard events', async ({ page }) => {
  const input = page.locator('input');
  
  // Type keys with special keys
  await input.type('Control+A');  // Select all
  await input.type('Control+C');  // Copy
  await input.type('Control+V');  // Paste
  
  // Shortcuts
  await input.press('Control+KeyA'); // Ctrl+A
  await input.press('Shift+Tab');    // Shift+Tab
  await input.press('Meta+KeyQ');    // Cmd+Q (Mac)
  
  // Navigation keys
  await input.press('Home');  // Start of line
  await input.press('End');   // End of line
  await input.press('PageUp');
  await input.press('PageDown');
});
```

#### **Key List**

```typescript
// Common keys to press
const keys = [
  'Enter',
  'Tab',
  'Escape',
  'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
  'Backspace', 'Delete',
  'Home', 'End',
  'PageUp', 'PageDown',
  'Control', 'Shift', 'Alt', 'Meta',
];

test('press multiple keys', async ({ page }) => {
  const input = page.locator('input');
  
  // Clear input
  await input.press('Control+A');
  await input.press('Delete');
  
  // Type and submit
  await input.type('search query');
  await input.press('Enter');
});
```

#### **Type vs Fill Performance**

```typescript
test('input methods comparison', async ({ page }) => {
  const input = page.locator('input');
  
  // ❌ SLOW - Types every character
  const startType = Date.now();
  await input.type('This is a very long text that takes time');
  console.log(`Type took: ${Date.now() - startType}ms`);
  
  // ✅ FAST - Sets value directly
  const startFill = Date.now();
  await input.fill('This is a very long text that takes time');
  console.log(`Fill took: ${Date.now() - startFill}ms`);
  
  // Use type for testing user behavior
  // Use fill for efficiency when testing logic
});
```

---

### **Part 8.3: Text and Focus**

```typescript
test('text and focus interactions', async ({ page }) => {
  // Get text content
  const heading = page.locator('h1');
  const text = await heading.textContent();
  console.log(`Text: ${text}`);
  
  // Get inner HTML
  const html = await heading.innerHTML();
  console.log(`HTML: ${html}`);
  
  // Focus element
  const input = page.locator('input');
  await input.focus();
  
  // Blur (remove focus)
  await input.blur();
  
  // Get focus state
  const hasFocus = await input.evaluate((el: any) => 
    el === document.activeElement
  );
  console.log(`Has focus: ${hasFocus}`);
});
```

---

## 🔨 **EXERCISE SESSION 1 (2 hours)**

### **Exercise 8.1: Form Interactions**

**Objective:** Master form element interactions

**Task:**
```typescript
// Test form with:
// 1. Text inputs
// 2. Checkboxes
// 3. Radio buttons
// 4. Select dropdowns
// 5. Text areas
// 6. Form submission
```

**Solution:**

```typescript
// tests/08-form-interactions.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Form Interactions', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('https://httpbin.org/forms/post');
  });
  
  test('should fill text inputs', async ({ page }) => {
    const nameInput = page.locator('input[name="custname"]');
    
    // Clear and fill
    await nameInput.clear();
    await nameInput.fill('John Doe');
    
    // Verify value
    const value = await nameInput.inputValue();
    expect(value).toBe('John Doe');
    
    // Type with delay
    await nameInput.clear();
    await nameInput.type('Jane Smith', { delay: 50 });
  });
  
  test('should interact with checkboxes', async ({ page }) => {
    const pizzaCheckbox = page.locator('input[value="pizza"]');
    const baconCheckbox = page.locator('input[value="bacon"]');
    const cheeseCheckbox = page.locator('input[value="cheese"]');
    
    // Check multiple
    await pizzaCheckbox.check();
    await baconCheckbox.check();
    
    // Verify checked
    await expect(pizzaCheckbox).toBeChecked();
    await expect(baconCheckbox).toBeChecked();
    await expect(cheeseCheckbox).not.toBeChecked();
    
    // Uncheck
    await pizzaCheckbox.uncheck();
    await expect(pizzaCheckbox).not.toBeChecked();
    
    // Toggle
    await pizzaCheckbox.check();
    const isChecked = await pizzaCheckbox.isChecked();
    await pizzaCheckbox.setChecked(!isChecked);
  });
  
  test('should select radio buttons', async ({ page }) => {
    const maleRadio = page.locator('input[value="M"]');
    const femaleRadio = page.locator('input[value="F"]');
    
    // Select male
    await maleRadio.check();
    await expect(maleRadio).toBeChecked();
    await expect(femaleRadio).not.toBeChecked();
    
    // Switch to female
    await femaleRadio.click();
    await expect(femaleRadio).toBeChecked();
    await expect(maleRadio).not.toBeChecked();
    
    // Can't uncheck radio (must select another)
    // Radio buttons are mutually exclusive
  });
  
  test('should handle select dropdowns', async ({ page }) => {
    const sizeSelect = page.locator('select[name="size"]');
    
    // Select by value
    await sizeSelect.selectOption('large');
    
    // Verify selection
    const selected = await sizeSelect.inputValue();
    expect(selected).toBe('large');
    
    // Select by label (if visible)
    await sizeSelect.selectOption({ label: 'Small' });
    
    // Get available options
    const options = await page.locator('select[name="size"] option');
    const optionCount = await options.count();
    console.log(`Select has ${optionCount} options`);
  });
  
  test('should interact with textareas', async ({ page }) => {
    // Some forms have textarea for comments
    const textarea = page.locator('textarea');
    
    if (await textarea.isVisible()) {
      // Fill textarea
      await textarea.fill('This is a comment\nWith multiple lines');
      
      // Get value
      const value = await textarea.inputValue();
      expect(value).toContain('This is a comment');
      
      // Type with delay
      await textarea.clear();
      await textarea.type('Line 1\nLine 2\nLine 3', { delay: 50 });
    }
  });
  
  test('should submit form', async ({ page }) => {
    // Fill form
    await page.locator('input[name="custname"]').fill('John Doe');
    await page.locator('input[name="custemail"]').fill('john@example.com');
    await page.locator('input[value="M"]').check();
    await page.locator('input[value="pizza"]').check();
    
    // Submit by clicking button
    const submitBtn = page.locator('button[type="submit"]');
    await submitBtn.click();
    
    // Wait for navigation or response
    await page.waitForNavigation({ timeout: 5000 }).catch(() => {});
    
    // Verify submission (check URL or content)
    console.log(`After submit, URL: ${page.url()}`);
  });
  
  test('should handle required field validation', async ({ page }) => {
    const nameInput = page.locator('input[name="custname"]');
    
    // Try to submit without filling required field
    const submitBtn = page.locator('button[type="submit"]');
    
    // Focus and blur to trigger validation
    await nameInput.focus();
    await nameInput.blur();
    
    // Check if required attribute exists
    const isRequired = await nameInput.getAttribute('required');
    console.log(`Field required: ${isRequired !== null}`);
  });
});
```

---

### **Exercise 8.2: Advanced Click Operations**

**Objective:** Master different click types

**Task:**
```typescript
// Test:
// 1. Single click
// 2. Double click
// 3. Right click
// 4. Click with modifiers
// 5. Force click
```

**Solution:**

```typescript
// tests/08-click-operations.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Click Operations', () => {
  
  test('single click', async ({ page }) => {
    await page.goto('https://example.com');
    
    // Simple click
    const button = page.getByRole('button').first();
    if (await button.isVisible()) {
      await button.click();
    }
  });
  
  test('double click', async ({ page }) => {
    // Create test page with double-click handler
    await page.setContent(`
      <input id="dblclick-input" value="initial" />
      <script>
        document.getElementById('dblclick-input').addEventListener('dblclick', (e) => {
          e.target.value = 'double clicked';
        });
      </script>
    `);
    
    const input = page.locator('#dblclick-input');
    
    // Double click
    await input.dblclick();
    
    // Verify changed
    const value = await input.inputValue();
    expect(value).toBe('double clicked');
  });
  
  test('right click (context menu)', async ({ page }) => {
    // Right click opens context menu
    const element = page.locator('body');
    
    // Set up listener for context menu
    let contextMenuOpened = false;
    page.on('popup', () => {
      contextMenuOpened = true;
    });
    
    // Right click
    await element.click({ button: 'right' });
    
    // In real testing, would verify menu items
  });
  
  test('click with modifiers', async ({ page }) => {
    await page.goto('https://example.com');
    
    const link = page.locator('a').first();
    
    // Control+Click (would open in new tab, but we prevent that)
    await link.click({ modifiers: ['Control'] });
    
    // Shift+Click
    await link.click({ modifiers: ['Shift'] });
    
    // Alt+Click
    await link.click({ modifiers: ['Alt'] });
    
    // Multiple modifiers
    await link.click({ modifiers: ['Control', 'Shift'] });
  });
  
  test('click with position offset', async ({ page }) => {
    await page.setContent(`
      <button id="test-btn" style="width: 100px; height: 100px;">Click Me</button>
    `);
    
    const button = page.locator('#test-btn');
    
    // Click center (default)
    await button.click();
    
    // Click at specific position within element
    await button.click({ position: { x: 10, y: 10 } }); // Top-left
    await button.click({ position: { x: 50, y: 50 } }); // Center
    await button.click({ position: { x: 90, y: 90 } }); // Bottom-right
  });
  
  test('force click hidden element', async ({ page }) => {
    await page.setContent(`
      <button id="hidden-btn" style="display: none;">Hidden</button>
    `);
    
    const button = page.locator('#hidden-btn');
    
    // Normal click would fail
    // await button.click(); // Error
    
    // Force click works
    await button.click({ force: true });
    console.log('Force clicked hidden button');
  });
});
```

---

## 📚 **THEORY SESSION 2: Advanced Interactions & Navigation (2 hours)**

### **Part 8.4: Drag and Drop**

```typescript
test('drag and drop', async ({ page }) => {
  // Simple drag and drop
  const source = page.locator('#draggable');
  const target = page.locator('#drop-zone');
  
  // Method 1: dragTo
  await source.dragTo(target);
  
  // Method 2: More control with mouse events
  await source.hover();
  await page.mouse.down();
  await target.hover();
  await page.mouse.up();
});
```

#### **Drag and Drop Scenarios**

```typescript
test('drag and drop scenarios', async ({ page }) => {
  await page.setContent(`
    <div id="source" style="width: 50px; height: 50px; background: red;"></div>
    <div id="target" style="width: 100px; height: 100px; background: blue; margin-top: 20px;"></div>
    <script>
      document.getElementById('target').addEventListener('drop', (e) => {
        e.preventDefault();
        e.target.style.background = 'green';
      });
      document.getElementById('target').addEventListener('dragover', (e) => {
        e.preventDefault();
      });
    </script>
  `);
  
  const source = page.locator('#source');
  const target = page.locator('#target');
  
  // Drag source to target
  await source.dragTo(target);
  
  // Verify change
  const bgColor = await target.evaluate((el: any) => 
    window.getComputedStyle(el).backgroundColor
  );
  console.log(`Target background: ${bgColor}`);
});
```

---

### **Part 8.5: Scrolling**

```typescript
test('scroll operations', async ({ page }) => {
  await page.goto('https://example.com');
  
  // Scroll page down
  await page.evaluate(() => window.scrollBy(0, 500));
  
  // Scroll page to top
  await page.evaluate(() => window.scrollTo(0, 0));
  
  // Scroll page to bottom
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  
  // Get scroll position
  const scrollTop = await page.evaluate(() => window.pageYOffset);
  console.log(`Scroll position: ${scrollTop}`);
});
```

#### **Scroll Into View**

```typescript
test('scroll element into view', async ({ page }) => {
  const element = page.locator('#bottom-section');
  
  // Scroll element into view
  await element.scrollIntoViewIfNeeded();
  
  // Verify it's visible
  await expect(element).toBeInViewport();
  
  // Scroll with offset
  await element.evaluate(el => {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
});
```

---

### **Part 8.6: File Uploads**

```typescript
test('file upload', async ({ page }) => {
  await page.goto('https://example.com/upload');
  
  // Method 1: Direct file input
  const fileInput = page.locator('input[type="file"]');
  
  // Set files
  await fileInput.setInputFiles('path/to/file.txt');
  
  // Multiple files
  await fileInput.setInputFiles([
    'path/to/file1.txt',
    'path/to/file2.txt',
  ]);
  
  // Verify file selected
  const files = await fileInput.evaluate((el: any) => 
    Array.from(el.files).map(f => f.name)
  );
  console.log(`Selected files: ${files.join(', ')}`);
});
```

#### **File Upload Workflow**

```typescript
test('complete file upload workflow', async ({ page }) => {
  const fileInput = page.locator('input[type="file"]');
  const uploadBtn = page.locator('button[type="submit"]');
  const successMsg = page.locator('.success-message');
  
  // Select file
  await fileInput.setInputFiles('test-file.txt');
  
  // Submit form
  await uploadBtn.click();
  
  // Wait for success
  await expect(successMsg).toBeVisible({ timeout: 10000 });
  
  // Verify uploaded
  const message = await successMsg.textContent();
  expect(message).toContain('uploaded successfully');
});
```

---

### **Part 8.7: Frames and IFrames**

```typescript
test('working with frames', async ({ page }) => {
  await page.goto('https://example.com');
  
  // Get frame by name
  const frame = page.frame('frame-name');
  
  // Get frame by URL
  const frameByUrl = page.frames().find(f => 
    f.url().includes('iframe-url')
  );
  
  // Interact with elements in frame
  if (frame) {
    const button = frame.locator('button');
    await button.click();
  }
});
```

#### **IFrame Interaction**

```typescript
test('iframe interaction', async ({ page }) => {
  await page.goto('https://example.com');
  
  // Get iframe element
  const iframeElement = page.locator('iframe');
  
  // Get frame content
  const frame = page.frameLocator('iframe[src*="content"]');
  
  // Interact with content inside iframe
  const button = frame.locator('button');
  await button.click();
  
  // Get text from iframe
  const text = frame.locator('p').first();
  const content = await text.textContent();
  console.log(`IFrame content: ${content}`);
});
```

---

### **Part 8.8: Alerts and Dialogs**

```typescript
test('handle dialog alerts', async ({ page }) => {
  // Listen for dialog before it appears
  page.on('dialog', async dialog => {
    console.log(`Dialog type: ${dialog.type()}`);
    console.log(`Dialog message: ${dialog.message()}`);
    
    // Handle different dialog types
    if (dialog.type() === 'alert') {
      await dialog.accept();
    } else if (dialog.type() === 'confirm') {
      await dialog.accept(); // Click OK
      // Or: await dialog.dismiss(); // Click Cancel
    } else if (dialog.type() === 'prompt') {
      await dialog.accept('User input text');
    }
  });
  
  // Trigger dialog
  await page.click('button[data-dialog="alert"]');
});
```

#### **Dialog Scenarios**

```typescript
test('different dialog types', async ({ page }) => {
  // Alert dialog
  page.once('dialog', async dialog => {
    expect(dialog.type()).toBe('alert');
    await dialog.accept();
  });
  
  // Confirm dialog
  page.once('dialog', async dialog => {
    expect(dialog.type()).toBe('confirm');
    await dialog.accept(); // Choose OK
  });
  
  // Prompt dialog
  page.once('dialog', async dialog => {
    expect(dialog.type()).toBe('prompt');
    await dialog.accept('John Doe');
  });
  
  // Trigger appropriate dialog
  await page.click('button');
});
```

---

### **Part 8.9: Multiple Tabs and Windows**

```typescript
test('handle multiple pages', async ({ browser }) => {
  // Create first page
  const page1 = await browser.newPage();
  await page1.goto('https://example.com');
  
  // Create second page
  const page2 = await browser.newPage();
  await page2.goto('https://example2.com');
  
  // Interact with first page
  await page1.click('button');
  
  // Check second page
  const title = await page2.title();
  console.log(`Page 2 title: ${title}`);
  
  // Close pages
  await page1.close();
  await page2.close();
});
```

#### **New Page from Link Click**

```typescript
test('handle new page from click', async ({ page }) => {
  await page.goto('https://example.com');
  
  // Listen for new page
  const newPagePromise = page.context().waitForEvent('page');
  
  // Click link that opens new page
  await page.click('a[target="_blank"]');
  
  // Get new page
  const newPage = await newPagePromise;
  await newPage.waitForLoadState();
  
  // Interact with new page
  const title = await newPage.title();
  console.log(`New page title: ${title}`);
  
  // Close new page
  await newPage.close();
});
```

---

## 🔨 **EXERCISE SESSION 2 (2 hours)**

### **Exercise 8.3: Drag and Drop**

**Objective:** Implement drag and drop testing

**Task:**
```typescript
// Test drag and drop with:
// 1. Simple drag to target
// 2. Multiple drags
// 3. Drop zone feedback
// 4. Keyboard fallback (if needed)
```

**Solution:**

```typescript
// tests/08-drag-drop.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Drag and Drop', () => {
  
  test('simple drag and drop', async ({ page }) => {
    await page.setContent(`
      <div id="source" style="width: 100px; height: 100px; background: red; cursor: move;">
        Drag me
      </div>
      <div id="target" style="width: 200px; height: 200px; background: lightblue; margin-top: 50px;">
        Drop here
      </div>
      <script>
        let draggedElement;
        document.getElementById('source').addEventListener('dragstart', (e) => {
          draggedElement = e.target;
          e.dataTransfer.effectAllowed = 'move';
        });
        document.getElementById('target').addEventListener('dragover', (e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = 'move';
        });
        document.getElementById('target').addEventListener('drop', (e) => {
          e.preventDefault();
          e.target.appendChild(draggedElement);
          e.target.style.background = 'green';
        });
      </script>
    `);
    
    const source = page.locator('#source');
    const target = page.locator('#target');
    
    // Drag source to target
    await source.dragTo(target);
    
    // Verify target color changed
    const bgColor = await target.evaluate((el: any) => 
      window.getComputedStyle(el).backgroundColor
    );
    expect(bgColor).toContain('green');
  });
  
  test('drag with intermediate steps', async ({ page }) => {
    await page.setContent(`
      <div id="draggable" style="width: 50px; height: 50px; background: red;"></div>
      <div id="zone1" style="width: 100px; height: 100px; background: yellow; display: inline-block; margin: 10px;"></div>
      <div id="zone2" style="width: 100px; height: 100px; background: blue; display: inline-block; margin: 10px;"></div>
    `);
    
    const draggable = page.locator('#draggable');
    const zone1 = page.locator('#zone1');
    const zone2 = page.locator('#zone2');
    
    // Drag to first zone
    await draggable.dragTo(zone1);
    
    // Then drag to second zone
    await draggable.dragTo(zone2);
  });
});
```

---

### **Exercise 8.4: File Upload & Dialogs**

**Objective:** Test file uploads and dialog handling

**Task:**
```typescript
// Test:
// 1. File upload
// 2. Alert dialog
// 3. Confirm dialog
// 4. Prompt dialog
```

**Solution:**

```typescript
// tests/08-uploads-dialogs.spec.ts
import { test, expect } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

test.describe('File Uploads & Dialogs', () => {
  
  test('file upload', async ({ page }) => {
    await page.setContent(`
      <input type="file" id="file-input" />
      <button onclick="handleUpload()">Upload</button>
      <div id="result"></div>
      <script>
        function handleUpload() {
          const input = document.getElementById('file-input');
          if (input.files.length > 0) {
            const filename = input.files[0].name;
            document.getElementById('result').innerHTML = 'Uploaded: ' + filename;
          }
        }
      </script>
    `);
    
    // Create temp file
    const tempFile = path.join(__dirname, 'temp-test.txt');
    fs.writeFileSync(tempFile, 'Test file content');
    
    // Set file
    await page.locator('#file-input').setInputFiles(tempFile);
    
    // Click upload
    await page.click('button');
    
    // Verify upload
    const result = page.locator('#result');
    await expect(result).toContainText('Uploaded: temp-test.txt');
    
    // Cleanup
    fs.unlinkSync(tempFile);
  });
  
  test('handle alert dialog', async ({ page }) => {
    await page.setContent(`
      <button onclick="alert('Alert message')">Show Alert</button>
    `);
    
    // Prepare to handle dialog
    let alertMessage = '';
    page.once('dialog', async dialog => {
      alertMessage = dialog.message();
      await dialog.accept();
    });
    
    // Click button that triggers alert
    await page.click('button');
    
    // Verify dialog was handled
    expect(alertMessage).toBe('Alert message');
  });
  
  test('handle confirm dialog', async ({ page }) => {
    await page.setContent(`
      <div id="result"></div>
      <button onclick="handleConfirm()">Confirm</button>
      <script>
        function handleConfirm() {
          if (confirm('Do you confirm?')) {
            document.getElementById('result').innerHTML = 'Confirmed!';
          } else {
            document.getElementById('result').innerHTML = 'Cancelled!';
          }
        }
      </script>
    `);
    
    // Accept confirm
    page.once('dialog', async dialog => {
      expect(dialog.type()).toBe('confirm');
      await dialog.accept();
    });
    
    await page.click('button');
    
    // Verify result
    const result = page.locator('#result');
    await expect(result).toContainText('Confirmed!');
  });
  
  test('handle prompt dialog', async ({ page }) => {
    await page.setContent(`
      <div id="result"></div>
      <button onclick="handlePrompt()">Prompt</button>
      <script>
        function handlePrompt() {
          const input = prompt('Enter your name:');
          if (input) {
            document.getElementById('result').innerHTML = 'Hello, ' + input;
          }
        }
      </script>
    `);
    
    // Handle prompt with input
    page.once('dialog', async dialog => {
      expect(dialog.type()).toBe('prompt');
      await dialog.accept('Karan');
    });
    
    await page.click('button');
    
    // Verify result
    const result = page.locator('#result');
    await expect(result).toContainText('Hello, Karan');
  });
});
```

---

### **Exercise 8.5: Complex Interaction Scenarios**

**Objective:** Combine multiple interactions

**Task:**
```typescript
// Test complete workflow:
// 1. Fill form with multiple fields
// 2. Upload file
// 3. Handle dialog
// 4. Verify result
```

**Solution:**

```typescript
// tests/08-complex-workflow.spec.ts
import { test, expect } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

test('complete interaction workflow', async ({ page }) => {
  await page.setContent(`
    <form id="test-form">
      <input type="text" id="name" placeholder="Name" required />
      <input type="email" id="email" placeholder="Email" required />
      <input type="file" id="file" />
      <textarea id="comments" placeholder="Comments"></textarea>
      <input type="checkbox" id="agree" /> I agree to terms
      <button type="button" onclick="submitForm()">Submit</button>
    </form>
    <div id="result"></div>
    <script>
      function submitForm() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const agree = document.getElementById('agree').checked;
        
        if (!name || !email || !agree) {
          alert('Please fill all fields and agree to terms');
          return;
        }
        
        if (confirm('Submit form?')) {
          document.getElementById('result').innerHTML = 'Form submitted!';
        }
      }
    </script>
  `);
  
  // Step 1: Fill text inputs
  await page.locator('#name').fill('John Doe');
  await page.locator('#email').fill('john@example.com');
  
  // Step 2: Fill textarea
  await page.locator('#comments').fill('This is a test form\nWith multiple lines');
  
  // Step 3: Upload file
  const tempFile = path.join(__dirname, 'form-file.txt');
  fs.writeFileSync(tempFile, 'Form attachment');
  await page.locator('#file').setInputFiles(tempFile);
  
  // Step 4: Check agreement
  await page.locator('#agree').check();
  
  // Step 5: Handle dialog
  page.once('dialog', async dialog => {
    expect(dialog.message()).toBe('Submit form?');
    await dialog.accept();
  });
  
  // Step 6: Submit
  await page.click('button');
  
  // Step 7: Verify result
  const result = page.locator('#result');
  await expect(result).toContainText('Form submitted!');
  
  // Cleanup
  fs.unlinkSync(tempFile);
});
```

---

## ❓ **Quiz: Advanced Interactions**

**Instructions:** Answer all 10 questions. Target score: 8/10 (80%)

### **Question 1: Type vs Fill**
Which is faster for setting input values?
- A) `type()` - simulates character input
- B) `fill()` - sets value directly ✅ **CORRECT**
- C) Both are same speed
- D) `type()` is faster

**Explanation:** `fill()` bypasses keystroke simulation.

---

### **Question 2: Double Click**
What method performs double-click?
- A) `click({ clickCount: 2 })`
- B) `dblclick()` ✅ **CORRECT**
- C) `click()` twice
- D) `click({ double: true })`

**Explanation:** `dblclick()` is the dedicated method.

---

### **Question 3: Modifier Keys**
How do you Ctrl+Click in Playwright?
- A) `click({ control: true })`
- B) `click({ modifiers: ['Control'] })` ✅ **CORRECT**
- C) `click({ key: 'Control' })`
- D) `click({ ctrl: true })`

**Explanation:** Use modifiers array with key names.

---

### **Question 4: Keyboard Press**
What does `input.press('Enter')` do?
- A) Types the word "Enter"
- B) Presses Enter key ✅ **CORRECT**
- C) Enters text mode
- D) Creates new line

**Explanation:** `press()` sends actual keyboard events.

---

### **Question 5: Drag and Drop**
What's the simplest drag operation?
- A) `page.mouse.down()` + `mouse.up()`
- B) `source.dragTo(target)` ✅ **CORRECT**
- C) `click()` and `type()`
- D) `hover()` then `click()`

**Explanation:** `dragTo()` handles complete drag operation.

---

### **Question 6: File Upload**
What method uploads a file?
- A) `click()` then `type()`
- B) `setInputFiles()` ✅ **CORRECT**
- C) `fill()` with file path
- D) `drag()` file

**Explanation:** `setInputFiles()` is the dedicated method.

---

### **Question 7: Frames**
How do you interact with iframe content?
- A) `page.locator()` inside iframe
- B) `frameLocator()` then `locator()` ✅ **CORRECT**
- C) Direct locator of iframe
- D) Can't interact with iframes

**Explanation:** Must use `frameLocator()` first.

---

### **Question 8: Dialogs**
How do you handle JavaScript alerts?
- A) `page.on('dialog', handler)`✅ **CORRECT**
- B) `page.click()` then respond
- C) `await dialog.accept()`
- D) Auto-dismissed

**Explanation:** Listen for 'dialog' event.

---

### **Question 9: Scroll**
How do you scroll to an element?
- A) `page.evaluate()` with scrollBy
- B) `element.scrollIntoViewIfNeeded()` ✅ **CORRECT**
- C) `page.scroll()`
- D) Auto-scrolls on click

**Explanation:** Method ensures element visibility.

---

### **Question 10: Right Click**
How do you right-click an element?
- A) `click({ button: 'right' })` ✅ **CORRECT**
- B) `rightClick()`
- C) `click({ right: true })`
- D) `click()` with Shift

**Explanation:** Use `button: 'right'` option.

---

## ✅ **Quiz Answer Key**

| Q | Answer | Topic |
|---|--------|-------|
| 1 | B | fill() speed |
| 2 | B | dblclick() |
| 3 | B | Modifier keys |
| 4 | B | press() method |
| 5 | B | dragTo() |
| 6 | B | setInputFiles() |
| 7 | B | frameLocator() |
| 8 | A | dialog event |
| 9 | B | scrollIntoViewIfNeeded() |
| 10 | A | Right-click |

**Your Score:** ___/10

**Interpretation:**
- 9-10: ✅ Excellent! Interaction master
- 7-8: 🟡 Good! Review weak areas
- Below 7: 🔴 Review interactions again

---

## 📋 **Daily Assignment**

### **Assignment 8.1: Build Complete Form & Interaction Test**

**Objective:** Create professional interaction test suite

**Requirements:**
1. Test form filling (all field types)
2. Test keyboard interactions
3. Test drag and drop (if applicable)
4. Test file upload
5. Handle dialogs
6. Verify complex workflow

**Solution:**

```typescript
// tests/08-assignment-interactions.spec.ts
import { test, expect } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

test.describe('Complete Interaction Suite', () => {
  
  test('comprehensive form interaction', async ({ page }) => {
    // Navigate to form
    await page.goto('https://httpbin.org/forms/post');
    
    // Fill text input
    const nameInput = page.locator('input[name="custname"]');
    await nameInput.click();
    await nameInput.type('Test User', { delay: 50 });
    
    // Fill email
    const emailInput = page.locator('input[name="custemail"]');
    await emailInput.fill('test@example.com');
    
    // Select radio
    await page.locator('input[value="M"]').check();
    
    // Check checkboxes
    await page.locator('input[value="pizza"]').check();
    await page.locator('input[value="bacon"]').check();
    
    // Select from dropdown
    await page.locator('select[name="size"]').selectOption('large');
    
    // Verify all selections
    expect(await nameInput.inputValue()).toBe('Test User');
    await expect(page.locator('input[value="M"]')).toBeChecked();
    await expect(page.locator('input[value="pizza"]')).toBeChecked();
    
    console.log('Form filled successfully');
  });
  
  test('keyboard shortcuts and navigation', async ({ page }) => {
    await page.goto('https://httpbin.org/forms/post');
    
    const nameInput = page.locator('input[name="custname"]');
    const emailInput = page.locator('input[name="custemail"]');
    
    // Focus on name input
    await nameInput.focus();
    
    // Type with keyboard
    await nameInput.type('User Name');
    
    // Tab to next field
    await nameInput.press('Tab');
    
    // Verify email is focused
    const focusedElement = await page.evaluate(() => 
      (document.activeElement as any)?.name
    );
    console.log(`Focused element: ${focusedElement}`);
  });
});
```

---

## 🎯 **Daily Checklist**

Track your Day 08 progress:

- [ ] Reviewed Day 06-07 concepts
- [ ] Completed Theory Session 1 (Clicks & Keyboard)
- [ ] Completed Exercise 8.1 (Form Interactions)
- [ ] Completed Exercise 8.2 (Click Operations)
- [ ] Completed Theory Session 2 (Advanced Interactions)
- [ ] Completed Exercise 8.3 (Drag & Drop)
- [ ] Completed Exercise 8.4 (File Upload & Dialogs)
- [ ] Completed Exercise 8.5 (Complex Workflow)
- [ ] Answered all 10 quiz questions
- [ ] Scored 80%+ on quiz (8/10)
- [ ] Completed Assignment 8.1 (Interaction Test Suite)
- [ ] Tested with real forms
- [ ] Committed code to GitHub
- [ ] Updated personal learning journal

**Daily Metrics:**
- Quiz Score: ___/10
- Confidence Level (1-5): ___
- Time Spent: ___ hours
- Interactions Tested: ___ patterns
- Challenges Faced: _________________

---

## 📚 **Key Takeaways from Day 08**

1. **Fill is faster than type** - use for efficiency
2. **Type is better for testing** - simulates user behavior
3. **Modifiers enable complex clicks** - Control, Shift, Alt, Meta
4. **Drag operations need proper setup** - listeners and events
5. **File upload via setInputFiles()** - not by typing paths
6. **Handle dialogs proactively** - listen before trigger
7. **Frames need frameLocator()** - can't directly access
8. **Scrolling can be automated** - evaluate or built-in

---

## 🔗 **Resources for Review**

- [Playwright Click API](https://playwright.dev/docs/api/class-locator#locator-click)
- [Playwright Keyboard](https://playwright.dev/docs/api/class-keyboard)
- [Playwright Mouse](https://playwright.dev/docs/api/class-mouse)
- [File Uploads](https://playwright.dev/docs/input#upload-files)
- [Dialogs](https://playwright.dev/docs/dialogs)

---

## 🚀 **Ready for Day 09?**

By completing Day 08, you've mastered:
- ✅ All click types (single, double, right-click, modifiers)
- ✅ Keyboard interactions (type, press, shortcuts)
- ✅ Form filling (all field types)
- ✅ Drag and drop operations
- ✅ Scrolling and view management
- ✅ File uploads
- ✅ Frame and iframe interactions
- ✅ Dialog and alert handling
- ✅ Multiple tabs and windows
- ✅ Complex interaction workflows

**Next (Day 09):** Page Object Model!
- Professional test structure
- Page classes
- Page fixtures
- Reusable methods
- Maintainable tests

---

**Exceptional work on Day 08, Karan!** 🎉

You've mastered user interactions! You can now:
- ✅ Fill any form
- ✅ Click anything
- ✅ Type with style
- ✅ Handle dialogs
- ✅ Upload files
- ✅ Drag and drop
- ✅ Interact with frames

**Week 2 Progress:**
- ✅ Day 06: Playwright Basics
- ✅ Day 07: Advanced Selectors
- ✅ Day 08: Advanced Interactions (TODAY!)
- 🔜 Day 09: Page Object Model
- 🔜 Day 10: Waits & Synchronization
- 🔜 Day 11: Test Organization

**You're 8 days in! The finishing stretch of Week 2 awaits!** 💪🎭

---

*Last Updated: December 12, 2025*  
*Day 08 Complete Guide v1.0*  
*Next: Day 09 - Page Object Model*

---
