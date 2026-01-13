# Day 01: JavaScript Fundamentals Part 1 - Variables, Data Types & Operators

**Date:** Day 1 of 25  
**Duration:** 8 hours  
**Difficulty:** Beginner (Fresh Start)  
**Focus Area:** JavaScript Foundations

---

## 🎯 **Learning Objectives**

By the end of Day 01, you will:

✅ Understand JavaScript variable declaration methods (var, let, const)  
✅ Master all JavaScript data types and type checking  
✅ Perform operations using arithmetic, comparison, and logical operators  
✅ Debug JavaScript code using console methods  
✅ Understand variable scope and hoisting  
✅ Write your first automation helper function  

---

## ⏰ **Daily Schedule (8 Hours)**

| Time | Activity | Duration |
|------|----------|----------|
| 8:00 - 8:30 | Review objectives & setup | 30 min |
| 8:30 - 10:30 | **Theory Session 1:** Variables & Scope | 2 hours |
| 10:30 - 11:00 | Break | 30 min |
| 11:00 - 1:00 PM | **Exercise Session 1:** Hands-on coding | 2 hours |
| 1:00 - 2:00 PM | Lunch break | 1 hour |
| 2:00 - 4:00 PM | **Theory Session 2:** Data Types & Operators | 2 hours |
| 4:00 - 4:30 PM | Break | 30 min |
| 4:30 - 6:30 PM | **Exercise Session 2:** More exercises & quizzes | 2 hours |

---

## 📚 **THEORY SESSION 1: Variables & Scope (2 hours)**

### **Part 1.1: JavaScript Variable Declaration Methods**

JavaScript offers three ways to declare variables. Each has different behavior and use cases.

#### **1. `var` Keyword (Legacy - Avoid in Modern Code)**

```javascript
// var has function scope (not block scope)
var name = "Karan";
var age = 38;

console.log(name); // Output: "Karan"

// var can be redeclared
var name = "Karan Joshi"; // No error - this is bad practice
console.log(name); // Output: "Karan Joshi"

// var can be updated
name = "Amee"; // Also allowed
console.log(name); // Output: "Amee"
```

**Problems with `var`:**
```javascript
// Hoisting confusion
console.log(x); // Output: undefined (not an error!)
var x = 5;
console.log(x); // Output: 5

// Function scope issue
function test() {
  var x = 10;
  if (true) {
    var x = 20; // Same variable, overwrites above
  }
  console.log(x); // Output: 20 (confusing!)
}
test();
```

**✅ Decision:** Avoid `var` in modern JavaScript. Use `let` or `const` instead.

---

#### **2. `let` Keyword (Modern - Use for Variables)**

```javascript
// let has block scope (better than var)
let name = "Karan";
let age = 38;

console.log(name); // Output: "Karan"

// let can be updated but NOT redeclared
name = "Karan Joshi"; // Allowed - update
console.log(name); // Output: "Karan Joshi"

// let name = "Test"; // ERROR: Identifier 'name' has already been declared

// Block scope example (let is contained within {})
if (true) {
  let blockScoped = "I'm inside if block";
  console.log(blockScoped); // Works
}
// console.log(blockScoped); // ERROR: blockScoped is not defined
```

**Advantages of `let`:**
- Block scoped (safer)
- No hoisting to global scope
- Can be updated but not redeclared

---

#### **3. `const` Keyword (Modern - Use for Constants)**

```javascript
// const requires initialization and cannot be changed
const PI = 3.14159;
const DATABASE_URL = "https://api.example.com";

console.log(PI); // Output: 3.14159

// const cannot be reassigned
// PI = 3.14; // ERROR: Assignment to constant variable

// const cannot be redeclared
// const PI = 3.14; // ERROR: Identifier 'PI' has already been declared

// BUT: const object properties CAN be modified!
const user = {
  name: "Karan",
  age: 38
};

user.name = "Karan Joshi"; // Allowed - modifying property
console.log(user.name); // Output: "Karan Joshi"

// user = {}; // ERROR: Cannot reassign const variable

// const array elements CAN be modified!
const fruits = ["apple", "banana"];
fruits[0] = "orange"; // Allowed
fruits.push("mango"); // Allowed
console.log(fruits); // Output: ["orange", "banana", "mango"]

// fruits = []; // ERROR: Cannot reassign
```

**Key Point:** `const` means you can't reassign, but it doesn't mean the value is immutable.

---

#### **Quick Comparison Table**

| Feature | `var` | `let` | `const` |
|---------|-------|-------|--------|
| Can redeclare | ✅ Yes | ❌ No | ❌ No |
| Can reassign | ✅ Yes | ✅ Yes | ❌ No |
| Block scope | ❌ No | ✅ Yes | ✅ Yes |
| Hoisting | 🟡 Partial | ✅ Temporal Deadzone | ✅ Temporal Deadzone |
| When to use | ❌ Never | ✅ For variables | ✅ For constants |

---

### **Part 1.2: Understanding Scope**

**Scope** determines where variables are accessible in your code.

#### **Global Scope**

```javascript
// Variables declared outside any function have global scope
let globalName = "Karan";
const API_URL = "https://api.example.com";

function displayName() {
  console.log(globalName); // Accessible - global scope
  console.log(API_URL);     // Accessible - global scope
}

displayName(); // Output: "Karan" and "https://api.example.com"
console.log(globalName); // Also accessible here
```

#### **Function Scope**

```javascript
function createUser(name) {
  let functionScoped = "I'm inside function";
  const userId = 123;
  
  console.log(functionScoped); // Works
  console.log(userId); // Works
}

createUser("Karan");
// console.log(functionScoped); // ERROR: Not defined outside function
// console.log(userId); // ERROR: Not defined outside function
```

#### **Block Scope (Most Important)**

```javascript
if (true) {
  let blockVariable = "Inside if block";
  const blockConstant = 42;
  console.log(blockVariable); // Works
}

// console.log(blockVariable); // ERROR: Not defined outside block
// console.log(blockConstant); // ERROR: Not defined outside block

// Example with loops
for (let i = 0; i < 3; i++) {
  console.log(i); // 0, 1, 2
}
// console.log(i); // ERROR: i is not defined

// Common mistake - using var in loop
for (var j = 0; j < 3; j++) {
  // ...
}
console.log(j); // 3 (var leaks out of loop! Bad!)
```

---

### **Part 1.3: Hoisting Explained**

**Hoisting** is JavaScript's behavior of moving declarations to the top of their scope.

#### **var Hoisting**

```javascript
// This code...
console.log(x);
var x = 5;
console.log(x);

// ...is treated as if it were...
var x;           // Declaration hoisted
console.log(x);  // undefined
x = 5;          // Assignment stays in place
console.log(x);  // 5
```

#### **let/const Temporal Deadzone**

```javascript
// console.log(y); // ERROR: Cannot access 'y' before initialization
let y = 10;
console.log(y); // 10

// const z; // ERROR: Missing initializer (const needs value)

// Temporal Deadzone (TDZ) - variable exists but not accessible
{
  // TDZ for 'name' starts here
  // console.log(name); // ERROR: Cannot access before initialization
  let name = "Karan"; // TDZ ends here
  console.log(name); // "Karan"
}
```

**✅ Best Practice:** Use `const` by default, `let` when you need to reassign. Never use `var`.

---

## 📚 **THEORY SESSION 2: Data Types & Operators (2 hours)**

### **Part 2.1: JavaScript Data Types**

JavaScript has **8 data types**. Understanding them is crucial for automation testing.

#### **1. String (Text Data)**

```javascript
// Single quotes
let name = 'Karan';

// Double quotes
let city = "Ahmedabad";

// Template literals (backticks) - BEST for automation
let message = `Hello, ${name}! You are from ${city}.`;
console.log(message); // Output: "Hello, Karan! You are from Ahmedabad."

// String methods (important for testing)
let email = "karan@example.com";
console.log(email.length);           // 18
console.log(email.toUpperCase());    // "KARAN@EXAMPLE.COM"
console.log(email.toLowerCase());    // "karan@example.com"
console.log(email.includes("@"));    // true
console.log(email.startsWith("karan")); // true
console.log(email.endsWith(".com"));    // true
console.log(email.substring(0, 5));  // "karan"
```

**Practical Automation Example:**
```javascript
// Common testing scenario
let testUser = "QAEngineer";
let expectedUsername = "qaengineer";

// Normalize for comparison
if (testUser.toLowerCase() === expectedUsername) {
  console.log("✓ Username matches");
}
```

---

#### **2. Number (Numeric Data)**

```javascript
// Integers
let age = 38;
let year = 2025;

// Floats
let salary = 30000.50;
let percentage = 99.99;

// Special values
let infinity = Infinity;
let notANumber = NaN;

// Number methods
console.log(Number.isInteger(38));     // true
console.log(Number.isInteger(38.5));   // false
console.log(Number.isNaN(NaN));        // true
console.log(Number.isFinite(100));     // true
console.log(Number.isFinite(Infinity));// false

// Rounding
console.log(Math.round(38.7));    // 39
console.log(Math.floor(38.7));    // 38
console.log(Math.ceil(38.3));     // 39
console.log(Math.abs(-38));       // 38

// Practical testing example
let testScore = 85.678;
let roundedScore = Math.round(testScore * 100) / 100; // 85.68
console.log(roundedScore);
```

---

#### **3. Boolean (True/False)**

```javascript
// Boolean values
let isActive = true;
let isDeleted = false;

// Boolean expressions
console.log(5 > 3);           // true
console.log(5 === "5");       // false
console.log("hello" === "hello"); // true

// Truthy and Falsy values
console.log(Boolean(1));      // true (truthy)
console.log(Boolean(0));      // false (falsy)
console.log(Boolean("text")); // true (truthy)
console.log(Boolean(""));     // false (falsy)
console.log(Boolean(null));   // false (falsy)
console.log(Boolean(undefined)); // false (falsy)

// Practical testing
let testPassed = true;
if (testPassed) {
  console.log("✓ Test passed");
}
```

---

#### **4. Null & Undefined**

```javascript
// undefined - variable declared but no value assigned
let x;
console.log(x); // undefined

// null - intentional absence of value
let user = null;
console.log(user); // null

// Difference
console.log(typeof undefined);  // "undefined"
console.log(typeof null);       // "object" (quirk of JavaScript)

// Practical testing
let apiResponse = null;
if (apiResponse === null) {
  console.log("API returned null");
}

// Checking for both
if (apiResponse == null) { // == checks both null and undefined
  console.log("No data");
}
```

---

#### **5. Object (Collection of Data)**

```javascript
// Object literal
const user = {
  name: "Karan",
  age: 38,
  email: "karan@example.com",
  isActive: true
};

// Accessing properties
console.log(user.name);           // "Karan"
console.log(user["email"]);       // "karan@example.com"

// Modifying properties
user.age = 39;
user.salary = 30000;
console.log(user.age);     // 39
console.log(user.salary);  // 30000

// Object methods
console.log(Object.keys(user));     // ["name", "age", "email", "isActive", "salary"]
console.log(Object.values(user));   // ["Karan", 39, "karan@example.com", true, 30000]
console.log(Object.entries(user));  // [["name", "Karan"], ...]

// Practical testing example
const loginCredentials = {
  username: "standard_user",
  password: "secret_sauce",
  validLogin: true
};

if (loginCredentials.validLogin) {
  console.log(`Login as ${loginCredentials.username}`);
}
```

---

#### **6. Array (Ordered Collection)**

```javascript
// Array creation
const fruits = ["apple", "banana", "orange"];
const numbers = [1, 2, 3, 4, 5];
const mixed = [1, "text", true, null];

// Accessing elements (0-based indexing)
console.log(fruits[0]); // "apple"
console.log(fruits[2]); // "orange"

// Array length
console.log(fruits.length); // 3

// Array methods
fruits.push("mango");          // Add to end
console.log(fruits);           // ["apple", "banana", "orange", "mango"]

fruits.pop();                  // Remove last
console.log(fruits);           // ["apple", "banana", "orange"]

fruits.unshift("grape");       // Add to start
console.log(fruits);           // ["grape", "apple", "banana", "orange"]

fruits.shift();                // Remove first
console.log(fruits);           // ["apple", "banana", "orange"]

// Finding elements
console.log(fruits.includes("apple"));     // true
console.log(fruits.indexOf("banana"));     // 1

// Practical testing - test results array
const testResults = ["passed", "passed", "failed", "passed"];
const passedCount = testResults.filter(result => result === "passed").length;
console.log(`${passedCount} tests passed`);
```

---

#### **7. Symbol (Unique Identifier)**

```javascript
// Create unique symbols
const id1 = Symbol("id");
const id2 = Symbol("id");

console.log(id1 === id2); // false (each symbol is unique)

// Used for object property names
const person = {};
person[id1] = "unique value";
console.log(person[id1]); // "unique value"

// Less commonly used in automation testing, but good to know
```

---

#### **8. BigInt (Very Large Numbers)**

```javascript
// Regular number limit
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991

// BigInt for larger numbers
const largeNumber = 9007199254740992n; // Notice the 'n' at end
console.log(largeNumber);

// BigInt operations
const big1 = 1000000000000000n;
const big2 = 2000000000000000n;
console.log(big1 + big2); // 3000000000000000n

// Less commonly used in automation testing
```

---

### **Part 2.2: Type Checking**

```javascript
// typeof operator
console.log(typeof 42);           // "number"
console.log(typeof "hello");      // "string"
console.log(typeof true);         // "boolean"
console.log(typeof undefined);    // "undefined"
console.log(typeof Symbol("id")); // "symbol"
console.log(typeof 42n);          // "bigint"
console.log(typeof {});           // "object"
console.log(typeof []);           // "object" (arrays are objects!)
console.log(typeof null);         // "object" (quirk!)

// Better array check
console.log(Array.isArray([1, 2, 3]));     // true
console.log(Array.isArray("not array"));   // false

// For testing - asserting data types
function validateTestData(data) {
  if (typeof data === "object" && Array.isArray(data)) {
    console.log("✓ Valid test data array");
  } else {
    console.log("✗ Invalid data type");
  }
}

validateTestData([1, 2, 3]);
validateTestData("string");
```

---

### **Part 2.3: Operators**

#### **Arithmetic Operators**

```javascript
let a = 10;
let b = 3;

console.log(a + b);      // 13 (addition)
console.log(a - b);      // 7  (subtraction)
console.log(a * b);      // 30 (multiplication)
console.log(a / b);      // 3.333... (division)
console.log(a % b);      // 1  (modulo - remainder)
console.log(a ** b);     // 1000 (exponentiation)

// Increment and decrement
let counter = 0;
console.log(++counter);  // 1 (pre-increment)
console.log(counter++);  // 1 (post-increment, returns old value)
console.log(counter);    // 2

// Practical example - test counter
let testsPassed = 0;
let testsFailed = 0;

testsPassed++; // Increment when test passes
console.log(`Tests passed: ${testsPassed}`);
```

---

#### **Comparison Operators**

```javascript
// Equality
console.log(5 == "5");   // true (loose equality - type coercion)
console.log(5 === "5");  // false (strict equality - no coercion)
console.log(5 != "5");   // false (loose inequality)
console.log(5 !== "5");  // true (strict inequality)

// Relational
console.log(10 > 5);     // true
console.log(10 < 5);     // false
console.log(10 >= 10);   // true
console.log(10 <= 5);    // false

// ✅ BEST PRACTICE: Always use === and !== for automation testing
if (actualValue === expectedValue) {
  console.log("✓ Values match exactly");
}
```

---

#### **Logical Operators**

```javascript
// AND (&&) - both conditions must be true
let isLoggedIn = true;
let isAdmin = false;

console.log(isLoggedIn && isAdmin);     // false (both not true)
console.log(isLoggedIn && true);        // true (both true)

// OR (||) - at least one condition must be true
console.log(isLoggedIn || isAdmin);     // true (one is true)
console.log(false || false);            // false (both false)

// NOT (!) - reverses boolean value
console.log(!isLoggedIn);               // false
console.log(!isAdmin);                  // true

// Practical testing example
const testData = {
  username: "testuser",
  password: "testpass",
  isValid: true
};

if (testData.username && testData.password && testData.isValid) {
  console.log("✓ Test data is valid and complete");
}

// Short-circuit evaluation
let result = false || "default value"; // "default value"
console.log(result); // Useful for defaults!
```

---

#### **Assignment Operators**

```javascript
let x = 10;

x += 5;   // x = x + 5 (x is now 15)
x -= 3;   // x = x - 3 (x is now 12)
x *= 2;   // x = x * 2 (x is now 24)
x /= 4;   // x = x / 4 (x is now 6)
x %= 5;   // x = x % 5 (x is now 1)

console.log(x); // 1
```

---

## 🔨 **EXERCISE SESSION 1 (2 hours)**

### **Exercise 1.1: Variable Declaration & Scope**

**Objective:** Master variable declaration and scope

**Task:**
```javascript
// 1. Declare three variables: one with var, one with let, one with const
// Use meaningful names for automation testing context
// Examples: testName, testDuration, API_URL

// Write your code here:


// 2. Try to redeclare the let variable (you should get an error)
// Take a screenshot of the error

// 3. Try to modify the const variable (you should get an error)
// Take a screenshot of the error

// 4. Create a function that demonstrates block scope
function testBlockScope() {
  // Write your code here
  // Inside an if block, declare let and var variables
  // Try to access them outside the block
}

// 5. Call the function and observe which variables are accessible
```

**Solution:**
```javascript
// ✅ SOLUTION
var legacyVar = "automation";
let testName = "login_test";
const API_URL = "https://api.example.com";

console.log(legacyVar); // "automation"
console.log(testName);  // "login_test"
console.log(API_URL);   // "https://api.example.com"

// Redeclaring let causes error
// let testName = "new_test"; // ❌ Identifier 'testName' has already been declared

// Reassigning const causes error
// API_URL = "https://newapi.example.com"; // ❌ Assignment to constant variable

function testBlockScope() {
  var functionVar = "accessible";
  
  if (true) {
    var varInBlock = "also accessible";
    let letInBlock = "not accessible";
    const constInBlock = "also not accessible";
  }
  
  console.log(functionVar);  // ✓ Works
  console.log(varInBlock);   // ✓ Works (var leaks out!)
  // console.log(letInBlock); // ❌ Error
  // console.log(constInBlock); // ❌ Error
}

testBlockScope();
```

**Learning Points:**
- `var` leaks out of blocks (avoid it!)
- `let` and `const` are block-scoped (safer)
- Always prefer `const`, use `let` when needed

---

### **Exercise 1.2: Data Type Exploration**

**Objective:** Understand all JavaScript data types

**Task:**
```javascript
// 1. Create variables for each data type
// String, Number, Boolean, Null, Undefined, Object, Array, Symbol

// 2. Check their types using typeof operator

// 3. Create an automation test user object with properties:
//    - name (string)
//    - userId (number)
//    - isActive (boolean)
//    - loginTime (null or date)

// 4. Log the object and all its properties

// 5. Create an array of test results
//    Include: "passed", "failed", "skipped"

// 6. Log the array length and individual elements
```

**Solution:**
```javascript
// ✅ SOLUTION

// 1. Variables for each data type
const str = "test string";
const num = 42;
const bool = true;
const nullValue = null;
let undefinedValue;
const obj = { name: "test" };
const arr = [1, 2, 3];
const sym = Symbol("unique");

// 2. Check types
console.log(typeof str);       // "string"
console.log(typeof num);       // "number"
console.log(typeof bool);      // "boolean"
console.log(typeof nullValue); // "object" (quirk!)
console.log(typeof undefinedValue); // "undefined"
console.log(typeof obj);       // "object"
console.log(typeof arr);       // "object" (use Array.isArray)
console.log(typeof sym);       // "symbol"

// 3. Test user object
const testUser = {
  name: "QA Engineer",
  userId: 12345,
  isActive: true,
  loginTime: null
};

// 4. Log object and properties
console.log(testUser);
console.log(`Name: ${testUser.name}`);
console.log(`User ID: ${testUser.userId}`);
console.log(`Active: ${testUser.isActive}`);
console.log(`Login Time: ${testUser.loginTime}`);

// 5. Test results array
const testResults = ["passed", "failed", "skipped"];

// 6. Log array
console.log(`Total results: ${testResults.length}`);
console.log(`Result 1: ${testResults[0]}`);
console.log(`Result 2: ${testResults[1]}`);
console.log(`Result 3: ${testResults[2]}`);
```

---

### **Exercise 1.3: Operator Mastery**

**Objective:** Practice all operators in realistic scenarios

**Task:**
```javascript
// 1. Arithmetic: Calculate test execution time
//    Start time: 10:00 (represented as 600 seconds)
//    End time: 10:05 (represented as 900 seconds)
//    Calculate duration in seconds and minutes

// 2. Comparison: Validate test score
//    Test score: 85
//    Passing score: 80
//    Check if score >= passing score (should be true)

// 3. Logical: Validate test conditions
//    Create a login test with conditions:
//    - username provided (true/false)
//    - password provided (true/false)
//    - isValidUser (true/false)
//    Use AND operator to check all are true

// 4. Assignment: Use compound operators
//    Start with testsPassed = 0
//    Increment by 3 using += operator
//    Multiply by 2 using *= operator
//    Log final value
```

**Solution:**
```javascript
// ✅ SOLUTION

// 1. Arithmetic - Test duration
const startTime = 600;  // 10:00 in seconds
const endTime = 900;    // 10:05 in seconds
const durationSeconds = endTime - startTime; // 300
const durationMinutes = durationSeconds / 60; // 5
console.log(`Test duration: ${durationSeconds} seconds (${durationMinutes} minutes)`);

// 2. Comparison - Test score validation
const testScore = 85;
const passingScore = 80;
const isPassing = testScore >= passingScore; // true
console.log(`Score ${testScore} is passing: ${isPassing}`);

// 3. Logical - Login validation
const usernameProvided = true;
const passwordProvided = true;
const isValidUser = true;

const canLogin = usernameProvided && passwordProvided && isValidUser;
console.log(`Can login: ${canLogin}`);

if (canLogin) {
  console.log("✓ Login credentials validated");
}

// 4. Assignment - Compound operators
let testsPassed = 0;
testsPassed += 3;  // 3
testsPassed *= 2;  // 6
console.log(`Tests passed: ${testsPassed}`);
```

---

## 📝 **EXERCISE SESSION 2 (2 hours)**

### **Exercise 1.4: Automation Testing Scenario**

**Objective:** Apply all learning to real testing context

**Task:** Build a test data validator for an e-commerce application

```javascript
// You are testing an e-commerce application
// Create a test data object and validate it

// Requirements:
// 1. Create a testCart object with:
//    - items (array of products)
//    - totalPrice (number)
//    - discountApplied (boolean)
//    - couponCode (string or null)
//    - orderDate (date)

// 2. Create a validateCart function that checks:
//    - Cart has items (array not empty)
//    - Total price is positive number
//    - Discount boolean is valid
//    - Either coupon is null OR is a valid string

// 3. Log validation results

// 4. Test with valid and invalid data
```

**Solution:**
```javascript
// ✅ SOLUTION

// Test cart object
const testCart = {
  items: ["laptop", "mouse", "keyboard"],
  totalPrice: 45000.99,
  discountApplied: true,
  couponCode: "SAVE20",
  orderDate: new Date()
};

// Validation function
function validateCart(cart) {
  console.log("=== Cart Validation ===");
  
  // Check items
  const hasItems = Array.isArray(cart.items) && cart.items.length > 0;
  console.log(`✓ Has items: ${hasItems} (${cart.items.length} items)`);
  
  // Check price
  const priceValid = typeof cart.totalPrice === "number" && cart.totalPrice > 0;
  console.log(`✓ Price valid: ${priceValid} (₹${cart.totalPrice})`);
  
  // Check discount
  const discountValid = typeof cart.discountApplied === "boolean";
  console.log(`✓ Discount valid: ${discountValid} (${cart.discountApplied ? "Applied" : "Not applied"})`);
  
  // Check coupon
  const couponValid = cart.couponCode === null || typeof cart.couponCode === "string";
  console.log(`✓ Coupon valid: ${couponValid} (${cart.couponCode || "No coupon"})`);
  
  // Overall validation
  const isValid = hasItems && priceValid && discountValid && couponValid;
  console.log(`\n${isValid ? "✓✓✓ Cart is valid ✓✓✓" : "✗✗✗ Cart is invalid ✗✗✗"}`);
  
  return isValid;
}

// Test with valid data
validateCart(testCart);

// Test with invalid data
console.log("\n--- Testing with invalid data ---");
const invalidCart = {
  items: [],  // Empty
  totalPrice: -100,  // Negative
  discountApplied: "yes",  // Should be boolean
  couponCode: 123  // Should be string or null
};

validateCart(invalidCart);
```

---

### **Exercise 1.5: Debug Console Methods**

**Objective:** Learn to debug JavaScript code using console methods

```javascript
// Practice all console debugging methods
// These are crucial for testing and debugging

let testData = {
  name: "Login Test",
  status: "passed",
  duration: 2500,
  browser: "chrome"
};

// 1. console.log - Basic logging
console.log("Basic log:", testData);

// 2. console.table - Table format (great for objects/arrays!)
console.table(testData);

// 3. console.warn - Warning messages
console.warn("This test takes longer than expected");

// 4. console.error - Error messages
console.error("Test failed with error");

// 5. console.info - Information
console.info("Test execution started");

// 6. console.group - Group related logs
console.group("Test Execution Details");
console.log("Test Name:", testData.name);
console.log("Status:", testData.status);
console.log("Duration:", testData.duration, "ms");
console.groupEnd();

// 7. console.time & timeEnd - Measure performance
console.time("executionTime");
// Simulate test execution
for (let i = 0; i < 1000000; i++) {
  // Do something
}
console.timeEnd("executionTime");

// 8. console.assert - Assert conditions
console.assert(testData.status === "passed", "Test did not pass!");

// 9. console.count - Count occurrences
console.count("test-execution");
console.count("test-execution");
console.count("test-execution");

// 10. console.clear - Clear console
// console.clear(); // Uncomment to clear all above logs
```

**Output:**
```
Basic log: { name: 'Login Test', status: 'passed', duration: 2500, browser: 'chrome' }

┌─────────────┬──────────────────┐
│  (index)    │     Values       │
├─────────────┼──────────────────┤
│ name        │ Login Test       │
│ status      │ passed           │
│ duration    │ 2500             │
│ browser     │ chrome           │
└─────────────┴──────────────────┘

⚠️ This test takes longer than expected
❌ Test failed with error
ℹ️ Test execution started

Test Execution Details
  Test Name: Login Test
  Status: passed
  Duration: 2500 ms

executionTime: 15.234ms
test-execution: 1
test-execution: 2
test-execution: 3
```

---

## ❓ **Quiz: JavaScript Fundamentals Part 1**

**Instructions:** Answer all 10 questions. Target score: 8/10 (80%)

### **Question 1: Variable Declaration**
Which statement is correct?
- A) `var` has block scope
- B) `let` can be redeclared in same scope
- C) `const` cannot be reassigned ✅ **CORRECT**
- D) All three are identical

**Explanation:** `const` prevents reassignment. Variables declared with `const` cannot be reassigned (though object properties can be modified).

---

### **Question 2: Data Types**
What will this code output?
```javascript
console.log(typeof null);
```
- A) "null"
- B) "object" ✅ **CORRECT**
- C) "undefined"
- D) Error

**Explanation:** This is a famous JavaScript quirk. `typeof null` returns "object", not "null".

---

### **Question 3: Scope**
What will this output?
```javascript
if (true) {
  let x = 5;
}
console.log(x);
```
- A) 5
- B) undefined
- C) Error: x is not defined ✅ **CORRECT**
- D) null

**Explanation:** `let` has block scope. Variable `x` only exists inside the `if` block.

---

### **Question 4: Hoisting**
What will this output?
```javascript
console.log(x);
var x = 5;
```
- A) 5
- B) undefined ✅ **CORRECT**
- C) Error: x is not defined
- D) null

**Explanation:** `var` declarations are hoisted, but assignments are not. So `x` is declared but not initialized.

---

### **Question 5: Comparison**
What is the result?
```javascript
5 === "5"
```
- A) true
- B) false ✅ **CORRECT**
- C) Error
- D) undefined

**Explanation:** `===` (strict equality) doesn't perform type coercion. 5 (number) is not strictly equal to "5" (string).

---

### **Question 6: Logical Operators**
What will this output?
```javascript
let a = true;
let b = false;
console.log(a && b || true);
```
- A) true ✅ **CORRECT**
- B) false
- C) undefined
- D) Error

**Explanation:** `true && false` = `false`, then `false || true` = `true`. Logical AND has higher precedence than OR.

---

### **Question 7: String Methods**
What will this output?
```javascript
let email = "test@example.com";
console.log(email.includes("@"));
```
- A) true ✅ **CORRECT**
- B) false
- C) -1
- D) Error

**Explanation:** `includes()` returns true if the substring is found, false otherwise.

---

### **Question 8: Array Indexing**
What will this output?
```javascript
let arr = ["a", "b", "c"];
console.log(arr[1]);
```
- A) "a"
- B) "b" ✅ **CORRECT**
- C) "c"
- D) undefined

**Explanation:** Arrays are 0-indexed. Index 1 refers to the second element "b".

---

### **Question 9: Type Checking**
What will this output?
```javascript
console.log(Array.isArray([1, 2, 3]));
```
- A) true ✅ **CORRECT**
- B) false
- C) "object"
- D) Error

**Explanation:** `Array.isArray()` specifically checks if value is an array. `typeof []` would return "object".

---

### **Question 10: Object Properties**
What will this output?
```javascript
let obj = { name: "test", age: 5 };
console.log(obj.name);
```
- A) "test" ✅ **CORRECT**
- B) { name: "test", age: 5 }
- C) undefined
- D) Error

**Explanation:** `obj.name` accesses the "name" property and returns its value "test".

---

## ✅ **Quiz Answer Key**

| Q | Answer | Topic |
|---|--------|-------|
| 1 | C | const |
| 2 | B | Data types |
| 3 | C | Block scope |
| 4 | B | Hoisting |
| 5 | B | === operator |
| 6 | A | Logical operators |
| 7 | A | String methods |
| 8 | B | Array indexing |
| 9 | A | Array checking |
| 10 | A | Object access |

**Your Score:** ___/10

**Interpretation:**
- 9-10: ✅ Excellent! Ready for Day 02
- 7-8: 🟡 Good! Review weak areas
- Below 7: 🔴 Review theory again before Day 02

---

## 📋 **Daily Assignment**

### **Assignment 1.1: Create Test Data Validator Library**

**Objective:** Build a reusable library for validating test data

**Requirements:**
1. Create a file called `testDataValidator.js`
2. Create functions to validate:
   - String data (not empty, valid format)
   - Number data (positive, within range)
   - Boolean data
   - Array data (not empty, correct type)
   - Object data (required fields present)

3. Export functions for use in tests

**Starter Code:**
```javascript
// testDataValidator.js

function validateString(value, fieldName) {
  // Check if string, not empty
  // Return { valid: boolean, message: string }
}

function validateNumber(value, fieldName, min = 0, max = Infinity) {
  // Check if number, within range
  // Return { valid: boolean, message: string }
}

function validateArray(value, fieldName, minLength = 1) {
  // Check if array, not empty
  // Return { valid: boolean, message: string }
}

function validateObject(value, fieldName, requiredFields = []) {
  // Check if object, has required fields
  // Return { valid: boolean, message: string }
}

// Export (for now, we'll learn proper export later)
```

**Example Usage:**
```javascript
// Example test data
const testUser = {
  username: "qaengineer",
  password: "testpass123",
  userId: 12345,
  roles: ["admin", "tester"],
  metadata: { department: "QA" }
};

// Validate each field
console.log(validateString(testUser.username, "username"));
console.log(validateNumber(testUser.userId, "userId"));
console.log(validateArray(testUser.roles, "roles"));
console.log(validateObject(testUser.metadata, "metadata", ["department"]));
```

**Solution Outline:**
```javascript
function validateString(value, fieldName) {
  if (typeof value !== "string") {
    return { valid: false, message: `${fieldName} must be a string` };
  }
  if (value.trim() === "") {
    return { valid: false, message: `${fieldName} cannot be empty` };
  }
  return { valid: true, message: `✓ ${fieldName} is valid` };
}

function validateNumber(value, fieldName, min = 0, max = Infinity) {
  if (typeof value !== "number") {
    return { valid: false, message: `${fieldName} must be a number` };
  }
  if (value < min || value > max) {
    return { valid: false, message: `${fieldName} must be between ${min} and ${max}` };
  }
  return { valid: true, message: `✓ ${fieldName} is valid` };
}

function validateArray(value, fieldName, minLength = 1) {
  if (!Array.isArray(value)) {
    return { valid: false, message: `${fieldName} must be an array` };
  }
  if (value.length < minLength) {
    return { valid: false, message: `${fieldName} must have at least ${minLength} items` };
  }
  return { valid: true, message: `✓ ${fieldName} is valid` };
}

function validateObject(value, fieldName, requiredFields = []) {
  if (typeof value !== "object" || value === null) {
    return { valid: false, message: `${fieldName} must be an object` };
  }
  
  const missing = requiredFields.filter(field => !(field in value));
  if (missing.length > 0) {
    return { valid: false, message: `${fieldName} missing fields: ${missing.join(", ")}` };
  }
  
  return { valid: true, message: `✓ ${fieldName} is valid` };
}
```

---

## 🎯 **Daily Checklist**

Use this to track your Day 01 progress:

- [ ] Reviewed learning objectives
- [ ] Completed Theory Session 1 (Variables & Scope)
- [ ] Completed Exercise 1.1 (Variable Declaration)
- [ ] Completed Theory Session 2 (Data Types & Operators)
- [ ] Completed Exercise 1.2 (Data Types)
- [ ] Completed Exercise 1.3 (Operators)
- [ ] Completed Exercise 1.4 (Automation Scenario)
- [ ] Completed Exercise 1.5 (Console Methods)
- [ ] Answered all 10 quiz questions
- [ ] Scored 80%+ on quiz (8/10)
- [ ] Completed Assignment 1.1 (Test Data Validator)
- [ ] Committed code to GitHub
- [ ] Updated personal learning journal

**Daily Metrics:**
- Quiz Score: ___/10
- Confidence Level (1-5): ___
- Time Spent: ___ hours
- Challenges Faced: _________________

---

## 📚 **Key Takeaways from Day 01**

1. **Always use `const` by default**, `let` when reassignment needed, **never `var`**
2. **Block scope is safer** than function scope
3. **Know all 8 data types:** string, number, boolean, null, undefined, object, array, symbol, bigint
4. **Use `===` for comparisons** to avoid unexpected type coercion
5. **Logical operators are powerful:** && (AND), || (OR), ! (NOT)
6. **Console methods are your debugging friends:** log, table, warn, error, group, time
7. **Type validation is crucial** for automation testing

---

## 🔗 **Resources for Review**

- [MDN: Variables](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Variables)
- [MDN: Data Types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)
- [MDN: Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators)
- [JavaScript.info: Variables](https://javascript.info/variables)
- [JavaScript.info: Data Types](https://javascript.info/types)

---

## 🚀 **Ready for Day 02?**

By completing Day 01, you've mastered:
- ✅ JavaScript variable declaration (var, let, const)
- ✅ Variable scope and hoisting
- ✅ All 8 JavaScript data types
- ✅ Operators (arithmetic, comparison, logical, assignment)
- ✅ Type checking and debugging

**Tomorrow (Day 02):** You'll learn control flow (if/else, switch) and loops (for, while), taking your automation testing skills to the next level!

---

**Great work on Day 01, Karan!** 🎉

You've taken the first step toward becoming a Mid-Senior Automation Test Engineer. Stay consistent, practice daily, and you'll transform your career in 25 days.

---

*Last Updated: December 12, 2025*  
*Day 01 Complete Guide v1.0*  
*Next: Day 02 - Control Flow & Loops*

---
