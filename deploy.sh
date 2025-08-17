#!/bin/bash

# Task Manager Deployment Script
echo "Starting Task Manager deployment..."

# Update system packages
sudo apt-get update
sudo apt-get upgrade -y

# Install Node.js and npm
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 globally
sudo npm install -g pm2

# Install serve for frontend
sudo npm install -g serve

# Create application directory
sudo mkdir -p /var/www/task-manager
sudo chown $USER:$USER /var/www/task-manager

# Navigate to application directory
cd /var/www/task-manager

# Clone repository (if not already present)
if [ ! -d ".git" ]; then
    git clone https://github.com/yourusername/task-manager.git .
fi

# Install dependencies
npm install
cd backend && npm install
cd ../frontend && npm install

# Build frontend
npm run build

# Create logs directory
mkdir -p logs

# Set environment variables
export NODE_ENV=production
export PORT=5000
export MONGODB_URI="your-mongodb-connection-string"
export JWT_SECRET="your-jwt-secret"

# Start application with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup

echo "Deployment completed successfully!"
echo "Application is running on:"
echo "Backend: http://localhost:5000"
echo "Frontend: http://localhost:3000"
echo "PM2 Status:"
pm2 status
