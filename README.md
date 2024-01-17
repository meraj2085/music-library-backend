<p align="center" style="font-size: 20px;">Music Library
<br/> a place to showcase your talest</p>

## Project Setup

Follow these steps to set up and run the project:

1. **Clone the repository:**

    **For Windows:**
    ```bash
    git clone https://github.com/meraj2085/music-library-backend.git
    cd music-library-backend
    ```

    **For macOS:**
    ```bash
    https://github.com/meraj2085/music-library-backend.git
    cd music-library-backend
    ```

2. **Install dependencies using [Yarn](https://yarnpkg.com/):**
    ```bash
    yarn
    ```

3. **Run the project:**
    ```bash
    yarn dev
    ```

Make sure to have Git and Yarn installed globally before running the commands above.


## Credentials

Add .env to run locally

```bash
NODE_ENV=development
PORT=8000
JWT_SECRET='Strong_secret'
JWT_REFRESH_SECRET='Strong_refresh_secret'
JWT_EXPIRES_IN=1d
JWT_REFRESH_EXPIRES_IN=365d

```



## Tech Stack

<div align="left">  
<a href="https://www.typescriptlang.org/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/typescript-original.svg" alt="TypeScript" height="40" /></a>  
<span style="margin: 0 10px;">&nbsp;</span>
<a href="https://www.postgresql.org/" target="_blank"><img src="https://profilinator.rishav.dev/skills-assets/postgresql-original-wordmark.svg" alt="PostgreSQL" height="50" /></a> 
<span style="margin: 0 10px;">&nbsp;</span>
<a href="https://nodejs.org/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/nodejs-original-wordmark.svg" alt="Node.js" height="65" /></a>  
<span style="margin: 0 10px;">&nbsp;</span>
<a href="https://expressjs.com/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/express-original-wordmark.svg" alt="Express.js" height="60" /></a>  
</div>


## Routes

#### Auth

- api/v1/auth/signup (POST)
- api/v1/auth/login (POST)
- api/v1/auth/refresh-token (POST)

#### Artist

- api/v1/artists/ (GET)
- api/v1/artists/:id (GET)
- api/v1/artists/ (PATCH)

<span style="margin: 10 0;">&nbsp;</span>


<p align="center">
  <img src="https://res.cloudinary.com/dn163fium/image/upload/v1705394276/d9v6eifmj3xzryai3p1t.png" alt="ER Diagram" style="max-width: 300px;">
</p>