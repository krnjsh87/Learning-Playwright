# Day 14: Advanced REST Patterns & GraphQL Fundamentals

**Date:** Day 14 of 25  
**Duration:** 8 hours  
**Difficulty:** Advanced-Professional  
**Focus Area:** REST Architecture Patterns & GraphQL Basics

---

## 🎯 **Learning Objectives**

By the end of Day 14, you will:

✅ Master REST API versioning strategies  
✅ Implement advanced pagination patterns  
✅ Build filtering and sorting systems  
✅ Understand GraphQL fundamentals  
✅ Query and test GraphQL APIs  
✅ Implement caching strategies  
✅ Handle API rate limiting properly  
✅ Design resilient API clients  
✅ Test both REST and GraphQL endpoints  
✅ Optimize API performance for automation  

---

## ⏰ **Daily Schedule (8 Hours)**

| Time | Activity | Duration |
|------|----------|----------|
| 8:00 - 8:30 | Review Day 13 & API progression | 30 min |
| 8:30 - 10:30 | **Theory Session 1:** Advanced REST Patterns | 2 hours |
| 10:30 - 11:00 | Break | 30 min |
| 11:00 - 1:00 PM | **Exercise Session 1:** REST Versioning & Pagination | 2 hours |
| 1:00 - 2:00 PM | Lunch break | 1 hour |
| 2:00 - 4:00 PM | **Theory Session 2:** GraphQL Fundamentals | 2 hours |
| 4:00 - 4:30 PM | Break | 30 min |
| 4:30 - 6:30 PM | **Exercise Session 2:** GraphQL Testing & Optimization | 2 hours |

---

## 📚 **THEORY SESSION 1: Advanced REST Patterns (2 hours)**

### **Part 14.1: API Versioning Strategies**

Versioning is critical for maintaining backward compatibility while adding new features.

#### **1. URL Path Versioning (Most Common)**

```
v1: https://api.example.com/v1/users
v2: https://api.example.com/v2/users
```

```python
import requests

# Version 1 endpoint
response_v1 = requests.get('https://api.example.com/v1/users')
# Returns: [{ "id": 1, "name": "John" }]

# Version 2 endpoint (enhanced)
response_v2 = requests.get('https://api.example.com/v2/users')
# Returns: [{ 
#   "id": 1, 
#   "name": "John", 
#   "email": "john@example.com",
#   "profile": { "bio": "...", "avatar": "..." }
# }]
```

#### **2. Header-Based Versioning**

```
GET /users
Headers: Accept: application/vnd.api+json;version=2
```

```python
headers = {
    'Accept': 'application/vnd.api+json;version=2'
}
response = requests.get('https://api.example.com/users', headers=headers)
```

#### **3. Query Parameter Versioning**

```
GET /users?version=2
```

```python
response = requests.get(
    'https://api.example.com/users',
    params={'version': '2'}
)
```

#### **4. Subdomain Versioning**

```
https://v1.api.example.com/users
https://v2.api.example.com/users
```

#### **Best Practice: Path Versioning**

```python
class VersionedAPIClient:
    """API client supporting multiple versions"""
    
    def __init__(self, base_url, api_version='v1'):
        self.base_url = base_url
        self.api_version = api_version
        self.session = requests.Session()
    
    def _get_versioned_url(self, endpoint):
        """Build versioned URL"""
        return f"{self.base_url}/{self.api_version}{endpoint}"
    
    def get(self, endpoint, **kwargs):
        """GET request with versioning"""
        url = self._get_versioned_url(endpoint)
        return self.session.get(url, **kwargs).json()
    
    def post(self, endpoint, **kwargs):
        """POST request with versioning"""
        url = self._get_versioned_url(endpoint)
        return self.session.post(url, **kwargs).json()
    
    def set_version(self, version):
        """Switch API version"""
        self.api_version = version

# Usage
client_v1 = VersionedAPIClient('https://api.example.com', 'v1')
users_v1 = client_v1.get('/users')

client_v2 = VersionedAPIClient('https://api.example.com', 'v2')
users_v2 = client_v2.get('/users')

# Or switch version
client = VersionedAPIClient('https://api.example.com')
client.set_version('v2')
users = client.get('/users')
```

---

### **Part 14.2: Pagination Patterns**

Pagination is essential for handling large datasets efficiently.

#### **1. Offset-Based Pagination**

```
GET /users?offset=0&limit=10
GET /users?offset=10&limit=10
GET /users?offset=20&limit=10
```

```python
import requests

def get_all_users_offset(base_url, limit=10):
    """Fetch all users using offset-based pagination"""
    all_users = []
    offset = 0
    
    while True:
        response = requests.get(
            f'{base_url}/users',
            params={'offset': offset, 'limit': limit}
        )
        users = response.json()
        
        if not users:  # No more results
            break
        
        all_users.extend(users)
        offset += limit
    
    return all_users

# Disadvantage: Offset inefficient for large datasets (N+1 queries)
# Advantage: Simple to implement and understand
```

#### **2. Cursor-Based Pagination (Recommended)**

```
GET /users?cursor=abc123&limit=10
GET /users?cursor=def456&limit=10
```

```python
import requests

def get_all_users_cursor(base_url, limit=10):
    """Fetch all users using cursor-based pagination"""
    all_users = []
    cursor = None
    
    while True:
        params = {'limit': limit}
        if cursor:
            params['cursor'] = cursor
        
        response = requests.get(f'{base_url}/users', params=params)
        data = response.json()
        
        users = data.get('data', [])
        if not users:  # No more results
            break
        
        all_users.extend(users)
        cursor = data.get('next_cursor')  # Get next cursor
        
        if not cursor:  # No more pages
            break
    
    return all_users

# Advantage: Efficient even with large datasets
# Disadvantage: More complex to implement
```

#### **3. Keyset Pagination (Best for large datasets)**

```
GET /users?after=john&limit=10
```

```python
def get_all_users_keyset(base_url, limit=10):
    """Fetch all users using keyset pagination"""
    all_users = []
    after_key = None
    
    while True:
        params = {'limit': limit}
        if after_key:
            params['after'] = after_key
        
        response = requests.get(f'{base_url}/users', params=params)
        users = response.json()
        
        if not users:
            break
        
        all_users.extend(users)
        after_key = users[-1]['id']  # Use last item's ID as cursor
    
    return all_users

# Most efficient for very large datasets
```

#### **4. Pagination Testing**

```python
import pytest
from src.api_client import APIClient

class TestPagination:
    """Test pagination scenarios"""
    
    @pytest.fixture
    def client(self):
        return APIClient('https://jsonplaceholder.typicode.com')
    
    def test_offset_pagination(self, client):
        """Test offset-based pagination"""
        page1 = client.get('/users', params={'_start': 0, '_limit': 5})
        page2 = client.get('/users', params={'_start': 5, '_limit': 5})
        
        assert len(page1) == 5
        assert len(page2) == 5
        assert page1[0]['id'] != page2[0]['id']
    
    def test_pagination_consistency(self, client):
        """Test pagination returns consistent data"""
        # Get all at once
        all_users = client.get('/users')
        
        # Get in pages
        paginated_users = []
        for i in range(0, 10, 3):
            page = client.get('/users', params={'_start': i, '_limit': 3})
            paginated_users.extend(page)
        
        # First N items should match
        assert all_users[:len(paginated_users)] == paginated_users
    
    def test_empty_page_handling(self, client):
        """Test handling of empty pagination results"""
        # Request beyond available data
        response = client.get('/users', params={'_start': 1000, '_limit': 10})
        
        assert isinstance(response, list)
        assert len(response) == 0
```

---

### **Part 14.3: Filtering and Sorting**

Advanced querying capabilities for APIs.

#### **1. Filtering Patterns**

```
Query filters:
GET /users?name=John
GET /users?age=30
GET /users?status=active&role=admin

Advanced filters:
GET /users?age[gte]=18&age[lte]=65  (Range)
GET /users?name[contains]=john     (Contains)
GET /users?status[in]=active,pending (In list)
```

```python
import requests

class FilterableAPIClient:
    """API client with advanced filtering"""
    
    def __init__(self, base_url):
        self.base_url = base_url
        self.session = requests.Session()
    
    def get_with_filter(self, endpoint, **filters):
        """GET with complex filtering"""
        # Flatten nested filter dictionaries
        params = {}
        for key, value in filters.items():
            if isinstance(value, dict):
                for op, val in value.items():
                    params[f'{key}[{op}]'] = val
            else:
                params[key] = value
        
        return self.session.get(
            f'{self.base_url}{endpoint}',
            params=params
        ).json()
    
    def get_users_by_age_range(self, min_age, max_age):
        """Get users within age range"""
        return self.get_with_filter(
            '/users',
            age={'gte': min_age, 'lte': max_age}
        )
    
    def get_active_admins(self):
        """Get active admin users"""
        return self.get_with_filter(
            '/users',
            status='active',
            role='admin'
        )

# Usage
client = FilterableAPIClient('https://api.example.com')
young_users = client.get_users_by_age_range(18, 35)
admins = client.get_active_admins()
```

#### **2. Sorting Patterns**

```
GET /users?sort=name
GET /users?sort=-name              (Descending)
GET /users?sort=age,name
GET /users?sort=-created_at        (Most recent first)
```

```python
def get_sorted_users(base_url, sort_by='name', descending=False):
    """Get users with sorting"""
    sort_param = f'-{sort_by}' if descending else sort_by
    
    response = requests.get(
        f'{base_url}/users',
        params={'sort': sort_param}
    )
    return response.json()

# Usage
# Ascending by name
users_asc = get_sorted_users('https://api.example.com', 'name')

# Descending by creation date
users_newest = get_sorted_users('https://api.example.com', 'created_at', True)
```

#### **3. Filter + Pagination + Sort (Complete)**

```python
class AdvancedAPIClient:
    """Complete advanced querying client"""
    
    def __init__(self, base_url):
        self.base_url = base_url
        self.session = requests.Session()
    
    def query(self, endpoint, filters=None, sort=None, page=1, limit=10):
        """Advanced query with filters, sort, and pagination"""
        params = {
            'page': page,
            'limit': limit
        }
        
        # Add filters
        if filters:
            for key, value in filters.items():
                if isinstance(value, dict):
                    for op, val in value.items():
                        params[f'{key}[{op}]'] = val
                else:
                    params[key] = value
        
        # Add sorting
        if sort:
            if isinstance(sort, list):
                params['sort'] = ','.join(sort)
            else:
                params['sort'] = sort
        
        return self.session.get(
            f'{self.base_url}{endpoint}',
            params=params
        ).json()

# Usage
client = AdvancedAPIClient('https://api.example.com')

# Get active users aged 18-65, sorted by name, page 2
users = client.query(
    '/users',
    filters={
        'status': 'active',
        'age': {'gte': 18, 'lte': 65}
    },
    sort=['name', '-created_at'],
    page=2,
    limit=20
)
```

---

### **Part 14.4: Rate Limiting & Throttling**

Managing API rate limits and handling throttling.

```python
import requests
import time
from typing import Optional

class RateLimitedClient:
    """API client with rate limit handling"""
    
    def __init__(self, base_url, requests_per_second=10):
        self.base_url = base_url
        self.session = requests.Session()
        self.requests_per_second = requests_per_second
        self.min_interval = 1.0 / requests_per_second
        self.last_request_time = 0
    
    def _wait_if_needed(self):
        """Respect rate limits"""
        elapsed = time.time() - self.last_request_time
        if elapsed < self.min_interval:
            time.sleep(self.min_interval - elapsed)
    
    def get(self, endpoint, **kwargs):
        """GET with rate limiting"""
        self._wait_if_needed()
        self.last_request_time = time.time()
        
        response = self.session.get(
            f'{self.base_url}{endpoint}',
            **kwargs
        )
        return response
    
    def handle_429(self, response):
        """Handle 429 Too Many Requests"""
        if response.status_code == 429:
            # Get retry-after header
            retry_after = response.headers.get('Retry-After', '60')
            wait_time = int(retry_after)
            
            print(f"Rate limited. Waiting {wait_time} seconds...")
            time.sleep(wait_time)
            
            # Retry request
            return True
        return False

# Usage
client = RateLimitedClient('https://api.example.com', requests_per_second=5)
for i in range(100):
    response = client.get(f'/users/{i}')
    if not response.ok:
        if client.handle_429(response):
            response = client.get(f'/users/{i}')  # Retry
```

---

## 🔨 **EXERCISE SESSION 1 (2 hours)**

### **Exercise 14.1: REST API Versioning & Advanced Querying**

**Objective:** Build versioned API client with filtering/pagination

**Task:**
```
1. Create versioned API client
2. Implement pagination (offset, cursor, keyset)
3. Build filtering system
4. Add sorting capabilities
5. Combine all features
6. Write comprehensive tests
```

**Solution:**

```python
# src/advanced_api_client.py
import requests
import time
from typing import Dict, List, Optional, Any
from enum import Enum

class PaginationType(Enum):
    """Pagination types"""
    OFFSET = "offset"
    CURSOR = "cursor"
    KEYSET = "keyset"

class AdvancedAPIClient:
    """Advanced API client with versioning, filtering, pagination"""
    
    def __init__(self, base_url: str, api_version: str = 'v1'):
        self.base_url = base_url
        self.api_version = api_version
        self.session = requests.Session()
        self.pagination_type = PaginationType.OFFSET
    
    def _get_url(self, endpoint: str) -> str:
        """Build versioned URL"""
        return f"{self.base_url}/{self.api_version}{endpoint}"
    
    def set_version(self, version: str):
        """Switch API version"""
        self.api_version = version
    
    def get(self, endpoint: str, **kwargs) -> Any:
        """GET request"""
        url = self._get_url(endpoint)
        response = self.session.get(url, **kwargs)
        response.raise_for_status()
        return response.json()
    
    def post(self, endpoint: str, **kwargs) -> Any:
        """POST request"""
        url = self._get_url(endpoint)
        response = self.session.post(url, **kwargs)
        response.raise_for_status()
        return response.json()
    
    def get_paginated(
        self,
        endpoint: str,
        pagination_type: PaginationType = PaginationType.OFFSET,
        limit: int = 10
    ) -> List[Any]:
        """Get all items with automatic pagination"""
        all_items = []
        
        if pagination_type == PaginationType.OFFSET:
            all_items = self._paginate_offset(endpoint, limit)
        elif pagination_type == PaginationType.CURSOR:
            all_items = self._paginate_cursor(endpoint, limit)
        elif pagination_type == PaginationType.KEYSET:
            all_items = self._paginate_keyset(endpoint, limit)
        
        return all_items
    
    def _paginate_offset(self, endpoint: str, limit: int) -> List[Any]:
        """Offset-based pagination"""
        all_items = []
        offset = 0
        
        while True:
            response = self.get(
                endpoint,
                params={'offset': offset, 'limit': limit}
            )
            
            if not response:
                break
            
            all_items.extend(response)
            offset += limit
        
        return all_items
    
    def _paginate_cursor(self, endpoint: str, limit: int) -> List[Any]:
        """Cursor-based pagination"""
        all_items = []
        cursor = None
        
        while True:
            params = {'limit': limit}
            if cursor:
                params['cursor'] = cursor
            
            response = self.get(endpoint, params=params)
            
            if isinstance(response, dict):
                items = response.get('data', [])
                cursor = response.get('next_cursor')
            else:
                items = response
                cursor = None
            
            if not items:
                break
            
            all_items.extend(items)
            if not cursor:
                break
        
        return all_items
    
    def _paginate_keyset(self, endpoint: str, limit: int) -> List[Any]:
        """Keyset-based pagination"""
        all_items = []
        after_key = None
        
        while True:
            params = {'limit': limit}
            if after_key:
                params['after'] = after_key
            
            response = self.get(endpoint, params=params)
            
            if not response:
                break
            
            all_items.extend(response)
            after_key = response[-1].get('id')
        
        return all_items
    
    def get_filtered(
        self,
        endpoint: str,
        filters: Dict[str, Any] = None,
        sort: Optional[str] = None,
        **pagination_params
    ) -> List[Any]:
        """GET with filtering, sorting, and pagination"""
        params = {}
        
        # Add filters
        if filters:
            for key, value in filters.items():
                if isinstance(value, dict):
                    for op, val in value.items():
                        params[f'{key}[{op}]'] = val
                else:
                    params[key] = value
        
        # Add sorting
        if sort:
            params['sort'] = sort
        
        # Add pagination
        params.update(pagination_params)
        
        response = self.get(endpoint, params=params)
        return response if isinstance(response, list) else response.get('data', [])

# tests/test_advanced_api.py
import pytest
from src.advanced_api_client import AdvancedAPIClient, PaginationType

class TestVersioning:
    """Test API versioning"""
    
    @pytest.fixture
    def client(self):
        return AdvancedAPIClient('https://jsonplaceholder.typicode.com')
    
    def test_version_switching(self, client):
        """Test switching between API versions"""
        client.set_version('v1')
        assert client.api_version == 'v1'
        
        client.set_version('v2')
        assert client.api_version == 'v2'
    
    def test_versioned_urls(self, client):
        """Test URL versioning"""
        url_v1 = client._get_url('/users')
        assert 'v1' in url_v1
        
        client.set_version('v2')
        url_v2 = client._get_url('/users')
        assert 'v2' in url_v2

class TestPagination:
    """Test pagination implementations"""
    
    @pytest.fixture
    def client(self):
        return AdvancedAPIClient('https://jsonplaceholder.typicode.com')
    
    def test_offset_pagination(self, client):
        """Test offset-based pagination"""
        client.pagination_type = PaginationType.OFFSET
        
        page1 = client.get('/users', params={'_start': 0, '_limit': 3})
        page2 = client.get('/users', params={'_start': 3, '_limit': 3})
        
        assert len(page1) == 3
        assert len(page2) == 3
        assert page1[0]['id'] != page2[0]['id']
    
    def test_pagination_continuity(self, client):
        """Test pagination returns continuous data"""
        all_users = client.get('/users')
        
        # Get in chunks
        chunk1 = client.get('/users', params={'_start': 0, '_limit': 5})
        chunk2 = client.get('/users', params={'_start': 5, '_limit': 5})
        
        combined = chunk1 + chunk2
        assert combined == all_users[:10]

class TestFiltering:
    """Test filtering and sorting"""
    
    @pytest.fixture
    def client(self):
        return AdvancedAPIClient('https://jsonplaceholder.typicode.com')
    
    def test_filtering(self, client):
        """Test basic filtering"""
        # JSONPlaceholder doesn't have actual filters, but test the mechanism
        params = {'userId': 1}
        posts = client.get('/posts', params=params)
        
        assert len(posts) > 0
        assert all(p['userId'] == 1 for p in posts)
    
    def test_get_filtered_helper(self, client):
        """Test filtering helper method"""
        posts = client.get_filtered(
            '/posts',
            filters={'userId': 1},
            _limit=5
        )
        
        assert len(posts) > 0
```

---

### **Exercise 14.2: Complete Advanced Query System**

**Objective:** Build production-ready advanced querying

**Task:**
```
1. Pagination (all types)
2. Filtering system
3. Sorting capabilities
4. Rate limiting
5. Response caching
6. Complete test suite
```

**Solution:**

```python
# src/query_builder.py
from typing import Dict, List, Optional, Any

class QueryBuilder:
    """Build complex queries"""
    
    def __init__(self):
        self.filters = {}
        self.sort_fields = []
        self.pagination = {}
    
    def add_filter(self, field: str, operator: str, value: Any):
        """Add filter condition"""
        if field not in self.filters:
            self.filters[field] = {}
        self.filters[field][operator] = value
        return self
    
    def add_sort(self, field: str, descending: bool = False):
        """Add sort field"""
        sort_field = f'-{field}' if descending else field
        self.sort_fields.append(sort_field)
        return self
    
    def set_pagination(self, offset: int = 0, limit: int = 10):
        """Set pagination"""
        self.pagination = {'offset': offset, 'limit': limit}
        return self
    
    def build(self) -> Dict[str, Any]:
        """Build query parameters"""
        params = {}
        
        # Add filters
        for field, operators in self.filters.items():
            for op, value in operators.items():
                key = f'{field}[{op}]' if op != 'eq' else field
                params[key] = value
        
        # Add sorting
        if self.sort_fields:
            params['sort'] = ','.join(self.sort_fields)
        
        # Add pagination
        params.update(self.pagination)
        
        return params

# Usage
query = (QueryBuilder()
    .add_filter('status', 'eq', 'active')
    .add_filter('age', 'gte', 18)
    .add_filter('age', 'lte', 65)
    .add_sort('name')
    .add_sort('created_at', descending=True)
    .set_pagination(offset=0, limit=20)
)

params = query.build()
# params: {
#   'status': 'active',
#   'age[gte]': 18,
#   'age[lte]': 65,
#   'sort': 'name,-created_at',
#   'offset': 0,
#   'limit': 20
# }
```

---

## 📚 **THEORY SESSION 2: GraphQL Fundamentals (2 hours)**

### **Part 14.5: GraphQL Basics**

GraphQL is a query language for APIs, an alternative to REST.

#### **Key Differences from REST:**

| REST | GraphQL |
|------|---------|
| Multiple endpoints | Single endpoint |
| Fixed data structure | Query-defined structure |
| Over/Under-fetching | Exactly what you need |
| Versioning required | No versioning needed |

#### **GraphQL Query Structure:**

```graphql
query {
  user(id: 1) {
    id
    name
    email
    posts {
      id
      title
      body
    }
  }
}
```

Response:
```json
{
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "posts": [
        {
          "id": 1,
          "title": "First Post",
          "body": "Content here"
        }
      ]
    }
  }
}
```

#### **GraphQL Query vs REST:**

```
REST:
GET /users/1                    # Get user
GET /users/1/posts              # Get user's posts
GET /posts/1                    # Get specific post details

GraphQL (single request):
query {
  user(id: 1) {
    id
    name
    posts {
      id
      title
      body
    }
  }
}
```

---

### **Part 14.6: GraphQL Query Testing with Python**

```bash
pip install requests
```

```python
import requests
import json

class GraphQLClient:
    """GraphQL API client"""
    
    def __init__(self, endpoint: str):
        self.endpoint = endpoint
        self.session = requests.Session()
    
    def query(self, query_string: str, variables: dict = None):
        """Execute GraphQL query"""
        payload = {
            'query': query_string
        }
        
        if variables:
            payload['variables'] = variables
        
        response = self.session.post(
            self.endpoint,
            json=payload,
            headers={'Content-Type': 'application/json'}
        )
        
        response.raise_for_status()
        return response.json()

# Example usage with real GraphQL endpoint
client = GraphQLClient('https://api.example.com/graphql')

# Simple query
query = """
query {
  users {
    id
    name
    email
  }
}
"""

result = client.query(query)
print(json.dumps(result, indent=2))
```

#### **GraphQL with Variables:**

```python
query_with_variables = """
query GetUser($userId: ID!) {
  user(id: $userId) {
    id
    name
    email
    posts {
      id
      title
    }
  }
}
"""

variables = {
    'userId': '1'
}

result = client.query(query_with_variables, variables)
```

#### **GraphQL Mutations (Create/Update/Delete):**

```python
mutation_create_user = """
mutation CreateUser($name: String!, $email: String!) {
  createUser(name: $name, email: $email) {
    id
    name
    email
    createdAt
  }
}
"""

variables = {
    'name': 'Jane Doe',
    'email': 'jane@example.com'
}

result = client.query(mutation_create_user, variables)
```

---

### **Part 14.7: Testing GraphQL Endpoints**

```python
import pytest
from src.graphql_client import GraphQLClient

class TestGraphQLAPI:
    """Test GraphQL endpoints"""
    
    @pytest.fixture
    def client(self):
        return GraphQLClient('https://graphql.example.com/')
    
    def test_simple_query(self, client):
        """Test basic query"""
        query = """
        query {
          users {
            id
            name
          }
        }
        """
        
        result = client.query(query)
        
        assert 'data' in result
        assert 'users' in result['data']
        assert isinstance(result['data']['users'], list)
    
    def test_query_with_variables(self, client):
        """Test query with variables"""
        query = """
        query GetUser($id: ID!) {
          user(id: $id) {
            id
            name
            email
          }
        }
        """
        
        variables = {'id': '1'}
        result = client.query(query, variables)
        
        assert 'data' in result
        assert result['data']['user']['id'] == '1'
    
    def test_query_nested_fields(self, client):
        """Test nested field querying"""
        query = """
        query {
          user(id: 1) {
            id
            name
            posts {
              id
              title
              comments {
                id
                body
              }
            }
          }
        }
        """
        
        result = client.query(query)
        
        user = result['data']['user']
        assert 'posts' in user
        assert len(user['posts']) > 0
        assert 'comments' in user['posts'][0]
    
    def test_mutation(self, client):
        """Test mutations (create/update)"""
        mutation = """
        mutation CreateUser($name: String!, $email: String!) {
          createUser(name: $name, email: $email) {
            id
            name
            email
          }
        }
        """
        
        variables = {
            'name': 'Test User',
            'email': 'test@example.com'
        }
        
        result = client.query(mutation, variables)
        
        assert 'data' in result
        assert result['data']['createUser']['name'] == 'Test User'
    
    def test_error_handling(self, client):
        """Test error handling"""
        # Invalid query
        invalid_query = """
        query {
          users {
            invalidField
          }
        }
        """
        
        result = client.query(invalid_query)
        
        # GraphQL returns 200 but has errors field
        if 'errors' in result:
            assert len(result['errors']) > 0
```

---

### **Part 14.8: GraphQL vs REST Comparison for Testing**

```python
# REST approach
class RestAPITest:
    def test_get_user_with_posts(self):
        # Multiple requests needed
        user = requests.get('https://api.example.com/v1/users/1').json()
        posts = requests.get(f'https://api.example.com/v1/users/{user["id"]}/posts').json()
        
        # Build response manually
        user['posts'] = posts
        return user

# GraphQL approach
class GraphQLAPITest:
    def test_get_user_with_posts(self):
        # Single request gets everything
        query = """
        query {
          user(id: 1) {
            id
            name
            posts {
              id
              title
            }
          }
        }
        """
        
        result = self.graphql_client.query(query)
        return result['data']['user']
```

---

## 🔨 **EXERCISE SESSION 2 (2 hours)**

### **Exercise 14.3: GraphQL API Testing Framework**

**Objective:** Build GraphQL testing client

**Task:**
```
1. Create GraphQL client
2. Implement queries and mutations
3. Test nested queries
4. Handle errors
5. Variable management
6. Caching responses
```

**Solution:**

```python
# src/graphql_client.py
import requests
import json
from typing import Dict, Any, Optional, List
from datetime import datetime, timedelta

class GraphQLClient:
    """Production-ready GraphQL client"""
    
    def __init__(self, endpoint: str, timeout: int = 30):
        self.endpoint = endpoint
        self.timeout = timeout
        self.session = requests.Session()
        self.cache = {}
        self.cache_ttl = 300  # 5 minutes
    
    def query(
        self,
        query_string: str,
        variables: Optional[Dict] = None,
        cache: bool = False
    ) -> Dict[str, Any]:
        """Execute GraphQL query"""
        
        # Check cache
        cache_key = self._make_cache_key(query_string, variables)
        if cache and cache_key in self.cache:
            cached_data, timestamp = self.cache[cache_key]
            if datetime.now() - timestamp < timedelta(seconds=self.cache_ttl):
                return cached_data
        
        # Build request
        payload = {'query': query_string}
        if variables:
            payload['variables'] = variables
        
        # Make request
        response = self.session.post(
            self.endpoint,
            json=payload,
            headers={'Content-Type': 'application/json'},
            timeout=self.timeout
        )
        
        response.raise_for_status()
        result = response.json()
        
        # Cache result
        if cache:
            self.cache[cache_key] = (result, datetime.now())
        
        # Check for errors
        if 'errors' in result:
            errors = result['errors']
            raise GraphQLError(f"GraphQL errors: {errors}")
        
        return result
    
    def _make_cache_key(self, query: str, variables: Optional[Dict]) -> str:
        """Generate cache key"""
        var_str = json.dumps(variables, sort_keys=True) if variables else ''
        return f"{hash(query + var_str)}"
    
    def query_builder(self) -> 'GraphQLQueryBuilder':
        """Get query builder"""
        return GraphQLQueryBuilder()

class GraphQLQueryBuilder:
    """Build GraphQL queries programmatically"""
    
    def __init__(self):
        self.fields = []
        self.variables = []
        self.name = 'Query'
    
    def add_field(self, field: str, **kwargs):
        """Add field to query"""
        self.fields.append((field, kwargs))
        return self
    
    def add_variable(self, name: str, type_str: str):
        """Add variable"""
        self.variables.append(f"${name}: {type_str}")
        return self
    
    def build(self) -> str:
        """Build query string"""
        query_parts = []
        
        if self.variables:
            vars_str = ', '.join(self.variables)
            query_parts.append(f"query({vars_str}) {{")
        else:
            query_parts.append("query {")
        
        for field, kwargs in self.fields:
            if kwargs:
                args = ', '.join(f"{k}: {v}" for k, v in kwargs.items())
                query_parts.append(f"  {field}({args}) {{")
            else:
                query_parts.append(f"  {field} {{")
            query_parts.append("    id")
            query_parts.append("    name")
            query_parts.append("  }")
        
        query_parts.append("}")
        
        return '\n'.join(query_parts)

class GraphQLError(Exception):
    """GraphQL error"""
    pass

# tests/test_graphql.py
import pytest
from src.graphql_client import GraphQLClient, GraphQLError

class TestGraphQLClient:
    """Test GraphQL client"""
    
    @pytest.fixture
    def client(self):
        # Using public GraphQL API
        return GraphQLClient('https://api.github.com/graphql')
    
    def test_query_execution(self, client):
        """Test basic query execution"""
        query = """
        query {
          viewer {
            login
            name
          }
        }
        """
        
        result = client.query(query)
        
        assert 'data' in result
        assert 'viewer' in result['data']
    
    def test_query_with_variables(self, client):
        """Test query with variables"""
        query = """
        query GetRepo($owner: String!, $name: String!) {
          repository(owner: $owner, name: $name) {
            name
            description
          }
        }
        """
        
        variables = {
            'owner': 'facebook',
            'name': 'react'
        }
        
        result = client.query(query, variables)
        
        assert 'data' in result
        assert result['data']['repository']['name'] == 'react'
    
    def test_query_caching(self, client):
        """Test response caching"""
        query = """
        query {
          viewer {
            login
          }
        }
        """
        
        # First call
        result1 = client.query(query, cache=True)
        
        # Second call (from cache)
        result2 = client.query(query, cache=True)
        
        assert result1 == result2
        assert len(client.cache) > 0
    
    def test_error_handling(self, client):
        """Test error handling"""
        # Invalid query
        invalid_query = """
        query {
          invalidField {
            id
          }
        }
        """
        
        with pytest.raises(GraphQLError):
            client.query(invalid_query)
```

---

### **Exercise 14.4: Combined REST + GraphQL Testing**

**Objective:** Test both REST and GraphQL APIs together

**Task:**
```
1. Hybrid client supporting both
2. Automatic fallback mechanism
3. Performance comparison
4. Response validation for both
5. Comprehensive test suite
```

**Solution:**

```python
# tests/test_rest_vs_graphql.py
import pytest
import time
from src.advanced_api_client import AdvancedAPIClient
from src.graphql_client import GraphQLClient

class TestRESTvsGraphQL:
    """Compare REST and GraphQL approaches"""
    
    @pytest.fixture
    def rest_client(self):
        return AdvancedAPIClient('https://jsonplaceholder.typicode.com')
    
    @pytest.fixture
    def graphql_client(self):
        return GraphQLClient('https://api.example.com/graphql')
    
    def test_rest_fetch_user_posts(self, rest_client):
        """Fetch user with posts using REST"""
        start = time.time()
        
        # REST approach: multiple requests
        user = rest_client.get('/users/1')
        posts = rest_client.get('/posts', params={'userId': 1})
        
        elapsed = time.time() - start
        
        # Combine manually
        data = {**user, 'posts': posts}
        
        assert 'id' in data
        assert 'posts' in data
        print(f"REST time: {elapsed:.3f}s")
    
    def test_graphql_fetch_user_posts(self, graphql_client):
        """Fetch user with posts using GraphQL"""
        start = time.time()
        
        # GraphQL approach: single request
        query = """
        query {
          user(id: 1) {
            id
            name
            email
            posts {
              id
              title
              body
            }
          }
        }
        """
        
        result = graphql_client.query(query)
        elapsed = time.time() - start
        
        data = result['data']['user']
        
        assert 'id' in data
        assert 'posts' in data
        print(f"GraphQL time: {elapsed:.3f}s")
    
    def test_response_equivalence(self, rest_client):
        """Ensure REST and GraphQL return equivalent data"""
        # REST
        user_rest = rest_client.get('/users/1')
        posts_rest = rest_client.get('/posts', params={'userId': 1})
        
        # Compare structure
        assert user_rest['id'] == 1
        assert all(p['userId'] == 1 for p in posts_rest)
        assert user_rest['name'] == user_rest['name']
```

---

## ❓ **Quiz: Advanced REST & GraphQL**

**Instructions:** Answer all 10 questions. Target score: 8/10 (80%)

### **Question 1: API Versioning**
Which versioning approach is most RESTful?
- A) Query parameter
- B) Header-based
- C) URL path ✅ **CORRECT**
- D) Subdomain

**Explanation:** URL path versioning is most RESTful and widely adopted.

---

### **Question 2: Pagination Types**
What's the advantage of cursor-based pagination?
- A) Simpler to implement
- B) Works with large datasets ✅ **CORRECT**
- C) Always fastest
- D) No disadvantages

**Explanation:** Cursor handles large datasets efficiently.

---

### **Question 3: Filtering**
How do you filter by age range in REST?
- A) `/users?age=18-65`
- B) `/users?age[gte]=18&age[lte]=65` ✅ **CORRECT**
- C) `/users/18/65`
- D) `/users?age_min=18&age_max=65`

**Explanation:** Bracket notation for operators is common.

---

### **Question 4: GraphQL Definition**
What is GraphQL primarily designed for?
- A) Replacing REST entirely
- B) Query language for APIs ✅ **CORRECT**
- C) Database technology
- D) Frontend framework

**Explanation:** GraphQL is a query language for flexible API requests.

---

### **Question 5: GraphQL vs REST**
What's a key advantage of GraphQL?
- A) Simpler than REST
- B) No versioning needed ✅ **CORRECT**
- C) Always faster
- D) Smaller responses

**Explanation:** GraphQL eliminates versioning through schema evolution.

---

### **Question 6: Over-fetching**
What is over-fetching in REST?
- A) Too many requests
- B) Getting unnecessary data ✅ **CORRECT**
- C) Large response size
- D) Server errors

**Explanation:** REST endpoints return all fields, GraphQL lets you specify.

---

### **Question 7: Rate Limiting**
How to handle 429 status?
- A) Retry immediately
- B) Use Retry-After header ✅ **CORRECT**
- C) Ignore and continue
- D) Switch endpoint

**Explanation:** Retry-After tells you when to retry.

---

### **Question 8: GraphQL Query**
GraphQL queries fetch:
- A) All fields always
- B) Only requested fields ✅ **CORRECT**
- C) Random subset
- D) Server-determined fields

**Explanation:** Client specifies exactly what data needed.

---

### **Question 9: Mutations**
GraphQL mutations are used for:
- A) Querying data
- B) Modifying data ✅ **CORRECT**
- C) Deleting schema
- D) Schema validation

**Explanation:** Mutations = CREATE/UPDATE/DELETE operations.

---

### **Question 10: Caching**
What makes GraphQL caching harder than REST?
- A) More data transferred
- B) Complex queries hard to cache ✅ **CORRECT**
- C) No caching possible
- D) Always cached

**Explanation:** Dynamic queries make HTTP caching difficult.

---

## ✅ **Quiz Answer Key**

| Q | Answer | Topic |
|---|--------|-------|
| 1 | C | API versioning |
| 2 | B | Cursor pagination |
| 3 | B | Range filtering |
| 4 | B | GraphQL definition |
| 5 | B | GraphQL advantage |
| 6 | B | Over-fetching |
| 7 | B | Rate limiting |
| 8 | B | GraphQL queries |
| 9 | B | Mutations |
| 10 | B | Caching difficulty |

**Your Score:** ___/10

**Interpretation:**
- 9-10: ✅ API architecture expert!
- 7-8: 🟡 Good understanding
- Below 7: 🔴 Review concepts

---

## 📋 **Daily Assignment**

### **Assignment 14.1: Production API Testing Framework**

**Objective:** Build comprehensive API testing framework

**Requirements:**
1. Versioned API client with v1, v2 support
2. All pagination types (offset, cursor, keyset)
3. Advanced filtering and sorting
4. Rate limiting handler
5. GraphQL client and testing
6. REST vs GraphQL comparison tests
7. Performance benchmarks
8. Complete documentation

**Deliverables:**
- `advanced_api_client.py` - Full implementation
- `graphql_client.py` - GraphQL support
- `query_builder.py` - Query building utilities
- `test_api_*.py` - 50+ test cases
- `requirements.txt` - Dependencies
- `README.md` - Complete guide
- Performance comparison report

---

## 🎯 **Daily Checklist**

Track your Day 14 progress:

- [ ] Reviewed Day 13 concepts
- [ ] Completed Theory Session 1 (REST Patterns)
- [ ] Completed Exercise 14.1 (Versioning & Pagination)
- [ ] Completed Exercise 14.2 (Advanced Querying)
- [ ] Completed Theory Session 2 (GraphQL)
- [ ] Completed Exercise 14.3 (GraphQL Framework)
- [ ] Completed Exercise 14.4 (REST vs GraphQL)
- [ ] Answered all 10 quiz questions
- [ ] Scored 80%+ on quiz (8/10)
- [ ] Completed Assignment 14.1
- [ ] Built versioned client
- [ ] Tested all pagination types
- [ ] Implemented GraphQL queries
- [ ] Created comparison tests
- [ ] Committed code to GitHub
- [ ] Updated learning journal

**Daily Metrics:**
- Quiz Score: ___/10
- Confidence Level (1-5): ___
- Time Spent: ___ hours
- Test cases created: ___ count
- API endpoints tested: ___ count
- Challenges Faced: _________________

---

## 📚 **Key Takeaways from Day 14**

1. **Versioning is essential** - Use URL path method
2. **Pagination matters** - Cursor best for large datasets
3. **Filtering/sorting scalable** - Use bracket notation
4. **Rate limiting must be handled** - Respect Retry-After
5. **GraphQL is powerful** - Single request for complex data
6. **No over-fetching in GraphQL** - Only needed data
7. **REST still dominant** - GraphQL emerging
8. **Caching harder with GraphQL** - Complex queries
9. **Hybrid approach best** - Support both patterns
10. **Testing both important** - Different strategies needed

---

## 🔗 **Resources for Review**

- [REST API Best Practices](https://restfulapi.net/)
- [GraphQL Official Docs](https://graphql.org/)
- [Pagination Patterns](https://www.keyset.com/blog/designing-graphql-pagination/)
- [Rate Limiting Guide](https://cloud.google.com/architecture/rate-limiting-strategies)
- [GraphQL Testing](https://www.apollographql.com/docs/apollo-server/testing/)

---

## 🚀 **Ready for Day 15?**

By completing Day 14, you've mastered:
- ✅ REST API versioning strategies
- ✅ Advanced pagination (offset, cursor, keyset)
- ✅ Filtering and sorting systems
- ✅ Rate limiting and throttling
- ✅ GraphQL fundamentals
- ✅ GraphQL queries and mutations
- ✅ Testing both REST and GraphQL
- ✅ Performance comparison
- ✅ Caching strategies
- ✅ Hybrid API testing

**Next (Day 15):** CI/CD Foundations & Jenkins Basics (Week 4 Begins)
- CI/CD principles and benefits
- Jenkins installation and setup
- Building pipelines
- Integrating automated tests
- Deployment strategies

---

## 📊 **Week 3 Final Progress**

```
Week 1          Week 2          Week 3          Week 4          Week 5
Foundation      Mastery         API Testing     Jenkins/DevOps  Cypress/Interview
Days 1-5        Days 6-11       Days 12-15      Days 16-20      Days 21-25
✅ 100%         ✅ 100%         ✅ 100%         🔜 Day 15       🔜 Final
                                               (0%)             Weeks

Overall: 14/25 Days Complete (56%)
```

---

**Congratulations on completing Week 3!** 🎉

You've mastered:
- ✅ Browser Automation (Week 2: Days 6-11)
- ✅ API Testing (Week 3: Days 12-15)

**Week 4 shifts to DevOps & CI/CD** - putting your automation into production pipelines!

---

*Last Updated: December 14, 2025*  
*Day 14 Complete Guide v1.0*  
*Week 3 Final Day - REST & GraphQL Mastery*