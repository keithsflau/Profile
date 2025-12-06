# Instructions to Upload to GitHub

## Step 1: Install Git (if not already installed)
Download and install Git from: https://git-scm.com/download/win

## Step 2: Create a GitHub Repository
1. Go to https://github.com/new
2. Create a new repository (don't initialize with README, .gitignore, or license)
3. Copy the repository URL (e.g., `https://github.com/yourusername/your-repo-name.git`)

## Step 3: Initialize Git and Push to GitHub

Open PowerShell or Command Prompt in this directory and run:

```powershell
# Navigate to the project directory
cd "F:\School PC\OneDrive\Desktop\Profile"

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit"

# Add remote repository (replace with your actual GitHub URL)
git remote add origin https://github.com/yourusername/your-repo-name.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Alternative: Using GitHub Desktop
If you prefer a GUI:
1. Download GitHub Desktop: https://desktop.github.com/
2. Open GitHub Desktop
3. File → Add Local Repository
4. Select this folder
5. Publish repository to GitHub

