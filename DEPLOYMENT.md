# RestaurantChain Deployment Guide for Hetzner

This guide will help you deploy your RestaurantChain application to a Hetzner server with Docker, Nginx, and optional SSL support.

## Prerequisites

- Hetzner Cloud server (Ubuntu 20.04+ recommended)
- Domain name pointing to your server's IP
- SSH access to your server

## Quick Deployment

### 1. Server Setup

Connect to your Hetzner server and run the deployment script:

```bash
# Clone your repository
git clone <your-repo-url> /opt/restaurantchain
cd /opt/restaurantchain

# Make scripts executable
chmod +x deploy.sh update.sh

# Run deployment script
./deploy.sh
```

### 2. Manual Deployment Steps

If you prefer manual deployment:

#### Step 1: Update System
```bash
sudo apt update && sudo apt upgrade -y
```

#### Step 2: Install Docker
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
rm get-docker.sh
```

#### Step 3: Install Docker Compose
```bash
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

#### Step 4: Install Bun (Optional but Recommended)
```bash
# Install Bun for faster builds
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc
```

#### Step 5: Deploy Application
```bash
# Build and start the application
docker-compose build
docker-compose up -d

# Check if running
curl http://localhost/health
```

## Configuration

### Environment Variables

Create a `.env` file for production configuration:

```bash
# Production environment
NODE_ENV=production

# Optional: Custom domain
DOMAIN=your-domain.com
EMAIL=your-email@example.com
```

### SSL Configuration (Optional)

To enable SSL with Let's Encrypt:

1. Point your domain to the server's IP
2. Run the deployment script and choose SSL setup
3. Or manually configure SSL:

```bash
# Install certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot certonly --standalone -d your-domain.com --email your-email@example.com --agree-tos --no-eff-email

# Update docker-compose to include SSL
cp docker-compose-ssl.yml docker-compose.yml
docker-compose down
docker-compose up -d
```

## Production Optimizations

### 1. Build Optimization

The Dockerfile is configured for production with:
- Multi-stage build for smaller image size
- Nginx for serving static files
- Gzip compression enabled
- Security headers configured
- Static asset caching

### 2. Nginx Configuration

The included `nginx.conf` provides:
- Client-side routing support (SPA)
- Gzip compression
- Security headers
- Static asset caching
- Health check endpoint

### 3. Docker Optimizations

- Uses Alpine Linux for smaller image size
- Multi-stage build to exclude dev dependencies
- Proper layer caching
- Health checks configured

## Monitoring and Maintenance

### Health Checks

The application includes health check endpoints:
- HTTP: `http://your-domain/health`
- Container health check configured

### Log Management

Logs are stored in the `logs/` directory and automatically rotated:
- Access logs: `logs/access.log`
- Error logs: `logs/error.log`
- Automatic log rotation with 52-day retention

### Updates

To update the application:

```bash
# Using the update script (recommended)
./update.sh

# Or manually
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## Troubleshooting

### Common Issues

1. **Application not starting**
   ```bash
   # Check logs
   docker-compose logs
   
   # Check container status
   docker-compose ps
   ```

2. **SSL certificate issues**
   ```bash
   # Check certificate status
   sudo certbot certificates
   
   # Renew certificate
   sudo certbot renew
   ```

3. **Port conflicts**
   ```bash
   # Check what's using port 80
   sudo netstat -tlnp | grep :80
   
   # Kill conflicting processes
   sudo pkill -f nginx
   ```

### Useful Commands

```bash
# View application logs
docker-compose logs -f

# Restart application
docker-compose restart

# Stop application
docker-compose down

# Update application
./update.sh

# Check application status
curl http://localhost/health

# View system resources
docker stats
```

## Security Considerations

### Firewall Configuration

```bash
# Allow only necessary ports
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable
```

### SSL Security

The Nginx configuration includes:
- TLS 1.2+ only
- Strong cipher suites
- HSTS headers
- Security headers (XSS, CSRF protection)

### Container Security

- Non-root user in containers
- Read-only filesystem where possible
- Resource limits configured
- Health checks for automatic recovery

## Performance Tuning

### Server Resources

Recommended minimum resources:
- CPU: 1 vCPU
- RAM: 2GB
- Storage: 20GB SSD

### Docker Resource Limits

Add to `docker-compose.yml`:

```yaml
services:
  restaurantchain:
    # ... existing configuration
    deploy:
      resources:
        limits:
          memory: 512M
          cpus: '0.5'
        reservations:
          memory: 256M
          cpus: '0.25'
```

## Backup Strategy

### Application Backup

```bash
# Create backup
tar -czf restaurantchain-backup-$(date +%Y%m%d).tar.gz /opt/restaurantchain

# Restore from backup
tar -xzf restaurantchain-backup-YYYYMMDD.tar.gz -C /
```

### SSL Certificate Backup

```bash
# Backup SSL certificates
sudo tar -czf ssl-backup-$(date +%Y%m%d).tar.gz /etc/letsencrypt
```

## Scaling

For high-traffic scenarios:

1. **Load Balancer**: Use Hetzner Load Balancer
2. **Multiple Instances**: Deploy multiple containers
3. **CDN**: Use Cloudflare or similar for static assets
4. **Database**: Separate database for data storage

## Support

For deployment issues:
1. Check the logs: `docker-compose logs`
2. Verify configuration: `docker-compose config`
3. Test connectivity: `curl http://localhost/health`
4. Check system resources: `htop` or `docker stats`

## Cost Optimization

### Hetzner Cloud Pricing

- CX11: €3.29/month (1 vCPU, 4GB RAM)
- CX21: €5.83/month (2 vCPU, 8GB RAM)
- CX31: €10.70/month (3 vCPU, 16GB RAM)

### Resource Monitoring

```bash
# Monitor resource usage
htop
docker stats
df -h
free -h
```

This deployment setup provides a production-ready, scalable, and secure deployment of your RestaurantChain application on Hetzner Cloud.
