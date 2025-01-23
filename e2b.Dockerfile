# You can use most Debian-based base images
FROM node:21-slim

# Install curl, git and other necessary dependencies
RUN apt-get update && apt-get install -y curl git vim && apt-get clean && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /home/user

# Copy the entire current directory first
COPY . /home/user

COPY compile_page.sh /compile_page.sh
RUN chmod +x /compile_page.sh

# Install bun globally
RUN npm install -g bun

RUN cd /home/user/.temp && bun install

# Set final working directory back to root
WORKDIR /home/user

# Expose port 5173 for the Vite development server
EXPOSE 5173

# Start the Vite development server using the compile script
CMD ["/compile_page.sh"]
