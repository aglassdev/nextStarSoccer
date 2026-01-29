# Quick Setup Guide

## First Time Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Verify Environment Variables
The `.env` file should already be configured with your Appwrite credentials. If not, copy from the mobile app:

```env
VITE_APPWRITE_ENDPOINT=https://nyc.cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=68577380002195dec512
VITE_APPWRITE_DATABASE_ID=6842f11e0030e4b668a8
# ... etc
```

### 3. Start Development Server
```bash
npm run dev
```

The app will open at `http://localhost:3000`

## Testing the Application

### 1. Create a Test Account
- Navigate to `/signup`
- Enter name, email, and password
- Account will be created in your Appwrite backend

### 2. Test Authentication
- Login with the credentials you just created
- Should redirect to dashboard

### 3. Verify Appwrite Connection
- Open browser console (F12)
- Look for "✅ Appwrite initialized" message
- Check for successful session load

## Building for Production

```bash
npm run build
```

This creates optimized files in `dist/` directory.

## Common Issues

### Module Not Found Errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
```bash
npm run build
```
This will show all TypeScript errors.

### Environment Variables Not Loading
- Make sure `.env` file is in the root directory
- Variable names must start with `VITE_`
- Restart dev server after changing `.env`

## Responsive Testing

### Test Different Screen Sizes
1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Test these breakpoints:
   - Mobile: 375px width
   - Tablet: 768px width
   - Desktop: 1024px+ width

### What to Check
- ✅ Mobile shows bottom navigation
- ✅ Desktop shows sidebar
- ✅ Header appears only on mobile
- ✅ Content layouts adapt properly
- ✅ Touch targets are large enough on mobile

## Next Development Tasks

### High Priority
1. Connect real data from Appwrite collections
2. Implement event signup/cancellation
3. Add payment processing
4. Build family management features

### Medium Priority
1. Add loading states for async operations
2. Implement error handling and user feedback
3. Add form validation
4. Create modal/dialog components

### Low Priority
1. Add animations and transitions
2. Implement dark/light theme toggle
3. Add internationalization (i18n)
4. Set up analytics

## Folder Structure for New Features

When adding new features, follow this structure:

```
src/
  components/
    [feature-name]/
      Component.tsx
      
  pages/
    FeaturePage.tsx
    
  services/
    featureService.ts
    
  types/
    feature.ts
```

Example for "Messages" feature:
```
src/
  components/
    messages/
      MessageList.tsx
      MessageItem.tsx
      
  pages/
    MessagesPage.tsx
    
  services/
    messageService.ts
    
  types/
    message.ts
```

## Code Style Guidelines

### Component Structure
```tsx
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface MyComponentProps {
  // Props
}

const MyComponent = ({ prop1, prop2 }: MyComponentProps) => {
  // Hooks
  const { user } = useAuth();
  const [state, setState] = useState();
  
  // Effects
  useEffect(() => {
    // ...
  }, []);
  
  // Handlers
  const handleClick = () => {
    // ...
  };
  
  // Render
  return (
    <div className="...">
      {/* JSX */}
    </div>
  );
};

export default MyComponent;
```

### Tailwind CSS Conventions
- Use utility classes
- Responsive: `md:` `lg:` prefixes
- Dark mode ready: `dark:` prefix
- Hover states: `hover:` prefix
- Custom classes in `index.css` if needed repeatedly

## Deployment Checklist

Before deploying to production:

- [ ] Run `npm run build` successfully
- [ ] Test build locally with `npm run preview`
- [ ] Update environment variables on hosting platform
- [ ] Test on multiple devices and browsers
- [ ] Check console for errors
- [ ] Verify all routes work
- [ ] Test authentication flow
- [ ] Confirm Appwrite connection

## Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Appwrite Documentation](https://appwrite.io/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/)
