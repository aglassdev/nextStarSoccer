# Next Star Soccer - Web Application

A modern, responsive web application for Next Star Soccer built with React, TypeScript, and Tailwind CSS. This application connects to the same Appwrite backend as the mobile app, providing a seamless experience across all platforms.

## 🚀 Features

### Responsive Design
- **Desktop Mode**: Full sidebar navigation with landscape-optimized layouts
- **Mobile Mode**: Bottom tab navigation with portrait-optimized views
- Seamless transitions between screen sizes

### Core Functionality
- **Authentication**: Secure login/signup with Appwrite
- **Dashboard**: Overview of events, billing, and activity
- **Events Management**: View and sign up for training sessions
- **Billing**: Track payments and billing history
- **Profile**: Manage account settings and preferences

### Technical Stack
- **React 18** with TypeScript for type safety
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for responsive, utility-first styling
- **React Router** for client-side routing
- **Appwrite SDK** for backend integration

## 📋 Prerequisites

- Node.js 18+ and npm
- Access to the Appwrite backend (credentials in `.env`)

## 🛠️ Installation

1. **Clone or create the project**:
   ```bash
   cd nss-web
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   - The `.env` file is already configured with your Appwrite credentials
   - All environment variables are prefixed with `VITE_` for Vite compatibility

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   - Navigate to `http://localhost:3000`
   - The app will hot-reload as you make changes

## 📁 Project Structure

```
nss-web/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── layout/         # Layout components (Sidebar, Header, etc.)
│   │   └── common/         # Common components (LoadingScreen, etc.)
│   ├── contexts/           # React contexts (Auth, etc.)
│   ├── pages/              # Page components
│   │   ├── auth/          # Authentication pages
│   │   └── ...            # Dashboard, Events, Billing, Profile
│   ├── services/           # API and service integrations
│   ├── types/              # TypeScript type definitions
│   ├── App.tsx            # Main app component with routing
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles with Tailwind
├── .env                    # Environment variables
├── index.html             # HTML entry point
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

## 🎨 Design System

### Colors
- **Primary**: Blue (#1E40AF) - Main brand color
- **Secondary**: Green (#10B981) - Success states
- **Background**: Dark gray (#1a1a1a, #242424)
- **Surface**: Gray-800 (#1f2937)

### Responsive Breakpoints
- **Mobile**: < 768px (Bottom navigation)
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px (Sidebar navigation)

### Typography
- Font family: Inter (system fallback)
- Headings: Bold weights
- Body: Regular weight

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔐 Authentication Flow

1. User lands on login page (if not authenticated)
2. Can sign up for new account or login with existing credentials
3. Authentication handled by Appwrite
4. Session persisted across page reloads
5. Protected routes require authentication
6. Logout clears session and redirects to login

## 📱 Responsive Behavior

### Desktop (≥1024px)
- Fixed sidebar navigation on the left
- Full-width content area
- Multi-column layouts where appropriate
- Hover states and interactions

### Mobile (<1024px)
- Top header with user info
- Bottom tab navigation
- Single-column layouts
- Touch-optimized buttons and spacing

## 🔗 Integration with Appwrite

### Collections Used
- Parent Users
- Youth Players
- Collegiate Players
- Professional Players
- Team Training Events
- Event Signups
- Bills & Payments
- Messages
- Family Relationships

### Services
- Authentication (account)
- Database (databases)
- Storage (storage)
- Functions (functions)

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

This creates an optimized build in the `dist/` directory.

### Deploy Options
- **Vercel**: Connect your Git repository for automatic deployments
- **Netlify**: Drag and drop the `dist` folder or connect Git
- **AWS S3 + CloudFront**: Upload `dist` to S3 bucket
- **Any static hosting**: Upload `dist` folder contents

### Environment Variables for Production
Make sure to set all `VITE_*` environment variables in your hosting platform.

## 🔄 Differences from Mobile App

### Visual
- Landscape-optimized layouts for desktop
- Sidebar navigation vs. mobile tabs
- Multi-column grids on larger screens
- Different spacing and sizing

### Functional
- Same data and functionality
- Same Appwrite backend
- Same user accounts
- Consistent business logic

### Technical
- React web vs. React Native
- Tailwind CSS vs. StyleSheet
- Browser APIs vs. Native APIs

## 🐛 Troubleshooting

### Build Errors
- Run `npm install` to ensure all dependencies are installed
- Check Node.js version (18+ required)
- Clear `node_modules` and reinstall if needed

### Appwrite Connection Issues
- Verify `.env` file has correct credentials
- Check network connectivity
- Ensure Appwrite endpoint is accessible

### TypeScript Errors
- Run `npm run build` to check for type errors
- Update type definitions if needed

## 📚 Next Steps

### Recommended Features to Add
1. Real-time updates with Appwrite Realtime
2. Image upload for profile pictures
3. Advanced event filtering and search
4. Payment integration with Stripe
5. Push notifications (web push)
6. Offline support with service workers
7. Analytics integration

### Code Improvements
1. Add comprehensive error boundaries
2. Implement loading skeletons
3. Add form validation library (e.g., React Hook Form)
4. Set up automated testing (Vitest, React Testing Library)
5. Add API service layer with React Query
6. Implement proper state management if needed (Zustand, Redux)

## 📄 License

Private project for Next Star Soccer.

## 👥 Support

For issues or questions, contact the development team.
