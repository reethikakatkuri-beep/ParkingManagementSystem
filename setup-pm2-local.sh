#!/bin/bash

echo "Setting up PM2 locally for testing..."

# Install PM2 globally if not already installed
if ! command -v pm2 &> /dev/null; then
    echo "Installing PM2..."
    npm install -g pm2
fi

# Create a simple test app for PM2
echo "Creating test applications..."

# Create a simple backend test
cat > test-backend.js << 'EOF'
const express = require('express');
const app = express();
const port = 5000;

app.get('/', (req, res) => {
  res.json({ message: 'Backend is running', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
EOF

# Create a simple frontend test
cat > test-frontend.js << 'EOF'
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>Frontend Test</title></head>
      <body>
        <h1>Frontend is running!</h1>
        <p>This is a test frontend for PM2 screenshot</p>
        <p>Timestamp: ${new Date().toISOString()}</p>
      </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Frontend server running on port ${port}`);
});
EOF

# Update ecosystem config for local testing
cat > ecosystem-local.config.js << 'EOF'
module.exports = {
  apps: [
    {
      name: 'task-manager-backend',
      script: './test-backend.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 5000
      }
    },
    {
      name: 'task-manager-frontend',
      script: './test-frontend.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
};
EOF

# Install express if not already installed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm init -y
    npm install express
fi

# Start the applications with PM2
echo "Starting applications with PM2..."
pm2 start ecosystem-local.config.js

# Show PM2 status
echo ""
echo "PM2 Status (Take screenshot of this output):"
echo "============================================="
pm2 status

echo ""
echo "Applications are now running:"
echo "- Backend: http://localhost:5000"
echo "- Frontend: http://localhost:3000"
echo ""
echo "To stop: pm2 stop all"
echo "To restart: pm2 restart all"
echo "To view logs: pm2 logs"
