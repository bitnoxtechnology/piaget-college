# Piaget College Frontend Setup Guide

This is the frontend application for Piaget College of Education built with React, TypeScript, and Tailwind CSS. It includes student application forms, admissions information, and an admin dashboard.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Cloudinary account (for image uploads)

## Installation

### 1. Clone and Install Dependencies

```bash
cd paiget-college
npm install
```

### 2. Environment Configuration

Create a `.env.local` file in the `paiget-college` directory with the following variables:

```env
# Backend API
VITE_API_BASE_URL=http://localhost:5000/api

# Cloudinary Configuration
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_API_KEY=your_api_key
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

# Optional: Application Settings
VITE_APP_NAME=Piaget College
```

## Cloudinary Setup

### Step 1: Create a Cloudinary Account

1. Go to [Cloudinary.com](https://cloudinary.com)
2. Sign up for a free account
3. Verify your email

### Step 2: Get Your Credentials

1. Dashboard → Account Details
   - Copy your **Cloud Name** → `VITE_CLOUDINARY_CLOUD_NAME`
   - Copy your **API Key** → `VITE_CLOUDINARY_API_KEY`

### Step 3: Create an Upload Preset

1. Go to Settings → Upload
2. Scroll to "Upload presets"
3. Click "Add upload preset"
4. Set the following:
   - **Name**: `piaget_college_uploads`
   - **Signing Mode**: Unsigned
   - **Folder**: `piaget-college/uploads`
5. Click "Save"
6. Copy the preset name → `VITE_CLOUDINARY_UPLOAD_PRESET`

### Step 4: Configure Upload Settings (Optional but Recommended)

In your Cloudinary Settings → Upload:
- **Allowed file types**: jpg, jpeg, png, gif, webp, pdf
- **Max file size**: 50MB
- **Transformation presets**: Create for automatic image optimization

## Running the Application

### Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build

```bash
npm run build
```

This creates an optimized build in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## Project Structure

```
src/
├── components/           # Reusable React components
│   ├── ui/              # UI components (forms, buttons, etc.)
│   ├── about/           # About page components
│   ├── admin/           # Admin dashboard components
│   ├── forms/           # Form components
│   ├── navigations/     # Navigation components
│   └── ...
├── pages/               # Page components
│   ├── apply/           # Application form page
│   ├── admin/           # Admin pages
│   ├── admissions/      # Admission information pages
│   ├── news/            # News/blog pages
│   ├── contact/         # Contact page
│   └── ...
├── lib/                 # Utility functions and services
│   ├── cloudinary.ts    # Cloudinary upload function
│   ├── services/        # API service functions
│   ├── validations/     # Form validation schemas
│   └── ...
├── context/             # React Context for state management
├── hooks/               # Custom React hooks
├── layout/              # Layout components
└── styles/              # CSS stylesheets
```

## Key Features

### 1. Student Application Form
- Located at `/apply`
- Validates 16 form fields including:
  - Personal information (name, email, phone)
  - Educational background
  - Program selection
  - Payment reference
- Real-time validation with Zod
- Image upload via Cloudinary

### 2. Cloudinary Image Upload

The frontend integrates Cloudinary for image uploads. Example usage:

```typescript
import { uploadToCloudinary } from "@/lib/cloudinary";

// In your component
const handleUpload = async (file: File) => {
  try {
    const { url, publicId } = await uploadToCloudinary(file);
    console.log("Uploaded image URL:", url);
    // Save url to your form or database
  } catch (error) {
    console.error("Upload failed:", error);
  }
};
```

### 3. Admin Dashboard
- Located at `/admin/applications`
- View all student applications
- Search and filter applications
- Update application status
- Delete applications

### 4. Admissions Pages
- **Entry Requirements** (`/admissions/entry-requirements`)
- **How to Apply** (`/admissions/how-to-apply`)
- **For Prospective Students** (`/admissions/prospective-students`)

### 5. Public Pages
- Home page with hero section
- About page with mission and vision
- News/Blog listing
- Contact page
- Privacy Policy

## Technology Stack

- **Frontend Framework**: React 18+ with TypeScript
- **Styling**: Tailwind CSS with custom theme
- **Form Handling**: React Hook Form + Zod validation
- **UI Components**: shadcn/ui components
- **HTTP Client**: Axios
- **Animations**: Framer Motion
- **File Upload**: Cloudinary
- **Build Tool**: Vite
- **Linting**: ESLint
- **SEO**: React Helmet

## Form Validation

The application uses Zod for schema validation. Example from the application form:

```typescript
const applicationSchema = z.object({
  surname: z.string().min(2, "Surname must be at least 2 characters"),
  firstname: z.string().min(2, "First name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  dateOfBirth: z.date().refine((date) => {
    const age = new Date().getFullYear() - date.getFullYear();
    return age >= 16;
  }, "Must be at least 16 years old"),
  // ... more fields
});
```

## Custom Hooks

- `use-auth.tsx`: Authentication context hook
- `use-mobile.ts`: Responsive design hook for mobile detection

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API endpoint | `http://localhost:5000/api` |
| `VITE_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | `abc12345` |
| `VITE_CLOUDINARY_API_KEY` | Cloudinary API key | `1234567890abcd` |
| `VITE_CLOUDINARY_UPLOAD_PRESET` | Cloudinary upload preset | `piaget_college_uploads` |

## Troubleshooting

### Build Error: Invalid `ignoreDeprecations`
- Remove `ignoreDeprecations` from `tsconfig.app.json`

### Images Not Uploading
- Verify Cloudinary credentials in `.env.local`
- Check upload preset is marked as "Unsigned"
- Ensure file size is under the limit (50MB default)

### API Connection Issues
- Verify `VITE_API_BASE_URL` matches your backend server
- Check CORS settings on backend
- Ensure backend server is running

### TypeScript Errors During Build
- Run `npm run lint` to identify issues
- Fix type errors in your components
- Use `@ts-ignore` for unavoidable type issues (sparingly)

## Performance Tips

1. **Image Optimization**: Cloudinary automatically optimizes images - use transformations for responsive images
2. **Lazy Loading**: Use React's `lazy()` and `Suspense` for code splitting
3. **Bundle Analysis**: Use Vite's built-in analyzer to check bundle size
4. **Caching**: Configure HTTP caching headers for static assets

## Contributing Guidelines

1. Create feature branches from `main`
2. Follow TypeScript strict mode
3. Use Tailwind CSS with `!` suffix for margin/padding overrides
4. Test forms with various inputs before committing
5. Update this README for new features

## Deployment

### Vercel Deployment

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `VITE_API_BASE_URL`
   - `VITE_CLOUDINARY_CLOUD_NAME`
   - `VITE_CLOUDINARY_API_KEY`
   - `VITE_CLOUDINARY_UPLOAD_PRESET`
4. Deploy!

### Other Platforms

For Netlify, AWS Amplify, or other platforms:
- Ensure Node.js version is 16+
- Build command: `npm run build`
- Publish directory: `dist`
- Add same environment variables

## Support

For issues or questions:
- Check existing GitHub issues
- Review backend API documentation
- Contact the development team

## License

See LICENSE file in the root directory.
