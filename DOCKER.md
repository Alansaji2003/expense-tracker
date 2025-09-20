# Docker Containerization Guide

This guide covers how to run your Next.js financial application using Docker for both development and production environments.

## 🐳 Quick Start

### Prerequisites
- Docker Desktop installed and running
- Docker Compose v2.0+
- Git (for cloning the repository)

### Development Environment

1. **Setup environment variables:**
   ```bash
   cp .env.docker .env.docker.local
   # Edit .env.docker.local with your actual values
   ```

2. **Start development environment:**
   ```bash
   # Using the management script (recommended)
   npm run docker:dev start

   # Or using Docker Compose directly
   docker-compose up -d
   ```

3. **Access the application:**
   - Application: http://localhost:3000
   - Database: localhost:5432
   - Redis: localhost:6379

### Production Environment

1. **Setup production environment:**
   ```bash
   cp .env.production .env.production.local
   # Edit with your production values
   ```

2. **Deploy to production:**
   ```bash
   npm run docker:prod deploy
   ```

## 📁 Docker Files Structure

```
├── Dockerfile                    # Multi-stage production build
├── Dockerfile.dev               # Development build with hot reload
├── docker-compose.yml           # Development environment
├── docker-compose.prod.yml      # Production environment
├── .dockerignore               # Files to exclude from build context
├── .env.docker                 # Development environment template
├── .env.production             # Production environment template
├── docker/
│   ├── nginx/
│   │   ├── nginx.conf          # Development Nginx config
│   │   └── nginx.prod.conf     # Production Nginx config
│   └── postgres/
│       └── init.sql            # Database initialization
└── scripts/
    ├── docker-dev.sh           # Development management script
    └── docker-prod.sh          # Production management script
```

## 🛠️ Available Commands

### Development Commands
```bash
# Management script commands
npm run docker:dev build       # Build development images
npm run docker:dev start       # Start development environment
npm run docker:dev stop        # Stop development environment
npm run docker:dev restart     # Restart development environment
npm run docker:dev logs        # View logs
npm run docker:dev migrate     # Run database migrations
npm run docker:dev clean       # Clean up Docker resources

# Direct Docker commands
npm run docker:up              # Start with docker-compose
npm run docker:down            # Stop with docker-compose
npm run docker:logs            # View logs
```

### Production Commands
```bash
# Management script commands
npm run docker:prod build      # Build production images
npm run docker:prod deploy     # Deploy to production
npm run docker:prod update     # Update production deployment
npm run docker:prod health     # Run health checks
npm run docker:prod backup     # Create database backup
npm run docker:prod status     # Show system status
npm run docker:prod scale app 3 # Scale app to 3 replicas
```

## 🏗️ Docker Architecture

### Development Stack
- **App Container**: Next.js with hot reloading
- **PostgreSQL**: Database with persistent volume
- **Redis**: Caching and session storage
- **Nginx**: Reverse proxy with rate limiting

### Production Stack
- **App Container**: Optimized Next.js build
- **PostgreSQL**: Production database with backups
- **Redis**: Production Redis with authentication
- **Nginx**: Load balancer with SSL termination

## 🔧 Configuration

### Environment Variables

#### Development (.env.docker.local)
```env
DATABASE_URL=postgresql://postgres:password@postgres:5432/expense_tracker
NEXTAUTH_URL=http://localhost:3000
OPENAI_API_KEY=your_openai_key
SMTP_HOST=smtp.gmail.com
SMTP_USER=your_email@gmail.com
ADMIN_EMAILS=admin@example.com
```

#### Production (.env.production.local)
```env
DATABASE_URL=postgresql://user:pass@prod-db:5432/expense_tracker_prod
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=very_secure_secret_for_production
OPENAI_API_KEY=your_production_openai_key
SMTP_HOST=your-production-smtp
ADMIN_EMAILS=admin@yourdomain.com
```

### Docker Compose Services

#### Application Service
- **Development**: Hot reloading, volume mounts
- **Production**: Optimized build, health checks
- **Ports**: 3000 (internal), mapped to host

#### PostgreSQL Service
- **Image**: postgres:15-alpine
- **Persistent Storage**: Named volume
- **Health Checks**: pg_isready
- **Initialization**: Custom SQL scripts

#### Redis Service
- **Image**: redis:7-alpine
- **Persistent Storage**: Named volume
- **Authentication**: Password protected (production)
- **Configuration**: Append-only file enabled

#### Nginx Service
- **Development**: Basic reverse proxy
- **Production**: SSL termination, rate limiting
- **Features**: Gzip compression, security headers

## 🚀 Deployment Strategies

### Local Development
```bash
# Start development environment
npm run docker:dev start

# View logs
npm run docker:dev logs app

# Run migrations
npm run docker:dev migrate

# Stop environment
npm run docker:dev stop
```

### Production Deployment
```bash
# Initial deployment
npm run docker:prod deploy

# Update deployment (after code changes)
git pull
npm run docker:prod update

# Scale application
npm run docker:prod scale app 3

# Monitor health
npm run docker:prod health
```

### CI/CD Integration
```yaml
# Example GitHub Actions workflow
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to production
        run: |
          npm run docker:prod deploy
```

## 📊 Monitoring & Health Checks

### Health Check Endpoint
- **URL**: `/api/health`
- **Checks**: Database, environment variables, memory usage
- **Response**: JSON with detailed health status

### Monitoring Commands
```bash
# Check application health
curl http://localhost/health

# View system status
npm run docker:prod status

# View resource usage
docker stats

# View logs
npm run docker:prod logs app
```

### Log Management
```bash
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f app

# View last 100 lines
docker-compose logs --tail=100 app
```

## 🔒 Security Features

### Production Security
- **SSL/TLS**: Nginx SSL termination
- **Rate Limiting**: API endpoint protection
- **Security Headers**: HSTS, CSP, X-Frame-Options
- **Network Isolation**: Docker networks
- **Non-root User**: Application runs as non-root

### Environment Security
- **Secrets Management**: Environment variables
- **Database Security**: Password authentication
- **Redis Security**: Password protection
- **Network Security**: Internal Docker networks

## 🛡️ Backup & Recovery

### Database Backups
```bash
# Create backup
npm run docker:prod backup

# List backups
ls -la backups/

# Restore from backup
npm run docker:prod restore backup_20241215_143022.sql
```

### Volume Management
```bash
# List volumes
docker volume ls

# Backup volume
docker run --rm -v expense_tracker_postgres_data:/data -v $(pwd)/backups:/backup alpine tar czf /backup/postgres_volume_backup.tar.gz -C /data .

# Restore volume
docker run --rm -v expense_tracker_postgres_data:/data -v $(pwd)/backups:/backup alpine tar xzf /backup/postgres_volume_backup.tar.gz -C /data
```

## 🐛 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

#### Database Connection Issues
```bash
# Check database logs
npm run docker:dev logs postgres

# Connect to database
npm run docker:dev db-shell
```

#### Build Issues
```bash
# Clean Docker cache
docker system prune -a

# Rebuild without cache
npm run docker:dev build
```

#### Permission Issues
```bash
# Fix file permissions
sudo chown -R $USER:$USER .

# Fix Docker socket permissions (Linux)
sudo chmod 666 /var/run/docker.sock
```

### Debug Mode
```bash
# Run with debug output
DEBUG=* npm run docker:dev start

# Inspect container
docker exec -it expense-tracker-app-1 sh

# View container logs
docker logs expense-tracker-app-1 -f
```

## 📈 Performance Optimization

### Production Optimizations
- **Multi-stage builds**: Smaller image sizes
- **Layer caching**: Faster builds
- **Standalone output**: Optimized Next.js builds
- **Gzip compression**: Reduced bandwidth
- **Static file caching**: Better performance

### Resource Limits
```yaml
# Add to docker-compose.prod.yml
services:
  app:
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M
```

## 🎯 Best Practices

1. **Use multi-stage builds** for smaller production images
2. **Implement health checks** for all services
3. **Use named volumes** for persistent data
4. **Set resource limits** in production
5. **Regular backups** of database and volumes
6. **Monitor logs** and system resources
7. **Use secrets management** for sensitive data
8. **Implement proper logging** with log rotation
9. **Use Docker networks** for service isolation
10. **Regular security updates** of base images

## 🚀 Next Steps

1. **Set up monitoring** with Prometheus/Grafana
2. **Implement log aggregation** with ELK stack
3. **Add container orchestration** with Kubernetes
4. **Set up automated backups** with cron jobs
5. **Implement blue-green deployments**
6. **Add performance monitoring** with APM tools
7. **Set up alerting** for critical issues

Your application is now fully containerized and ready for both development and production use! 🎉