echo "Switching to branch MAIN"
git checkout main

echo "Pulling latest changes from MAIN"
git pull

echo "Building the project"
npm run build

echo "Copying the build to the server"
scp -r dist/* web-server:/var/www/dreez/

echo "Deployment completed successfully"