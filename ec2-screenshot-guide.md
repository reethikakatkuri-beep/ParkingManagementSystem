# EC2 Screenshot Guide

## 5.4 EC2 Server Configuration (PM2 Status Output)

### Steps to capture screenshot:

1. **SSH into your EC2 instance:**
   ```bash
   ssh -i your-key.pem ubuntu@YOUR_EC2_PUBLIC_IP
   ```

2. **Run PM2 status command:**
   ```bash
   pm2 status
   ```

3. **Expected output to screenshot:**
   ```
   ┌─────┬─────────────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
   │ id  │ name                │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
   ├─────┼─────────────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
   │ 0   │ task-manager-backend│ default     │ N/A     │ fork    │ 1234     │ 2D     │ 0    │ online    │ 0%       │ 45.2mb   │ ubuntu   │ disabled │
   │ 1   │ task-manager-frontend│ default     │ N/A     │ fork    │ 5678     │ 2D     │ 0    │ online    │ 0%       │ 23.1mb   │ ubuntu   │ disabled │
   └─────┴─────────────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
   ```

4. **Take screenshot** showing:
   - Both processes running (online status)
   - Process names: task-manager-backend and task-manager-frontend
   - Uptime showing the processes have been running

---

## 5.5 Running Project Screenshot (Public IP)

### Steps to capture screenshot:

1. **Get your EC2 public IP:**
   ```bash
   # In EC2 terminal
   curl http://169.254.169.254/latest/meta-data/public-ipv4
   ```

2. **Open your browser** and navigate to:
   ```
   http://YOUR_EC2_PUBLIC_IP:3000
   ```

3. **Take screenshot** showing:
   - Browser address bar with the public IP visible
   - Application running (login page or dashboard)
   - Make sure the URL shows: `http://XX.XX.XX.XX:3000` (your actual IP)

### Alternative: If you don't have EC2 set up yet

**For 5.4 PM2 Status:**
- Run locally: `pm2 start ecosystem.config.js`
- Then: `pm2 status`
- Take screenshot of the output

**For 5.5 Running Project:**
- Run locally: `npm run dev`
- Open browser to: `http://localhost:3000`
- Take screenshot showing localhost in address bar

---

## Quick Setup Commands (if needed):

```bash
# Install PM2 globally
sudo npm install -g pm2

# Start the application
pm2 start ecosystem.config.js

# Check status
pm2 status

# View logs
pm2 logs

# Monitor resources
pm2 monit
```

## Important Notes:

- **5.4 Screenshot:** Must show PM2 status with both backend and frontend processes running
- **5.5 Screenshot:** Must show the application running with public IP visible in browser address bar
- **Both screenshots:** Should clearly show your username/repository name if possible
