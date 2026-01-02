# Test Suite Documentation

## Overview
Comprehensive test suite with **51 passing tests** covering core components of the avoidance tracker app. Tests focus on behavior verification and user interactions rather than implementation details.

## Setup

### Dependencies Installed
- `jest` - Testing framework
- `@testing-library/react` - React component testing utilities
- `@testing-library/jest-dom` - DOM matchers for assertions
- `@testing-library/user-event` - Realistic user interaction simulation
- `jest-environment-jsdom` - DOM environment for tests
- `@types/jest` - TypeScript types for Jest

### Configuration Files

**jest.config.js**
- Configures Jest to work with Next.js App Router
- Sets up module path aliasing (`@/` → `src/`)
- Enables TypeScript support
- Defines test patterns and coverage paths

**jest.setup.js**
- Imports testing library DOM matchers
- Initializes testing environment

**package.json Scripts**
```json
{
  "test": "jest",
  "test:watch": "jest --watch"
}
```

## Test Coverage

### AddEntry Component (10 tests)
**Form Interaction & Validation**
- ✅ Renders form with all required fields
- ✅ Textarea is initially empty
- ✅ Updates textarea on user input
- ✅ Category defaults to rejection
- ✅ Changes category when user selects different option
- ✅ Submit button is disabled when textarea is empty
- ✅ Submit button is enabled when textarea has text
- ✅ Calls addEntry with correct data on submission
- ✅ Clears textarea after successful submission
- ✅ Does not call addEntry for whitespace-only entries

### EntryList Component (13 tests)
**Rendering & Display Logic**
- ✅ Renders empty state when no entries provided
- ✅ Renders list with entries
- ✅ Displays entries in reverse chronological order
- ✅ Shows only last 5 entries
- ✅ Displays "Today" for current date
- ✅ Displays "Yesterday" for previous day
- ✅ Displays formatted date for older entries
- ✅ Displays category badge with correct content
- ✅ Renders different category types
- ✅ Renders semantic HTML with article and time elements
- ✅ Includes datetime attribute on time element

### AnalyticsCards Component (18 tests)
**Data Calculations & Display**
- ✅ Renders empty state when no entries provided
- ✅ Renders insights section when entries exist
- ✅ Calculates tracking streak correctly
- ✅ Shows zero streak when today has no entry
- ✅ Displays today's entry count
- ✅ Compares today vs yesterday entries (up arrow)
- ✅ Shows down arrow when today < yesterday
- ✅ Shows right arrow when today = yesterday
- ✅ Calculates average avoidances per day
- ✅ Displays recurring patterns with top items
- ✅ Shows only top 3 recurring patterns
- ✅ Displays medal emojis for top patterns
- ✅ Displays reflection message for patterns
- ✅ Handles long text by truncating to 40 characters
- ✅ Pluralizes "time" correctly for frequency

### Visualization Component (10 tests)
**Chart Rendering & Data Aggregation**
- ✅ Renders component without crashing
- ✅ Displays empty state when no entries provided
- ✅ Displays chart container when entries exist
- ✅ Displays chart title and description
- ✅ Aggregates entries correctly by date and category
- ✅ Displays legend with all three categories
- ✅ Renders with accessible aria-label on BarChart
- ✅ Has proper semantic structure with section and heading
- ✅ Displays all legend labels in chart
- ✅ Renders chart with data across multiple days

## Testing Patterns Used

### Semantic Queries
```typescript
// Preferred: User-centric queries
screen.getByLabelText(/Fear Category/i)
screen.getByRole('button', { name: /Add Entry/i })
screen.getByText(/No data to visualize yet/i)

// Avoid: Implementation-detail queries
container.querySelector('[class*="text-3xl"]')
```

### User Interactions
```typescript
const user = userEvent.setup();
await user.type(textarea, 'Test avoidance');
await user.selectOptions(select, 'effort');
await user.click(button);
```

### Mocking
```typescript
jest.mock('@/app/utils', () => ({
  addEntry: jest.fn(),
}));
```

### Test Utilities
```typescript
// Mock factory pattern
const mockEntry = (overrides?: Partial<AvoidanceEntry>): AvoidanceEntry => ({
  id: '1',
  date: new Date().toISOString().split('T')[0],
  text: 'Test avoidance',
  category: 'rejection',
  ...overrides,
});
```

## Running Tests

```bash
# Run all tests once
npm test

# Run in watch mode (re-run on file changes)
npm test:watch

# Run tests for specific file
npm test -- AddEntry.test.tsx

# Run with coverage
npm test -- --coverage
```

## Test File Structure
```
src/app/components/
├── AddEntry.tsx
├── EntryList.tsx
├── AnalyticsCards.tsx
├── Visualization.tsx
└── __tests__/
    ├── AddEntry.test.tsx
    ├── EntryList.test.tsx
    ├── AnalyticsCards.test.tsx
    └── Visualization.test.tsx
```

## Key Principles

1. **Behavior Over Implementation** - Tests verify what users see and do, not how code is structured
2. **No Snapshots** - Avoid brittle snapshot tests that break with minor formatting changes
3. **Realistic User Paths** - Use userEvent for natural user interactions
4. **Accessible Queries** - Prioritize accessible selectors (labels, roles, text)
5. **Minimal Mocking** - Only mock external dependencies, test real component logic
6. **Clear Test Names** - Describe the behavior being tested, not the implementation

## Future Enhancements

- Add integration tests for tracker page
- Add tests for utility functions (getEntries, saveEntries)
- Add tests for landing page component
- Set up code coverage reporting
- Add E2E tests with Playwright
