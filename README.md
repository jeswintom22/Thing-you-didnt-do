# Thing you Didn't do

A local-first avoidance tracker that helps you log the things you kept postponing, group them by fear type, and review the patterns that show up over time.

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC)

## What changed

- Landing page now uses a fuller editorial layout with stronger hierarchy and a clearer call to action.
- Tracker page now has a more polished dashboard shell with softer cards and better spacing.
- Global styling adds a richer atmospheric background and shared glass-like surfaces.
- Metadata now reads optional app name and description values from the environment.

## Features

- Daily avoidance logging with rejection, uncertainty, and effort categories
- Recent entries, weekly summary, and trend visualization
- Local browser storage only; no server required
- Responsive layout for desktop and mobile

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm, yarn, pnpm, or bun

### Install

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Copy [.env.example](.env.example) to [.env.local](.env.local) if you want to override the default app name or description.
4. Start the development server with `npm run dev`.
5. Open [http://localhost:3000](http://localhost:3000).

## Environment

The app supports these optional variables:

- `NEXT_PUBLIC_APP_NAME`
- `NEXT_PUBLIC_APP_DESCRIPTION`

If they are not set, the app uses the built-in defaults.

## Scripts

- `npm run dev` - Start the development server
- `npm run build` - Create a production build
- `npm run lint` - Run ESLint
- `npm test` - Run the Jest suite

## Project Structure

```
src/
	app/
		components/
		tracker/
		globals.css
		layout.tsx
		page.tsx
		types.ts
		utils.ts
	lib/
		storage.ts
```

## Validation

After UI changes, the recommended check order is:

1. `npm run lint`
2. `npm test`
3. `npm run build`

## Deployment

The app can be deployed to any platform that supports Next.js, including Vercel, Netlify, Railway, and Render.
