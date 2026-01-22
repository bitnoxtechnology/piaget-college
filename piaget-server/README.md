# Piaget College Backend Server Setup Guide

This is the backend server for Piaget College of Education built with Node.js, Express, TypeScript, and MongoDB. It provides APIs for student applications, authentication, blog management, and admin operations.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud - MongoDB Atlas recommended)
- Resend account (for email sending)

## Installation

### 1. Clone and Install Dependencies

```bash
cd piaget-server
npm install
```

### 2. Environment Configuration

Create a `.env` file in the `piaget-server` directory with the following variables:

```env
# Server Configuration
HOST=localhost
PORT=5000
NODE_ENV=development
API_BASE_PATH=/api/v1

# Client URL (for CORS)
CLIENT_ORIGIN=http://localhost:5173

# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/piaget-college?retryWrites=true&w=majority

# Email Service (Resend)
RESEND_API_KEY=your_resend_api_key

# JWT Authentication
JWT_ACCESS_SECRET=your_access_secret_key_here
JWT_ACCESS_EXPIRES_IN=1d
JWT_REFRESH_SECRET=your_refresh_secret_key_here
JWT_REFRESH_EXPIRES_IN=7d

# Optional: Redis Configuration (commented out for now)
# REDIS_HOST=localhost
# REDIS_PORT=6379
# REDIS_PASSWORD=your_password
# REDIS_USER=default
```

## Database Setup

### MongoDB Setup

#### Option 1: MongoDB Atlas (Cloud - Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new project
4. Create a cluster (M0 free tier is sufficient for development)
5. Create a database user:
   - Click "Database Access"
   - Add a new database user with username and password
   - Note the credentials
6. Get your connection string:
   - Click "Databases" → "Connect"
   - Choose "Drivers" → Copy the connection string
   - Replace `<username>`, `<password>`, and `<database>` in the URI
   - Update `MONGO_URI` in `.env`

#### Option 2: Local MongoDB

1. Install MongoDB locally from [mongodb.com](https://docs.mongodb.com/manual/installation/)
2. Start MongoDB service:
   ```bash
   mongod
   ```
3. Set connection string:
   ```env
   MONGO_URI=mongodb://localhost:27017/piaget-college
   ```

### Database Collections

The server automatically creates these collections via Mongoose schemas:

- **applications** - Student application forms
- **users** - User accounts and authentication
- **blogs** - News and blog posts
- **testimonials** - Student testimonials
- **workshops** - Workshop information
- **panels** - Panel/team member information

## Email Service Setup (Resend)

### Step 1: Create Resend Account

1. Go to [Resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email

### Step 2: Get API Key

1. Go to Settings → API Keys
2. Click "Create API Key"
3. Copy the key → `RESEND_API_KEY` in `.env`

### Step 3: Verify Domain (Optional but Recommended)

1. Settings → Domains
2. Add your domain and follow verification steps
3. Use your verified domain for sending emails

### Email Templates

Email templates are located in `src/lib/email/templates/`:

- `application.ts` - Confirmation email for student applications
- Add more email templates as needed

Example template structure:

```typescript
export const applicationEmailTemplate = (data: ApplicationData) => ({
  subject: "Application Received",
  html: `<html>...</html>`,
  text: `Plain text version`,
});
```

## JWT Secret Generation

Generate secure JWT secrets:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Run this command twice and use outputs for:

- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`

## Running the Server

### Development Mode

```bash
npm run dev
```

The server will start at `http://localhost:5000` (or your configured PORT)

### Production Mode

```bash
npm run start
```

(Make sure `dist/index.js` exists - run build first if needed)

### Build TypeScript

```bash
npx tsc
```

## Project Structure

```
src/
├── @types/                 # TypeScript type definitions
├── config/
│   └── app.config.ts      # Application configuration
├── database/
│   ├── db.ts              # MongoDB connection
│   ├── redis.ts           # Redis connection (optional)
│   ├── models/            # Mongoose schemas
│   └── transaction.ts     # Database transaction utilities
├── lib/
│   ├── helpers.ts         # Helper functions
│   ├── jwt.ts             # JWT utilities
│   ├── utils.ts           # Utility functions
│   ├── email/             # Email templates
│   ├── enums/             # TypeScript enums
│   ├── errors/            # Custom error classes
│   └── validation/        # Validation utilities
├── middlewares/
│   ├── async-handler.ts   # Async error handling
│   ├── authentication.ts  # JWT authentication
│   └── error-handler.ts   # Global error handler
├── modules/               # Feature modules
│   ├── application/       # Student applications
│   ├── auth/              # Authentication
│   ├── blog/              # Blog/News management
│   ├── email/             # Email service
│   ├── panel/             # Panel/Team management
│   ├── testimonial/       # Testimonials
│   └── workshop/          # Workshops
└── index.ts               # Application entry point
```

## API Modules

### 1. Authentication Module (`/api/v1/auth`)

- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - Logout user

### 2. Applications Module (`/api/v1/applications`)

- `POST /applications/submit` - Submit application (public)
- `GET /applications` - Get all applications (protected)
- `GET /applications/:id` - Get single application (public)
- `PATCH /applications/:id/status` - Update status (protected)
- `DELETE /applications/:id` - Delete application (protected)

### 3. Blog Module (`/api/v1/blog`)

- `GET /blog` - Get all blog posts
- `GET /blog/:slug` - Get blog by slug
- `POST /blog` - Create blog (protected)
- `PATCH /blog/:id` - Update blog (protected)
- `DELETE /blog/:id` - Delete blog (protected)

### 4. Testimonial Module (`/api/v1/testimonial`)

- `GET /testimonial` - Get all testimonials
- `POST /testimonial` - Create testimonial (protected)
- `PATCH /testimonial/:id` - Update testimonial (protected)
- `DELETE /testimonial/:id` - Delete testimonial (protected)

### 5. Workshop Module (`/api/v1/workshop`)

- `GET /workshop` - Get all workshops
- `GET /workshop/:id` - Get single workshop
- `POST /workshop` - Create workshop (protected)
- `PATCH /workshop/:id` - Update workshop (protected)
- `DELETE /workshop/:id` - Delete workshop (protected)

### 6. Panel Module (`/api/v1/panel`)

- `GET /panel` - Get all panel members
- `POST /panel` - Create panel member (protected)
- `PATCH /panel/:id` - Update panel member (protected)
- `DELETE /panel/:id` - Delete panel member (protected)

### 7. Email Module (`/api/v1/email`)

- `POST /email/send` - Send email (protected/admin only)

## Authentication

### JWT Tokens

The server uses JWT for authentication:

- **Access Token**: Short-lived (1 day by default)
- **Refresh Token**: Long-lived (7 days by default)

### Protected Routes

Protected routes require:

```
Authorization: Bearer <access_token>
```

Add this header to requests to protected endpoints.

## Middleware

### Error Handler

Catches and formats all errors with proper HTTP status codes:

```typescript
app.use(errorHandler);
```

### Async Handler

Wraps async route handlers to catch errors:

```typescript
router.get(
  "/data",
  asyncHandler(async (req, res) => {
    // errors automatically caught and passed to error handler
  })
);
```

### CORS

Configured to allow requests from `CLIENT_ORIGIN`:

```typescript
app.use(
  cors({
    origin: config.CLIENT_ORIGIN,
    credentials: true,
  })
);
```

### Helmet

Adds security HTTP headers:

```typescript
app.use(helmet());
```

## Validation

Uses Zod for request validation:

```typescript
import { z } from "zod";

const applicationSchema = z.object({
  email: z.string().email(),
  surname: z.string().min(2),
  // ... more fields
});

// In route
const validated = applicationSchema.parse(req.body);
```

## Error Handling

Custom error classes in `src/lib/errors/`:

```typescript
throw new ValidationError("Invalid input");
throw new AuthenticationError("Unauthorized");
throw new DatabaseError("Connection failed");
```

## Logging

Request logging middleware logs all incoming requests:

```
Request Time: [2026-01-22T10:30:00.000Z], Method:POST, URL:/api/v1/applications/submit
```

## Environment Variables Reference

| Variable                 | Description               | Example                       |
| ------------------------ | ------------------------- | ----------------------------- |
| `HOST`                   | Server host               | `localhost`                   |
| `PORT`                   | Server port               | `5000`                        |
| `NODE_ENV`               | Environment               | `development` or `production` |
| `API_BASE_PATH`          | API base path             | `/api/v1`                     |
| `CLIENT_ORIGIN`          | Frontend URL for CORS     | `http://localhost:5173`       |
| `MONGO_URI`              | MongoDB connection string | `mongodb+srv://...`           |
| `RESEND_API_KEY`         | Email service API key     | `re_xxxx...`                  |
| `JWT_ACCESS_SECRET`      | JWT access secret         | 64 char hex string            |
| `JWT_ACCESS_EXPIRES_IN`  | Access token expiry       | `1d`                          |
| `JWT_REFRESH_SECRET`     | JWT refresh secret        | 64 char hex string            |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token expiry      | `7d`                          |

## Development Tips

### Testing Endpoints

Use Postman or Insomnia to test API endpoints:

1. Create a new request
2. Set method (GET, POST, etc.)
3. Enter URL: `http://localhost:5000/api/v1/[endpoint]`
4. Add headers if needed:
   ```
   Authorization: Bearer <token>
   Content-Type: application/json
   ```
5. Add request body if needed
6. Send request

### Debugging

Enable detailed logging by checking:

- Terminal output for request logs
- Browser network tab (if testing via frontend)
- MongoDB Atlas logs for database issues

### Hot Reload

`npm run dev` uses `ts-node-dev` for hot reloading. Changes to files automatically restart the server.

## Troubleshooting

### MongoDB Connection Error

- Verify `MONGO_URI` is correct
- Check MongoDB Atlas IP whitelist includes your IP
- For local MongoDB, ensure service is running

### Email Not Sending

- Verify `RESEND_API_KEY` is correct
- Check email templates exist
- Ensure domain is verified in Resend (if using custom domain)

### CORS Errors

- Verify `CLIENT_ORIGIN` matches frontend URL exactly
- Include `credentials: true` if using authentication

### JWT Token Errors

- Generate new `JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET`
- Ensure tokens are being sent in Authorization header
- Check token expiry time

### Build Errors

- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Ensure TypeScript version matches: `npm list typescript`
- Check for syntax errors in `.env`

## Deployment

### Vercel Deployment

1. Push code to GitHub
2. Create Vercel project linked to repository
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms (Heroku, Railway, etc.)

1. Set all environment variables in platform dashboard
2. Ensure Node.js version is 16+
3. Build command: `npm run build` (if needed)
4. Start command: `npm run start`
5. Set PORT to `$PORT` or `3000` (platform-dependent)

## Performance Optimization

1. **Database Indexing**: Ensure frequently queried fields are indexed
2. **Pagination**: Use limit/offset for large data sets
3. **Caching**: Use Redis for frequently accessed data (when enabled)
4. **Query Optimization**: Use MongoDB projections to select only needed fields

## Security Best Practices

1. **Environment Variables**: Never commit `.env` files
2. **CORS**: Restrict to specific origins in production
3. **Helmet**: Already enabled for HTTP header security
4. **JWT**: Use strong secrets (minimum 32 characters)
5. **Password Hashing**: Use bcryptjs for user passwords
6. **Input Validation**: Validate all user inputs with Zod
7. **Rate Limiting**: Consider adding rate limiting middleware in production

## Contributing Guidelines

1. Create feature branches from `main`
2. Follow TypeScript strict mode
3. Add proper error handling for all operations
4. Test endpoints before committing
5. Update this README for new features
6. Follow existing code style and patterns

## Support

For issues or questions:

- Check existing GitHub issues
- Review API documentation
- Contact the development team

## License

See LICENSE file in the root directory.
