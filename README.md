# 🏬 SuperSell Server

#### SuperSell is a marketplace inspired by eBay and Aliexpress where users can sell, buy, create their own store, add reviews to products, create wishlists and shopping carts. Supersell Server is a REST API created with Node.js, Nest.js, Prisma, PostgreSQL and Docker.

- [Table of Content](#table-of-content)
- [Non-Functional Requirements](#non-func-features)
- [Functional Requirements](#func-features)
- [How To Run](#how-to-run)
    - [Requirements](#requirements)
    - [Running SuperSell Server](#rodando-o-matricula-instituicao)
- [Tests](#tests)

### Non-Functional Requirements

- [x] Seeder feature to populate database.
- [x] Docker container for the database.
- [x] Docker container for the application.
- [x] Create Github documentation.
- [ ] Create Swagger REST API documentation.
- [ ] Security configuration: SQL Injection, XSS Protection, Security Headers, Rate limiting, HPP & CORS etc.
- [ ] Unit and integration tests.
- [ ] Server configuration: Nginx, SSL, Domain, PM2 etc.
- [ ] Basic CI/CD and Github Actions pipeline.
- [ ] Deployed to an Amazon AWS EC2 instance.
- [ ] AWS S3 to store static files.

### Functional Requirements
[Requirements documentation](docs/requirements.md)

### Requirements

Before you start, you should have installed in your machine the following tools:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/) and [Docker](https://www.docker.com/). Preferably Node.js version >= v16.13.
To edit the code you can use a code editor like [VSCode](https://code.visualstudio.com/).

### 🔥 Running SuperSell Server

- Clone this repository
```bash
git clone git@github.com:augustojs1/supersell-server.git
```

- Cd into the project directory
```bash
cd supersell-server
```

- Create a new .env file
```bash
touch .env
```

- Fill in the keys in .env with values
```bash
# Database
# Dev
DATABASE_URL=
```

- Create new development.env environment variable file inside the configuration folder
```bash
touch config/env/development.env
```

- Fill in the keys in development.env with values
```bash
# Port
PORT=

# Database
DATABASE_URL=

# JWT
JWT_SECRET=
JWT_EXPIRES_IN=
```

- Install the project dependencies
```bash
npm install
```

- Start the Docker container
```bash
docker-compose up -d
```
- Push the tables to database
```bash
npx prisma db push
```

- Seed the database
```bash
npx prisma db seed
```

- Run the project
```bash
npm run start:dev
```
- Project runs locally on: http://localhost:${PORT}

### 👨‍🔬 Tests
- Run the application tests
```bash
npm run test
```
