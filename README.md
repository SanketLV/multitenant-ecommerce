# Multi-tenant E-commerce Platform

A modern, scalable multi-tenant e-commerce platform built with Next.js 14, PayloadCMS, and tRPC. This platform allows creators and businesses to sell digital products across various categories.

## Technologies Used

- **Frontend:**

  - Next.js 14 (App Router)
  - React
  - Tailwind CSS
  - shadcn/ui Components
  - TypeScript

- **Backend:**

  - PayloadCMS (Headless CMS)
  - MongoDB (via Mongoose adapter)
  - tRPC for type-safe API calls

- **Authentication & Authorization:**
  - Built-in authentication system via PayloadCMS
  - Role-based access control

## Features

- 🛍️ Multi-tenant marketplace
- 📱 Responsive design
- 🔍 Advanced category-based search and filtering
- 🔐 User authentication and authorization
- 📊 Admin dashboard (powered by PayloadCMS)
- 🔄 Type-safe API calls with tRPC
- 🎨 Customizable UI with Tailwind CSS
- 🖼️ Media management with image optimization
- 📁 Hierarchical category management

## Prerequisites

Before running this project, make sure you have:

- Node.js 18+ installed
- MongoDB instance running
- Environment variables set up (see below)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URI=your_mongodb_uri
PAYLOAD_SECRET=your_secret_key
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

## Getting Started

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

5. Access the admin panel at [http://localhost:3000/admin](http://localhost:3000/admin)

## Project Structure

- `/src/app` - Next.js app router pages and layouts
- `/src/collections` - PayloadCMS collection definitions
- `/src/components` - Reusable React components
- `/src/lib` - Utility functions and shared code
- `/src/modules` - Feature-based modules (auth, categories, etc.)
- `/src/trpc` - tRPC router and procedure definitions

## Database Collections

- **Users** - User management and authentication
- **Categories** - Hierarchical category system with subcategories
- **Media** - Media assets management with image optimization

## API Routes

- REST API: `/api/[collection]`
- tRPC: `/api/trpc`

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
