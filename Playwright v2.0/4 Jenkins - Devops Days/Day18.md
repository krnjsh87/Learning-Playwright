# Day 18: GitHub Actions & Advanced CI/CD Pipelines

**Date:** Day 18 of 25  
**Duration:** 8 hours  
**Difficulty:** Advanced  
**Focus Area:** GitHub Actions, Advanced Workflows, Multi-OS Testing, CI/CD Best Practices  

---

## 🎯 **Learning Objectives**

By the end of Day 18, you will:

✅ Understand GitHub Actions architecture and components  
✅ Create and manage GitHub Actions workflows  
✅ Implement secrets and environment variables securely  
✅ Use Matrix strategies for multi-platform testing  
✅ Build scheduled and event-triggered workflows  
✅ Integrate GitHub Actions with Docker and automated tests  
✅ Deploy artifacts and manage releases  
✅ Monitor workflow performance and debug failures  
✅ Implement GitHub Actions for test automation pipelines  
✅ Master CI/CD best practices specific to GitHub  

---

## ⏰ **Daily Schedule (8 Hours)**

| Time | Activity | Duration |
|------|----------|----------|
| 8:00 - 8:30 | Review Day 17 & GitHub Actions introduction | 30 min |
| 8:30 - 10:30 | **Theory Session 1:** GitHub Actions Architecture & Workflows | 2 hours |
| 10:30 - 11:00 | Break | 30 min |
| 11:00 - 1:00 PM | **Hands-On Lab 1:** Creating Your First Workflow | 2 hours |
| 1:00 - 2:00 PM | Lunch break | 1 hour |
| 2:00 - 4:00 PM | **Theory Session 2:** Advanced Workflows & Strategies | 2 hours |
| 4:00 - 4:30 PM | Break | 30 min |
| 4:30 - 6:30 PM | **Hands-On Lab 2:** Multi-Platform Test Automation Pipeline | 2 hours |

---

## 📚 **THEORY SESSION 1: GitHub Actions Architecture & Workflows (2 hours)**

### **Part 18.1: Understanding GitHub Actions**

#### **What is GitHub Actions?**

GitHub Actions is GitHub's native CI/CD and automation platform. It enables you to:
- Automatically run tests on every code commit
- Build and deploy applications
- Automate workflows without external tools
- Create custom automation for your repository

**Key Benefits:**
- **Native Integration:** Seamlessly integrates with GitHub repositories
- **No External Infrastructure:** Runs on GitHub-hosted runners or self-hosted
- **Free Tier:** Up to 3,000 minutes/month for private repos
- **Flexible:** Supports any programming language and platform
- **Community Actions:** Reuse thousands of pre-built actions
- **Cost-Effective:** Cheaper than Jenkins with dedicated hardware
- **Security:** Built-in secrets management and permissions

#### **GitHub Actions Core Concepts**

| Concept | Description |
|---------|-------------|
| **Workflow** | Automated process defined in YAML; triggered by events |
| **Event** | Trigger for workflow (push, PR, schedule, manual dispatch) |
| **Job** | A set of steps running on the same runner |
| **Step** | Individual task within a job (run command, use action) |
| **Action** | Reusable unit of code (can be custom or from marketplace) |
| **Runner** | Server executing jobs (GitHub-hosted or self-hosted) |
| **Artifact** | Output files from a workflow (logs, reports, binaries) |
| **Secret** | Encrypted environment variable (passwords, tokens) |
| **Environment** | Collection of variables and secrets for deployments |

#### **When to Use GitHub Actions**

**Perfect Use Cases:**
- ✅ CI/CD pipelines for GitHub-hosted projects
- ✅ Automated testing on every pull request
- ✅ Building and publishing to npm, Docker Hub
- ✅ Scheduled workflows (daily, weekly reports)
- ✅ Issue and PR automation
- ✅ Releasing software automatically
- ✅ Static code analysis and security scanning

**Better Alternatives:**
- ❌ Complex on-premises deployments → Jenkins
- ❌ Multiple VCS platforms → GitLab CI, CircleCI
- ❌ Extreme customization needs → Jenkins, Kubernetes

### **Part 18.2: GitHub Actions Architecture**

#### **Workflow Execution Flow**

```
GitHub Event (push, PR, schedule)
    ↓
Webhook triggers GitHub Actions
    ↓
GitHub reads .github/workflows/*.yml
    ↓
Creates job queue
    ↓
Assigns jobs to available runners
    ↓
Runner clones repository
    ↓
Runner executes steps in sequence
    ↓
Collects logs, artifacts, status
    ↓
Updates commit status
    ↓
Sends notifications (Slack, email)
    ↓
Workflow complete
```

#### **GitHub-Hosted Runners**

GitHub provides free runners with these specifications:

| Runner | OS | Specs |
|--------|----|----|
| `ubuntu-latest` | Ubuntu 22.04 | 2-core CPU, 7 GB RAM, 14 GB SSD |
| `ubuntu-20.04` | Ubuntu 20.04 | 2-core CPU, 7 GB RAM, 14 GB SSD |
| `windows-latest` | Windows Server 2022 | 2-core CPU, 7 GB RAM, 14 GB SSD |
| `windows-2019` | Windows Server 2019 | 2-core CPU, 7 GB RAM, 14 GB SSD |
| `macos-latest` | macOS 13 | 3-core CPU, 14 GB RAM, 14 GB SSD |
| `macos-12` | macOS 12 | 3-core CPU, 14 GB RAM, 14 GB SSD |

**Pre-Installed Software:**
- Node.js, Python, Java, Ruby, Go, .NET
- Docker, Docker Compose
- Git, GitHub CLI
- AWS CLI, Azure CLI
- And many more!

#### **Self-Hosted Runners**

For scenarios where you need:
- Specific hardware (GPU, high RAM)
- Private network access
- Compliance requirements

You can use self-hosted runners:

```bash
# Download runner
curl -o actions-runner-linux-x64-2.310.0.tar.gz \
  https://github.com/actions/runner/releases/download/v2.310.0/actions-runner-linux-x64-2.310.0.tar.gz

# Extract and configure
tar xzf actions-runner-linux-x64-2.310.0.tar.gz
./config.sh --url https://github.com/YOUR_ORG/REPO --token TOKEN

# Run the runner
./run.sh
```

### **Part 18.3: Workflow Structure & Syntax**

#### **Anatomy of a Workflow File**

```yaml
# .github/workflows/test.yml
name: Test Automation                    # Workflow name (shown in UI)

on:                                      # Events triggering this workflow
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 2 * * *'                 # Daily at 2 AM UTC
  workflow_dispatch:                    # Manual trigger

jobs:
  test:                                 # Job ID (can have multiple jobs)
    runs-on: ubuntu-latest              # Runner to use
    timeout-minutes: 30                 # Max execution time
    
    strategy:
      matrix:                           # Create multiple job variants
        python-version: ['3.9', '3.10', '3.11']
        node-version: ['16', '18', '20']
    
    env:                                # Job-level environment variables
      ENVIRONMENT: staging
      LOG_LEVEL: debug
    
    steps:
      - name: Checkout code            # Step name (displayed in logs)
        uses: actions/checkout@v3      # Use pre-built action
        with:                           # Action parameters
          fetch-depth: 0                # Fetch all history for commits
      
      - name: Set up Python            # Set up development environment
        uses: actions/setup-python@v4
        with:
          python-version: ${{ matrix.python-version }}
          cache: 'pip'                  # Cache pip packages
      
      - name: Install dependencies     # Run shell command
        run: |
          python -m pip install --upgrade pip
          pip install -r requirements.txt
      
      - name: Run tests
        run: pytest tests/ --junitxml=test-results.xml
      
      - name: Upload test results      # Upload artifacts
        uses: actions/upload-artifact@v3
        if: always()                    # Run even if previous steps fail
        with:
          name: test-results-${{ matrix.python-version }}
          path: test-results.xml
```

#### **Workflow Triggers (Events)**

**Code Events:**
```yaml
on:
  push:
    branches: [main, 'release/**']
    paths: ['src/**', 'tests/**']        # Only if these paths change
    paths-ignore: ['docs/**']
  
  pull_request:
    types: [opened, synchronize, reopened]
  
  # Manual trigger
  workflow_dispatch:
    inputs:
      environment:
        description: 'Deployment environment'
        required: true
        default: 'staging'
```

**Scheduled Events:**
```yaml
on:
  schedule:
    - cron: '0 2 * * *'           # Daily at 2 AM UTC
    - cron: '0 0 * * 1'           # Weekly on Monday midnight
    - cron: '0 */6 * * *'         # Every 6 hours
```

**Release Events:**
```yaml
on:
  release:
    types: [published, created]
```

### **Part 18.4: Secrets and Environment Variables**

#### **Managing Secrets**

Secrets are encrypted and only exposed to workflows that need them.

**Setting Secrets:**
1. Go to Repository → Settings → Secrets and Variables → Actions
2. Click "New repository secret"
3. Enter name (e.g., `DOCKER_USERNAME`) and value
4. Save

**Using Secrets in Workflow:**
```yaml
- name: Login to Docker Hub
  uses: docker/login-action@v2
  with:
    username: ${{ secrets.DOCKER_USERNAME }}
    password: ${{ secrets.DOCKER_PASSWORD }}
```

**Best Practices:**
- Never hardcode credentials in YAML
- Rotate secrets regularly
- Use environment-specific secrets
- Limit secret access with permissions
- Audit secret usage

#### **Environment Variables vs. Secrets**

| Aspect | Environment Variable | Secret |
|--------|---------------------|--------|
| **Visibility** | Shown in logs | Masked in logs |
| **Storage** | Plain text | Encrypted at rest |
| **Use Case** | Config values | Sensitive data |
| **Example** | `API_URL`, `LOG_LEVEL` | `API_KEY`, `PASSWORD` |

```yaml
env:                                    # Repository-level
  API_ENDPOINT: https://api.example.com

jobs:
  test:
    env:                                # Job-level
      TIMEOUT: 30
    steps:
      - name: Run tests
        env:                            # Step-level
          API_KEY: ${{ secrets.API_KEY }}
        run: pytest tests/
```

#### **Variable Interpolation**

```yaml
# Context variables
- name: Debug info
  run: |
    echo "Event: ${{ github.event_name }}"
    echo "Branch: ${{ github.ref }}"
    echo "Commit: ${{ github.sha }}"
    echo "Actor: ${{ github.actor }}"
    echo "Repo: ${{ github.repository }}"

# Matrix variables
- name: Test on Python
  run: python --version
  # Automatically expands to 3.9, 3.10, 3.11 runs
```

---

## 💻 **HANDS-ON LAB 1: Creating Your First Workflow (2 hours)**

### **Exercise 18.1: Simple Python Test Automation Workflow**

#### **Objective:**
Create a GitHub Actions workflow that:
1. Triggers on push and pull request
2. Sets up Python environment
3. Installs dependencies
4. Runs tests with pytest
5. Uploads test results as artifacts

#### **Step 1: Create Workflow Directory**

```bash
cd your-automation-repo
mkdir -p .github/workflows
```

#### **Step 2: Create Workflow File**

Create `.github/workflows/tests.yml`:

```yaml
name: Python Tests

on:
  push:
    branches: [main, develop]
    paths: ['tests/**', 'src/**', 'requirements.txt', '.github/workflows/tests.yml']
  pull_request:
    branches: [main]
  workflow_dispatch:

jobs:
  test:
    runs-on: ubuntu-latest
    timeout-minutes: 30

    strategy:
      matrix:
        python-version: ['3.9', '3.10', '3.11']
      fail-fast: false  # Continue testing other versions if one fails

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Set up Python ${{ matrix.python-version }}
        uses: actions/setup-python@v4
        with:
          python-version: ${{ matrix.python-version }}
          cache: 'pip'

      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install pytest pytest-cov pytest-json-report requests
          if [ -f requirements.txt ]; then pip install -r requirements.txt; fi

      - name: Lint with flake8
        run: |
          pip install flake8
          # Stop the build if there are Python syntax errors or undefined names
          flake8 . --count --select=E9,F63,F7,F82 --show-source --statistics
          # Exit-zero treats all errors as warnings
          flake8 . --count --exit-zero --max-complexity=10 --max-line-length=127 --statistics
        continue-on-error: true

      - name: Run tests with pytest
        run: |
          pytest tests/ \
            --junitxml=test-results-${{ matrix.python-version }}.xml \
            --cov=src \
            --cov-report=xml:coverage-${{ matrix.python-version }}.xml \
            --cov-report=term
        continue-on-error: true

      - name: Upload test results
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: test-results-py${{ matrix.python-version }}
          path: test-results-*.xml

      - name: Upload coverage reports
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: coverage-py${{ matrix.python-version }}
          path: coverage-*.xml

      - name: Publish test results
        uses: EnricoMi/publish-unit-test-result-action@v2
        if: always()
        with:
          files: test-results-*.xml
          check_name: Test Results (Python ${{ matrix.python-version }})
```

#### **Step 3: Create Sample Test File**

Create `tests/test_automation.py`:

```python
"""
Test automation examples for GitHub Actions
"""
import pytest
import requests
from datetime import datetime

class TestBasics:
    """Basic test examples"""
    
    def test_arithmetic(self):
        """Test basic arithmetic"""
        assert 2 + 2 == 4
        assert 10 - 5 == 5
        assert 3 * 4 == 12
    
    def test_string_operations(self):
        """Test string operations"""
        text = "GitHub Actions"
        assert "GitHub" in text
        assert text.upper() == "GITHUB ACTIONS"
        assert len(text) > 0
    
    def test_list_operations(self):
        """Test list operations"""
        items = [1, 2, 3, 4, 5]
        assert len(items) == 5
        assert 3 in items
        assert items[0] == 1
        assert items[-1] == 5
    
    @pytest.mark.parametrize("value,expected", [
        (1, True),
        (0, False),
        (-1, True),
        (100, True),
    ])
    def test_parametrized(self, value, expected):
        """Test with different parameters"""
        result = value != 0
        assert result == expected

class TestAPI:
    """API testing examples"""
    
    def test_api_request(self):
        """Test making API request"""
        # Using a public API endpoint
        response = requests.get("https://jsonplaceholder.typicode.com/posts/1")
        assert response.status_code == 200
        assert "userId" in response.json()
    
    def test_api_post(self):
        """Test POST request"""
        payload = {
            "title": "Test Post",
            "body": "This is a test",
            "userId": 1
        }
        response = requests.post(
            "https://jsonplaceholder.typicode.com/posts",
            json=payload
        )
        assert response.status_code == 201
        assert response.json()["title"] == "Test Post"

class TestDateTime:
    """Test datetime operations"""
    
    def test_datetime_operations(self):
        """Test datetime functionality"""
        now = datetime.now()
        assert now.year >= 2025
        assert now.month >= 1
        assert now.month <= 12
    
    def test_timestamp(self):
        """Test timestamp"""
        timestamp = datetime.now().timestamp()
        assert isinstance(timestamp, float)
        assert timestamp > 0
```

#### **Step 4: Create requirements.txt**

Create `requirements.txt`:

```
pytest==7.4.3
pytest-cov==4.1.0
pytest-json-report==1.5.0
requests==2.31.0
pytest-xdist==3.5.0
```

#### **Step 5: Commit and Push**

```bash
git add .github/workflows/tests.yml tests/ requirements.txt
git commit -m "Add GitHub Actions test workflow"
git push origin main
```

#### **Step 6: Monitor Workflow Execution**

1. Go to your GitHub repository
2. Click on **Actions** tab
3. Watch your workflow execute in real-time
4. View logs for each step
5. Download artifacts

#### **Verification Checklist:**
- [ ] Workflow file created in `.github/workflows/`
- [ ] Workflow triggers on push/PR
- [ ] All 3 Python versions execute
- [ ] Tests pass successfully
- [ ] Test results uploaded as artifacts
- [ ] Coverage reports generated
- [ ] No syntax errors in YAML

---

## 📚 **THEORY SESSION 2: Advanced Workflows & Strategies (2 hours)**

### **Part 18.5: Matrix Strategy for Multi-Platform Testing**

#### **What is Matrix Strategy?**

Matrix strategy runs the same job multiple times with different variable combinations. Perfect for testing across:
- Multiple Python versions
- Multiple OS (Linux, Windows, macOS)
- Multiple Node.js versions
- Multiple browsers

**Without Matrix (Repetitive):**
```yaml
jobs:
  test-py39:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/setup-python@v4
        with:
          python-version: '3.9'
      - run: pytest

  test-py310:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/setup-python@v4
        with:
          python-version: '3.10'
      - run: pytest

  test-py311:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      - run: pytest
```

**With Matrix (DRY):**
```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: ['3.9', '3.10', '3.11']
    steps:
      - uses: actions/setup-python@v4
        with:
          python-version: ${{ matrix.python-version }}
      - run: pytest
```

#### **Complex Matrix Examples**

**Multi-OS and Multi-Python:**
```yaml
strategy:
  matrix:
    os: [ubuntu-latest, windows-latest, macos-latest]
    python-version: ['3.9', '3.10', '3.11']
    # Creates 3 × 3 = 9 job combinations
```

**Selective Combinations:**
```yaml
strategy:
  matrix:
    include:
      - os: ubuntu-latest
        python-version: '3.9'
      - os: windows-latest
        python-version: '3.10'
      - os: macos-latest
        python-version: '3.11'
    exclude:
      - os: ubuntu-latest
        python-version: '3.11'  # Skip this combination
```

**Dynamic Versions from File:**
```yaml
strategy:
  matrix:
    python-version: ${{ fromJson(secrets.PYTHON_VERSIONS) }}
    # PYTHON_VERSIONS = '["3.9", "3.10", "3.11"]'
```

### **Part 18.6: Conditional Execution and Dependencies**

#### **Conditional Steps**

```yaml
steps:
  - name: Run on Linux only
    if: runner.os == 'Linux'
    run: apt-get install -y python3-dev

  - name: Run on Windows only
    if: runner.os == 'Windows'
    run: choco install python

  - name: Run on specific branches
    if: github.ref == 'refs/heads/main'
    run: echo "This is main branch"

  - name: Run on PRs only
    if: github.event_name == 'pull_request'
    run: echo "This is a pull request"

  - name: Run only if previous failed
    if: failure()
    run: echo "Previous step failed"

  - name: Run only if previous succeeded
    if: success()
    run: echo "All previous steps succeeded"

  - name: Continue despite failure
    if: always()
    run: echo "This runs regardless"

  - name: Skip this step
    if: false
    run: echo "This is skipped"

  - name: Complex condition
    if: |
      github.event_name == 'push' &&
      contains(github.ref, 'release') &&
      github.actor != 'dependabot[bot]'
    run: echo "Running deployment"
```

#### **Job Dependencies**

```yaml
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - run: echo "Linting code"

  test:
    runs-on: ubuntu-latest
    needs: lint  # Wait for lint to complete
    steps:
      - run: echo "Running tests"

  deploy:
    runs-on: ubuntu-latest
    needs: [lint, test]  # Wait for both jobs
    if: success()  # Only if all dependencies succeeded
    steps:
      - run: echo "Deploying application"
```

### **Part 18.7: Reusable Workflows (DRY)**

#### **Creating Reusable Workflows**

Create `.github/workflows/test-template.yml`:

```yaml
name: Reusable Test Workflow

on:
  workflow_call:
    inputs:
      python-version:
        description: 'Python version to use'
        required: true
        type: string
      test-path:
        description: 'Path to tests'
        required: false
        type: string
        default: 'tests/'
    secrets:
      API_KEY:
        description: 'API key for testing'
        required: false

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-python@v4
        with:
          python-version: ${{ inputs.python-version }}
      
      - name: Install dependencies
        run: |
          pip install -r requirements.txt
      
      - name: Run tests
        env:
          API_KEY: ${{ secrets.API_KEY }}
        run: |
          pytest ${{ inputs.test-path }} --junitxml=results.xml
      
      - name: Upload results
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: test-results
          path: results.xml
```

#### **Using Reusable Workflows**

Create `.github/workflows/ci.yml`:

```yaml
name: CI Pipeline

on: [push, pull_request]

jobs:
  test-py39:
    uses: ./.github/workflows/test-template.yml
    with:
      python-version: '3.9'
      test-path: 'tests/'
    secrets:
      API_KEY: ${{ secrets.API_KEY }}

  test-py310:
    uses: ./.github/workflows/test-template.yml
    with:
      python-version: '3.10'
      test-path: 'tests/'
    secrets:
      API_KEY: ${{ secrets.API_KEY }}
```

### **Part 18.8: GitHub Actions Marketplace & Custom Actions**

#### **Using Marketplace Actions**

Popular actions for test automation:

**Upload Artifacts:**
```yaml
- uses: actions/upload-artifact@v3
  with:
    name: my-artifact
    path: |
      build/
      dist/
    retention-days: 5
```

**Download Artifacts:**
```yaml
- uses: actions/download-artifact@v3
  with:
    name: my-artifact
    path: ./downloads/
```

**Publish Test Results:**
```yaml
- uses: EnricoMi/publish-unit-test-result-action@v2
  if: always()
  with:
    files: test-results.xml
    check_name: Test Results
```

**Docker Actions:**
```yaml
- uses: docker/setup-buildx-action@v2

- uses: docker/build-push-action@v4
  with:
    context: .
    push: true
    tags: myimage:latest
```

#### **Creating Custom Actions**

**JavaScript Action:**
Create `.github/actions/hello-world/action.yml`:

```yaml
name: 'Hello World'
description: 'Greet someone'
inputs:
  name:
    description: 'Name to greet'
    required: true
    default: 'World'
outputs:
  message:
    description: 'The greeting message'
runs:
  using: 'node16'
  main: 'index.js'
```

Create `.github/actions/hello-world/index.js`:

```javascript
const core = require('@actions/core');

try {
  const name = core.getInput('name');
  const message = `Hello, ${name}!`;
  console.log(message);
  core.setOutput('message', message);
} catch (error) {
  core.setFailed(error.message);
}
```

**Use Custom Action:**
```yaml
- uses: ./.github/actions/hello-world
  with:
    name: 'GitHub Actions'
```

---

## 💻 **HANDS-ON LAB 2: Multi-Platform Test Automation Pipeline (2 hours)**

### **Exercise 18.2: Advanced Playwright Test Automation Workflow**

#### **Objective:**
Create a comprehensive GitHub Actions workflow that:
1. Tests across multiple OS (Linux, Windows, macOS)
2. Runs Playwright tests in parallel
3. Generates HTML reports
4. Integrates with Docker
5. Sends Slack notifications

#### **Step 1: Create Enhanced Workflow**

Create `.github/workflows/playwright.yml`:

```yaml
name: Playwright Cross-Platform Tests

on:
  push:
    branches: [main, develop]
    paths: ['tests/playwright/**', 'src/**', '.github/workflows/playwright.yml']
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 2 * * *'  # Daily at 2 AM UTC
  workflow_dispatch:
    inputs:
      debug:
        description: 'Enable debug mode'
        required: false
        type: boolean
        default: false

jobs:
  test:
    name: Test on ${{ matrix.os }}
    runs-on: ${{ matrix.os }}
    timeout-minutes: 30

    strategy:
      fail-fast: false
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        node-version: ['18', '20']
        exclude:
          # Skip some combinations to save minutes
          - os: macos-latest
            node-version: '18'

    env:
      PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD: 0

    steps:
      - name: Checkout code
        uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - name: Set up Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'

      - name: Install dependencies
        run: |
          npm ci
          npx playwright install --with-deps
        timeout-minutes: 10

      - name: Run Playwright tests
        run: |
          npm run test:playwright -- \
            --reporter=html \
            --reporter=json \
            --reporter=junit \
            --max-workers=4
        continue-on-error: true

      - name: Upload HTML Report
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report-${{ matrix.os }}-node${{ matrix.node-version }}
          path: playwright-report/
          retention-days: 30

      - name: Upload JSON Report
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-json-${{ matrix.os }}-node${{ matrix.node-version }}
          path: test-results.json
          retention-days: 7

      - name: Publish test results
        uses: EnricoMi/publish-unit-test-result-action@v2
        if: always() && runner.os == 'Linux'  # Only on Linux to avoid duplicates
        with:
          files: junit.xml
          check_name: Playwright Test Results (${{ matrix.os }} / Node ${{ matrix.node-version }})

  api-tests:
    name: API Tests
    runs-on: ubuntu-latest
    timeout-minutes: 20

    services:
      api-server:
        image: kennethreitz/httpbin
        ports:
          - 80:80
        options: >-
          --health-cmd "curl -f http://localhost || exit 1"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
          cache: 'pip'

      - name: Install dependencies
        run: |
          pip install -r requirements.txt
          pip install pytest-html

      - name: Run API tests
        run: |
          pytest tests/api/ \
            --junitxml=api-results.xml \
            --html=api-report.html \
            --self-contained-html
        env:
          API_URL: http://localhost:80

      - name: Upload API test results
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: api-test-results
          path: |
            api-results.xml
            api-report.html

  integration-tests:
    name: Integration Tests with Docker
    runs-on: ubuntu-latest
    timeout-minutes: 25

    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_USER: testuser
          POSTGRES_PASSWORD: testpass
          POSTGRES_DB: testdb
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

      redis:
        image: redis:7-alpine
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 6379:6379

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
          cache: 'pip'

      - name: Install dependencies
        run: pip install -r requirements.txt

      - name: Run integration tests
        run: |
          pytest tests/integration/ \
            --junitxml=integration-results.xml \
            -v
        env:
          DATABASE_URL: postgresql://testuser:testpass@localhost:5432/testdb
          REDIS_URL: redis://localhost:6379

      - name: Upload integration results
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: integration-results
          path: integration-results.xml

  notify:
    name: Send Notifications
    runs-on: ubuntu-latest
    needs: [test, api-tests, integration-tests]
    if: always()

    steps:
      - name: Download all artifacts
        uses: actions/download-artifact@v3

      - name: Check test status
        run: |
          if [ "${{ needs.test.result }}" == "success" ] && \
             [ "${{ needs.api-tests.result }}" == "success" ] && \
             [ "${{ needs.integration-tests.result }}" == "success" ]; then
            echo "TEST_STATUS=✅ All tests passed" >> $GITHUB_ENV
            echo "TEST_COLOR=good" >> $GITHUB_ENV
          else
            echo "TEST_STATUS=❌ Some tests failed" >> $GITHUB_ENV
            echo "TEST_COLOR=danger" >> $GITHUB_ENV
          fi

      - name: Send Slack notification
        uses: 8398a7/action-slack@v3
        if: ${{ secrets.SLACK_WEBHOOK_URL != '' }}
        with:
          status: ${{ job.status }}
          text: |
            GitHub Actions Test Report
            Repository: ${{ github.repository }}
            Branch: ${{ github.ref }}
            Commit: ${{ github.sha }}
            Status: ${{ env.TEST_STATUS }}
          webhook_url: ${{ secrets.SLACK_WEBHOOK_URL }}
          fields: repo,message,commit,author
        continue-on-error: true

      - name: Create summary
        run: |
          cat >> $GITHUB_STEP_SUMMARY << EOF
          # Test Execution Summary

          ## Results
          - **Playwright Tests:** ${{ needs.test.result }}
          - **API Tests:** ${{ needs.api-tests.result }}
          - **Integration Tests:** ${{ needs.integration-tests.result }}

          ## Artifacts
          - Playwright Reports available in Actions
          - API Test Results available in Actions
          - Integration Test Results available in Actions

          **Workflow triggered by:** ${{ github.event_name }}
          **Triggered at:** ${{ github.event.head_commit.timestamp }}
          EOF
```

#### **Step 2: Create Playwright Test Suite**

Create `tests/playwright/example.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Example Website Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to example.com before each test
    await page.goto('https://example.com');
  });

  test('should load page title', async ({ page }) => {
    const title = await page.title();
    expect(title).toContain('Example');
  });

  test('should contain expected heading', async ({ page }) => {
    const heading = page.locator('h1');
    await expect(heading).toContainText('Example Domain');
  });

  test('should have working links', async ({ page }) => {
    const moreLink = page.locator('a[href*="example"]').first();
    await expect(moreLink).toBeVisible();
  });
});

test.describe('Cross-browser tests', () => {
  test('should work on different browsers', async ({ browser, browserName }) => {
    const page = await browser.newPage();
    await page.goto('https://example.com');
    
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    
    console.log(`✅ Test passed on ${browserName}`);
    await page.close();
  });
});
```

#### **Step 3: Create API Test Suite**

Create `tests/api/httpbin_tests.py`:

```python
"""
API tests using httpbin service
"""
import pytest
import requests
from typing import Dict, Any

class TestHTTPBinAPI:
    """Test API endpoints"""

    BASE_URL = "http://localhost:80"

    @pytest.fixture
    def api_client(self):
        """Create API client"""
        class APIClient:
            def __init__(self, base_url):
                self.base_url = base_url
            
            def get(self, endpoint, **kwargs):
                return requests.get(f"{self.base_url}{endpoint}", **kwargs)
            
            def post(self, endpoint, **kwargs):
                return requests.post(f"{self.base_url}{endpoint}", **kwargs)
            
            def put(self, endpoint, **kwargs):
                return requests.put(f"{self.base_url}{endpoint}", **kwargs)
        
        return APIClient(self.BASE_URL)

    def test_get_request(self, api_client):
        """Test GET request"""
        response = api_client.get("/get?key=value")
        assert response.status_code == 200
        data = response.json()
        assert data["args"]["key"] == "value"

    def test_post_request(self, api_client):
        """Test POST request"""
        payload = {"name": "Test", "value": 123}
        response = api_client.post("/post", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["json"] == payload

    def test_put_request(self, api_client):
        """Test PUT request"""
        payload = {"updated": True}
        response = api_client.put("/put", json=payload)
        assert response.status_code == 200
        assert response.json()["json"] == payload

    @pytest.mark.parametrize("status_code", [200, 201, 400, 404, 500])
    def test_status_codes(self, api_client, status_code):
        """Test different status codes"""
        response = api_client.get(f"/status/{status_code}")
        assert response.status_code == status_code
```

#### **Step 4: Create Integration Test Suite**

Create `tests/integration/database_tests.py`:

```python
"""
Integration tests with database
"""
import pytest
import os
import psycopg2
from psycopg2.extras import RealDictCursor

class TestDatabaseIntegration:
    """Test database operations"""

    @pytest.fixture
    def db_connection(self):
        """Connect to test database"""
        conn = psycopg2.connect(
            host="localhost",
            database="testdb",
            user="testuser",
            password="testpass"
        )
        yield conn
        conn.close()

    @pytest.fixture
    def db_cursor(self, db_connection):
        """Create database cursor"""
        cursor = db_connection.cursor(cursor_factory=RealDictCursor)
        yield cursor
        cursor.close()

    def test_database_connection(self, db_connection):
        """Test database connection"""
        assert db_connection is not None
        cursor = db_connection.cursor()
        cursor.execute("SELECT 1")
        result = cursor.fetchone()
        assert result[0] == 1

    def test_create_table(self, db_cursor, db_connection):
        """Test table creation"""
        try:
            db_cursor.execute("DROP TABLE IF EXISTS test_users")
            db_cursor.execute("""
                CREATE TABLE test_users (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(100),
                    email VARCHAR(100)
                )
            """)
            db_connection.commit()
            
            # Verify table exists
            db_cursor.execute("""
                SELECT EXISTS (
                    SELECT FROM information_schema.tables 
                    WHERE table_name = 'test_users'
                )
            """)
            assert db_cursor.fetchone()[0] is True
        finally:
            db_cursor.execute("DROP TABLE IF EXISTS test_users")
            db_connection.commit()

    def test_insert_data(self, db_cursor, db_connection):
        """Test data insertion"""
        try:
            db_cursor.execute("""
                CREATE TABLE test_users (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(100),
                    email VARCHAR(100)
                )
            """)
            
            db_cursor.execute("""
                INSERT INTO test_users (name, email) 
                VALUES (%s, %s)
            """, ("John Doe", "john@example.com"))
            
            db_connection.commit()
            
            db_cursor.execute("SELECT * FROM test_users WHERE name = %s", ("John Doe",))
            result = db_cursor.fetchone()
            assert result["name"] == "John Doe"
            assert result["email"] == "john@example.com"
        finally:
            db_cursor.execute("DROP TABLE IF EXISTS test_users")
            db_connection.commit()
```

#### **Step 5: Update package.json**

Create/update `package.json`:

```json
{
  "name": "test-automation",
  "version": "1.0.0",
  "scripts": {
    "test:playwright": "playwright test",
    "test:playwright:headed": "playwright test --headed",
    "test:playwright:debug": "playwright test --debug",
    "test:report": "playwright show-report"
  },
  "devDependencies": {
    "@playwright/test": "^1.40.0"
  }
}
```

#### **Step 6: Update requirements.txt**

Create/update `requirements.txt`:

```
pytest==7.4.3
pytest-html==4.1.1
psycopg2-binary==2.9.9
requests==2.31.0
redis==5.0.0
```

#### **Step 7: Commit and Push**

```bash
git add .github/workflows/playwright.yml tests/ package.json requirements.txt
git commit -m "Add comprehensive GitHub Actions CI/CD pipeline"
git push origin main
```

#### **Verification Checklist:**
- [ ] Workflow triggers on push and PR
- [ ] Tests run on Linux, Windows, and macOS
- [ ] Tests run with Node 18 and 20
- [ ] Playwright tests execute successfully
- [ ] API tests pass with httpbin service
- [ ] Integration tests connect to database
- [ ] Test reports uploaded as artifacts
- [ ] Notifications configured (if Slack webhook set)

---

## 🧪 **Quiz: GitHub Actions Mastery (10 Questions)**

**Instructions:** Answer the following questions to test your understanding. Aim for 8/10 or higher.

1. **What triggers a GitHub Actions workflow?**
   - A) Only manual dispatch
   - B) Push, pull request, schedule, manual, webhook events
   - C) Only scheduled events
   - D) Only pull requests

2. **Which runner can access 14GB of RAM?**
   - A) ubuntu-latest
   - B) windows-latest
   - C) macos-latest
   - D) All of them equally

3. **How do you use a secret in a workflow?**
   - A) `${{ env.SECRET_NAME }}`
   - B) `${{ secrets.SECRET_NAME }}`
   - C) `{{ SECRET_NAME }}`
   - D) Directly hardcoded

4. **What does matrix strategy do?**
   - A) Creates multiple job runs with different configurations
   - B) Runs all jobs in parallel
   - C) Creates a single large job
   - D) Manages artifact storage

5. **How many free minutes does GitHub provide for CI/CD?**
   - A) 500 minutes/month
   - B) 1,000 minutes/month
   - C) 3,000 minutes/month
   - D) Unlimited

6. **What is the correct syntax for conditional execution?**
   - A) `condition: github.ref == 'main'`
   - B) `if: github.ref == 'refs/heads/main'`
   - C) `when: main`
   - D) `require: main`

7. **How do you make jobs wait for other jobs?**
   - A) `waits: [job1, job2]`
   - B) `needs: [job1, job2]`
   - C) `depends: [job1, job2]`
   - D) `requires: [job1, job2]`

8. **Where should GitHub Actions workflow files be located?**
   - A) `.github/actions/`
   - B) `.github/workflows/`
   - C) `github/workflows/`
   - D) `actions/workflows/`

9. **What's the advantage of reusable workflows?**
   - A) Reduced code duplication across repos
   - B) Easier maintenance and updates
   - C) Consistent CI/CD patterns
   - D) All of the above

10. **How do you cache dependencies in GitHub Actions?**
    - A) `cache: 'pip'` in setup action
    - B) `cache-dependencies: true`
    - C) `save-cache: true`
    - D) Caching is not supported

---

## 📋 **Assignment 18.1: Build Production-Grade CI/CD Pipeline**

**Objective:** Create a complete, production-ready GitHub Actions pipeline for an automation project.

**Requirements:**
1. **Workflow Definition:**
   - Trigger on push, PR, schedule, and manual dispatch
   - Run tests on 3+ OS combinations
   - Parallel job execution
   - Proper error handling

2. **Test Execution:**
   - Multiple test frameworks (pytest, Playwright, etc.)
   - Parallel test execution
   - Test result reporting
   - Coverage reports

3. **Artifacts & Reports:**
   - Upload test results
   - Generate HTML reports
   - Publish test summaries

4. **Advanced Features:**
   - Environment configuration
   - Conditional steps
   - Service containers (database, Redis)
   - Custom actions or reusable workflows

5. **Documentation:**
   - README explaining workflow
   - Step-by-step guide for setup
   - Troubleshooting section

**Deliverables:**
- Complete `.github/workflows/` directory
- Test suite with multiple test types
- Configuration files (pytest.ini, playwright.config.ts)
- Documentation (WORKFLOW.md)
- GitHub repository with working pipeline

**Submission:**
1. Push to GitHub repository
2. Verify workflow executes successfully
3. Capture workflow execution screenshots
4. Submit GitHub repository URL

---

## 🔍 **Troubleshooting Common Issues**

### **Issue: Workflow Not Triggering**

**Solution:**
```bash
# Check if workflow file is valid YAML
# Validate at: https://github.com/marketplace/actions/workflow-yaml-validator

# Ensure file is in correct location
# Should be: .github/workflows/filename.yml

# Check branch triggers
# Only branches specified in 'on' trigger workflow
```

### **Issue: Out of Memory During Tests**

**Solution:**
```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      # Reduce parallel workers
      - run: pytest -n 2  # Instead of -n 4
      
      # Or use fewer browser instances
      - run: playwright test --workers=1
```

### **Issue: Timeout During Workflow**

**Solution:**
```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    timeout-minutes: 60  # Increase timeout
    
    steps:
      - name: Step with custom timeout
        timeout-minutes: 30  # Step-level timeout
        run: long-running-command
```

### **Issue: Secrets Not Available**

**Solution:**
```yaml
# Only available in jobs, not in workflow-level conditions
# Correct usage:
jobs:
  test:
    steps:
      - run: echo ${{ secrets.MY_SECRET }}
        # Secrets are masked in logs

# Use GITHUB_TOKEN by default:
- run: gh api repos/${{ github.repository }}/issues
  env:
    GH_TOKEN: ${{ github.token }}
```

---

## 📊 **Daily Metrics & Tracker**

**Learning Progress:**
- [ ] Reviewed Day 17 & GitHub Actions introduction
- [ ] Completed Theory Session 1
- [ ] Created first GitHub Actions workflow
- [ ] Tested workflow execution
- [ ] Completed Theory Session 2
- [ ] Implemented matrix strategy
- [ ] Created reusable workflows
- [ ] Built multi-platform testing pipeline
- [ ] Integrated service containers
- [ ] Configured notifications
- [ ] Answered all 10 quiz questions
- [ ] Scored 80%+ on quiz (8/10)
- [ ] Completed Assignment 18.1
- [ ] Verified workflow runs on all platforms
- [ ] Tested error scenarios
- [ ] Updated GitHub repository
- [ ] Updated learning journal

**Daily Metrics:**
- Quiz Score: ___/10
- Workflows created: ___ count
- Test platforms covered: ___ count
- Total GitHub Actions minutes used: ___ minutes
- Confidence Level (1-5): ___
- Time Spent: ___ hours
- Challenges Faced: _________________

---

## 📚 **Key Takeaways from Day 18**

1. **GitHub Actions is native CI/CD** - Native to GitHub, no external tools needed
2. **Matrix strategy scales testing** - Test across OS and versions automatically
3. **Secrets are essential** - Secure credential management built-in
4. **Reusable workflows reduce duplication** - DRY principle for CI/CD
5. **Service containers enable integration tests** - Database, cache, API servers
6. **Conditional execution is powerful** - Run steps based on context
7. **Artifacts preserve test evidence** - Store reports and logs
8. **Job dependencies ensure order** - Build, test, deploy sequentially
9. **Marketplace actions save time** - Thousands of pre-built integrations
10. **GitHub Actions is cost-effective** - Free for public repos, affordable for private

---

## 🔗 **Resources for Review**

- [GitHub Actions Official Documentation](https://docs.github.com/en/actions)
- [GitHub Actions Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
- [GitHub Actions Marketplace](https://github.com/marketplace?type=actions)
- [GitHub Actions Best Practices](https://docs.github.com/en/actions/guides)
- [Playwright GitHub Actions Integration](https://playwright.dev/docs/ci#github-actions)
- [Publishing Test Results](https://github.com/EnricoMi/publish-unit-test-result-action)

---

## 🚀 **Ready for Day 19?**

By completing Day 18, you've mastered:
- ✅ GitHub Actions workflow creation
- ✅ Multi-platform testing strategies
- ✅ Secret and environment management
- ✅ Matrix job execution
- ✅ Conditional workflow logic
- ✅ Reusable workflow patterns
- ✅ Service container integration
- ✅ Artifact management
- ✅ Notification integration
- ✅ Production-grade CI/CD pipelines

**Next (Day 19):** Cypress Testing Framework & Advanced Browser Automation
- Cypress fundamentals and architecture
- E2E testing best practices
- Visual regression testing
- Cypress custom commands
- LambdaTest Cypress certification preparation

---

## 📊 **Week 4 Progress**

```
Week 1          Week 2          Week 3          Week 4          Week 5
Foundation      Mastery         API Testing     Jenkins/DevOps  Cypress/Interview
Days 1-5        Days 6-11       Days 12-15      Days 16-20      Days 21-25
✅ 100%         ✅ 100%         ✅ 100%         🔄 Day 18       🔜 Final
                                               (40%)            Weeks

Overall: 18/25 Days Complete (72%)
```

---

**Congratulations on completing Day 18!** 🎉

You've now covered:
- ✅ JavaScript & TypeScript Fundamentals (Days 1-2)
- ✅ Playwright Browser Automation (Days 3-5)
- ✅ Advanced Playwright & Testing (Days 6-11)
- ✅ REST API Testing (Days 12-14)
- ✅ Python API Frameworks (Day 15)
- ✅ CI/CD Foundations & Jenkins (Day 16)
- ✅ Advanced Jenkins & Docker Integration (Day 17)
- ✅ **GitHub Actions & Advanced CI/CD (Day 18)** ← You are here

**Week 4 Focus:** Complete DevOps Infrastructure Mastery!

---

*Last Updated: December 13, 2025*  
*Day 18 Complete Guide v1.0*  
*Week 4 Day 3 - GitHub Actions & CI/CD Automation*  
*Advanced CI/CD Pipelines for Professional Automation Testing*
