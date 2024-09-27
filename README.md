This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Travelopia Flight Status Board

A real-time flight status board built using Next.js and TypeScript. The app fetches flight data from an API and displays it in a responsive table with live updates every 10 seconds.

---

## Table of Contents

- [Travelopia Flight Status Board](#travelopia-flight-status-board)
- [Project Description](#project-description)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Usage](#usage)
- [Running Tests](#running-tests)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Features

- Real-time flight updates.
- Interactive UI with clickable rows to view more details.
- Responsive design for mobile and desktop.
- Live polling every 10 seconds to fetch updated flight information.

---

## Tech Stack

- **Frontend**: Next.js, TypeScript, React
- **Backend**: Node.js, NestJS (for APIs, if relevant)
- **State Management**: useState, useEffect
- **UI**: TailwindCSS
- **Testing**: Jest, React Testing Library

---

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
