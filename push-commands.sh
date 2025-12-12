#!/bin/bash
# Replace YOUR_USERNAME with your actual GitHub username
# Then run: bash push-commands.sh

GITHUB_USERNAME="YOUR_USERNAME"  # <-- CHANGE THIS!

cd /Users/brab/vibe-project
git remote add origin https://github.com/$GITHUB_USERNAME/moms-day-planner.git
git branch -M main
git push -u origin main

echo "✅ Done! Your repo is at: https://github.com/$GITHUB_USERNAME/moms-day-planner"

