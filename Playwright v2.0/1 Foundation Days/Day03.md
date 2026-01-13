# Day 03: Objects & Arrays - Advanced Data Structures

**Date:** Day 3 of 25  
**Duration:** 8 hours  
**Difficulty:** Intermediate  
**Focus Area:** Data Structure Mastery

---

## 🎯 **Learning Objectives**

By the end of Day 03, you will:

✅ Master object creation, modification, and manipulation  
✅ Understand object properties and methods  
✅ Master array methods (map, filter, reduce, find, etc.)  
✅ Implement destructuring for objects and arrays  
✅ Use spread operator effectively  
✅ Build complex data structures for test automation  
✅ Work with nested objects and arrays  

---

## ⏰ **Daily Schedule (8 Hours)**

| Time | Activity | Duration |
|------|----------|----------|
| 8:00 - 8:30 | Review Day 01-02 & objectives | 30 min |
| 8:30 - 10:30 | **Theory Session 1:** Objects & Properties | 2 hours |
| 10:30 - 11:00 | Break | 30 min |
| 11:00 - 1:00 PM | **Exercise Session 1:** Object Manipulation | 2 hours |
| 1:00 - 2:00 PM | Lunch break | 1 hour |
| 2:00 - 4:00 PM | **Theory Session 2:** Arrays & Methods | 2 hours |
| 4:00 - 4:30 PM | Break | 30 min |
| 4:30 - 6:30 PM | **Exercise Session 2:** Advanced Arrays | 2 hours |

---

## 📚 **THEORY SESSION 1: Objects & Properties (2 hours)**

### **Part 3.1: Objects - Creation & Basics**

Objects are collections of key-value pairs. Fundamental for test automation data!

#### **Object Literal Notation**

```javascript
// Creating objects
const user = {
  name: "Karan",
  age: 38,
  email: "karan@example.com",
  isActive: true
};

// Accessing properties
console.log(user.name);        // "Karan"
console.log(user["age"]);      // 38
console.log(user.email);       // "karan@example.com"

// Dynamic property access (useful!)
const propertyName = "email";
console.log(user[propertyName]); // "karan@example.com"
```

#### **Modifying Objects**

```javascript
const product = {
  name: "Laptop",
  price: 50000,
  inStock: true
};

// Update existing property
product.price = 45000;
console.log(product.price); // 45000

// Add new property
product.brand = "Dell";
console.log(product.brand); // "Dell"

// Delete property
delete product.inStock;
console.log(product.inStock); // undefined

// Check property exists
console.log("name" in product);  // true
console.log("inStock" in product); // false (deleted)
console.log(product.hasOwnProperty("price")); // true
```

#### **Computed Property Names**

```javascript
// Property names calculated at runtime
const environment = "production";
const config = {
  [environment]: {
    apiUrl: "https://api.example.com",
    timeout: 30000
  },
  ["test_" + "database"]: "mongodb"
};

console.log(config.production);     // { apiUrl: "...", timeout: 30000 }
console.log(config.test_database);  // "mongodb"
```

#### **Object Methods**

```javascript
// Objects can contain functions (methods)
const calculator = {
  value: 0,
  
  add: function(num) {
    this.value += num;
    return this.value;
  },
  
  multiply(num) {  // Shorthand syntax
    this.value *= num;
    return this.value;
  },
  
  reset: () => {
    this.value = 0; // NOTE: arrow function has different 'this'!
  }
};

console.log(calculator.add(5));       // 5
console.log(calculator.multiply(2));  // 10
console.log(calculator.value);        // 10
```

#### **This Keyword**

```javascript
// 'this' refers to the object that owns the method
const testData = {
  testName: "Login Test",
  duration: 5000,
  
  describe: function() {
    return `Test: ${this.testName}, Duration: ${this.duration}ms`;
  }
};

console.log(testData.describe());
// "Test: Login Test, Duration: 5000ms"

// Arrow functions DON'T bind 'this'
const user = {
  name: "Karan",
  greet: function() {
    return `Hello, ${this.name}`; // Works
  },
  greetArrow: () => {
    return `Hello, ${this.name}`; // Doesn't work (this refers to window)
  }
};
```

---

### **Part 3.2: Object Methods & Utilities**

#### **Object.keys()**

```javascript
// Get all property names
const config = {
  environment: "test",
  timeout: 30000,
  retries: 3
};

const keys = Object.keys(config);
console.log(keys); // ["environment", "timeout", "retries"]

// Iterate over keys
for (let key of keys) {
  console.log(`${key}: ${config[key]}`);
}
// environment: test
// timeout: 30000
// retries: 3
```

#### **Object.values()**

```javascript
// Get all property values
const testResult = {
  testName: "checkout",
  status: "passed",
  duration: 2500
};

const values = Object.values(testResult);
console.log(values); // ["checkout", "passed", 2500]

// Calculate total duration of multiple tests
const testDurations = {
  test1: 1000,
  test2: 2500,
  test3: 1500
};

const totalDuration = Object.values(testDurations).reduce((sum, d) => sum + d, 0);
console.log(totalDuration); // 5000
```

#### **Object.entries()**

```javascript
// Get key-value pairs
const user = {
  username: "qaengineer",
  role: "tester",
  level: "senior"
};

const entries = Object.entries(user);
console.log(entries);
// [["username", "qaengineer"], ["role", "tester"], ["level", "senior"]]

// Iterate with both key and value
for (let [key, value] of entries) {
  console.log(`${key} = ${value}`);
}
// username = qaengineer
// role = tester
// level = senior

// Convert to Map
const userMap = new Map(entries);
console.log(userMap.get("username")); // "qaengineer"
```

#### **Object.assign()**

```javascript
// Copy/merge objects
const defaults = {
  timeout: 5000,
  retries: 3,
  headless: true
};

const userConfig = {
  timeout: 10000,
  headless: false
};

// Merge - userConfig overwrites defaults
const config = Object.assign({}, defaults, userConfig);
console.log(config);
// { timeout: 10000, retries: 3, headless: false }

// Original objects not modified
console.log(defaults); // Unchanged
console.log(userConfig); // Unchanged
```

#### **Object.freeze() & Object.seal()**

```javascript
// freeze - Cannot add, delete, or modify properties
const API_CONFIG = {
  baseUrl: "https://api.example.com",
  version: "v1"
};

Object.freeze(API_CONFIG);

// API_CONFIG.baseUrl = "new"; // Error in strict mode
// delete API_CONFIG.version; // Error

// seal - Cannot add or delete, but can modify
const testConfig = {
  timeout: 30000
};

Object.seal(testConfig);

testConfig.timeout = 60000; // Allowed
// testConfig.retries = 3; // Error
```

---

### **Part 3.3: Destructuring Objects**

Destructuring extracts values from objects into variables.

#### **Basic Destructuring**

```javascript
// Traditional way
const user = {
  name: "Karan",
  email: "karan@example.com",
  age: 38
};

const name = user.name;
const email = user.email;
console.log(name); // "Karan"

// Destructuring way (cleaner!)
const { name, email } = user;
console.log(name);  // "Karan"
console.log(email); // "karan@example.com"

// With different variable names
const { name: userName, email: userEmail } = user;
console.log(userName);  // "Karan"
console.log(userEmail); // "karan@example.com"
```

#### **Destructuring with Defaults**

```javascript
const testConfig = {
  browser: "chrome",
  headless: true
};

// Set default values
const { browser, timeout = 30000, retries = 3 } = testConfig;
console.log(browser);  // "chrome"
console.log(timeout);  // 30000 (default)
console.log(retries);  // 3 (default)
```

#### **Nested Destructuring**

```javascript
const user = {
  name: "Karan",
  address: {
    city: "Ahmedabad",
    country: "India"
  }
};

// Destructure nested objects
const { name, address: { city } } = user;
console.log(name); // "Karan"
console.log(city); // "Ahmedabad"
```

#### **Destructuring in Function Parameters**

```javascript
// Instead of:
function printUser(user) {
  console.log(user.name);
  console.log(user.email);
}

// Destructure in parameters:
function printUser({ name, email }) {
  console.log(name);
  console.log(email);
}

printUser({ name: "Karan", email: "karan@example.com" });

// With defaults in parameters
function runTest({ browser = "chrome", headless = true } = {}) {
  console.log(`Running in ${browser}, headless: ${headless}`);
}

runTest();                    // "Running in chrome, headless: true"
runTest({ browser: "firefox" }); // "Running in firefox, headless: true"
```

---

### **Part 3.4: Spread Operator for Objects**

```javascript
// Copy object
const original = { a: 1, b: 2 };
const copy = { ...original };
console.log(copy); // { a: 1, b: 2 }

// Merge objects
const config1 = { environment: "test", timeout: 5000 };
const config2 = { retries: 3, headless: true };
const merged = { ...config1, ...config2 };
console.log(merged);
// { environment: "test", timeout: 5000, retries: 3, headless: true }

// Override properties
const defaults = { timeout: 5000, retries: 3 };
const custom = { ...defaults, timeout: 10000 };
console.log(custom); // { timeout: 10000, retries: 3 }

// Create object from entries
const testConfig = Object.fromEntries([
  ["timeout", 30000],
  ["retries", 3],
  ["headless", true]
]);
console.log(testConfig); // { timeout: 30000, retries: 3, headless: true }
```

---

## 🔨 **EXERCISE SESSION 1 (2 hours)**

### **Exercise 3.1: Object Manipulation**

**Objective:** Master object creation and manipulation

**Task:**
```javascript
// 1. Create test data object with properties:
//    - testName, testType, status, duration, browser
//    - expectedResult, actualResult

// 2. Modify properties and add new ones

// 3. Check if property exists using 'in' and hasOwnProperty

// 4. Get all keys, values, and entries

// 5. Create a method on the object that describes it

// 6. Use Object.assign() to merge with another object

// 7. Freeze the object and try to modify (should fail)

// 8. Create nested object structure for test suite
```

**Solution:**
```javascript
// 1. Create test data
const testData = {
  testName: "Login Test",
  testType: "functional",
  status: "running",
  duration: 2500,
  browser: "chrome",
  expectedResult: "Login successful",
  actualResult: null
};

console.log(testData);

// 2. Modify and add properties
testData.status = "completed";
testData.actualResult = "Login successful";
testData.environment = "staging";

console.log(testData);

// 3. Check properties
console.log("testName" in testData);           // true
console.log(testData.hasOwnProperty("status")); // true
console.log("missingProp" in testData);        // false

// 4. Get keys, values, entries
console.log("Keys:", Object.keys(testData));
console.log("Values:", Object.values(testData));
console.log("Entries:", Object.entries(testData));

// 5. Add method
testData.describe = function() {
  return `${this.testName} (${this.testType}) - ${this.status}`;
};

console.log(testData.describe()); // "Login Test (functional) - completed"

// 6. Merge with another object
const additionalData = {
  severity: "high",
  assignee: "QA Team"
};

const mergedTest = Object.assign({}, testData, additionalData);
console.log(mergedTest);

// 7. Freeze and try to modify
const frozenConfig = {
  apiUrl: "https://api.example.com"
};

Object.freeze(frozenConfig);
// frozenConfig.apiUrl = "new"; // Error in strict mode
console.log(frozenConfig); // Unchanged

// 8. Nested test suite structure
const testSuite = {
  name: "E-commerce Tests",
  tests: [
    {
      name: "Login",
      status: "passed",
      duration: 2500
    },
    {
      name: "Checkout",
      status: "passed",
      duration: 5000
    },
    {
      name: "Payment",
      status: "failed",
      duration: 3000
    }
  ],
  totalDuration: 10500,
  passedCount: 2,
  failedCount: 1
};

console.log(testSuite);
console.log(testSuite.tests[0].name); // "Login"
```

---

### **Exercise 3.2: Destructuring Objects**

**Objective:** Master destructuring syntax

**Task:**
```javascript
// 1. Destructure simple object
// 2. Destructure with renaming
// 3. Destructuring with defaults
// 4. Nested destructuring
// 5. Destructure in function parameters
// 6. Destructure array of objects
```

**Solution:**
```javascript
// 1. Simple destructuring
const user = {
  username: "qaengineer",
  email: "qa@test.com",
  role: "tester"
};

const { username, email } = user;
console.log(username); // "qaengineer"
console.log(email);    // "qa@test.com"

// 2. Destructuring with renaming
const { username: name, role: userRole } = user;
console.log(name);     // "qaengineer"
console.log(userRole); // "tester"

// 3. With defaults
const testConfig = {
  timeout: 30000
};

const { timeout, retries = 3, headless = true } = testConfig;
console.log(timeout);   // 30000
console.log(retries);   // 3 (default)
console.log(headless);  // true (default)

// 4. Nested destructuring
const testData = {
  test: {
    name: "Login",
    assertions: {
      count: 5,
      passed: 5
    }
  }
};

const { test: { name, assertions: { count } } } = testData;
console.log(name);  // "Login"
console.log(count); // 5

// 5. In function parameters
function runTest({ browser = "chrome", headless = true, timeout = 30000 } = {}) {
  console.log(`Running in ${browser}, headless: ${headless}, timeout: ${timeout}ms`);
}

runTest();                      // Default values
runTest({ browser: "firefox" }); // Override browser
runTest({ timeout: 60000 });    // Override timeout

// 6. Destructure array of objects
const testResults = [
  { name: "Test 1", status: "passed" },
  { name: "Test 2", status: "failed" },
  { name: "Test 3", status: "passed" }
];

for (let { name, status } of testResults) {
  console.log(`${name}: ${status}`);
}
```

---

## 📚 **THEORY SESSION 2: Arrays & Methods (2 hours)**

### **Part 3.5: Array Methods - Iteration**

Array methods are powerful tools for test automation!

#### **map() - Transform Elements**

```javascript
// map transforms each element
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// Practical: Extract properties from objects
const testResults = [
  { testName: "Login", status: "passed" },
  { testName: "Checkout", status: "passed" },
  { testName: "Payment", status: "failed" }
];

const testNames = testResults.map(result => result.testName);
console.log(testNames); // ["Login", "Checkout", "Payment"]

// Transform test data
const tests = [1, 2, 3];
const testObjects = tests.map((num, index) => ({
  id: num,
  name: `Test ${index + 1}`,
  status: "pending"
}));
console.log(testObjects);
// [
//   { id: 1, name: "Test 1", status: "pending" },
//   { id: 2, name: "Test 2", status: "pending" },
//   { id: 3, name: "Test 3", status: "pending" }
// ]
```

#### **filter() - Select Elements**

```javascript
// filter keeps elements where condition is true
const scores = [85, 92, 78, 95, 88, 76];
const passing = scores.filter(score => score >= 80);
console.log(passing); // [85, 92, 95, 88]

// Practical: Filter test results
const testResults = [
  { name: "Login", status: "passed" },
  { name: "Checkout", status: "failed" },
  { name: "Payment", status: "passed" }
];

const passedTests = testResults.filter(result => result.status === "passed");
console.log(passedTests);
// [
//   { name: "Login", status: "passed" },
//   { name: "Payment", status: "passed" }
// ]

// Multiple conditions
const importantTests = testResults.filter(result => 
  result.status === "failed" && result.name !== "demo"
);
```

#### **reduce() - Aggregate Values**

```javascript
// reduce combines all elements into single value
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((accumulator, current) => {
  return accumulator + current;
}, 0); // 0 is initial value
console.log(sum); // 15

// Without initial value
const product = numbers.reduce((acc, num) => acc * num);
console.log(product); // 120

// Practical: Count test results
const testResults = [
  { status: "passed" },
  { status: "passed" },
  { status: "failed" },
  { status: "passed" }
];

const summary = testResults.reduce((acc, result) => {
  if (result.status === "passed") {
    acc.passed++;
  } else {
    acc.failed++;
  }
  return acc;
}, { passed: 0, failed: 0 });

console.log(summary); // { passed: 3, failed: 1 }

// Practical: Sum test durations
const tests = [
  { name: "Test 1", duration: 2000 },
  { name: "Test 2", duration: 3000 },
  { name: "Test 3", duration: 1500 }
];

const totalDuration = tests.reduce((total, test) => total + test.duration, 0);
console.log(totalDuration); // 6500
```

#### **find() - Find First Element**

```javascript
// find returns first element matching condition
const users = [
  { id: 1, name: "User 1" },
  { id: 2, name: "User 2" },
  { id: 3, name: "User 3" }
];

const user = users.find(u => u.id === 2);
console.log(user); // { id: 2, name: "User 2" }

// Practical: Find first failed test
const testResults = [
  { name: "Test 1", status: "passed" },
  { name: "Test 2", status: "failed" },
  { name: "Test 3", status: "passed" }
];

const failedTest = testResults.find(result => result.status === "failed");
console.log(failedTest); // { name: "Test 2", status: "failed" }

// Returns undefined if not found
const notFound = testResults.find(result => result.status === "error");
console.log(notFound); // undefined
```

#### **findIndex() - Find Index**

```javascript
// findIndex returns index of matching element
const tests = ["login", "checkout", "payment", "logout"];
const index = tests.findIndex(test => test === "payment");
console.log(index); // 2

// Practical: Find position of failed test
const testResults = [
  { name: "Test 1", status: "passed" },
  { name: "Test 2", status: "failed" },
  { name: "Test 3", status: "passed" }
];

const failedIndex = testResults.findIndex(r => r.status === "failed");
console.log(failedIndex); // 1
```

#### **every() & some()**

```javascript
// every - all elements match condition
const scores = [85, 92, 95, 88];
const allPassing = scores.every(score => score >= 80);
console.log(allPassing); // true

// some - at least one element matches
const hasFailure = scores.some(score => score < 80);
console.log(hasFailure); // false

// Practical: Check test results
const testResults = [
  { status: "passed" },
  { status: "passed" },
  { status: "passed" }
];

const allTestsPassed = testResults.every(r => r.status === "passed");
console.log(allTestsPassed); // true

const anyFailure = testResults.some(r => r.status === "failed");
console.log(anyFailure); // false
```

#### **includes() & indexOf()**

```javascript
// includes - check if value exists
const browsers = ["chrome", "firefox", "safari"];
console.log(browsers.includes("chrome"));  // true
console.log(browsers.includes("edge"));    // false

// indexOf - find index of value
console.log(browsers.indexOf("firefox")); // 1
console.log(browsers.indexOf("edge"));    // -1

// Practical: Check test exists
const testSuite = ["login", "checkout", "payment"];
if (testSuite.includes("login")) {
  console.log("Login test found");
}
```

#### **join() & split()**

```javascript
// join - convert array to string
const tests = ["login", "checkout", "payment"];
const testString = tests.join(", ");
console.log(testString); // "login, checkout, payment"

// split - convert string to array
const testList = "login, checkout, payment";
const testArray = testList.split(", ");
console.log(testArray); // ["login", "checkout", "payment"]
```

---

### **Part 3.6: Array Methods - Mutation**

#### **push() & pop()**

```javascript
// push - add to end
const browsers = ["chrome", "firefox"];
browsers.push("safari");
console.log(browsers); // ["chrome", "firefox", "safari"]

// pop - remove from end
const removed = browsers.pop();
console.log(removed);  // "safari"
console.log(browsers); // ["chrome", "firefox"]
```

#### **shift() & unshift()**

```javascript
// unshift - add to start
const tests = ["test2", "test3"];
tests.unshift("test1");
console.log(tests); // ["test1", "test2", "test3"]

// shift - remove from start
const first = tests.shift();
console.log(first); // "test1"
console.log(tests); // ["test2", "test3"]
```

#### **slice() - Non-mutating**

```javascript
// slice creates new array (doesn't mutate)
const scores = [85, 92, 78, 95, 88];
const partial = scores.slice(1, 4); // elements at index 1, 2, 3
console.log(partial);    // [92, 78, 95]
console.log(scores);     // Unchanged

// Copy entire array
const copy = scores.slice();
console.log(copy); // [85, 92, 78, 95, 88]

// Negative indexing
const lastTwo = scores.slice(-2);
console.log(lastTwo); // [95, 88]
```

#### **splice() - Mutating**

```javascript
// splice modifies array
const scores = [85, 92, 78, 95, 88];

// Remove 2 elements starting at index 2
const removed = scores.splice(2, 2);
console.log(removed);  // [78, 95]
console.log(scores);   // [85, 92, 88] - modified!

// Insert elements
const arr = [1, 2, 5];
arr.splice(2, 0, 3, 4); // Insert 3, 4 at index 2
console.log(arr); // [1, 2, 3, 4, 5]
```

#### **concat() - Combine Arrays**

```javascript
// concat creates new array
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = arr1.concat(arr2);
console.log(combined); // [1, 2, 3, 4, 5, 6]
console.log(arr1);     // Unchanged

// Using spread operator (modern)
const combined2 = [...arr1, ...arr2];
console.log(combined2); // [1, 2, 3, 4, 5, 6]
```

#### **sort() & reverse()**

```javascript
// sort - mutates array
const numbers = [3, 1, 4, 1, 5, 9];
numbers.sort();
console.log(numbers); // [1, 1, 3, 4, 5, 9]

// Numeric sort (requires comparator)
const nums = [10, 5, 40, 25];
nums.sort((a, b) => a - b);
console.log(nums); // [5, 10, 25, 40]

// Sort test results
const tests = [
  { name: "Test 1", duration: 3000 },
  { name: "Test 2", duration: 1000 },
  { name: "Test 3", duration: 2000 }
];

tests.sort((a, b) => a.duration - b.duration);
console.log(tests);
// Test 2, Test 3, Test 1 (sorted by duration)

// reverse
const arr = [1, 2, 3];
arr.reverse();
console.log(arr); // [3, 2, 1]
```

---

### **Part 3.7: Spread Operator for Arrays**

```javascript
// Copy array
const original = [1, 2, 3];
const copy = [...original];
console.log(copy); // [1, 2, 3]

// Combine arrays
const arr1 = [1, 2];
const arr2 = [3, 4];
const combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4]

// Add elements
const numbers = [1, 2, 5];
const withNew = [1, 2, 3, 4, ...numbers];
console.log(withNew); // [1, 2, 3, 4, 1, 2, 5]

// Function arguments
function sum(a, b, c) {
  return a + b + c;
}
const numbers = [1, 2, 3];
console.log(sum(...numbers)); // 6

// Practical: Flatten nested arrays
const nested = [[1, 2], [3, 4], [5, 6]];
const flat = [...nested[0], ...nested[1], ...nested[2]];
console.log(flat); // [1, 2, 3, 4, 5, 6]
```

---

### **Part 3.8: Destructuring Arrays**

```javascript
// Basic array destructuring
const colors = ["red", "green", "blue"];
const [first, second] = colors;
console.log(first);  // "red"
console.log(second); // "green"

// Skip elements
const [primary, , tertiary] = colors;
console.log(primary);  // "red"
console.log(tertiary); // "blue"

// With defaults
const [a = 1, b = 2, c = 3, d = 4] = [10, 20];
console.log(a); // 10
console.log(b); // 20
console.log(c); // 3 (default)
console.log(d); // 4 (default)

// Swap variables
let x = 5, y = 10;
[x, y] = [y, x];
console.log(x, y); // 10, 5

// Rest elements
const [head, ...tail] = [1, 2, 3, 4, 5];
console.log(head); // 1
console.log(tail); // [2, 3, 4, 5]

// In function parameters
function processTests([test1, test2, ...rest] = []) {
  console.log("First:", test1);
  console.log("Second:", test2);
  console.log("Others:", rest);
}

processTests(["login", "checkout", "payment", "logout"]);
```

---

## 🔨 **EXERCISE SESSION 2 (2 hours)**

### **Exercise 3.3: Array Methods**

**Objective:** Master array methods for test automation

**Task:**
```javascript
// 1. Create array of test scores: [85, 92, 78, 95, 88, 76]
//    - Use map to add 5 points to each score
//    - Use filter to get only passing scores (80+)
//    - Use reduce to calculate average

// 2. Create array of test objects
//    - Use map to extract just test names
//    - Use find to find first failed test
//    - Use findIndex to find position of specific test
//    - Use every to check if all passed
//    - Use some to check if any failed

// 3. Use array methods to:
//    - Join array into string
//    - Split string back to array
//    - Combine multiple arrays
//    - Sort tests by duration

// 4. Practical: Build test execution summary
```

**Solution:**
```javascript
// 1. Test scores
const scores = [85, 92, 78, 95, 88, 76];

// Add 5 points
const boosted = scores.map(score => score + 5);
console.log(boosted); // [90, 97, 83, 100, 93, 81]

// Filter passing (80+)
const passing = scores.filter(score => score >= 80);
console.log(passing); // [85, 92, 95, 88]

// Calculate average
const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
console.log(average.toFixed(2)); // 85.67

// 2. Test objects
const testResults = [
  { name: "Login", status: "passed", duration: 2000 },
  { name: "Checkout", status: "failed", duration: 3000 },
  { name: "Payment", status: "passed", duration: 2500 },
  { name: "Logout", status: "passed", duration: 1000 }
];

// Extract names
const testNames = testResults.map(test => test.name);
console.log(testNames); // ["Login", "Checkout", "Payment", "Logout"]

// Find first failed
const failedTest = testResults.find(test => test.status === "failed");
console.log(failedTest); // { name: "Checkout", status: "failed", duration: 3000 }

// Find index of specific test
const checkoutIndex = testResults.findIndex(test => test.name === "Checkout");
console.log(checkoutIndex); // 1

// Check all passed
const allPassed = testResults.every(test => test.status === "passed");
console.log(allPassed); // false

// Check any failed
const anyFailed = testResults.some(test => test.status === "failed");
console.log(anyFailed); // true

// 3. String and array operations
const testList = "login, checkout, payment";
const tests = testList.split(", ");
console.log(tests); // ["login", "checkout", "payment"]

const joined = tests.join(" | ");
console.log(joined); // "login | checkout | payment"

// Combine arrays
const smokeTests = ["login"];
const regressionTests = ["checkout", "payment"];
const allTests = [...smokeTests, ...regressionTests];
console.log(allTests); // ["login", "checkout", "payment"]

// Sort by duration
const sorted = [...testResults].sort((a, b) => a.duration - b.duration);
console.log(sorted.map(t => t.name)); // ["Logout", "Login", "Payment", "Checkout"]

// 4. Build test summary
const summary = {
  totalTests: testResults.length,
  passed: testResults.filter(t => t.status === "passed").length,
  failed: testResults.filter(t => t.status === "failed").length,
  totalDuration: testResults.reduce((sum, t) => sum + t.duration, 0),
  averageDuration: Math.round(
    testResults.reduce((sum, t) => sum + t.duration, 0) / testResults.length
  ),
  passRate: (
    (testResults.filter(t => t.status === "passed").length / testResults.length) * 100
  ).toFixed(2)
};

console.log(summary);
// {
//   totalTests: 4,
//   passed: 3,
//   failed: 1,
//   totalDuration: 8500,
//   averageDuration: 2125,
//   passRate: "75.00"
// }
```

---

### **Exercise 3.4: Complex Data Structures**

**Objective:** Build realistic test data structures

**Task:**
```javascript
// Build a complete test suite structure:
// - Test suite with multiple tests
// - Each test has: name, type, status, duration, assertions
// - Calculate statistics
// - Filter by criteria
// - Transform and report

// Requirements:
// 1. Create test suite object
// 2. Add multiple test objects
// 3. Calculate total duration, pass rate
// 4. Find slowest test
// 5. Get list of failed tests
// 6. Transform to report format
```

**Solution:**
```javascript
// Complete test suite structure
const testSuite = {
  name: "E-commerce Application Tests",
  version: "1.0.0",
  environment: "production",
  tests: [
    {
      id: 1,
      name: "User Login",
      type: "functional",
      status: "passed",
      duration: 2500,
      assertions: 5,
      passedAssertions: 5
    },
    {
      id: 2,
      name: "Product Search",
      type: "functional",
      status: "passed",
      duration: 3000,
      assertions: 8,
      passedAssertions: 8
    },
    {
      id: 3,
      name: "Add to Cart",
      type: "functional",
      status: "failed",
      duration: 4000,
      assertions: 10,
      passedAssertions: 9
    },
    {
      id: 4,
      name: "Checkout",
      type: "functional",
      status: "passed",
      duration: 5000,
      assertions: 12,
      passedAssertions: 12
    },
    {
      id: 5,
      name: "Payment Processing",
      type: "integration",
      status: "passed",
      duration: 6000,
      assertions: 7,
      passedAssertions: 7
    }
  ]
};

// Calculate statistics
const stats = {
  totalTests: testSuite.tests.length,
  passedTests: testSuite.tests.filter(t => t.status === "passed").length,
  failedTests: testSuite.tests.filter(t => t.status === "failed").length,
  totalDuration: testSuite.tests.reduce((sum, t) => sum + t.duration, 0),
  averageDuration: Math.round(
    testSuite.tests.reduce((sum, t) => sum + t.duration, 0) / testSuite.tests.length
  ),
  passRate: (
    (testSuite.tests.filter(t => t.status === "passed").length / testSuite.tests.length) * 100
  ).toFixed(2)
};

console.log("=== Test Statistics ===");
console.log(`Total Tests: ${stats.totalTests}`);
console.log(`Passed: ${stats.passedTests}`);
console.log(`Failed: ${stats.failedTests}`);
console.log(`Pass Rate: ${stats.passRate}%`);
console.log(`Total Duration: ${stats.totalDuration}ms`);
console.log(`Average Duration: ${stats.averageDuration}ms`);

// Find slowest test
const slowest = testSuite.tests.reduce((slow, test) => 
  test.duration > slow.duration ? test : slow
);
console.log(`\nSlowest Test: ${slowest.name} (${slowest.duration}ms)`);

// Get failed tests
const failedTests = testSuite.tests.filter(t => t.status === "failed");
console.log("\nFailed Tests:");
failedTests.forEach(test => {
  console.log(`  - ${test.name} (${test.passedAssertions}/${test.assertions} assertions passed)`);
});

// Transform to report format
const report = {
  timestamp: new Date().toISOString(),
  suite: testSuite.name,
  stats: stats,
  tests: testSuite.tests.map(test => ({
    name: test.name,
    result: test.status.toUpperCase(),
    duration: `${test.duration}ms`,
    assertions: `${test.passedAssertions}/${test.assertions}`
  }))
};

console.log("\n=== Report ===");
console.log(JSON.stringify(report, null, 2));
```

---

### **Exercise 3.5: Destructuring Practice**

**Objective:** Master destructuring for cleaner code

**Task:**
```javascript
// Practice all destructuring patterns:
// 1. Destructure objects with renaming
// 2. Destructure nested objects
// 3. Destructure arrays with skip
// 4. Destructure in function parameters
// 5. Use rest elements
// 6. Destructure with defaults
```

**Solution:**
```javascript
// 1. Object destructuring with renaming
const user = {
  username: "qaengineer",
  email: "qa@test.com"
};

const { username: name, email: userEmail } = user;
console.log(name);      // "qaengineer"
console.log(userEmail); // "qa@test.com"

// 2. Nested destructuring
const testData = {
  suite: "E-commerce",
  results: {
    total: 5,
    passed: 4,
    failed: 1
  }
};

const { suite, results: { total, passed, failed } } = testData;
console.log(suite);  // "E-commerce"
console.log(total);  // 5

// 3. Array with skip
const browsers = ["chrome", "firefox", "safari", "edge"];
const [first, , third] = browsers;
console.log(first);  // "chrome"
console.log(third);  // "safari"

// 4. Function parameters
function createTest({ name, type = "unit", timeout = 5000 } = {}) {
  console.log(`Test: ${name}, Type: ${type}, Timeout: ${timeout}ms`);
}

createTest({ name: "Login" });
createTest({ name: "Checkout", type: "integration", timeout: 10000 });

// 5. Rest elements
const [first, ...others] = [1, 2, 3, 4, 5];
console.log(first);  // 1
console.log(others); // [2, 3, 4, 5]

// 6. With defaults
const { testName = "Unknown", status = "pending" } = {};
console.log(testName); // "Unknown"
console.log(status);   // "pending"
```

---

## ❓ **Quiz: Objects, Arrays & Destructuring**

**Instructions:** Answer all 10 questions. Target score: 8/10 (80%)

### **Question 1: Object Property Access**
What will this output?
```javascript
const obj = { name: "test", age: 5 };
console.log(obj["name"]);
```
- A) "test" ✅ **CORRECT**
- B) undefined
- C) Error
- D) { name: "test" }

**Explanation:** Bracket notation accesses the property value.

---

### **Question 2: Object.keys()**
What will this output?
```javascript
const obj = { a: 1, b: 2, c: 3 };
console.log(Object.keys(obj).length);
```
- A) 1
- B) 3 ✅ **CORRECT**
- C) 6
- D) undefined

**Explanation:** Object.keys() returns array of property names: ["a", "b", "c"].

---

### **Question 3: Destructuring**
What will this output?
```javascript
const { x, y = 10 } = { x: 5 };
console.log(y);
```
- A) undefined
- B) 10 ✅ **CORRECT**
- C) Error
- D) null

**Explanation:** y has default value 10 (since not provided in object).

---

### **Question 4: Array map()**
What will this output?
```javascript
const arr = [1, 2, 3];
const result = arr.map(x => x * 2);
console.log(result);
```
- A) [2, 4, 6] ✅ **CORRECT**
- B) 12
- C) [1, 2, 3]
- D) Error

**Explanation:** map() transforms each element, returning new array [2, 4, 6].

---

### **Question 5: Array filter()**
What will this output?
```javascript
const arr = [1, 2, 3, 4, 5];
const result = arr.filter(x => x > 3);
console.log(result);
```
- A) true
- B) [4, 5] ✅ **CORRECT**
- C) 4
- D) undefined

**Explanation:** filter() returns new array with elements matching condition: [4, 5].

---

### **Question 6: Array reduce()**
What will this output?
```javascript
const arr = [1, 2, 3];
const result = arr.reduce((a, b) => a + b, 0);
console.log(result);
```
- A) "123"
- B) [1, 2, 3]
- C) 6 ✅ **CORRECT**
- D) Error

**Explanation:** reduce() accumulates: 0+1+2+3 = 6.

---

### **Question 7: Array find()**
What will this output?
```javascript
const arr = [{ id: 1 }, { id: 2 }, { id: 3 }];
const result = arr.find(x => x.id === 2);
console.log(result);
```
- A) 2
- B) { id: 2 } ✅ **CORRECT**
- C) undefined
- D) [{ id: 2 }]

**Explanation:** find() returns first matching element object, not just the id.

---

### **Question 8: Spread Operator**
What will this output?
```javascript
const arr = [1, 2, 3];
const copy = [...arr];
copy.push(4);
console.log(arr);
```
- A) [1, 2, 3] ✅ **CORRECT**
- B) [1, 2, 3, 4]
- C) Error
- D) undefined

**Explanation:** Spread creates new array. Original arr unchanged.

---

### **Question 9: Array Destructuring**
What will this output?
```javascript
const [a, , c] = [1, 2, 3];
console.log(c);
```
- A) 2
- B) undefined
- C) 3 ✅ **CORRECT**
- D) Error

**Explanation:** Skipped middle element (2). c gets third element (3).

---

### **Question 10: Object Mutation**
What will this output?
```javascript
const original = { x: 1 };
const copy = { ...original };
copy.x = 2;
console.log(original.x);
```
- A) 1 ✅ **CORRECT**
- B) 2
- C) undefined
- D) Error

**Explanation:** Spread creates shallow copy. Original unaffected.

---

## ✅ **Quiz Answer Key**

| Q | Answer | Topic |
|---|--------|-------|
| 1 | A | Object access |
| 2 | B | Object.keys() |
| 3 | B | Destructuring defaults |
| 4 | A | map() method |
| 5 | B | filter() method |
| 6 | C | reduce() method |
| 7 | B | find() method |
| 8 | A | Spread operator |
| 9 | C | Array destructuring |
| 10 | A | Object spread copy |

**Your Score:** ___/10

**Interpretation:**
- 9-10: ✅ Excellent! Ready for Day 04
- 7-8: 🟡 Good! Review weak areas
- Below 7: 🔴 Review theory again

---

## 📋 **Daily Assignment**

### **Assignment 3.1: Build Test Data Analyzer**

**Objective:** Create utility functions for test data manipulation

**Requirements:**
1. Create functions to analyze test data
2. Use array methods (map, filter, reduce)
3. Calculate statistics
4. Generate reports
5. Handle edge cases

**Starter Code:**
```javascript
class TestDataAnalyzer {
  constructor(testData = []) {
    this.testData = testData;
  }
  
  addTest(test) {
    // Add test to data
  }
  
  getPassRate() {
    // Calculate pass rate percentage
  }
  
  getAverageDuration() {
    // Calculate average test duration
  }
  
  getFailedTests() {
    // Return only failed tests
  }
  
  getSlowestTest() {
    // Return test with longest duration
  }
  
  generateReport() {
    // Create formatted report
  }
}
```

**Example Usage:**
```javascript
const analyzer = new TestDataAnalyzer([
  { name: "Login", status: "passed", duration: 2000 },
  { name: "Checkout", status: "failed", duration: 3000 },
  { name: "Payment", status: "passed", duration: 2500 }
]);

console.log(analyzer.getPassRate());      // 66.67
console.log(analyzer.getAverageDuration()); // 2500
console.log(analyzer.getFailedTests());   // Array of failed tests
console.log(analyzer.generateReport());   // Formatted report
```

**Solution Outline:**
```javascript
class TestDataAnalyzer {
  constructor(testData = []) {
    this.testData = testData;
  }
  
  addTest(test) {
    this.testData.push(test);
  }
  
  getPassRate() {
    if (this.testData.length === 0) return 0;
    const passed = this.testData.filter(t => t.status === "passed").length;
    return (passed / this.testData.length * 100).toFixed(2);
  }
  
  getAverageDuration() {
    if (this.testData.length === 0) return 0;
    const total = this.testData.reduce((sum, t) => sum + t.duration, 0);
    return Math.round(total / this.testData.length);
  }
  
  getFailedTests() {
    return this.testData.filter(t => t.status === "failed");
  }
  
  getSlowestTest() {
    return this.testData.reduce((slow, test) => 
      test.duration > slow.duration ? test : slow, this.testData[0]
    );
  }
  
  generateReport() {
    return {
      totalTests: this.testData.length,
      passed: this.testData.filter(t => t.status === "passed").length,
      failed: this.testData.filter(t => t.status === "failed").length,
      passRate: `${this.getPassRate()}%`,
      averageDuration: `${this.getAverageDuration()}ms`,
      tests: this.testData.map(t => ({
        name: t.name,
        result: t.status.toUpperCase(),
        duration: `${t.duration}ms`
      }))
    };
  }
}
```

---

## 🎯 **Daily Checklist**

Track your Day 03 progress:

- [ ] Reviewed Day 01-02 concepts
- [ ] Completed Theory Session 1 (Objects & Properties)
- [ ] Completed Exercise 3.1 (Object Manipulation)
- [ ] Completed Exercise 3.2 (Destructuring Objects)
- [ ] Completed Theory Session 2 (Arrays & Methods)
- [ ] Completed Exercise 3.3 (Array Methods)
- [ ] Completed Exercise 3.4 (Complex Data Structures)
- [ ] Completed Exercise 3.5 (Destructuring Practice)
- [ ] Answered all 10 quiz questions
- [ ] Scored 80%+ on quiz (8/10)
- [ ] Completed Assignment 3.1 (Test Data Analyzer)
- [ ] Committed code to GitHub
- [ ] Updated personal learning journal

**Daily Metrics:**
- Quiz Score: ___/10
- Confidence Level (1-5): ___
- Time Spent: ___ hours
- Challenges Faced: _________________

---

## 📚 **Key Takeaways from Day 03**

1. **Objects are key-value stores** - use for structured test data
2. **Destructuring makes code cleaner** - use it liberally
3. **map/filter/reduce are powerful** - master these three methods
4. **Spread operator is essential** - for copying and combining
5. **Array methods are non-mutating** - don't modify original by default
6. **Understand when methods mutate** - push, pop, sort do mutate
7. **Nested structures are common** - in real test data
8. **Always validate data** - before processing

---

## 🔗 **Resources for Review**

- [MDN: Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects)
- [MDN: Array Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [MDN: Destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- [MDN: Spread Syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
- [JavaScript.info: Objects](https://javascript.info/object)
- [JavaScript.info: Arrays](https://javascript.info/array)
- [JavaScript.info: Destructuring](https://javascript.info/destructuring-assignment)

---

## 🚀 **Ready for Day 04?**

By completing Day 03, you've mastered:
- ✅ Object creation, manipulation, and methods
- ✅ Destructuring for objects and arrays
- ✅ All major array methods (map, filter, reduce, find, etc.)
- ✅ Spread operator for objects and arrays
- ✅ Complex nested data structures
- ✅ Test data analysis and transformation

**Tomorrow (Day 04):** You'll learn Async JavaScript (Promises, Async/Await) - critical for automation testing with waits and delays!

---

**Outstanding work on Day 03, Karan!** 🎉

You've now completed the JavaScript fundamentals section! Objects and arrays are the foundation of every automation framework. These skills will be essential when you start Playwright testing.

Keep up the momentum! 💪

---

*Last Updated: December 12, 2025*  
*Day 03 Complete Guide v1.0*  
*Next: Day 04 - Async JavaScript & Promises*

---
