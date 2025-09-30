# Deployment Guide for Render

This guide will help you deploy the Fusion Starter project on Render.

## Prerequisites

1. A GitHub account
2. A Render account (sign up at [render.com](https://render.com))
3. Your project pushed to a GitHub repository

## Deployment Steps

### 1. Prepare Your Repository

Make sure your project is pushed to GitHub with the following files:
- `render.yaml` - Render configuration
- `package.json` - Updated with production scripts
- All source code files

### 2. Deploy on Render

1. **Log in to Render Dashboard**
   - Go to [render.com](https://render.com)
   - Sign in or create an account

2. **Create New Web Service**
   - Click "New +" button
   - Select "Web Service"
   - Connect your GitHub repository

3. **Configure the Service**
   - **Name**: `fusion-starter` (or your preferred name)
   - **Environment**: `Node`
   - **Build Command**: `pnpm install && pnpm build`
   - **Start Command**: `pnpm start`
   - **Health Check Path**: `/api/ping`

4. **Environment Variables** (Optional)
   - `NODE_ENV`: `production`
   - `PORT`: `10000` (Render will override this)
   - `PING_MESSAGE`: `Fusion Starter is running on Render!`

5. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy your application

### 3. Verify Deployment

Once deployed, you can verify your application is working:

- **Main Application**: `https://your-app-name.onrender.com`
- **API Health Check**: `https://your-app-name.onrender.com/api/ping`
- **Health Endpoint**: `https://your-app-name.onrender.com/health`

## Configuration Files

### render.yaml
The `render.yaml` file contains the Render service configuration:
- Service type: Web service
- Build and start commands
- Environment variables
- Health check configuration

### package.json Updates
Added production scripts:
- `start:prod`: Production start command
- `postinstall`: Automatic build after install

### Server Updates
- Added `/health` endpoint for Render monitoring
- Enhanced error handling for production

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check that all dependencies are in `package.json`
   - Ensure Node.js version compatibility

2. **Runtime Errors**
   - Check the Render logs in the dashboard
   - Verify environment variables are set correctly

3. **Health Check Failures**
   - Ensure `/api/ping` endpoint is accessible
   - Check server logs for errors

### Monitoring

- **Logs**: Available in Render dashboard under "Logs" tab
- **Metrics**: Monitor CPU, memory, and response times
- **Health**: Automatic health checks via `/api/ping`

## Custom Domain (Optional)

1. In Render dashboard, go to your service
2. Click "Settings" tab
3. Add your custom domain
4. Update DNS records as instructed

## Environment Variables

Set these in Render dashboard under "Environment" tab:

```
NODE_ENV=production
PING_MESSAGE=Your custom message
```

## Support

For issues with:
- **Render Platform**: Check [Render Documentation](https://render.com/docs)
- **Application Code**: Check application logs in Render dashboard
- **Build Issues**: Verify all dependencies and build commands

## Next Steps

After successful deployment:
1. Test all API endpoints
2. Verify frontend routing works correctly
3. Set up monitoring and alerts
4. Configure custom domain (if needed)
5. Set up CI/CD for automatic deployments
