#!/bin/bash

# Navigate to the backend directory
cd backend

# Install Composer dependencies
echo "Installing backend dependencies..."
composer install

# Copy the .env.example file to .env
echo "Setting up backend environment variables..."
cp .env.example .env

# Generate an application key
php artisan key:generate

# Run migrations (optional)
echo "Running migrations..."
php artisan migrate

# Navigate to the frontend directory
cd ../frontend

# Install npm dependencies
echo "Installing frontend dependencies..."
npm install

# Install axios, react-router-dom, and prop-types
echo "Installing additional frontend dependencies..."
npm install axios react-router-dom prop-types

echo "Setup complete! 🎉"

echo "run npm run dev in frontend directory to start the frontend application"
echo "run npm run build in frontend directory to build the frontend application when you are ready to deploy"
echo "run php artisan serve in backend directory to start the backend application"
 
 
