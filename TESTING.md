# Test Suite Documentation

## Overview

The current suite covers the main tracker components and is intended to stay behavior-focused. After the UI refresh, the same tests should still pass because the public copy and interaction points were kept stable.

## Dependencies

- `jest`
- `@testing-library/react`
- `@testing-library/jest-dom`
- `@testing-library/user-event`
- `jest-environment-jsdom`

## Useful Commands

- `npm test` runs the full suite once
- `npm test:watch` re-runs tests on file changes
- `npm run lint` checks for style and type-adjacent issues in the touched files
- `npm run build` verifies the production Next.js bundle

## Coverage Areas

- AddEntry form behavior and validation
- EntryList rendering, ordering, and date labeling
- AnalyticsCards calculations and summary output
- Visualization chart rendering and category aggregation

## Query Style

Prefer user-facing selectors such as labels, roles, and visible text. Avoid tests that depend on class names or layout-specific DOM structure.

## Notes For UI Updates

When the shell or spacing changes, check that the following still render in the expected order:

- Landing page hero and tracker entry link
- Tracker page summary, entry form, recent list, weekly summary, and chart
- Empty states for all summary components
