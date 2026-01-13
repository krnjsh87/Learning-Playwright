# Day 05: TypeScript Essentials - Type Safety & Advanced Types

**Date:** Day 5 of 25  
**Duration:** 8 hours  
**Difficulty:** Intermediate-Advanced  
**Focus Area:** Type System & TypeScript Fundamentals

---

## 🎯 **Learning Objectives**

By the end of Day 05, you will:

✅ Understand why TypeScript matters for automation testing  
✅ Master basic type annotations (primitives, arrays, objects)  
✅ Create and use interfaces and type aliases  
✅ Understand generics and their power  
✅ Implement optional, union, and literal types  
✅ Use type narrowing and type guards  
✅ Apply TypeScript to Playwright testing  

---

## ⏰ **Daily Schedule (8 Hours)**

| Time | Activity | Duration |
|------|----------|----------|
| 8:00 - 8:30 | Review Day 01-04 & objectives | 30 min |
| 8:30 - 10:30 | **Theory Session 1:** TypeScript Basics & Setup | 2 hours |
| 10:30 - 11:00 | Break | 30 min |
| 11:00 - 1:00 PM | **Exercise Session 1:** Type Annotations & Interfaces | 2 hours |
| 1:00 - 2:00 PM | Lunch break | 1 hour |
| 2:00 - 4:00 PM | **Theory Session 2:** Advanced Types & Generics | 2 hours |
| 4:00 - 4:30 PM | Break | 30 min |
| 4:30 - 6:30 PM | **Exercise Session 2:** Practical TypeScript Patterns | 2 hours |

---

## 📚 **THEORY SESSION 1: TypeScript Basics & Setup (2 hours)**

### **Part 5.1: Why TypeScript for Automation Testing?**

TypeScript adds type safety to JavaScript - crucial for large test frameworks.

#### **Problems TypeScript Solves**

```javascript
// ❌ JavaScript - No type checking
function loginTest(username, password) {
  // What types should these be?
  // What does function return?
  // Easy to pass wrong types!
  
  const result = login(username, password);
  return result.token; // Might error if token doesn't exist
}

// ✅ TypeScript - Type safe
function loginTest(username: string, password: string): { token: string } {
  // Clear what types are needed
  // Clear what is returned
  // Compiler catches errors before runtime
  
  const result = login(username, password);
  return result; // TypeScript ensures token exists
}
```

#### **Real Testing Benefits**

```typescript
// Test data with TypeScript
interface TestUser {
  username: string;
  password: string;
  email: string;
}

interface TestResult {
  testName: string;
  status: "passed" | "failed";
  duration: number;
  errorMessage?: string; // Optional
}

// Function is clear about requirements
async function runTest(user: TestUser): Promise<TestResult> {
  // TypeScript ensures:
  // - user has username, password, email (string)
  // - function returns object with required fields
  // - status can only be "passed" or "failed"
  
  try {
    const loginTime = await login(user.username, user.password);
    
    return {
      testName: "User Login",
      status: "passed",
      duration: loginTime,
      // errorMessage is optional, so we can skip it
    };
  } catch (error) {
    return {
      testName: "User Login",
      status: "failed",
      duration: 0,
      errorMessage: error.message
    };
  }
}
```

---

### **Part 5.2: Installing & Setting Up TypeScript**

#### **Installation**

```bash
# Install TypeScript globally
npm install -g typescript

# Verify installation
tsc --version  # Should show version number

# Install in project
npm init -y
npm install --save-dev typescript @types/node

# Create tsconfig.json
npx tsc --init
```

#### **tsconfig.json Configuration**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

#### **First TypeScript File**

```typescript
// src/hello.ts
function greet(name: string): string {
  return `Hello, ${name}!`;
}

console.log(greet("Karan"));

// Compile
// npx tsc

// Run compiled JavaScript
// node dist/hello.js
```

---

### **Part 5.3: Basic Type Annotations**

#### **Primitive Types**

```typescript
// String
const testName: string = "Login Test";
const message: string = `Test: ${testName}`;

// Number
const timeout: number = 5000;
const score: number = 95.5;

// Boolean
const isActive: boolean = true;
const testPassed: boolean = false;

// Null and Undefined
const nothing: null = null;
const notDefined: undefined = undefined;

// Any (avoid if possible - defeats purpose of TypeScript)
const flexible: any = "can be anything"; // ❌ Avoid
const flexible: any = 123;
const flexible: any = { anything: true };
```

#### **Array Types**

```typescript
// Array of strings
const browsers: string[] = ["chrome", "firefox", "safari"];

// Alternative syntax
const browsers: Array<string> = ["chrome", "firefox"];

// Array of numbers
const scores: number[] = [85, 92, 78, 95];

// Array of objects
interface Test {
  name: string;
  passed: boolean;
}

const tests: Test[] = [
  { name: "Login", passed: true },
  { name: "Checkout", passed: false }
];

// Mixed type array (union)
const mixed: (string | number)[] = ["test", 5, "another", 10];

// Read-only array
const readonlyTests: readonly string[] = ["test1", "test2"];
// readonlyTests.push("test3"); // ❌ Error - read-only
```

#### **Tuple Types**

```typescript
// Fixed-length array with specific types
type TestTuple = [string, number, boolean];

const test: TestTuple = ["Login Test", 2500, true];
const test: TestTuple = ["Login Test", "2500", true]; // ❌ Error - wrong type

// Optional elements
type Result = [string, number?];
const result1: Result = ["passed"];
const result2: Result = ["passed", 100];

// Rest elements
type StringNumberBooleans = [string, number, ...boolean[]];
const data: StringNumberBooleans = ["test", 1, true, false];
```

#### **Object Types**

```typescript
// Object with specific properties
interface User {
  name: string;
  age: number;
  email: string;
}

const user: User = {
  name: "Karan",
  age: 38,
  email: "karan@example.com"
};

// Optional properties
interface Config {
  timeout: number;
  retries?: number;      // Optional
  headless?: boolean;    // Optional
}

const config: Config = {
  timeout: 5000
  // retries and headless are optional
};

// Readonly properties
interface TestData {
  readonly id: number;
  readonly name: string;
  status: string;        // Can be changed
}

const testData: TestData = {
  id: 1,
  name: "Test",
  status: "pending"
};

testData.status = "passed";  // ✅ OK
// testData.id = 2;          // ❌ Error - readonly
```

---

### **Part 5.4: Function Types**

#### **Function Parameter Types**

```typescript
// Parameters with types
function add(a: number, b: number): number {
  return a + b;
}

add(5, 10);      // ✅ OK
add(5, "10");    // ❌ Error

// Optional parameters
function login(username: string, password: string, rememberMe?: boolean): void {
  console.log(`Logging in ${username}`);
  if (rememberMe) {
    console.log("Remember me enabled");
  }
}

login("admin", "password");
login("admin", "password", true);

// Default parameters
function runTest(timeout: number = 5000): void {
  console.log(`Running with timeout: ${timeout}ms`);
}

runTest();        // Uses default: 5000
runTest(10000);   // Uses provided: 10000
```

#### **Return Types**

```typescript
// Explicit return type
function divide(a: number, b: number): number {
  return a / b;
}

// Function returning promise
async function fetchUser(id: number): Promise<{ id: number; name: string }> {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}

// Function returning nothing
function logMessage(message: string): void {
  console.log(message);
}

// Function that never returns (throws)
function throwError(message: string): never {
  throw new Error(message);
}
```

#### **Function Types**

```typescript
// Define function type
type LoginFunction = (username: string, password: string) => Promise<{ token: string }>;

// Implement the type
const login: LoginFunction = async (username, password) => {
  // Implementation
  return { token: "abc123" };
};

// Callback types
type TestCallback = (passed: boolean, duration: number) => void;

function runTest(callback: TestCallback): void {
  const start = Date.now();
  const passed = true;
  const duration = Date.now() - start;
  
  callback(passed, duration);
}

runTest((passed, duration) => {
  console.log(`Test ${passed ? "passed" : "failed"} in ${duration}ms`);
});
```

---

### **Part 5.5: Interfaces vs Type Aliases**

#### **Interfaces**

```typescript
// Interface for object shapes
interface TestResult {
  testName: string;
  status: "passed" | "failed";
  duration: number;
}

// Can be extended
interface DetailedTestResult extends TestResult {
  errorMessage?: string;
  retries: number;
}

// Can be merged (declaration merging)
interface Window {
  myCustomProperty: string;
}

// Implementation
const result: DetailedTestResult = {
  testName: "Login",
  status: "passed",
  duration: 2500,
  retries: 1
};
```

#### **Type Aliases**

```typescript
// Type for any type (not just objects)
type Status = "passed" | "failed" | "skipped";
type Timeout = number;
type TestCallback = (result: boolean) => void;

// Can be union or intersection
type Result = string | number;
type Combined = { name: string } & { age: number };

// Alias vs Interface
type TestResultType = {
  testName: string;
  status: Status;
};

interface TestResultInterface {
  testName: string;
  status: Status;
}

// Both work similarly, but:
// - Interfaces are better for object shapes
// - Types are better for unions, tuples, etc.
```

#### **When to Use Which**

```typescript
// Use Interface for:
// - Object shapes
// - Defining contracts for classes
// - Public API definitions

interface User {
  name: string;
  email: string;
  login(): Promise<void>;
}

// Use Type for:
// - Unions
// - Tuples
// - Primitives

type Status = "pending" | "passed" | "failed";
type TestTuple = [string, number, boolean];
type ID = string | number;
```

---

## 🔨 **EXERCISE SESSION 1 (2 hours)**

### **Exercise 5.1: Basic Type Annotations**

**Objective:** Master primitive types and basic annotations

**Task:**
```typescript
// 1. Create typed variables for test data
//    String, number, boolean, null, undefined types

// 2. Create typed arrays
//    String array, number array, object array

// 3. Create typed functions
//    With parameters and return types

// 4. Create interfaces for test objects
//    User interface, TestResult interface

// 5. Create read-only and optional properties
```

**Solution:**
```typescript
// 1. Primitive types
const testName: string = "Login Test";
const timeout: number = 5000;
const isHeadless: boolean = true;
const error: null = null;
const result: undefined = undefined;

// 2. Arrays
const browsers: string[] = ["chrome", "firefox", "safari"];
const scores: number[] = [85, 92, 95, 78];

interface Browser {
  name: string;
  version: string;
}

const browserList: Browser[] = [
  { name: "Chrome", version: "120.0" },
  { name: "Firefox", version: "121.0" }
];

// 3. Functions
function calculateScore(passed: number, failed: number): number {
  return (passed / (passed + failed)) * 100;
}

async function runTest(testName: string): Promise<{ status: string; duration: number }> {
  const start = Date.now();
  console.log(`Running: ${testName}`);
  // Simulate test
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    status: "passed",
    duration: Date.now() - start
  };
}

// 4. Interfaces
interface TestUser {
  username: string;
  password: string;
  email: string;
  role: string;
}

interface TestResult {
  testName: string;
  status: "passed" | "failed";
  duration: number;
  assertions: number;
}

const testUser: TestUser = {
  username: "admin",
  password: "password123",
  email: "admin@test.com",
  role: "admin"
};

const testResult: TestResult = {
  testName: "User Login",
  status: "passed",
  duration: 2500,
  assertions: 5
};

// 5. Optional and readonly
interface Config {
  readonly baseUrl: string;
  timeout: number;
  retries?: number;
  headless?: boolean;
}

const config: Config = {
  baseUrl: "https://example.com",
  timeout: 5000
  // retries and headless are optional
};

// config.baseUrl = "new"; // ❌ Error - readonly
config.timeout = 10000;    // ✅ OK
```

---

### **Exercise 5.2: Interfaces & Contracts**

**Objective:** Create professional interfaces for test automation

**Task:**
```typescript
// 1. Create BrowserConfig interface
// 2. Create TestCase interface
// 3. Create TestSuite interface
// 4. Create TestRunner interface
// 5. Implement classes that follow interfaces
```

**Solution:**
```typescript
// 1. Browser configuration
interface BrowserConfig {
  readonly name: "chrome" | "firefox" | "safari" | "edge";
  readonly headless: boolean;
  timeout: number;
  args?: string[];
}

// 2. Individual test case
interface TestCase {
  readonly id: string;
  readonly name: string;
  readonly priority: "low" | "medium" | "high";
  fn(): Promise<void>;
  skip?: boolean;
  only?: boolean;
}

// 3. Test suite (collection of tests)
interface TestSuite {
  readonly name: string;
  readonly tests: TestCase[];
  beforeEach?: () => Promise<void>;
  afterEach?: () => Promise<void>;
  beforeAll?: () => Promise<void>;
  afterAll?: () => Promise<void>;
}

// 4. Test runner
interface TestRunner {
  addSuite(suite: TestSuite): void;
  run(): Promise<TestRunResult>;
  registerReporter(reporter: TestReporter): void;
}

interface TestRunResult {
  totalTests: number;
  passed: number;
  failed: number;
  skipped: number;
  duration: number;
  testResults: IndividualTestResult[];
}

interface IndividualTestResult {
  testName: string;
  status: "passed" | "failed" | "skipped";
  duration: number;
  error?: Error;
}

interface TestReporter {
  onTestStart(testName: string): void;
  onTestEnd(result: IndividualTestResult): void;
  onSuiteComplete(result: TestRunResult): void;
}

// 5. Implementation
class SimpleTestRunner implements TestRunner {
  private suites: TestSuite[] = [];
  private reporters: TestReporter[] = [];
  
  addSuite(suite: TestSuite): void {
    this.suites.push(suite);
  }
  
  registerReporter(reporter: TestReporter): void {
    this.reporters.push(reporter);
  }
  
  async run(): Promise<TestRunResult> {
    const testResults: IndividualTestResult[] = [];
    const startTime = Date.now();
    
    for (const suite of this.suites) {
      await suite.beforeAll?.();
      
      for (const test of suite.tests) {
        if (test.skip) {
          testResults.push({
            testName: test.name,
            status: "skipped",
            duration: 0
          });
          continue;
        }
        
        this.reporters.forEach(r => r.onTestStart(test.name));
        
        const testStart = Date.now();
        try {
          await test.fn();
          const result: IndividualTestResult = {
            testName: test.name,
            status: "passed",
            duration: Date.now() - testStart
          };
          testResults.push(result);
          this.reporters.forEach(r => r.onTestEnd(result));
        } catch (error) {
          const result: IndividualTestResult = {
            testName: test.name,
            status: "failed",
            duration: Date.now() - testStart,
            error: error instanceof Error ? error : new Error(String(error))
          };
          testResults.push(result);
          this.reporters.forEach(r => r.onTestEnd(result));
        }
        
        await suite.afterEach?.();
      }
      
      await suite.afterAll?.();
    }
    
    const passed = testResults.filter(r => r.status === "passed").length;
    const failed = testResults.filter(r => r.status === "failed").length;
    const skipped = testResults.filter(r => r.status === "skipped").length;
    
    const result: TestRunResult = {
      totalTests: testResults.length,
      passed,
      failed,
      skipped,
      duration: Date.now() - startTime,
      testResults
    };
    
    this.reporters.forEach(r => r.onSuiteComplete(result));
    
    return result;
  }
}
```

---

## 📚 **THEORY SESSION 2: Advanced Types & Generics (2 hours)**

### **Part 5.6: Union & Literal Types**

#### **Union Types**

```typescript
// Value can be one of multiple types
type Status = string | number;
const status1: Status = "passed";
const status2: Status = 200;

// More practical
type TestStatus = "pending" | "running" | "passed" | "failed" | "skipped";
const status: TestStatus = "passed";
// const status: TestStatus = "unknown"; // ❌ Error

type Result = string | Error;
function handleResult(result: Result): void {
  if (typeof result === "string") {
    console.log("Success:", result);
  } else {
    console.error("Error:", result.message);
  }
}

// Union of objects
type Admin = { role: "admin"; permissions: string[] };
type User = { role: "user"; email: string };
type Account = Admin | User;

const admin: Account = {
  role: "admin",
  permissions: ["read", "write", "delete"]
};

const user: Account = {
  role: "user",
  email: "user@example.com"
};
```

#### **Literal Types**

```typescript
// Type with specific literal value
type Direction = "up" | "down" | "left" | "right";

function move(direction: Direction): void {
  console.log(`Moving ${direction}`);
}

move("up");      // ✅ OK
move("forward"); // ❌ Error

// Literal numbers
type Status = 200 | 404 | 500;
const responseCode: Status = 200;

// Literal booleans
type Enabled = true;
const isEnabled: Enabled = true;
// const isEnabled: Enabled = false; // ❌ Error
```

#### **Discriminated Unions**

```typescript
// Union of objects with common discriminator property
type TestResult = 
  | { status: "passed"; duration: number }
  | { status: "failed"; duration: number; error: string }
  | { status: "skipped"; reason: string };

function handleTestResult(result: TestResult): void {
  if (result.status === "passed") {
    console.log(`Test passed in ${result.duration}ms`);
  } else if (result.status === "failed") {
    console.log(`Test failed: ${result.error}`);
  } else {
    console.log(`Test skipped: ${result.reason}`);
  }
}
```

---

### **Part 5.7: Type Guards & Type Narrowing**

#### **Type Guards**

```typescript
// typeof guard
function processValue(value: string | number): void {
  if (typeof value === "string") {
    console.log(value.toUpperCase()); // string methods available
  } else {
    console.log(value.toFixed(2)); // number methods available
  }
}

// instanceof guard
class TestError extends Error {
  testName: string;
  constructor(testName: string, message: string) {
    super(message);
    this.testName = testName;
  }
}

function handleError(error: Error | TestError): void {
  if (error instanceof TestError) {
    console.log(`Test "${error.testName}" error: ${error.message}`);
  } else {
    console.log(`General error: ${error.message}`);
  }
}

// Custom type guard
function isTestResult(value: any): value is { status: string; duration: number } {
  return (
    typeof value === "object" &&
    typeof value.status === "string" &&
    typeof value.duration === "number"
  );
}

function processResult(value: unknown): void {
  if (isTestResult(value)) {
    console.log(`${value.status}: ${value.duration}ms`);
  }
}
```

---

### **Part 5.8: Generics**

Generics allow functions and classes to work with multiple types.

#### **Generic Functions**

```typescript
// Function that works with any type
function identity<T>(arg: T): T {
  return arg;
}

const str = identity<string>("hello");    // Type: string
const num = identity<number>(42);         // Type: number

// Type inference - don't need to specify <T>
const bool = identity(true);              // Type inferred: boolean

// Generic constraints
function logLength<T extends { length: number }>(arg: T): void {
  console.log(arg.length);
}

logLength("test");      // ✅ string has length
logLength([1, 2, 3]);   // ✅ array has length
// logLength(123);       // ❌ Error - number has no length

// Practical: Generic test function
function expectEqual<T>(actual: T, expected: T): boolean {
  return actual === expected;
}

expectEqual(5, 5);                              // ✅ true
expectEqual("test", "test");                    // ✅ true
expectEqual({ name: "test" }, { name: "test" }); // ❌ false (different objects)
```

#### **Generic Interfaces**

```typescript
// Container that holds any type
interface Box<T> {
  contents: T;
  push(value: T): void;
  pop(): T | undefined;
}

interface Queue<T> {
  enqueue(item: T): void;
  dequeue(): T | undefined;
  size: number;
}

// Implement for specific type
class TestQueue implements Queue<{testName: string; passed: boolean}> {
  private items: Array<{ testName: string; passed: boolean }> = [];
  
  enqueue(item: { testName: string; passed: boolean }): void {
    this.items.push(item);
  }
  
  dequeue(): { testName: string; passed: boolean } | undefined {
    return this.items.shift();
  }
  
  get size(): number {
    return this.items.length;
  }
}

// Or use type alias
type TestResult<T extends "passed" | "failed"> = {
  testName: string;
  status: T;
  duration: number;
};

const passed: TestResult<"passed"> = {
  testName: "Login",
  status: "passed",
  duration: 2500
};
```

#### **Generic Classes**

```typescript
// Repository pattern - works with any data type
class Repository<T> {
  private items: T[] = [];
  
  add(item: T): void {
    this.items.push(item);
  }
  
  getAll(): T[] {
    return [...this.items];
  }
  
  find(predicate: (item: T) => boolean): T | undefined {
    return this.items.find(predicate);
  }
  
  remove(predicate: (item: T) => boolean): void {
    const index = this.items.findIndex(predicate);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }
}

// Use with different types
interface TestData {
  id: string;
  name: string;
}

const testRepository = new Repository<TestData>();

testRepository.add({
  id: "1",
  name: "Login Test"
});

const test = testRepository.find(t => t.name === "Login Test");
console.log(test); // { id: "1", name: "Login Test" }
```

#### **Practical Generic Pattern for Testing**

```typescript
// API response wrapper
interface ApiResponse<T> {
  data: T;
  status: number;
  error?: string;
}

async function fetchTestData<T>(url: string): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url);
    const data: T = await response.json();
    return {
      data,
      status: response.status
    };
  } catch (error) {
    return {
      data: {} as T,
      status: 500,
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}

// Use with different types
interface User {
  id: number;
  name: string;
}

interface Product {
  id: number;
  title: string;
  price: number;
}

// Automatically typed!
const userResponse = await fetchTestData<User>("/api/user");
// userResponse.data is typed as User

const productResponse = await fetchTestData<Product>("/api/product");
// productResponse.data is typed as Product
```

---

### **Part 5.9: Utility Types**

TypeScript provides built-in generic types for common operations.

```typescript
// Partial<T> - all properties optional
interface User {
  id: number;
  name: string;
  email: string;
}

type PartialUser = Partial<User>;
// Equivalent to: { id?: number; name?: string; email?: string }

// Required<T> - all properties required
type RequiredUser = Required<PartialUser>;

// Readonly<T> - all properties readonly
type ReadonlyUser = Readonly<User>;

// Pick<T, K> - select specific properties
type UserPreview = Pick<User, "id" | "name">;
// Equivalent to: { id: number; name: string }

// Omit<T, K> - exclude specific properties
type UserWithoutEmail = Omit<User, "email">;
// Equivalent to: { id: number; name: string }

// Record<K, T> - create object with specific keys
type TestResults = Record<"unit" | "integration" | "e2e", number>;
// Equivalent to: { unit: number; integration: number; e2e: number }

const results: TestResults = {
  unit: 50,
  integration: 20,
  e2e: 10
};

// Extract<T, U> - extract types that match
type StringOrNumber = string | number | boolean;
type StringOnly = Extract<StringOrNumber, string>; // string

// Exclude<T, U> - exclude types that match
type NoString = Exclude<StringOrNumber, string>; // number | boolean
```

---

## 🔨 **EXERCISE SESSION 2 (2 hours)**

### **Exercise 5.3: Advanced Types & Generics**

**Objective:** Master union types, generics, and type guards

**Task:**
```typescript
// 1. Create union types for test status
// 2. Create discriminated unions
// 3. Implement generic functions
// 4. Create generic repository pattern
// 5. Use utility types effectively
```

**Solution:**
```typescript
// 1. Union and literal types
type TestStatus = "pending" | "running" | "passed" | "failed" | "skipped";
type BrowserType = "chrome" | "firefox" | "safari";
type Severity = 1 | 2 | 3 | 4 | 5;

// 2. Discriminated unions
type TestEvent =
  | { type: "start"; testName: string; timestamp: number }
  | { type: "end"; testName: string; passed: boolean; duration: number }
  | { type: "error"; testName: string; error: string };

function handleTestEvent(event: TestEvent): void {
  switch (event.type) {
    case "start":
      console.log(`Starting: ${event.testName}`);
      break;
    case "end":
      console.log(`Completed: ${event.testName} - ${event.passed ? "Passed" : "Failed"}`);
      break;
    case "error":
      console.log(`Error in ${event.testName}: ${event.error}`);
      break;
  }
}

// 3. Generic functions
function filterResults<T extends { status: string }>(
  results: T[],
  status: string
): T[] {
  return results.filter(r => r.status === status);
}

interface TestResult {
  testName: string;
  status: "passed" | "failed";
  duration: number;
}

const allResults: TestResult[] = [
  { testName: "Test 1", status: "passed", duration: 1000 },
  { testName: "Test 2", status: "failed", duration: 2000 },
  { testName: "Test 3", status: "passed", duration: 1500 }
];

const passedTests = filterResults(allResults, "passed");

// 4. Generic repository pattern
class TestDataRepository<T extends { id: string }> {
  private data: Map<string, T> = new Map();
  
  save(item: T): void {
    this.data.set(item.id, item);
  }
  
  get(id: string): T | undefined {
    return this.data.get(id);
  }
  
  getAll(): T[] {
    return Array.from(this.data.values());
  }
  
  delete(id: string): boolean {
    return this.data.delete(id);
  }
  
  findBy(predicate: (item: T) => boolean): T[] {
    return this.getAll().filter(predicate);
  }
}

// Use with TestResult
const testRepository = new TestDataRepository<TestResult>();

testRepository.save({
  id: "1",
  testName: "Login Test",
  status: "passed",
  duration: 2000
});

const test = testRepository.get("1");

// 5. Utility types
type TestResultPartial = Partial<TestResult>;
type TestResultReadonly = Readonly<TestResult>;
type TestNameAndStatus = Pick<TestResult, "testName" | "status">;
type TestResultWithoutDuration = Omit<TestResult, "duration">;

type TestStatusMap = Record<TestStatus, number>;
const statusCount: TestStatusMap = {
  pending: 0,
  running: 1,
  passed: 5,
  failed: 1,
  skipped: 2
};

// Type guards
function isTestResult(obj: unknown): obj is TestResult {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "testName" in obj &&
    "status" in obj &&
    "duration" in obj
  );
}

function processUnknown(obj: unknown): void {
  if (isTestResult(obj)) {
    console.log(`Test: ${obj.testName}, Status: ${obj.status}`);
  }
}
```

---

### **Exercise 5.4: Building Typed Test Framework**

**Objective:** Create professional-grade typed test framework

**Task:**
```typescript
// Build a simple test framework with:
// 1. Typed test definitions
// 2. Generic test runner
// 3. Typed assertions
// 4. Test lifecycle hooks
// 5. Result reporting
```

**Solution:**
```typescript
// 1. Typed test definitions
interface TestContext {
  timeout: number;
  retries: number;
}

interface TestFunction<T = any> {
  (context: TestContext): Promise<T> | T;
}

interface Test<T = any> {
  name: string;
  fn: TestFunction<T>;
  timeout?: number;
  retries?: number;
  skip?: boolean;
}

// 2. Generic test runner
class TestFramework<T> {
  private tests: Test<T>[] = [];
  private results: TestResult[] = [];
  private hooks = {
    beforeEach: [] as Array<() => Promise<void>>,
    afterEach: [] as Array<() => Promise<void>>,
    beforeAll: [] as Array<() => Promise<void>>,
    afterAll: [] as Array<() => Promise<void>>
  };
  
  describe(name: string, fn: () => void): void {
    console.log(`\n${name}`);
    fn();
  }
  
  it(name: string, fn: TestFunction<T>, timeout: number = 5000): void {
    this.tests.push({
      name,
      fn,
      timeout,
      retries: 0
    });
  }
  
  beforeEach(fn: () => Promise<void>): void {
    this.hooks.beforeEach.push(fn);
  }
  
  afterEach(fn: () => Promise<void>): void {
    this.hooks.afterEach.push(fn);
  }
  
  async run(): Promise<void> {
    const startTime = Date.now();
    
    for (const hook of this.hooks.beforeAll) {
      await hook();
    }
    
    for (const test of this.tests) {
      if (test.skip) {
        console.log(`⊘ ${test.name}`);
        continue;
      }
      
      for (const hook of this.hooks.beforeEach) {
        await hook();
      }
      
      const testStart = Date.now();
      try {
        const context: TestContext = {
          timeout: test.timeout || 5000,
          retries: test.retries || 0
        };
        
        await Promise.race([
          test.fn(context),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Test timeout")), context.timeout)
          )
        ]);
        
        console.log(`✓ ${test.name}`);
        this.results.push({
          testName: test.name,
          status: "passed",
          duration: Date.now() - testStart
        });
      } catch (error) {
        console.log(`✗ ${test.name}`);
        this.results.push({
          testName: test.name,
          status: "failed",
          duration: Date.now() - testStart,
          error: error instanceof Error ? error.message : String(error)
        });
      }
      
      for (const hook of this.hooks.afterEach) {
        await hook();
      }
    }
    
    for (const hook of this.hooks.afterAll) {
      await hook();
    }
    
    const duration = Date.now() - startTime;
    this.printSummary(duration);
  }
  
  private printSummary(duration: number): void {
    const passed = this.results.filter(r => r.status === "passed").length;
    const failed = this.results.filter(r => r.status === "failed").length;
    
    console.log(`\n================`);
    console.log(`Passed: ${passed}`);
    console.log(`Failed: ${failed}`);
    console.log(`Total: ${this.results.length}`);
    console.log(`Duration: ${duration}ms`);
    console.log(`================`);
  }
}

interface TestResult {
  testName: string;
  status: "passed" | "failed";
  duration: number;
  error?: string;
}

// 3. Usage example
const test = new TestFramework<void>();

test.describe("Login Tests", () => {
  test.beforeEach(async () => {
    console.log("  Setting up test...");
  });
  
  test.it("should login with valid credentials", async () => {
    // Test implementation
    await new Promise(resolve => setTimeout(resolve, 100));
  });
  
  test.it("should fail with invalid credentials", async () => {
    await new Promise(resolve => setTimeout(resolve, 150));
  });
});

test.run();
```

---

### **Exercise 5.5: Playwright-Style Type Definitions**

**Objective:** Create types similar to Playwright API

**Task:**
```typescript
// Define types for Playwright-like API:
// - Browser interface
// - Page interface
// - Locator interface
// - Test context
```

**Solution:**
```typescript
// Locator interface
interface Locator {
  click(): Promise<void>;
  fill(text: string): Promise<void>;
  type(text: string): Promise<void>;
  getAttribute(name: string): Promise<string | null>;
  textContent(): Promise<string | null>;
  isVisible(): Promise<boolean>;
  isEnabled(): Promise<boolean>;
  waitFor(options?: { timeout?: number }): Promise<void>;
  screenshot(options?: { path?: string }): Promise<Buffer>;
}

// Page interface
interface Page {
  goto(url: string, options?: { waitUntil?: "load" | "domcontentloaded" }): Promise<void>;
  locator(selector: string): Locator;
  getByTestId(id: string): Locator;
  getByRole(role: string, options?: { name?: string }): Locator;
  waitForNavigation(): Promise<void>;
  url(): string;
  title(): Promise<string>;
  content(): Promise<string>;
  waitForTimeout(timeout: number): Promise<void>;
  close(): Promise<void>;
}

// Browser interface
interface Browser {
  newPage(): Promise<Page>;
  close(): Promise<void>;
}

// Context for test
interface TestContext {
  page: Page;
  expect<T>(actual: T): Expectation<T>;
}

interface Expectation<T> {
  toEqual(expected: T): Promise<void>;
  toBeDefined(): Promise<void>;
  toContain(value: any): Promise<void>;
}

// Launch function
interface LaunchOptions {
  headless?: boolean;
  args?: string[];
}

async function launchBrowser(options?: LaunchOptions): Promise<Browser> {
  // Implementation
  return {} as Browser;
}

// Usage
async function loginTest(context: TestContext): Promise<void> {
  const { page, expect } = context;
  
  await page.goto("https://example.com/login");
  
  const usernameInput = page.getByTestId("username");
  await usernameInput.fill("admin");
  
  const passwordInput = page.getByTestId("password");
  await passwordInput.fill("password");
  
  const loginButton = page.getByRole("button", { name: "Login" });
  await loginButton.click();
  
  await page.waitForNavigation();
  
  const url = page.url();
  await expect(url).toContain("/dashboard");
}
```

---

## ❓ **Quiz: TypeScript Essentials**

**Instructions:** Answer all 10 questions. Target score: 8/10 (80%)

### **Question 1: Type Annotation**
What is the correct way to annotate a function parameter?
- A) `function test(name) { }`
- B) `function test(name: string) { }` ✅ **CORRECT**
- C) `function test(string name) { }`
- D) `function test<string>(name) { }`

**Explanation:** TypeScript uses `parameter: type` syntax for annotations.

---

### **Question 2: Interface vs Type**
Which is better for defining object shapes?
- A) Type alias
- B) Interface ✅ **CORRECT**
- C) Both are identical
- D) Depends on use case

**Explanation:** Interfaces are specifically designed for object contracts.

---

### **Question 3: Union Types**
What does `string | number` mean?
- A) String AND number
- B) String OR number ✅ **CORRECT**
- C) String to number
- D) String with number

**Explanation:** Union types allow multiple possible types.

---

### **Question 4: Optional Properties**
How do you make a property optional?
- A) `property: string?` ✅ **CORRECT**
- B) `property?: string` ✅ **CORRECT**
- C) `property: string!`
- D) `property: string | undefined`

**Explanation:** Both A and B are correct (though B is more common).

---

### **Question 5: Generics**
What do generics allow?
- A) Functions to work with any type ✅ **CORRECT**
- B) Creating multiple classes
- C) Faster code execution
- D) Better error messages

**Explanation:** Generics enable type-safe reusable code.

---

### **Question 6: Generic Constraints**
What does `<T extends string>` mean?
- A) T can be any type
- B) T must be a string or subtype of string ✅ **CORRECT**
- C) T extends a class named string
- D) T is converted to string

**Explanation:** Constraints limit generic types to specific types.

---

### **Question 7: Utility Types**
What does `Partial<T>` do?
- A) Creates partial copy
- B) Makes all properties required
- C) Makes all properties optional ✅ **CORRECT**
- D) Creates new type

**Explanation:** Partial makes all properties optional.

---

### **Question 8: Type Guards**
What is used to narrow types?
- A) `if` statements
- B) `typeof` operator
- C) `instanceof` operator
- D) All of the above ✅ **CORRECT**

**Explanation:** Multiple methods can narrow types.

---

### **Question 9: Literal Types**
What is `"passed" | "failed"`?
- A) Union of string values
- B) Literal types ✅ **CORRECT**
- C) String type
- D) Both A and B ✅ **CORRECT**

**Explanation:** Literal types are specific values, which are also unions.

---

### **Question 10: Return Type**
How do you annotate async function return?
- A) `async function test(): void { }`
- B) `async function test(): Promise<string> { }` ✅ **CORRECT**
- C) `async function test(): string { }`
- D) `async function test(): any { }`

**Explanation:** Async functions return Promises, so use `Promise<T>`.

---

## ✅ **Quiz Answer Key**

| Q | Answer | Topic |
|---|--------|-------|
| 1 | B | Type annotations |
| 2 | B | Interface for objects |
| 3 | B | Union types |
| 4 | A & B | Optional properties |
| 5 | A | Generics purpose |
| 6 | B | Generic constraints |
| 7 | C | Partial utility |
| 8 | D | Type guards |
| 9 | D | Literal types |
| 10 | B | Async return type |

**Your Score:** ___/10

**Interpretation:**
- 9-10: ✅ Excellent! Ready for Playwright (Day 06)
- 7-8: 🟡 Good! Review weak areas
- Below 7: 🔴 Review theory again

---

## 📋 **Daily Assignment**

### **Assignment 5.1: Build Typed Test Assertion Library**

**Objective:** Create production-ready typed assertions

**Requirements:**
1. Create generic Assert class
2. Implement typed assertions (equals, contains, etc.)
3. Handle different types (string, number, object, array)
4. Provide helpful error messages
5. Support custom matchers

**Starter Code:**
```typescript
class Assert<T> {
  private actual: T;
  
  constructor(actual: T) {
    this.actual = actual;
  }
  
  toEqual(expected: T): void {
    // Implementation
  }
  
  toBeDefined(): void {
    // Implementation
  }
  
  toContain<U>(value: U): void {
    // Implementation
  }
}

function expect<T>(actual: T): Assert<T> {
  return new Assert(actual);
}
```

**Example Usage:**
```typescript
expect("hello").toEqual("hello");
expect([1, 2, 3]).toContain(2);
expect({ name: "test" }).toBeDefined();
```

**Solution Outline:**
```typescript
class AssertionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AssertionError";
  }
}

class Assert<T> {
  private actual: T;
  
  constructor(actual: T) {
    this.actual = actual;
  }
  
  toEqual(expected: T): void {
    if (this.actual !== expected) {
      throw new AssertionError(
        `Expected ${JSON.stringify(expected)}, got ${JSON.stringify(this.actual)}`
      );
    }
  }
  
  toBeDefined(): void {
    if (this.actual === undefined || this.actual === null) {
      throw new AssertionError(`Expected value to be defined, got ${this.actual}`);
    }
  }
  
  toContain<U>(value: U): void {
    if (Array.isArray(this.actual)) {
      if (!this.actual.includes(value)) {
        throw new AssertionError(
          `Expected array to contain ${value}, got ${JSON.stringify(this.actual)}`
        );
      }
    } else if (typeof this.actual === "string") {
      if (!(this.actual as any as string).includes(value as any as string)) {
        throw new AssertionError(
          `Expected string to contain "${value}", got "${this.actual}"`
        );
      }
    }
  }
  
  toMatch(pattern: RegExp): void {
    if (typeof this.actual !== "string") {
      throw new AssertionError(`Expected string for pattern matching`);
    }
    if (!pattern.test(this.actual)) {
      throw new AssertionError(
        `Expected "${this.actual}" to match ${pattern}`
      );
    }
  }
}

function expect<T>(actual: T): Assert<T> {
  return new Assert(actual);
}
```

---

## 🎯 **Daily Checklist**

Track your Day 05 progress:

- [ ] Reviewed Day 01-04 concepts
- [ ] Completed Theory Session 1 (TypeScript Basics)
- [ ] Completed Exercise 5.1 (Type Annotations)
- [ ] Completed Exercise 5.2 (Interfaces & Contracts)
- [ ] Completed Theory Session 2 (Advanced Types)
- [ ] Completed Exercise 5.3 (Advanced Types & Generics)
- [ ] Completed Exercise 5.4 (Typed Test Framework)
- [ ] Completed Exercise 5.5 (Playwright-Style Types)
- [ ] Answered all 10 quiz questions
- [ ] Scored 80%+ on quiz (8/10)
- [ ] Completed Assignment 5.1 (Assertion Library)
- [ ] Committed code to GitHub
- [ ] Updated personal learning journal

**Daily Metrics:**
- Quiz Score: ___/10
- Confidence Level (1-5): ___
- Time Spent: ___ hours
- Challenges Faced: _________________

---

## 📚 **Key Takeaways from Day 05**

1. **TypeScript adds type safety** - catch errors before runtime
2. **Interfaces define contracts** - especially for objects
3. **Generics enable reusable code** - without losing type safety
4. **Type guards narrow types** - use typeof, instanceof, custom guards
5. **Union types are powerful** - but need type guards to use safely
6. **Literal types restrict values** - excellent for status enums
7. **Utility types save time** - Partial, Pick, Omit, Record, etc.
8. **Async always returns Promise** - use Promise<T> for return types

---

## 🔗 **Resources for Review**

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [Effective TypeScript](https://effectivetypescript.com/)
- [TypeScript CheatSheet](https://www.typescriptlang.org/cheatsheets)

---

## 🚀 **Ready for Week 2: Playwright?**

By completing Day 05, you've mastered:
- ✅ TypeScript type system fundamentals
- ✅ Interfaces and type aliases
- ✅ Generics and generic constraints
- ✅ Union and literal types
- ✅ Type guards and narrowing
- ✅ Utility types
- ✅ Creating typed frameworks

**Next Week (Days 06-11):** Playwright Automation Framework!
- Installation and setup
- Browser automation basics
- Advanced selectors and locators
- Test organization (Page Object Model)
- Synchronization and waits
- Certification preparation

---

**Phenomenal work on Week 1, Karan!** 🎉

You've completed **5 days of intensive JavaScript & TypeScript training**! This is a massive foundation:

✅ **JavaScript Fundamentals** - Variables, operators, control flow, functions  
✅ **Data Structures** - Objects, arrays, destructuring  
✅ **Async Programming** - Callbacks, Promises, Async/Await  
✅ **TypeScript** - Types, interfaces, generics  

**Week 1 Statistics:**
- 📊 40+ hours of content
- 📝 5 days complete
- 🎯 40+ quiz questions answered
- 💻 20+ hands-on exercises
- 📚 400+ code examples

You're now **production-ready** for professional automation testing frameworks! 🚀

**Week 2 begins with Playwright** - where all this knowledge comes together into real test automation! 🎭

---

*Last Updated: December 12, 2025*  
*Day 05 Complete Guide v1.0*  
*Next: Day 06 - Playwright Basics*

---
