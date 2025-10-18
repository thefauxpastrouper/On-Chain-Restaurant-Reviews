# RestaurantChain Deployment Checklist

## Pre-Deployment Checklist

### ✅ Server Requirements
- [ ] Hetzner Cloud server (Ubuntu 20.04+)
- [ ] Minimum 1 vCPU, 2GB RAM, 20GB SSD
- [ ] Domain name pointing to server IP
- [ ] SSH access configured

### ✅ Application Files
- [ ] All source code committed to repository
- [ ] Production build tested locally
- [ ] Environment variables configured
- [ ] SSL certificates ready (if using HTTPS)

## Deployment Steps

### 1. Server Preparation
```bash
# Connect to your Hetzner server
ssh root@your-server-ip

# Update system
apt update && apt upgrade -y

# Create deployment user (optional but recommended)
adduser deploy
usermod -aG sudo deploy
```

### 2. Quick Deployment
```bash
# Clone your repository
git clone <your-repo-url> /opt/restaurantchain
cd /opt/restaurantchain

# Make scripts executable
chmod +x deploy.sh update.sh

# Run deployment script
./deploy.sh
```

### 3. Manual Deployment (Alternative)
```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Deploy application
docker-compose build
docker-compose up -d
```

## Post-Deployment Verification

### ✅ Application Health
- [ ] Application accessible at server IP
- [ ] Health check endpoint responding: `curl http://your-ip/health`
- [ ] No errors in logs: `docker-compose logs`
- [ ] All containers running: `docker-compose ps`

### ✅ SSL Configuration (if enabled)
- [ ] SSL certificate valid
- [ ] HTTPS redirect working
- [ ] Security headers present
- [ ] Auto-renewal configured

### ✅ Performance Optimization
- [ ] Gzip compression enabled
- [ ] Static assets cached
- [ ] Security headers configured
- [ ] Log rotation setup

## Monitoring Setup

### ✅ Log Management
- [ ] Access logs: `tail -f logs/access.log`
- [ ] Error logs: `tail -f logs/error.log`
- [ ] Log rotation configured
- [ ] Log retention policy set

### ✅ Health Monitoring
- [ ] Health check endpoint: `/health`
- [ ] Container health checks enabled
- [ ] Resource monitoring: `docker stats`
- [ ] Disk space monitoring: `df -h`

## Security Checklist

### ✅ Firewall Configuration
- [ ] Only necessary ports open (22, 80, 443)
- [ ] SSH key authentication enabled
- [ ] Root login disabled (if applicable)
- [ ] Fail2ban installed (optional)

### ✅ SSL Security
- [ ] TLS 1.2+ only
- [ ] Strong cipher suites
- [ ] HSTS headers enabled
- [ ] Certificate auto-renewal working

### ✅ Container Security
- [ ] Non-root user in containers
- [ ] Resource limits configured
- [ ] Health checks enabled
- [ ] Regular security updates

## Maintenance Tasks

### ✅ Regular Updates
- [ ] Application updates: `./update.sh`
- [ ] System updates: `sudo apt update && sudo apt upgrade`
- [ ] Docker image cleanup: `docker image prune`
- [ ] Log cleanup: Automatic rotation

### ✅ Backup Strategy
- [ ] Application backup script
- [ ] SSL certificate backup
- [ ] Database backup (if applicable)
- [ ] Backup verification

### ✅ Performance Monitoring
- [ ] CPU usage monitoring
- [ ] Memory usage monitoring
- [ ] Disk space monitoring
- [ ] Network monitoring

## Troubleshooting

### Common Issues
- **Application not starting**: Check logs with `docker-compose logs`
- **SSL issues**: Verify certificate with `sudo certbot certificates`
- **Port conflicts**: Check with `sudo netstat -tlnp | grep :80`
- **Resource issues**: Monitor with `htop` and `docker stats`

### Useful Commands
```bash
# View application logs
docker-compose logs -f

# Restart application
docker-compose restart

# Check container status
docker-compose ps

# Monitor resources
docker stats

# Check disk space
df -h

# Check memory usage
free -h

# Check network connections
ss -tlnp
```

## Cost Optimization

### ✅ Resource Optimization
- [ ] Right-sized server instance
- [ ] Efficient Docker images
- [ ] Optimized Nginx configuration
- [ ] Regular cleanup of unused resources

### ✅ Monitoring Costs
- [ ] Track server usage
- [ ] Monitor bandwidth usage
- [ ] Optimize storage usage
- [ ] Review and adjust resources

## Success Criteria

### ✅ Deployment Success
- [ ] Application accessible via domain/IP
- [ ] All features working correctly
- [ ] SSL certificate valid (if using HTTPS)
- [ ] Performance meets requirements
- [ ] Security measures in place
- [ ] Monitoring and logging active
- [ ] Backup strategy implemented
- [ ] Documentation updated

## Next Steps After Deployment

1. **Test all functionality** - Verify all app features work in production
2. **Set up monitoring** - Configure alerts for critical issues
3. **Document access** - Record server access details securely
4. **Plan maintenance** - Schedule regular updates and maintenance
5. **Monitor performance** - Track metrics and optimize as needed
6. **Security review** - Regular security audits and updates
7. **Backup verification** - Test backup and restore procedures

## Support Resources

- **Hetzner Cloud Documentation**: https://docs.hetzner.com/
- **Docker Documentation**: https://docs.docker.com/
- **Nginx Documentation**: https://nginx.org/en/docs/
- **Let's Encrypt Documentation**: https://letsencrypt.org/docs/

This checklist ensures a successful, secure, and optimized deployment of your RestaurantChain application on Hetzner Cloud.
