-- Install npm on the Pi if npm is not installed
sudo apt-get install nodejs npm

-- Build the Docker Image if the image has not been built before
docker build -t mynodejs .

-- Application Code can be copied to the share volume (see the run script)
-- Run the Docker Image and go to localhost:3000 to run the Express / MongoDB Test App
./run.sh

