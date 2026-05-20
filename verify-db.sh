#!/bin/bash

# Database Connection Verification Script
# This script verifies that your environment variables are properly set up

echo "=== Prisma Database Connection Verification ==="
echo ""

# Check if .env.local exists
if [ -f ".env.local" ]; then
    echo "✓ .env.local file exists"
else
    echo "✗ .env.local file not found"
    exit 1
fi

# Check PRISMA_DATABASE_URL
if grep -q "PRISMA_DATABASE_URL" .env.local; then
    echo "✓ PRISMA_DATABASE_URL is set"
else
    echo "✗ PRISMA_DATABASE_URL is missing"
fi

# Check POSTGRES_URL
if grep -q "POSTGRES_URL" .env.local; then
    echo "✓ POSTGRES_URL is set"
else
    echo "✗ POSTGRES_URL is missing"
fi

echo ""
echo "=== Environment Setup Complete ==="
echo ""
echo "Next steps:"
echo "1. npm install"
echo "2. npm run db:push"
echo "3. npm run db:seed"
echo "4. npm run dev"
echo ""
