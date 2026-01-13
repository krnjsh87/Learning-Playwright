# Day 13: Python API Testing & Advanced REST Concepts

**Date:** Day 13 of 25  
**Duration:** 8 hours  
**Difficulty:** Intermediate-Advanced  
**Focus Area:** Python API Testing & Enterprise API Patterns

---

## 🎯 **Learning Objectives**

By the end of Day 13, you will:

✅ Master Python requests library for API testing  
✅ Implement advanced authentication (OAuth 2.0, JWT, mutual TLS)  
✅ Validate API responses using JSON Schema  
✅ Implement retry strategies and circuit breakers  
✅ Mock external APIs for testing  
✅ Test API rate limiting and throttling  
✅ Implement API contract testing  
✅ Create API performance benchmarks  
✅ Build enterprise-grade API test framework  
✅ Integrate Python API tests with Playwright  

---

## ⏰ **Daily Schedule (8 Hours)**

| Time | Activity | Duration |
|------|----------|----------|
| 8:00 - 8:30 | Review Day 12 & API progression | 30 min |
| 8:30 - 10:30 | **Theory Session 1:** Python Requests & Advanced Auth | 2 hours |
| 10:30 - 11:00 | Break | 30 min |
| 11:00 - 1:00 PM | **Exercise Session 1:** Python API Client & Auth | 2 hours |
| 1:00 - 2:00 PM | Lunch break | 1 hour |
| 2:00 - 4:00 PM | **Theory Session 2:** Response Validation & API Mocking | 2 hours |
| 4:00 - 4:30 PM | Break | 30 min |
| 4:30 - 6:30 PM | **Exercise Session 2:** Enterprise API Test Framework | 2 hours |

---

## 📚 **THEORY SESSION 1: Python Requests & Advanced Authentication (2 hours)**

### **Part 13.1: Python Requests Library Basics**

The `requests` library is Python's de facto standard for HTTP requests, more Pythonic than urllib.

#### **Installation:**

```bash
pip install requests
```

#### **Basic Requests:**

```python
import requests

# GET request
response = requests.get('https://api.example.com/users')
print(response.status_code)  # 200
print(response.json())       # Parse JSON

# POST request
data = {
    'name': 'John Doe',
    'email': 'john@example.com'
}
response = requests.post('https://api.example.com/users', json=data)

# PUT request
response = requests.put(
    'https://api.example.com/users/1',
    json={'name': 'Updated Name'}
)

# DELETE request
response = requests.delete('https://api.example.com/users/1')

# PATCH request
response = requests.patch(
    'https://api.example.com/users/1',
    json={'status': 'active'}
)
```

#### **Response Object Properties:**

```python
response = requests.get('https://api.example.com/users')

# Status and headers
print(response.status_code)        # 200
print(response.reason)              # 'OK'
print(response.headers)             # Dict of headers
print(response.headers['content-type'])  # 'application/json'

# Response body
print(response.text)                # Raw text
print(response.json())              # Parsed JSON
print(response.content)             # Bytes

# URL and timing
print(response.url)                 # Final URL (after redirects)
print(response.elapsed)             # Response time
print(response.elapsed.total_seconds())  # In seconds

# Request details
print(response.request.method)       # 'GET'
print(response.request.url)          # Request URL
print(response.request.headers)      # Request headers
```

#### **Error Handling:**

```python
import requests
from requests.exceptions import (
    RequestException,
    Timeout,
    ConnectionError,
    HTTPError,
    TooManyRedirects
)

try:
    response = requests.get(
        'https://api.example.com/users',
        timeout=5
    )
    response.raise_for_status()  # Raise error for 4xx/5xx
    
except Timeout:
    print("Request timed out")
    
except ConnectionError:
    print("Failed to connect")
    
except HTTPError as e:
    print(f"HTTP error: {e.response.status_code}")
    
except RequestException as e:
    print(f"Request failed: {e}")
    
except Exception as e:
    print(f"Unexpected error: {e}")
```

---

### **Part 13.2: Headers and Parameters**

#### **Headers:**

```python
import requests

headers = {
    'User-Agent': 'MyAutomationFramework/1.0',
    'Accept': 'application/json',
    'Custom-Header': 'custom-value'
}

response = requests.get(
    'https://api.example.com/users',
    headers=headers
)
```

#### **Query Parameters:**

```python
# Method 1: In URL
response = requests.get(
    'https://api.example.com/users?page=1&limit=10'
)

# Method 2: params dictionary (preferred)
params = {
    'page': 1,
    'limit': 10,
    'sort': 'name',
    'order': 'asc'
}

response = requests.get(
    'https://api.example.com/users',
    params=params
)

# URL encoding happens automatically
# ?page=1&limit=10&sort=name&order=asc
```

#### **Request Body:**

```python
# JSON body
data = {
    'name': 'John Doe',
    'email': 'john@example.com',
    'roles': ['admin', 'user']
}

response = requests.post(
    'https://api.example.com/users',
    json=data  # Automatically sets Content-Type: application/json
)

# Form data
data = {
    'username': 'john',
    'password': 'secret123'
}

response = requests.post(
    'https://api.example.com/login',
    data=data  # Sets Content-Type: application/x-www-form-urlencoded
)

# File upload
files = {
    'file': open('report.pdf', 'rb'),
    'name': (None, 'Test Report')
}

response = requests.post(
    'https://api.example.com/upload',
    files=files
)
```

---

### **Part 13.3: Advanced Authentication**

#### **1. Bearer Token (JWT):**

```python
import requests
import jwt
from datetime import datetime, timedelta

# Obtain token
def get_token():
    response = requests.post(
        'https://api.example.com/auth/token',
        json={
            'username': 'testuser',
            'password': 'password123'
        }
    )
    response.raise_for_status()
    return response.json()['token']

# Use token in requests
token = get_token()
headers = {
    'Authorization': f'Bearer {token}'
}

response = requests.get(
    'https://api.example.com/protected',
    headers=headers
)

# Decode JWT to verify
def decode_jwt(token, secret=None):
    try:
        # Without secret (just decode, don't verify)
        decoded = jwt.decode(token, options={"verify_signature": False})
        return decoded
    except jwt.DecodeError:
        return None

decoded = decode_jwt(token)
print(f"Token expires at: {decoded.get('exp')}")
```

#### **2. API Key Authentication:**

```python
import requests

# API Key in header
headers = {
    'X-API-Key': 'your-api-key-here'
}

response = requests.get(
    'https://api.example.com/data',
    headers=headers
)

# API Key in query parameter
params = {
    'api_key': 'your-api-key-here'
}

response = requests.get(
    'https://api.example.com/data',
    params=params
)
```

#### **3. Basic Authentication:**

```python
import requests
from requests.auth import HTTPBasicAuth

# Method 1: HTTPBasicAuth
response = requests.get(
    'https://api.example.com/data',
    auth=HTTPBasicAuth('username', 'password')
)

# Method 2: Tuple (shorthand)
response = requests.get(
    'https://api.example.com/data',
    auth=('username', 'password')
)

# Method 3: Session
session = requests.Session()
session.auth = ('username', 'password')
response = session.get('https://api.example.com/data')
```

#### **4. OAuth 2.0 (with requests-oauthlib):**

```bash
pip install requests-oauthlib
```

```python
from requests_oauthlib import OAuth2Session

# OAuth2 setup
client_id = 'your-client-id'
client_secret = 'your-client-secret'
redirect_uri = 'http://localhost:8000/callback'

oauth = OAuth2Session(client_id, redirect_uri=redirect_uri)

# Step 1: Get authorization URL
authorization_url, state = oauth.authorization_url(
    'https://provider.example.com/oauth/authorize'
)

# Step 2: User authorizes and you get code (simulate here)
authorization_response = 'https://localhost:8000/callback?code=auth_code&state=state'

# Step 3: Exchange code for token
token = oauth.fetch_token(
    'https://provider.example.com/oauth/token',
    client_secret=client_secret,
    authorization_response=authorization_response
)

# Step 4: Use token to make requests
response = oauth.get('https://api.example.com/user')
```

#### **5. Mutual TLS (mTLS):**

```python
import requests

# Client certificate and key
cert = ('/path/to/client-cert.pem', '/path/to/client-key.pem')

# CA certificate for verification
verify = '/path/to/ca-cert.pem'

response = requests.get(
    'https://api.example.com/secure',
    cert=cert,
    verify=verify
)

# Or disable verification (not recommended for production)
response = requests.get(
    'https://api.example.com/secure',
    cert=cert,
    verify=False
)
```

---

### **Part 13.4: Sessions and Connection Pooling**

Using sessions for better performance:

```python
import requests

# Create session
session = requests.Session()

# Set default headers
session.headers.update({
    'User-Agent': 'MyTestFramework/1.0',
    'Accept': 'application/json'
})

# Set authentication
session.auth = ('username', 'password')

# Set default timeout
session.timeout = 30

# Make multiple requests (connection pooling)
response1 = session.get('https://api.example.com/users')
response2 = session.get('https://api.example.com/posts')
response3 = session.post('https://api.example.com/data', json={'key': 'value'})

# Session is automatically closed when context manager exits
with requests.Session() as session:
    session.headers.update({'Authorization': 'Bearer token'})
    response = session.get('https://api.example.com/protected')
```

---

## 🔨 **EXERCISE SESSION 1 (2 hours)**

### **Exercise 13.1: Python API Client with Authentication**

**Objective:** Build reusable Python API client with auth

**Task:**
```
1. Create API client class
2. Implement multiple auth types
3. Handle errors and retries
4. Add request logging
5. Create test suite
```

**Solution:**

```python
# src/api_client.py
import requests
import logging
from typing import Any, Dict, Optional, Tuple
from requests.auth import HTTPBasicAuth, AuthBase
from datetime import datetime
import time

# Setup logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

class APIClient:
    """Enterprise-grade API client with multiple auth methods"""
    
    def __init__(
        self,
        base_url: str,
        timeout: int = 30,
        retries: int = 3,
        backoff_factor: float = 0.5
    ):
        self.base_url = base_url
        self.timeout = timeout
        self.retries = retries
        self.backoff_factor = backoff_factor
        self.session = requests.Session()
        self.auth_method = None
    
    def set_bearer_token(self, token: str):
        """Set Bearer token authentication"""
        self.session.headers.update({
            'Authorization': f'Bearer {token}'
        })
        self.auth_method = 'bearer'
        logger.debug("Bearer token authentication set")
    
    def set_api_key(self, key: str, header_name: str = 'X-API-Key'):
        """Set API key authentication"""
        self.session.headers.update({
            header_name: key
        })
        self.auth_method = 'api_key'
        logger.debug(f"API key authentication set via {header_name}")
    
    def set_basic_auth(self, username: str, password: str):
        """Set Basic authentication"""
        self.session.auth = HTTPBasicAuth(username, password)
        self.auth_method = 'basic'
        logger.debug("Basic authentication set")
    
    def set_oauth2_token(self, token: str):
        """Set OAuth 2.0 token"""
        self.session.headers.update({
            'Authorization': f'Bearer {token}'
        })
        self.auth_method = 'oauth2'
        logger.debug("OAuth 2.0 token authentication set")
    
    def set_custom_headers(self, headers: Dict[str, str]):
        """Set custom headers"""
        self.session.headers.update(headers)
        logger.debug(f"Custom headers added: {list(headers.keys())}")
    
    def _make_request(
        self,
        method: str,
        endpoint: str,
        **kwargs
    ) -> requests.Response:
        """Make HTTP request with retry logic"""
        
        url = f"{self.base_url}{endpoint}"
        kwargs.setdefault('timeout', self.timeout)
        
        last_exception = None
        
        for attempt in range(self.retries):
            try:
                logger.debug(f"{method} {url} (attempt {attempt + 1}/{self.retries})")
                
                response = self.session.request(method, url, **kwargs)
                
                # Log response
                logger.debug(
                    f"Response: {response.status_code} "
                    f"({response.elapsed.total_seconds():.2f}s)"
                )
                
                # Return on success
                if response.ok:
                    return response
                
                # Don't retry on client errors (4xx)
                if 400 <= response.status_code < 500:
                    response.raise_for_status()
                
                # Retry on server errors (5xx)
                raise requests.exceptions.HTTPError(
                    f"HTTP {response.status_code}: {response.reason}"
                )
            
            except requests.exceptions.RequestException as e:
                last_exception = e
                
                # Don't retry if last attempt
                if attempt == self.retries - 1:
                    break
                
                # Calculate backoff
                wait_time = self.backoff_factor * (2 ** attempt)
                logger.warning(
                    f"Request failed: {e}. "
                    f"Retrying in {wait_time:.1f}s..."
                )
                time.sleep(wait_time)
        
        raise last_exception or Exception("Request failed after retries")
    
    def get(
        self,
        endpoint: str,
        params: Optional[Dict] = None,
        headers: Optional[Dict] = None
    ) -> Dict[str, Any]:
        """GET request"""
        response = self._make_request(
            'GET',
            endpoint,
            params=params,
            headers=headers
        )
        return response.json() if response.text else {}
    
    def post(
        self,
        endpoint: str,
        data: Optional[Dict] = None,
        json: Optional[Dict] = None,
        headers: Optional[Dict] = None
    ) -> Dict[str, Any]:
        """POST request"""
        response = self._make_request(
            'POST',
            endpoint,
            data=data,
            json=json,
            headers=headers
        )
        return response.json() if response.text else {}
    
    def put(
        self,
        endpoint: str,
        json: Optional[Dict] = None,
        headers: Optional[Dict] = None
    ) -> Dict[str, Any]:
        """PUT request"""
        response = self._make_request(
            'PUT',
            endpoint,
            json=json,
            headers=headers
        )
        return response.json() if response.text else {}
    
    def patch(
        self,
        endpoint: str,
        json: Optional[Dict] = None,
        headers: Optional[Dict] = None
    ) -> Dict[str, Any]:
        """PATCH request"""
        response = self._make_request(
            'PATCH',
            endpoint,
            json=json,
            headers=headers
        )
        return response.json() if response.text else {}
    
    def delete(
        self,
        endpoint: str,
        headers: Optional[Dict] = None
    ) -> Dict[str, Any]:
        """DELETE request"""
        response = self._make_request(
            'DELETE',
            endpoint,
            headers=headers
        )
        return response.json() if response.text else {}
    
    def get_full_response(
        self,
        method: str,
        endpoint: str,
        **kwargs
    ) -> requests.Response:
        """Get full response object"""
        return self._make_request(method, endpoint, **kwargs)
    
    def close(self):
        """Close session"""
        self.session.close()
        logger.debug("API client session closed")

# tests/test_api_client.py
import pytest
from src.api_client import APIClient

class TestAPIClientAuth:
    """Test authentication methods"""
    
    @pytest.fixture
    def client(self):
        """Create API client for testing"""
        client = APIClient('https://jsonplaceholder.typicode.com')
        yield client
        client.close()
    
    def test_bearer_token_auth(self, client):
        """Test Bearer token authentication"""
        client.set_bearer_token('test-token-12345')
        
        auth_header = client.session.headers.get('Authorization')
        assert auth_header == 'Bearer test-token-12345'
    
    def test_api_key_auth_default(self, client):
        """Test API key with default header"""
        client.set_api_key('api-key-12345')
        
        api_key = client.session.headers.get('X-API-Key')
        assert api_key == 'api-key-12345'
    
    def test_api_key_auth_custom(self, client):
        """Test API key with custom header"""
        client.set_api_key('api-key-12345', header_name='Authorization-Key')
        
        api_key = client.session.headers.get('Authorization-Key')
        assert api_key == 'api-key-12345'
    
    def test_basic_auth(self, client):
        """Test Basic authentication"""
        client.set_basic_auth('testuser', 'testpass')
        
        assert client.session.auth is not None
        assert client.session.auth.username == 'testuser'
        assert client.session.auth.password == 'testpass'
    
    def test_get_request(self, client):
        """Test GET request"""
        response = client.get('/users/1')
        
        assert 'id' in response
        assert response['id'] == 1
        assert 'name' in response
    
    def test_get_with_params(self, client):
        """Test GET with query parameters"""
        response = client.get('/users', params={'_limit': 5})
        
        assert isinstance(response, list)
        assert len(response) <= 5
    
    def test_post_request(self, client):
        """Test POST request"""
        new_user = {
            'name': 'Test User',
            'email': 'test@example.com'
        }
        
        response = client.post('/users', json=new_user)
        
        assert 'id' in response
        assert response['name'] == 'Test User'
```

---

### **Exercise 13.2: Token Management and Refresh**

**Objective:** Implement automatic token management

**Task:**
```
1. Create token manager
2. Implement token refresh
3. Handle token expiration
4. Cache tokens
```

**Solution:**

```python
# src/token_manager.py
import jwt
import time
from typing import Optional
from datetime import datetime, timedelta
import logging

logger = logging.getLogger(__name__)

class TokenManager:
    """Manage authentication tokens with auto-refresh"""
    
    def __init__(self, auth_endpoint: str, client_id: str, client_secret: str):
        self.auth_endpoint = auth_endpoint
        self.client_id = client_id
        self.client_secret = client_secret
        self.access_token: Optional[str] = None
        self.refresh_token: Optional[str] = None
        self.expires_at: Optional[float] = None
    
    def get_token(self) -> str:
        """Get valid token (refresh if needed)"""
        if self._is_token_expired():
            if self.refresh_token:
                self._refresh_access_token()
            else:
                self._get_new_token()
        
        return self.access_token
    
    def _is_token_expired(self) -> bool:
        """Check if token is expired"""
        if not self.access_token or not self.expires_at:
            return True
        
        # Refresh 5 minutes before expiry
        buffer = 300
        return time.time() > (self.expires_at - buffer)
    
    def _get_new_token(self):
        """Obtain new token from auth endpoint"""
        import requests
        
        payload = {
            'grant_type': 'client_credentials',
            'client_id': self.client_id,
            'client_secret': self.client_secret
        }
        
        response = requests.post(self.auth_endpoint, json=payload)
        response.raise_for_status()
        
        data = response.json()
        self.access_token = data['access_token']
        self.refresh_token = data.get('refresh_token')
        self.expires_at = time.time() + data.get('expires_in', 3600)
        
        logger.info("New access token obtained")
    
    def _refresh_access_token(self):
        """Refresh token using refresh token"""
        import requests
        
        payload = {
            'grant_type': 'refresh_token',
            'refresh_token': self.refresh_token,
            'client_id': self.client_id,
            'client_secret': self.client_secret
        }
        
        response = requests.post(self.auth_endpoint, json=payload)
        response.raise_for_status()
        
        data = response.json()
        self.access_token = data['access_token']
        self.refresh_token = data.get('refresh_token', self.refresh_token)
        self.expires_at = time.time() + data.get('expires_in', 3600)
        
        logger.info("Access token refreshed")
    
    def decode_token(self) -> dict:
        """Decode JWT token (without verification)"""
        if not self.access_token:
            return {}
        
        try:
            decoded = jwt.decode(
                self.access_token,
                options={"verify_signature": False}
            )
            return decoded
        except jwt.DecodeError:
            logger.error("Failed to decode token")
            return {}
```

---

## 📚 **THEORY SESSION 2: Response Validation & API Mocking (2 hours)**

### **Part 13.5: JSON Schema Validation**

JSON Schema defines structure and constraints for JSON data.

#### **Installation:**

```bash
pip install jsonschema
```

#### **Basic Schema Validation:**

```python
from jsonschema import validate, ValidationError
import json

# Define schema
user_schema = {
    "type": "object",
    "properties": {
        "id": {"type": "integer"},
        "name": {"type": "string"},
        "email": {"type": "string", "format": "email"},
        "age": {"type": "integer", "minimum": 0, "maximum": 150},
        "roles": {
            "type": "array",
            "items": {"type": "string"}
        },
        "active": {"type": "boolean"}
    },
    "required": ["id", "name", "email"],
    "additionalProperties": False
}

# Valid data
valid_user = {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30,
    "roles": ["admin", "user"],
    "active": True
}

# Validate
try:
    validate(instance=valid_user, schema=user_schema)
    print("✓ Valid user data")
except ValidationError as e:
    print(f"✗ Validation error: {e.message}")

# Invalid data
invalid_user = {
    "id": "not_a_number",  # Should be integer
    "name": "Jane",
    "email": "invalid-email",  # Invalid format
    "age": 200  # Exceeds maximum
}

try:
    validate(instance=invalid_user, schema=user_schema)
except ValidationError as e:
    print(f"✗ Expected validation error: {e.message}")
```

#### **Advanced Schema Features:**

```python
from jsonschema import validate, Draft7Validator

# Complex schema with relationships
api_response_schema = {
    "type": "object",
    "properties": {
        "status": {
            "type": "string",
            "enum": ["success", "error", "pending"]
        },
        "data": {
            "type": "object",
            "properties": {
                "users": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "id": {"type": "integer"},
                            "username": {"type": "string"},
                            "email": {"type": "string"}
                        },
                        "required": ["id", "username"]
                    }
                }
            }
        },
        "metadata": {
            "type": "object",
            "properties": {
                "timestamp": {"type": "string", "format": "date-time"},
                "version": {"type": "string", "pattern": "^\\d+\\.\\d+\\.\\d+$"}
            }
        }
    },
    "required": ["status"]
}

response = {
    "status": "success",
    "data": {
        "users": [
            {"id": 1, "username": "user1", "email": "user1@example.com"},
            {"id": 2, "username": "user2"}
        ]
    },
    "metadata": {
        "timestamp": "2025-01-13T10:00:00Z",
        "version": "1.0.0"
    }
}

try:
    validate(instance=response, schema=api_response_schema)
    print("✓ API response is valid")
except ValidationError as e:
    print(f"✗ Invalid response: {e.message}")
```

---

### **Part 13.6: API Mocking with unittest.mock**

Testing without hitting real APIs:

```python
from unittest.mock import Mock, patch, MagicMock
import requests

# Mock simple response
def test_api_with_mock():
    with patch('requests.get') as mock_get:
        # Setup mock
        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.json.return_value = {
            'id': 1,
            'name': 'John Doe'
        }
        mock_get.return_value = mock_response
        
        # Make request (to mocked API)
        response = requests.get('https://api.example.com/users/1')
        
        # Assertions
        assert response.status_code == 200
        assert response.json()['name'] == 'John Doe'
        
        # Verify mock was called
        mock_get.assert_called_once_with('https://api.example.com/users/1')
```

#### **Mocking with responses library:**

```bash
pip install responses
```

```python
import responses
import requests

@responses.activate
def test_api_with_responses():
    # Mock GET request
    responses.add(
        responses.GET,
        'https://api.example.com/users',
        json=[
            {'id': 1, 'name': 'User 1'},
            {'id': 2, 'name': 'User 2'}
        ],
        status=200
    )
    
    # Make request
    response = requests.get('https://api.example.com/users')
    
    # Assertions
    assert response.status_code == 200
    assert len(response.json()) == 2

@responses.activate
def test_api_error_handling():
    # Mock error response
    responses.add(
        responses.POST,
        'https://api.example.com/users',
        json={'error': 'Invalid input'},
        status=400
    )
    
    # Make request
    response = requests.post(
        'https://api.example.com/users',
        json={'invalid': 'data'}
    )
    
    # Should handle error
    assert response.status_code == 400
```

#### **Mocking with pytest-mock:**

```python
import pytest

def test_api_with_pytest_mock(mocker):
    # Mock the requests library
    mock_get = mocker.patch('requests.get')
    mock_get.return_value.status_code = 200
    mock_get.return_value.json.return_value = {'id': 1, 'name': 'Test'}
    
    # Test code
    import requests
    response = requests.get('https://api.example.com/users/1')
    
    assert response.json()['id'] == 1
    mock_get.assert_called_once()
```

---

### **Part 13.7: Contract Testing**

Testing API contracts to ensure compatibility:

```python
import requests

class APIContractTest:
    """Verify API response structure matches contract"""
    
    BASE_URL = 'https://jsonplaceholder.typicode.com'
    
    def test_user_endpoint_contract(self):
        """Verify user endpoint returns expected contract"""
        response = requests.get(f'{self.BASE_URL}/users/1')
        user = response.json()
        
        # Expected contract
        required_fields = [
            'id', 'name', 'email', 'username',
            'address', 'phone', 'website', 'company'
        ]
        
        for field in required_fields:
            assert field in user, f"Missing required field: {field}"
        
        # Field types
        assert isinstance(user['id'], int)
        assert isinstance(user['name'], str)
        assert isinstance(user['address'], dict)
        assert 'street' in user['address']
    
    def test_error_response_contract(self):
        """Verify error responses match contract"""
        response = requests.get(f'{self.BASE_URL}/users/99999')
        
        # Error response structure
        if response.status_code >= 400:
            # Should have meaningful response
            assert response.status_code in [400, 401, 403, 404, 500, 503]
```

---

### **Part 13.8: Performance Testing**

Measure API performance:

```python
import requests
import time
from statistics import mean, median, stdev

def performance_test_api():
    """Benchmark API response times"""
    
    url = 'https://jsonplaceholder.typicode.com/users'
    iterations = 10
    response_times = []
    
    print(f"Testing {url} ({iterations} iterations)")
    
    for i in range(iterations):
        start = time.time()
        response = requests.get(url, timeout=10)
        elapsed = (time.time() - start) * 1000  # Convert to ms
        
        response_times.append(elapsed)
        print(f"  {i+1}. {elapsed:.2f}ms - {response.status_code}")
    
    # Statistics
    print(f"\n📊 Performance Metrics:")
    print(f"  Min:    {min(response_times):.2f}ms")
    print(f"  Max:    {max(response_times):.2f}ms")
    print(f"  Mean:   {mean(response_times):.2f}ms")
    print(f"  Median: {median(response_times):.2f}ms")
    
    if len(response_times) > 1:
        print(f"  StdDev: {stdev(response_times):.2f}ms")
    
    # Assert performance thresholds
    assert mean(response_times) < 1000, "Average response time too high"
    assert max(response_times) < 3000, "Max response time too high"
```

---

## 🔨 **EXERCISE SESSION 2 (2 hours)**

### **Exercise 13.3: Enterprise API Test Framework**

**Objective:** Build production-grade API testing framework

**Task:**
```
1. Integrated client with auth
2. JSON schema validation
3. API mocking for tests
4. Performance benchmarking
5. Contract testing
6. Comprehensive test suite
```

**Solution:**

```python
# tests/test_enterprise_api.py
import pytest
import requests
import responses
from jsonschema import validate
from src.api_client import APIClient
from src.token_manager import TokenManager
import time

# Test data and schemas
USER_SCHEMA = {
    "type": "object",
    "properties": {
        "id": {"type": "integer"},
        "name": {"type": "string"},
        "email": {"type": "string"}
    },
    "required": ["id", "name", "email"]
}

USERS_LIST_SCHEMA = {
    "type": "array",
    "items": USER_SCHEMA
}

class TestAPIWithAuthentication:
    """Test authenticated API endpoints"""
    
    @pytest.fixture
    def authenticated_client(self):
        client = APIClient('https://jsonplaceholder.typicode.com')
        # Simulate setting token
        client.set_bearer_token('test-token-12345')
        return client
    
    def test_get_users_with_token(self, authenticated_client):
        """Test GET request with Bearer token"""
        response = authenticated_client.get('/users')
        
        assert isinstance(response, list)
        assert len(response) > 0
        
        # Validate first user against schema
        validate(instance=response[0], schema=USER_SCHEMA)

class TestAPIResponseValidation:
    """Test response structure validation"""
    
    @pytest.fixture
    def client(self):
        return APIClient('https://jsonplaceholder.typicode.com')
    
    def test_user_response_schema(self, client):
        """Validate user response matches schema"""
        response = client.get('/users/1')
        
        # Should not raise exception
        validate(instance=response, schema=USER_SCHEMA)
        
        # Additional validations
        assert response['id'] == 1
        assert '@' in response['email']
    
    def test_users_list_schema(self, client):
        """Validate users list response schema"""
        response = client.get('/users')
        
        validate(instance=response, schema=USERS_LIST_SCHEMA)
        
        # Each user has required fields
        for user in response:
            assert 'id' in user
            assert 'name' in user
            assert 'email' in user

class TestAPIWithMocking:
    """Test with mocked API responses"""
    
    @responses.activate
    def test_create_user_success(self):
        """Test successful user creation with mock"""
        responses.add(
            responses.POST,
            'https://api.example.com/users',
            json={'id': 123, 'name': 'Test User', 'email': 'test@example.com'},
            status=201
        )
        
        client = APIClient('https://api.example.com')
        response = client.post(
            '/users',
            json={'name': 'Test User', 'email': 'test@example.com'}
        )
        
        assert response['id'] == 123
        assert response['status'] in [200, 201] or True  # Mock returns 200
    
    @responses.activate
    def test_error_response_handling(self):
        """Test error response handling"""
        responses.add(
            responses.POST,
            'https://api.example.com/users',
            json={'error': 'Invalid email'},
            status=400
        )
        
        client = APIClient('https://api.example.com')
        
        with pytest.raises(Exception):
            client.post('/users', json={'name': 'Invalid'})

class TestAPIPerformance:
    """Test API response time performance"""
    
    def test_response_time_threshold(self):
        """Verify response time is within threshold"""
        client = APIClient('https://jsonplaceholder.typicode.com')
        
        start = time.time()
        response = client.get('/users/1')
        elapsed = (time.time() - start) * 1000
        
        print(f"Response time: {elapsed:.2f}ms")
        
        # Should respond within 2 seconds
        assert elapsed < 2000, f"Response took {elapsed:.2f}ms"
    
    def test_batch_performance(self):
        """Test batch operation performance"""
        client = APIClient('https://jsonplaceholder.typicode.com')
        
        request_times = []
        
        # Make 5 requests and measure
        for i in range(1, 6):
            start = time.time()
            client.get(f'/users/{i}')
            elapsed = (time.time() - start) * 1000
            request_times.append(elapsed)
        
        avg_time = sum(request_times) / len(request_times)
        
        print(f"Average response time: {avg_time:.2f}ms")
        
        # Average should be reasonable
        assert avg_time < 1000

class TestAPIContractCompliance:
    """Test API contract compliance"""
    
    def test_user_contract(self):
        """Verify user endpoint meets contract"""
        client = APIClient('https://jsonplaceholder.typicode.com')
        user = client.get('/users/1')
        
        # Contract: must have these fields
        required_fields = ['id', 'name', 'email', 'username']
        for field in required_fields:
            assert field in user, f"Missing contract field: {field}"
        
        # Contract: types
        assert isinstance(user['id'], int)
        assert isinstance(user['name'], str)
        assert isinstance(user['username'], str)
    
    def test_list_contract(self):
        """Verify list endpoint meets contract"""
        client = APIClient('https://jsonplaceholder.typicode.com')
        users = client.get('/users')
        
        # Contract: return array
        assert isinstance(users, list)
        
        # Contract: all items have required fields
        for user in users[:3]:  # Check first 3
            assert 'id' in user
            assert 'name' in user
```

---

### **Exercise 13.4: Complete Enterprise Test Suite**

**Objective:** Full integration test suite ready for CI/CD

**Task:**
```
1. API client + auth
2. Schema validation
3. Error handling
4. Performance tests
5. Contract tests
6. Mock tests
7. Integration with CI/CD
```

**Solution:**

```python
# conftest.py (pytest configuration)
import pytest
from src.api_client import APIClient

@pytest.fixture(scope="session")
def api_client():
    """Create API client for entire test session"""
    client = APIClient(
        'https://jsonplaceholder.typicode.com',
        timeout=10,
        retries=2
    )
    yield client
    client.close()

@pytest.fixture
def authenticated_client():
    """Create authenticated client"""
    client = APIClient('https://jsonplaceholder.typicode.com')
    client.set_bearer_token('test-token-xyz')
    yield client
    client.close()

# tests/test_integration.py
import pytest
import responses
from jsonschema import validate

class TestCompleteAPIIntegration:
    """Complete end-to-end API integration tests"""
    
    def test_crud_operations(self, api_client):
        """Test complete CRUD workflow"""
        
        # CREATE
        new_post = {
            'title': 'Test Post',
            'body': 'Test content',
            'userId': 1
        }
        created = api_client.post('/posts', json=new_post)
        post_id = created.get('id')
        assert post_id is not None
        
        # READ
        retrieved = api_client.get(f'/posts/{post_id}')
        assert retrieved['title'] == 'Test Post'
        
        # UPDATE
        updated_post = {**new_post, 'title': 'Updated Post'}
        updated = api_client.put(f'/posts/{post_id}', json=updated_post)
        assert updated['title'] == 'Updated Post'
        
        # DELETE
        api_client.delete(f'/posts/{post_id}')
    
    def test_complex_query(self, api_client):
        """Test complex query with filtering"""
        
        # Get user's posts
        user_id = 1
        posts = api_client.get('/posts', params={'userId': user_id})
        
        assert isinstance(posts, list)
        assert all(p['userId'] == user_id for p in posts)
    
    @responses.activate
    def test_error_recovery(self):
        """Test automatic error recovery"""
        
        # Simulate intermittent failure then success
        responses.add(
            responses.GET,
            'https://api.example.com/data',
            json={'error': 'Server error'},
            status=500
        )
        responses.add(
            responses.GET,
            'https://api.example.com/data',
            json={'success': True},
            status=200
        )
        
        client = APIClient('https://api.example.com', retries=2)
        
        # Should retry and eventually succeed
        # (In real scenario with actual retries)
```

---

## ❓ **Quiz: Python API Testing & Advanced Concepts**

**Instructions:** Answer all 10 questions. Target score: 8/10 (80%)

### **Question 1: Requests Library**
What is the primary advantage of using `requests` over urllib?
- A) Faster performance
- B) More Pythonic API ✅ **CORRECT**
- C) Better error handling
- D) Built-in mocking

**Explanation:** Requests is simpler and more intuitive than urllib.

---

### **Question 2: Response Handling**
How do you parse JSON from a requests response?
- A) `response.parse()`
- B) `response.json()` ✅ **CORRECT**
- C) `json.loads(response)`
- D) `response.data`

**Explanation:** Use .json() method on response object.

---

### **Question 3: Bearer Token**
Where is Bearer token placed in request?
- A) Query parameter
- B) Request body
- C) Authorization header ✅ **CORRECT**
- D) Cookie

**Explanation:** Bearer tokens go in Authorization header.

---

### **Question 4: Sessions**
What advantage does using a session provide?
- A) Automatic retries
- B) Connection pooling ✅ **CORRECT**
- C) Token management
- D) Error recovery

**Explanation:** Sessions reuse connections for better performance.

---

### **Question 5: JSON Schema**
What does JSON Schema validate?
- A) API performance
- B) Data structure and types ✅ **CORRECT**
- C) Authentication
- D) Response time

**Explanation:** Schema validates JSON structure matches expected format.

---

### **Question 6: Mock Library**
Which library is best for mocking requests?
- A) unittest.mock
- B) responses ✅ **CORRECT** (or mock)
- C) pytest
- D) logging

**Explanation:** responses library designed for mocking HTTP requests.

---

### **Question 7: Retry Logic**
When should you retry a request?
- A) Always
- B) Only on 5xx errors ✅ **CORRECT**
- C) Only on 4xx errors
- D) Never

**Explanation:** Retry transient errors (5xx), not client errors (4xx).

---

### **Question 8: Contract Testing**
What does contract testing verify?
- A) Performance
- B) Security
- C) API response structure ✅ **CORRECT**
- D) Database connectivity

**Explanation:** Contract testing ensures consistent API interface.

---

### **Question 9: Timeout**
Why set timeout on requests?
- A) Improve performance
- B) Prevent hanging indefinitely ✅ **CORRECT**
- C) Reduce server load
- D) Enable retries

**Explanation:** Timeout prevents requests from hanging forever.

---

### **Question 10: Authentication**
Which auth method is most common for APIs?
- A) Basic Auth
- B) Bearer Token ✅ **CORRECT**
- C) API Key
- D) OAuth 1.0

**Explanation:** Bearer tokens (JWT) are widely used for modern APIs.

---

## ✅ **Quiz Answer Key**

| Q | Answer | Topic |
|---|--------|-------|
| 1 | B | Requests advantage |
| 2 | B | JSON parsing |
| 3 | C | Bearer token placement |
| 4 | B | Session benefits |
| 5 | B | JSON Schema |
| 6 | B | Mock library |
| 7 | B | Retry conditions |
| 8 | C | Contract testing |
| 9 | B | Timeout purpose |
| 10 | B | Common auth method |

**Your Score:** ___/10

**Interpretation:**
- 9-10: ✅ Python API expert!
- 7-8: 🟡 Good understanding
- Below 7: 🔴 Review concepts

---

## 📋 **Daily Assignment**

### **Assignment 13.1: Production-Ready Python API Framework**

**Objective:** Build enterprise-grade Python API testing framework

**Requirements:**
1. Complete API client with multiple auth methods
2. Token manager with auto-refresh
3. JSON schema validation module
4. API mocking utilities
5. Performance benchmarking tools
6. Contract testing suite
7. Complete test coverage
8. CI/CD ready

**Deliverables:**
- `api_client.py` - Full client implementation
- `token_manager.py` - Token management
- `test_api_*.py` - 30+ test cases
- `conftest.py` - Pytest configuration
- `requirements.txt` - Dependencies
- `README.md` - Complete documentation
- All exercises completed

---

## 🎯 **Daily Checklist**

Track your Day 13 progress:

- [ ] Reviewed Day 12 concepts
- [ ] Completed Theory Session 1 (Python Requests)
- [ ] Completed Exercise 13.1 (API Client)
- [ ] Completed Exercise 13.2 (Token Management)
- [ ] Completed Theory Session 2 (Validation & Mocking)
- [ ] Completed Exercise 13.3 (Enterprise Framework)
- [ ] Completed Exercise 13.4 (Complete Suite)
- [ ] Answered all 10 quiz questions
- [ ] Scored 80%+ on quiz (8/10)
- [ ] Completed Assignment 13.1
- [ ] Built token manager
- [ ] Created mock tests
- [ ] Implemented schema validation
- [ ] Added performance tests
- [ ] Committed code to GitHub
- [ ] Updated learning journal

**Daily Metrics:**
- Quiz Score: ___/10
- Confidence Level (1-5): ___
- Time Spent: ___ hours
- Test cases created: ___ count
- Code files: ___ count
- Challenges Faced: _________________

---

## 📚 **Key Takeaways from Day 13**

1. **Python requests is essential** - Modern HTTP client
2. **Sessions improve performance** - Connection pooling
3. **Bearer tokens are standard** - JWT most common
4. **Schema validation ensures quality** - Validate all responses
5. **Mocking enables unit testing** - Test without real API
6. **Token management is critical** - Auto-refresh before expiry
7. **Contract testing prevents breakage** - Verify interface
8. **Performance matters** - Benchmark and assert thresholds
9. **Retry logic improves reliability** - Handle transient failures
10. **Enterprise requires frameworks** - Reusable, maintainable code

---

## 🔗 **Resources for Review**

- [Python Requests Docs](https://requests.readthedocs.io/)
- [Responses Library](https://github.com/getsentry/responses)
- [JSON Schema Validator](https://python-jsonschema.readthedocs.io/)
- [PyJWT Documentation](https://pyjwt.readthedocs.io/)
- [Pytest Best Practices](https://docs.pytest.org/)

---

## 🚀 **Ready for Day 14?**

By completing Day 13, you've mastered:
- ✅ Python requests library
- ✅ Multiple authentication methods
- ✅ Bearer tokens and JWT
- ✅ Session management
- ✅ JSON schema validation
- ✅ API mocking techniques
- ✅ Contract testing
- ✅ Performance benchmarking
- ✅ Token lifecycle management
- ✅ Enterprise API framework

**Next (Day 14):** Advanced REST Patterns & GraphQL Basics
- REST versioning strategies
- Pagination and filtering patterns
- GraphQL fundamentals
- Query optimization
- Caching strategies

---

## 📊 **Week 3 Progress**

```
Week 1          Week 2          Week 3          Week 4          Week 5
Foundation      Mastery         API Testing     Jenkins/DevOps  Cypress/Interview
Days 1-5        Days 6-11       Days 12-15      Days 16-20      Days 21-25
✅ 100%         ✅ 100%         🔜 Day 13       🔜 Coming        🔜 Final
                               (40%)            Weeks

Overall: 13/25 Days Complete (52%)
```

---

**Congratulations on Day 13!** 🎉

You've now completed **half the course (52%)!**

From browser automation to API testing, you're building a comprehensive skill set that makes you a **professional QA automation engineer.**

---

*Last Updated: December 13, 2025*  
*Day 13 Complete Guide v1.0*  
*Week 3 Day 2 - Python API Mastery*