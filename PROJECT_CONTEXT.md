# AadyaCircle - Complete Project Context

**Project Date**: April 2026  
**Type**: Full-Stack Web Application  
**Purpose**: AI-powered wellness platform combining fitness tracking, mental health support, and community engagement

---

## 📋 Executive Summary

AadyaCircle is a comprehensive wellness and fitness platform designed to empower women with accessible fitness coaching, mental wellness support, job opportunities, and community connection. The platform features:

- **Real-time exercise tracking** with pose detection (MediaPipe + TensorFlow.js)
- **AI-powered chat therapy** using Google Gemini API
- **Meditation and mindfulness** with pose-based stillness tracking
- **Sentiment analysis** for emotional wellness monitoring
- **Community forums** for user engagement
- **Freelance services marketplace** for professional coaching
- **Job board** with women-focused opportunities
- **Secure JWT-based authentication** with OTP support
- **Comprehensive admin panel** for system management

---

## 🏗️ Project Architecture

### High-Level Flow

```
Client (React/Vite Frontend)
    ↓
HTTP/WebSocket
    ↓
FastAPI Backend (Python)
    ↓
Services Layer (AI, Auth, Mail)
    ↓
Database (SQLAlchemy ORM)
```

### Deployment Topology

```
Frontend: http://localhost:5174 (Vite dev server)
Backend: http://localhost:8000 (FastAPI/Uvicorn)
Database: SQLite (default, can scale to PostgreSQL)
```

---

## 🛠️ Complete Tech Stack

### Frontend (React + Vite)

| Layer               | Technology           | Version          | Purpose                |
| ------------------- | -------------------- | ---------------- | ---------------------- |
| **Framework**       | React                | 19.2.4           | UI library             |
| **Build**           | Vite                 | 8.0.1            | Fast bundler           |
| **Styling**         | TailwindCSS          | 4.2.2            | Utility-first CSS      |
| **Animations**      | Motion.js + GSAP     | 12.38.0 + 3.14.2 | UI animations          |
| **Routing**         | React Router DOM     | 7.14.0           | Client-side routing    |
| **Computer Vision** | MediaPipe Pose       | 0.5.1675469404   | Pose detection (JS)    |
| **ML Framework**    | TensorFlow.js        | 4.22.0           | ML inference (JS)      |
| **Pose Model**      | MoveNet (Lightning)  | 2.1.3            | Fast pose estimation   |
| **AI Chat**         | Google Generative AI | 0.24.1           | Gemini API client      |
| **UI Components**   | Lucide React         | 1.7.0            | Icon library           |
| **3D Graphics**     | Three.js             | 0.183.2          | 3D rendering           |
| **Charts**          | Recharts             | 3.8.1            | Data visualization     |
| **Gestures**        | @use-gesture/react   | 10.3.1           | Touch/gesture handling |
| **Face Detection**  | face-api.js          | 0.22.2           | Face recognition       |

### Backend (Python + FastAPI)

| Layer           | Technology          | Version  | Purpose                       |
| --------------- | ------------------- | -------- | ----------------------------- |
| **Framework**   | FastAPI             | Latest   | Web framework                 |
| **Server**      | Uvicorn             | Latest   | ASGI server                   |
| **ORM**         | SQLAlchemy          | Latest   | Database abstraction          |
| **Database**    | SQLite              | Latest   | Default DB (PostgreSQL-ready) |
| **Auth**        | python-jose         | Latest   | JWT handling                  |
| **Password**    | passlib             | Latest   | Secure hashing                |
| **Validation**  | Pydantic            | Latest   | Data validation               |
| **AI**          | google-generativeai | Latest   | Gemini API                    |
| **Email**       | smtplib             | Built-in | SMTP for Gmail                |
| **Environment** | python-dotenv       | Latest   | Config management             |
| **CORS**        | fastapi-cors        | Latest   | Cross-origin handling         |

---

## 📁 Complete File Structure

```
AadyaCircle/
│
├── 📄 README.md                          # Project overview
├── 📄 PROJECT_CONTEXT.md                 # This file - chatbot context
│
├── frontend/                             # React + Vite Application
│   ├── 📄 README.md                      # Frontend setup docs
│   ├── 📄 package.json                   # Dependencies & scripts
│   ├── 📄 vite.config.js                 # Vite configuration
│   ├── 📄 eslint.config.js              # Linting rules
│   ├── 📄 index.html                     # HTML template
│   │
│   ├── src/
│   │   ├── 📄 App.jsx                    # Root component with routing
│   │   ├── 📄 main.jsx                   # Vite entry point
│   │   ├── 📄 App.css                    # Global styles
│   │   ├── 📄 index.css                  # Base styles
│   │   │
│   │   ├── Components/
│   │   │   ├── Dashbaord/                # Dashboard features
│   │   │   │   ├── Dashboard.jsx         # Main hub component
│   │   │   │   ├── Exercise.jsx          # Exercise selection screen
│   │   │   │   ├── ExercisesList.jsx     # Exercise library grid
│   │   │   │   ├── ExercisePerformer.jsx # Live exercise tracking (pose detection)
│   │   │   │   ├── ExerciseResult.jsx    # Post-exercise summary
│   │   │   │   ├── Meditation.jsx        # Meditation session with tracking ⭐
│   │   │   │   ├── AITherapists.jsx      # AI chat interface
│   │   │   │   ├── SentimentAnalysis.jsx # Emotional wellness assessment
│   │   │   │   ├── Community.jsx         # Community forum
│   │   │   │   ├── Freelance.jsx         # Freelance services marketplace
│   │   │   │   ├── JobsForHer.jsx        # Job listings (women-focused)
│   │   │   │   └── GovtServices.jsx      # Government resources hub
│   │   │   │
│   │   │   ├── Generic/                  # Reusable components
│   │   │   │   ├── BorderGlow.jsx        # Glowing border effect
│   │   │   │   ├── DomeGallery.jsx       # 3D gallery viewer
│   │   │   │   ├── Snowfall.jsx          # Animated snowfall
│   │   │   │   ├── Spotlight.jsx         # Spotlight animation
│   │   │   │   └── Stepper.jsx           # Multi-step form
│   │   │   │
│   │   │   ├── public/                   # Public pages (pre-login)
│   │   │   │   ├── Landing.jsx           # Marketing landing page
│   │   │   │   ├── Login.jsx             # Login form
│   │   │   │   ├── Signup.jsx            # Registration form
│   │   │   │   ├── About.jsx             # About page
│   │   │   │   └── Navbar.jsx            # Navigation bar
│   │   │   │
│   │   │   └── ui/
│   │   │       └── CardSwap.jsx          # Card animation component
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx           # Global auth & progress state
│   │   │       ├── token (JWT)
│   │   │       ├── user (profile)
│   │   │       ├── progress (unlocked features)
│   │   │       └── exerciseStats (history)
│   │   │
│   │   ├── utils/                        # Core utility functions
│   │   │   ├── poseDetector.js           # MediaPipe/TF.js pose detection
│   │   │   │   ├── initializePoseDetector()
│   │   │   │   ├── detectPose()
│   │   │   │   ├── drawSkeleton()
│   │   │   │   └── filterKeypointsByScore()
│   │   │   ├── repCounter.js             # Exercise rep counting (state machine)
│   │   │   │   └── JumpingJackCounter class
│   │   │   ├── scoring.js                # Form quality scoring
│   │   │   │   └── JumpingJackScorer class
│   │   │   ├── calculateAngle.js         # Joint angle math
│   │   │   │   ├── calculateAngle()
│   │   │   │   └── calculateDistance()
│   │   │   └── exerciseConfig.js         # Exercise definitions
│   │   │       └── EXERCISES object
│   │   │
│   │   ├── shims/                        # Compatibility shims
│   │   │   ├── mediapipePoseShim.js
│   │   │   └── tfjsWebgpuShim.js
│   │   │
│   │   └── assets/                       # Static files
│   │       └── [images, videos, fonts]
│   │
│   └── public/                           # Static files served directly
│
└── backend/                              # FastAPI Application
    ├── 📄 README.md                      # Backend setup docs
    ├── 📄 requirements.txt               # Python dependencies
    ├── 📄 .env                           # Environment variables (not in repo)
    │
    ├── bin/
    │   ├── 📄 run.py                     # Server entry point (starts Uvicorn)
    │   └── 📄 config.py                  # Environment configuration loader
    │
    └── app/
        ├── 📄 main.py                    # FastAPI app initialization & route registration
        │
        ├── ai/                           # AI & ML features
        │   ├── 📄 chat.py                # Gemini API chat handler
        │   ├── 📄 memory_store.py        # Conversation memory management
        │   ├── 📄 prompt.py              # Prompt templates & management
        │   ├── 📄 refine.py              # Response refinement logic
        │   ├── 📄 sentiment.py           # Sentiment analysis
        │   └── 📄 questions.txt          # Sample Q&A data
        │
        ├── api/                          # API route handlers
        │   ├── 📄 __init__.py
        │   ├── 📄 login_route.py         # Auth endpoints
        │   │   ├── POST /auth/signup
        │   │   ├── POST /auth/login
        │   │   ├── POST /auth/send-otp
        │   │   └── POST /auth/verify-otp
        │   ├── 📄 ai_route.py            # AI endpoints
        │   │   ├── POST /ai/chat
        │   │   └── POST /ai/sentiment
        │   ├── 📄 job_route.py           # Job endpoints
        │   │   ├── GET /jobs
        │   │   ├── POST /jobs
        │   │   └── GET /jobs/{id}
        │   ├── 📄 freelancer_routes.py   # Freelance endpoints
        │   ├── 📄 admin_route.py         # Admin endpoints
        │
        ├── auth/                         # Authentication & security
        │   ├── 📄 jwt_handler.py         # JWT token creation/validation
        │   │   ├── create_access_token()
        │   │   └── verify_token()
        │   ├── 📄 otp.py                 # OTP generation & verification
        │   │   ├── generate_otp()
        │   │   └── verify_otp()
        │   └── 📄 deps.py                # Dependency injections (get_current_user, etc.)
        │
        ├── control/                      # Business logic layer
        │   ├── 📄 user.py                # User management service
        │   │   ├── create_user()
        │   │   ├── get_user()
        │   │   └── update_profile()
        │   ├── 📄 admin.py               # Admin operations
        │   ├── 📄 mail.py                # Email service
        │   │   ├── send_otp_email()
        │   │   └── send_notification()
        │   └── 📄 integrity.py           # Data validation & checks
        │
        ├── database/                     # Data access layer
        │   ├── 📄 db.py                  # Database connection & session
        │   │   └── SessionLocal (SQLAlchemy)
        │   ├── 📄 models.py              # SQLAlchemy ORM models ⭐
        │   │   ├── User
        │   │   ├── OTPCode
        │   │   ├── Job
        │   │   ├── [Exercise, Meditation, etc.]
        │   │   └── [Community, Freelance, etc.]
        │   ├── 📄 init_db.py             # Database initialization
        │   ├── 📄 getuser.py             # User query helpers
        │   └── 📄 service.py             # Database service layer
        │
        └── schemas/                      # Pydantic request/response models
            ├── 📄 models.py              # Base schemas
            ├── 📄 set_01.py              # User/Auth schemas
            ├── 📄 set_03.py              # Exercise schemas
            ├── 📄 set_04.py              # Community schemas
            └── 📄 set_ai_02.py           # AI/Chat schemas
```

---

## 🎯 Core Features & Workflows

### 1️⃣ Real-Time Exercise Tracking

**Flow**:

```
User selects exercise
    ↓
Frontend initializes MoveNet (TensorFlow.js)
    ↓
Access user camera
    ↓
Real-time pose detection loop (requestAnimationFrame)
    ↓
Rep counting state machine
    ↓
Form scoring (angle calculations)
    ↓
Live feedback overlay
    ↓
Backend: POST /exercise/track with results
    ↓
Database: Log exercise stats
```

**Key Files**:

- `utils/poseDetector.js` - Pose estimation
- `utils/repCounter.js` - Rep counting logic
- `utils/scoring.js` - Form quality scoring
- `Components/Dashbaord/ExercisePerformer.jsx` - UI component
- Backend: `api/job_route.py` - Exercise logging endpoint

**Supported Exercises**:

1. Jumping Jacks - Arm height + leg width detection
2. Squats - Knee angle analysis
3. Push-ups - Elbow angle analysis
4. Lunges - Step detection
5. Planks - Static hold detection
6. High Knees - Knee height tracking
7. Crunches - Spine curve analysis

---

### 2️⃣ Meditation with Pose Tracking

**Flow**:

```
User starts meditation session
    ↓
Timer begins (configurable: default 10 mins)
    ↓
Breathing animation (4s cycle: Inhale → Hold → Exhale)
    ↓
Optional: Enable pose tracking (click Video button)
    ↓
Camera initialized + MoveNet loads
    ↓
Continuous stillness scoring based on nose position
    ↓
Skeleton overlay on floating video
    ↓
Session complete (auto or manual)
    ↓
Show summary modal with stats
    ↓
Update streak & total minutes (localStorage)
```

**Key Component**: `Components/Dashbaord/Meditation.jsx` ⭐

**Features**:

- Soundscapes (Rain, Forest, Ocean, White Noise)
- Real-time stillness score (0-100%)
- Weekly analytics chart
- Session history tracking
- Streak counter
- Personal growth messaging

---

### 3️⃣ AI Chat Therapy

**Flow**:

```
User opens AI Therapist
    ↓
Frontend sends message to POST /ai/chat
    ↓
Backend: Load conversation history
    ↓
Backend: Check for crisis keywords
    ↓
If crisis detected → Return crisis response + helpline
    ↓
If safe → Generate reply via Gemini API
    ↓
Backend: Analyze sentiment
    ↓
Suggest tools (breathing exercise, journaling, grounding)
    ↓
Store conversation in memory_store
    ↓
Return reply + tool suggestions to frontend
```

**Key Files**:

- Frontend: `Components/Dashbaord/AITherapists.jsx`
- Backend: `ai/chat.py` - Chat logic
- Backend: `ai/sentiment.py` - Emotional analysis
- Backend: `ai/memory_store.py` - Conversation history
- Backend: `api/ai_route.py` - Chat endpoint

**Crisis Detection Keywords**: "suicide", "kill myself", "end my life", "want to die"

---

### 4️⃣ Authentication Flow

**Signup**:

```
User enters email → POST /auth/signup
    ↓
Backend: Create user record (inactive)
    ↓
Backend: Generate OTP, send via email
    ↓
Frontend: Show OTP verification screen
    ↓
User enters OTP → POST /auth/verify-otp
    ↓
Backend: Verify OTP, activate account
    ↓
Backend: Create JWT token
    ↓
Frontend: Store token in localStorage
    ↓
Frontend: Redirect to dashboard
```

**Login**:

```
User enters email → POST /auth/send-otp
    ↓
Backend: Generate OTP, send via email
    ↓
User enters OTP → POST /auth/login (with OTP)
    ↓
Backend: Verify OTP, generate JWT
    ↓
Frontend: Store JWT, set AuthContext
```

**Key Files**:

- Backend: `auth/jwt_handler.py` - Token management
- Backend: `auth/otp.py` - OTP generation
- Backend: `api/login_route.py` - Auth endpoints
- Frontend: `context/AuthContext.jsx` - State management

---

### 5️⃣ Sentiment Analysis

**Purpose**: Assess emotional wellness & unlock features

**Flow**:

```
User completes sentiment assessment (questionnaire)
    ↓
Frontend: POST /ai/sentiment with responses
    ↓
Backend: Analyze sentiment + generate summary
    ↓
Backend: Update user progress (sentimentCompleted = true)
    ↓
Unlock dashboard features based on sentiment insights
    ↓
Recommend AI therapy or specific exercises
```

---

### 6️⃣ Job Board

**Flow**:

```
User browses jobs → GET /jobs?filters
    ↓
Backend: Query jobs from database
    ↓
Filter by: location, skills, salary, job type
    ↓
Frontend: Display job cards
    ↓
User clicks job → GET /jobs/{id}
    ↓
Show full job details
    ↓
User applies → POST /jobs/{id}/apply
    ↓
Backend: Create application record
    ↓
Backend: Send confirmation email
```

**Database Model**: `Job`

- title, description, company, location, salary
- skills (array), job_type
- posted_at, user_id (job poster)

---

### 7️⃣ Freelance Services

**Similar workflow** to Jobs:

```
Browse → Filter → View Detail → Book Session → Backend records booking
```

---

## 🔐 Authentication & State

### JWT Tokens

**Structure**: `Header.Payload.Signature`

**Payload Contains**:

```json
{
  "sub": "user_id",
  "email": "user@example.com",
  "exp": 1234567890,
  "iat": 1234567800
}
```

**Location**: Stored in frontend `localStorage` as `token`

**Expiration**: Configurable in `.env` (default: 30 minutes)

### OTP Verification

**Flow**:

1. Generate 6-digit random code
2. Hash code before storing (never store plaintext)
3. Send hash via email
4. User enters code
5. Hash entered code, compare with stored hash
6. Mark as used, set expiration

### Global State (AuthContext)

```javascript
{
  token,                    // JWT token
  user,                     // User profile object
  progress: {
    sentimentCompleted,     // Bool: assessment done?
    sentimentSummary,       // String: assessment result
    unlockedFeatures: {},   // Dict: feature access flags
    exerciseStats: []       // Array: exercise history
  }
}
```

**Persistence**: `localStorage` saves token and progress (survives refresh)

---

## 📊 Database Models

### User

```sql
users:
├── id (PK, auto-increment)
├── uid (UUID, unique, external reference)
├── handle (String, unique, username)
├── name (String)
├── email (String, unique)
├── phone (String, unique)
├── role (String: "user", "admin", "therapist")
├── is_email_verified (Boolean)
├── is_phone_verified (Boolean)
├── password_hash (Text, bcrypt)
├── bio (Text)
├── avatar_url (Text)
├── is_active (Boolean)
├── is_suspended (Boolean)
├── created_at (Timestamp)
└── updated_at (Timestamp)
```

### OTPCode

```sql
otp_codes:
├── ref (PK, auto-increment)
├── user_id (FK → users.id)
├── contact (String: email or phone)
├── code_hash (Text: bcrypt hash)
├── purpose (String: "signup", "login", "reset")
├── expires_at (Timestamp)
├── is_used (Boolean)
├── attempt_count (Integer)
└── created_at (Timestamp)
```

### Job

```sql
jobs:
├── ref (PK, auto-increment)
├── user_id (FK → users.id, job poster)
├── title (String)
├── description (Text)
├── job_type (String: "full-time", "part-time", "contract")
├── skills (Array of String)
├── company (String)
├── location (String)
├── salary (Integer, optional)
└── posted_at (Timestamp)
```

**Additional Models** (inferred from structure):

- `Exercise` - Exercise tracking records
- `Meditation` - Meditation session history
- `Conversation` - AI chat history
- `Community` - Forum posts/comments
- `Freelancer` - Service provider profiles
- `Application` - Job application records

---

## 🔌 API Endpoints Reference

### Authentication

```
POST /api/auth/signup
  Body: { email, password }
  Response: { message, requires_otp: true }

POST /api/auth/send-otp
  Body: { contact (email/phone) }
  Response: { message, otp_sent: true }

POST /api/auth/verify-otp
  Body: { contact, code }
  Response: { message, user, token }

POST /api/auth/login
  Body: { email, otp_code }
  Response: { token, user, expires_in }

POST /api/auth/logout
  Header: { Authorization: Bearer <token> }
  Response: { message: "Logged out" }
```

### AI & Chat

```
POST /api/ai/chat
  Header: { Authorization: Bearer <token> }
  Body: { message, history: [] }
  Response: { reply, tools: [], sentiment: "positive" }

POST /api/ai/sentiment
  Header: { Authorization: Bearer <token> }
  Body: { responses: [...] }
  Response: { summary, recommendations: [] }
```

### Jobs

```
GET /api/jobs
  Query: { skip=0, limit=20, location, skills, salary_min }
  Response: { jobs: [...], total: 100 }

GET /api/jobs/{job_id}
  Response: { job: {...} }

POST /api/jobs
  Header: { Authorization: Bearer <token> }
  Body: { title, description, company, location, salary, skills }
  Response: { job_id, message: "Posted" }

POST /api/jobs/{job_id}/apply
  Header: { Authorization: Bearer <token> }
  Response: { message: "Applied" }
```

### Exercise Tracking

```
POST /api/exercise/track
  Header: { Authorization: Bearer <token> }
  Body: { exercise_type, reps, duration, score, calories }
  Response: { message: "Logged", stats: {...} }

GET /api/exercise/history
  Header: { Authorization: Bearer <token> }
  Query: { days=7 }
  Response: { history: [...], totals: {...} }
```

### Admin

```
GET /api/admin/stats
  Header: { Authorization: Bearer <token> }
  Response: { users: 1000, exercises: 50000, sessions: 100000 }

POST /api/admin/suspend-user/{user_id}
  Header: { Authorization: Bearer <token> }
  Body: { reason }
  Response: { message: "Suspended" }
```

---

## 🛠️ Key Design Patterns

### 1. State Machine (Rep Counter)

**Pattern**: Finite states to prevent double-counting

```
State "down" (resting position)
    ↓ (on completion of movement)
State "up" (active position) → Rep counted
    ↓ (return to rest)
State "down" (resting position)
```

**Example**: JumpingJackCounter in `utils/repCounter.js`

### 2. Dependency Injection

**Backend**: FastAPI dependencies inject current user:

```python
async def get_current_user(token: str = Depends(oauth2_scheme)) -> User:
    user = verify_token(token)
    return user

@router.get("/profile")
async def get_profile(current_user: User = Depends(get_current_user)):
    return current_user
```

### 3. Context API (Frontend)

**Pattern**: Global auth state without Redux

```javascript
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(...);
  const [progress, setProgress] = useState(...);

  return (
    <AuthContext.Provider value={{ token, progress, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### 4. Service Layer (Backend)

**Pattern**: Separation of concerns

```
API Route (handler) → Control/Service (business logic) → Database (persistence)
```

Example:

- Route: `api/login_route.py` (HTTP handler)
- Service: `control/user.py` (create_user logic)
- Data: `database/models.py` (User ORM model)

### 5. Component Composition (Frontend)

**Pattern**: Reusable components in `Generic/`

- `Stepper` - Multi-step forms
- `BorderGlow` - Glowing effects
- `Spotlight` - Spotlight animation

### 6. RequestAnimationFrame Loop

**Pattern**: Efficient rendering for pose detection

```javascript
const loop = async () => {
  const keypoints = await detectPose(video);
  // Process keypoints
  frameRef.current = requestAnimationFrame(loop);
};
```

---

## 🚀 Running the Application

### Prerequisites

- Node.js 16+ (frontend)
- Python 3.8+ (backend)
- Gmail account with app password (email)
- Google Gemini API key (AI)

### Quick Start

**1. Backend Setup**

```bash
cd backend
pip install -r requirements.txt

# Create .env file with:
# GMAIL_ADDRESS=your-email@gmail.com
# GMAIL_APP_PASSWORD=...
# GEMINI_API_KEY=...
# SMTP_SERVER=smtp.gmail.com
# SMTP_PORT=587
# SECRET_KEY=change-in-production
# ALGORITHM=HS256
# ACCESS_TOKEN_EXPIRE_MINUTES=30

cd bin
python run.py
# Server starts at http://localhost:8000
```

**2. Frontend Setup**

```bash
cd frontend
npm install

# Optional: Create .env file with:
# VITE_API_URL=http://localhost:8000
# VITE_GOOGLE_GEMINI_KEY=...

npm run dev
# App starts at http://localhost:5174
```

### Environment Variables

**Backend (.env)**:

```env
# Email
GMAIL_ADDRESS=your-email@gmail.com
GMAIL_APP_PASSWORD=app-specific-password
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587

# AI
GEMINI_API_KEY=your-google-api-key

# Security
SECRET_KEY=your-secret-key-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Database (optional)
DATABASE_URL=sqlite:///./test.db
```

**Frontend (.env)**:

```env
VITE_API_URL=http://localhost:8000
VITE_GOOGLE_GEMINI_KEY=your-key-if-used-directly
```

---

## 📈 Performance & Optimization

### Frontend

- **MoveNet Lightning**: Chosen for speed (real-time on CPU)
- **GPU Acceleration**: TensorFlow.js WebGL backend
- **Lazy Loading**: Routes loaded on-demand
- **Code Splitting**: Vite automatic chunking
- **RequestAnimationFrame**: 60 FPS animation loop

### Backend

- **Async/Await**: Non-blocking I/O with FastAPI
- **Connection Pooling**: SQLAlchemy session management
- **Caching**: Cache Gemini API responses where possible
- **Database Indexing**: Indexed user.email, user.handle, otp_codes.contact

---

## 🔒 Security Best Practices

### Implemented

✅ JWT token-based authentication  
✅ Password hashing (bcrypt via passlib)  
✅ OTP verification for sensitive operations  
✅ CORS configuration  
✅ Environment variable protection (.env not in repo)  
✅ Crisis detection in AI responses  
✅ Input validation (Pydantic schemas)  
✅ Attempt limiting on OTP (attempt_count)

### Recommended for Production

- [ ] Enable HTTPS only
- [ ] Implement rate limiting (FastAPI-Limiter)
- [ ] Add request logging/audit trails
- [ ] Implement refresh tokens (extend JWT expiry)
- [ ] Add 2FA for sensitive accounts
- [ ] Use PostgreSQL instead of SQLite
- [ ] Set up monitoring/alerting (Sentry)
- [ ] Regular security audits
- [ ] SQL injection prevention (already done with SQLAlchemy ORM)

---

## 🧪 Testing Strategy

### Recommended Tests

**Backend**:

- Unit tests: Authentication, OTP verification, scoring logic
- Integration tests: API endpoints with database
- E2E tests: Full signup → exercise tracking → meditation flow

**Frontend**:

- Component tests: Meditation, ExercisePerformer
- Pose detection tests: Keypoint accuracy
- State management tests: AuthContext

**Tools**:

- Backend: pytest, pytest-asyncio
- Frontend: Vitest, React Testing Library

---

## 📚 Important Code Locations

| Task                    | File                                   |
| ----------------------- | -------------------------------------- |
| Add new exercise        | `frontend/src/utils/exerciseConfig.js` |
| Modify pose detection   | `frontend/src/utils/poseDetector.js`   |
| Add new API endpoint    | `backend/app/api/*_route.py`           |
| Add database model      | `backend/app/database/models.py`       |
| Modify AI chat behavior | `backend/app/ai/chat.py`               |
| Add Pydantic schema     | `backend/app/schemas/set_*.py`         |
| Global state            | `frontend/src/context/AuthContext.jsx` |
| Config loading          | `backend/bin/config.py`                |

---

## 🔄 Common Development Workflows

### Adding a New Exercise

1. Add exercise config to `frontend/src/utils/exerciseConfig.js` → EXERCISES object
2. Create rep counter class in `frontend/src/utils/repCounter.js` → `NewExerciseCounter`
3. Create scorer class in `frontend/src/utils/scoring.js` → `NewExerciseScorer`
4. Add UI component in `frontend/src/Components/Dashbaord/ExercisePerformer.jsx`
5. Backend: Create exercise tracking endpoint in `backend/app/api/exercise_route.py`
6. Backend: Add database model if needed

### Adding a New Dashboard Feature

1. Create component in `frontend/src/Components/Dashbaord/NewFeature.jsx`
2. Add route to `frontend/src/App.jsx`
3. Create API route in `backend/app/api/new_feature_route.py`
4. Create Pydantic schema in `backend/app/schemas/set_*.py`
5. Create database model if needed in `backend/app/database/models.py`
6. Add service logic in `backend/app/control/new_feature.py`

### Deploying Changes

1. Test locally (frontend on 5174, backend on 8000)
2. Check API integration with curl or Postman
3. Verify database migrations if schema changed
4. Update environment variables if new keys added
5. Build frontend: `npm run build`
6. Test production build: `npm run preview`

---

## 🆘 Troubleshooting

### Common Issues

**Camera access denied**

- Solution: Check browser permissions, use HTTPS in production
- Code: `frontend/src/Components/Dashbaord/Meditation.jsx` line ~60

**Pose detection not working**

- Solution: Check model loading, ensure GPU backend available
- Debug: Log keypoints with `console.log(keypoints)`
- Code: `frontend/src/utils/poseDetector.js`

**OTP not sending**

- Solution: Verify Gmail app password, enable "Less secure apps"
- Check: `.env` GMAIL_ADDRESS and GMAIL_APP_PASSWORD
- Code: `backend/app/control/mail.py`

**Token expired**

- Solution: User must login again to get new token
- Implement refresh tokens for better UX
- Code: `backend/auth/jwt_handler.py`

**Database locked (SQLite)**

- Solution: Use PostgreSQL for production
- Temporary: Close other connections
- Code: `backend/app/database/db.py`

---

## 🎓 Learning Resources

### Pose Detection

- MediaPipe Pose: https://mediapipe.dev/solutions/pose
- MoveNet Model: https://www.tensorflow.org/hub/google/movenet
- TensorFlow.js: https://www.tensorflow.org/js

### FastAPI

- Official Docs: https://fastapi.tiangolo.com
- SQLAlchemy: https://docs.sqlalchemy.org
- Pydantic: https://docs.pydantic.dev

### React

- React Docs: https://react.dev
- React Router: https://reactrouter.com
- Vite: https://vitejs.dev

### AI/ML

- Google Gemini: https://ai.google.dev
- Sentiment Analysis: https://huggingface.co/models?task=text-classification

---

## 📞 Key Contacts & Resources

- **Frontend Port**: 5174 (Vite dev server)
- **Backend Port**: 8000 (FastAPI/Uvicorn)
- **API Docs**: http://localhost:8000/docs (Swagger UI)
- **ReDoc**: http://localhost:8000/redoc

---

## 📝 Document History

| Version | Date           | Changes                                |
| ------- | -------------- | -------------------------------------- |
| 1.0     | April 24, 2026 | Initial comprehensive context document |

---

**End of Project Context**

_For additional questions or updates, refer to individual README files in frontend/ and backend/ directories._
