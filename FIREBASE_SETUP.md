# Firebase Authentication Setup Guide

## Overview
This guide will help you set up Firebase authentication for your Vue.js library application to complete FIT5032 Lab 7 requirements.

## Prerequisites
- Node.js and npm installed
- Vue.js project set up
- Firebase account

## Step 1: Install Firebase
```bash
npm install firebase
```

## Step 2: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter your project name (e.g., "nomash-library")
4. Follow the setup wizard
5. Enable Google Analytics (optional)

## Step 3: Add Web App to Firebase
1. In your Firebase project console, click the web icon (</>) 
2. Register your app with a nickname (e.g., "NoMash Library")
3. Copy the Firebase configuration object

## Step 4: Update Firebase Configuration
Replace the placeholder configuration in `src/main.js` with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

## Step 5: Enable Authentication
1. In Firebase Console, go to "Authentication" → "Sign-in method"
2. Enable "Email/Password" authentication
3. Optionally enable other providers (Google, Facebook, etc.)

## Step 6: Test the Application
1. Run your development server: `npm run dev`
2. Navigate to `/firelogin` for basic authentication
3. Navigate to `/role-auth` for role-based authentication

## Demo Users for Testing
For the role-based authentication demo, you can use these test credentials:

- **Admin**: admin@library.com / admin123
- **Librarian**: librarian@library.com / librarian123  
- **Student**: student@library.com / student123

## Screenshots Required for Submission

### Task 7.1 (Pass/Credit Level)
1. **Registration Page Screenshots**:
   - Browser showing the registration form
   - VS Code showing the registration component code

2. **Login Page Screenshots**:
   - Browser showing the login form
   - VS Code showing the login component code
   - Browser console showing current user information

3. **Firebase Console Screenshot**:
   - Screenshot of registered users in Firebase Authentication console

### Task 7.2 (Distinction/High Distinction Level)
1. **Multiple Role Sign-in Screenshots**:
   - Browser showing different role dashboards
   - VS Code showing role-based authentication code

2. **Logout Screenshots**:
   - Browser showing logout functionality
   - Developer console showing user state before and after logout

## Features Implemented

### Basic Authentication (`/firelogin`)
- User registration with email/password
- User login with email/password
- User logout
- Real-time authentication state monitoring
- Error handling and user feedback

### Role-Based Authentication (`/role-auth`)
- Multiple user roles (Admin, Librarian, Student)
- Role-specific dashboards and content
- Demo users for testing
- Role switching functionality
- Console logging for debugging

## File Structure
```
src/
├── views/
│   ├── FireLoginView.vue      # Basic authentication
│   └── RoleBasedAuthView.vue  # Role-based authentication
├── components/
│   └── BHeader.vue           # Navigation with auth links
├── router/
│   └── index.js              # Routes for auth pages
└── main.js                   # Firebase configuration
```

## Troubleshooting

### Common Issues:
1. **Firebase not initialized**: Make sure you've replaced the placeholder config
2. **Authentication not working**: Check if Email/Password auth is enabled in Firebase
3. **CORS errors**: Ensure your domain is added to Firebase authorized domains

### Console Errors:
- Check browser console for detailed error messages
- Verify Firebase configuration values
- Ensure all required Firebase services are enabled

## Submission Checklist
- [ ] Firebase project created and configured
- [ ] Authentication enabled in Firebase console
- [ ] All screenshots captured as specified
- [ ] Code properly documented and organized
- [ ] Application tested with different user roles
- [ ] Console logs showing user authentication state

## Notes
- The role-based authentication uses demo users for demonstration purposes
- In a production environment, roles would be stored in Firebase Firestore or similar
- The GitHub reference in the lab requirements is optional and not required for submission 