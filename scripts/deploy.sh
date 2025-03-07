#!/bin/bash
git pull origin main
cd server
npm install
pm2 restart index.js
cd ../client
npm install
npm run build
