#!/bin/bash

# RestaurantChain Update Script
# This script updates the application with the latest changes

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔄 RestaurantChain Update Script${NC}"
echo -e "${BLUE}=================================${NC}"

# Check if we're in the right directory
if [ ! -f "docker-compose.yml" ]; then
    echo -e "${RED}❌ docker-compose.yml not found. Please run this script from the application directory.${NC}"
    exit 1
fi

# Create backup
echo -e "${YELLOW}💾 Creating backup...${NC}"
BACKUP_DIR="backup-$(date +%Y%m%d-%H%M%S)"
mkdir -p $BACKUP_DIR
cp -r . $BACKUP_DIR/ 2>/dev/null || true
echo -e "${GREEN}✅ Backup created: $BACKUP_DIR${NC}"

# Pull latest changes (if using git)
if [ -d ".git" ]; then
    echo -e "${YELLOW}📥 Pulling latest changes...${NC}"
    git pull origin main || echo -e "${YELLOW}⚠️  Git pull failed, continuing with local changes${NC}"
fi

# Install dependencies with Bun
echo -e "${YELLOW}📦 Installing dependencies with Bun...${NC}"
bun install

# Stop the application
echo -e "${YELLOW}⏹️  Stopping application...${NC}"
docker-compose down

# Remove old images to free up space
echo -e "${YELLOW}🧹 Cleaning up old images...${NC}"
docker image prune -f

# Build new image
echo -e "${YELLOW}🔨 Building new image...${NC}"
docker-compose build --no-cache

# Start the application
echo -e "${YELLOW}🚀 Starting application...${NC}"
docker-compose up -d

# Wait for application to start
echo -e "${YELLOW}⏳ Waiting for application to start...${NC}"
sleep 15

# Check if application is running
if curl -f http://localhost/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Application updated successfully!${NC}"
    echo -e "${GREEN}🌐 Your app is available at: http://$(curl -s ifconfig.me)${NC}"
    
    # Clean up old backups (keep only last 5)
    echo -e "${YELLOW}🧹 Cleaning up old backups...${NC}"
    ls -t backup-* | tail -n +6 | xargs -r rm -rf
    
else
    echo -e "${RED}❌ Application failed to start after update${NC}"
    echo -e "${YELLOW}🔄 Rolling back to previous version...${NC}"
    
    # Restore from backup
    if [ -d "$BACKUP_DIR" ]; then
        cp -r $BACKUP_DIR/* .
        docker-compose up -d
        echo -e "${GREEN}✅ Rollback completed${NC}"
    else
        echo -e "${RED}❌ No backup found for rollback${NC}"
    fi
    
    echo -e "${YELLOW}📋 Checking logs...${NC}"
    docker-compose logs
    exit 1
fi

echo -e "${GREEN}🎉 Update completed successfully!${NC}"
