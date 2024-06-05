#!/bin/sh

# Define the Docker image name
IMAGE_NAME="my-app"

# Build the Docker image
docker build -t $IMAGE_NAME .

# Run the Docker image
docker run -p 3000:3000 $IMAGE_NAME