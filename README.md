# Angular + ASP.NET Identity JWT Practice

This project intended for learning and experimenting with authentication using Angular and ASP.NET Core Identity with JWT. It is not intended for production use.

- Authenticate users with ASP.NET Core Identity
- Generate and validate JWT access tokens
- Consume protected API endpoints from an Angular application
- 
![ASP-Angular Authentication Preview](https://github.com/amireasadi/Angular-Asp-identity-jwt-practice/blob/main/AuthECClient/src/assets/asp-angular-auth-img-preview.jpeg?raw=true)

## Tech Stack

- ASP.NET Core
- ASP.NET Core Identity
- JWT Authentication
- Angular
- Entity Framework Core

## Getting Started

### Prerequisites

- .NET SDK
- Node.js (LTS)
- Angular CLI

Install Angular CLI if you don't already have it:

```bash
npm install -g @angular/cli
```

## Run the Backend

Navigate to the API project:

```bash
cd AuthECAPI/AuthECAPI/
```

Restore dependencies:

```bash
dotnet restore
```

Run the API:

```bash
dotnet run
```

The API will start on the URL shown in the terminal (typically `https://localhost:xxxx`).

## Run the Frontend

Navigate to the Angular project:

```bash
cd AuthECClient
```

Install dependencies:

```bash
npm install
```

Start the Angular development server:

```bash
ng serve
```

Open your browser and visit:

```
http://localhost:4200
```

## Features

- User registration
- User login
- JWT authentication
- Protected API endpoints
- Angular HTTP authentication integration
