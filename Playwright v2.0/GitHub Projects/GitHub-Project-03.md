# GitHub Portfolio Project 03: CI/CD Pipeline Integration

## Project Duration
**Days 16-20 of the 25-day course**

## Project Overview

This is a **production-grade CI/CD pipeline setup** demonstrating enterprise-level automation infrastructure using **Jenkins**, **GitHub Actions**, **Docker**, and **Docker Compose**. The project showcases complete automation test execution in cloud-native environments with proper artifact management, reporting, and notifications.

By completing this project, you'll showcase:
- Jenkins declarative pipelines with advanced configurations
- GitHub Actions workflows for multiple test frameworks
- Docker containerization of test environments
- Multi-environment deployment and testing
- Automated test reporting and artifact archiving
- Integration with source control and notification systems
- Scalable, production-ready CI/CD architecture
- DevOps best practices for QA automation

---

## Learning Objectives

By the end of this project, you will be able to:

1. **Jenkins Fundamentals**
   - Create declarative pipelines
   - Understand pipeline stages and steps
   - Configure build triggers and webhooks
   - Implement parallel execution
   - Handle environment variables
   - Implement error handling and post-actions
   - Create reusable shared libraries

2. **GitHub Actions**
   - Create workflow files
   - Use actions from marketplace
   - Implement matrix strategies
   - Configure caching and artifacts
   - Set up environment variables and secrets
   - Create custom actions
   - Implement conditional execution

3. **Docker & Containerization**
   - Write efficient Dockerfiles
   - Build and run Docker images
   - Use Docker Compose for multi-container setups
   - Implement container health checks
   - Mount volumes and manage data
   - Set up container networking

4. **CI/CD Best Practices**
   - Automated test execution
   - Artifact management
   - Report generation and publishing
   - Failure notifications
   - Deployment strategies
   - Environment management
   - Cost optimization

5. **Test Orchestration**
   - Run multiple test suites in pipeline
   - Parallel test execution
   - Cross-browser testing matrix
   - Test categorization (smoke, integration, regression)
   - Performance testing in pipelines
   - Result aggregation and reporting

6. **Infrastructure as Code**
   - Version control for pipeline configs
   - Infrastructure automation
   - Reproducible builds
   - Environment parity
   - Disaster recovery

---

## Tech Stack

| Technology | Purpose | Version |
|---|---|---|
| **Jenkins** | Pipeline Orchestration | 2.400+ |
| **GitHub Actions** | Cloud CI/CD | Latest |
| **Docker** | Container Platform | 24.0+ |
| **Docker Compose** | Multi-Container Orchestration | 2.20+ |
| **Playwright** | E2E Testing | ^1.40.0 |
| **pytest** | Python Testing | 7.4+ |
| **Node.js** | JavaScript Runtime | v20.x |

---

## Project Structure

```
automation-testing-portfolio/
├── project-3-cicd-pipeline/
│   ├── README.md                         # Project documentation
│   ├── Jenkinsfile                       # Jenkins declarative pipeline
│   ├── .github/
│   │   └── workflows/
│   │       ├── playwright-tests.yml      # Playwright workflow
│   │       ├── api-tests.yml             # API testing workflow
│   │       ├── performance-tests.yml     # Performance testing
│   │       ├── docker-build.yml          # Docker image build
│   │       └── deploy.yml                # Deployment workflow
│   │
│   ├── docker/
│   │   ├── Dockerfile                    # Main test runner image
│   │   ├── Dockerfile.jenkins            # Jenkins agent image
│   │   └── .dockerignore
│   │
│   ├── docker-compose.yml                # Local development setup
│   ├── docker-compose.prod.yml           # Production setup
│   │
│   ├── jenkins/
│   │   ├── Jenkinsfile-advanced          # Advanced pipeline
│   │   ├── Jenkinsfile-multi-branch      # Multi-branch pipeline
│   │   └── scripts/
│   │       ├── build.sh                  # Build script
│   │       ├── test.sh                   # Test execution
│   │       ├── report.sh                 # Report generation
│   │       └── notify.sh                 # Notification script
│   │
│   ├── tests/
│   │   ├── smoke/
│   │   │   ├── login.spec.ts
│   │   │   └── homepage.spec.ts
│   │   ├── integration/
│   │   │   ├── checkout.spec.ts
│   │   │   └── payment.spec.ts
│   │   └── regression/
│   │       └── full-suite.spec.ts
│   │
│   ├── config/
│   │   ├── pytest.ini                    # pytest configuration
│   │   ├── playwright.config.ts          # Playwright configuration
│   │   └── environments.json             # Environment configs
│   │
│   ├── reports/                          # Generated reports
│   ├── logs/                             # Pipeline logs
│   └── docs/
│       ├── SETUP-GUIDE.md
│       ├── PIPELINE-ARCHITECTURE.md
│       └── TROUBLESHOOTING.md
```

---

## Complete Setup Instructions

### Step 1: Prerequisites

```bash
# Install Docker
# Install Docker Compose
# Install Node.js 20.x
# Install Jenkins (optional for local setup)
# GitHub account with repository access
```

### Step 2: Clone Repository

```bash
cd automation-testing-portfolio
mkdir project-3-cicd-pipeline
cd project-3-cicd-pipeline
git init
```

### Step 3: Create Directory Structure

```bash
mkdir -p docker jenkins/scripts github/workflows tests/{smoke,integration,regression} config reports logs docs
```

### Step 4: Initialize Files

```bash
touch Jenkinsfile docker-compose.yml .github/workflows/playwright-tests.yml
```

---

## Complete Code Implementation

### 1. Jenkinsfile (Declarative Pipeline)

```groovy
/**
 * Jenkins Declarative Pipeline for Test Automation
 * Comprehensive CI/CD pipeline with parallel execution and reporting
 */

pipeline {
    agent any
    
    options {
        // Keep last 30 builds
        buildDiscarder(logRotator(numToKeepStr: '30'))
        
        // Timeout after 1 hour
        timeout(time: 1, unit: 'HOURS')
        
        // Add timestamps to console output
        timestamps()
        
        // Disable concurrent builds
        disableConcurrentBuilds()
    }
    
    environment {
        // Define environment variables
        NODE_ENV = 'test'
        NODEJS_VERSION = '20.x'
        DOCKER_REGISTRY = 'docker.io'
        DOCKER_IMAGE_NAME = 'automation-test-suite'
        DOCKER_IMAGE_TAG = "${BUILD_NUMBER}"
        TEST_RESULTS_DIR = 'test-results'
        REPORT_DIR = 'reports'
        SLACK_CHANNEL = '#automation-tests'
        EMAIL_RECIPIENTS = 'qa-team@example.com'
    }
    
    parameters {
        choice(
            name: 'TEST_SUITE',
            choices: ['smoke', 'integration', 'regression', 'all'],
            description: 'Select test suite to run'
        )
        choice(
            name: 'ENVIRONMENT',
            choices: ['staging', 'production'],
            description: 'Target environment'
        )
        booleanParam(
            name: 'PARALLEL_EXECUTION',
            defaultValue: true,
            description: 'Run tests in parallel'
        )
        string(
            name: 'BROWSER_LIST',
            defaultValue: 'chromium,firefox,webkit',
            description: 'Comma-separated browser list'
        )
    }
    
    stages {
        stage('Initialization') {
            steps {
                script {
                    echo "═══════════════════════════════════════"
                    echo "BUILD INFORMATION"
                    echo "═══════════════════════════════════════"
                    echo "Build Number: ${BUILD_NUMBER}"
                    echo "Build ID: ${BUILD_ID}"
                    echo "Job Name: ${JOB_NAME}"
                    echo "Workspace: ${WORKSPACE}"
                    echo "Git Branch: ${GIT_BRANCH}"
                    echo "Test Suite: ${params.TEST_SUITE}"
                    echo "Environment: ${params.ENVIRONMENT}"
                    echo "═══════════════════════════════════════"
                }
            }
        }
        
        stage('Checkout') {
            steps {
                script {
                    echo "Cloning repository..."
                    checkout scm
                    echo "Repository cloned successfully"
                }
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    echo "Building Docker image..."
                    sh '''
                        docker build -t ${DOCKER_REGISTRY}/${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG} \
                                     -t ${DOCKER_REGISTRY}/${DOCKER_IMAGE_NAME}:latest \
                                     -f docker/Dockerfile .
                        echo "Docker image built successfully"
                    '''
                }
            }
        }
        
        stage('Setup Test Environment') {
            steps {
                script {
                    echo "Setting up test environment..."
                    sh '''
                        mkdir -p ${TEST_RESULTS_DIR} ${REPORT_DIR}
                        npm ci
                        npm install -D @playwright/test typescript ts-node
                        npx playwright install
                        echo "Test environment ready"
                    '''
                }
            }
        }
        
        stage('Run Tests') {
            parallel {
                stage('Smoke Tests') {
                    when {
                        expression { 
                            params.TEST_SUITE == 'smoke' || params.TEST_SUITE == 'all'
                        }
                    }
                    steps {
                        script {
                            echo "Running smoke tests..."
                            sh '''
                                if [ "${PARALLEL_EXECUTION}" == "true" ]; then
                                    npx playwright test tests/smoke --workers=4
                                else
                                    npx playwright test tests/smoke --workers=1
                                fi
                            '''
                        }
                    }
                }
                
                stage('Integration Tests') {
                    when {
                        expression { 
                            params.TEST_SUITE == 'integration' || params.TEST_SUITE == 'all'
                        }
                    }
                    steps {
                        script {
                            echo "Running integration tests..."
                            sh '''
                                if [ "${PARALLEL_EXECUTION}" == "true" ]; then
                                    npx playwright test tests/integration --workers=4
                                else
                                    npx playwright test tests/integration --workers=1
                                fi
                            '''
                        }
                    }
                }
                
                stage('Regression Tests') {
                    when {
                        expression { 
                            params.TEST_SUITE == 'regression' || params.TEST_SUITE == 'all'
                        }
                    }
                    steps {
                        script {
                            echo "Running regression tests..."
                            sh '''
                                if [ "${PARALLEL_EXECUTION}" == "true" ]; then
                                    npx playwright test tests/regression --workers=4
                                else
                                    npx playwright test tests/regression --workers=1
                                fi
                            '''
                        }
                    }
                }
            }
        }
        
        stage('Generate Reports') {
            steps {
                script {
                    echo "Generating test reports..."
                    sh '''
                        npx playwright show-report ${REPORT_DIR}
                        
                        # Generate HTML report
                        echo "Reports generated successfully"
                    '''
                }
            }
        }
        
        stage('Archive Artifacts') {
            steps {
                script {
                    echo "Archiving test artifacts..."
                    sh '''
                        # Archive test results
                        if [ -d "${TEST_RESULTS_DIR}" ]; then
                            tar -czf test-results-${BUILD_NUMBER}.tar.gz ${TEST_RESULTS_DIR}
                        fi
                        
                        # Archive reports
                        if [ -d "${REPORT_DIR}" ]; then
                            tar -czf reports-${BUILD_NUMBER}.tar.gz ${REPORT_DIR}
                        fi
                    '''
                    
                    archiveArtifacts artifacts: '*.tar.gz,**/test-results/**,**/reports/**', 
                                     allowEmptyArchive: true
                    
                    publishHTML([
                        reportDir: "${REPORT_DIR}",
                        reportFiles: 'index.html',
                        reportName: 'Playwright Test Report'
                    ])
                }
            }
        }
        
        stage('Publish Test Results') {
            steps {
                script {
                    echo "Publishing test results..."
                    junit allowEmptyResults: true, 
                          testResults: '**/test-results/**/*.xml'
                    
                    step([$class: 'JunitResultArchiver', 
                          testResults: '**/test-results/**/*.xml'])
                }
            }
        }
    }
    
    post {
        always {
            script {
                echo "Cleaning up..."
                // Clean workspace if needed
                // cleanWs()
            }
        }
        
        success {
            script {
                echo "Pipeline succeeded!"
                
                // Send success notification
                sh '''
                    echo "All tests passed successfully!"
                '''
                
                // Slack notification
                sh '''
                    curl -X POST ${SLACK_WEBHOOK_URL} \
                        -H 'Content-Type: application/json' \
                        -d '{"text":"✅ Build ${BUILD_NUMBER} PASSED"}'
                '''
            }
        }
        
        failure {
            script {
                echo "Pipeline failed!"
                
                // Send failure notification
                emailext(
                    subject: "Build ${BUILD_NUMBER} FAILED",
                    body: """
                        Build ${BUILD_NUMBER} failed.
                        Check console output at ${BUILD_URL} to view the results.
                    """,
                    to: "${EMAIL_RECIPIENTS}",
                    mimeType: 'text/html'
                )
                
                // Slack notification
                sh '''
                    curl -X POST ${SLACK_WEBHOOK_URL} \
                        -H 'Content-Type: application/json' \
                        -d '{"text":"❌ Build ${BUILD_NUMBER} FAILED"}'
                '''
            }
        }
        
        unstable {
            script {
                echo "Pipeline is unstable (some tests failed)"
            }
        }
        
        cleanup {
            script {
                echo "Performing cleanup..."
                deleteDir()
            }
        }
    }
}
```

### 2. .github/workflows/playwright-tests.yml

```yaml
name: Playwright Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]
  schedule:
    # Run tests daily at 2 AM UTC
    - cron: '0 2 * * *'
  workflow_dispatch:

env:
  NODE_VERSION: '20.x'
  PLAYWRIGHT_VERSION: '^1.40.0'

jobs:
  test:
    name: Playwright Tests on ${{ matrix.browser }}
    runs-on: ubuntu-latest
    timeout-minutes: 60
    
    strategy:
      fail-fast: false
      matrix:
        browser: [chromium, firefox, webkit]
        node-version: [20.x]
    
    permissions:
      contents: read
      checks: write
      pull-requests: write
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Install Playwright browsers
        run: npx playwright install --with-deps ${{ matrix.browser }}
      
      - name: Run Playwright tests
        run: npx playwright test --project=${{ matrix.browser }}
        env:
          CI: true
      
      - name: Upload blob report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: blob-report-${{ matrix.browser }}
          path: blob-report
          retention-days: 1
      
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-results-${{ matrix.browser }}
          path: test-results/
          retention-days: 30
      
      - name: Publish test results
        if: always()
        uses: EnricoMi/publish-unit-test-result-action@v2
        with:
          files: 'test-results/**/*.xml'
          check_name: Playwright Tests (${{ matrix.browser }})
      
      - name: Comment PR with test results
        if: always() && github.event_name == 'pull_request'
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const resultsFile = 'test-results/results.json';
            
            if (fs.existsSync(resultsFile)) {
              const results = JSON.parse(fs.readFileSync(resultsFile, 'utf8'));
              const stats = results.stats;
              
              const comment = `## 🧪 Playwright Test Results - ${context.payload.pull_request.head.sha.slice(0, 7)}
              
              ### Browser: ${{ matrix.browser }}
              
              | Metric | Count |
              |--------|-------|
              | ✅ Passed | ${stats.expected} |
              | ❌ Failed | ${stats.unexpected} |
              | ⏭️ Skipped | ${stats.skipped} |
              | **Total** | **${stats.expected + stats.unexpected + stats.skipped}** |
              
              **Duration**: ${(stats.duration / 1000).toFixed(2)}s
              `;
              
              github.rest.issues.createComment({
                issue_number: context.issue.number,
                owner: context.repo.owner,
                repo: context.repo.repo,
                body: comment
              });
            }

  merge-reports:
    name: Merge test reports
    if: always()
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20.x'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Download blob reports
        uses: actions/download-artifact@v4
        with:
          path: all-blob-reports
          pattern: blob-report-*
      
      - name: Merge reports
        run: npx playwright merge-reports --reporter html ./all-blob-reports
      
      - name: Upload HTML report
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
      
      - name: Publish report to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        if: always()
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./playwright-report
```

### 3. .github/workflows/docker-build.yml

```yaml
name: Build and Push Docker Image

on:
  push:
    branches: [main]
    paths:
      - 'docker/**'
      - 'Dockerfile'
      - '.github/workflows/docker-build.yml'
  workflow_dispatch:

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}/automation-test-suite

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3
      
      - name: Log in to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          tags: |
            type=ref,event=branch
            type=sha,prefix={{branch}}-
            type=semver,pattern={{version}}
            type=semver,pattern={{major}}.{{minor}}
            type=raw,value=latest,enable={{is_default_branch}}
      
      - name: Build and push Docker image
        uses: docker/build-push-action@v5
        with:
          context: .
          file: ./docker/Dockerfile
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
      
      - name: Image digest
        run: echo ${{ steps.docker_build.outputs.digest }}
```

### 4. docker/Dockerfile

```dockerfile
# Multi-stage build for test automation
FROM node:20-alpine AS base

WORKDIR /app

# Install system dependencies
RUN apk add --no-cache \
    python3 \
    py3-pip \
    chromium \
    firefox \
    libstdc++ \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-dejavu

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci && npm cache clean --force

# Install Playwright
RUN npx playwright install --with-deps

# Copy application code
COPY . .

# Build stage
FROM base AS builder

RUN npm run build 2>/dev/null || echo "No build script"

# Final stage
FROM base AS runtime

# Copy built assets from builder
COPY --from=builder /app/dist /app/dist 2>/dev/null || true

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD node -e "console.log('healthy')" || exit 1

# Set environment
ENV NODE_ENV=test
ENV CI=true

# Run tests
ENTRYPOINT ["npm", "test"]
CMD []
```

### 5. docker-compose.yml

```yaml
version: '3.8'

services:
  test-runner:
    build:
      context: .
      dockerfile: docker/Dockerfile
    container_name: automation-test-runner
    environment:
      - NODE_ENV=test
      - CI=true
      - PLAYWRIGHT_HEADLESS=true
    volumes:
      - ./test-results:/app/test-results
      - ./reports:/app/reports
      - ./playwright-report:/app/playwright-report
      - /app/node_modules
    working_dir: /app
    command: npm test
    depends_on:
      app:
        condition: service_healthy
      db:
        condition: service_healthy
    networks:
      - test-network

  app:
    image: node:20-alpine
    container_name: test-app
    working_dir: /app
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=test
      - PORT=3000
    volumes:
      - ./sample-app:/app
    command: npm start
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:3000"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - test-network

  db:
    image: postgres:15-alpine
    container_name: test-db
    environment:
      POSTGRES_USER: testuser
      POSTGRES_PASSWORD: testpass
      POSTGRES_DB: testdb
    volumes:
      - postgres-data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U testuser"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - test-network

volumes:
  postgres-data:

networks:
  test-network:
    driver: bridge
```

### 6. jenkins/scripts/test.sh

```bash
#!/bin/bash

###############################################################################
# Test Execution Script
# Runs automated tests with proper error handling
###############################################################################

set -e

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
TEST_SUITE="${1:-all}"
BROWSER_LIST="${2:-chromium,firefox,webkit}"
PARALLEL_WORKERS="${3:-4}"
REPORT_DIR="${4:-reports}"
TEST_RESULTS_DIR="${5:-test-results}"

echo -e "${YELLOW}═══════════════════════════════════════${NC}"
echo -e "${YELLOW}Test Execution Script${NC}"
echo -e "${YELLOW}═══════════════════════════════════════${NC}"
echo "Test Suite: $TEST_SUITE"
echo "Browsers: $BROWSER_LIST"
echo "Workers: $PARALLEL_WORKERS"
echo "Report Dir: $REPORT_DIR"
echo ""

# Create directories
mkdir -p "$REPORT_DIR" "$TEST_RESULTS_DIR"

# Install dependencies
echo -e "${YELLOW}Installing dependencies...${NC}"
npm ci

# Install Playwright
echo -e "${YELLOW}Installing Playwright browsers...${NC}"
npx playwright install --with-deps

# Run tests based on suite selection
case $TEST_SUITE in
  smoke)
    echo -e "${YELLOW}Running smoke tests...${NC}"
    npx playwright test tests/smoke --workers=$PARALLEL_WORKERS
    ;;
  integration)
    echo -e "${YELLOW}Running integration tests...${NC}"
    npx playwright test tests/integration --workers=$PARALLEL_WORKERS
    ;;
  regression)
    echo -e "${YELLOW}Running regression tests...${NC}"
    npx playwright test tests/regression --workers=$PARALLEL_WORKERS
    ;;
  all)
    echo -e "${YELLOW}Running all tests...${NC}"
    npx playwright test --workers=$PARALLEL_WORKERS
    ;;
  *)
    echo -e "${RED}Unknown test suite: $TEST_SUITE${NC}"
    exit 1
    ;;
esac

# Generate reports
echo -e "${YELLOW}Generating reports...${NC}"
if [ -d "playwright-report" ]; then
  cp -r playwright-report "$REPORT_DIR/"
fi

echo -e "${GREEN}✓ Test execution completed successfully${NC}"
```

### 7. jenkins/scripts/report.sh

```bash
#!/bin/bash

###############################################################################
# Report Generation Script
# Aggregates test results and generates reports
###############################################################################

set -e

REPORT_DIR="${1:-reports}"
TEST_RESULTS_DIR="${2:-test-results}"
OUTPUT_REPORT="${3:-${REPORT_DIR}/summary.html}"

echo "Generating test reports..."

# Create report directory
mkdir -p "$REPORT_DIR"

# Count test results
PASSED=0
FAILED=0
SKIPPED=0

# Process JUnit XML files
if [ -d "$TEST_RESULTS_DIR" ]; then
  for file in "$TEST_RESULTS_DIR"/*.xml; do
    if [ -f "$file" ]; then
      PASSED=$((PASSED + $(grep -c 'testcase' "$file" || true)))
      FAILED=$((FAILED + $(grep -c 'failure' "$file" || true)))
      SKIPPED=$((SKIPPED + $(grep -c 'skipped' "$file" || true)))
    fi
  done
fi

# Generate HTML report
cat > "$OUTPUT_REPORT" << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>Test Execution Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .summary { padding: 20px; background: #f5f5f5; border-radius: 5px; }
        .passed { color: #28a745; }
        .failed { color: #dc3545; }
        .skipped { color: #ffc107; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { padding: 10px; text-align: left; border: 1px solid #ddd; }
        th { background: #f8f9fa; }
    </style>
</head>
<body>
    <h1>Test Execution Report</h1>
    <div class="summary">
        <h2>Summary</h2>
        <p class="passed">✓ Passed: PASSED_COUNT</p>
        <p class="failed">✗ Failed: FAILED_COUNT</p>
        <p class="skipped">⊘ Skipped: SKIPPED_COUNT</p>
        <p><strong>Total: TOTAL_COUNT</strong></p>
    </div>
</body>
</html>
EOF

# Replace placeholders
sed -i "s/PASSED_COUNT/$PASSED/g" "$OUTPUT_REPORT"
sed -i "s/FAILED_COUNT/$FAILED/g" "$OUTPUT_REPORT"
sed -i "s/SKIPPED_COUNT/$SKIPPED/g" "$OUTPUT_REPORT"
sed -i "s/TOTAL_COUNT/$((PASSED + FAILED + SKIPPED))/g" "$OUTPUT_REPORT"

echo "Report generated: $OUTPUT_REPORT"
```

### 8. jenkins/scripts/notify.sh

```bash
#!/bin/bash

###############################################################################
# Notification Script
# Sends notifications to Slack and email
###############################################################################

STATUS="${1:-success}"
BUILD_URL="${2:-}"
BUILD_NUMBER="${3:-}"

# Slack notification
if [ ! -z "$SLACK_WEBHOOK_URL" ]; then
  if [ "$STATUS" == "success" ]; then
    EMOJI="✅"
    COLOR="good"
    TEXT="Build #${BUILD_NUMBER} PASSED"
  else
    EMOJI="❌"
    COLOR="danger"
    TEXT="Build #${BUILD_NUMBER} FAILED"
  fi

  curl -X POST "$SLACK_WEBHOOK_URL" \
    -H 'Content-Type: application/json' \
    -d "{
      \"attachments\": [
        {
          \"color\": \"$COLOR\",
          \"title\": \"$EMOJI Build Status\",
          \"text\": \"$TEXT\",
          \"actions\": [
            {
              \"type\": \"button\",
              \"text\": \"View Results\",
              \"url\": \"$BUILD_URL\"
            }
          ]
        }
      ]
    }"
fi

echo "Notification sent: $STATUS"
```

---

## GitHub Workflow Execution Guide

### Trigger Workflows

**Automatic Triggers:**
- Push to main/develop branches
- Pull requests
- Daily schedule (2 AM UTC)

**Manual Trigger:**
```bash
# Using GitHub CLI
gh workflow run playwright-tests.yml

# Or via Actions tab in GitHub UI
```

### View Results

1. Go to **Actions** tab in GitHub repository
2. Click on workflow run
3. View logs and artifacts
4. Download test reports

---

## Jenkins Setup Guide

### Installation

**Using Docker:**
```bash
docker run -d -p 8080:8080 -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  jenkins/jenkins:latest
```

**Access Jenkins:**
- URL: http://localhost:8080
- Get initial admin password: `docker logs <container-id>`

### Create Pipeline Job

1. Click **New Item**
2. Enter job name
3. Select **Pipeline**
4. Configure:
   - **Definition**: Pipeline script from SCM
   - **SCM**: Git
   - **Repository URL**: Your GitHub repo
   - **Script Path**: Jenkinsfile
5. Click **Save**

### Configure GitHub Webhook

1. Go to GitHub repo **Settings**
2. Click **Webhooks**
3. Add webhook:
   - **Payload URL**: `http://your-jenkins-url:8080/github-webhook/`
   - **Content type**: application/json
   - **Events**: Push events
4. Click **Add webhook**

### Run Pipeline

1. Make a commit and push
2. Jenkins automatically triggers build
3. Monitor in **Build History**
4. View reports in **Console Output**

---

## Local Testing with Docker Compose

### Start Services

```bash
# Build and start all services
docker-compose up --build

# Run in background
docker-compose up -d

# View logs
docker-compose logs -f test-runner

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

### Run Only Tests

```bash
docker-compose run --rm test-runner npm test

# Run specific test suite
docker-compose run --rm test-runner npx playwright test tests/smoke
```

---

## Project Exercise Assignments

### Day 16: Jenkins Foundations
1. Install Jenkins locally or using Docker
2. Create basic Jenkinsfile
3. Configure GitHub webhook
4. Run first pipeline
5. Generate basic reports

**Expected Output:** Jenkins pipeline runs successfully with test reports

### Day 17: GitHub Actions
1. Create Playwright workflow with matrix strategy
2. Implement Docker build workflow
3. Add artifact uploads
4. Configure caching
5. Set up PR comments

**Expected Output:** GitHub Actions workflows complete with multi-browser testing

### Day 18: Docker & Orchestration
1. Write efficient Dockerfile
2. Create docker-compose.yml with multiple services
3. Set up health checks
4. Implement volume mounts
5. Test locally with docker-compose

**Expected Output:** Services run in Docker with proper networking

### Day 19: Advanced Pipelines
1. Implement parallel test execution
2. Add parameterized builds
3. Create shared library functions
4. Set up notifications
5. Implement multi-branch pipeline

**Expected Output:** Advanced Jenkins pipeline with parallel stages and notifications

### Day 20: Complete CI/CD System
1. Integrate all components
2. Set up performance monitoring
3. Create deployment pipeline
4. Implement full test suite execution
5. Generate comprehensive reports

**Expected Output:** Production-ready CI/CD pipeline with complete automation

---

## MCQs - Test Your Knowledge

### Question 1: Jenkins Stages
In a Jenkins declarative pipeline, what is the purpose of the `post` section?
- A) Define pipeline stages
- B) Execute actions after pipeline completes
- C) Set environment variables
- **D) Both A and B**

**Answer: B** - Post section runs after all stages complete.

### Question 2: Docker Compose
Which of the following is NOT a service in docker-compose.yml?
- A) test-runner
- B) app
- C) db
- **D) github-runner**

**Answer: D** - Not defined in our compose file.

### Question 3: GitHub Actions Matrix
What does matrix strategy do in GitHub Actions?
- A) Runs job once
- B) Creates multiple job instances with different parameters
- C) Defines pipeline stages
- **D) Both B and C**

**Answer: B** - Matrix creates jobs for each combination of parameters.

### Question 4: Docker Volumes
Which volume type persists data after container removal?
- A) tmpfs mount
- B) bind mount
- **C) named volume**
- D) None of the above

**Answer: C** - Named volumes persist data independently.

### Question 5: CI/CD Best Practices
What should you avoid in CI/CD pipelines?
- A) Hardcoding secrets
- B) Long pipeline timeouts
- C) Skipping tests
- **D) All of the above**

**Answer: D** - All are bad practices.

---

## README.md Template

```markdown
# Project 3: CI/CD Pipeline Integration

## Overview
Complete CI/CD pipeline setup using Jenkins, GitHub Actions, Docker, and Docker Compose.

## Technologies
- Jenkins 2.400+
- GitHub Actions
- Docker 24.0+
- Docker Compose 2.20+
- Playwright, pytest

## Setup

### Prerequisites
- Docker installed
- GitHub account
- Jenkins (optional)

### Local Testing
\`\`\`bash
docker-compose up --build
\`\`\`

### Jenkins Setup
See [SETUP-GUIDE.md](docs/SETUP-GUIDE.md)

## Features
- ✅ Multi-browser parallel testing
- ✅ Docker containerization
- ✅ GitHub Actions workflows
- ✅ Jenkins pipelines
- ✅ Automated reporting
- ✅ Artifact management
- ✅ Slack notifications
- ✅ Email alerts

## Project Structure
- `Jenkinsfile` - Jenkins pipeline
- `.github/workflows/` - GitHub Actions
- `docker/` - Docker configuration
- `jenkins/scripts/` - Helper scripts
- `tests/` - Test suites
- `docs/` - Documentation

## Running Tests
\`\`\`bash
# Local with Docker Compose
docker-compose up

# Jenkins
Jenkins UI → New Build

# GitHub Actions
git push → Actions tab
\`\`\`

```

---

## GitHub Commit Strategy

```bash
git add .
git commit -m "Project 3: Add Jenkinsfile with declarative pipeline"
git commit -m "Project 3: Create GitHub Actions workflows"
git commit -m "Project 3: Add Docker and Docker Compose setup"
git commit -m "Project 3: Implement helper scripts for CI/CD"
git commit -m "Project 3: Add comprehensive documentation"
git push origin main
```

---

## Career Value & Interview Points

### What This Project Demonstrates

1. **DevOps Skills**
   - "I designed production-grade CI/CD pipelines using Jenkins and GitHub Actions."

2. **Infrastructure Knowledge**
   - "I implemented Docker containerization and orchestration with Docker Compose."

3. **Automation Expertise**
   - "I created end-to-end test automation with parallel execution and reporting."

4. **Problem Solving**
   - "I solved scalability challenges through Docker containerization and pipeline optimization."

5. **Best Practices**
   - "I implemented security best practices, artifact management, and failure notifications."

### Interview Questions

1. **"Design a CI/CD pipeline for large test suite."**
   - Discuss parallelization, containerization, and reporting

2. **"How would you handle pipeline failures?"**
   - Explain notifications, retry logic, and rollback strategies

3. **"What's your approach to test environment setup?"**
   - Discuss Docker, Docker Compose, and infrastructure automation

---

## Additional Resources

- [Jenkins Documentation](https://www.jenkins.io/doc/)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Docker Documentation](https://docs.docker.com/)
- [Playwright CI/CD](https://playwright.dev/docs/ci)

---

**Project Status:** Ready to Build
**Last Updated:** December 2025
**Difficulty Level:** Advanced
**Time Required:** 50-60 hours
**GitHub Visibility:** Public Portfolio Project

