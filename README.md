# Currency Converter

A simple currency converter, built with React, TypeScript and TanStack Query on top of the [CurrencyBeacon](https://currencybeacon.com) API.

## Features

- Currency lists for **From** and **To** are loaded from `GET /v1/currencies`
- The amount is converted via `GET /v1/convert`; the result is formatted with the target currency's precision (e.g. `JPY` has no decimals, `KWD` has 3)
- Swap button to exchange the selected currencies
- Amount input accepts only valid decimal numbers
- Requests are debounced (500 ms) while typing; outdated requests are cancelled
- Loading and error states for both the currency list and the conversion

## Requirements

- **Node.js** `^20.19.0` or `>=22.12.0` (required by Vite 8)
- **CurrencyBeacon API key** (set it to VITE_CURRENCY_BEACON_API_KEY env variable)

## Getting started

```bash
git clone https://github.com/Peskarski/currency-converter.git
cd currency-converter
npm install
cp .env.example .env
```

Open `.env` and set your key:

```
VITE_CURRENCY_BEACON_API_KEY=your-api-key
```

Start the dev server:

```bash
npm run dev
```

The app runs at [http://localhost:5173](http://localhost:5173).

## Scripts

| Command                | Description                                             |
| ---------------------- | ------------------------------------------------------- |
| `npm run dev`          | Start the dev server (with the API proxy)               |
| `npm run build`        | Type-check and build for production into `dist/`        |
| `npm run preview`      | Serve the production build locally (with the API proxy) |
| `npm test`             | Run the tests once                                      |
| `npm run test:watch`   | Run the tests in watch mode                             |
| `npm run lint`         | Run ESLint                                              |
| `npm run format`       | Format the code with Prettier                           |
| `npm run format:check` | Check formatting without changing files                 |

## Tests

Tests use **Vitest** with **React Testing Library** and **user-event** in a jsdom environment. They don't need an API key: `vitest.config.ts` is separate from `vite.config.ts` and has no proxy.

```bash
npm test
```

`AmountInput.test.tsx` covers the amount validation the way a user interacts with it: valid keystrokes are passed to `onChange`, invalid ones (letters, `,`) are rejected and the field keeps its value, the field can be cleared, a mixed sequence like `1a2.b5.3` results in `12.53`, and pasted text is validated.

## Tech stack

- **React 19** + **TypeScript** (strict), built with **Vite 8**
- **React Compiler** for automatic memoization
- **TanStack Query** for server state (caching, request cancellation, loading/error states)
- **Axios** as the HTTP client
- **Tailwind CSS 4** for styling
- **Vitest** + **React Testing Library** for tests
- **ESLint** (incl. `react-hooks` and `@tanstack/eslint-plugin-query`) + **Prettier**

## Project structure

```
src/
├── app/                    # App root, QueryClient provider
├── features/
│   └── converter/          # Everything specific to currency conversion
│       ├── api/            # API calls (unwrap the response envelope)
│       ├── components/
│       │   ├── AmountInput/        # Amount field with input validation (+ tests)
│       │   └── CurrencyConverter/  # Container: state, queries, layout
│       ├── hooks/          # useCurrencies, useConversion (TanStack Query)
│       ├── types/          # Domain types
│       └── utils/          # Mapping currencies to select options
├── shared/                 # Feature-agnostic building blocks
│   ├── api/                # Axios instance
│   ├── components/         # Input, Select, Button, Spinner, ErrorMessage
│   ├── hooks/              # useDebounce
│   └── types/              # Shared types (select Option)
└── test/                   # Test setup (jest-dom matchers, cleanup)
```

Code is organised by feature(s). `shared` never imports from `features`, so the generic components and hooks stay reusable.

## Technical decisions

### API proxy instead of calling CurrencyBeacon directly

CurrencyBeacon does not send CORS headers, so the browser blocks direct requests from `localhost` (with both the `Authorization` header and the `api_key` query parameter). Requests therefore go to `/api/*` on the Vite server, which forwards them to `https://api.currencybeacon.com/v1/*` and adds the `Authorization: Bearer` header.

API key never reaches the browser: it is read from `.env` by `vite.config.ts` in Node, is not referenced in client code, and is not part of the build output or the network requests made by the page.

### Server state lives in TanStack Query, UI state in the component

- `useCurrencies` — the currency list is cached for the whole session (`staleTime: Infinity`); it effectively never changes.
- `useConversion` — the query key contains `from`, `to` and `amount`, so every combination is cached separately (15 min `staleTime`). The request only runs when both currencies and a non-zero amount are set. The `AbortSignal` from TanStack Query is passed to Axios, so a request that becomes outdated is cancelled.
- The component itself only holds `fromCurrency`, `toCurrency` and `amount`. The converted value is derived from the query result and is never copied into state.

### Amount is stored as a string

A numeric state would break normal typing (`0` → `05`, the field can't be cleared, `1.` loses the dot). The amount is kept as the raw string the user typed and is validated on every change against `^\d*[.]?\d*$`; invalid keystrokes are simply rejected. The value is converted to number only when building the request.

### Debounced requests

The amount is debounced by 500 ms to avoid one request per each value change. While the debounced value is catching up, the result area shows a spinner.

### Components

- `Input` and `Select` accept all native attributes, and render an associated `<label>`.
- `Button` defaults to `type="button"` so it can never submit a form by accident;
- The `Spinner` is a small Tailwind component.
- No manual `useMemo` / `useCallback` / `memo`: the React Compiler handles memoization.

## API notes and assumptions

- Both endpoints return the data twice: inside `response` and again at the top level, where `/currencies` also has numeric keys `"0"`, `"1"`, …. The app reads only the `response` field.
- Each currency has `short_code` (ISO letters, e.g. `USD`) and `code` (ISO numeric, e.g. `840`). `short_code` is used for the select values and the `from` / `to` parameters.
- `precision` from the currency list is used to format the converted value.
- Only `.` is accepted as the decimal separator.

## Limitations and possible improvements

- **Deployment:** the proxy only exists in `npm run dev` / `npm run preview`. A static deployment would need a small serverless function (Vercel, Netlify, Cloudflare) that does the same job at `/api`; the frontend would not need to change.
