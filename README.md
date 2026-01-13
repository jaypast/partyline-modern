# PartyLine Modern

A modern, safe, voice-only "party line" platform that connects adults with friendly, vetted companions for voice calls. The platform focuses on combating loneliness through genuine human connection.

## Overview

PartyLine Modern is designed for adults (18+) who want someone to talk to. The platform offers:
- Voice-only calls (no video, no images, no file sharing)
- 1:1 and group calls (up to 5 participants)
- Free calls up to 60 minutes
- Paid companion sessions ($1-5/minute)
- Vetted, background-checked companions

## Tech Stack

- **Frontend**: React, TypeScript, TanStack Query, Wouter (routing), Tailwind CSS, shadcn/ui
- **Backend**: Express.js, TypeScript
- **Database**: In-memory storage (MemStorage) with Drizzle ORM schemas
- **Build**: Vite

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── ui/         # shadcn/ui components
│   │   │   ├── navigation.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── companion-card.tsx
│   │   │   ├── hero-section.tsx
│   │   │   └── ...
│   │   ├── pages/          # Page components
│   │   │   ├── home.tsx
│   │   │   ├── companions.tsx
│   │   │   ├── companion-profile.tsx
│   │   │   ├── signup.tsx
│   │   │   └── login.tsx
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions
│   │   ├── App.tsx         # Main app with routing
│   │   └── index.css       # Global styles with design tokens
├── server/                 # Backend Express application
│   ├── routes.ts           # API endpoints
│   ├── storage.ts          # In-memory storage implementation
│   └── index.ts            # Server entry point
├── shared/                 # Shared types and schemas
│   └── schema.ts           # Drizzle/Zod schemas
└── design_guidelines.md    # UI/UX design guidelines
```

## API Endpoints

### Companions
- `GET /api/companions` - List all companions (query: `?online=true` for online only)
- `GET /api/companions/:id` - Get companion by ID
- `POST /api/companions` - Create new companion
- `PATCH /api/companions/:id/status` - Update companion online status

### Users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user

### Calls
- `GET /api/calls/:userId` - Get calls for a user
- `POST /api/calls` - Create new call
- `PATCH /api/calls/:id/end` - End a call

## Data Models

### User
- id, username, password, nickname, ageGroup, phone, email

### Companion
- id, name, tagline, bio, avatarUrl, pricePerMinute, interests[], languages[], ageGroup, isOnline, totalCalls, rating

### Call
- id, callerId, companionId, startTime, endTime, durationMinutes, callType, isPaid, totalCost

## Features

### Landing Page
- Hero section with value proposition
- How It Works (3-step process)
- Benefits/Why Choose PartyLine
- Companion showcase (featured companions)
- Safety & Trust section
- Pricing comparison
- Testimonials
- Call-to-action

### Companion Marketplace
- Search by name, tagline, or interests
- Filter by:
  - Online status
  - Age group
  - Price range
  - Interests (tags)
- Companion cards with:
  - Avatar, name, tagline
  - Online status indicator
  - Rating and call count
  - Price per minute
  - Interest tags
  - View Profile / Call buttons

### Companion Profile
- Full bio and about section
- Languages spoken
- Interests as badges
- Call Now / Schedule buttons
- What to Expect section

### Authentication
- Multi-step signup flow
- Phone-based login (verification code)
- Age verification (18+)

### Theme
- Light/dark mode toggle
- Warm, trustworthy color palette
- Accessible design (large text, high contrast)

## Running the Project

The application runs with `npm run dev` which starts both the Express backend and Vite frontend on port 5000.

## Design Guidelines

See `design_guidelines.md` for detailed UI/UX specifications including:
- Typography (Inter, Outfit fonts)
- Color palette (warm oranges, teals)
- Spacing and layout
- Component specifications
- Accessibility requirements
