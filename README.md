# v1: Food Orders
First version of frontend. Products, cart, full ordering process.

![main-screen-desktop](https://v1.next-orders.org/static/main-screen-desktop.jpg)

## Stack

- React
- Next.js
- TailwindCSS
- Mantine components
- TypeScript

## Customer and Seller Features (WIP)

- 📱 100% adaptive layout
- 🤹 Multi-page site structure with priority on SEO
- 🛒 The cart is always in sight on desktop
- 🚚 Possibility to choose delivery or pickup
- 🔍 Quick search in the product catalog
- 🏷️ The client can use a promotional code
- 📈 The best offers and promotions are shown in the desired section
- 🏁 Quick order, without forced registration on the site

## Tech Features (WIP)

- Website has its own backend, where business logic does not break out
- Most of the code is rendered on the server: less load on the client

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

## How to develop

Clone this repo and use standard commands:

```shell
npm i
npm run dev
```
