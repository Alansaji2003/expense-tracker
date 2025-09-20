# 🐳 Docker Quick Start Guide

Get your Next.js financial application running with Docker in minutes!

## ⚡ Super Quick Start (Development)

1. **Prerequisites Check:**
   ```powershell
   # Make sure Docker Desktop is running
   docker --version
   docker-compose --version
   ```

2. **Setup Environment:**
   ```powershell
   # Copy environment template
   copy .env.docker .env.docker.local
   
   # Edit .env.docker.local with your values (at minimum):
   # - OPENAI_API_KEY=your_openai_key
   # - SMTP_USER=your_email@gmail.com
   # - SMTP_PASS=your_app_password
   ```

3. **Start Everything:**
   ```powershell
   # Using PowerShell script (recommended)
   .\scripts\docker-dev.ps1 start
   
   # OR using npm script
   npm run docker:dev start
   
   # OR using Docker Compose directly
   docker-compose up -d
   ```

4. **Access Your App:**
   - 🌐 **Application**: http://localhost:3000
   - 🗄️ **Database**: localhost:5432 (postgres/password)
   - 🔴 **Redis**: localhost:6379

## 🎯 Essential Commands

### Development
```powershell
# Start development environment
npm run docker:dev start

# View logs
npm run docker:dev logs

# Stop everything
npm run docker:dev stop

# Run database migrations
npm run docker:dev migrate

# Clean up (removes everything)
npm run docker:dev clean
```

### Production
```powershell
# Setup production environment
copy .env.production .env.production.local
# Edit with production values

# Deploy to production
npm run docker:prod deploy

# Check health
npm run docker:prod health

# View production logs
npm run docker:prod logs
```

## 🔧 Common Tasks

### First Time Setup
```powershell
# 1. Clone and setup
git clone <your-repo>
cd expense-tracker

# 2. Setup environment
copy .env.docker .env.docker.local
# Edit .env.docker.local

# 3. Start development
npm run docker:dev start

# 4. Run migrations (if needed)
npm run docker:dev migrate
```

### Daily Development
```powershell
# Start your day
npm run docker:dev start

# View app logs while developing
npm run docker:dev logs app

# Stop when done
npm run docker:dev stop
```

### Database Operations
```powershell
# Connect to database
npm run docker:dev db-shell

# Run migrations
npm run docker:dev migrate

# View database logs
npm run docker:dev logs postgres
```

## 🚨 Troubleshooting

### Port Already in Use
```powershell
# Find what's using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID)
taskkill /PID <PID> /F
```

### Docker Issues
```powershell
# Restart Docker Desktop
# Then clean up and restart
npm run docker:dev clean
npm run docker:dev start
```

### Environment Issues
```powershell
# Check if .env.docker.local exists and has values
Get-Content .env.docker.local

# Recreate from template
copy .env.docker .env.docker.local
```

### Build Issues
```powershell
# Force rebuild
npm run docker:dev build

# Clean everything and rebuild
npm run docker:dev clean
npm run docker:dev build
npm run docker:dev start
```

## 📁 What Gets Created

When you run Docker, these containers are created:
- **expense-tracker-app-1**: Your Next.js application
- **expense-tracker-postgres-1**: PostgreSQL database
- **expense-tracker-redis-1**: Redis cache
- **expense-tracker-nginx-1**: Nginx reverse proxy

And these volumes for data persistence:
- **expense-tracker_postgres_data**: Database files
- **expense-tracker_redis_data**: Redis files

## 🎉 Success Indicators

You know everything is working when:
- ✅ `docker ps` shows 4 running containers
- ✅ http://localhost:3000 loads your app
- ✅ You can sign in with Clerk
- ✅ Database operations work (create budgets/transactions)

## 🆘 Need Help?

### Check Status
```powershell
# See all containers
docker ps

# Check logs for errors
npm run docker:dev logs

# Test health endpoint
curl http://localhost:3000/api/health
```

### Get Support
1. Check the full [DOCKER.md](DOCKER.md) guide
2. Look at container logs: `npm run docker:dev logs <service>`
3. Verify environment variables in `.env.docker.local`
4. Ensure Docker Desktop is running and updated

## 🚀 Next Steps

Once you have Docker running:
1. **Development**: Code changes auto-reload in the container
2. **Testing**: Run `npm test` inside the container
3. **Production**: Use `npm run docker:prod deploy` for production
4. **Monitoring**: Use `npm run docker:prod status` to monitor

**Happy Dockerizing! 🐳**