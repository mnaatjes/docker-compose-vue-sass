# Enigma Application with Docker Compose


# 1. Overview and Directory Structure

This project uses Docker Compose to create a simple full-stack application with a Vue.js frontend and an Express.js backend.

## 1.1 Project Structure

The project is divided into two main services:

* **Frontend:** A Vue.js application served by an Apache web server. It is configured to handle client-side routing and proxy API requests to the backend.

* **Backend:** A Node.js application using the Express.js framework. It serves as a simple API to provide data to the frontend.

* **Directories:**
```
.
├── backend/
│   ├── Dockerfile.backend
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── Dockerfile.frontend
│   ├── package.json
│   ├── public/
│   │   ├── index.html
│   │   └── style.scss
│   ├── src/
│   │   ├── components/
│   │   ├── App.vue
│   │   └── main.js
│   └── vhost.conf
├── docker-compose.yml
└── README.md
```

## 1.2 Getting Started

To run this application, you must have Docker and Docker Compose installed on your system.

* **Build and Run the Containers**
    From the root directory of the project, run the following command to build the Docker images and start the services:

    ```bash
    docker-compose up --build
    ```

* **Access the Application**
    Once the services are up and running, you can access the frontend application by navigating to `http://localhost:80` in your web browser.

* **Access the Backend API**
    The backend API is exposed at `http://localhost:3000`, and the `/api` route is proxied from the frontend. You can test the API directly by visiting `http://localhost/api/message`.

## 1.3 Service Breakdown

### 1.3.1 Frontend

-   **Dockerfile.frontend:** Builds the Vue.js application in a multi-stage build, first installing dependencies and compiling the source code, and then serving the built files with an Apache web server.

-   **vhost.conf:** The Apache virtual host configuration file. It sets up the document root, enables `mod_rewrite` for Vue Router, and proxies requests with the `/api` prefix to the backend service.

-   **package.json:** Contains the project's dependencies, including Vue, Sass, and the Vue CLI service.

### 1.3.2 Backend

-   **Dockerfile.backend:** A simple Dockerfile that uses a Node.js image to install dependencies and run the server.

-   **server.js:** The main Express.js application file that defines a single API endpoint, `/api/message`, which returns a JSON object.

-   **package.json:** Lists the `express` dependency and defines the `start` script to run the server.





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

