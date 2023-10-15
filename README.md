# v1: Food Orders 🍕🍣🥗🍰
First version of frontend. Products, cart, full ordering process.

![main-screen-desktop](https://v1.next-orders.org/static/main-screen-desktop.jpg)

## Main idea and architecture of Next-Orders

There is a great desire to create software that is ideal for ordering and delivering food.
It will be a set of solutions that can work together. It is important that each element can be easily replaced later.
So the project does not become one big monolith.

![next-orders-arch](https://v1.next-orders.org/static/next-orders-arch.png)

- Website: this repo
- Main API and SDK: https://github.com/next-orders/api
- Command Center: https://github.com/next-orders/command-center
- Image Proxy: it will be

I'm currently working on first version of the website. Next year there will be a new version that will easily replace the old one as the Main API with business logic will remain the same.

Let's see what happens. Give the project a star ⭐. Offer your ideas and make commits.

## Frontend Stack

- React
- Next.js
- TailwindCSS
- Mantine components
- TypeScript

## Customer and Seller Features (WIP)

- 📱 100% adaptive layout
- 🤹 Multi-page structure with priority on speed load and SEO
- 🛒 The cart is always in sight on desktop
- 🚚 Possibility to choose delivery or pickup
- 🔍 Quick search in the product catalog
- 🏷️ The client can use a promotional code
- 📈 The best offers and promotions are shown in the desired section
- 🏁 Quick order, without forced registration on the site

## Tech Features (WIP)

- Website has its own backend, where API data does not break out
- Most of the code is rendered on the server: less load on the client
- Amazing cache system provided by Next.js: all data can be revalidated and reloaded from API on demand

## How to deploy

You can use latest Docker Image:

```shell
docker pull ghcr.io/next-orders/v1:main
```

You need to use env variables:

```text
API_URL: url of the main API
API_PRIVATE_TOKEN: bearer token, which give access to API endpoints
```

Work in progress. Check **.env.example** in root dir for more info about env.

On Kubernetes you can use health check of container:

```yaml
livenessProbe:
  httpGet:
    port: 3000
    path: /website-api/health
  initialDelaySeconds: 20
  periodSeconds: 30
```

## How to develop

Clone this repo and use standard commands:

```shell
npm i
npm run dev
```
