# Day 02: JavaScript Fundamentals Part 2 - Control Flow, Loops & Functions

**Date:** Day 2 of 25  
**Duration:** 8 hours  
**Difficulty:** Beginner-Intermediate  
**Focus Area:** Control Structures & Functions

---

## 🎯 **Learning Objectives**

By the end of Day 02, you will:

✅ Master conditional statements (if/else, switch)  
✅ Understand and implement all loop types (for, while, do-while, for...of)  
✅ Create and use functions effectively  
✅ Master arrow functions and anonymous functions  
✅ Understand function scope and closure concepts  
✅ Build practical automation testing functions  

---

## ⏰ **Daily Schedule (8 Hours)**

| Time | Activity | Duration |
|------|----------|----------|
| 8:00 - 8:30 | Review Day 01 & objectives | 30 min |
| 8:30 - 10:30 | **Theory Session 1:** Control Flow | 2 hours |
| 10:30 - 11:00 | Break | 30 min |
| 11:00 - 1:00 PM | **Exercise Session 1:** If/Else & Switch | 2 hours |
| 1:00 - 2:00 PM | Lunch break | 1 hour |
| 2:00 - 4:00 PM | **Theory Session 2:** Loops & Functions | 2 hours |
| 4:00 - 4:30 PM | Break | 30 min |
| 4:30 - 6:30 PM | **Exercise Session 2:** Loops & Functions | 2 hours |

---

## 📚 **THEORY SESSION 1: Control Flow (2 hours)**

### **Part 2.1: Conditional Statements - if/else**

Conditional statements let your code make decisions based on conditions.

#### **Basic if Statement**

```javascript
// Simplest form - execute if condition is true
if (condition) {
  // code executes if condition is true
}

// Example: Test status check
let testPassed = true;

if (testPassed) {
  console.log("✓ Test passed successfully");
}
```

#### **if...else Statement**

```javascript
// Execute different code based on condition
if (condition) {
  // Execute if true
} else {
  // Execute if false
}

// Example: Login validation
let loginAttempts = 3;
let maxAttempts = 5;

if (loginAttempts < maxAttempts) {
  console.log("✓ Login attempts remaining");
} else {
  console.log("✗ Account locked - too many attempts");
}
```

#### **if...else if...else Statement**

```javascript
// Multiple conditions - checks in order
if (condition1) {
  // Execute if condition1 is true
} else if (condition2) {
  // Execute if condition1 false AND condition2 true
} else if (condition3) {
  // Execute if condition1 & 2 false AND condition3 true
} else {
  // Execute if all conditions false
}

// Example: Test result categorization
let testScore = 85;

if (testScore >= 90) {
  console.log("Grade: A (Excellent)");
} else if (testScore >= 80) {
  console.log("Grade: B (Good)");
} else if (testScore >= 70) {
  console.log("Grade: C (Satisfactory)");
} else {
  console.log("Grade: F (Fail)");
}
// Output: "Grade: B (Good)"
```

#### **Nested if Statements**

```javascript
// if statements inside if statements
let isLoggedIn = true;
let isAdmin = false;

if (isLoggedIn) {
  console.log("✓ User is logged in");
  
  if (isAdmin) {
    console.log("✓ User is admin - grant special access");
  } else {
    console.log("User is regular member");
  }
}
```

#### **Ternary Operator (Shorthand if/else)**

```javascript
// condition ? valueIfTrue : valueIfFalse

let testPassed = true;
let message = testPassed ? "✓ Test passed" : "✗ Test failed";
console.log(message); // "✓ Test passed"

// Example: Set timeout based on test type
let testType = "integration";
let timeout = testType === "unit" ? 5000 : 30000;
console.log(`Test timeout: ${timeout}ms`);

// Nested ternary (avoid - hard to read)
let score = 85;
let grade = score >= 90 ? "A" : score >= 80 ? "B" : "C";
console.log(grade); // "B"
```

---

### **Part 2.2: Switch Statement**

Switch is better than multiple if/else when checking one variable against many values.

#### **Basic Switch Syntax**

```javascript
switch (expression) {
  case value1:
    // Execute if expression === value1
    break; // IMPORTANT: stop here
  
  case value2:
    // Execute if expression === value2
    break;
  
  default:
    // Execute if no cases match
}

// Example: Browser selection in tests
let browser = "firefox";

switch (browser) {
  case "chrome":
    console.log("Launching Chrome browser");
    break;
  
  case "firefox":
    console.log("Launching Firefox browser");
    break;
  
  case "safari":
    console.log("Launching Safari browser");
    break;
  
  default:
    console.log("Unknown browser");
}
// Output: "Launching Firefox browser"
```

#### **Important: The break Statement**

```javascript
// Without break - FALLS THROUGH (usually bad!)
let status = "pending";

switch (status) {
  case "pending":
    console.log("Test is pending");
    // NO BREAK - falls through!
  case "running":
    console.log("Test is running");
  case "completed":
    console.log("Test is completed");
    break;
  default:
    console.log("Unknown status");
}
// Output: "Test is pending", "Test is running", "Test is completed"

// With break - STOPS (correct!)
switch (status) {
  case "pending":
    console.log("Test is pending");
    break; // Stops here
  case "running":
    console.log("Test is running");
    break;
  default:
    console.log("Unknown status");
}
// Output: "Test is pending"
```

#### **Switch with Multiple Cases (Intentional Fallthrough)**

```javascript
// Sometimes fallthrough is intentional
let day = 3; // Wednesday

switch (day) {
  case 1:
  case 2:
  case 3:
  case 4:
  case 5:
    console.log("Weekday");
    break;
  
  case 6:
  case 7:
    console.log("Weekend");
    break;
}
// Output: "Weekday"
```

#### **Switch vs if/else Comparison**

```javascript
// Switch is cleaner when checking one value against many options

// Using if/else (messy)
let environment = "production";
if (environment === "development") {
  console.log("Dev settings");
} else if (environment === "staging") {
  console.log("Staging settings");
} else if (environment === "production") {
  console.log("Production settings");
} else {
  console.log("Unknown environment");
}

// Using switch (cleaner)
switch (environment) {
  case "development":
    console.log("Dev settings");
    break;
  case "staging":
    console.log("Staging settings");
    break;
  case "production":
    console.log("Production settings");
    break;
  default:
    console.log("Unknown environment");
}
```

---

## 🔨 **EXERCISE SESSION 1 (2 hours)**

### **Exercise 2.1: If/Else Conditions**

**Objective:** Practice conditional logic for test automation

**Task:**
```javascript
// Create a function to validate login credentials
// Requirements:
// 1. Check if username is provided (not empty)
// 2. Check if password is provided (not empty)
// 3. Check if password is at least 8 characters
// 4. Check if username contains '@' (email format)
// Return appropriate messages for each validation failure

function validateLogin(username, password) {
  // Write your code here
  // Return validation status and message
}

// Test cases:
console.log(validateLogin("", "password123"));           // Username empty
console.log(validateLogin("user@test.com", ""));         // Password empty
console.log(validateLogin("user@test.com", "short"));    // Password too short
console.log(validateLogin("usertest.com", "password123")); // Username no @
console.log(validateLogin("user@test.com", "password123")); // Valid
```

**Solution:**
```javascript
function validateLogin(username, password) {
  // Check username not empty
  if (!username || username.trim() === "") {
    return { valid: false, message: "✗ Username cannot be empty" };
  }
  
  // Check password not empty
  if (!password || password.trim() === "") {
    return { valid: false, message: "✗ Password cannot be empty" };
  }
  
  // Check password length
  if (password.length < 8) {
    return { valid: false, message: `✗ Password must be at least 8 characters (current: ${password.length})` };
  }
  
  // Check username format (email)
  if (!username.includes("@")) {
    return { valid: false, message: "✗ Username must be in email format (contain @)" };
  }
  
  // All validations passed
  return { valid: true, message: "✓ Login credentials are valid" };
}

// Test cases
console.log(validateLogin("", "password123"));
// Output: { valid: false, message: "✗ Username cannot be empty" }

console.log(validateLogin("user@test.com", "password123"));
// Output: { valid: true, message: "✓ Login credentials are valid" }
```

---

### **Exercise 2.2: Switch Statements**

**Objective:** Use switch for multi-option selection

**Task:**
```javascript
// Create a function that returns test environment configuration
// Based on environment string, return:
// - baseURL
// - timeout
// - isProduction flag

function getEnvironmentConfig(env) {
  // Use switch statement
  // Return object with configuration
}

// Test cases:
console.log(getEnvironmentConfig("dev"));
console.log(getEnvironmentConfig("staging"));
console.log(getEnvironmentConfig("production"));
console.log(getEnvironmentConfig("unknown"));
```

**Solution:**
```javascript
function getEnvironmentConfig(env) {
  let config = {
    baseURL: "",
    timeout: 30000,
    isProduction: false
  };
  
  switch (env.toLowerCase()) {
    case "dev":
    case "development":
      config.baseURL = "https://dev.example.com";
      config.timeout = 10000;
      config.isProduction = false;
      break;
    
    case "staging":
    case "stage":
      config.baseURL = "https://staging.example.com";
      config.timeout = 15000;
      config.isProduction = false;
      break;
    
    case "prod":
    case "production":
      config.baseURL = "https://api.example.com";
      config.timeout = 30000;
      config.isProduction = true;
      break;
    
    default:
      return { error: "Unknown environment" };
  }
  
  return config;
}

// Test cases
console.log(getEnvironmentConfig("dev"));
/* Output:
{
  baseURL: "https://dev.example.com",
  timeout: 10000,
  isProduction: false
}
*/

console.log(getEnvironmentConfig("production"));
/* Output:
{
  baseURL: "https://api.example.com",
  timeout: 30000,
  isProduction: true
}
*/
```

---

## 📚 **THEORY SESSION 2: Loops & Functions (2 hours)**

### **Part 2.3: Loops**

Loops repeat code multiple times. Essential for test automation!

#### **1. for Loop (Most Common)**

```javascript
// Basic syntax: for (initialization; condition; increment)
for (let i = 0; i < 3; i++) {
  console.log(`Iteration ${i}`);
}
// Output: "Iteration 0", "Iteration 1", "Iteration 2"

// Example: Test multiple users
const users = ["user1", "user2", "user3"];

for (let i = 0; i < users.length; i++) {
  console.log(`Testing ${users[i]}`);
}
// Output: Testing user1, Testing user2, Testing user3

// Backward loop
for (let i = 5; i >= 1; i--) {
  console.log(i); // 5, 4, 3, 2, 1
}

// Loop with steps
for (let i = 0; i <= 10; i += 2) {
  console.log(i); // 0, 2, 4, 6, 8, 10
}
```

#### **2. while Loop (Unknown Iterations)**

```javascript
// Use when you don't know how many iterations needed

let counter = 0;
while (counter < 3) {
  console.log(`Counter: ${counter}`);
  counter++; // MUST increment, or infinite loop!
}
// Output: "Counter: 0", "Counter: 1", "Counter: 2"

// Example: Retry logic in tests
let attempts = 0;
let maxAttempts = 3;
let testPassed = false;

while (attempts < maxAttempts && !testPassed) {
  console.log(`Attempt ${attempts + 1} of ${maxAttempts}`);
  // Try to run test
  testPassed = true; // Simulating success on first try
  attempts++;
}

if (testPassed) {
  console.log("✓ Test passed");
} else {
  console.log("✗ Test failed after all attempts");
}
```

#### **3. do...while Loop (At Least Once)**

```javascript
// Executes at least once, even if condition false

let i = 0;
do {
  console.log(i);
  i++;
} while (i < 3); // 0, 1, 2

// When condition is immediately false:
let x = 10;
do {
  console.log(x); // Still executes once!
} while (x < 5); // Condition false, but code ran once

// Example: Retry mechanism (always try at least once)
let testResult = null;
let retryCount = 0;

do {
  console.log(`Running test, attempt ${retryCount + 1}`);
  testResult = runTest(); // Simulated function
  retryCount++;
} while (testResult === null && retryCount < 3);
```

#### **4. for...of Loop (Modern - Iterate Values)**

```javascript
// Simpler syntax for iterating over array values

const colors = ["red", "green", "blue"];

for (let color of colors) {
  console.log(color);
}
// Output: "red", "green", "blue"

// Example: Test each product
const products = ["laptop", "mouse", "keyboard"];

for (let product of products) {
  console.log(`Testing product: ${product}`);
}

// Works with strings too
for (let char of "test") {
  console.log(char); // t, e, s, t
}
```

#### **5. for...in Loop (Iterate Keys/Properties)**

```javascript
// Iterate over object properties

const user = {
  name: "Karan",
  email: "karan@test.com",
  age: 38
};

for (let key in user) {
  console.log(`${key}: ${user[key]}`);
}
// Output: name: Karan, email: karan@test.com, age: 38

// for...of vs for...in
const arr = ["a", "b", "c"];

for (let value of arr) {
  console.log(value); // a, b, c (values)
}

for (let index in arr) {
  console.log(index); // 0, 1, 2 (keys/indexes)
}
```

#### **Loop Control Statements**

```javascript
// break - exit loop immediately
for (let i = 0; i < 5; i++) {
  if (i === 3) {
    break; // Exit loop when i is 3
  }
  console.log(i); // 0, 1, 2
}

// continue - skip to next iteration
for (let i = 0; i < 5; i++) {
  if (i === 2) {
    continue; // Skip when i is 2
  }
  console.log(i); // 0, 1, 3, 4
}

// Example: Find first passing test
const testResults = ["failed", "failed", "passed", "passed"];

for (let result of testResults) {
  if (result === "passed") {
    console.log("✓ Found passing test");
    break; // Stop searching
  }
}
```

---

### **Part 2.4: Functions**

Functions are reusable blocks of code - fundamental for automation testing!

#### **Function Declaration**

```javascript
// Define function
function greet(name) {
  console.log(`Hello, ${name}!`);
}

// Call function
greet("Karan");  // Output: "Hello, Karan!"
greet("Amee");   // Output: "Hello, Amee!"

// Function with return value
function add(a, b) {
  return a + b;
}

const result = add(5, 3);
console.log(result); // 8

// Example: Automation test function
function validateEmail(email) {
  if (typeof email !== "string") {
    return false;
  }
  return email.includes("@") && email.includes(".");
}

console.log(validateEmail("test@example.com")); // true
console.log(validateEmail("invalid-email"));     // false
```

#### **Function Parameters & Arguments**

```javascript
// Parameters: defined in function
// Arguments: passed when calling function

function test(param1, param2, param3) {
  console.log(param1, param2, param3);
}

// Called with 3 arguments
test("a", "b", "c"); // a, b, c

// Called with fewer arguments
test("a", "b");      // a, b, undefined

// Called with more arguments
test("a", "b", "c", "d"); // d is ignored

// Default parameters
function loginTest(username = "guest", password = "pass123") {
  console.log(`Logging in as ${username}`);
}

loginTest();                    // "Logging in as guest"
loginTest("karan");             // "Logging in as karan"
loginTest("karan", "newpass");  // "Logging in as karan"
```

#### **Variable Arguments Using ...rest**

```javascript
// ...rest parameter captures remaining arguments as array

function runTests(...testNames) {
  console.log(`Running ${testNames.length} tests`);
  
  for (let testName of testNames) {
    console.log(`- ${testName}`);
  }
}

runTests("login", "checkout", "payment");
// Output:
// Running 3 tests
// - login
// - checkout
// - payment

// Practical example
function logTestResults(...results) {
  let passed = 0;
  let failed = 0;
  
  for (let result of results) {
    if (result === "pass") passed++;
    if (result === "fail") failed++;
  }
  
  console.log(`Passed: ${passed}, Failed: ${failed}`);
}

logTestResults("pass", "pass", "fail", "pass");
// Output: "Passed: 3, Failed: 1"
```

#### **Arrow Functions (Modern Syntax)**

```javascript
// Traditional function
function multiply(a, b) {
  return a * b;
}

// Arrow function (equivalent)
const multiply = (a, b) => {
  return a * b;
};

// Short arrow function (implicit return)
const multiply = (a, b) => a * b;

// Single parameter (parentheses optional)
const square = x => x * x;

// No parameters (need parentheses)
const getTimestamp = () => new Date();

// Example: Test filtering
const testResults = ["pass", "fail", "pass", "fail", "pass"];

// Traditional
const passedTests = testResults.filter(function(result) {
  return result === "pass";
});

// Arrow function (cleaner)
const passedTests = testResults.filter(result => result === "pass");
console.log(passedTests); // ["pass", "pass", "pass"]

// Arrow function example
const testTimeout = (testName) => {
  console.log(`Test "${testName}" timeout set to 30s`);
};

testTimeout("login"); // Output: "Test "login" timeout set to 30s"
```

#### **Anonymous Functions**

```javascript
// Functions without names - used as arguments

// As callback
setTimeout(function() {
  console.log("Test timeout reached");
}, 5000);

// As arrow function (cleaner)
setTimeout(() => {
  console.log("Test timeout reached");
}, 5000);

// Assigned to variable
const sayHello = function(name) {
  console.log(`Hello, ${name}`);
};

sayHello("Karan"); // "Hello, Karan"
```

#### **Function Scope & Closure**

```javascript
// Function scope - variables only exist in function

function outer() {
  let outerVar = "I'm in outer function";
  
  function inner() {
    let innerVar = "I'm in inner function";
    console.log(outerVar); // Can access outer
  }
  
  inner();
  // console.log(innerVar); // ERROR - can't access inner
}

outer();

// Closure - inner function remembers outer variables
function createCounter() {
  let count = 0; // Private variable
  
  return function() {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

// Practical example: Test ID generator
function createTestIDGenerator() {
  let testID = 0;
  
  return function() {
    testID++;
    return `TEST_${testID}`;
  };
}

const generateTestID = createTestIDGenerator();
console.log(generateTestID()); // "TEST_1"
console.log(generateTestID()); // "TEST_2"
console.log(generateTestID()); // "TEST_3"
```

---

## 🔨 **EXERCISE SESSION 2 (2 hours)**

### **Exercise 2.3: Loops**

**Objective:** Master loops for test automation scenarios

**Task:**
```javascript
// 1. Create array of test cases: ["login", "checkout", "payment", "profile"]
// 2. Use for loop to iterate and print each test

// 3. Create array of test scores: [85, 92, 78, 95, 88]
// 4. Use for...of loop to find average score

// 5. Create object with user data
//    Use for...in loop to print all properties

// 6. Create while loop that logs numbers 1-10

// 7. Use do...while to validate user input (simulate 3 attempts)

// 8. Use break to exit loop when condition met
//    Find first "failed" test in results array

// 9. Use continue to skip certain tests
//    Skip tests that are "skipped" in results array

// 10. Nested loops - create multiplication table 1-3
```

**Solution:**
```javascript
// 1. For loop - iterate array
const testCases = ["login", "checkout", "payment", "profile"];

for (let i = 0; i < testCases.length; i++) {
  console.log(`Test ${i + 1}: ${testCases[i]}`);
}

// 2. For...of - calculate average
const testScores = [85, 92, 78, 95, 88];
let total = 0;

for (let score of testScores) {
  total += score;
}

const average = total / testScores.length;
console.log(`Average score: ${average.toFixed(2)}`); // 87.60

// 3. For...in - object properties
const userData = {
  name: "Karan",
  email: "karan@test.com",
  userId: 123
};

for (let key in userData) {
  console.log(`${key}: ${userData[key]}`);
}

// 4. While loop - count 1-10
let count = 1;
while (count <= 10) {
  console.log(count);
  count++;
}

// 5. Do...while - simulate input validation
let attempts = 0;
let validInput = false;

do {
  attempts++;
  console.log(`Attempt ${attempts}`);
  if (attempts >= 2) validInput = true; // Simulate success on attempt 2
} while (!validInput && attempts < 3);

// 6. Break - find first failure
const results = ["pass", "pass", "fail", "pass"];

for (let result of results) {
  if (result === "fail") {
    console.log("Found failed test!");
    break;
  }
}

// 7. Continue - skip skipped tests
const testStatuses = ["pass", "skipped", "pass", "skipped", "fail"];

for (let status of testStatuses) {
  if (status === "skipped") {
    continue; // Skip this iteration
  }
  console.log(`Processing: ${status}`);
}

// 8. Nested loops - multiplication table
for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 3; j++) {
    console.log(`${i} × ${j} = ${i * j}`);
  }
}
```

---

### **Exercise 2.4: Functions for Automation**

**Objective:** Create reusable functions for testing

**Task:**
```javascript
// 1. Create function to validate test data
//    Parameters: object with test properties
//    Return: true if valid, false otherwise
//    Check: has testName, testType, expectedResult

// 2. Create function with default parameters
//    Function: createTestReport(testName, status="pending", duration=0)
//    Return formatted string

// 3. Create arrow function to filter test results
//    Filter array for only "passed" results

// 4. Create function that returns another function (closure)
//    createTestLogger - returns function that logs test names
//    Each call should increment a counter

// 5. Create function with ...rest parameter
//    collectResults(...tests) - logs all tests

// 6. Create recursive function
//    fibonacci(n) - return nth fibonacci number
```

**Solution:**
```javascript
// 1. Validate test data
function validateTestData(testData) {
  if (!testData || typeof testData !== "object") {
    return false;
  }
  
  // Check required properties
  if (!testData.testName || testData.testName === "") {
    console.log("Missing testName");
    return false;
  }
  
  if (!testData.testType || testData.testType === "") {
    console.log("Missing testType");
    return false;
  }
  
  if (!testData.expectedResult) {
    console.log("Missing expectedResult");
    return false;
  }
  
  return true;
}

// Test
console.log(validateTestData({
  testName: "Login",
  testType: "functional",
  expectedResult: "success"
})); // true

// 2. Create test report with defaults
function createTestReport(testName, status = "pending", duration = 0) {
  return `Test: ${testName} | Status: ${status} | Duration: ${duration}ms`;
}

console.log(createTestReport("Login"));
// "Test: Login | Status: pending | Duration: 0ms"

console.log(createTestReport("Checkout", "passed", 2500));
// "Test: Checkout | Status: passed | Duration: 2500ms"

// 3. Arrow function to filter
const testResults = ["pass", "fail", "pass", "fail", "pass"];
const filterPassed = (results) => results.filter(r => r === "pass");

console.log(filterPassed(testResults)); // ["pass", "pass", "pass"]

// 4. Closure - test logger
function createTestLogger() {
  let logCount = 0;
  
  return function(testName) {
    logCount++;
    console.log(`[${logCount}] Running: ${testName}`);
  };
}

const logger = createTestLogger();
logger("Login Test");   // [1] Running: Login Test
logger("Checkout Test"); // [2] Running: Checkout Test
logger("Payment Test");  // [3] Running: Payment Test

// 5. Rest parameters
function collectResults(...tests) {
  console.log(`Collecting ${tests.length} test results:`);
  
  for (let i = 0; i < tests.length; i++) {
    console.log(`${i + 1}. ${tests[i]}`);
  }
}

collectResults("login", "checkout", "payment", "logout");
// Collecting 4 test results:
// 1. login
// 2. checkout
// 3. payment
// 4. logout

// 6. Recursive function - fibonacci
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(6)); // 8
console.log(fibonacci(10)); // 55
```

---

### **Exercise 2.5: Test Runner Function**

**Objective:** Build a practical test automation function

**Task:**
```javascript
// Create a testRunner function that:
// 1. Takes array of test objects
// 2. Each test has: name, testFn (function), expectedResult
// 3. Runs each test
// 4. Compares actual result with expected
// 5. Logs test results
// 6. Returns summary (passed, failed, total)

// Example test data:
const tests = [
  {
    name: "1 + 1 equals 2",
    testFn: () => 1 + 1,
    expectedResult: 2
  },
  {
    name: "String concatenation",
    testFn: () => "hello" + " " + "world",
    expectedResult: "hello world"
  },
  {
    name: "Array length",
    testFn: () => [1, 2, 3].length,
    expectedResult: 3
  }
];

// Run tests
runTests(tests);
```

**Solution:**
```javascript
function runTests(testArray) {
  let passed = 0;
  let failed = 0;
  
  console.log("=== Starting Test Execution ===\n");
  
  for (let i = 0; i < testArray.length; i++) {
    const test = testArray[i];
    
    try {
      // Run test function
      const actualResult = test.testFn();
      
      // Compare with expected
      if (actualResult === test.expectedResult) {
        console.log(`✓ [${i + 1}] ${test.name}`);
        passed++;
      } else {
        console.log(`✗ [${i + 1}] ${test.name}`);
        console.log(`  Expected: ${test.expectedResult}, Got: ${actualResult}`);
        failed++;
      }
    } catch (error) {
      console.log(`✗ [${i + 1}] ${test.name} - ERROR`);
      console.log(`  Error: ${error.message}`);
      failed++;
    }
  }
  
  // Summary
  console.log("\n=== Test Summary ===");
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
  console.log(`Total: ${passed + failed}`);
  console.log(`Success Rate: ${((passed / (passed + failed)) * 100).toFixed(2)}%`);
  
  return { passed, failed, total: passed + failed };
}

// Test data
const tests = [
  {
    name: "1 + 1 equals 2",
    testFn: () => 1 + 1,
    expectedResult: 2
  },
  {
    name: "String concatenation",
    testFn: () => "hello" + " " + "world",
    expectedResult: "hello world"
  },
  {
    name: "Array length",
    testFn: () => [1, 2, 3].length,
    expectedResult: 3
  },
  {
    name: "Boolean comparison",
    testFn: () => 5 > 3,
    expectedResult: true
  }
];

// Run tests
const summary = runTests(tests);
```

---

## ❓ **Quiz: Control Flow, Loops & Functions**

**Instructions:** Answer all 10 questions. Target score: 8/10 (80%)

### **Question 1: if/else Logic**
What will this output?
```javascript
let age = 25;
if (age >= 18) {
  console.log("Adult");
} else {
  console.log("Minor");
}
```
- A) "Adult" ✅ **CORRECT**
- B) "Minor"
- C) Both
- D) Error

**Explanation:** age (25) is >= 18, so first block executes.

---

### **Question 2: Switch with Break**
What will this output?
```javascript
let status = "active";
switch (status) {
  case "active":
    console.log("Active");
  case "inactive":
    console.log("Inactive");
    break;
}
```
- A) "Active"
- B) "Inactive"
- C) "Active" then "Inactive" ✅ **CORRECT**
- D) Error

**Explanation:** Without break after "active", it falls through to "inactive".

---

### **Question 3: for Loop**
How many times does this loop execute?
```javascript
for (let i = 0; i < 5; i++) {
  console.log(i);
}
```
- A) 4 times
- B) 5 times ✅ **CORRECT**
- C) 6 times
- D) Infinite loop

**Explanation:** Loop runs for i = 0, 1, 2, 3, 4 (5 iterations).

---

### **Question 4: while Loop**
What will this output?
```javascript
let x = 3;
while (x > 0) {
  console.log(x);
  x--;
}
```
- A) 3, 2, 1 ✅ **CORRECT**
- B) 2, 1, 0
- C) 3, 2, 1, 0
- D) Infinite loop

**Explanation:** Starts at 3, decrements, stops when x = 0.

---

### **Question 5: for...of Loop**
What does this loop iterate?
```javascript
const arr = ["a", "b", "c"];
for (let item of arr) {
  console.log(item);
}
```
- A) Indexes (0, 1, 2)
- B) Values ("a", "b", "c") ✅ **CORRECT**
- C) Both indexes and values
- D) Keys

**Explanation:** for...of iterates over VALUES. for...in would iterate indexes.

---

### **Question 6: Function Return**
What will this return?
```javascript
function test() {
  return 5;
  console.log("Never executes");
}
console.log(test());
```
- A) 5 ✅ **CORRECT**
- B) undefined
- C) 5 and "Never executes"
- D) Error

**Explanation:** return exits function immediately. Code after return doesn't execute.

---

### **Question 7: Arrow Function**
Which is equivalent to the arrow function?
```javascript
const add = (a, b) => a + b;
```
- A) `function add(a, b) { return a + b; }` ✅ **CORRECT**
- B) `function add(a, b) { a + b; }`
- C) `const add = (a, b) => { a + b; };`
- D) `const add = a + b;`

**Explanation:** Arrow function with implicit return is same as traditional return.

---

### **Question 8: Function Parameters**
What will this output?
```javascript
function test(a, b = 10) {
  console.log(a + b);
}
test(5);
```
- A) 5
- B) 15 ✅ **CORRECT**
- C) undefined
- D) Error

**Explanation:** b has default value 10, so 5 + 10 = 15.

---

### **Question 9: Break in Loop**
What will this output?
```javascript
for (let i = 0; i < 5; i++) {
  if (i === 2) break;
  console.log(i);
}
```
- A) 0, 1 ✅ **CORRECT**
- B) 0, 1, 2
- C) 2
- D) 0, 1, 2, 3, 4

**Explanation:** break exits loop when i === 2. So only 0 and 1 print.

---

### **Question 10: Continue in Loop**
What will this output?
```javascript
for (let i = 0; i < 4; i++) {
  if (i === 2) continue;
  console.log(i);
}
```
- A) 0, 1, 3 ✅ **CORRECT**
- B) 0, 1, 2, 3
- C) 2
- D) 0, 1

**Explanation:** continue skips current iteration. i=2 is skipped, but loop continues.

---

## ✅ **Quiz Answer Key**

| Q | Answer | Topic |
|---|--------|-------|
| 1 | A | if/else |
| 2 | C | switch break |
| 3 | B | for loop count |
| 4 | A | while loop |
| 5 | B | for...of |
| 6 | A | return statement |
| 7 | A | arrow functions |
| 8 | B | default parameters |
| 9 | A | break |
| 10 | A | continue |

**Your Score:** 10/10

**Interpretation:**
- 9-10: ✅ Excellent! Ready for Day 03
- 7-8: 🟡 Good! Review weak areas
- Below 7: 🔴 Review theory again

---

## 📋 **Daily Assignment**

### **Assignment 2.1: Build Test Execution Engine**

**Objective:** Create a test runner that executes multiple tests and reports results

**Requirements:**
1. Create testRunner function that accepts array of tests
2. Each test object: { name, testFn, expectedResult, timeout }
3. Execute each test with timeout handling
4. Track passed/failed/skipped
5. Generate detailed report

**Starter Code:**
```javascript
class TestRunner {
  constructor() {
    this.tests = [];
    this.results = [];
  }
  
  addTest(testObj) {
    // Add test to runner
  }
  
  runAllTests() {
    // Execute all tests
    // Track results
  }
  
  getReport() {
    // Return formatted report
  }
}

// Usage
const runner = new TestRunner();
runner.addTest({ name: "Test 1", testFn: () => 1 + 1, expectedResult: 2 });
runner.addTest({ name: "Test 2", testFn: () => "a" + "b", expectedResult: "ab" });
runner.runAllTests();
console.log(runner.getReport());
```

**Example Output:**
```
=== Test Execution Report ===
✓ Test 1: PASSED
✓ Test 2: PASSED
✗ Test 3: FAILED

Total: 3 | Passed: 2 | Failed: 1 | Success Rate: 66.67%
```

**Solution Outline:**
```javascript
class TestRunner {
  constructor() {
    this.tests = [];
    this.results = [];
  }
  
  addTest(testObj) {
    // Validate test object
    if (!testObj.name || !testObj.testFn || testObj.expectedResult === undefined) {
      console.error("Invalid test object");
      return;
    }
    this.tests.push(testObj);
  }
  
  runAllTests() {
    console.log("=== Running Tests ===\n");
    
    for (let test of this.tests) {
      try {
        const actualResult = test.testFn();
        const passed = actualResult === test.expectedResult;
        
        this.results.push({
          name: test.name,
          passed: passed,
          expected: test.expectedResult,
          actual: actualResult
        });
        
        if (passed) {
          console.log(`✓ ${test.name}: PASSED`);
        } else {
          console.log(`✗ ${test.name}: FAILED`);
        }
      } catch (error) {
        this.results.push({
          name: test.name,
          passed: false,
          error: error.message
        });
        console.log(`✗ ${test.name}: ERROR - ${error.message}`);
      }
    }
  }
  
  getReport() {
    const passed = this.results.filter(r => r.passed).length;
    const failed = this.results.filter(r => !r.passed).length;
    const total = this.results.length;
    const successRate = total > 0 ? ((passed / total) * 100).toFixed(2) : 0;
    
    return `
=== Test Summary ===
Total: ${total} | Passed: ${passed} | Failed: ${failed}
Success Rate: ${successRate}%
    `;
  }
}
```

---

## 🎯 **Daily Checklist**

Track your Day 02 progress:

- [ ] Reviewed Day 01 concepts
- [ ] Completed Theory Session 1 (if/else, switch)
- [ ] Completed Exercise 2.1 (if/else conditions)
- [ ] Completed Exercise 2.2 (switch statements)
- [ ] Completed Theory Session 2 (loops, functions)
- [ ] Completed Exercise 2.3 (loops)
- [ ] Completed Exercise 2.4 (functions)
- [ ] Completed Exercise 2.5 (test runner)
- [ ] Answered all 10 quiz questions
- [ ] Scored 80%+ on quiz (8/10)
- [ ] Completed Assignment 2.1 (test execution engine)
- [ ] Committed code to GitHub
- [ ] Updated personal learning journal

**Daily Metrics:**
- Quiz Score: ___/10
- Confidence Level (1-5): ___
- Time Spent: ___ hours
- Challenges Faced: _________________

---

## 📚 **Key Takeaways from Day 02**

1. **Use if/else for complex logic**, switch for single value comparisons
2. **Always include break in switch** (unless intentional fallthrough)
3. **Use for loop for known iterations**, while for unknown iterations
4. **for...of is best for iterating arrays**, for...in for object properties
5. **Arrow functions are cleaner** but traditional functions work too
6. **Closures are powerful** - use for data privacy
7. **Functions must have clear purpose** and be reusable
8. **Test validation is critical** in automation testing

---

## 🔗 **Resources for Review**

- [MDN: if...else](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else)
- [MDN: switch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch)
- [MDN: Loops](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration)
- [MDN: Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)
- [JavaScript.info: Control Flow](https://javascript.info/ifelse)
- [JavaScript.info: Loops](https://javascript.info/while-for)
- [JavaScript.info: Functions](https://javascript.info/function-basics)

---

## 🚀 **Ready for Day 03?**

By completing Day 02, you've mastered:
- ✅ if/else and switch statements
- ✅ All loop types (for, while, do-while, for...of, for...in)
- ✅ Function declaration and arrow functions
- ✅ Function parameters and return values
- ✅ Closures and function scope
- ✅ Practical test automation functions

**Tomorrow (Day 03):** You'll learn Objects & Arrays - the data structures you'll use daily in automation testing!

---

**Excellent progress on Day 02, Karan!** 🎉

You're building solid JavaScript fundamentals. Control flow and functions are essential for every automation framework. Keep practicing!

---

*Last Updated: December 12, 2025*  
*Day 02 Complete Guide v1.0*  
*Next: Day 03 - Objects & Arrays*

---
