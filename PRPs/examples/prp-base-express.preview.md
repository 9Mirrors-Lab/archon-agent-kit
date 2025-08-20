# Items

1. Item 1
Why: Express for fast baseline API with wide ecosystem support
Source: https://expressjs.com/

2. Item 2
Why: zod for schema validation
Source: https://github.com/colinhacks/zod

# Additional Context

## Testing Strategies
- jest + supertest for routes

## Monitoring And Logging
- pino + pino-http with request IDs

## Security Considerations
- helmet defaults; CORS; avoid exposing stack traces in prod

# Implementation Blueprint

## Phase 1 Bootstrap
Tasks:
- Title: Create server.ts with helmet/cors/pino
  Files: src/server.ts
  Details: Request ID and JSON body limits

## Phase 2 Routes
Tasks:
- Title: Items router with CRUD
  Files: src/routes/items.ts, src/schemas/items.ts
  Details: zod parse input and serialize output
