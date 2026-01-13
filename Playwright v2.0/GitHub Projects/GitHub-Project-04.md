# GitHub Portfolio Project 04: Advanced Test Automation Framework

## Project Duration
**Days 21-23 of the 25-day course**

## Project Overview

This is an **enterprise-grade, production-ready test automation framework** demonstrating advanced architectural patterns, database integration, custom reporting, and performance optimization. The project showcases professional-level automation engineering with scalable design patterns and DevOps best practices.

By completing this project, you'll showcase:
- Professional framework architecture with design patterns
- Database integration for complex test scenarios
- Custom test reporting and analytics
- Performance monitoring and optimization
- Error handling and recovery mechanisms
- Scalable, maintainable code organization
- Enterprise-level testing practices
- Senior-level automation engineering expertise

---

## Learning Objectives

By the end of this project, you will be able to:

1. **Advanced Architecture**
   - Implement Page Object Model at scale
   - Design singleton and factory patterns
   - Create observer pattern for listeners
   - Build modular, composable components
   - Implement dependency injection
   - Design for testability and maintainability

2. **Database Integration**
   - Connect to PostgreSQL/MySQL
   - Query and manipulate test data
   - Implement database transactions
   - Handle data cleanup and setup
   - Use connection pooling
   - Implement database assertions

3. **Custom Reporting**
   - Create custom HTML reports
   - Implement JSON report generation
   - Build test analytics dashboards
   - Track performance metrics
   - Generate trend analysis
   - Create executive summaries

4. **Performance Optimization**
   - Profile test execution
   - Identify bottlenecks
   - Optimize waits and selectors
   - Implement parallel execution
   - Cache frequently accessed data
   - Monitor resource usage

5. **Test Hooks & Lifecycle**
   - Implement before/after hooks
   - Create custom test context
   - Handle test data fixtures
   - Implement teardown procedures
   - Create health checks
   - Implement retry mechanisms

6. **Error Handling & Recovery**
   - Implement custom error classes
   - Create error recovery strategies
   - Log errors with context
   - Implement graceful degradation
   - Create failure reports
   - Implement self-healing tests

---

## Tech Stack

| Technology | Purpose | Version |
|---|---|---|
| **Playwright** | E2E Testing | ^1.40.0 |
| **TypeScript** | Type-Safe Language | ^5.3.0 |
| **PostgreSQL** | Test Data Database | 15+ |
| **node-postgres** | Database Client | ^8.10.0 |
| **Jest** | Testing Framework | ^29.0.0 |
| **Pino** | Logging | ^8.14.0 |
| **Axios** | HTTP Client | ^1.6.0 |

---

## Project Structure

```
automation-testing-portfolio/
├── project-4-advanced-framework/
│   ├── README.md                         # Project documentation
│   ├── package.json                      # Dependencies
│   ├── tsconfig.json                     # TypeScript config
│   ├── playwright.config.ts              # Playwright config
│   │
│   ├── src/
│   │   ├── core/
│   │   │   ├── BaseTest.ts               # Base test class
│   │   │   ├── TestContext.ts            # Test context holder
│   │   │   └── Logger.ts                 # Logging utility
│   │   │
│   │   ├── pages/
│   │   │   ├── BasePage.ts               # Page base class
│   │   │   ├── LoginPage.ts              # Login page object
│   │   │   ├── DashboardPage.ts          # Dashboard page object
│   │   │   └── index.ts                  # Page exports
│   │   │
│   │   ├── database/
│   │   │   ├── DatabaseClient.ts         # DB connection client
│   │   │   ├── migrations/
│   │   │   │   └── init.sql              # Database schema
│   │   │   └── repositories/
│   │   │       ├── UserRepository.ts
│   │   │       ├── OrderRepository.ts
│   │   │       └── ProductRepository.ts
│   │   │
│   │   ├── utils/
│   │   │   ├── TestDataFactory.ts        # Test data creation
│   │   │   ├── ApiClient.ts              # HTTP client
│   │   │   ├── helpers.ts                # Helper functions
│   │   │   └── decorators.ts             # Decorators
│   │   │
│   │   ├── reporters/
│   │   │   ├── CustomReporter.ts         # Custom reporter
│   │   │   ├── PerformanceReporter.ts    # Performance metrics
│   │   │   ├── HtmlReporter.ts           # HTML report generator
│   │   │   └── DashboardReporter.ts      # Dashboard integration
│   │   │
│   │   ├── hooks/
│   │   │   ├── TestHooks.ts              # Test lifecycle hooks
│   │   │   └── FixtureManager.ts         # Fixture management
│   │   │
│   │   ├── errors/
│   │   │   ├── CustomError.ts            # Custom error classes
│   │   │   ├── ErrorHandler.ts           # Error handling
│   │   │   └── ErrorRecovery.ts          # Recovery strategies
│   │   │
│   │   ├── patterns/
│   │   │   ├── Singleton.ts              # Singleton pattern
│   │   │   ├── Factory.ts                # Factory pattern
│   │   │   ├── Observer.ts               # Observer pattern
│   │   │   └── Strategy.ts               # Strategy pattern
│   │   │
│   │   └── config/
│   │       ├── config.ts                 # Main config
│   │       ├── environments/
│   │       │   ├── dev.ts
│   │       │   ├── staging.ts
│   │       │   └── prod.ts
│   │       └── constants.ts              # App constants
│   │
│   ├── tests/
│   │   ├── e2e/
│   │   │   ├── login.spec.ts
│   │   │   ├── dashboard.spec.ts
│   │   │   └── checkout.spec.ts
│   │   │
│   │   ├── fixtures.ts                   # Test fixtures
│   │   └── setup.ts                      # Test setup
│   │
│   ├── __tests__/
│   │   ├── unit/
│   │   │   └── helpers.test.ts
│   │   └── integration/
│   │       └── database.test.ts
│   │
│   ├── reports/                          # Generated reports
│   ├── logs/                             # Log files
│   └── docs/
│       ├── ARCHITECTURE.md
│       ├── PATTERNS.md
│       └── PERFORMANCE.md
```

---

## Complete Code Implementation

### 1. src/core/BaseTest.ts

```typescript
/**
 * Base test class with lifecycle management and context
 */

import { test as base, expect } from '@playwright/test';
import { Logger } from './Logger';
import { TestContext } from './TestContext';
import { DatabaseClient } from '../database/DatabaseClient';

export class BaseTest {
  protected logger: Logger;
  protected testContext: TestContext;
  protected database: DatabaseClient;

  constructor(testName: string) {
    this.logger = new Logger(testName);
    this.testContext = new TestContext(testName);
    this.database = new DatabaseClient();
  }

  /**
   * Setup test - runs before each test
   */
  async setup(): Promise<void> {
    this.logger.info('Setting up test...');
    
    // Connect to database
    await this.database.connect();
    
    // Clear test data
    await this.clearTestData();
    
    // Setup fixtures
    await this.setupFixtures();
    
    this.logger.info('Test setup complete');
  }

  /**
   * Teardown test - runs after each test
   */
  async teardown(): Promise<void> {
    this.logger.info('Tearing down test...');
    
    try {
      // Cleanup test data
      await this.cleanup();
      
      // Close connections
      await this.database.close();
      
      // Generate reports
      await this.generateReport();
    } catch (error) {
      this.logger.error('Error during teardown', error);
      throw error;
    }
    
    this.logger.info('Test teardown complete');
  }

  /**
   * Clear test data from database
   */
  protected async clearTestData(): Promise<void> {
    const testDataIds = this.testContext.getTestDataIds();
    
    for (const id of testDataIds) {
      await this.database.query('DELETE FROM test_data WHERE id = $1', [id]);
    }
  }

  /**
   * Setup test fixtures
   */
  protected async setupFixtures(): Promise<void> {
    // Override in subclasses
  }

  /**
   * Cleanup after test
   */
  protected async cleanup(): Promise<void> {
    // Override in subclasses
  }

  /**
   * Generate test report
   */
  protected async generateReport(): Promise<void> {
    // Override in subclasses
  }

  /**
   * Track test data for cleanup
   */
  protected trackTestData(id: string): void {
    this.testContext.addTestDataId(id);
  }

  /**
   * Get test logger
   */
  getLogger(): Logger {
    return this.logger;
  }

  /**
   * Get test context
   */
  getContext(): TestContext {
    return this.testContext;
  }

  /**
   * Get database client
   */
  getDatabase(): DatabaseClient {
    return this.database;
  }
}

/**
 * Playwright test wrapper
 */
export const test = base.extend<{ baseTest: BaseTest }>({
  baseTest: async ({ }, use) => {
    const baseTest = new BaseTest('DefaultTest');
    await baseTest.setup();
    
    await use(baseTest);
    
    await baseTest.teardown();
  },
});

export { expect };
```

### 2. src/core/TestContext.ts

```typescript
/**
 * Test context holder for sharing data across test lifecycle
 */

export class TestContext {
  private testName: string;
  private testDataIds: Set<string> = new Set();
  private contextData: Map<string, any> = new Map();
  private startTime: number;
  private metadata: Record<string, any> = {};

  constructor(testName: string) {
    this.testName = testName;
    this.startTime = Date.now();
  }

  /**
   * Get test name
   */
  getTestName(): string {
    return this.testName;
  }

  /**
   * Add test data ID for cleanup
   */
  addTestDataId(id: string): void {
    this.testDataIds.add(id);
  }

  /**
   * Get all test data IDs
   */
  getTestDataIds(): string[] {
    return Array.from(this.testDataIds);
  }

  /**
   * Store context data
   */
  setData(key: string, value: any): void {
    this.contextData.set(key, value);
  }

  /**
   * Get context data
   */
  getData(key: string): any {
    return this.contextData.get(key);
  }

  /**
   * Get test duration
   */
  getDuration(): number {
    return Date.now() - this.startTime;
  }

  /**
   * Set metadata
   */
  setMetadata(key: string, value: any): void {
    this.metadata[key] = value;
  }

  /**
   * Get metadata
   */
  getMetadata(): Record<string, any> {
    return { ...this.metadata };
  }

  /**
   * Get full context summary
   */
  getSummary(): object {
    return {
      testName: this.testName,
      duration: this.getDuration(),
      metadata: this.getMetadata(),
      testDataCount: this.testDataIds.size,
    };
  }
}
```

### 3. src/core/Logger.ts

```typescript
/**
 * Application logger with context awareness
 */

import * as fs from 'fs';
import * as path from 'path';

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

export class Logger {
  private testName: string;
  private logDir: string;
  private logFile: string;

  constructor(testName: string) {
    this.testName = testName;
    this.logDir = path.join(process.cwd(), 'logs');
    this.logFile = path.join(this.logDir, `${testName}-${Date.now()}.log`);
    
    // Create log directory
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  /**
   * Log message with level
   */
  private log(level: LogLevel, message: string, data?: any): void {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] [${level}] [${this.testName}] ${message}`;
    
    // Console output
    console.log(logEntry, data || '');
    
    // File output
    const fullEntry = data ? `${logEntry} ${JSON.stringify(data)}` : logEntry;
    fs.appendFileSync(this.logFile, fullEntry + '\n');
  }

  debug(message: string, data?: any): void {
    this.log(LogLevel.DEBUG, message, data);
  }

  info(message: string, data?: any): void {
    this.log(LogLevel.INFO, message, data);
  }

  warn(message: string, data?: any): void {
    this.log(LogLevel.WARN, message, data);
  }

  error(message: string, error?: any): void {
    this.log(LogLevel.ERROR, message, error);
  }

  /**
   * Get log file path
   */
  getLogFile(): string {
    return this.logFile;
  }
}
```

### 4. src/database/DatabaseClient.ts

```typescript
/**
 * PostgreSQL database client with connection pooling
 */

import { Pool, PoolClient } from 'pg';
import { Logger } from '../core/Logger';

export class DatabaseClient {
  private pool: Pool;
  private logger: Logger;
  private client: PoolClient | null = null;

  constructor() {
    this.logger = new Logger('DatabaseClient');
    
    this.pool = new Pool({
      user: process.env.DB_USER || 'testuser',
      password: process.env.DB_PASSWORD || 'testpass',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      database: process.env.DB_NAME || 'testdb',
      max: 10,
      min: 2,
    });

    this.pool.on('error', (error) => {
      this.logger.error('Pool error', error);
    });
  }

  /**
   * Connect to database
   */
  async connect(): Promise<void> {
    try {
      this.client = await this.pool.connect();
      this.logger.info('Connected to database');
    } catch (error) {
      this.logger.error('Failed to connect to database', error);
      throw error;
    }
  }

  /**
   * Execute query
   */
  async query<T = any>(
    text: string,
    values?: any[]
  ): Promise<{ rows: T[]; rowCount: number }> {
    if (!this.client) {
      throw new Error('Database client not connected');
    }

    try {
      const result = await this.client.query(text, values);
      this.logger.debug('Query executed', { text, rowCount: result.rowCount });
      return { rows: result.rows, rowCount: result.rowCount || 0 };
    } catch (error) {
      this.logger.error('Query execution error', { text, error });
      throw error;
    }
  }

  /**
   * Start transaction
   */
  async beginTransaction(): Promise<void> {
    await this.query('BEGIN');
    this.logger.info('Transaction started');
  }

  /**
   * Commit transaction
   */
  async commit(): Promise<void> {
    await this.query('COMMIT');
    this.logger.info('Transaction committed');
  }

  /**
   * Rollback transaction
   */
  async rollback(): Promise<void> {
    await this.query('ROLLBACK');
    this.logger.info('Transaction rolled back');
  }

  /**
   * Close connection
   */
  async close(): Promise<void> {
    if (this.client) {
      this.client.release();
      this.logger.info('Connection released');
    }
    await this.pool.end();
    this.logger.info('Database pool closed');
  }

  /**
   * Check database health
   */
  async healthCheck(): Promise<boolean> {
    try {
      const result = await this.query('SELECT 1');
      return result.rows.length > 0;
    } catch (error) {
      this.logger.error('Health check failed', error);
      return false;
    }
  }

  /**
   * Get database statistics
   */
  async getStats(): Promise<any> {
    const result = await this.query(
      `SELECT 
        table_name,
        pg_size_pretty(pg_total_relation_size(table_name)) as size,
        (SELECT count(*) FROM information_schema.columns WHERE table_name = t.table_name) as columns
      FROM information_schema.tables t
      WHERE table_schema = 'public'`
    );
    return result.rows;
  }
}
```

### 5. src/database/repositories/UserRepository.ts

```typescript
/**
 * User repository for data access
 */

import { DatabaseClient } from '../DatabaseClient';

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  created_at: Date;
}

export class UserRepository {
  constructor(private database: DatabaseClient) {}

  /**
   * Create user
   */
  async create(email: string, name: string, role: string = 'user'): Promise<User> {
    const result = await this.database.query<User>(
      `INSERT INTO users (email, name, role, created_at) 
       VALUES ($1, $2, $3, NOW()) 
       RETURNING *`,
      [email, name, role]
    );

    if (result.rows.length === 0) {
      throw new Error('Failed to create user');
    }

    return result.rows[0];
  }

  /**
   * Find user by email
   */
  async findByEmail(email: string): Promise<User | null> {
    const result = await this.database.query<User>(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    return result.rows.length > 0 ? result.rows[0] : null;
  }

  /**
   * Find user by ID
   */
  async findById(id: string): Promise<User | null> {
    const result = await this.database.query<User>(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );

    return result.rows.length > 0 ? result.rows[0] : null;
  }

  /**
   * Update user
   */
  async update(id: string, updates: Partial<User>): Promise<User> {
    const setClause = Object.keys(updates)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(', ');

    const values = [id, ...Object.values(updates)];

    const result = await this.database.query<User>(
      `UPDATE users SET ${setClause} WHERE id = $1 RETURNING *`,
      values
    );

    if (result.rows.length === 0) {
      throw new Error('User not found');
    }

    return result.rows[0];
  }

  /**
   * Delete user
   */
  async delete(id: string): Promise<void> {
    await this.database.query('DELETE FROM users WHERE id = $1', [id]);
  }

  /**
   * Get all users
   */
  async findAll(): Promise<User[]> {
    const result = await this.database.query<User>('SELECT * FROM users');
    return result.rows;
  }

  /**
   * Count users
   */
  async count(): Promise<number> {
    const result = await this.database.query<{ count: number }>(
      'SELECT COUNT(*) as count FROM users'
    );
    return parseInt(result.rows[0].count as any, 10);
  }
}
```

### 6. src/reporters/CustomReporter.ts

```typescript
/**
 * Custom test reporter with metrics and analytics
 */

import * as fs from 'fs';
import * as path from 'path';
import { Reporter, TestCase, TestResult, FullResult } from '@playwright/test/reporter';

interface TestMetrics {
  name: string;
  status: string;
  duration: number;
  timestamp: string;
  retries: number;
  attachments: number;
}

export class CustomReporter implements Reporter {
  private metrics: TestMetrics[] = [];
  private reportDir: string;
  private startTime: number = Date.now();

  constructor() {
    this.reportDir = path.join(process.cwd(), 'reports');
    if (!fs.existsSync(this.reportDir)) {
      fs.mkdirSync(this.reportDir, { recursive: true });
    }
  }

  /**
   * Called when test ends
   */
  onTestEnd(test: TestCase, result: TestResult): void {
    this.metrics.push({
      name: test.title,
      status: result.status,
      duration: result.duration,
      timestamp: new Date().toISOString(),
      retries: result.retry,
      attachments: result.attachments.length,
    });
  }

  /**
   * Called when test suite ends
   */
  async onEnd(result: FullResult): Promise<void> {
    const duration = Date.now() - this.startTime;
    const passed = this.metrics.filter(m => m.status === 'passed').length;
    const failed = this.metrics.filter(m => m.status === 'failed').length;
    const skipped = this.metrics.filter(m => m.status === 'skipped').length;

    const report = {
      timestamp: new Date().toISOString(),
      duration: duration,
      summary: {
        total: this.metrics.length,
        passed,
        failed,
        skipped,
        passRate: ((passed / this.metrics.length) * 100).toFixed(2),
      },
      tests: this.metrics,
      status: result.status,
    };

    // Write JSON report
    const jsonFile = path.join(this.reportDir, `report-${Date.now()}.json`);
    fs.writeFileSync(jsonFile, JSON.stringify(report, null, 2));

    // Write HTML report
    this.generateHtmlReport(report);

    console.log(`\n✓ Report generated: ${jsonFile}`);
  }

  /**
   * Generate HTML report
   */
  private generateHtmlReport(report: any): void {
    const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Test Report</title>
  <style>
    body { font-family: Arial; margin: 20px; }
    .summary { padding: 20px; background: #f5f5f5; border-radius: 5px; }
    .passed { color: #28a745; }
    .failed { color: #dc3545; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    th, td { padding: 10px; text-align: left; border: 1px solid #ddd; }
    th { background: #f8f9fa; }
  </style>
</head>
<body>
  <h1>Test Execution Report</h1>
  <div class="summary">
    <h2>Summary</h2>
    <p><strong>Total:</strong> ${report.summary.total}</p>
    <p class="passed"><strong>Passed:</strong> ${report.summary.passed}</p>
    <p class="failed"><strong>Failed:</strong> ${report.summary.failed}</p>
    <p><strong>Skipped:</strong> ${report.summary.skipped}</p>
    <p><strong>Pass Rate:</strong> ${report.summary.passRate}%</p>
    <p><strong>Duration:</strong> ${(report.duration / 1000).toFixed(2)}s</p>
  </div>
  <table>
    <thead>
      <tr>
        <th>Test Name</th>
        <th>Status</th>
        <th>Duration (ms)</th>
        <th>Retries</th>
      </tr>
    </thead>
    <tbody>
      ${report.tests.map((test: TestMetrics) => `
        <tr>
          <td>${test.name}</td>
          <td class="${test.status}">${test.status}</td>
          <td>${test.duration}</td>
          <td>${test.retries}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>
</body>
</html>
    `;

    const htmlFile = path.join(this.reportDir, `report-${Date.now()}.html`);
    fs.writeFileSync(htmlFile, html);
  }
}
```

### 7. src/patterns/Singleton.ts

```typescript
/**
 * Singleton pattern implementation
 */

export class Singleton<T> {
  private static instances: Map<any, any> = new Map();

  /**
   * Get singleton instance
   */
  static getInstance<T>(constructor: new () => T): T {
    if (!Singleton.instances.has(constructor)) {
      Singleton.instances.set(constructor, new constructor());
    }
    return Singleton.instances.get(constructor);
  }

  /**
   * Clear singleton instance (for testing)
   */
  static clearInstance<T>(constructor: new () => T): void {
    Singleton.instances.delete(constructor);
  }

  /**
   * Clear all instances
   */
  static clearAll(): void {
    Singleton.instances.clear();
  }
}

/**
 * Example usage:
 * class MyService {
 *   private data = 'shared across app';
 * }
 * 
 * const service1 = Singleton.getInstance(MyService);
 * const service2 = Singleton.getInstance(MyService);
 * console.log(service1 === service2); // true
 */
```

### 8. src/patterns/Factory.ts

```typescript
/**
 * Factory pattern for object creation
 */

export interface TestDataFactory {
  create(): any;
}

export class UserFactory implements TestDataFactory {
  private counter = 0;

  create() {
    this.counter++;
    return {
      email: `user${this.counter}@example.com`,
      name: `Test User ${this.counter}`,
      password: 'SecurePassword123!',
      role: 'user',
    };
  }
}

export class ProductFactory implements TestDataFactory {
  private counter = 0;

  create() {
    this.counter++;
    return {
      name: `Product ${this.counter}`,
      price: 99.99 * this.counter,
      stock: 100 + this.counter,
      category: 'electronics',
    };
  }
}

export class OrderFactory implements TestDataFactory {
  private userFactory = new UserFactory();
  private productFactory = new ProductFactory();

  create() {
    return {
      user: this.userFactory.create(),
      items: [this.productFactory.create(), this.productFactory.create()],
      total: 199.98,
      status: 'pending',
    };
  }
}

/**
 * Factory Registry
 */
export class FactoryRegistry {
  private factories: Map<string, TestDataFactory> = new Map();

  register(name: string, factory: TestDataFactory): void {
    this.factories.set(name, factory);
  }

  create(name: string): any {
    const factory = this.factories.get(name);
    if (!factory) {
      throw new Error(`Factory '${name}' not found`);
    }
    return factory.create();
  }
}
```

### 9. src/patterns/Observer.ts

```typescript
/**
 * Observer pattern for event handling
 */

export interface Observer {
  update(event: Event): void;
}

export interface Event {
  type: string;
  data?: any;
}

export class EventEmitter {
  private observers: Map<string, Observer[]> = new Map();

  /**
   * Subscribe to event
   */
  subscribe(eventType: string, observer: Observer): void {
    if (!this.observers.has(eventType)) {
      this.observers.set(eventType, []);
    }
    this.observers.get(eventType)!.push(observer);
  }

  /**
   * Unsubscribe from event
   */
  unsubscribe(eventType: string, observer: Observer): void {
    const observers = this.observers.get(eventType);
    if (observers) {
      const index = observers.indexOf(observer);
      if (index > -1) {
        observers.splice(index, 1);
      }
    }
  }

  /**
   * Emit event
   */
  emit(event: Event): void {
    const observers = this.observers.get(event.type) || [];
    observers.forEach(observer => observer.update(event));
  }

  /**
   * Get observer count
   */
  getObserverCount(eventType: string): number {
    return this.observers.get(eventType)?.length || 0;
  }
}

/**
 * Example Observer Implementation
 */
export class TestEventLogger implements Observer {
  update(event: Event): void {
    console.log(`[${event.type}] ${JSON.stringify(event.data)}`);
  }
}

export class TestEventAnalytics implements Observer {
  private metrics: Map<string, number> = new Map();

  update(event: Event): void {
    const count = this.metrics.get(event.type) || 0;
    this.metrics.set(event.type, count + 1);
  }

  getMetrics(): object {
    return Object.fromEntries(this.metrics);
  }
}
```

### 10. tests/e2e/login.spec.ts

```typescript
/**
 * Login flow tests using advanced framework
 */

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { DashboardPage } from '../../src/pages/DashboardPage';
import { UserRepository } from '../../src/database/repositories/UserRepository';
import { DatabaseClient } from '../../src/database/DatabaseClient';
import { UserFactory } from '../../src/patterns/Factory';
import { BaseTest } from '../../src/core/BaseTest';

test.describe('Login Tests with Advanced Framework', () => {
  let database: DatabaseClient;
  let userRepository: UserRepository;
  let userFactory: UserFactory;

  test.beforeAll(async () => {
    database = new DatabaseClient();
    await database.connect();
    userRepository = new UserRepository(database);
    userFactory = new UserFactory();
  });

  test.afterAll(async () => {
    await database.close();
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    // Arrange
    const userData = userFactory.create();
    const user = await userRepository.create(userData.email, userData.name);

    // Act
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
    await loginPage.login(userData.email, userData.password);

    // Assert
    const dashboardPage = new DashboardPage(page);
    expect(await dashboardPage.isUserGreetingVisible()).toBeTruthy();

    // Cleanup
    await userRepository.delete(user.id);
  });

  test('should fail with invalid credentials', async ({ page }) => {
    // Act
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
    await loginPage.login('invalid@example.com', 'wrongpassword');

    // Assert
    expect(await loginPage.isErrorDisplayed()).toBeTruthy();
  });

  test('should handle session timeout', async ({ page }) => {
    // Arrange
    const userData = userFactory.create();
    await userRepository.create(userData.email, userData.name);

    // Act
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
    await loginPage.login(userData.email, userData.password);

    // Simulate session timeout
    await page.context().clearCookies();

    // Try to access dashboard
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.navigateToDashboard();

    // Assert - should redirect to login
    expect(page.url()).toContain('login');
  });
});
```

### 11. package.json

```json
{
  "name": "advanced-test-framework",
  "version": "1.0.0",
  "description": "Enterprise-grade test automation framework",
  "scripts": {
    "test": "playwright test",
    "test:debug": "playwright test --debug",
    "test:report": "playwright show-report",
    "lint": "eslint src --ext .ts",
    "build": "tsc",
    "db:migrate": "node scripts/migrate.js",
    "db:seed": "node scripts/seed.js"
  },
  "devDependencies": {
    "@playwright/test": "^1.40.0",
    "@types/node": "^20.0.0",
    "typescript": "^5.3.0",
    "ts-node": "^10.9.0",
    "pg": "^8.10.0"
  },
  "dependencies": {
    "axios": "^1.6.1",
    "pino": "^8.14.0"
  }
}
```

---

## Project Exercise Assignments

### Day 21: Framework Architecture
1. Implement BaseTest and TestContext classes
2. Create Logger with file output
3. Design Page Object structure
4. Create custom error classes
5. Implement test fixtures

**Expected Output:** Working base framework with logging and context management

### Day 22: Database Integration & Patterns
1. Implement DatabaseClient with connection pooling
2. Create User/Product/Order repositories
3. Implement Factory pattern
4. Implement Singleton pattern
5. Create data access layer

**Expected Output:** Database integration complete with repositories and patterns

### Day 23: Reporting & Performance
1. Create custom reporter
2. Implement performance tracking
3. Generate HTML reports
4. Create analytics dashboard
5. Implement error recovery

**Expected Output:** Enterprise-level reporting with performance metrics

---

## MCQs - Test Your Knowledge

### Question 1: Design Patterns
What is the primary benefit of the Factory pattern?
- A) Encapsulates object creation
- B) Ensures single instance
- C) Handles events
- **D) Both A and B**

**Answer: A** - Factory encapsulates object creation logic.

### Question 2: Database Transactions
Which command starts a database transaction?
- A) COMMIT
- B) ROLLBACK
- C) BEGIN
- **D) EXECUTE**

**Answer: C** - BEGIN starts a transaction.

### Question 3: Observer Pattern
What does the Observer pattern manage?
- A) Object creation
- B) One-to-many relationships for events
- C) Database connections
- **D) Test reporting**

**Answer: B** - Observer manages one-to-many event relationships.

### Question 4: Connection Pooling
What is the benefit of connection pooling?
- A) Reuses database connections
- B) Improves performance
- C) Reduces resource overhead
- **D) All of the above**

**Answer: D** - All benefits listed.

### Question 5: Custom Reporters
When should custom reporters generate reports?
- A) At test start
- B) During each test
- C) **At test suite end**
- D) Never

**Answer: C** - Reports generated after all tests complete.

---

## README.md Template

```markdown
# Project 4: Advanced Test Automation Framework

## Overview
Enterprise-grade automation framework with advanced patterns, database integration, and custom reporting.

## Features
- ✅ Design patterns (Factory, Singleton, Observer)
- ✅ Database integration with PostgreSQL
- ✅ Custom HTML/JSON reporting
- ✅ Performance monitoring
- ✅ Error handling and recovery
- ✅ Test lifecycle management

## Architecture
- Core test infrastructure
- Page Object Model at scale
- Database repositories
- Custom reporters
- Design patterns implementation

## Setup
\`\`\`bash
npm install
npm run db:migrate
npm test
\`\`\`

## Key Components
- BaseTest - Test lifecycle management
- DatabaseClient - Connection pooling
- Repositories - Data access layer
- Reporters - Custom reporting
- Patterns - Design pattern implementations
```

---

## GitHub Commit Strategy

```bash
git add .
git commit -m "Project 4: Add base test class and test context"
git commit -m "Project 4: Implement database client and repositories"
git commit -m "Project 4: Create design patterns implementations"
git commit -m "Project 4: Add custom reporters"
git commit -m "Project 4: Implement test hooks and lifecycle"
git commit -m "Project 4: Add comprehensive documentation"
git push origin main
```

---

## Career Value & Interview Points

### What This Project Demonstrates

1. **Architecture & Design**
   - "I designed scalable framework using SOLID principles and design patterns."

2. **Database Skills**
   - "I implemented database integration with connection pooling and repositories."

3. **Enterprise Patterns**
   - "I implemented Factory, Singleton, and Observer patterns for production use."

4. **Performance Optimization**
   - "I created performance monitoring and optimized test execution."

5. **Senior-Level Thinking**
   - "I built extensible framework for enterprise-scale test automation."

---

**Project Status:** Ready to Build
**Last Updated:** December 2025
**Difficulty Level:** Advanced (Senior)
**Time Required:** 40-50 hours
**GitHub Visibility:** Public Portfolio Project

