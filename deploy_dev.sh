echo "Switching to branch dev"
git checkout dev

echo "Pulling latest changes from dev"
git pull

echo "Building the project"
npm run build

echo "Copying the build to the server"
scp -r dist/* web-server:/var/www/dev/dreez/

echo "Deployment completed successfully"