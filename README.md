# Typescript, Prisma, Node JS Application with PostgreSQL DataBase for travel buddy management application.

Live Site Link: [https://travel-buddy-getmonirr.vercel.app/](https://travel-buddy-getmonirr.vercel.app/)

## Project Overview

This project is a Node.js Express application written in TypeScript that integrates PostgreSQL with Prisma ORM for Travel buddy management Applications. This is a backend server. This server is responsible for the management of Travel Buddy. In this server, the User can create a trip and send a response to the particular trip. there is a powerful search and filtering functionality to get the specific trip with various parameters like budget, start date, end date, destination, etc. The most important part is it is very secure with JWT.

## Setup

### Prerequisites

- Node.js installed on your machine
- Prisma installed and running
- PostgreSQL installed and running (for local)
- yarn installed on your machine

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Porgramming-Hero-web-course/l2-b2-fullstack-track-assignment-8-getMonirr.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd l2-b2-fullstack-track-assignment-8-getMonirr
   ```

3. **Install dependencies:**

   ```bash
   yarn install
   ```

4. **Create a .env file in the root directory and add the following:**

   ```bash
   DATABASE_URL=<your-PostgreSQL-url>
   PORT=4000
   ```

   Replace "your-PostgreSQL-url" with the connection URI for your PostgreSQL database.

### Running the Application

1. **Build the TypeScript code:**

   ```bash
   yarn build
   ```

2. **Start the server:**

   ```bash
   yarn dev
   ```

   The application will be running at http://localhost:4000.



