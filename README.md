# Full-Stack Go + Next.js Dashboard

A modern, professional dashboard application built with a Go (Echo) backend, a Next.js frontend, and a PostgreSQL database. This project demonstrates a complete full-stack workflow, from local development with Docker to production deployment on Render and Vercel.

### ✨ Live Demo [**Dashboard**](https://next-go-dashboard.vercel.app/) 


### 📸 Screenshot

![Dashboard Screenshot 1](https://github.com/Divyamsirswal/next-go-dashboard/blob/main/public/s1.png?raw=true)
![Dashboard Screenshot 2](https://github.com/Divyamsirswal/next-go-dashboard/blob/main/public/s2.png?raw=true)



### 🚀 Features

* **Go Backend API**: A robust API built with the high-performance Echo framework.
* **PostgreSQL Database**: Data persistence for notes, managed with GORM.
* **Next.js Frontend**: A beautiful and responsive UI built with the latest React features and Framer Motion.
* **Dynamic Dashboard**: View all notes in a clean, filterable table and visualize data with charts.
* **Professional UI/UX**: Includes a command menu (`Cmd+K`), toast notifications, and animated skeleton loaders.
* **Containerized Development**: Uses Docker for a consistent local PostgreSQL environment.
* **Production Ready**: Deployed with a modern CI/CD workflow.

### 🛠️ Tech Stack

![Go](https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white) ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white) ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white) ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white) ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

### 📦 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

#### Prerequisites

* [Go](https://go.dev/doc/install) (version 1.18 or higher)
* [Node.js](https://nodejs.org/en/) (version 18 or higher)
* [Docker](https://www.docker.com/products/docker-desktop/) and Docker Compose

#### 1. Clone the Repository

```bash
git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
cd fullstack-dashboard
````

#### 2\. Backend Setup

The backend runs on `http://localhost:8080`.

1.  **Start the Database:** From the root `fullstack-dashboard` directory, start the local Postgres container:
    ```bash
    docker-compose up -d
    ```
2.  **Configure Environment:** Navigate to the backend directory and create a `.env` file.
    ```bash
    cd backend
    touch .env
    ```
    Paste the following into `backend/.env`:
    ```env
    DATABASE_URL="host=localhost user=myuser password=mypassword dbname=notes_db port=5432 sslmode=disable"
    ```
3.  **Run the Server:**
    ```bash
    # Install Go dependencies
    go mod tidy
    # Run the Go server
    go run main.go
    ```

#### 3\. Frontend Setup

The frontend runs on `http://localhost:3000`.

1.  **Open a new terminal window.**
2.  **Navigate and Install:**
    ```bash
    cd frontend
    npm install
    ```
3.  **Run the Development Server:**
    ```bash
    npm run dev
    ```

### ☁️ Deployment

This project is deployed using a modern, decoupled architecture:

  * **Database**: The PostgreSQL database is hosted on **Supabase**.
  * **Backend**: The Go API is deployed as a Web Service on **Render**, configured with a `backend` root directory.
  * **Frontend**: The Next.js application is deployed on **Vercel**, connected to the live Render API via the `NEXT_PUBLIC_API_URL` environment variable.

Continuous deployment is enabled, meaning any push to the `main` branch on GitHub will automatically trigger new builds on Render and Vercel.

### 📁 Project Structure

The project is organized as a monorepo with two distinct applications:

```
fullstack-dashboard/
├── backend/            # Contains the Go (Echo) API
├── frontend/           # Contains the Next.js application
├── docker-compose.yml  # Defines the local Postgres service
└── README.md
```