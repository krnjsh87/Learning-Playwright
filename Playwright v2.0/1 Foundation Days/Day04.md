# Day 04: Async JavaScript - Callbacks, Promises & Async/Await

**Date:** Day 4 of 25  
**Duration:** 8 hours  
**Difficulty:** Intermediate-Advanced  
**Focus Area:** Asynchronous Programming

---

## 🎯 **Learning Objectives**

By the end of Day 04, you will:

✅ Understand synchronous vs asynchronous code execution  
✅ Master callbacks and callback patterns  
✅ Understand and implement Promises  
✅ Master async/await syntax and patterns  
✅ Implement proper error handling for async operations  
✅ Handle multiple async operations (Promise.all, Promise.race)  
✅ Apply async patterns to automation testing  

---

## ⏰ **Daily Schedule (8 Hours)**

| Time | Activity | Duration |
|------|----------|----------|
| 8:00 - 8:30 | Review Day 01-03 & objectives | 30 min |
| 8:30 - 10:30 | **Theory Session 1:** Callbacks & Sync vs Async | 2 hours |
| 10:30 - 11:00 | Break | 30 min |
| 11:00 - 1:00 PM | **Exercise Session 1:** Callbacks & Promises | 2 hours |
| 1:00 - 2:00 PM | Lunch break | 1 hour |
| 2:00 - 4:00 PM | **Theory Session 2:** Async/Await & Error Handling | 2 hours |
| 4:00 - 4:30 PM | Break | 30 min |
| 4:30 - 6:30 PM | **Exercise Session 2:** Advanced Async Patterns | 2 hours |

---

## 📚 **THEORY SESSION 1: Callbacks & Synchronous vs Asynchronous (2 hours)**

### **Part 4.1: Synchronous vs Asynchronous Execution**

Understanding the difference is crucial for automation testing!

#### **Synchronous Code (Blocking)**

```javascript
// Synchronous - code executes line by line, waits for each operation
console.log("Starting");

// This blocks until complete
const result = calculateSum(1, 2);
console.log(`Sum: ${result}`); // Must wait for calculateSum

console.log("Done");

function calculateSum(a, b) {
  console.log("Calculating...");
  return a + b;
}

// Output (in order):
// Starting
// Calculating...
// Sum: 3
// Done
```

#### **Asynchronous Code (Non-blocking)**

```javascript
// Asynchronous - code continues without waiting
console.log("Starting");

// This doesn't block - operation happens in background
setTimeout(() => {
  console.log("Async operation completed");
}, 1000);

console.log("Done"); // Executes before async completes

// Output (note order):
// Starting
// Done
// (after 1 second) Async operation completed
```

#### **Why Asynchronous Matters in Testing**

```javascript
// Real-world testing scenario
// Without async, your tests would hang waiting for network

// ❌ If this were synchronous, it would block:
const response = fetch("https://api.example.com/users");
console.log(response); // Would wait forever!

// ✅ With async, it returns immediately:
fetch("https://api.example.com/users")
  .then(response => response.json())
  .then(data => console.log(data)); // Processes when ready

console.log("Fetch initiated (doesn't wait)");
```

---

### **Part 4.2: Callbacks**

Callbacks are functions passed to other functions to execute later.

#### **Basic Callback Pattern**

```javascript
// Function that accepts a callback
function fetchUserData(userId, callback) {
  console.log(`Fetching user ${userId}...`);
  
  // Simulate async operation (like API call)
  setTimeout(() => {
    const user = {
      id: userId,
      name: "Karan",
      email: "karan@example.com"
    };
    
    // Call the callback with the data
    callback(user);
  }, 1000);
}

// Use the callback
fetchUserData(1, (user) => {
  console.log("User data received:", user);
});

console.log("Request sent (doesn't wait)");

// Output:
// Request sent (doesn't wait)
// Fetching user 1...
// (after 1 second) User data received: { id: 1, name: "Karan", ... }
```

#### **Callback with Error Handling**

```javascript
// Convention: callback(error, result)
function login(username, password, callback) {
  setTimeout(() => {
    if (username === "admin" && password === "password") {
      // Success - error is null
      callback(null, { token: "abc123", user: "admin" });
    } else {
      // Error - pass error as first argument
      callback(new Error("Invalid credentials"), null);
    }
  }, 500);
}

// Using callback with error handling
login("admin", "password", (error, result) => {
  if (error) {
    console.error("Login failed:", error.message);
  } else {
    console.log("Login successful:", result);
  }
});

// Failed login
login("admin", "wrong", (error, result) => {
  if (error) {
    console.error("Login failed:", error.message); // "Invalid credentials"
  }
});
```

#### **Callback Hell (Problem)**

```javascript
// Nested callbacks become hard to read - "callback hell" or "pyramid of doom"
function getUserAndPosts(userId, callback) {
  getUser(userId, (error, user) => {
    if (error) {
      callback(error);
    } else {
      getPosts(userId, (error, posts) => {
        if (error) {
          callback(error);
        } else {
          getComments(posts[0].id, (error, comments) => {
            if (error) {
              callback(error);
            } else {
              callback(null, { user, posts, comments });
            }
          });
        }
      });
    }
  });
}

// This gets messy fast! Solution: use Promises or async/await
```

---

### **Part 4.3: Promises**

Promises solve callback hell and provide better error handling.

#### **Promise Basics**

```javascript
// A Promise represents an operation that hasn't completed yet
const promise = new Promise((resolve, reject) => {
  // resolve - call when operation succeeds
  // reject - call when operation fails
  
  setTimeout(() => {
    resolve("Operation successful!");
  }, 1000);
});

// Use the promise
promise
  .then(result => {
    console.log(result); // "Operation successful!"
  });
```

#### **Promise States**

```javascript
// Promises have 3 states:
// 1. Pending - operation hasn't completed yet
// 2. Fulfilled - operation completed successfully (resolve called)
// 3. Rejected - operation failed (reject called)

// Example: Fulfilled Promise
new Promise((resolve, reject) => {
  resolve("Success!");
}).then(result => console.log(result)); // "Success!"

// Example: Rejected Promise
new Promise((resolve, reject) => {
  reject(new Error("Failed!"));
}).catch(error => console.error(error.message)); // "Failed!"

// Example: Pending (then execute after delay)
const delayedPromise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Done!"), 2000);
});

console.log("Promise created (pending)");
// After 2 seconds: "Done!" logs
```

#### **Creating Test-Friendly Promises**

```javascript
// Simulate API call for test
function fetchTestResults(testId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (testId > 0) {
        resolve({
          testId: testId,
          status: "passed",
          duration: 2500
        });
      } else {
        reject(new Error("Invalid test ID"));
      }
    }, 1000);
  });
}

// Use the promise
fetchTestResults(1)
  .then(result => {
    console.log("Test passed:", result);
  })
  .catch(error => {
    console.error("Error:", error.message);
  });

// Chaining promises
fetchTestResults(1)
  .then(result => {
    console.log("Received:", result);
    return result.testId * 2; // Return value becomes next promise input
  })
  .then(doubledId => {
    console.log("Doubled ID:", doubledId);
  })
  .catch(error => {
    console.error("Error:", error.message);
  });
```

#### **Promise.all() - Wait for Multiple Operations**

```javascript
// Execute multiple async operations in parallel, wait for all
const test1 = new Promise(resolve => {
  setTimeout(() => resolve("Test 1 passed"), 1000);
});

const test2 = new Promise(resolve => {
  setTimeout(() => resolve("Test 2 passed"), 2000);
});

const test3 = new Promise(resolve => {
  setTimeout(() => resolve("Test 3 passed"), 1500);
});

// Wait for all promises to complete
Promise.all([test1, test2, test3])
  .then(results => {
    console.log("All tests completed:", results);
    // Results: ["Test 1 passed", "Test 2 passed", "Test 3 passed"]
  })
  .catch(error => {
    console.error("One or more tests failed:", error);
  });

// Practical: Wait for multiple API calls
function runMultipleTests() {
  const tests = [
    fetchTestResults(1),
    fetchTestResults(2),
    fetchTestResults(3)
  ];
  
  return Promise.all(tests);
}

runMultipleTests()
  .then(results => {
    console.log("All tests completed:", results);
    // Results array with all test results
  });
```

#### **Promise.race() - Wait for First to Complete**

```javascript
// Execute multiple operations, use first completed
const promise1 = new Promise(resolve => {
  setTimeout(() => resolve("Promise 1 won!"), 1000);
});

const promise2 = new Promise(resolve => {
  setTimeout(() => resolve("Promise 2 won!"), 500);
});

Promise.race([promise1, promise2])
  .then(result => {
    console.log(result); // "Promise 2 won!" (faster)
  });

// Practical: Test timeout
function testWithTimeout(testFn, timeout = 5000) {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error("Test timeout")), timeout);
  });
  
  return Promise.race([testFn(), timeoutPromise]);
}

testWithTimeout(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve("Test passed!"), 2000);
  }))
  .then(result => console.log(result))
  .catch(error => console.error(error.message));
```

#### **Promise.allSettled() - Wait for All (Even if Some Fail)**

```javascript
// Like Promise.all but doesn't reject if one fails
const promises = [
  Promise.resolve("Success 1"),
  Promise.reject(new Error("Failed")),
  Promise.resolve("Success 2")
];

Promise.allSettled(promises)
  .then(results => {
    console.log(results);
    // [
    //   { status: "fulfilled", value: "Success 1" },
    //   { status: "rejected", reason: Error("Failed") },
    //   { status: "fulfilled", value: "Success 2" }
    // ]
  });

// Practical: Run all tests regardless of failures
function runAllTestsRegardless(testFunctions) {
  const promises = testFunctions.map(fn => Promise.resolve().then(fn).catch(e => e));
  
  return Promise.allSettled(promises);
}
```

---

## 🔨 **EXERCISE SESSION 1 (2 hours)**

### **Exercise 4.1: Understanding Callbacks**

**Objective:** Master callback patterns

**Task:**
```javascript
// 1. Create function that accepts callback
//    Simulate async operation with setTimeout
//    Call callback when complete

// 2. Create function with error handling
//    Pass error or result to callback

// 3. Create user authentication function
//    Use callback pattern
//    Handle success and failure cases

// 4. Avoid callback hell
//    Use named functions instead of nested callbacks
```

**Solution:**
```javascript
// 1. Basic callback function
function delayedGreeting(name, callback) {
  setTimeout(() => {
    callback(`Hello, ${name}!`);
  }, 1000);
}

delayedGreeting("Karan", (message) => {
  console.log(message);
});

// 2. With error handling
function fetchData(url, callback) {
  setTimeout(() => {
    if (url.includes("valid")) {
      callback(null, { data: "Sample data" });
    } else {
      callback(new Error("Invalid URL"), null);
    }
  }, 500);
}

fetchData("https://valid-api.com", (error, result) => {
  if (error) {
    console.error("Error:", error.message);
  } else {
    console.log("Data:", result);
  }
});

// 3. User authentication
function authenticateUser(username, password, callback) {
  console.log(`Authenticating ${username}...`);
  
  setTimeout(() => {
    if (username === "admin" && password === "secret") {
      callback(null, { token: "xyz789", user: username });
    } else {
      callback(new Error("Invalid credentials"), null);
    }
  }, 1000);
}

authenticateUser("admin", "secret", (error, result) => {
  if (error) {
    console.error("Auth failed:", error.message);
  } else {
    console.log("Auth successful:", result);
  }
});

// 4. Avoid callback hell with named functions
function getUser(userId, callback) {
  setTimeout(() => {
    callback(null, { id: userId, name: "Karan" });
  }, 500);
}

function getPosts(userId, callback) {
  setTimeout(() => {
    callback(null, [{ id: 1, title: "Post 1" }]);
  }, 500);
}

function getComments(postId, callback) {
  setTimeout(() => {
    callback(null, [{ id: 1, text: "Comment 1" }]);
  }, 500);
}

// Better: Named functions instead of nesting
function handleUser(error, user) {
  if (error) {
    console.error("Failed to get user:", error);
    return;
  }
  getPosts(user.id, handlePosts);
}

function handlePosts(error, posts) {
  if (error) {
    console.error("Failed to get posts:", error);
    return;
  }
  getComments(posts[0].id, handleComments);
}

function handleComments(error, comments) {
  if (error) {
    console.error("Failed to get comments:", error);
    return;
  }
  console.log("All data loaded:", { comments });
}

// Execute
getUser(1, handleUser);
```

---

### **Exercise 4.2: Working with Promises**

**Objective:** Master Promise patterns

**Task:**
```javascript
// 1. Create Promise that resolves/rejects
// 2. Chain promises with .then() and .catch()
// 3. Use Promise.all() for multiple operations
// 4. Implement proper error handling
// 5. Create test scenarios with promises
```

**Solution:**
```javascript
// 1. Basic Promise
function createPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.5;
      if (success) {
        resolve("Operation successful!");
      } else {
        reject(new Error("Operation failed!"));
      }
    }, 1000);
  });
}

createPromise()
  .then(result => console.log(result))
  .catch(error => console.error(error.message));

// 2. Chaining promises
function getUserWithDetails(userId) {
  return fetchUser(userId)
    .then(user => {
      console.log("User fetched:", user.name);
      return fetchUserDetails(userId);
    })
    .then(details => {
      console.log("Details fetched:", details);
      return { ...details };
    })
    .catch(error => {
      console.error("Error:", error.message);
    });
}

function fetchUser(id) {
  return new Promise(resolve => {
    setTimeout(() => resolve({ id, name: "Karan" }), 500);
  });
}

function fetchUserDetails(id) {
  return new Promise(resolve => {
    setTimeout(() => resolve({ email: "karan@test.com", role: "admin" }), 500);
  });
}

// 3. Promise.all for multiple operations
function runMultipleTests() {
  const tests = [
    runTest("Login"),
    runTest("Checkout"),
    runTest("Payment")
  ];
  
  return Promise.all(tests);
}

function runTest(name) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name, status: "passed", duration: Math.random() * 3000 });
    }, 1000);
  });
}

runMultipleTests()
  .then(results => {
    console.log("All tests completed:");
    results.forEach(result => {
      console.log(`  ${result.name}: ${result.status} (${result.duration.toFixed(0)}ms)`);
    });
  })
  .catch(error => console.error("Test suite failed:", error));

// 4. Error handling
function fetchWithRetry(url, retries = 3) {
  return fetch(url)
    .catch(error => {
      if (retries > 1) {
        console.log(`Retrying... (${retries - 1} retries left)`);
        return fetchWithRetry(url, retries - 1);
      }
      throw error;
    });
}

// 5. Test scenarios
function validateTestData(testData) {
  return new Promise((resolve, reject) => {
    if (!testData || !testData.testName) {
      reject(new Error("Missing testName"));
    } else if (!testData.expectedResult) {
      reject(new Error("Missing expectedResult"));
    } else {
      resolve({ valid: true, data: testData });
    }
  });
}

validateTestData({ testName: "Login", expectedResult: "success" })
  .then(result => console.log("Data valid:", result))
  .catch(error => console.error("Validation failed:", error.message));
```

---

## 📚 **THEORY SESSION 2: Async/Await & Error Handling (2 hours)**

### **Part 4.4: Async/Await Syntax**

Async/await makes asynchronous code look synchronous (cleaner and easier to read).

#### **Basic Async/Await**

```javascript
// Without async/await (using promises)
function getUser() {
  return fetchUser(1)
    .then(user => {
      console.log(user);
      return user;
    });
}

// With async/await (cleaner!)
async function getUser() {
  const user = await fetchUser(1);
  console.log(user);
  return user;
}

// Key difference:
// - Function marked with 'async'
// - Use 'await' before promise to pause until resolved
// - Function automatically returns a promise
```

#### **Understanding Async Functions**

```javascript
// async functions always return a Promise
async function getName() {
  return "Karan"; // Automatically wrapped in Promise.resolve()
}

getName().then(name => console.log(name)); // "Karan"

// Equivalent to:
function getName() {
  return Promise.resolve("Karan");
}

// async function that rejects
async function getError() {
  throw new Error("Something went wrong!");
}

getError().catch(error => console.error(error.message));
```

#### **Await Keyword**

```javascript
// await pauses execution until promise resolves
async function loadUserData() {
  console.log("Starting load...");
  
  // Code pauses here until promise resolves
  const user = await fetchUser(1);
  console.log("User loaded:", user);
  
  const details = await fetchDetails(user.id);
  console.log("Details loaded:", details);
  
  return { user, details };
}

function fetchUser(id) {
  return new Promise(resolve => {
    setTimeout(() => resolve({ id, name: "Karan" }), 1000);
  });
}

function fetchDetails(id) {
  return new Promise(resolve => {
    setTimeout(() => resolve({ email: "karan@test.com" }), 1000);
  });
}

// Call async function (returns promise)
loadUserData()
  .then(result => console.log("Complete:", result));

// Output:
// Starting load...
// (after 1s) User loaded: { id: 1, name: "Karan" }
// (after 2s) Details loaded: { email: "karan@test.com" }
// Complete: { user: {...}, details: {...} }
```

#### **Practical Test Automation Example**

```javascript
// Automation testing with async/await
async function loginTest() {
  const browser = await launchBrowser("chrome");
  const page = await browser.newPage();
  
  // Navigate to login page
  await page.goto("https://example.com/login");
  
  // Fill login form
  await page.fill('input[name="username"]', "admin");
  await page.fill('input[name="password"]', "password");
  
  // Submit form
  await page.click('button[type="submit"]');
  
  // Wait for navigation
  await page.waitForNavigation();
  
  // Verify success
  const url = page.url();
  console.log("Login successful, redirected to:", url);
  
  await browser.close();
}

// Much cleaner than promise chains!
```

---

### **Part 4.5: Error Handling**

#### **Try/Catch Pattern**

```javascript
// Error handling with async/await
async function loadData() {
  try {
    const response = await fetch("https://api.example.com/users");
    const data = await response.json();
    console.log("Data loaded:", data);
    return data;
  } catch (error) {
    console.error("Failed to load data:", error.message);
    throw error; // Re-throw if needed
  } finally {
    console.log("Cleanup completed");
  }
}

loadData();

// Output:
// If success: Data loaded: {...}
// If error: Failed to load data: {error message}
// Always: Cleanup completed
```

#### **Custom Error Handling**

```javascript
// Define custom errors
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

class TimeoutError extends Error {
  constructor(message) {
    super(message);
    this.name = "TimeoutError";
  }
}

// Use in async function
async function validateAndProcess(data) {
  try {
    if (!data) {
      throw new ValidationError("Data is required");
    }
    
    const result = await processData(data);
    return result;
  } catch (error) {
    if (error instanceof ValidationError) {
      console.error("Validation failed:", error.message);
    } else if (error instanceof TimeoutError) {
      console.error("Operation timed out");
    } else {
      console.error("Unknown error:", error.message);
    }
  }
}
```

#### **Error Handling with Finally**

```javascript
async function fetchWithCleanup(url) {
  let connection;
  try {
    console.log("Opening connection...");
    connection = await openConnection(url);
    
    const data = await connection.fetch();
    return data;
  } catch (error) {
    console.error("Fetch failed:", error.message);
  } finally {
    // Always executes, even if error
    if (connection) {
      console.log("Closing connection...");
      await connection.close();
    }
  }
}
```

---

### **Part 4.6: Multiple Async Operations**

#### **Sequential Execution (Wait for Each)**

```javascript
// Execute one after another
async function sequentialTests() {
  console.log("Starting tests...");
  
  const test1 = await runTest("Login Test");
  console.log("Test 1 complete");
  
  const test2 = await runTest("Checkout Test");
  console.log("Test 2 complete");
  
  const test3 = await runTest("Payment Test");
  console.log("Test 3 complete");
  
  return [test1, test2, test3];
}

function runTest(name) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`Running: ${name}`);
      resolve({ name, status: "passed" });
    }, 1000);
  });
}

// Total time: ~3 seconds (sequential)
sequentialTests().then(results => console.log("Results:", results));
```

#### **Parallel Execution (All at Once)**

```javascript
// Execute all simultaneously
async function parallelTests() {
  console.log("Starting tests...");
  
  // Start all promises
  const promises = [
    runTest("Login Test"),
    runTest("Checkout Test"),
    runTest("Payment Test")
  ];
  
  // Wait for all to complete
  const results = await Promise.all(promises);
  console.log("All tests complete");
  
  return results;
}

// Total time: ~1 second (parallel)
parallelTests().then(results => console.log("Results:", results));
```

#### **Practical Hybrid Approach**

```javascript
// Some tests in parallel, some sequential
async function smartTestExecution() {
  // Smoke tests first
  await runTest("Login Test");
  
  // Regression tests in parallel
  const regressionResults = await Promise.all([
    runTest("Checkout Test"),
    runTest("Payment Test"),
    runTest("User Profile Test")
  ]);
  
  // Post-regression cleanup
  await runTest("Logout Test");
  
  return regressionResults;
}
```

---

### **Part 4.7: Async Iterator & For...Await**

```javascript
// Async iterator - iterate over async values
async function* asyncGenerator() {
  yield new Promise(resolve => setTimeout(() => resolve(1), 500));
  yield new Promise(resolve => setTimeout(() => resolve(2), 500));
  yield new Promise(resolve => setTimeout(() => resolve(3), 500));
}

// Use with for...await
async function processAsyncValues() {
  for await (const value of asyncGenerator()) {
    console.log(value); // 1, 2, 3 (each after delay)
  }
}

processAsyncValues();
```

---

## 🔨 **EXERCISE SESSION 2 (2 hours)**

### **Exercise 4.3: Async/Await Patterns**

**Objective:** Master async/await syntax and patterns

**Task:**
```javascript
// 1. Convert promise chains to async/await
// 2. Implement error handling with try/catch
// 3. Handle multiple async operations
// 4. Create practical test automation functions
// 5. Implement retry logic with async
```

**Solution:**
```javascript
// 1. Promise chains vs async/await
// Before (promises)
function loadUserDataPromises(userId) {
  return fetchUser(userId)
    .then(user => {
      return fetchUserPosts(userId).then(posts => ({
        user,
        posts
      }));
    })
    .catch(error => console.error("Error:", error));
}

// After (async/await)
async function loadUserDataAsync(userId) {
  try {
    const user = await fetchUser(userId);
    const posts = await fetchUserPosts(userId);
    return { user, posts };
  } catch (error) {
    console.error("Error:", error.message);
  }
}

function fetchUser(id) {
  return new Promise(resolve => {
    setTimeout(() => resolve({ id, name: "Karan" }), 500);
  });
}

function fetchUserPosts(id) {
  return new Promise(resolve => {
    setTimeout(() => resolve([{ id: 1, title: "Post 1" }]), 500);
  });
}

// 2. Error handling
async function loadWithErrorHandling(userId) {
  try {
    const user = await fetchUser(userId);
    
    if (!user) {
      throw new Error("User not found");
    }
    
    const posts = await fetchUserPosts(user.id);
    return { user, posts };
  } catch (error) {
    console.error("Failed to load user data:", error.message);
    throw error; // Re-throw for caller
  }
}

// 3. Multiple async operations
async function runTestSuite() {
  console.log("Starting test suite...");
  
  try {
    // Sequential: one after another
    const loginTest = await runTest("Login");
    console.log("Login complete");
    
    // Parallel: all at once
    const [checkoutTest, paymentTest] = await Promise.all([
      runTest("Checkout"),
      runTest("Payment")
    ]);
    
    // Sequential again
    const logoutTest = await runTest("Logout");
    
    return {
      login: loginTest,
      checkout: checkoutTest,
      payment: paymentTest,
      logout: logoutTest
    };
  } catch (error) {
    console.error("Test suite failed:", error.message);
  }
}

function runTest(name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.3;
      if (success) {
        resolve({ name, status: "passed", duration: Math.random() * 3000 });
      } else {
        reject(new Error(`${name} test failed`));
      }
    }, 1000);
  });
}

// 4. Practical test automation
async function automationTest() {
  try {
    // Navigate
    console.log("Navigating to login page...");
    await navigate("https://example.com/login");
    
    // Login
    console.log("Logging in...");
    await fillForm({ username: "admin", password: "password" });
    await submitForm();
    await waitForNavigation();
    
    // Verify
    const isLoggedIn = await isElement(".dashboard");
    console.log("Login successful:", isLoggedIn);
    
    return isLoggedIn;
  } catch (error) {
    console.error("Test failed:", error.message);
    return false;
  }
}

function navigate(url) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`Navigated to ${url}`);
      resolve();
    }, 500);
  });
}

function fillForm(fields) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("Form filled:", fields);
      resolve();
    }, 500);
  });
}

function submitForm() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("Form submitted");
      resolve();
    }, 300);
  });
}

function waitForNavigation() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("Navigation complete");
      resolve();
    }, 500);
  });
}

function isElement(selector) {
  return new Promise(resolve => {
    setTimeout(() => resolve(true), 300);
  });
}

// 5. Retry logic
async function fetchWithRetry(fn, retries = 3, delay = 1000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`Attempt ${attempt}...`);
      return await fn();
    } catch (error) {
      if (attempt === retries) {
        throw error; // Last attempt, throw error
      }
      console.log(`Failed, retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// Usage
async function testWithRetry() {
  const result = await fetchWithRetry(async () => {
    const random = Math.random();
    if (random > 0.7) {
      return "Success!";
    } else {
      throw new Error("Random failure");
    }
  }, 5, 1000);
  
  console.log("Final result:", result);
}
```

---

### **Exercise 4.4: Handling Promise Concurrency**

**Objective:** Master Promise.all, Promise.race, and Promise.allSettled

**Task:**
```javascript
// 1. Use Promise.all for parallel operations
// 2. Implement Promise.race for timeout handling
// 3. Use Promise.allSettled for partial failures
// 4. Practical test scenario with multiple concurrent operations
```

**Solution:**
```javascript
// 1. Promise.all - all must succeed
async function runAllTests() {
  const tests = [
    runTest("Login", 1000),
    runTest("Checkout", 2000),
    runTest("Payment", 1500)
  ];
  
  try {
    const results = await Promise.all(tests);
    console.log("All tests passed:", results);
  } catch (error) {
    console.error("One or more tests failed:", error.message);
  }
}

function runTest(name, duration) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.2) {
        resolve({ name, status: "passed", duration });
      } else {
        reject(new Error(`${name} failed`));
      }
    }, duration);
  });
}

// 2. Promise.race - first to complete wins
async function testWithTimeout(testFn, timeout = 5000) {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error("Test timeout")), timeout);
  });
  
  try {
    const result = await Promise.race([testFn(), timeoutPromise]);
    return result;
  } catch (error) {
    console.error("Test failed:", error.message);
  }
}

// Usage
async function quickTest() {
  const result = await testWithTimeout(async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return "Test passed";
  }, 5000);
  
  console.log(result); // "Test passed"
}

// 3. Promise.allSettled - all complete (even if some fail)
async function runAllTestsRegardless() {
  const tests = [
    runTest("Login", 1000),
    runTest("Checkout", 2000),
    runTest("Payment", 1500)
  ];
  
  const results = await Promise.allSettled(tests);
  
  const summary = {
    passed: results.filter(r => r.status === "fulfilled").length,
    failed: results.filter(r => r.status === "rejected").length,
    results: results
  };
  
  console.log("Test summary:", summary);
}

// 4. Practical scenario - parallel API calls
async function loadTestData() {
  try {
    const [users, products, config] = await Promise.all([
      fetchUsers(),
      fetchProducts(),
      fetchConfig()
    ]);
    
    return { users, products, config };
  } catch (error) {
    console.error("Failed to load test data:", error.message);
    return null;
  }
}

function fetchUsers() {
  return new Promise(resolve => {
    setTimeout(() => resolve([{ id: 1, name: "User 1" }]), 500);
  });
}

function fetchProducts() {
  return new Promise(resolve => {
    setTimeout(() => resolve([{ id: 1, name: "Product 1" }]), 600);
  });
}

function fetchConfig() {
  return new Promise(resolve => {
    setTimeout(() => resolve({ env: "test", debug: true }), 400);
  });
}
```

---

### **Exercise 4.5: Real-World Test Scenario**

**Objective:** Apply async concepts to complete test workflow

**Task:**
```javascript
// Build a complete test runner with:
// - Setup phase
// - Test execution (parallel)
// - Teardown phase
// - Error handling
// - Retry mechanism
// - Reporting
```

**Solution:**
```javascript
class TestRunner {
  constructor(config = {}) {
    this.config = config;
    this.results = [];
    this.startTime = null;
    this.endTime = null;
  }
  
  async setup() {
    console.log("Setting up test environment...");
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log("Setup complete");
  }
  
  async teardown() {
    console.log("Tearing down test environment...");
    await new Promise(resolve => setTimeout(resolve, 300));
    console.log("Teardown complete");
  }
  
  async runTests(testArray) {
    this.startTime = Date.now();
    
    try {
      // Setup
      await this.setup();
      
      // Run tests in parallel
      console.log("\nRunning tests...");
      const promises = testArray.map(test => 
        this.runTestWithRetry(test)
      );
      
      this.results = await Promise.allSettled(promises);
      
      // Teardown
      await this.teardown();
      
    } catch (error) {
      console.error("Test execution failed:", error.message);
    } finally {
      this.endTime = Date.now();
    }
  }
  
  async runTestWithRetry(test, retries = 2) {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const result = await test.fn();
        return {
          name: test.name,
          status: "passed",
          duration: result.duration,
          attempt: attempt
        };
      } catch (error) {
        if (attempt === retries) {
          return {
            name: test.name,
            status: "failed",
            error: error.message,
            attempt: attempt
          };
        }
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
  }
  
  generateReport() {
    const passed = this.results.filter(r => 
      r.status === "fulfilled" && r.value.status === "passed"
    ).length;
    
    const failed = this.results.filter(r =>
      r.status === "fulfilled" && r.value.status === "failed"
    ).length;
    
    const duration = this.endTime - this.startTime;
    
    return {
      timestamp: new Date().toISOString(),
      summary: {
        total: this.results.length,
        passed: passed,
        failed: failed,
        passRate: `${((passed / this.results.length) * 100).toFixed(2)}%`,
        duration: `${duration}ms`
      },
      tests: this.results.map(r => 
        r.status === "fulfilled" ? r.value : r.reason
      )
    };
  }
}

// Usage
async function main() {
  const testRunner = new TestRunner({
    environment: "test",
    headless: true
  });
  
  const tests = [
    {
      name: "User Login Test",
      fn: async () => {
        await new Promise(resolve => setTimeout(resolve, 800));
        return { duration: 800 };
      }
    },
    {
      name: "Product Search Test",
      fn: async () => {
        await new Promise(resolve => setTimeout(resolve, 1200));
        return { duration: 1200 };
      }
    },
    {
      name: "Checkout Test",
      fn: async () => {
        await new Promise(resolve => setTimeout(resolve, 1500));
        return { duration: 1500 };
      }
    }
  ];
  
  await testRunner.runTests(tests);
  const report = testRunner.generateReport();
  
  console.log("\n=== Test Report ===");
  console.log(JSON.stringify(report, null, 2));
}

main();
```

---

## ❓ **Quiz: Async JavaScript**

**Instructions:** Answer all 10 questions. Target score: 8/10 (80%)

### **Question 1: Async vs Sync**
What is the main advantage of asynchronous code?
- A) It's faster
- B) It doesn't block execution ✅ **CORRECT**
- C) It's easier to read
- D) It uses less memory

**Explanation:** Async allows other code to run while waiting for operations.

---

### **Question 2: Callback Hell**
What problem does callback hell create?
- A) Slow performance
- B) More memory usage
- C) Hard to read and maintain code ✅ **CORRECT**
- D) Security vulnerabilities

**Explanation:** Nested callbacks make code deeply indented and hard to follow.

---

### **Question 3: Promise States**
How many states can a Promise have?
- A) 2
- B) 3 ✅ **CORRECT** (pending, fulfilled, rejected)
- C) 4
- D) Unlimited

**Explanation:** Promise has 3 possible states.

---

### **Question 4: Promise.all()**
What happens if one promise in Promise.all() rejects?
- A) It ignores the rejection
- B) The entire chain rejects ✅ **CORRECT**
- C) It retries automatically
- D) It returns undefined

**Explanation:** Promise.all() fails if any promise fails.

---

### **Question 5: Async/Await Return Value**
What does an async function return?
- A) The value directly
- B) A Promise ✅ **CORRECT**
- C) Undefined
- D) An error

**Explanation:** Async functions always return a Promise.

---

### **Question 6: Await Usage**
Where can you use the 'await' keyword?
- A) Anywhere in code
- B) Only inside async functions ✅ **CORRECT**
- C) In regular functions
- D) In loops only

**Explanation:** await can only be used inside async functions (or at top-level in modules).

---

### **Question 7: Try/Catch with Async**
What does try/catch catch in async functions?
- A) Only thrown errors
- B) Promise rejections ✅ **CORRECT**
- C) Network errors only
- D) All errors

**Explanation:** try/catch catches both thrown errors and rejected promises.

---

### **Question 8: Promise.race()**
What does Promise.race() return?
- A) Array of all results
- B) First promise that settles ✅ **CORRECT**
- C) First promise that resolves
- D) Slowest promise

**Explanation:** Promise.race() returns whichever promise settles first.

---

### **Question 9: Promise.allSettled()**
What does Promise.allSettled() do differently from Promise.all()?
- A) It's faster
- B) It returns even if some fail ✅ **CORRECT**
- C) It retries on failure
- D) It's deprecated

**Explanation:** allSettled waits for all promises (success or failure), all() fails on first rejection.

---

### **Question 10: Sequential vs Parallel**
How do you run promises sequentially with async/await?
- A) Use Promise.all()
- B) Use await for each separately ✅ **CORRECT**
- C) Use Promise.race()
- D) Use callbacks

**Explanation:** Sequential is achieved by awaiting promises one after another. Parallel uses Promise.all().

---

## ✅ **Quiz Answer Key**

| Q | Answer | Topic |
|---|--------|-------|
| 1 | B | Async advantages |
| 2 | C | Callback hell |
| 3 | B | Promise states |
| 4 | B | Promise.all() |
| 5 | B | Async return |
| 6 | B | Await usage |
| 7 | B | Error handling |
| 8 | B | Promise.race() |
| 9 | B | Promise.allSettled() |
| 10 | B | Sequential execution |

**Your Score:** ___/10

**Interpretation:**
- 9-10: ✅ Excellent! Ready for Day 05
- 7-8: 🟡 Good! Review weak areas
- Below 7: 🔴 Review theory again

---

## 📋 **Daily Assignment**

### **Assignment 4.1: Build Async Test Coordinator**

**Objective:** Create a complete async testing system

**Requirements:**
1. Create test queue manager
2. Run tests with configurable concurrency
3. Implement retry mechanism
4. Handle partial failures gracefully
5. Generate comprehensive reports

**Starter Code:**
```javascript
class AsyncTestCoordinator {
  constructor(options = {}) {
    this.concurrency = options.concurrency || 3;
    this.maxRetries = options.maxRetries || 2;
    this.tests = [];
    this.results = [];
  }
  
  addTest(test) {
    // Add test to queue
  }
  
  async run() {
    // Execute tests with concurrency limit
  }
  
  getReport() {
    // Generate detailed report
  }
}
```

**Example Usage:**
```javascript
const coordinator = new AsyncTestCoordinator({
  concurrency: 3,
  maxRetries: 2
});

coordinator.addTest({
  name: "Login Test",
  fn: async () => { /* test implementation */ }
});

await coordinator.run();
const report = coordinator.getReport();
console.log(report);
```

**Solution Outline:**
```javascript
class AsyncTestCoordinator {
  constructor(options = {}) {
    this.concurrency = options.concurrency || 3;
    this.maxRetries = options.maxRetries || 2;
    this.tests = [];
    this.results = [];
    this.startTime = null;
    this.endTime = null;
  }
  
  addTest(test) {
    this.tests.push(test);
  }
  
  async run() {
    this.startTime = Date.now();
    
    // Run with concurrency limit
    const queue = [...this.tests];
    const executing = [];
    
    while (queue.length > 0 || executing.length > 0) {
      while (executing.length < this.concurrency && queue.length > 0) {
        const test = queue.shift();
        const promise = this.runTestWithRetry(test)
          .then(result => {
            this.results.push(result);
            executing.splice(executing.indexOf(promise), 1);
          });
        
        executing.push(promise);
      }
      
      if (executing.length > 0) {
        await Promise.race(executing);
      }
    }
    
    this.endTime = Date.now();
  }
  
  async runTestWithRetry(test, attempt = 1) {
    try {
      const duration = Date.now();
      await test.fn();
      return {
        name: test.name,
        status: "passed",
        attempt: attempt,
        duration: Date.now() - duration
      };
    } catch (error) {
      if (attempt < this.maxRetries) {
        return this.runTestWithRetry(test, attempt + 1);
      }
      return {
        name: test.name,
        status: "failed",
        attempt: attempt,
        error: error.message
      };
    }
  }
  
  getReport() {
    const passed = this.results.filter(r => r.status === "passed").length;
    const failed = this.results.filter(r => r.status === "failed").length;
    
    return {
      summary: {
        total: this.results.length,
        passed: passed,
        failed: failed,
        passRate: `${((passed / this.results.length) * 100).toFixed(2)}%`,
        duration: `${this.endTime - this.startTime}ms`,
        concurrency: this.concurrency
      },
      tests: this.results
    };
  }
}
```

---

## 🎯 **Daily Checklist**

Track your Day 04 progress:

- [ ] Reviewed Day 01-03 concepts
- [ ] Completed Theory Session 1 (Callbacks & Sync/Async)
- [ ] Completed Exercise 4.1 (Callbacks)
- [ ] Completed Exercise 4.2 (Promises)
- [ ] Completed Theory Session 2 (Async/Await)
- [ ] Completed Exercise 4.3 (Async/Await)
- [ ] Completed Exercise 4.4 (Promise Concurrency)
- [ ] Completed Exercise 4.5 (Real-World Scenario)
- [ ] Answered all 10 quiz questions
- [ ] Scored 80%+ on quiz (8/10)
- [ ] Completed Assignment 4.1 (Async Test Coordinator)
- [ ] Committed code to GitHub
- [ ] Updated personal learning journal

**Daily Metrics:**
- Quiz Score: ___/10
- Confidence Level (1-5): ___
- Time Spent: ___ hours
- Challenges Faced: _________________

---

## 📚 **Key Takeaways from Day 04**

1. **Async code is essential** for modern testing without blocking
2. **Callbacks work but Promise/async/await are cleaner**
3. **Always handle errors** with try/catch or .catch()
4. **Promise.all() for parallel**, sequential await for order
5. **Async functions always return Promises** automatically
6. **Retry logic is crucial** for flaky test scenarios
7. **Concurrency control matters** for resource management
8. **Test timeouts need Promise.race()**

---

## 🔗 **Resources for Review**

- [MDN: Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [MDN: Async/Await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [MDN: Promise Concurrency](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#promise_concurrency)
- [JavaScript.info: Promises](https://javascript.info/promise-basics)
- [JavaScript.info: Async/Await](https://javascript.info/async-await)

---

## 🚀 **Ready for Day 05?**

By completing Day 04, you've mastered:
- ✅ Synchronous vs asynchronous execution
- ✅ Callbacks and callback patterns
- ✅ Promises (creation, chaining, methods)
- ✅ Async/await syntax and patterns
- ✅ Error handling (try/catch, .catch())
- ✅ Multiple promise handling (all, race, allSettled)
- ✅ Practical test automation patterns

**Tomorrow (Day 05):** You'll learn TypeScript - adding type safety to your JavaScript! This bridges JavaScript and production-ready Playwright code.

---

**Fantastic work on Day 04, Karan!** 🎉

You've tackled one of the hardest concepts - asynchronous programming! This is where many developers struggle, but you've got it. Async/await is essential for Playwright automation where every action is async.

You're 4 days in! The momentum is incredible! 🔥

---

*Last Updated: December 12, 2025*  
*Day 04 Complete Guide v1.0*  
*Next: Day 05 - TypeScript Essentials*

---
