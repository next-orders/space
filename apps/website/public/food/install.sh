#!/bin/bash

# Args
VERSION=$1
NUXT_PUBLIC_LOCALE=$2
DOMAIN_NAME=$3
EMAIL=$4

# Env Vars
POSTGRES_USER="sushi"
POSTGRES_PASSWORD=$(openssl rand -base64 12)  # Generate a random 12-character password
POSTGRES_DB="food"
NUXT_CHANNEL_ID="burger"
NUXT_SESSION_PASSWORD=$(openssl rand -base64 32) # Generate a random 32-character password

# Script Vars
APP_DIR=~/food
SWAP_SIZE="1G"  # Swap size of 1GB

# Update package list and upgrade existing packages
sudo apt update && sudo apt upgrade -y

# Add Swap Space
echo "Adding swap space..."
sudo fallocate -l $SWAP_SIZE /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# Make swap permanent
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# Install Docker
sudo apt install apt-transport-https ca-certificates curl software-properties-common -y
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" -y
sudo apt update
sudo apt install docker-ce -y

# Install Docker Compose
sudo rm -f /usr/local/bin/docker-compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# Wait for the file to be fully downloaded before proceeding
if [ ! -f /usr/local/bin/docker-compose ]; then
  echo "Docker Compose download failed. Exiting."
  exit 1
fi

sudo chmod +x /usr/local/bin/docker-compose

# Ensure Docker Compose is executable and in path
sudo ln -sf /usr/local/bin/docker-compose /usr/bin/docker-compose

# Verify Docker Compose installation
docker-compose --version
if [ $? -ne 0 ]; then
  echo "Docker Compose installation failed. Exiting."
  exit 1
fi

# Ensure Docker starts on boot and start Docker service
sudo systemctl enable docker
sudo systemctl start docker

# For Docker internal communication
DATABASE_URL="postgres://$POSTGRES_USER:$POSTGRES_PASSWORD@food-db:5432/$POSTGRES_DB"

# Create the .env file inside the app directory
mkdir -p $APP_DIR
echo "POSTGRES_USER=$POSTGRES_USER" > "$APP_DIR/.env"
echo "POSTGRES_PASSWORD=$POSTGRES_PASSWORD" >> "$APP_DIR/.env"
echo "POSTGRES_DB=$POSTGRES_DB" >> "$APP_DIR/.env"
echo "DATABASE_URL=$DATABASE_URL" >> "$APP_DIR/.env"

# App environment variables
echo "VERSION=$VERSION" >> "$APP_DIR/.env"
echo "NUXT_PUBLIC_LOCALE=$NUXT_PUBLIC_LOCALE" >> "$APP_DIR/.env"
echo "NUXT_CHANNEL_ID=$NUXT_CHANNEL_ID" >> "$APP_DIR/.env"
echo "NUXT_SESSION_PASSWORD=$NUXT_SESSION_PASSWORD" >> "$APP_DIR/.env"

# Domain environment variables
echo "DOMAIN_NAME=$DOMAIN_NAME" >> "$APP_DIR/.env"
echo "EMAIL=$EMAIL" >> "$APP_DIR/.env"

# Run the Docker containers from the app directory
cd $APP_DIR
curl -fsSL https://nextorders.space/food/docker-compose.yaml -o docker-compose.yaml
sudo docker-compose up -d

# Check if Docker Compose started correctly
if ! sudo docker-compose ps | grep "Up"; then
  echo "Docker containers failed to start. Check logs with 'docker-compose logs'."
  exit 1
fi

# Output final message
echo "Deployment complete. Your app and database are now running."
