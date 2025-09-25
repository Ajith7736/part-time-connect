# PartTime-Connect

[![Live Demo](https://img.shields.io/badge/Live-Demo-Click-Here-blue)](https://part-time-connect.vercel.app)  
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## Table of Contents

- [About](#about)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Screenshots](#screenshots)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation](#installation)  
  - [Environment Variables](#environment-variables)  
  - [Running Locally](#running-locally)  
- [Folder Structure](#folder-structure)  
- [Usage](#usage)  
- [Roadmap / Future Enhancements](#roadmap)  
- [Contributing](#contributing)  
- [License](#license)

---

## About

PartTime-Connect is a full-stack **MERN** (MongoDB, Express.js, React.js, Node.js) web application designed to connect students with part-time job opportunities. Employers (companies) can post and manage job listings. Students can apply, filter jobs, track applications, etc.

---

## Features

Here are some of the things this app can do:

- 📋 User authentication / authorization (Student / Employer roles)  
- ➕ Post / edit / delete job listings (by employers)  
- 🔍 Filter and search jobs (by time, location)  
- 📨 Students can apply to jobs, track their application status  
- 📊 Employer dashboard to view applicants  
- 🔒 Secure REST APIs for backend  
- ✨ Responsive UI  

---

## Tech Stack

- **Frontend**: React.js , Tailwind CSS ,Redux ,React Router.
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (Mongoose for schema/models)  
- **Authentication**: JWT  
- **Hosting / Deployment**: Frontend on Vercel / Backend on Render

---

## Screenshots

*(Include some images of your app, e.g., homepage, dashboard, job listing, etc.)*

![Home Page](screenshots/home.png)  
![Employer Dashboard](screenshots/employer-dashboard.png)  
![Job Listing](screenshots/job-listing.png)  

---

## Getting Started

### Prerequisites

Make sure you have:

- Node.js (version 20+)  
- npm or yarn  
- MongoDB connection (local or cloud)  

### Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/Ajith7736/part-time-connect.git
   cd part-time-connect

### Environment Variables

To run this project, you will need to add the following environment variables  
to your `.env` file in the `backend` folder:

- `MONGO_URI` → MongoDB connection string  
- `JWT_SECRET` → Secret key for JWT authentication  
- `PORT` → Port number
- `USER_EMAIL` → Admin email from which the otp will be sent
- `UsSER_PASS` → Password for the use of email