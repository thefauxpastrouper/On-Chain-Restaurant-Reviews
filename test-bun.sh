#!/bin/bash

# Test script to verify Bun is working correctly
echo "🍞 Testing Bun setup for RestaurantChain..."

# Test 1: Check if Bun is installed
echo "1. Checking Bun installation..."
if command -v bun &> /dev/null; then
    echo "✅ Bun is installed: $(bun --version)"
else
    echo "❌ Bun is not installed"
    exit 1
fi

# Test 2: Check if dependencies can be installed
echo "2. Testing dependency installation..."
if bun install --dry-run &> /dev/null; then
    echo "✅ Dependencies can be installed with Bun"
else
    echo "❌ Failed to install dependencies with Bun"
    exit 1
fi

# Test 3: Test production build
echo "3. Testing production build..."
if bun run build:prod &> /dev/null; then
    echo "✅ Production build successful with Bun"
else
    echo "❌ Production build failed with Bun"
    exit 1
fi

# Test 4: Check build output
echo "4. Checking build output..."
if [ -d "dist" ] && [ -f "dist/index.html" ]; then
    echo "✅ Build output created successfully"
    echo "   - dist/index.html exists"
    echo "   - Build size: $(du -sh dist | cut -f1)"
else
    echo "❌ Build output not found"
    exit 1
fi

# Test 5: Test preview server
echo "5. Testing preview server..."
bun run preview:prod &
PREVIEW_PID=$!
sleep 5

if curl -s http://localhost:4173/health > /dev/null 2>&1; then
    echo "✅ Preview server is working"
    kill $PREVIEW_PID 2>/dev/null
else
    echo "❌ Preview server failed to start"
    kill $PREVIEW_PID 2>/dev/null
    exit 1
fi

echo ""
echo "🎉 All Bun tests passed! Your RestaurantChain app is ready for deployment."
echo ""
echo "Next steps:"
echo "1. Deploy to Hetzner: ./deploy.sh"
echo "2. Update app: ./update.sh"
echo "3. View logs: docker-compose logs -f"
