GridSphere Website

A modern, interactive website for GridSphere showcasing AI-powered orchard intelligence, disease prediction, smart irrigation, pest forecasting, and precision agriculture solutions.

Features
Modern Next.js application
Interactive 3D product visualization using Three.js
Scroll-driven storytelling animations
AI-powered agriculture showcase
Responsive design for desktop, tablet, and mobile
Dynamic gallery section
Product information pages
Contact and company information pages
Optimized performance and smooth animations
Tech Stack
Next.js
React
TypeScript
Tailwind CSS
Framer Motion
Three.js
React Three Fiber
Drei




Prerequisites

Before running the project locally, ensure the following are installed:

Node.js (v18 or higher recommended)
npm

Verify installation:

node -v
npm -v
Clone the Repository
git clone <repository-url>
cd GS_site
Install Dependencies
npm install
Required Assets

The project depends on local assets stored inside the public directory.

Please ensure the following folders are present:

public/
├── gallery/
│   ├── image1.jpg
│   ├── image2.jpg
│   ├── ...
│
├── sequence/
│   ├── ezgif-frame-001.jpg
│   ├── ezgif-frame-002.jpg
│   ├── ...
│   └── ezgif-frame-240.jpg
│
├── models/
│   └── main-1.glb
Important

The following assets are required for the website to function correctly:

Gallery Images

All gallery images must remain inside:

public/gallery/
Product Animation Sequence

The scroll-driven product animation loads image frames from:

public/sequence/

Frame naming convention:

ezgif-frame-001.jpg
ezgif-frame-002.jpg
...
ezgif-frame-240.jpg

Do not rename these files.


Run Development Server

Start the application:

npm run dev

Open:

http://localhost:3000

in your browser.

Build for Production
npm run build

Start production server:

npm start
Troubleshooting
Missing Images

If gallery images do not appear:

Verify images exist in:
public/gallery/
Ensure filenames match references used in code.
Restart the development server.
Sequence Animation Not Loading

Verify:

public/sequence/

contains all animation frames.

Missing frames will cause incomplete or broken animation playback.


Dependencies Issues

Delete existing dependencies and reinstall:

rm -rf node_modules
rm package-lock.json
npm install

Windows PowerShell:

Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
Notes
All media assets used by the project are stored locally.
The website is designed to run without external image hosting.
For accurate rendering and functionality, clone the repository together with all files inside the public directory.
Do not remove the gallery, sequence, or model assets before testing.






Author

Developed for GridSphere – AI-powered Orchard Intelligence Platform.
