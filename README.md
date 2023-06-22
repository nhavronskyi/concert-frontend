# To start site you need to

### Step 1

Install docker to your OS, you can do it using: https://www.docker.com/products/docker-desktop/

### Step 2

create docker-compose.yml

```yml
services:
  db:
    image: nhavronskyi/concert-database:latest
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=rootroot
    ports:
      - 5432:5432
  backend:
      image: nhavronskyi/concert-backend:latest
      ports:
        - 8080:8080
      links:
            - db
  frontend:
    image: nhavronskyi/concert-frontend:latest
    ports:
      - 3000:3000
    links:
          - backend
```

### Step 3

Run docker compose using terminal:

```bash
root@root:/# docker compose up
```

