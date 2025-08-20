# Items

1. Item 1
Why: React framework with server components and API routes for admin portal
Source: https://nextjs.org/docs

2. Item 2
Why: JSON-LD extraction and validation via schema.org Vehicle
Source: https://schema.org/Vehicle

# Additional Context

## Testing Strategies
- Component testing with React Testing Library
- Integration tests for route handlers

## Monitoring And Logging
- Use Next.js built-in analytics and Core Web Vitals

## Security Considerations
- Validate request bodies with zod in route handlers
- Prefer static/ISR where possible to limit runtime attack surface

# Implementation Blueprint

## Phase 1 Foundation
Tasks:
- Title: Configure ESLint/Prettier/TS strict
  Files: .eslintrc.cjs, tsconfig.json
  Details: Strict type-checking and consistent style

## Phase 2 Data
Tasks:
- Title: Add typed route handler
  Files: app/api/items/route.ts
  Details: zod input/output, proper status codes

## Phase 3 Pages
Tasks:
- Title: Server-rendered list page
  Files: app/items/page.tsx
  Details: Fetch data on server and render table
