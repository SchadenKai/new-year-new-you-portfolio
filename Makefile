# Docker Hub Configuration
# Override these variables when running make, e.g.:
# make build DOCKER_USERNAME=myuser IMAGE_NAME=my-portfolio TAG=v1.0.0

DOCKER_USERNAME ?= schadenkai
IMAGE_NAME ?= new-year-new-you-portfolio
TAG ?= latest

# Full image name with Docker Hub prefix
FULL_IMAGE_NAME = $(DOCKER_USERNAME)/$(IMAGE_NAME):$(TAG)
LATEST_IMAGE_NAME = $(DOCKER_USERNAME)/$(IMAGE_NAME):latest

# Default target
.PHONY: help
help:
	@echo "Available targets:"
	@echo "  build       - Build the Docker image"
	@echo "  push        - Push the Docker image to Docker Hub"
	@echo "  build-push  - Build and push the Docker image"
	@echo "  login       - Login to Docker Hub"
	@echo "  clean       - Remove local Docker images"
	@echo ""
	@echo "Variables (can be overridden):"
	@echo "  DOCKER_USERNAME = $(DOCKER_USERNAME)"
	@echo "  IMAGE_NAME      = $(IMAGE_NAME)"
	@echo "  TAG             = $(TAG)"
	@echo ""
	@echo "Example usage:"
	@echo "  make build-push DOCKER_USERNAME=myuser TAG=v1.0.0"

# Build the Docker image
.PHONY: build
build:
	@echo "Building Docker image: $(FULL_IMAGE_NAME)"
	docker build -t $(FULL_IMAGE_NAME) .
	@echo "Tagging as latest: $(LATEST_IMAGE_NAME)"
	docker tag $(FULL_IMAGE_NAME) $(LATEST_IMAGE_NAME)
	@echo "Build complete!"

# Login to Docker Hub
.PHONY: login
login:
	@echo "Logging in to Docker Hub..."
	docker login

# Push the Docker image to Docker Hub
.PHONY: push
push:
	@echo "Pushing Docker image: $(FULL_IMAGE_NAME)"
	docker push $(FULL_IMAGE_NAME)
	@echo "Pushing latest tag: $(LATEST_IMAGE_NAME)"
	docker push $(LATEST_IMAGE_NAME)
	@echo "Push complete!"

# Build and push in one command
.PHONY: build-push
build-push: build push
	@echo "Build and push completed successfully!"

# Clean up local Docker images
.PHONY: clean
clean:
	@echo "Removing local Docker images..."
	-docker rmi $(FULL_IMAGE_NAME)
	-docker rmi $(LATEST_IMAGE_NAME)
	@echo "Cleanup complete!"

# Show current configuration
.PHONY: info
info:
	@echo "Current Configuration:"
	@echo "  Docker Username: $(DOCKER_USERNAME)"
	@echo "  Image Name:      $(IMAGE_NAME)"
	@echo "  Tag:             $(TAG)"
	@echo "  Full Image:      $(FULL_IMAGE_NAME)"
	@echo "  Latest Image:    $(LATEST_IMAGE_NAME)"
