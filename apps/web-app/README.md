# Next.js Web App

A modern, responsive web application built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Next.js 14** - Latest version with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework  
- **ESLint** - Code linting and formatting
- **Docker** - Containerized deployment
- **Responsive Design** - Works on all devices
- **API Integration** - Connects to FastAPI backend

## 📋 Prerequisites

- Node.js 18+ 
- pnpm (recommended package manager)
- Docker (optional, for containerized deployment)

## 🛠️ Installation

### Using pnpm (Recommended)

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

### Using npm

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🏃 Running the Application

### Development Mode

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Mode

```bash
pnpm build
pnpm start
```

## 🐳 Docker

### Build and Run

```bash
# Build the Docker image
docker build -t web-app .

# Run the container
docker run -p 3000:3000 web-app
```

### Using Docker Compose

```bash
# From the root directory
docker-compose up web-app
```

## 📁 Project Structure

```
web-app/
├── public/
│   ├── *.svg                 # SVG icons
│   └── favicon.ico           # Favicon
├── src/
│   └── app/
│       ├── globals.css       # Global styles
│       ├── layout.tsx        # Root layout
│       ├── page.tsx          # Home page
│       └── favicon.ico       # App favicon
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript config
├── next.config.ts            # Next.js config
├── tailwind.config.ts        # Tailwind config
├── postcss.config.mjs        # PostCSS config
├── eslint.config.mjs         # ESLint config
└── Dockerfile                # Docker config
```

## 🎨 Styling

This project uses Tailwind CSS for styling with:

- **Responsive Design** - Mobile-first approach
- **Dark Mode** - Automatic dark/light theme switching
- **Custom Components** - Reusable utility classes
- **Typography** - Inter font via Google Fonts

## 📡 API Integration

The application connects to the FastAPI backend running on port 8000:

- **Health Check** - `/health` endpoint status
- **Users API** - CRUD operations for users
- **CORS** - Configured for cross-origin requests

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the project root:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000

# Optional: Disable Next.js telemetry
NEXT_TELEMETRY_DISABLED=1
```

### Next.js Configuration

The `next.config.ts` file includes:

- **Standalone output** - For Docker optimization
- **Security headers** - Disabled powered-by header
- **ESLint directories** - Configured for src directory

## 📝 Scripts

```bash
# Development
pnpm dev           # Start development server
pnpm build         # Build for production
pnpm start         # Start production server

# Code Quality
pnpm lint          # Run ESLint
pnpm type-check    # Run TypeScript type checking
```

## 🌐 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up --build web-app
```

## 🔗 Integration

This frontend is designed to work with the FastAPI backend (`py-app`) in the monorepo structure. Both applications can be run together using Docker Compose from the root directory.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.