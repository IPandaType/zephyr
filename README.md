# Zephyr AR Baby Animation App

A React-based Augmented Reality web application that displays baby video animations when a camera detects specific image targets.

## ✅ Full React App - Ready to Use!
Your AR app is now a complete React application with all original functionality preserved!

## Features
- ⚛️ **React 18** - Modern React with hooks and functional components
- 📱 **Mobile AR** - MindAR integration for reliable AR tracking
- 🎯 **Image Recognition** - Detects bayko.jpeg target image
- 🎬 **Video Animation** - Smooth baby.mp4 video playback
- 🎮 **Interactive Controls** - Scale adjustment buttons
- 📱 **Responsive Design** - Optimized for mobile devices
- 🎨 **Clean UI** - Professional interface with bottom controls

## How to Use

### 🚀 Quick Start

### Development
```bash
# Install dependencies
npm install

# Start development server
npm start

# Open http://localhost:3000 in your browser
```

### Production Build
```bash
# Build for production
npm run build

# Serve the build
npm run serve
```

### Usage
1. Open the app in a mobile browser (HTTPS required for camera)
2. Grant camera permissions when prompted
3. Point your camera at the `bayko.jpeg` image
4. Watch your baby video animation appear below the logo!
5. Use the scale buttons to adjust size

## 📁 Project Structure
```
zephyr-ar-app/
├── public/
│   ├── index.html          # Main HTML file
│   ├── baby.mp4          # Baby video animation
│   ├── bayko.jpeg        # AR target image
│   └── targets.mind       # MindAR recognition data
├── src/
│   ├── App.js            # Main React component
│   ├── App.css           # Component styles
│   ├── index.js          # React entry point
│   └── index.css         # Global styles
└── package.json          # Dependencies and scripts
```

#### Option A: GitHub Releases (Recommended)
1. Go to your GitHub repository
2. Click "Releases" → "Create a new release"
3. Tag version: `v1.0.0`
4. Title: `AR Models v1.0.0`
5. Attach your `Baby.stl` file
6. Publish release
7. Copy the download URL and update `index.html`

#### Option B: Google Drive
1. Upload `Baby.stl` to Google Drive
2. Right-click → "Get link" → "Anyone with the link"
3. Change the URL format:
   - From: `https://drive.google.com/file/d/FILE_ID/view?usp=sharing`
   - To: `https://drive.google.com/uc?export=download&id=FILE_ID`
4. Update the URL in `index.html`

#### Option C: Dropbox
1. Upload `Baby.stl` to Dropbox
2. Get shareable link
3. Change `?dl=0` to `?dl=1` at the end
4. Update the URL in `index.html`

### 2. Update the Model URL
Edit `index.html` line 23 and replace the URL:
```html
<a-asset-item id="babyModel" src="YOUR_HOSTED_STL_URL_HERE"></a-asset-item>
```

### 3. Test Your AR App
1. Serve the files over HTTPS (required for camera access)
2. Open in mobile browser
3. Point camera at `incredibles.jpg`
4. Grant camera permissions
5. Watch for the 3D model to appear!

## File Structure
- `index.html` - Main AR application
- `incredibles.jpg` - Image target for AR recognition
- `targets.mind` - Trained image recognition data
- `Baby.stl` - 3D model file (needs external hosting)

## Troubleshooting
- Check browser console for error messages
- Ensure HTTPS is used for camera access
- Verify STL file URL is accessible
- Try the fallback models if primary fails

Updated: Fri Jul 12 2025
