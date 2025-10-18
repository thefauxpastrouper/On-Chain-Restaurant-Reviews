# 🧪 RestaurantChain Local Testing Guide

## ✅ Current Status

Your RestaurantChain app is **successfully running** with Bun! Here's how to test it:

## 🚀 Running the App

### Development Server (Hot Reload)
```bash
# Start development server
bun run dev

# Access at: http://localhost:8080
```

### Production Build (Optimized)
```bash
# Build production version
bun run build:prod

# Preview production build
bun run preview:prod

# Access at: http://localhost:4173
```

## 🌐 How to View and Test the App

### 1. **Development Mode** (Recommended for development)
- **URL**: http://localhost:8080
- **Features**: Hot reload, fast refresh, development tools
- **Status**: ✅ **RUNNING NOW**

### 2. **Production Mode** (Testing optimized build)
- **URL**: http://localhost:4173  
- **Features**: Optimized, minified, production-ready
- **Status**: ✅ **RUNNING NOW**

## 🔍 Testing Checklist

### ✅ Basic Functionality Tests

1. **Page Loading**
   - [ ] App loads without errors
   - [ ] Title shows "RestaurantChain - On-Chain Restaurant Reviews"
   - [ ] No console errors in browser dev tools

2. **Navigation**
   - [ ] Sidebar opens/closes properly
   - [ ] All menu items are clickable
   - [ ] Routes work correctly (Home, Add Review, etc.)

3. **Wallet Connection**
   - [ ] "Select Wallet" button appears in top right
   - [ ] Wallet connection modal opens
   - [ ] Can connect with Phantom/Solflare (if available)

4. **Restaurant Features**
   - [ ] Restaurant dropdown shows restaurants alphabetically
   - [ ] Can select restaurants from dropdown
   - [ ] Restaurant names are visible (not orange text issues)

5. **Review System**
   - [ ] Add Review form works
   - [ ] Star rating system functions
   - [ ] Update/Delete review forms work
   - [ ] Owner restriction messages are visible

6. **Documentation**
   - [ ] Documentation page loads
   - [ ] Smart contract code is displayed
   - [ ] All sections are readable

### ✅ Performance Tests

1. **Build Performance**
   - [ ] Production build completes successfully
   - [ ] Bundle size is optimized (~1.4MB total, ~380KB gzipped)
   - [ ] No build warnings or errors

2. **Runtime Performance**
   - [ ] App loads quickly
   - [ ] Smooth navigation
   - [ ] No memory leaks

## 🛠️ Testing Commands

### Quick Health Check
```bash
# Test if servers are running
curl http://localhost:8080/health  # Dev server
curl http://localhost:4173/health  # Production server

# Check build output
ls -la dist/
```

### Full Test Suite
```bash
# Run comprehensive tests
./test-bun.sh
```

### Development Workflow
```bash
# Start development
bun run dev

# In another terminal, test production build
bun run build:prod
bun run preview:prod
```

## 🐛 Troubleshooting

### If App Doesn't Load
1. **Check if servers are running**:
   ```bash
   ss -tlnp | grep -E ":(8080|4173)"
   ```

2. **Restart servers**:
   ```bash
   pkill -f "vite"
   bun run dev
   ```

3. **Check for port conflicts**:
   ```bash
   lsof -i :8080
   lsof -i :4173
   ```

### If Build Fails
1. **Clear cache and rebuild**:
   ```bash
   rm -rf dist/ node_modules/.vite
   bun install
   bun run build:prod
   ```

2. **Check for TypeScript errors**:
   ```bash
   bunx tsc --noEmit
   ```

## 📊 Performance Metrics

### Current Build Stats
```
Total Bundle Size: ~1.4MB (gzipped: ~380KB)
├── Main app: 327KB (96KB gzipped)
├── Solana libraries: 467KB (135KB gzipped)  
├── UI components: 67KB (23KB gzipped)
├── Vendor libraries: 142KB (46KB gzipped)
└── Router & Query: 48KB (13KB gzipped)
```

### Optimization Features
- ✅ **Bun runtime** for faster builds
- ✅ **Code splitting** for better caching
- ✅ **Tree shaking** for smaller bundles
- ✅ **Gzip compression** enabled
- ✅ **Static asset caching** configured

## 🚀 Next Steps

### For Development
1. **Make changes** to your code
2. **See hot reload** in action at http://localhost:8080
3. **Test production build** with `bun run build:prod`

### For Deployment
1. **Test production build** thoroughly
2. **Deploy to Hetzner** with `./deploy.sh`
3. **Monitor performance** in production

## 🎯 Success Criteria

Your app is working correctly if:
- ✅ Both dev and production servers start without errors
- ✅ App loads in browser without console errors
- ✅ All navigation and features work
- ✅ Production build is optimized and fast
- ✅ No TypeScript or build errors

## 📱 Browser Testing

Test in multiple browsers:
- **Chrome/Chromium**: Primary testing
- **Firefox**: Cross-browser compatibility
- **Safari**: WebKit compatibility
- **Mobile browsers**: Responsive design

## 🔧 Development Tips

1. **Use browser dev tools** to inspect and debug
2. **Check console** for any JavaScript errors
3. **Test wallet connection** with actual Solana wallets
4. **Verify responsive design** on different screen sizes
5. **Test all user flows** from start to finish

Your RestaurantChain app is ready for development and deployment! 🎉
