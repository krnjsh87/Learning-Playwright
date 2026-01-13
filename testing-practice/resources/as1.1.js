/*
Assignment 1.1: Create Test Data Validator Library
Objective: Build a reusable library for validating test data

Requirements:

Create a file called testDataValidator.js

Create functions to validate:

String data (not empty, valid format)
Number data (positive, within range)
Boolean data
Array data (not empty, correct type)
Object data (required fields present)
*/


function validateString(value, fieldName) {
  if (typeof value !== 'string' || value.trim() === '') {
    return { valid: false, message: `${fieldName} must be a non-empty string.` };
    } else {
    return { valid: true, message: `${fieldName} is valid.` };
  }
}

function validateNumber(value, fieldName, min = 0, max = Infinity) {
  if (typeof value !== 'number' || isNaN(value) || value < min || value > max) {
    return { valid: false, message: `${fieldName} must be a number between ${min} and ${max}.` };
  } else {
    return { valid: true, message: `${fieldName} is valid.` };
  }
}

function validateArray(value, fieldName, minLength = 1) {
  if (!Array.isArray(value) || value.length < minLength) {
    return { valid: false, message: `${fieldName} must be a non-empty array.` };
  } else {
    return { valid: true, message: `${fieldName} is valid.` };
  }
}

function validateObject(value, fieldName, requiredFields = []) {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return { valid: false, message: `${fieldName} must be a non-null object.` };
  }

  for (const field of requiredFields) {
    if (!(field in value)) {
      return { valid: false, message: `${fieldName} is missing required field: ${field}` };
    }
  }

  return { valid: true, message: `${fieldName} is valid.` };
}


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
