# Enigma Application with Docker Compose


# Appendix A: Configuration Files

## A.1 Docker-Compose

```yml
version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.frontend
    ports:
      - "80:80"
    volumes:
      - ./frontend/public:/var/www/html
      - ./frontend/vhost.conf:/etc/apache2/sites-available/000-default.conf
    restart: unless-stopped
    command: ["apachectl", "-D", "FOREGROUND"]

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile.backend
    ports:
      - "3000:3000"
    volumes:
      - ./backend:/app
      - /app/node_modules
    restart: unless-stopped
    command: ["npm", "start"]
```

