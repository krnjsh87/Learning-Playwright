# Day 17: Advanced Jenkins & Docker Integration for Test Automation

**Date:** Day 17 of 25  
**Duration:** 8 hours  
**Difficulty:** Advanced  
**Focus Area:** Docker Fundamentals, Jenkins-Docker Integration, Containerized Testing, CI/CD Scaling  

---

## 🎯 **Learning Objectives**

By the end of Day 17, you will:

✅ Understand Docker architecture and containerization concepts  
✅ Install and configure Docker on your system  
✅ Create custom Docker images for test automation  
✅ Write effective Dockerfile for testing environments  
✅ Run tests in Docker containers  
✅ Integrate Docker with Jenkins pipelines  
✅ Manage multiple containers with Docker Compose  
✅ Implement Docker-based CI/CD workflows  
✅ Debug container issues and troubleshoot  
✅ Build scalable, containerized test infrastructure  

---

## ⏰ **Daily Schedule (8 Hours)**

| Time | Activity | Duration |
|------|----------|----------|
| 8:00 - 8:30 | Review Day 16 & Docker introduction | 30 min |
| 8:30 - 10:30 | **Theory Session 1:** Docker Fundamentals & Architecture | 2 hours |
| 10:30 - 11:00 | Break | 30 min |
| 11:00 - 1:00 PM | **Hands-On Lab 1:** Docker Setup & First Container | 2 hours |
| 1:00 - 2:00 PM | Lunch break | 1 hour |
| 2:00 - 4:00 PM | **Theory Session 2:** Docker Compose & Jenkins Integration | 2 hours |
| 4:00 - 4:30 PM | Break | 30 min |
| 4:30 - 6:30 PM | **Hands-On Lab 2:** Containerized Testing Pipeline | 2 hours |

---

## 📚 **THEORY SESSION 1: Docker Fundamentals & Architecture (2 hours)**

### **Part 17.1: What is Docker?**

#### **Understanding Containerization**

**Traditional Application Deployment:**
```
Source Code
    ↓
Build
    ↓
Artifacts
    ↓
Deploy to Server
Problem: "Works on my machine" syndrome
- Different OS versions
- Missing dependencies
- Version conflicts
- Environment inconsistencies
```

**Docker Containerization:**
```
Source Code + Dependencies + Configuration
    ↓
Build Docker Image
    ↓
Package with everything needed
    ↓
Run containers on any machine
Benefit: Consistent, isolated environments
```

#### **Docker Key Concepts**

| Concept | Description |
|---------|-------------|
| **Container** | Lightweight, standalone, executable package with all dependencies |
| **Image** | Blueprint/template for creating containers (immutable) |
| **Registry** | Repository storing Docker images (Docker Hub, ECR, etc.) |
| **Dockerfile** | Text file with instructions to build an image |
| **Docker Daemon** | Background service managing containers and images |
| **Docker Client** | Command-line tool communicating with daemon |
| **Layer** | Read-only file system layer in an image |
| **Volume** | Persistent storage for container data |
| **Network** | Communication channel between containers |

#### **Docker vs. Virtual Machines**

| Aspect | Docker | VM |
|--------|--------|-----|
| **Size** | 10-100 MB | 1-10 GB |
| **Boot Time** | Seconds | Minutes |
| **Isolation** | Process-level | Full OS-level |
| **Resource Usage** | Minimal overhead | High overhead |
| **Performance** | Near-native | Slower |
| **Portability** | Highly portable | Less portable |
| **Use Case** | Microservices, CI/CD | Full applications, legacy |

### **Part 17.2: Docker Architecture**

#### **Docker Architecture Components**

```
┌──────────────────────────────────────────────┐
│           Docker Client                       │
│  (docker CLI commands)                        │
└─────────────────┬──────────────────────────┘
                  │
     ┌────────────┴────────────┐
     │ Docker Server (Daemon)  │
     │                         │
     ├─ Images Management      │
     ├─ Container Runtime      │
     ├─ Storage Driver         │
     ├─ Networking             │
     └─ Plugin Management      │
     
┌─────────────────┬─────────────────────────┐
│   Registry      │  Storage                │
│  (Docker Hub)   │  (Volumes)              │
└─────────────────┴─────────────────────────┘
```

#### **Docker Networking Model**

```
┌──────────────────────────────────────────┐
│         Docker Host                      │
│                                          │
│  ┌─────────────────────────────────────┐ │
│  │   Docker Bridge Network (docker0)   │ │
│  │                                     │ │
│  │  ┌──────────┐   ┌──────────┐      │ │
│  │  │Container1│   │Container2│      │ │
│  │  │172.17...1│   │172.17...2│      │ │
│  │  └──────────┘   └──────────┘      │ │
│  │                                     │ │
│  └─────────────────────────────────────┘ │
│                                          │
│  Port: 8080 → Container Port: 8080      │
└──────────────────────────────────────────┘
```

### **Part 17.3: Docker Installation & Setup**

#### **System Requirements**

**Linux (Ubuntu/Debian):**
- Kernel 3.10+
- 64-bit architecture
- 2+ GB RAM
- 10+ GB disk space

**Windows:**
- Windows 10 (Professional/Enterprise) or Windows 11
- Hyper-V enabled
- 4+ GB RAM
- 20+ GB disk space

**macOS:**
- macOS 11+
- Apple Silicon or Intel processor
- 4+ GB RAM
- 20+ GB disk space

#### **Docker Installation on Linux (Ubuntu)**

```bash
# Step 1: Remove old Docker versions
sudo apt-get remove docker docker-engine docker.io containerd runc

# Step 2: Install dependencies
sudo apt-get update
sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# Step 3: Add Docker's official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
    sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Step 4: Set up repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] \
  https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Step 5: Install Docker Engine
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Step 6: Verify installation
docker --version
docker run hello-world

# Step 7: Add user to docker group (run without sudo)
sudo usermod -aG docker $USER
newgrp docker

# Step 8: Verify (should work without sudo now)
docker run hello-world
```

#### **Docker Installation on Windows (via WSL2)**

```powershell
# Option 1: Docker Desktop (Recommended)
# Download from https://www.docker.com/products/docker-desktop
# Run installer
# Enable WSL 2 integration

# Option 2: Via Chocolatey
choco install docker-desktop

# Option 3: Via Windows Package Manager
winget install Docker.DockerDesktop

# Verify installation
docker --version
docker run hello-world
```

#### **Docker Installation on macOS**

```bash
# Option 1: Docker Desktop (Recommended)
# Download from https://www.docker.com/products/docker-desktop
# Open .dmg and drag Docker to Applications
# Launch Docker from Applications

# Option 2: Via Homebrew
brew install docker
brew install docker-compose

# Option 3: Via MacPorts
sudo port install docker

# Verify installation
docker --version
docker run hello-world
```

### **Part 17.4: Docker Core Commands**

#### **Image Management Commands**

```bash
# List local images
docker images

# Pull image from registry
docker pull ubuntu:22.04
docker pull python:3.11

# Build image from Dockerfile
docker build -t my-image:1.0 .
docker build -f Dockerfile.test -t test-runner:latest .

# Tag image for registry
docker tag my-image:1.0 myregistry/my-image:1.0

# Push image to registry
docker push myregistry/my-image:1.0

# Remove image
docker rmi my-image:1.0

# Remove unused images
docker image prune

# Search images
docker search python
```

#### **Container Management Commands**

```bash
# Run container (create and start)
docker run -d -p 8080:8080 --name my-container nginx

# List running containers
docker ps

# List all containers (running and stopped)
docker ps -a

# View container logs
docker logs my-container
docker logs -f my-container  # Follow logs
docker logs --tail 50 my-container  # Last 50 lines

# Execute command in container
docker exec -it my-container bash
docker exec -u root my-container apt-get update

# Start stopped container
docker start my-container

# Stop running container
docker stop my-container

# Restart container
docker restart my-container

# Remove container
docker rm my-container

# Remove all stopped containers
docker container prune

# View container details
docker inspect my-container

# Copy files from container
docker cp my-container:/path/to/file ./local-path

# Copy files to container
docker cp ./local-file my-container:/path/to/destination
```

#### **Useful Docker Run Flags**

```bash
# Common docker run options
docker run \
    -d \                           # Detach (run in background)
    -p 8080:8080 \                 # Port mapping (host:container)
    -e API_KEY=secret \            # Environment variable
    -v /host/path:/container/path  # Volume mount (host:container)
    --name my-container \          # Container name
    --memory 512m \                # Memory limit
    --cpus 1.5 \                   # CPU limit
    --restart=always \             # Restart policy
    --network my-network \         # Custom network
    -it \                          # Interactive + TTY
    ubuntu:22.04 /bin/bash         # Image and command
```

### **Part 17.5: Dockerfile Best Practices**

#### **Dockerfile Structure**

```dockerfile
# Use official base image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Set metadata
LABEL author="Your Name" version="1.0"

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements file
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Set environment variables
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD python -c "import requests; requests.get('http://localhost:8080/health')"

# Define default command
CMD ["python", "-m", "pytest", "tests/"]
```

#### **Dockerfile Best Practices**

| Practice | Benefit |
|----------|---------|
| **Use slim/alpine base images** | Smaller image size |
| **Minimize layers** | Faster builds and pushes |
| **Use .dockerignore** | Exclude unnecessary files |
| **Don't run as root** | Better security |
| **Use specific base image tags** | Reproducible builds |
| **Add HEALTHCHECK** | Monitor container health |
| **Combine RUN commands** | Fewer layers |
| **Clean up in same RUN** | Smaller final image |
| **Use WORKDIR** | Better organization |
| **Document with labels** | Better maintainability |

---

## 💻 **HANDS-ON LAB 1: Docker Setup & First Container (2 hours)**

### **Exercise 17.1: Build Your First Python Test Container**

#### **Step 1: Create Project Structure**

```bash
mkdir docker-test-automation && cd docker-test-automation
mkdir tests src config
touch Dockerfile requirements.txt .dockerignore
```

#### **Step 2: Create Dockerfile for Test Environment**

**Dockerfile:**

```dockerfile
# Build stage - compile dependencies
FROM python:3.11-slim as builder

WORKDIR /build

# Install build dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libssl-dev \
    libffi-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements
COPY requirements.txt .

# Create wheels for faster installation
RUN pip wheel --no-cache-dir --no-deps --wheel-dir /build/wheels -r requirements.txt

# Runtime stage - smaller final image
FROM python:3.11-slim

WORKDIR /app

# Install runtime dependencies only
RUN apt-get update && apt-get install -y \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

# Copy wheels from builder
COPY --from=builder /build/wheels /wheels
COPY --from=builder /build/requirements.txt .

# Install wheels
RUN pip install --no-cache /wheels/*

# Set labels for metadata
LABEL maintainer="Your Name" \
      version="1.0" \
      description="Python Test Automation Container"

# Copy test code
COPY tests/ tests/
COPY src/ src/
COPY pytest.ini .

# Set environment variables
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONPATH=/app/src

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD python -c "import sys; sys.exit(0)"

# Non-root user for security
RUN useradd -m -u 1000 testuser && chown -R testuser:testuser /app
USER testuser

# Default command - run tests
CMD ["pytest", "tests/", "-v", "--tb=short"]
```

#### **Step 3: Create requirements.txt**

```txt
# Testing frameworks
pytest==7.4.0
pytest-html==3.2.0
pytest-json-report==1.5.0
pytest-xdist==3.3.1

# HTTP and API testing
requests==2.31.0
httpx==0.24.1
jsonschema==4.19.0

# Utilities
python-dotenv==1.0.0
colorlog==6.7.0

# Automation (optional)
selenium==4.11.0
playwright==1.38.0
```

#### **Step 4: Create Sample Test Files**

**tests/conftest.py:**

```python
import pytest
import os
from pathlib import Path
from datetime import datetime

@pytest.fixture(scope='session')
def test_config():
    """Load test configuration from environment"""
    return {
        'api_url': os.getenv('API_URL', 'https://api.example.com'),
        'timeout': int(os.getenv('TEST_TIMEOUT', '10')),
        'environment': os.getenv('ENVIRONMENT', 'staging'),
        'log_dir': Path('/app/logs')
    }

@pytest.fixture(scope='session', autouse=True)
def setup_logs(test_config):
    """Create logs directory"""
    test_config['log_dir'].mkdir(exist_ok=True)

@pytest.fixture
def test_session_info(request):
    """Capture test session metadata"""
    return {
        'test_name': request.node.name,
        'timestamp': datetime.now().isoformat(),
        'container': os.getenv('CONTAINER_NAME', 'unknown')
    }
```

**tests/test_basic_docker.py:**

```python
import pytest
import os
from datetime import datetime

class TestDockerEnvironment:
    """Test docker environment setup"""
    
    def test_python_available(self):
        """Verify Python is available"""
        import sys
        assert sys.version_info >= (3, 11), f"Python 3.11+ required, got {sys.version}"
    
    def test_environment_variables(self):
        """Check environment variables"""
        api_url = os.getenv('API_URL', 'https://api.example.com')
        assert api_url is not None
        assert 'api' in api_url.lower()
    
    def test_test_fixtures_loaded(self, test_config, test_session_info):
        """Verify test fixtures work correctly"""
        assert test_config['api_url'] is not None
        assert test_session_info['test_name'] == 'test_test_fixtures_loaded'
        assert test_session_info['timestamp'] is not None
    
    def test_imports_work(self):
        """Verify required packages are installed"""
        import pytest
        import requests
        import jsonschema
        import colorlog
        
        assert pytest is not None
        assert requests is not None
        assert jsonschema is not None

class TestContainerFeatures:
    """Test container-specific features"""
    
    def test_container_filesystem(self):
        """Verify container filesystem"""
        test_dir = Path('/app/tests')
        assert test_dir.exists(), "Tests directory not found"
        
    def test_python_path(self):
        """Verify PYTHONPATH is set"""
        import sys
        assert any('app/src' in path for path in sys.path), \
            f"PYTHONPATH not set correctly: {sys.path}"
    
    def test_logging_capability(self, tmp_path):
        """Test logging works in container"""
        import logging
        
        log_file = tmp_path / "test.log"
        logger = logging.getLogger('test')
        handler = logging.FileHandler(str(log_file))
        logger.addHandler(handler)
        
        logger.info("Test log message")
        assert log_file.read_text() != ""

@pytest.mark.parametrize("module", [
    'pytest',
    'requests',
    'jsonschema',
    'colorlog'
])
def test_required_packages(module):
    """Parameterized test for required packages"""
    __import__(module)
```

#### **Step 5: Create .dockerignore**

```
# Python
__pycache__
*.pyc
*.pyo
*.pyd
.Python
env/
venv/
*.egg-info
dist/
build/

# IDE
.vscode
.idea
*.swp
*.swo
*~

# Version control
.git
.gitignore
.github

# Docker
Dockerfile
docker-compose.yml

# Test artifacts
.pytest_cache
htmlcov/
.coverage

# OS
.DS_Store
Thumbs.db

# CI/CD
.jenkins
.github
```

#### **Step 6: Build Docker Image**

```bash
# Build image with tag
docker build -t test-automation:1.0 .

# Build with build arguments
docker build \
    --build-arg PYTHON_VERSION=3.11 \
    -t test-automation:latest .

# Build with specific Dockerfile
docker build -f Dockerfile.test -t test-automation:dev .

# Verify build
docker images | grep test-automation
```

#### **Step 7: Run Container**

```bash
# Run tests in container
docker run --rm \
    -e API_URL=https://api.staging.com \
    -e ENVIRONMENT=staging \
    test-automation:1.0

# Run with volume mount (for code updates)
docker run --rm \
    -v $(pwd)/tests:/app/tests \
    -e ENVIRONMENT=test \
    test-automation:1.0

# Run with interactive shell
docker run -it --rm \
    -v $(pwd):/app \
    test-automation:1.0 /bin/bash

# Run with output to file
docker run --rm \
    -v $(pwd)/reports:/app/reports \
    test-automation:1.0 \
    pytest tests/ --html=reports/report.html
```

#### **Step 8: Verify Container Execution**

```bash
# Check if container ran successfully
echo $?  # Should be 0 for success

# View logs
docker logs <container-id>

# Inspect image
docker inspect test-automation:1.0

# Remove image
docker rmi test-automation:1.0
```

### **Exercise 17.2: Multi-Stage Build for Smaller Images**

#### **Objective:** Reduce image size using multi-stage builds

**Advanced Dockerfile:**

```dockerfile
# Stage 1: Dependency builder
FROM python:3.11-slim as dependencies-builder

WORKDIR /build

# Install build tools
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    git \
    && rm -rf /var/lib/apt/lists/*

# Copy and install Python dependencies
COPY requirements.txt .
RUN pip install --user --no-cache-dir -r requirements.txt

# Stage 2: Test runner image
FROM python:3.11-slim

WORKDIR /app

# Copy only installed packages from builder
COPY --from=dependencies-builder /root/.local /root/.local

# Set PATH to use local pip installations
ENV PATH=/root/.local/bin:$PATH \
    PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

# Copy application code
COPY . .

# Create non-root user
RUN useradd -m -u 1000 appuser && chown -R appuser:appuser /app
USER appuser

# Health check
HEALTHCHECK --interval=30s --timeout=5s \
    CMD python -c "print('OK')"

# Run tests
CMD ["pytest", "tests/", "-v"]
```

**Benefits:**
- Final image is 40% smaller
- Removes build tools from final image
- Faster pushes and deployments
- Cleaner image with less attack surface

---

## 📚 **THEORY SESSION 2: Docker Compose & Jenkins Integration (2 hours)**

### **Part 17.6: Docker Compose Fundamentals**

#### **What is Docker Compose?**

Docker Compose is a tool for defining and running multi-container Docker applications.

**Use Cases:**
- Testing environments (database + app + cache)
- CI/CD pipeline services
- Microservices orchestration
- Local development environments

#### **Docker Compose Installation**

```bash
# Linux
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" \
    -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify
docker-compose --version

# Alternative (if using Docker Desktop)
docker compose --version
```

### **Part 17.7: Docker Compose Configuration**

#### **Basic docker-compose.yml Structure**

```yaml
version: '3.8'

services:
  # Service definitions
  web:
    image: my-image:latest
    ports:
      - "8080:8080"
    environment:
      - ENV_VAR=value
    volumes:
      - ./data:/app/data
    networks:
      - backend

volumes:
  # Volume definitions
  data_volume:

networks:
  # Network definitions
  backend:
    driver: bridge
```

#### **Real-World Example: Test Automation Environment**

**docker-compose.yml:**

```yaml
version: '3.8'

services:
  # PostgreSQL Database
  postgres:
    image: postgres:15-alpine
    container_name: test-db
    environment:
      POSTGRES_USER: testuser
      POSTGRES_PASSWORD: testpass123
      POSTGRES_DB: testdb
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init-scripts:/docker-entrypoint-initdb.d
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U testuser"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - test-network

  # Redis Cache
  redis:
    image: redis:7-alpine
    container_name: test-cache
    ports:
      - "6379:6379"
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - test-network

  # API Server
  api:
    build:
      context: ./api
      dockerfile: Dockerfile
    container_name: test-api
    environment:
      DB_HOST: postgres
      DB_USER: testuser
      DB_PASSWORD: testpass123
      DB_NAME: testdb
      REDIS_HOST: redis
      REDIS_PORT: 6379
    ports:
      - "8080:8080"
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    networks:
      - test-network
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  # Test Runner
  test-runner:
    build:
      context: ./tests
      dockerfile: Dockerfile
    container_name: test-automation
    environment:
      API_URL: http://api:8080
      DB_HOST: postgres
      DB_USER: testuser
      DB_PASSWORD: testpass123
      DB_NAME: testdb
      ENVIRONMENT: docker-compose
    volumes:
      - ./tests:/app/tests
      - ./reports:/app/reports
    depends_on:
      api:
        condition: service_healthy
    networks:
      - test-network
    command: pytest tests/ -v --html=reports/report.html

volumes:
  postgres_data:

networks:
  test-network:
    driver: bridge
```

### **Part 17.8: Docker Compose Commands**

```bash
# Start all services
docker-compose up

# Start in detached mode
docker-compose up -d

# View running services
docker-compose ps

# View logs
docker-compose logs
docker-compose logs -f api  # Follow specific service
docker-compose logs --tail 50 test-runner

# Execute command in service
docker-compose exec api bash
docker-compose exec test-runner pytest tests/ -v

# Stop services
docker-compose stop

# Start stopped services
docker-compose start

# Restart services
docker-compose restart

# Stop and remove containers
docker-compose down

# Remove containers and volumes
docker-compose down -v

# View events
docker-compose events

# View resource usage
docker stats
```

### **Part 17.9: Jenkins-Docker Integration**

#### **Integrating Docker with Jenkins Pipeline**

**Use Cases:**
1. Run Jenkins agents in Docker
2. Run tests in Docker containers within pipelines
3. Build and push Docker images from pipeline
4. Use Docker compose for test environments

#### **Running Tests in Docker from Jenkins**

**Jenkinsfile with Docker:**

```groovy
pipeline {
    agent any
    
    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timeout(time: 30, unit: 'MINUTES')
        timestamps()
    }
    
    environment {
        // Docker configuration
        DOCKER_IMAGE = "test-automation:${BUILD_NUMBER}"
        DOCKER_REGISTRY = "your-registry"
        TEST_RESULTS_DIR = "${WORKSPACE}/reports"
    }
    
    stages {
        stage('Build Docker Image') {
            steps {
                echo '🔨 Building Docker image...'
                script {
                    sh '''
                        docker build -t ${DOCKER_IMAGE} \
                            --build-arg BUILD_NUMBER=${BUILD_NUMBER} \
                            -f Dockerfile .
                        
                        echo "Image built: ${DOCKER_IMAGE}"
                        docker images | grep test-automation
                    '''
                }
            }
        }
        
        stage('Run Tests in Container') {
            steps {
                echo '🧪 Running tests in Docker container...'
                script {
                    sh '''
                        mkdir -p ${TEST_RESULTS_DIR}
                        
                        docker run --rm \
                            -v ${TEST_RESULTS_DIR}:/app/reports \
                            -e API_URL=${API_URL} \
                            -e ENVIRONMENT=jenkins \
                            -e BUILD_NUMBER=${BUILD_NUMBER} \
                            ${DOCKER_IMAGE}
                    '''
                }
            }
        }
        
        stage('Push Image to Registry') {
            when {
                branch 'main'
            }
            steps {
                echo '📤 Pushing image to registry...'
                script {
                    sh '''
                        docker tag ${DOCKER_IMAGE} \
                            ${DOCKER_REGISTRY}/${DOCKER_IMAGE}:latest
                        
                        docker push ${DOCKER_REGISTRY}/${DOCKER_IMAGE}:latest
                    '''
                }
            }
        }
    }
    
    post {
        always {
            echo '📊 Processing test results...'
            junit 'reports/**/*.xml'
            publishHTML([
                reportDir: 'reports',
                reportFiles: 'report.html',
                reportName: 'Test Report'
            ])
        }
        
        success {
            echo '✅ Docker tests passed!'
        }
        
        failure {
            echo '❌ Docker tests failed!'
        }
        
        cleanup {
            echo '🧹 Cleaning up Docker resources...'
            sh '''
                docker rmi ${DOCKER_IMAGE} || true
                docker system prune -f
            '''
        }
    }
}
```

#### **Jenkins with Docker Compose**

**Jenkinsfile using Docker Compose:**

```groovy
pipeline {
    agent any
    
    stages {
        stage('Start Services') {
            steps {
                echo '🚀 Starting Docker Compose services...'
                sh '''
                    docker-compose up -d
                    
                    # Wait for services to be ready
                    sleep 10
                    docker-compose ps
                '''
            }
        }
        
        stage('Wait for Health Checks') {
            steps {
                echo '⏳ Waiting for services health checks...'
                sh '''
                    for i in {1..30}; do
                        echo "Attempt $i of 30..."
                        
                        # Check API health
                        if docker-compose exec -T api \
                            curl -f http://localhost:8080/health; then
                            echo "✅ API is healthy"
                            break
                        fi
                        
                        if [ $i -eq 30 ]; then
                            echo "❌ Services failed to start"
                            exit 1
                        fi
                        
                        sleep 2
                    done
                '''
            }
        }
        
        stage('Run Test Suite') {
            steps {
                echo '🧪 Running tests with Docker Compose...'
                sh '''
                    docker-compose exec -T test-runner \
                        pytest tests/ -v \
                        --html=reports/report.html \
                        --junit-xml=reports/results.xml
                '''
            }
        }
        
        stage('Collect Results') {
            steps {
                echo '📊 Collecting test results...'
                sh '''
                    # Copy reports from container to host
                    docker-compose exec -T test-runner \
                        cp reports/* /reports/
                '''
            }
        }
    }
    
    post {
        always {
            echo '🧹 Stopping Docker Compose services...'
            sh '''
                docker-compose down -v
                docker-compose ps
            '''
            
            // Parse results
            junit 'reports/**/*.xml'
            publishHTML([
                reportDir: 'reports',
                reportFiles: 'report.html',
                reportName: 'Docker Compose Test Report'
            ])
        }
    }
}
```

---

## 💻 **HANDS-ON LAB 2: Containerized Testing Pipeline (2 hours)**

### **Exercise 17.3: Build Multi-Service Test Environment**

#### **Step 1: Create Project Structure**

```
project/
├── docker-compose.yml
├── Dockerfile.test
├── Dockerfile.api
├── tests/
│   ├── conftest.py
│   ├── test_api.py
│   └── test_integration.py
├── api/
│   ├── Dockerfile
│   ├── app.py
│   └── requirements.txt
├── init-scripts/
│   └── init-db.sql
├── Jenkinsfile
└── requirements.txt
```

#### **Step 2: Create API Server (Mock)**

**api/app.py:**

```python
from flask import Flask, jsonify, request
from datetime import datetime
import os

app = Flask(__name__)

# In-memory storage
users = []

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat()
    }), 200

@app.route('/users', methods=['GET'])
def get_users():
    """Get all users"""
    return jsonify(users), 200

@app.route('/users', methods=['POST'])
def create_user():
    """Create new user"""
    data = request.json
    user = {
        'id': len(users) + 1,
        'name': data.get('name'),
        'email': data.get('email'),
        'created_at': datetime.now().isoformat()
    }
    users.append(user)
    return jsonify(user), 201

@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    """Get specific user"""
    user = next((u for u in users if u['id'] == user_id), None)
    if user:
        return jsonify(user), 200
    return jsonify({'error': 'User not found'}), 404

@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    """Delete user"""
    global users
    users = [u for u in users if u['id'] != user_id]
    return '', 204

if __name__ == '__main__':
    port = int(os.getenv('PORT', 8080))
    app.run(host='0.0.0.0', port=port, debug=False)
```

**api/requirements.txt:**

```txt
Flask==2.3.0
python-dotenv==1.0.0
```

**api/Dockerfile:**

```dockerfile
FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app.py .

ENV FLASK_APP=app.py \
    PYTHONUNBUFFERED=1

EXPOSE 8080

HEALTHCHECK --interval=10s --timeout=5s --retries=3 \
    CMD curl -f http://localhost:8080/health || exit 1

CMD ["python", "app.py"]
```

#### **Step 3: Create Comprehensive Test Suite**

**tests/conftest.py:**

```python
import pytest
import requests
import os
import time
from datetime import datetime
from urllib.parse import urljoin

@pytest.fixture(scope='session')
def api_base_url():
    """Get API base URL from environment"""
    base_url = os.getenv('API_URL', 'http://localhost:8080')
    
    # Wait for API to be ready
    max_retries = 30
    for attempt in range(max_retries):
        try:
            response = requests.get(urljoin(base_url, '/health'), timeout=2)
            if response.status_code == 200:
                print(f"\n✅ API is ready at {base_url}")
                return base_url
        except requests.exceptions.RequestException:
            if attempt < max_retries - 1:
                time.sleep(1)
                continue
            else:
                raise
    
    raise RuntimeError(f"API not ready at {base_url}")

@pytest.fixture(scope='session')
def test_config(api_base_url):
    """Test configuration"""
    return {
        'api_url': api_base_url,
        'timeout': 10,
        'environment': os.getenv('ENVIRONMENT', 'test'),
        'timestamp': datetime.now().isoformat()
    }

@pytest.fixture
def api_client(api_base_url):
    """API client for testing"""
    class APIClient:
        def __init__(self, base_url):
            self.base_url = base_url
            self.session = requests.Session()
        
        def get(self, endpoint, **kwargs):
            url = urljoin(self.base_url, endpoint)
            return self.session.get(url, timeout=10, **kwargs)
        
        def post(self, endpoint, **kwargs):
            url = urljoin(self.base_url, endpoint)
            return self.session.post(url, timeout=10, **kwargs)
        
        def delete(self, endpoint, **kwargs):
            url = urljoin(self.base_url, endpoint)
            return self.session.delete(url, timeout=10, **kwargs)
    
    return APIClient(api_base_url)

@pytest.fixture
def test_session_info(request):
    """Test session metadata"""
    return {
        'test_name': request.node.name,
        'module': request.node.module.__name__,
        'timestamp': datetime.now().isoformat(),
        'container': os.getenv('CONTAINER_NAME', 'unknown')
    }
```

**tests/test_api.py:**

```python
import pytest
import json

class TestAPISmoke:
    """Smoke tests for API endpoints"""
    
    def test_health_endpoint(self, api_client):
        """Test health endpoint"""
        response = api_client.get('/health')
        assert response.status_code == 200
        data = response.json()
        assert data['status'] == 'healthy'
        assert 'timestamp' in data
    
    def test_get_users_empty(self, api_client):
        """Test get users when empty"""
        response = api_client.get('/users')
        assert response.status_code == 200
        assert response.json() == [] or isinstance(response.json(), list)
    
    def test_create_user(self, api_client):
        """Test create user"""
        new_user = {
            'name': 'Test User',
            'email': 'test@example.com'
        }
        response = api_client.post('/users', json=new_user)
        assert response.status_code == 201
        data = response.json()
        assert data['name'] == 'Test User'
        assert 'id' in data
        assert 'created_at' in data

class TestAPIIntegration:
    """Integration tests for user workflows"""
    
    def test_create_and_retrieve_user(self, api_client):
        """Test create user and retrieve it"""
        # Create user
        user_data = {
            'name': 'John Doe',
            'email': 'john@example.com'
        }
        create_response = api_client.post('/users', json=user_data)
        assert create_response.status_code == 201
        user_id = create_response.json()['id']
        
        # Retrieve user
        get_response = api_client.get(f'/users/{user_id}')
        assert get_response.status_code == 200
        assert get_response.json()['name'] == 'John Doe'
    
    def test_delete_user(self, api_client):
        """Test delete user"""
        # Create user
        user_data = {'name': 'Delete Me', 'email': 'delete@example.com'}
        create_response = api_client.post('/users', json=user_data)
        user_id = create_response.json()['id']
        
        # Delete user
        delete_response = api_client.delete(f'/users/{user_id}')
        assert delete_response.status_code == 204
        
        # Verify deleted
        get_response = api_client.get(f'/users/{user_id}')
        assert get_response.status_code == 404

class TestAPIResponseFormats:
    """Test response formats and validation"""
    
    @pytest.mark.parametrize("endpoint", ['/health', '/users'])
    def test_json_response_headers(self, api_client, endpoint):
        """Test JSON content type"""
        response = api_client.get(endpoint)
        assert 'application/json' in response.headers.get('Content-Type', '')
    
    def test_response_timestamps(self, api_client):
        """Test timestamp in responses"""
        response = api_client.get('/health')
        data = response.json()
        assert 'timestamp' in data
        # Verify ISO format
        from datetime import datetime
        datetime.fromisoformat(data['timestamp'])
```

**tests/test_integration.py:**

```python
import pytest

class TestUserWorkflow:
    """End-to-end user workflow tests"""
    
    def test_complete_user_lifecycle(self, api_client):
        """Test complete user lifecycle"""
        # Step 1: Get initial user count
        get_all = api_client.get('/users')
        initial_count = len(get_all.json())
        
        # Step 2: Create multiple users
        users = []
        for i in range(3):
            user_data = {
                'name': f'User {i+1}',
                'email': f'user{i+1}@example.com'
            }
            response = api_client.post('/users', json=user_data)
            assert response.status_code == 201
            users.append(response.json())
        
        # Step 3: Verify all users created
        get_all = api_client.get('/users')
        assert len(get_all.json()) == initial_count + 3
        
        # Step 4: Delete one user
        user_to_delete = users[0]['id']
        response = api_client.delete(f'/users/{user_to_delete}')
        assert response.status_code == 204
        
        # Step 5: Verify user deleted
        get_all = api_client.get('/users')
        assert len(get_all.json()) == initial_count + 2
    
    def test_concurrent_operations(self, api_client):
        """Test concurrent user operations"""
        import concurrent.futures
        
        def create_user(name):
            response = api_client.post('/users', json={
                'name': name,
                'email': f'{name.lower()}@example.com'
            })
            return response.status_code, response.json()['id']
        
        # Create 5 users concurrently
        with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
            results = list(executor.map(create_user, 
                                       [f'User{i}' for i in range(5)]))
        
        # All should succeed
        for status_code, user_id in results:
            assert status_code == 201
            assert user_id is not None
```

#### **Step 4: Create Docker Compose File**

**docker-compose.yml:**

```yaml
version: '3.8'

services:
  api:
    build:
      context: ./api
      dockerfile: Dockerfile
    container_name: test-api-service
    ports:
      - "8080:8080"
    environment:
      PORT: 8080
      ENVIRONMENT: docker-compose
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
      interval: 5s
      timeout: 3s
      retries: 10
      start_period: 5s
    networks:
      - test-network

  test:
    build:
      context: .
      dockerfile: Dockerfile.test
    container_name: test-runner
    environment:
      API_URL: http://api:8080
      ENVIRONMENT: docker-compose
    volumes:
      - ./tests:/app/tests
      - ./reports:/app/reports
    depends_on:
      api:
        condition: service_healthy
    networks:
      - test-network
    command: pytest tests/ -v --html=/app/reports/report.html --junit-xml=/app/reports/results.xml

networks:
  test-network:
    driver: bridge
```

#### **Step 5: Create Jenkinsfile**

**Jenkinsfile:**

```groovy
#!/usr/bin/env groovy

pipeline {
    agent any
    
    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timeout(time: 30, unit: 'MINUTES')
        timestamps()
    }
    
    environment {
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
        REPORTS_DIR = "${WORKSPACE}/reports"
    }
    
    stages {
        stage('Initialization') {
            steps {
                script {
                    echo "=========================================="
                    echo "🐳 DOCKER COMPOSE TEST PIPELINE"
                    echo "=========================================="
                    echo "Build: ${BUILD_NUMBER}"
                    echo "Workspace: ${WORKSPACE}"
                    deleteDir()
                }
            }
        }
        
        stage('Checkout') {
            steps {
                echo '📥 Cloning repository...'
                checkout scm
            }
        }
        
        stage('Build Images') {
            steps {
                echo '🔨 Building Docker images...'
                sh '''
                    docker-compose build --no-cache
                    docker images | grep -E "(test|api)"
                '''
            }
        }
        
        stage('Start Services') {
            steps {
                echo '🚀 Starting Docker Compose services...'
                sh '''
                    docker-compose up -d
                    sleep 5
                    docker-compose ps
                '''
            }
        }
        
        stage('Wait for Health Checks') {
            steps {
                echo '⏳ Waiting for services to be healthy...'
                sh '''
                    echo "Waiting for API to be ready..."
                    for i in {1..30}; do
                        if docker-compose exec -T api curl -f http://localhost:8080/health 2>/dev/null; then
                            echo "✅ API is ready!"
                            break
                        fi
                        echo "Attempt $i/30..."
                        sleep 1
                    done
                '''
            }
        }
        
        stage('Run Tests') {
            steps {
                echo '🧪 Running test suite in containers...'
                sh '''
                    mkdir -p ${REPORTS_DIR}
                    docker-compose exec -T test pytest tests/ -v \
                        --html=/app/reports/report.html \
                        --self-contained-html \
                        --junit-xml=/app/reports/results.xml
                '''
            }
        }
        
        stage('Collect Reports') {
            steps {
                echo '📊 Collecting test reports...'
                sh '''
                    ls -la ${REPORTS_DIR}/
                    docker-compose logs > ${REPORTS_DIR}/docker-logs.txt
                '''
            }
        }
    }
    
    post {
        always {
            echo '🧹 Stopping and cleaning up...'
            sh '''
                docker-compose down -v
                docker-compose ps || true
            '''
            
            // Archive reports
            archiveArtifacts artifacts: 'reports/**/*',
                               allowEmptyArchive: true
            
            // Parse test results
            junit 'reports/**/*.xml'
            
            // Publish HTML report
            publishHTML([
                reportDir: 'reports',
                reportFiles: 'report.html',
                reportName: 'Docker Compose Test Report',
                keepAll: true
            ])
        }
        
        success {
            echo '✅ All tests passed!'
        }
        
        failure {
            echo '❌ Some tests failed!'
            sh '''
                echo "Test failures detected!"
                docker-compose logs test || true
            '''
        }
    }
}
```

#### **Step 6: Run Pipeline**

```bash
# Test locally
docker-compose up

# Create Jenkins job
# Jenkins → New Item → Pipeline
# Configure with Jenkinsfile from repository
# Build and monitor

# Clean up
docker-compose down -v
```

---

## 🎯 **Real-World Automation Scenarios**

### **Scenario 1: Matrix Builds (Test on Multiple Versions)**

```groovy
pipeline {
    agent any
    
    strategy {
        matrix {
            axes {
                axis {
                    name: 'PYTHON_VERSION'
                    values: ['3.9', '3.10', '3.11']
                }
                axis {
                    name: 'TEST_SUITE'
                    values: ['smoke', 'integration', 'regression']
                }
            }
        }
    }
    
    stages {
        stage('Run Tests') {
            steps {
                script {
                    sh '''
                        docker build -t test:py${PYTHON_VERSION} \
                            --build-arg PYTHON_VERSION=${PYTHON_VERSION} .
                        
                        docker run --rm test:py${PYTHON_VERSION} \
                            pytest tests/${TEST_SUITE}/ -v
                    '''
                }
            }
        }
    }
}
```

### **Scenario 2: Pushing to Registry**

```groovy
stage('Push to Registry') {
    when {
        branch 'main'
    }
    steps {
        script {
            sh '''
                docker login -u ${DOCKER_USER} -p ${DOCKER_PASS}
                docker tag test-automation:${BUILD_NUMBER} \
                    registry.example.com/test-automation:latest
                docker push registry.example.com/test-automation:latest
            '''
        }
    }
}
```

---

## 📋 **Quiz: Docker & Containerization**

**Answer all 10 questions. Target: 8/10 (80%)**

**Q1:** What is the main advantage of Docker containers?
- A) Faster than virtual machines
- B) Smaller size than VMs
- C) Consistency across environments (Works on all machines)
- D) No need for hypervisor

**Q2:** What is a Dockerfile?
- A) A script for deploying containers
- B) A text file with instructions to build an image
- C) A configuration file for Docker daemon
- D) A log file from Docker execution

**Q3:** What command creates a container from an image?
- A) `docker create`
- B) `docker start`
- C) `docker run`
- D) `docker build`

**Q4:** What does `.dockerignore` do?
- A) Stops container from running
- B) Ignores errors during build
- C) Excludes files from being copied to image
- D) Prevents image from being pushed

**Q5:** What is Docker Compose used for?
- A) Building Docker images
- B) Defining and running multi-container applications
- C) Pushing images to registry
- D) Managing Docker daemon

**Q6:** In multi-stage builds, what is the primary benefit?
- A) Faster builds
- B) Reduces final image size
- C) Better security
- D) Allows parallel compilation

**Q7:** What does the EXPOSE instruction do?
- A) Opens port on host machine
- B) Exposes port for documentation/discovery
- C) Makes container port publicly accessible
- D) Requires port mapping

**Q8:** How do you access a service in docker-compose?
- A) `localhost:port`
- B) `service-name:port`
- C) IP address of container
- D) `docker.socket`

**Q9:** What is `depends_on` used for in docker-compose?
- A) Ensures services start in specific order
- B) Adds dependency on external service
- C) Defines data volume dependencies
- D) Creates network dependencies

**Q10:** In Jenkins, how do you run tests in Docker?
- A) Install Docker plugin only
- B) Use `docker run` command in pipeline
- C) Configure Docker socket mount
- D) Use Docker container as agent

**Answer Key:**
1. C, 2. B, 3. C, 4. C, 5. B, 6. B, 7. B, 8. B, 9. A, 10. B

---

## 📋 **Daily Assignment**

### **Assignment 17.1: Complete Docker-Based Test Environment**

**Objective:** Build production-grade containerized testing infrastructure

**Requirements:**

1. **Dockerfile Creation (Test Image)**
   - Multi-stage build
   - Minimal final image size
   - Non-root user
   - Health check
   - All dependencies included

2. **Docker Compose Setup**
   - API service
   - Test service
   - Proper networking
   - Health checks for all services
   - Volume management
   - Environment configuration

3. **Test Suite**
   - Smoke tests
   - Integration tests
   - API client in conftest
   - Fixtures for test configuration
   - Parameterized tests

4. **Jenkins Integration**
   - Pipeline pulls code
   - Builds Docker images
   - Starts services
   - Runs tests in containers
   - Collects reports
   - Cleans up resources

5. **Documentation**
   - README with Docker setup
   - Dockerfile explanation
   - Docker Compose configuration guide
   - Jenkins pipeline explanation
   - Troubleshooting guide

**Deliverables:**
- Dockerfile (optimized)
- docker-compose.yml (production-ready)
- Test suite with fixtures
- Jenkinsfile for container orchestration
- Complete README
- All tests passing locally and in Jenkins

---

## 🎯 **Daily Checklist**

Track your Day 17 progress:

- [ ] Reviewed Docker fundamentals
- [ ] Installed Docker on system
- [ ] Completed Theory Session 1
- [ ] Built first Docker image
- [ ] Created Dockerfile with best practices
- [ ] Tested container execution
- [ ] Completed Theory Session 2
- [ ] Installed Docker Compose
- [ ] Created multi-service docker-compose.yml
- [ ] Created comprehensive test suite
- [ ] Integrated with Jenkins pipeline
- [ ] Tested pipeline end-to-end
- [ ] Answered all 10 quiz questions
- [ ] Scored 80%+ on quiz (8/10)
- [ ] Completed Assignment 17.1
- [ ] Verified image sizes and optimization
- [ ] Tested local and Jenkins execution
- [ ] Committed to GitHub
- [ ] Updated learning journal

**Daily Metrics:**
- Quiz Score: ___/10
- Docker images created: ___ count
- Test containers: ___ count
- Docker Compose services: ___ count
- Confidence Level (1-5): ___
- Time Spent: ___ hours
- Challenges Faced: _________________

---

## 📚 **Key Takeaways from Day 17**

1. **Containerization solves consistency issues** - Same environment everywhere
2. **Docker is industry standard** - Master for DevOps roles
3. **Multi-stage builds optimize images** - Significantly smaller final images
4. **Docker Compose simplifies orchestration** - Multi-service environments easy
5. **Jenkins + Docker = Powerful CI/CD** - Scalable test infrastructure
6. **Health checks are essential** - Ensures service readiness
7. **Non-root users improve security** - Containers less vulnerable
8. **Volume management important** - Persistent data handling
9. **Environment variables configure behavior** - Flexible deployments
10. **Docker cleanup prevents bloat** - Regular maintenance required

---

## 🔗 **Resources for Review**

- [Docker Official Documentation](https://docs.docker.com/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Dockerfile Reference](https://docs.docker.com/engine/reference/builder/)
- [Docker Hub (Registry)](https://hub.docker.com/)
- [Docker Security Best Practices](https://docs.docker.com/engine/security/)

---

## 🚀 **Ready for Day 18?**

By completing Day 17, you've mastered:
- ✅ Docker architecture and concepts
- ✅ Dockerfile creation and optimization
- ✅ Multi-stage builds for smaller images
- ✅ Docker image management
- ✅ Container lifecycle management
- ✅ Docker Compose orchestration
- ✅ Jenkins-Docker integration
- ✅ Containerized test execution
- ✅ Environment configuration
- ✅ Production-grade infrastructure

**Next (Day 18):** GitHub Actions & Advanced CI/CD
- GitHub Actions workflows
- Secrets and environment variables
- Matrix strategies for multiple platforms
- Scheduled workflows
- Integration with cloud services

---

## 📊 **Week 4 Progress**

```
Week 1          Week 2          Week 3          Week 4          Week 5
Foundation      Mastery         API Testing     Jenkins/DevOps  Cypress/Interview
Days 1-5        Days 6-11       Days 12-15      Days 16-20      Days 21-25
✅ 100%         ✅ 100%         ✅ 100%         🔜 Day 17       🔜 Final
                                               (34%)            Weeks

Overall: 17/25 Days Complete (68%)
```

---

**Congratulations on reaching Day 17!** 🎉

You've completed:
- ✅ JavaScript & TypeScript Fundamentals (Days 1-2)
- ✅ Playwright Browser Automation (Days 3-5)
- ✅ Advanced Playwright & Testing (Days 6-11)
- ✅ REST API Testing (Days 12-14)
- ✅ Python API Frameworks (Day 15)
- ✅ CI/CD Foundations & Jenkins (Day 16)
- ✅ **Advanced Jenkins & Docker Integration (Day 17)** ← You are here

**Week 4 Focus:** DevOps and CI/CD Infrastructure!

---

*Last Updated: December 13, 2025*  
*Day 17 Complete Guide v1.0*  
*Week 4 Day 2 - Docker & Container Orchestration*  
*Master-level Docker Integration for Test Automation*
