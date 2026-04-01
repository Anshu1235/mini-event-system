# Mini Event Management System

## Features
- Create events
- Book tickets (with transaction safety)
- Track attendance
- User booking history

## Tech Stack
- Node.js
- Express.js
- MySQL

## Setup

### 1. Clone repo
git clone <your-repo-link>

### 2. Install dependencies
npm install

### 3. Setup DB
Run SQL schema provided

### 4. Add .env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=event_system

### 5. Run server
npm run dev

## API Endpoints
- GET /events
- POST /events
- POST /bookings
- GET /users/:id/bookings
- POST /events/:id/attendance