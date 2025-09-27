# 🌊 Flow Manage App

Flow Manage is a full‑stack task management application that simplifies workflow organization and boosts team productivity. It offers secure authentication, password recovery via email, and comprehensive CRUD operations for tasks — including priority, status tracking, and due dates. Built with Next.js, Prisma, MongoDB, and Resend for reliable email delivery

## ✨ Features

- 🔐 User authentication
- ✅ Task creation and management
- 🎯 Priority and status tracking
- 📅 Due date management
- 📱 Responsive design

## 🛠️ Tech Stack

- ⚡ Next.js 13+ with App Router
- 📘 TypeScript
- 🗃️ Prisma ORM
- 🍃 MongoDB
- 🔒 NextAuth.js for authentication
- 📧 Resend for email service

## 📁 Project Structure

```
flowmanage/
├── app/                   # Next.js app router pages
│   ├── api/              # API routes
│   ├── auth/             # Authentication pages
│   └── tasks/            # Task management pages
├── components/           # React components
├── lib/                  # Utilities and configurations
├── prisma/              # Database schema and migrations
├── styles/              # CSS styles
└── types/               # TypeScript type definitions
```

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```
   DATABASE_URL=your_mongodb_url
   NEXTAUTH_SECRET=your_secret
   NEXTAUTH_URL=http://localhost:3000
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## 📝 Available Scripts

- 🔧 `npm run dev` - Start development server
- 📦 `npm run build` - Build for production
- 🚀 `npm start` - Start production server
- ✨ `npm run lint` - Run ESLint

## 🔑 Environment Variables

- 🗄️ `DATABASE_URL`: MongoDB connection string
- 🔐 `NEXTAUTH_SECRET`: Secret for NextAuth.js
- 🌐 `NEXTAUTH_URL`: Base URL for authentication

## 📊 Database Models

- 👤 User: Email-based authentication and profile management
- ✅ Task: Priority-based task management with status tracking

## 📄 License

MIT License
