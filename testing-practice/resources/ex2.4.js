/*Exercise 2.4: Functions for Automation
Objective: Create reusable functions for testing
*/

// 1. Create function to validate test data
//    Parameters: object with test properties
//    Return: true if valid, false otherwise
//    Check: has testName, testType, expectedResult

function validateTestData(testData) {
  if (!testData || typeof testData !== "object") {
    return false;
  }
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
const testData1 = {
    testName: "Login Test",
    testType: "functional",
    expectedResult: "success"
};
console.log(`validateTestData(testData1): ${validateTestData(testData1)}`);
console.log("\n");

// 2. Create function with default parameters
//    Function: createTestReport(testName, status="pending", duration=0)
//    Return formatted string

function createTestReport(testName, status="pending", duration=0) {
    return `Test Report - Name: ${testName}, Status: ${status}, Duration: ${duration}ms`;
}
console.log(createTestReport("Signup Test"));
console.log(createTestReport("Signup Test", "passed", 150));
console.log("\n");

// 3. Create arrow function to filter test results
//    Filter array for only "passed" results

const filterPassedTests = (testResults) => {
    return testResults.filter(result => result.status === "passed");
};

const testResults = [
    { testName: "Test 1", status: "passed" },
    { testName: "Test 2", status: "failed" },
    { testName: "Test 3", status: "passed" },
];
const passedTests = filterPassedTests(testResults);
console.log("Passed Tests:", passedTests);
console.log("\n");

// 4. Create function that returns another function (closure)
//    createTestLogger - returns function that logs test names
//    Each call should increment a counter

function createTestLogger() {
    let count = 0;

    return function(testName) {
        count++;
        console.log(`Test ${count}: ${testName}`);
    };
}
const logTest = createTestLogger();
logTest("Load Test");
logTest("Stress Test");
logTest("Performance Test");
console.log("\n");

// 5. Create function with ...rest parameter
//    collectResults(...tests) - logs all tests

function collectResults(...tests) {
  console.log(`Collecting ${tests.length} test results:`);
  
  for (let i = 0; i < tests.length; i++) {
    console.log(`${i + 1}. Test Name: ${tests[i].testName} - Status: ${tests[i].status}`);
  }
}
collectResults(
    { testName: "Test A", status: "passed" },
    { testName: "Test B", status: "failed" },
    { testName: "Test C", status: "passed" }
);
console.log("\n");

// 6. Create recursive function
//    fibonacci(n) - return nth fibonacci number

function fibonacci(n) {
    if (n<=1) return n;
    return fibonacci(n-1) + fibonacci (n-2);
}

for (let i = 0; i <= 10; i++) {
    console.log(`i: ${i}, i-1: ${i-1}, i-2: ${i-2}, so fibonacci: ${fibonacci(i)}`);
}