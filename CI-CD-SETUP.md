# CI/CD Pipeline Setup Documentation

This document provides instructions for setting up and capturing screenshots of the CI/CD pipeline for the Task Manager application.

## 5.1 YML File Screenshot

The GitHub Actions workflow file is located at `.github/workflows/ci.yml`. This file contains:

- **Triggers**: Push to main branch and pull requests
- **Jobs**: Test, Build, and Deploy
- **Environment**: Ubuntu latest runner
- **Node.js Version**: 18.x
- **AWS Integration**: For EC2 deployment

**To capture screenshot:**
1. Navigate to your GitHub repository
2. Go to `.github/workflows/ci.yml`
3. Take a screenshot showing the complete YAML configuration

## 5.2 Test Case Pass/Fail Status Screenshot

The test suite includes:
- Authentication tests (register, login, invalid credentials)
- Task management tests (create, read, update, delete)
- Error handling tests (unauthorized access, 404 errors)

**To capture screenshot:**
1. Run tests locally: `cd backend && npm test`
2. Or view GitHub Actions test results
3. Take a screenshot showing all tests passing

## 5.3 GitHub Action Configuration Screenshot

**Required GitHub Secrets:**
- `AWS_ACCESS_KEY_ID`: AWS access key for EC2 deployment
- `AWS_SECRET_ACCESS_KEY`: AWS secret key
- `EC2_HOST`: EC2 instance public IP
- `EC2_USERNAME`: SSH username (usually 'ubuntu')
- `EC2_SSH_KEY`: Private SSH key for EC2 access
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: JWT signing secret

**To capture screenshot:**
1. Go to GitHub repository Settings > Secrets and variables > Actions
2. Take a screenshot showing the configured secrets (values will be hidden)

## 5.4 EC2 Server Configuration Screenshot

**PM2 Status Output:**
The application runs two processes:
- `task-manager-backend`: Backend API server
- `task-manager-frontend`: Frontend static server

**To capture screenshot:**
1. SSH into your EC2 instance
2. Run: `pm2 status`
3. Take a screenshot showing both processes running

## 5.5 Running Project Screenshot

**Application URLs:**
- Frontend: `http://YOUR_EC2_PUBLIC_IP:3000`
- Backend API: `http://YOUR_EC2_PUBLIC_IP:5000`

**To capture screenshot:**
1. Open your browser
2. Navigate to the frontend URL
3. Take a screenshot showing the application running
4. Include the public IP in the screenshot

## 5.6 Final Workflow Run Test Screenshot

**To capture screenshot:**
1. Make a small change to your code
2. Push to the main branch
3. Go to GitHub repository > Actions tab
4. Click on the running workflow
5. Take a screenshot showing all jobs (test, build, deploy) running/passing

## Setup Instructions

### 1. GitHub Repository Setup
```bash
# Initialize git repository
git init
git add .
git commit -m "Initial commit with CI/CD setup"
git branch -M main
git remote add origin https://github.com/yourusername/task-manager.git
git push -u origin main
```

### 2. GitHub Secrets Configuration
1. Go to your repository Settings
2. Navigate to Secrets and variables > Actions
3. Add the required secrets listed above

### 3. EC2 Instance Setup
```bash
# SSH into your EC2 instance
ssh -i your-key.pem ubuntu@your-ec2-ip

# Run the deployment script
chmod +x deploy.sh
./deploy.sh
```

### 4. Security Group Configuration
Ensure your EC2 security group allows:
- Port 22 (SSH)
- Port 80 (HTTP)
- Port 443 (HTTPS)
- Port 3000 (Frontend)
- Port 5000 (Backend)

### 5. Domain Configuration (Optional)
- Point your domain to the EC2 public IP
- Configure nginx as reverse proxy
- Set up SSL certificate

## Troubleshooting

### Common Issues:
1. **Tests failing**: Check MongoDB connection and environment variables
2. **Deployment failing**: Verify AWS credentials and EC2 SSH access
3. **PM2 not starting**: Check logs with `pm2 logs`
4. **Port access issues**: Verify security group configuration

### Useful Commands:
```bash
# Check PM2 status
pm2 status

# View PM2 logs
pm2 logs

# Restart application
pm2 restart all

# Monitor resources
pm2 monit
```

## File Structure
```
├── .github/
│   └── workflows/
│       └── ci.yml                 # GitHub Actions workflow
├── backend/
│   ├── test/
│   │   └── test-suite.js         # Backend test suite
│   └── package.json
├── frontend/
│   └── src/
│       └── App.test.js           # Frontend tests
├── ecosystem.config.js           # PM2 configuration
├── deploy.sh                     # EC2 deployment script
└── CI-CD-SETUP.md               # This documentation
```

This setup provides a complete CI/CD pipeline with automated testing, building, and deployment to EC2 using PM2 for process management.
