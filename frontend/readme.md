# Frontend - AadyaCircle

React + Vite-based frontend application with real-time pose detection, exercise tracking, and AI-powered wellness dashboard.

## Overview

The frontend is a modern React application built with Vite, featuring real-time pose detection, interactive dashboards, and seamless integration with the AI-powered backend. It provides users with an intuitive interface for fitness tracking, AI-powered coaching, and community engagement.

## Tech Stack

- **Framework**: React 19.2.4
- **Build Tool**: Vite 8.0.1
- **Styling**: TailwindCSS 4.2.2
- **UI Animations**: GSAP 3.14.2, Motion 12.38.0
- **AI Integration**: Google Generative AI (Gemini)
- **Computer Vision**:
  - MediaPipe Pose (0.5.1675469404)
  - TensorFlow.js (4.22.0)
  - TensorFlow Pose Detection (2.1.3)
- **Routing**: React Router DOM v7.14.0
- **3D Graphics**: Three.js (for future enhancements)
- **Gesture Recognition**: @use-gesture/react

## Project Structure

```
frontend/
├── src/
│   ├── Components/
│   │   ├── FeedbackDisplay.*       # Feedback UI components
│   │   ├── Dashbaord/              # Dashboard modules
│   │   │   ├── AITherapists.jsx    # AI chat interface
│   │   │   ├── Community.jsx       # Community features
│   │   │   ├── Dashboard.jsx       # Main dashboard
│   │   │   ├── Freelance.jsx       # Freelance services
│   │   │   ├── JobsForHer.jsx      # Job listings
│   │   │   └── SentimentAnalysis.jsx
│   │   ├── Generic/                # Reusable generic components
│   │   │   ├── BorderGlow.jsx
│   │   │   ├── DomeGallery.jsx
│   │   │   ├── Snowfall.jsx
│   │   │   ├── Spotlight.jsx
│   │   │   └── Stepper.jsx
│   │   └── public/                 # Public pages
│   │       ├── About.jsx
│   │       ├── Landing.jsx
│   │       ├── Login.jsx
│   │       ├── Navbar.jsx
│   │       └── Signup.jsx
│   ├── context/
│   │   └── AuthContext.jsx         # Global auth state
│   ├── shims/                      # Library shims
│   │   ├── mediapipePoseShim.js
│   │   └── tfjsWebgpuShim.js
│   ├── utils/                      # Utility functions
│   │   ├── calculateAngle.js       # Angle calculation for poses
│   │   ├── repCounter.js           # Exercise rep counting
│   │   └── scoring.js              # Exercise scoring
│   ├── App.jsx                     # Root component
│   ├── main.jsx                    # Entry point
│   └── styles (App.css, index.css)
├── public/                         # Static assets
├── index.html
├── vite.config.js
├── eslint.config.js
└── package.json
```

## Installation & Setup

### Prerequisites

- Node.js 16 or higher
- npm or yarn

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Environment Configuration

Create a `.env` file in the frontend directory (if needed):

```env
VITE_API_URL=http://localhost:8000
VITE_GOOGLE_GEMINI_KEY=your-gemini-api-key-if-used-directly
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5174` with hot module replacement (HMR) enabled.

## Available Scripts

### Development

```bash
npm run dev
```

Starts the Vite development server with hot reload.

- Accessible at `http://localhost:5174`
- Watches for file changes automatically

### Build for Production

```bash
npm run build
```

Creates an optimized production build in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

Locally preview the production build before deployment.

### Linting

```bash
npm run lint
```

Runs ESLint to check code quality and style.

## Key Features

### 1. Pose Detection

- Real-time pose tracking using MediaPipe
- Browser-based inference with TensorFlow.js
- Calculates joint angles for form validation
- Provides immediate feedback during exercises

**Files Involved:**

- `Components/PoseDetector.js` - Main detection logic

- `utils/calculateAngle.js` - Angle calculations
- `shims/mediapipePoseShim.js` - MediaPipe wrapper

### 2. Exercise Tracking

- Real-time rep counting
- Exercise scoring based on form
- Feedback display for form corrections
- Rep counter utility for various exercises

**Files Involved:**

- `utils/repCounter.js` - Rep counting algorithm
- `utils/scoring.js` - Score calculation
- `Components/FeedbackDisplay.jsx` - User feedback

### 3. Dashboard System

- Multi-module dashboard interface
- AI-powered therapy chat
- Community engagement features
- Job and freelance opportunities
- Sentiment analysis and wellness tracking

**Modules:**

- `Dashboard/AITherapists.jsx` - AI chat support
- `Dashboard/Community.jsx` - Social features

- `Dashboard/Freelance.jsx` - Service marketplace
- `Dashboard/JobsForHer.jsx` - Job portal
- `Dashboard/SentimentAnalysis.jsx` - Wellness tracking

### 4. Authentication

- JWT token-based authentication
- Login/Signup flows
- Auth context for global state management
- Protected routes

**Files Involved:**

- `context/AuthContext.jsx` - Auth state management
- `Components/public/Login.jsx` - Login form
- `Components/public/Signup.jsx` - Registration form

### 5. UI Components

- Custom animated components with GSAP
- Tailwind CSS styling
- Spotlight, Border Glow, and other visual effects
- Responsive design

## Component Usage Examples

### Using Pose Detector

```jsx
import PoseDetector from "./Components/PoseDetector";

function App() {
  const handlePoseUpdate = (landmarks) => {
    console.log("Pose landmarks:", landmarks);
  };

  return <PoseDetector onPoseUpdate={handlePoseUpdate} />;
}
```

### Using Webcam Feed

```jsx
import WebcamFeed from "./Components/WebcamFeed";

function ExercisePage() {
  return <WebcamFeed showPose={true} />;
}
```

### Using Auth Context

```jsx
import { useAuth } from "./context/AuthContext";

function Profile() {
  const { user, logout } = useAuth();

  return (
    <div>
      <p>Welcome, {user?.name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

## API Integration

The frontend communicates with the FastAPI backend at `http://localhost:8000`.

### Main API Endpoints Used:

- **Auth**: `/api/login`, `/api/signup`, `/api/verify-otp`
- **AI Chat**: `/api/ai/chat`
- **User**: `/api/user/profile`, `/api/user/update`
- **Admin**: `/api/admin/*` (admin routes)
- **Jobs**: `/api/jobs/*` (job listings)
- **Freelancer**: `/api/freelancer/*` (freelance services)

## Debugging

### Enable Debug Mode

Set `VITE_DEBUG=true` in your `.env` file for verbose logging.

### Browser DevTools

- Use React DevTools for component inspection
- Check Network tab for API calls
- Use Console for error messages

### Common Issues

**Pose Detection Not Working:**

- Ensure webcam permissions are granted
- Check TensorFlow models are loaded
- Verify MediaPipe resources are accessible

**API Connection Issues:**

- Verify backend is running on `localhost:8000`
- Check CORS configuration in backend
- Review browser console for specific errors

## Performance Optimization

- Lazy loading of heavy components
- Image optimization for assets
- Code splitting with Vite
- Efficient re-renders with React hooks
- TensorFlow model caching

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Development Tips

1. **Hot Module Replacement**: Changes to components instantly reflect without page reload
2. **State Management**: Use AuthContext for global auth state
3. **Component Composition**: Break down features into smaller reusable components
4. **Styling**: Use Tailwind classes with custom GSAP animations for complex effects
5. **Testing**: Write tests for critical utilities like angle calculation and rep counting

## Building for Production

1. Ensure all environment variables are set correctly
2. Run `npm run build` to create production bundle
3. Test with `npm run preview`
4. Deploy the `dist/` folder to your hosting service

## Troubleshooting

### Port Already in Use

```bash
npm run dev -- --port 5175
```

### Module Resolution Issues

```bash
rm -rf node_modules package-lock.json
npm install
```

### Cache Issues

```bash
npm run dev -- --force
```

## Contributing

- Follow existing code style (ESLint config)
- Test components before committing
- Update documentation for new features
- Keep components reusable and modular

## Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [MediaPipe](https://mediapipe.dev/)
- [TensorFlow.js](https://www.tensorflow.org/js)
- [React Router](https://reactrouter.com/)

## Support

For issues specific to the frontend, check:

1. Browser console for errors
2. Network tab for API response errors
3. React DevTools for component state issues
4. Project documentation in the main README

---

**Last Updated**: April 2026
**Version**: 1.0.0
