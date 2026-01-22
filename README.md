# Piaget College of Education - Full Stack Application

A comprehensive web application for Piaget College of Education featuring student applications, admissions information, news management, and an admin dashboard.

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas)
- Cloudinary account (for image uploads)
- Resend account (for email service)

### One-Command Setup

```bash
# Install all dependencies (frontend & backend)
npm run install-all
```

### Run Both Frontend & Backend Concurrently

```bash
# From root directory - runs frontend on port 5173 and backend on port 5000
npm run dev
```

This will start:

- **Frontend**: http://localhost:5173 (Vite dev server)
- **Backend**: http://localhost:5000/api/v1 (Express server)

## 📋 Full Setup Guide

### 1. Clone Repository & Install Dependencies

```bash
# Install root dependencies
npm install

# Install frontend and backend dependencies
npm run install-all
```

### 2. Environment Configuration

#### Frontend Setup (paiget-college/.env.local)

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_API_KEY=your_api_key
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

#### Backend Setup (piaget-server/.env)

```env
HOST=localhost
PORT=5000
NODE_ENV=development
API_BASE_PATH=/api/v1
CLIENT_ORIGIN=http://localhost:5173
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/piaget-college
RESEND_API_KEY=your_resend_api_key
JWT_ACCESS_SECRET=your_access_secret
JWT_ACCESS_EXPIRES_IN=1d
JWT_REFRESH_SECRET=your_refresh_secret
JWT_REFRESH_EXPIRES_IN=7d
```

### 3. Database Setup

**Option A: MongoDB Atlas (Cloud)**

1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free M0 cluster
3. Create database user and get connection string
4. Update `MONGO_URI` in backend `.env`

**Option B: Local MongoDB**

1. Install MongoDB locally
2. Run `mongod` to start service
3. Set `MONGO_URI=mongodb://localhost:27017/piaget-college`

### 4. Cloudinary Setup (Frontend Image Uploads)

1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Get Cloud Name and API Key from dashboard
3. Create upload preset (Settings → Upload)
4. Add to frontend `.env.local`

### 5. Resend Setup (Email Service)

1. Sign up at [resend.com](https://resend.com)
2. Get API key from Settings → API Keys
3. Add to backend `.env`

## 📁 Project Structure

```
piaget-college/
├── paiget-college/              # Frontend (React + TypeScript)
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── pages/               # Page components
│   │   ├── lib/                 # Utilities, services, validation
│   │   └── styles/              # CSS files
│   ├── package.json
│   ├── tsconfig.app.json
│   ├── vite.config.ts
│   └── README.md                # Detailed frontend setup
│
├── piaget-server/               # Backend (Node + Express + TypeScript)
│   ├── src/
│   │   ├── modules/             # Feature modules
│   │   ├── lib/                 # Utilities, email, validation
│   │   ├── middlewares/         # Express middlewares
│   │   ├── database/            # MongoDB & Redis
│   │   └── config/              # Configuration
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md                # Detailed backend setup
│
├── package.json                 # Root workspace
└── README.md                    # This file
```

## 🔧 Available Commands

### From Root Directory

```bash
# Install all dependencies
npm run install-all

# Run both frontend & backend concurrently
npm run dev

# Build both applications
npm run build

# Build frontend only
npm run build:frontend

# Build backend only
npm run build:backend

# Lint frontend
npm run lint:frontend

# Lint backend
npm run lint:backend

# Clean all node_modules and dist folders
npm run clean
```

### Frontend (paiget-college/)

```bash
npm run dev        # Start dev server (port 5173)
npm run build      # Production build
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

### Backend (piaget-server/)

```bash
npm run dev        # Start with ts-node-dev (auto-reload)
npm run start      # Production start
npm run build      # Build TypeScript
```

## 🎯 Key Features

### Frontend

- **Student Application Form** - 16-field form with validation and Cloudinary image upload
- **Admin Dashboard** - Application management, search, filtering, status updates
- **Admissions Pages** - Entry requirements, how to apply, prospective student info
- **News/Blog** - Dynamic blog post listing and detailed view
- **Public Pages** - Home, about, contact, privacy policy
- **SEO Optimized** - React Helmet Meta component on all pages
- **Responsive Design** - Tailwind CSS with mobile-first approach

### Backend

- **Student Applications** - Submit, retrieve, filter, and manage applications
- **Authentication** - JWT-based user authentication
- **Email Service** - Resend integration for transactional emails
- **Blog Management** - Create, update, delete blog posts
- **Testimonials** - Manage student testimonials
- **Workshops** - Workshop information management
- **Admin Panel** - Panel member management
- **Error Handling** - Custom error classes and middleware
- **Data Validation** - Zod schema validation on all endpoints

## 🔐 API Endpoints

### Authentication

- `POST /api/v1/auth/register` - Register user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/refresh` - Refresh token

### Applications

- `POST /api/v1/applications/submit` - Submit application
- `GET /api/v1/applications` - Get all applications (protected)
- `PATCH /api/v1/applications/:id/status` - Update status (protected)
- `DELETE /api/v1/applications/:id` - Delete application (protected)

### Blog

- `GET /api/v1/blog` - Get all blog posts
- `GET /api/v1/blog/:slug` - Get post by slug
- `POST /api/v1/blog` - Create post (protected)

### Other Modules

- `/api/v1/testimonial` - Testimonials
- `/api/v1/workshop` - Workshops
- `/api/v1/panel` - Panel members
- `/api/v1/email` - Email service

## 🚀 Deployment

### Frontend (Vercel)

1. Push to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy automatically

### Backend (Any Node.js Host)

- Heroku, Railway, Render, AWS, Azure, etc.
- Ensure all environment variables are set
- MongoDB URI must be accessible from production

## 📚 Documentation

For detailed setup and configuration:

- **Frontend Setup**: See [paiget-college/README.md](./paiget-college/README.md)
- **Backend Setup**: See [piaget-server/README.md](./piaget-server/README.md)

## 🛠️ Tech Stack

### Frontend

- React 18+ with TypeScript
- Tailwind CSS
- React Hook Form + Zod
- Axios
- Framer Motion
- Vite

### Backend

- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- JWT Authentication
- Resend Email
- Redis (optional)

## 📝 Environment Variables Checklist

### Frontend (.env.local)

- [ ] `VITE_API_BASE_URL`
- [ ] `VITE_CLOUDINARY_CLOUD_NAME`
- [ ] `VITE_CLOUDINARY_API_KEY`
- [ ] `VITE_CLOUDINARY_UPLOAD_PRESET`

### Backend (.env)

- [ ] `HOST`
- [ ] `PORT`
- [ ] `NODE_ENV`
- [ ] `API_BASE_PATH`
- [ ] `CLIENT_ORIGIN`
- [ ] `MONGO_URI`
- [ ] `RESEND_API_KEY`
- [ ] `JWT_ACCESS_SECRET`
- [ ] `JWT_REFRESH_SECRET`

## 🐛 Troubleshooting

### Build Errors

- Clear `node_modules`: `npm run clean && npm run install-all`
- Check Node.js version: `node --version` (should be 16+)

### API Connection Issues

- Verify backend is running on port 5000
- Check `CLIENT_ORIGIN` matches frontend URL
- Confirm `VITE_API_BASE_URL` is correct

### Database Connection

- MongoDB Atlas: Check IP whitelist includes your IP
- Local MongoDB: Ensure `mongod` service is running
- Verify `MONGO_URI` format is correct

### Email Not Sending

- Verify `RESEND_API_KEY` in backend `.env`
- Check Resend domain verification status

See individual README files for more detailed troubleshooting.

## 📧 Support

For detailed information:

- Frontend issues → See [paiget-college/README.md](./paiget-college/README.md)
- Backend issues → See [piaget-server/README.md](./piaget-server/README.md)

## 📄 License

See LICENSE file
