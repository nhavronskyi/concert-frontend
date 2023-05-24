# To start site you need to 
### Step 1
Install docker to your OS, you can do it using: https://www.docker.com/products/docker-desktop/

### Step 2
create docker-compose.yml
```yml
services:
  backend:
    image: nhavronskyi/concert-backend:latest
    ports:
      - 8080:8080
  frontend:
    image: nhavronskyi/concert-frontend:latest
    ports:
      - 3000:3000
```
     
### Step 3
Run docker compose using terminal:
```bash
root@root:/# docker compose up
```
