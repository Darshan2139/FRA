#!/bin/bash

# Fusion Starter - Render Deployment Script
# This script helps prepare and deploy the project to Render

echo "🚀 Fusion Starter - Render Deployment Helper"
echo "============================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please initialize git first:"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Initial commit'"
    exit 1
fi

# Check if files exist
echo "📋 Checking required files..."

required_files=("render.yaml" "package.json" "server/index.ts" "client/App.tsx")
for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file - Missing!"
        exit 1
    fi
done

echo ""
echo "🔧 Build the project locally to test..."
if command -v pnpm &> /dev/null; then
    echo "Using pnpm..."
    pnpm install
    pnpm build
else
    echo "pnpm not found, using npm..."
    npm install
    npm run build
fi

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Please fix errors before deploying."
    exit 1
fi

echo ""
echo "📝 Next steps for Render deployment:"
echo "1. Push your code to GitHub:"
echo "   git add ."
echo "   git commit -m 'Prepare for Render deployment'"
echo "   git push origin main"
echo ""
echo "2. Go to https://render.com and create a new Web Service"
echo "3. Connect your GitHub repository"
echo "4. Use these settings:"
echo "   - Build Command: pnpm install && pnpm build"
echo "   - Start Command: pnpm start"
echo "   - Health Check Path: /health"
echo ""
echo "5. Add environment variables (optional):"
echo "   - NODE_ENV: production"
echo "   - PING_MESSAGE: Your custom message"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT.md"
echo ""
echo "🎉 Ready for deployment!"
