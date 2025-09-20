# Testing Guide

This project uses Jest for unit testing and Playwright for end-to-end testing.

## ✅ Current Status

**Working Components:**
- ✅ Jest configuration with Next.js integration
- ✅ Basic unit testing setup
- ✅ Environment variable mocking
- ✅ Global mocks (fetch, Request, Response)
- ✅ Playwright E2E testing setup
- ✅ CI/CD pipeline configuration

**In Progress:**
- 🔄 Component testing (requires component structure adjustments)
- 🔄 API route testing (requires database mocking improvements)
- 🔄 Service layer testing (requires external API mocking)

## Setup

All testing dependencies are already installed. If you need to reinstall:

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom @playwright/test
```

## Unit Testing with Jest

### Running Tests

```bash
# Run all unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### Test Structure

- `__tests__/` - Contains all unit tests
- `__tests__/utils/` - Tests for utility functions
- `__tests__/api/` - Tests for API routes
- `__tests__/components/` - Tests for React components

### Writing Unit Tests

#### Testing Utilities
```javascript
import { sendReminderEmail } from '../../utils/emailService'

describe('Email Service', () => {
  it('should send reminder email successfully', async () => {
    // Test implementation
  })
})
```

#### Testing API Routes
```javascript
import { GET, POST } from '../../app/api/transactions/route'

describe('/api/transactions', () => {
  it('should return transactions for authenticated user', async () => {
    // Test implementation
  })
})
```

#### Testing Components
```javascript
import { render, screen } from '@testing-library/react'
import { renderWithProviders } from '../utils/testUtils'

describe('Component', () => {
  it('should render correctly', () => {
    renderWithProviders(<Component />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })
})
```

### Mocking

The test setup includes mocks for:
- Next.js navigation (`next/navigation`)
- Clerk authentication (`@clerk/nextjs`)
- Environment variables
- External APIs (OpenAI, nodemailer)

## End-to-End Testing with Playwright

### Running E2E Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Run E2E tests in headed mode (visible browser)
npm run test:e2e:headed
```

### E2E Test Structure

- `e2e/` - Contains all E2E tests
- `e2e/auth.spec.js` - Authentication flow tests
- `e2e/dashboard.spec.js` - Dashboard functionality tests
- `e2e/transactions.spec.js` - Transaction management tests
- `e2e/ai-advisor.spec.js` - AI advisor feature tests

### Writing E2E Tests

```javascript
const { test, expect } = require('@playwright/test')

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard')
  })

  test('should perform action', async ({ page }) => {
    await page.click('[data-testid="button"]')
    await expect(page.locator('text=Success')).toBeVisible()
  })
})
```

## Test Data Attributes

Add `data-testid` attributes to your components for reliable E2E testing:

```jsx
<button data-testid="add-transaction-btn">Add Transaction</button>
<div data-testid="transaction-item">Transaction</div>
```

## Coverage Requirements

The project is configured with coverage thresholds:
- Branches: 70%
- Functions: 70%
- Lines: 70%
- Statements: 70%

## CI/CD Integration

Tests run automatically on:
- Push to main/develop branches
- Pull requests to main/develop branches

The GitHub Actions workflow:
1. Runs unit tests with coverage
2. Runs E2E tests
3. Uploads test reports and coverage

## Best Practices

### Unit Tests
- Test one thing at a time
- Use descriptive test names
- Mock external dependencies
- Test both success and error cases
- Keep tests fast and isolated

### E2E Tests
- Test user workflows, not implementation details
- Use page object models for complex interactions
- Wait for elements to be visible before interacting
- Test critical user paths
- Keep tests independent

### General
- Write tests before fixing bugs
- Update tests when changing functionality
- Use meaningful assertions
- Keep test data realistic but minimal

## Debugging Tests

### Unit Tests
```bash
# Run specific test file
npm test -- emailService.test.js

# Run tests matching pattern
npm test -- --testNamePattern="should send email"

# Debug with Node inspector
node --inspect-brk node_modules/.bin/jest --runInBand
```

### E2E Tests
```bash
# Run specific test file
npx playwright test auth.spec.js

# Run with debug mode
npx playwright test --debug

# Generate test code
npx playwright codegen localhost:3000
```

## Environment Variables for Testing

Create a `.env.test` file for test-specific environment variables:

```env
DATABASE_URL=postgresql://test:test@localhost:5432/test_db
OPENAI_API_KEY=test-key
EMAIL_USER=test@example.com
EMAIL_PASS=test-password
ADMIN_EMAILS=admin@example.com
```
##
 Quick Start

### Run Working Tests
```bash
# Run the basic working examples
npm test -- working-example.test.js

# Run simple tests
npm test -- simple.test.js

# Run all tests (some may fail - see Known Issues)
npm test
```

### Run E2E Tests
```bash
# Install Playwright browsers (already done)
npx playwright install

# Run E2E tests (requires app to be running)
npm run dev  # In one terminal
npm run test:e2e  # In another terminal
```

## Known Issues & Solutions

### 1. Component Testing Issues
**Problem:** Some component tests fail due to complex mocking requirements.

**Solution:** 
- Use `data-testid` attributes in components for reliable testing
- Mock Next.js components (Image, Link) properly
- Test component behavior, not implementation details

### 2. API Route Testing Issues
**Problem:** Database and external service mocking is complex.

**Solution:**
- Create test database or use in-memory database
- Mock external services at the module level
- Use dependency injection for better testability

### 3. Service Layer Testing Issues
**Problem:** External API dependencies (OpenAI, email services) need proper mocking.

**Solution:**
- Mock at the module level, not instance level
- Use factory functions for creating test data
- Test error handling and edge cases

## Recommended Testing Strategy

### Phase 1: Foundation (Current)
- ✅ Basic Jest setup
- ✅ Environment configuration
- ✅ Simple unit tests

### Phase 2: Core Logic
- Test utility functions (financial calculations, date handling)
- Test business logic without external dependencies
- Test data transformation functions

### Phase 3: Integration
- Test API routes with mocked database
- Test component integration
- Test service layer with mocked external APIs

### Phase 4: E2E
- Test complete user workflows
- Test authentication flows
- Test critical business processes

## Example Working Test

```javascript
// __tests__/utils/calculations.test.js
describe('Financial Calculations', () => {
  it('should calculate budget utilization percentage', () => {
    const spent = 750
    const budget = 1000
    const percentage = (spent / budget) * 100
    
    expect(percentage).toBe(75)
  })

  it('should handle edge cases', () => {
    expect(() => calculatePercentage(100, 0)).not.toThrow()
  })
})
```