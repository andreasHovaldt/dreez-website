echo "Switching to branch MAIN"
git checkout main

echo "Pulling latest changes from MAIN"
git pull

echo "Building the project"
npm run build

echo "Copying the build to the server"
scp -r dist/* web-server-local:/var/www/dreez/

echo "Deployment completed successfully"
echo "NOTE: If the new deployment is not available on the website, run 'sudo systemctl reload nginx' on the web server" 