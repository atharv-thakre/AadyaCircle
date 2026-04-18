# Backend - AadyaCircle

FastAPI-based backend application providing AI-powered features, user authentication, exercise tracking, and comprehensive API endpoints for the AadyaCircle wellness platform.

## Overview

The backend is a robust Python FastAPI application designed to handle all server-side operations including user authentication, AI-powered chat using Google Gemini API, database operations, email communications, and administrative functions. It provides RESTful APIs for the frontend application with JWT-based security.

## Tech Stack

- **Framework**: FastAPI (Python)
- **ORM**: SQLAlchemy
- **Database**: SQLite (default, can use others)
- **Authentication**: JWT tokens + OTP
- **AI Integration**: Google Gemini API
- **Email**: SMTP (Gmail integration)
- **Server**: Uvicorn ASGI server
- **Environment**: Python-dotenv for configuration

## Project Structure

```
backend/
├── app/
│   ├── main.py                 # FastAPI app initialization
│   │
│   ├── ai/                     # AI and ML features
│   │   ├── chat.py            # Chat logic with Gemini
│   │   ├── memory_store.py    # Conversation memory management
│   │   ├── prompt.py          # Prompt management
│   │   ├── questions.txt      # Sample questions
│   │   ├── refine.py          # Response refinement
│   │   └── sentiment.py       # Sentiment analysis
│   │
│   ├── api/                    # API routes
│   │   ├── __init__.py
│   │   ├── admin_route.py     # Admin endpoints
│   │   ├── ai_route.py        # AI/chat endpoints
│   │   ├── freelancer_routes.py
│   │   ├── job_route.py       # Job listing endpoints
│   │   ├── login_route.py     # Authentication endpoints
│   │
│   ├── auth/                   # Authentication & security
│   │   ├── deps.py            # Dependency injections
│   │   ├── jwt_handler.py     # JWT token handling
│   │   └── otp.py             # OTP verification
│   │
│   ├── control/                # Business logic & services
│   │   ├── admin.py           # Admin operations
│   │   ├── integrity.py       # Data integrity checks
│   │   ├── mail.py            # Email services
│   │   └── user.py            # User management
│   │
│   ├── database/               # Database layer
│   │   ├── db.py              # Database connection & session
│   │   ├── getuser.py         # User queries
│   │   ├── init_db.py         # Database initialization
│   │   ├── models.py          # SQLAlchemy models
│   │   └── service.py         # Database service layer
│   │
│   └── schemas/                # Request/Response schemas
│       ├── models.py          # Base schemas
│       ├── set_01.py          # Schema set 1
│       ├── set_03.py          # Schema set 3
│       ├── set_04.py          # Schema set 4
│       └── set_ai_02.py       # AI-related schemas
│
├── bin/
│   ├── config.py              # Environment configuration
│   ├── run.py                 # Server entry point
│   └── requirements.txt        # Python dependencies
│
└── .env                       # Environment variables (not in repo)
```

## Installation & Setup

### Prerequisites

- Python 3.8 or higher
- pip package manager
- Gmail account with app-specific password (for email features)
- Google Gemini API key

### 1. Install Python Dependencies

```bash
cd backend
pip install -r requirements.txt
```

**Key dependencies include:**

- fastapi - Web framework
- uvicorn - ASGI server
- sqlalchemy - ORM
- python-dotenv - Environment management
- python-jose - JWT handling
- google-generativeai - Gemini API integration
- pydantic - Data validation

### 2. Environment Configuration

Create a `.env` file in the `backend` directory:

```env
# Email Configuration (Gmail)
GMAIL_ADDRESS=your-email@gmail.com
GMAIL_APP_PASSWORD=your-gmail-app-password
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587

# AI Configuration
GEMINI_API_KEY=your-google-gemini-api-key

# Database (optional, defaults to SQLite)
DATABASE_URL=sqlite:///./test.db

# Security (change in production)
SECRET_KEY=your-secret-key-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### 3. Initialize Database

```bash
cd backend/bin
python
>>> from app.database.init_db import init_db
>>> init_db()
>>> exit()
```

### 4. Start Development Server

```bash
cd backend/bin
python run.py
```

The API will be available at `http://localhost:8000`

**API Documentation:**

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## API Endpoints

### Authentication Routes (`/api/auth`)

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/verify-otp` - OTP verification
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - User logout

### AI/Chat Routes (`/api/ai`)

- `POST /api/ai/chat` - Send message to AI therapist
- `GET /api/ai/memory/{user_id}` - Get conversation history
- `DELETE /api/ai/memory/{user_id}` - Clear conversation history
- `GET /api/ai/sentiment/{user_id}` - Get sentiment analysis

### User Routes (`/api/user`)

- `GET /api/user/profile` - Get current user profile
- `PUT /api/user/profile` - Update user profile
- `GET /api/user/{user_id}` - Get user details
- `DELETE /api/user/{user_id}` - Delete user account

### Job Routes (`/api/jobs`)

- `GET /api/jobs` - List all jobs
- `POST /api/jobs` - Create job listing (admin)
- `GET /api/jobs/{job_id}` - Get job details
- `PUT /api/jobs/{job_id}` - Update job (admin)
- `DELETE /api/jobs/{job_id}` - Delete job (admin)

### Freelancer Routes (`/api/freelancer`)

- `GET /api/freelancer` - List freelancers
- `POST /api/freelancer/register` - Register as freelancer
- `GET /api/freelancer/{freelancer_id}` - Get freelancer profile
- `PUT /api/freelancer/{freelancer_id}` - Update freelancer profile

### Admin Routes (`/api/admin`)

- `GET /api/admin/users` - List all users
- `GET /api/admin/stats` - Get system statistics
- `DELETE /api/admin/users/{user_id}` - Delete user
- `PUT /api/admin/users/{user_id}/role` - Update user role

## Module Details

### AI Module (`app/ai/`)

**chat.py** - Main chat interface with Gemini API

```python
from app.ai.chat import get_ai_response
response = await get_ai_response(user_message, user_id)
```

**memory_store.py** - Maintains conversation context

- Stores conversation history per user
- Retrieves previous messages for context
- Clears old conversations

**sentiment.py** - Analyzes user emotional state

- Evaluates sentiment from messages
- Tracks emotional wellness over time
- Provides insights for recommendations

### Authentication Module (`app/auth/`)

**jwt_handler.py** - JWT token management

- Create access tokens
- Validate tokens
- Handle token expiration

**otp.py** - One-time password verification

- Generate OTP for verification
- Validate OTP on login
- Prevent brute force attacks

**deps.py** - Dependency injection for secured routes

```python
async def get_current_user(token: str = Depends(oauth2_scheme)) -> User:
    # Validate and return current user
```

### Database Module (`app/database/`)

**models.py** - SQLAlchemy ORM models

- User model - User accounts and profiles
- Job model - Job listings
- Freelancer model - Freelancer profiles
- Conversation model - Chat history

**service.py** - Database operations

- CRUD operations
- Query builders
- Transaction management

**getuser.py** - User-specific queries

- Get user by ID
- Get user by email
- Update user credentials

### Control Module (`app/control/`)

**user.py** - User management logic

- User registration
- Profile updates
- Password management

**mail.py** - Email operations

- Send verification emails
- Send notifications
- HTML email templates

**admin.py** - Administrative operations

- User management
- System statistics
- Content moderation

## Running the Server

### Development Mode (with auto-reload)

```bash
cd backend/bin
python run.py
```

### Production Mode (without auto-reload)

```bash
cd backend
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### Custom Host/Port

```bash
cd backend/bin
python run.py  # Edit run.py to change host/port
```

## Database Management

### Initialize Database

```bash
python app/database/init_db.py
```

### View Database

```bash
# Using SQLite CLI
sqlite3 test.db
> .tables
> SELECT * FROM user;
```

### Reset Database

```bash
rm test.db
python app/database/init_db.py
```

## Authentication Flow

1. **User Signup**
   - POST `/api/auth/signup` with email and password
   - OTP sent to email
   - System generates JWT token

2. **OTP Verification**
   - POST `/api/auth/verify-otp` with OTP code
   - Account activated

3. **User Login**
   - POST `/api/auth/login` with credentials
   - Returns access token and refresh token

4. **Protected Routes**
   - Include `Authorization: Bearer {token}` in headers
   - Token validated on each request

## Environment Variables Reference

| Variable                      | Description                | Default              |
| ----------------------------- | -------------------------- | -------------------- |
| `GMAIL_ADDRESS`               | Gmail account email        | Required             |
| `GMAIL_APP_PASSWORD`          | Gmail app password         | Required             |
| `SMTP_SERVER`                 | SMTP server address        | smtp.gmail.com       |
| `SMTP_PORT`                   | SMTP server port           | 587                  |
| `GEMINI_API_KEY`              | Google Gemini API key      | Required             |
| `SECRET_KEY`                  | JWT signing secret         | Change in production |
| `ALGORITHM`                   | JWT algorithm              | HS256                |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Token expiration time      | 30                   |
| `DATABASE_URL`                | Database connection string | sqlite:///./test.db  |

## Error Handling

The API returns standardized error responses:

```json
{
  "detail": "Error message",
  "error_code": "ERROR_CODE"
}
```

### Common HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

## Testing the API

### Using cURL

```bash
# Login
curl -X POST "http://localhost:8000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}'

# Protected endpoint
curl -X GET "http://localhost:8000/api/user/profile" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Using Postman/Insomnia

1. Open API documentation: `http://localhost:8000/docs`
2. Test endpoints through Swagger UI
3. Tokens are automatically handled

## Development Best Practices

1. **Use Environment Variables**: Never hardcode secrets
2. **Input Validation**: Always validate with Pydantic schemas
3. **Error Handling**: Return meaningful error messages
4. **Logging**: Log important operations
5. **Database Transactions**: Wrap multi-step operations
6. **Rate Limiting**: Consider adding rate limiting for production
7. **CORS**: Current config allows all origins (restrict in production)

## Performance Optimization

1. **Database Indexing**: Add indexes on frequently queried fields
2. **Caching**: Implement Redis for conversation memory
3. **Async Operations**: Use async/await for I/O operations
4. **Query Optimization**: Use SELECT specific columns instead of \*
5. **Batch Operations**: Group database writes together

## Security Considerations

1. **Change SECRET_KEY in production** to a strong random string
2. **Use HTTPS in production**
3. **Implement rate limiting** on authentication endpoints
4. **Restrict CORS origins** to your frontend domain
5. **Use environment-specific configurations**
6. **Keep dependencies updated** for security patches

## Troubleshooting

### Connection Issues

```bash
# Check if port 8000 is in use
netstat -ano | findstr :8000  # Windows
lsof -i :8000  # macOS/Linux
```

### Database Issues

```bash
# Reset database if corrupted
rm backend/test.db
cd backend/bin
python run.py  # Will initialize fresh database
```

### Gemini API Not Working

- Verify API key in `.env`
- Check API quotas in Google Cloud Console
- Ensure network connectivity

### Email Not Sending

- Verify Gmail credentials
- Enable "Less secure app access" or use App Password
- Check SMTP_SERVER and SMTP_PORT settings

## Contributing

1. Follow PEP 8 style guide for Python
2. Document all new endpoints
3. Include error handling in new routes
4. Test changes before committing
5. Update this README for new features

## Deployment

### Docker Deployment

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Environment-Specific Configuration

Create separate `.env` files:

- `.env.development`
- `.env.production`
- `.env.staging`

## Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)
- [Pydantic Documentation](https://docs.pydantic.dev/)
- [Google Gemini API](https://ai.google.dev/)
- [JWT Introduction](https://jwt.io/)

## Support

For backend-specific issues:

1. Check API documentation: `http://localhost:8000/docs`
2. Review error logs in console
3. Verify environment variables are set correctly
4. Check database integrity

---

**Last Updated**: April 2026
**Version**: 1.0.0
