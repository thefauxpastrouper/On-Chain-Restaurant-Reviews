#!/bin/bash

# RestaurantChain Deployment Script for Hetzner
# This script automates the deployment process

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="restaurantchain"
DOMAIN=${DOMAIN:-"your-domain.com"}
EMAIL=${EMAIL:-"work.adityaswaroop@gmail.com"}

echo -e "${BLUE}🚀 RestaurantChain Deployment Script${NC}"
echo -e "${BLUE}====================================${NC}"

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   echo -e "${RED}❌ This script should not be run as root${NC}"
   exit 1
fi

# Update system packages
echo -e "${YELLOW}📦 Updating system packages...${NC}"
sudo apt update && sudo apt upgrade -y

# Install Bun if not installed
if ! command -v bun &> /dev/null; then
    echo -e "${YELLOW}🍞 Installing Bun...${NC}"
    curl -fsSL https://bun.sh/install | bash
    source ~/.bashrc
    echo -e "${GREEN}✅ Bun installed successfully${NC}"
else
    echo -e "${GREEN}✅ Bun is already installed${NC}"
fi

# Install Docker if not installed
if ! command -v docker &> /dev/null; then
    echo -e "${YELLOW}🐳 Installing Docker...${NC}"
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    rm get-docker.sh
    echo -e "${GREEN}✅ Docker installed successfully${NC}"
else
    echo -e "${GREEN}✅ Docker is already installed${NC}"
fi

# Install Docker Compose if not installed
if ! command -v docker-compose &> /dev/null; then
    echo -e "${YELLOW}🐳 Installing Docker Compose...${NC}"
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    echo -e "${GREEN}✅ Docker Compose installed successfully${NC}"
else
    echo -e "${GREEN}✅ Docker Compose is already installed${NC}"
fi

# Create application directory
APP_DIR="/opt/$APP_NAME"
echo -e "${YELLOW}📁 Creating application directory: $APP_DIR${NC}"
sudo mkdir -p $APP_DIR
sudo chown $USER:$USER $APP_DIR

# Copy application files
echo -e "${YELLOW}📋 Copying application files...${NC}"
cp -r . $APP_DIR/
cd $APP_DIR

# Set proper permissions
chmod +x deploy.sh
chmod +x update.sh

# Create logs directory
mkdir -p logs

# Build and start the application
echo -e "${YELLOW}🔨 Building and starting the application...${NC}"
docker-compose down --remove-orphans || true
docker-compose build --no-cache
docker-compose up -d

# Wait for application to start
echo -e "${YELLOW}⏳ Waiting for application to start...${NC}"
sleep 10

# Check if application is running
if curl -f http://localhost/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Application is running successfully!${NC}"
    echo -e "${GREEN}🌐 Your app is available at: http://$(curl -s ifconfig.me)${NC}"
else
    echo -e "${RED}❌ Application failed to start${NC}"
    echo -e "${YELLOW}📋 Checking logs...${NC}"
    docker-compose logs
    exit 1
fi

# Setup SSL with Let's Encrypt (optional)
read -p "Do you want to setup SSL with Let's Encrypt? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}🔒 Setting up SSL with Let's Encrypt...${NC}"
    
    # Install certbot
    sudo apt install -y certbot python3-certbot-nginx
    
    # Stop nginx in container temporarily
    docker-compose exec restaurantchain nginx -s stop || true
    
    # Get SSL certificate
    sudo certbot certonly --standalone -d $DOMAIN --email $EMAIL --agree-tos --no-eff-email
    
    # Update nginx config for SSL
    cat > nginx-ssl.conf << EOF
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    # Redirect HTTP to HTTPS
    server {
        listen 80;
        server_name $DOMAIN;
        return 301 https://\$server_name\$request_uri;
    }

    # HTTPS server
    server {
        listen 443 ssl http2;
        server_name $DOMAIN;
        root /usr/share/nginx/html;
        index index.html;

        # SSL configuration
        ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
        ssl_prefer_server_ciphers off;

        # Security headers
        add_header Strict-Transport-Security "max-age=63072000" always;
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;

        # Handle client-side routing
        location / {
            try_files \$uri \$uri/ /index.html;
        }

        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
EOF

    # Copy SSL certificates to container
    sudo cp -r /etc/letsencrypt $APP_DIR/
    
    # Update docker-compose to mount SSL certificates
    cat > docker-compose-ssl.yml << EOF
version: '3.8'

services:
  restaurantchain:
    build: .
    container_name: restaurantchain-app
    ports:
      - "80:80"
      - "443:443"
    restart: unless-stopped
    environment:
      - NODE_ENV=production
    volumes:
      - ./logs:/var/log/nginx
      - ./letsencrypt:/etc/letsencrypt:ro
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "https://localhost/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
EOF

    # Restart with SSL
    docker-compose -f docker-compose-ssl.yml down
    docker-compose -f docker-compose-ssl.yml up -d
    
    echo -e "${GREEN}✅ SSL setup completed!${NC}"
    echo -e "${GREEN}🔒 Your app is now available at: https://$DOMAIN${NC}"
fi

# Setup auto-renewal for SSL
if [ -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]; then
    echo -e "${YELLOW}🔄 Setting up SSL auto-renewal...${NC}"
    (crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet --reload-hook 'cd $APP_DIR && docker-compose restart'") | crontab -
fi

# Setup log rotation
echo -e "${YELLOW}📋 Setting up log rotation...${NC}"
sudo tee /etc/logrotate.d/restaurantchain << EOF
$APP_DIR/logs/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 $USER $USER
    postrotate
        cd $APP_DIR && docker-compose restart
    endscript
}
EOF

echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
echo -e "${BLUE}📋 Useful commands:${NC}"
echo -e "  • View logs: ${YELLOW}cd $APP_DIR && docker-compose logs -f${NC}"
echo -e "  • Restart app: ${YELLOW}cd $APP_DIR && docker-compose restart${NC}"
echo -e "  • Update app: ${YELLOW}cd $APP_DIR && ./update.sh${NC}"
echo -e "  • Stop app: ${YELLOW}cd $APP_DIR && docker-compose down${NC}"
