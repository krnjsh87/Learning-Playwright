# Day 15: Building a Python API Test Automation Framework

**Date:** Day 15 of 25
**Duration:** 8 hours
**Difficulty:** Advanced
**Focus Area:** API Test Framework Architecture, Data-Driven Testing, Reporting

---

## 🎯 **Learning Objectives**

By the end of Day 15, you will be able to:

-   ✅ Design and structure a scalable API test automation framework in Python.
-   ✅ Implement a "Service Layer" or "Service Object Model" for clean API test design.
-   ✅ Manage test configurations and environments (e.g., staging vs. production).
-   ✅ Write powerful data-driven tests using Pytest and external data files.
-   ✅ Integrate Allure to generate beautiful, interactive, and insightful test reports.
-   ✅ Understand the fundamentals of API mocking to isolate test environments.
-   ✅ Complete and showcase **Portfolio Project 2**, demonstrating professional API testing expertise.

---

## ⏰ **Daily Schedule (8 Hours)**

| Time            | Activity                                                    | Duration |
| --------------- | ----------------------------------------------------------- | -------- |
| 8:00 - 8:30     | Review Day 14 & GraphQL concepts                          | 30 min   |
| 8:30 - 10:30    | **Theory Session 1:** API Framework Architecture & Design     | 2 hours  |
| 10:30 - 11:00   | Break                                                       | 30 min   |
| 11:00 - 1:00 PM | **Hands-On Lab 1:** Building the Framework Foundation       | 2 hours  |
| 1:00 - 2:00 PM  | Lunch break                                                 | 1 hour   |
| 2:00 - 4:00 PM  | **Theory Session 2:** Data-Driven Testing & Allure Reporting | 2 hours  |
| 4:00 - 4:30 PM  | Break                                                       | 30 min   |
| 4:30 - 6:30 PM  | **Hands-On Lab 2:** Implementing Data-Driven Tests & Reports | 2 hours  |

---

## 📚 **THEORY SESSION 1: API Framework Architecture & Design (2 hours)**

### **Part 15.1: Why Scripts Are Not Enough**

Simple scripts (like the one in `api_tester.py` from the project brief) are great for quick checks. However, for a real project, they become unmaintainable.

**Challenges with Scripts:**
-   **Code Duplication:** Base URLs, headers, and request logic are repeated everywhere.
-   **Poor Readability:** It's hard to understand the test's purpose without reading every line of code.
-   **Difficult to Maintain:** A single API change (e.g., a new auth method) requires updating dozens of files.
-   **No Scalability:** Adding hundreds of new tests is complex and error-prone.

A **framework** solves this by providing structure, abstracting complexity, and promoting reusability.

### **Part 15.2: The "Service Object" Pattern**

In UI automation, we use the **Page Object Model (POM)**. For API testing, the equivalent is the **Service Object Model** or **Service Layer**.

-   A **Service Object** is a Python class that models an API resource or endpoint (e.g., `Users`, `Posts`, `Products`).
-   It encapsulates all the logic for interacting with that resource (e.g., `get_user()`, `create_user()`, `delete_user()`).
-   Tests will use these service objects instead of calling `requests.get()` or `requests.post()` directly.

**Benefits:**
-   **DRY (Don't Repeat Yourself):** All request logic is in one place.
-   **Readability:** Tests become simple, high-level scenarios (e.g., `user = user_service.create_user(data)`).
-   **Maintainability:** If an endpoint changes (e.g., `/users` becomes `/api/v2/users`), you only update the service object.

### **Part 15.3: Professional Framework Structure**

A robust Python API testing framework typically has the following structure:

```
api_test_framework/
├── tests/                      # Contains all test files (using pytest)
│   ├── __init__.py
│   ├── test_users.py
│   └── test_posts.py
├── services/                   # Contains the Service Object classes
│   ├── __init__.py
│   ├── base_service.py         # Base class with common logic (auth, client)
│   └── users_service.py
├── utils/                      # Helper functions and utilities
│   ├── __init__.py
│   └── data_loader.py          # For loading test data from files
├── config/                     # Configuration management
│   ├── __init__.py
│   ├── config.py               # Main configuration loader
│   └── environments.json       # Store base URLs, tokens per environment
├── requirements.txt            # Project dependencies
└── pytest.ini                  # Pytest configuration file
```

### **Part 15.4: Configuration Management**

Hardcoding URLs or API keys is a major anti-pattern. We need a system to manage different environments (e.g., `dev`, `staging`, `production`).

**`config/environments.json`**
```json
{
  "staging": {
    "base_url": "https://gorest.co.in/public/v2",
    "api_token": "YOUR_STAGING_GOREST_TOKEN"
  },
  "production": {
    "base_url": "https://gorest.co.in/public/v2",
    "api_token": "YOUR_PRODUCTION_GOREST_TOKEN"
  }
}
```

**`config/config.py`**
```python
import os
import json

class Config:
    def __init__(self, env=None):
        if env is None:
            env = os.getenv("TEST_ENV", "staging")

        with open('config/environments.json', 'r') as f:
            all_configs = json.load(f)
            self.config = all_configs[env]

    def get_base_url(self):
        return self.config['base_url']

    def get_api_token(self):
        return self.config['api_token']

# Create a singleton instance for easy access
config = Config()
```
Now, you can get the base URL anywhere in your framework with `config.get_base_url()`. To switch environments, you set the `TEST_ENV` environment variable.

---

## 🛠 **HANDS-ON LAB 1: Building the Framework Foundation (2 hours)**

In this lab, we will build the core structure for **Portfolio Project 2**.

**Target API:** [GoREST](https://gorest.co.in/) - A free public API for CRUD operations. You will need to get an access token from their website.

**Step 1: Set Up the Project Structure**
Create the directories and files as described in Part 15.3.

**Step 2: Install Dependencies**
Create a `requirements.txt` file and add the following:
```
requests
pytest
pytest-html
allure-pytest
```
Install them: `pip install -r requirements.txt`

**Step 3: Create the Configuration**
Create `config/environments.json` and `config/config.py` as shown above. Add your GoREST API token to the JSON file.

**Step 4: Create the Base Service**
This class will initialize the `requests` session with the correct base URL and authentication headers.

**`services/base_service.py`**
```python
import requests
from config.config import config

class BaseService:
    def __init__(self):
        self.base_url = config.get_base_url()
        self.session = requests.Session()
        self.session.headers['Authorization'] = f"Bearer {config.get_api_token()}"
        self.session.headers['Content-Type'] = 'application/json'
        self.session.headers['Accept'] = 'application/json'

    def get(self, endpoint, params=None):
        response = self.session.get(f"{self.base_url}{endpoint}", params=params)
        response.raise_for_status() # Raises an exception for 4xx/5xx responses
        return response

    def post(self, endpoint, data=None):
        response = self.session.post(f"{self.base_url}{endpoint}", json=data)
        response.raise_for_status()
        return response
```

**Step 5: Create the Users Service**
This service will handle all interactions with the `/users` endpoint.

**`services/users_service.py`**
```python
from services.base_service import BaseService

class UsersService(BaseService):
    def __init__(self):
        super().__init__()
        self.users_endpoint = "/users"

    def get_all_users(self):
        return self.get(self.users_endpoint)

    def get_user(self, user_id):
        return self.get(f"{self.users_endpoint}/{user_id}")

    def create_user(self, user_data):
        return self.post(self.users_endpoint, data=user_data)
```

**Step 6: Write Your First `pytest` Test**
Now, let's use our new framework to write a clean test.

**`tests/test_users.py`**
```python
import pytest
from services.users_service import UsersService

@pytest.fixture(scope="module")
def users_service():
    return UsersService()

def test_get_all_users_returns_list(users_service):
    """
    Tests that the /users endpoint returns a list of users.
    """
    response = users_service.get_all_users()
    
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_create_new_user(users_service):
    """
    Tests creating a new user and verifying the response.
    """
    user_data = {
        "name": "Test User",
        "email": f"test.user.{__import__('time').time()}@example.com",
        "gender": "male",
        "status": "active"
    }
    
    response = users_service.create_user(user_data)
    created_user = response.json()

    assert response.status_code == 201
    assert created_user['name'] == user_data['name']
    assert 'id' in created_user
```

**Step 7: Run the Tests**
From your terminal, run: `pytest`
You should see your tests pass!

---

## 📚 **THEORY SESSION 2: Data-Driven Testing & Allure Reporting (2 hours)**

### **Part 15.5: Data-Driven Testing with Pytest**

Hardcoding test data (like the user details in the previous test) is not scalable. Data-driven testing separates the test logic from the test data.

`pytest.mark.parametrize` is a powerful decorator that runs the same test function with different arguments.

**Example:**
```python
import pytest

# Data for our test cases
user_test_data = [
    ("Test User Male", "male", "active"),
    ("Test User Female", "female", "inactive"),
    ("Another Test User", "male", "active")
]

@pytest.mark.parametrize("name, gender, status", user_test_data)
def test_create_multiple_users(users_service, name, gender, status):
    user_data = {
        "name": name,
        "email": f"test.{name.replace(' ','.')}.{__import__('time').time()}@example.com",
        "gender": gender,
        "status": status
    }
    response = users_service.create_user(user_data)
    assert response.status_code == 201
```
This will run the `test_create_multiple_users` function three times, once for each tuple in `user_test_data`.

### **Part 15.6: Generating Rich Reports with Allure**

Pytest's default output is good for developers, but business stakeholders need something more visual. **Allure** is an open-source framework that creates beautiful, interactive reports.

**Key Features of Allure:**
-   **Dashboard View:** High-level overview of test results.
-   **Categorization:** Group tests by features, stories, or severity.
-   **Detailed Steps:** Log individual actions within a test.
-   **Attachments:** Attach screenshots, logs, and API request/response bodies.

**Integrating Allure with Pytest:**
1.  **Installation:** `pip install allure-pytest`
2.  **Decorators:** Add Allure decorators to your tests for better categorization.
3.  **Execution:** Run pytest with the `--alluredir` flag to generate raw report data.
4.  **Serving the Report:** Use the Allure command-line tool to serve the HTML report.

**Example with Allure Decorators:**
```python
import allure

@allure.feature('User Management')
@allure.story('Create New Users')
@allure.title('Test creating a new user with valid data')
@allure.severity(allure.severity_level.CRITICAL)
def test_create_new_user(users_service):
    with allure.step("Define user data"):
        user_data = { ... }
    
    with allure.step(f"Send POST request to create user: {user_data['name']}"):
        response = users_service.create_user(user_data)
        allure.attach(response.request.body, name="Request Body", attachment_type=allure.attachment_type.JSON)
        allure.attach(response.text, name="Response Body", attachment_type=allure.attachment_type.JSON)

    with allure.step("Verify response status code and data"):
        assert response.status_code == 201
        # ... other assertions
```

### **Part 15.7: Introduction to API Mocking**

**What is Mocking?**
Mocking is the practice of creating a "fake" version of a service or component. In API testing, a mock server can simulate a real API, returning predefined responses.

**Why Mock?**
-   **Isolate Your Tests:** Test your application's logic without relying on a live, external API.
-   **Test Edge Cases:** Simulate scenarios that are difficult to create with a real API (e.g., 500 server errors, network timeouts, specific error messages).
-   **Development & CI:** Continue development and testing even when the real API is down or not yet built.
-   **Cost:** Avoid hitting paid, rate-limited APIs during testing.

**Popular Mocking Tools:**
-   **Python:** `pytest-httpserv`, `responses` library.
-   **Standalone:** **WireMock**, **Mockoon**, Postman's mock servers.

---

## 🛠 **HANDS-ON LAB 2: Implementing Data-Driven Tests & Reports (2 hours)**

Let's enhance our framework with data-driven testing and Allure reports.

**Step 1: Create Data-Driven Test**
Add the `test_create_multiple_users` example from Part 15.5 to your `tests/test_users.py` file.

**Step 2: Add Allure Decorators**
Decorate your existing tests (`test_get_all_users_returns_list` and `test_create_new_user`) with Allure decorators as shown in the example in Part 15.6. Add `feature`, `story`, `title`, and `severity`. Use `with allure.step()` to describe the actions in your test.

**Step 3: Run Pytest with Allure**
Run the tests and generate the Allure data.
`pytest --alluredir=allure-results`

This command runs the tests and saves the output data into the `allure-results` directory.

**Step 4: Serve the Allure Report**
(You may need to install the Allure command-line tool first: `npm install -g allure-commandline`)

`allure serve allure-results`

Your browser should open with a beautiful, interactive report! Explore the dashboard, features, and detailed test steps.

---

## 🏆 **PORTFOLIO PROJECT 2: API Automation Framework**

Today, you have built the foundation of your second portfolio project. You will now complete it by adding more tests and features.

**Task: Complete the GoREST API Test Suite**

1.  **Extend `UsersService`:** Add methods for `update_user(user_id, data)` and `delete_user(user_id)`.
2.  **Add `test_update_user`:**
    -   Create a user.
    -   Update their `name` and `status`.
    -   Verify the response.
    -   Fetch the user again to confirm the update was persisted.
3.  **Add `test_delete_user`:**
    -   Create a user.
    -   Delete them.
    -   Verify the `204 No Content` status code.
    -   Try to fetch the user again and expect a `404 Not Found` error. (You'll need to handle expected non-2xx responses in your `BaseService`).
4.  **Create a New Service (`PostsService`):**
    -   Create `services/posts_service.py`.
    -   Create `tests/test_posts.py`.
    -   Implement and test the CRUD operations for `/posts`.
5.  **Decorate Everything:** Add comprehensive Allure decorators to all new tests and services.
6.  **Update `README.md`:** Create a `README.md` in the project root explaining how to set up the project, install dependencies, and run the tests (including the Allure report generation).

Your final project should be a professional, robust, and well-documented API testing framework that you can proudly showcase to any employer.

---

## 🧠 **QUIZ: Day 15 - MCQs**

1.  **What is the primary benefit of the Service Object Model in API testing?**
    a)  It makes tests run faster.
    b)  It centralizes API interaction logic, improving maintainability and readability.
    c)  It automatically generates test data.
    d)  It is required for using `pytest`.

2.  **What is `pytest.mark.parametrize` used for?**
    a)  Running tests in parallel.
    b)  Skipping tests in certain environments.
    c)  Running the same test function with different sets of data.
    d)  Marking tests as slow.

3.  **How do you generate Allure report data from a pytest run?**
    a)  `pytest --report=allure`
    b)  `pytest --html=report.html`
    c)  `pytest --alluredir=<directory_name>`
    d)  `pytest --generate-allure`

4.  **Which of the following is a primary reason to use an API mock?**
    a)  To test the performance of the real API.
    b)  To isolate your tests and simulate server errors or other specific scenarios.
    c)  To replace the need for a UI.
    d)  To automatically fix bugs in the API.

5.  **In a multi-environment framework, where should you store environment-specific data like base URLs and API tokens?**
    a)  Hardcoded directly in the test files.
    b)  In a separate configuration file (e.g., a JSON or YAML file).
    c)  In the `README.md` file.
    d)  In comments within the `BaseService` class.

---
**Answers:** 1(b), 2(c), 3(c), 4(b), 5(b)
