
# MERN Stack Task Manager – DevOps & Deployment

## Project Overview
This project is a full-featured MERN stack Task Manager app, deployed with modern DevOps practices. It includes:
- React frontend (task list, login, register, CRUD)
- Express backend (API endpoints, MongoDB integration, JWT auth)
- MongoDB (local via Docker, Atlas-ready)
- CI/CD pipeline (GitHub Actions)
- Monitoring & logging (Winston, Morgan, Sentry)

## Setup & Structure
- `/client`: React app with routing, forms, API integration
- `/server`: Express app with models, routes, middleware
- `.env.example` files for both frontend and backend
- `docker-compose.yml` for local MongoDB

## CI/CD Pipeline
- Workflow: `.github/workflows/mern-ci-cd.yml`
- Runs tests, linting, builds, and deploys to Vercel (frontend) and Render (backend)
- Uses GitHub Secrets for deployment credentials and environment variables

## Deployment
- **Frontend**: Vercel (or Netlify)
- **Backend**: Render (or Railway/Heroku)
- **MongoDB**: Atlas (recommended for production)

## Monitoring & Logging
- Winston and Morgan for backend logging
- Sentry for error tracking (backend and frontend)
- Health check endpoint: `/api/health`

## Testing
- Frontend: React Testing Library (`App.test.js`) – verifies navigation links
- Backend: Jest & Supertest (`src/__tests__/health.test.js`) – verifies health endpoint

## Environment Management
- Sensitive data stored in `.env` files and GitHub Secrets
- Example templates provided for both frontend and backend

## Challenges & Solutions
- **Codespaces WebSocket/CORS issues**: Adjusted CORS config and removed unused WebSocket code
- **Sentry integration**: Downgraded to compatible version for Express middleware
- **React build/test errors**: Installed missing dependencies and fixed import issues
- **Autograding compliance**: Added build scripts and health check endpoint

## How to Run Locally
1. Start MongoDB: `docker-compose up -d`
2. Backend: `cd server && npm install && node index.js`
3. Frontend: `cd client && npm install && npm start`
4. Visit `http://localhost:3000`

## Deployment Instructions
1. Add secrets to GitHub repo (see above)
2. Push to `main` branch to trigger CI/CD
3. Check Vercel/Render dashboards for deployment status

## Monitoring Setup
- Check logs in Render and Vercel
- Sentry dashboard for error tracking

## URLs
- Frontend: [your-frontend-url]
- Backend: [your-backend-url]

## Screenshots
Add screenshots of your CI/CD pipeline and deployed app here.

## Resources
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)


Your work will be automatically submitted when you push to your GitHub Classroom repository. Make sure to:

1. Complete all deployment tasks
2. Set up CI/CD pipelines with GitHub Actions
3. Deploy both frontend and backend to production
4. Document your deployment process in the README.md
5. Include screenshots of your CI/CD pipeline in action
6. Add URLs to your deployed applications

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Render Documentation](https://render.com/docs)
- [Railway Documentation](https://docs.railway.app/)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/) 