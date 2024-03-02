# API
Frontend needs data from backend: categories, products, checkouts, etc.

![next-orders-entities](https://github.com/next-orders/food/blob/main/.github/media/next-orders-entities.png?raw=true)

## Stack

- Node.js
- NestJS
- Express
- Prisma ORM
- TypeScript
- PostgreSQL as DB

## How to develop

Clone this repo and use standard commands:

```shell
npm i
nx serve api
```

One moment: default port is 4001

## How to test

```shell
# Unit tests
nx test api

# End-to-end tests
nx test api-e2e
```

## How to deploy

You can use latest Docker Image:

```shell
docker pull ghcr.io/next-orders/food/api:latest

# or use the specific version
docker pull ghcr.io/next-orders/food/api:v0.1.0
```

You need to use env variables:

```text
API_URL= # URL of this Main API
DATABASE_URL= # PostgreSQL connection URL for Prisma
```

Check **.env.example** in root dir for more info about env.

On Kubernetes you can use health check of container:

```yaml
livenessProbe:
  httpGet:
    port: 4001
    path: /api/health
  initialDelaySeconds: 20
  periodSeconds: 30
```

## License

This project is licensed under the **MIT License** - see the [**MIT License**](https://github.com/next-orders/food/blob/main/LICENSE) file for details.
