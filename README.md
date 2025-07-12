# Zephyr AR 3D Model Viewer

An Augmented Reality web application that displays 3D models when a camera detects specific image targets.

## ✅ Ready to Use!
Your Baby.stl model is now hosted directly on GitHub and ready for AR display!

## Features
- 📱 Mobile AR support using MindAR
- 🎯 Image target recognition (incredibles.jpg)
- 🎨 3D STL model display with rotation animation
- 🔄 Multiple fallback options for model loading
- 📊 Real-time debug console
- ☁️ GitHub-hosted 3D model (reliable and fast)

## How to Use

### 🚀 Quick Start
1. Serve the files over HTTPS (required for camera access)
2. Open `index.html` in a mobile browser
3. Point your camera at the `incredibles.jpg` image
4. Grant camera permissions when prompted
5. Watch your 3D baby model appear and rotate!

## Setup Instructions (Already Complete!)

### ✅ STL File Hosting
Your `Baby.stl` file is now hosted directly on GitHub and configured in the app.

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
