# 🍔 v1: Food Orders
First version of frontend. Products, cart, full ordering process.

![main-screen-desktop](https://github.com/next-orders/v1/blob/main/public/static/main-screen-desktop.jpg?raw=true)

## 🍕 Main idea and architecture of Next-Orders

There is a great desire to create software that is ideal for ordering and delivering food.
It will be a set of solutions that can work together. It is important that each element can be easily replaced later.
So the project does not become one big monolith.

![next-orders-arch](https://github.com/next-orders/v1/blob/main/public/static/next-orders-arch.png?raw=true)

- [Website](https://github.com/next-orders/v1): First version of storefront, where client can order delicious food.
- [Main API and SDK](https://github.com/next-orders/api): All business entities in one spot. Other parts can access data here.
- [Command Center](https://github.com/next-orders/command-center): Headless CMS designed to build and manage storefronts.
- Image Proxy: in future

I'm currently working on first version of the website. Next year there will be a new version that will easily replace the old one as the Main API with business logic will remain the same.

Let's see what happens. Give the project a star ⭐. Offer your ideas and make commits.

## 🥗 Stack

- [Next](https://nextjs.org/): Framework for server-rendered React applications.
- [React](https://reactjs.org/): JavaScript library for building user interfaces.
- [TailwindCSS](https://tailwindcss.com/): Utility-first CSS framework for rapid UI development.
- [Tabler Icons](https://tabler-icons.io/): Free and open source icons.
- [Geist Font](https://vercel.com/font): A typeface made for developers and designers.
- [Sharp](https://sharp.pixelplumbing.com/): High performance Node.js image processing.
- [TypeScript](https://www.typescriptlang.org/): Typed superset of JavaScript that compiles to plain JavaScript.
- [ESlint](https://eslint.org/): JavaScript linter for identifying and reporting code quality issues.
- [Prettier](https://prettier.io/): Opinionated code formatter for maintaining consistent code style.

![lighthouse-score](https://github.com/next-orders/v1/blob/main/public/static/lighthouse.jpg?raw=true)

## 🍣 Customer and Seller Features (WIP)

- 📱 100% adaptive layout
- 🤹 Multi-page structure with priority on fast page loading and SEO
- 🛒 The cart is always in sight on desktop
- 🚚 Possibility to choose delivery or pickup
- 🔍 Quick search in the product catalog
- 🏷️ The client can use a promotional code
- 📈 The best offers and promotions are shown in the desired section
- 🏁 Quick order, without forced registration on the site

## 🥪 Tech Features (WIP)

- Website has its own backend, where API data does not break out
- Most of the code is rendered on the server: less load on the client
- Amazing cache system provided by Next.js: all data can be revalidated and reloaded from API on demand

## 🥒 Structure

- [src/app](src/app): Contains the application-specific logic and pages.
- [src/app/catalog](src/app/catalog): Functionality related to the catalog of products.
- [src/app/website-api](src/app/website-api): API endpoints for internal calls from the main API.
- [src/components](src/components): Reusable UI components.
- [src/server](src/server): Server-side logic for the website.

## ☕ How to deploy

You can use latest Docker Image:

```shell
docker pull ghcr.io/next-orders/v1:main
```

You need to use env variables:

```text
NEXT_PUBLIC_API_URL= # Url of the Main API
NEXT_PUBLIC_SHOP_ID= # Shop ID from DB
NEXT_PUBLIC_CHANNEL_ID= # Channel ID from DB
```

Check **.env.example** in root dir for more info about env.

On Kubernetes you can use health check of container:

```yaml
livenessProbe:
  httpGet:
    port: 3000
    path: /website-api/health
  initialDelaySeconds: 20
  periodSeconds: 30
```

## 🍿 How to develop

Clone this repo and use standard commands:

```shell
git clone https://github.com/next-orders/v1
npm i
npm run dev
```

## 🍰 License

This project is licensed under the **MIT License** - see the [**MIT License**](https://github.com/next-orders/v1/blob/main/LICENSE) file for details.
