# AadyaCircle

A comprehensive wellness and fitness platform combining AI-powered features, pose detection, and community support.

## Project Overview

AadyaCircle is a full-stack application designed to help users improve their fitness and wellness through intelligent exercise guidance, pose detection, AI-powered chat therapy, and community engagement. The platform features real-time exercise monitoring, personalized feedback, and a dashboard for tracking progress.

## Key Features

- **AI-Powered Chat**: Intelligent chatbot powered by Google Gemini API for fitness guidance and support
- **Pose Detection**: Real-time pose detection using MediaPipe and TensorFlow.js
- **Exercise Tracking**: Monitor exercises with real-time feedback and scoring
- **Dashboard**: Comprehensive dashboard with multiple modules:
  - AI Therapists: Interactive AI-powered therapeutic support
  - Community: Connect with other users
  - Exercise Improvement: Personalized exercise recommendations
  - Freelance Services: Professional services marketplace
  - Job Opportunities: Job listings for users
  - Sentiment Analysis: Track emotional wellness
- **User Authentication**: Secure JWT-based authentication with OTP support
- **Admin Panel**: Administrative tools for system management
- **Mail Integration**: Email notifications and communications

## Tech Stack

### Frontend

- **Framework**: React 19 with Vite
- **Styling**: TailwindCSS, GSAP animations
- **AI Integration**: Google Generative AI
- **Computer Vision**: MediaPipe, TensorFlow.js
- **Routing**: React Router v7
- **UI Components**: Custom components with animations

### Backend

- **Framework**: FastAPI (Python)
- **Database**: SQLAlchemy ORM
- **Authentication**: JWT tokens with OTP
- **AI Integration**: Google Gemini API
- **Email**: SMTP integration
- **API Structure**: Modular route-based architecture

## Project Structure

```
AadyaCircle/
├── frontend/                 # React Vite application
│   ├── src/
│   │   ├── Components/      # Reusable UI components
│   │   ├── Dashbaord/       # Dashboard modules
│   │   ├── context/         # React context (Auth)
│   │   └── utils/           # Utility functions
│   └── package.json
│
└── backend/                  # FastAPI application
    ├── app/
    │   ├── ai/              # AI features (chat, sentiment)
    │   ├── api/             # API routes
    │   ├── auth/            # Authentication (JWT, OTP)
    │   ├── control/         # Business logic
    │   ├── database/        # Database models & operations
    │   └── schemas/         # Request/Response schemas
    ├── bin/
    │   ├── config.py        # Configuration
    │   └── run.py           # Server entry point
    └── app/main.py          # FastAPI app initialization
```

## Getting Started

### Prerequisites

- **Frontend**: Node.js 16+ and npm/yarn
- **Backend**: Python 3.8+

### Quick Start

1. **Clone the repository**

```bash
git clone <repository-url>
cd AadyaCircle
```

2. **Setup Backend**

```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
# Configure your environment variables
cd bin
python run.py
```

3. **Setup Frontend**

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

### Backend (.env)

```
GMAIL_ADDRESS=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
GEMINI_API_KEY=your-gemini-api-key
DATABASE_URL=sqlite:///./test.db
SECRET_KEY=your-secret-key
```

## Documentation

- [Frontend Documentation](./frontend/README.md) - Frontend setup, structure, and development guide
- [Backend Documentation](./backend/README.md) - Backend setup, API routes, and architecture

## Key Modules

### Frontend Modules

- **Components**: Reusable React components for UI
- **Dashboard**: Multi-module dashboard system
- **ExerciseLogic**: Exercise tracking and validation
- **PoseDetector**: Real-time pose detection wrapper
- **WebcamFeed**: Webcam integration for pose detection

### Backend Modules

- **AI Module**: Chat, sentiment analysis, prompt management
- **API Routes**: Admin, AI, freelancer, job, login routes
- **Auth**: JWT handling, OTP verification
- **Control**: User management, admin operations, mail
- **Database**: SQLAlchemy models and queries
- **Schemas**: Request validation schemas

## Development

### Frontend Development

```bash
cd frontend
npm run dev      # Start dev server with hot reload
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

### Backend Development

```bash
cd backend
python -m pip install -r requirements.txt
cd bin
python run.py    # Start development server with auto-reload
```

## API Documentation

Once the backend is running, access the interactive API documentation at:

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Features in Detail

### Pose Detection

- Uses MediaPipe for skeleton tracking
- TensorFlow.js for browser-based inference
- Real-time angle calculation and form validation
- Rep counting and scoring system

### AI Features

- Google Gemini integration for intelligent conversations
- Sentiment analysis for emotional wellness tracking
- Memory store for maintaining conversation context
- Personalized prompt management

### Authentication

- JWT-based token authentication
- OTP verification for account security
- User session management

## Contributing

Please ensure:

- Code follows project style guidelines
- All features are tested
- README files are updated for new features
- Environment variables are properly documented

## Support

For issues and questions, please refer to the documentation in individual module README files.

---

**Last Updated**: April 2026
**Version**: 1.0.0
