#!/bin/bash

# Frontend Local Development Setup Script
echo "🚀 Setting up frontend local development environment..."

# Check if .env files exist
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "✅ .env file created. Please update the values as needed."
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo "✅ Frontend local development environment setup complete!"
echo ""
echo "To start the development server:"
echo "  npm run dev"
echo ""
echo "Make sure the backend is running on http://localhost:8888"
