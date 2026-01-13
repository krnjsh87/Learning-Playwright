/*Exercise 2.5: Test Runner Function
Objective: Build a practical test automation function

Task:

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
*/

// Method 1:
/*function testRunner(tests) {
  let passed = 0;
  let failed = 0;
    const total = tests.length;
    tests.forEach(test => {
        const actualResult = test.testFn();
        const isPassed = actualResult === test.expectedResult;
        console.log(`Test: ${test.name} - Result: ${actualResult} - Expected: ${test.expectedResult} - Status: ${isPassed ? "PASSED" : "FAILED"}`);
        if (isPassed) {
            passed++;
        } else {
            failed++;
        }
    });
    console.log(`Summary - Passed: ${passed}, Failed: ${failed}, Total: ${total}`);
    return { passed, failed, total };
}

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
testRunner(tests);*/


// Method 2:
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