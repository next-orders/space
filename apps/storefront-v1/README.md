# 🍔 v1
First version of frontend. Products, cart, full ordering process.

![main-screen-desktop](https://github.com/next-orders/food/blob/main/.github/media/main-screen-desktop.jpg?raw=true)

![checkout-screen-desktop](https://github.com/next-orders/food/blob/main/.github/media/checkout-screen-desktop.jpg?raw=true)

## 🥗 Stack

- [Next](https://nextjs.org/): Framework for server-rendered React applications.
- [React](https://reactjs.org/): JavaScript library for building user interfaces.
- [TailwindCSS](https://tailwindcss.com/): Utility-first CSS framework for rapid UI development.
- [Tabler Icons](https://tabler-icons.io/): Free and open source icons.
- [Sharp](https://sharp.pixelplumbing.com/): High performance Node.js image processing.
- [Zustand](https://github.com/pmndrs/zustand): A small, fast and scalable bearbones state-management solution.
- [TypeScript](https://www.typescriptlang.org/): Typed superset of JavaScript that compiles to plain JavaScript.
- [ESlint](https://eslint.org/): JavaScript linter for identifying and reporting code quality issues.
- [Prettier](https://prettier.io/): Opinionated code formatter for maintaining consistent code style.

![lighthouse-score](https://github.com/next-orders/food/blob/main/.github/media/lighthouse.jpg?raw=true)

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
- [src/app/website-api](src/app/website-api): API endpoints for internal calls from the Main API.
- [src/components](src/components): Reusable UI components.
- [src/store](src/store): Client-side state of the app.
- [src/client](src/client): Wrapper functions for Main API SDK and helper functions.
- [src/server](src/server): Next.js Server Actions with data revalidation.
- [src/dictionaries](src/dictionaries): Localization for the UI with TypeScript protection.

## ☕ How to deploy

You can use latest Docker Image:

```shell
docker pull ghcr.io/next-orders/food/storefront-v1:latest

# or use the specific version
docker pull ghcr.io/next-orders/food/storefront-v1:v0.1.0
```

You need to use env variables:

```text
NEXT_PUBLIC_API_URL= # Url of the Main API
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
git clone https://github.com/next-orders/food
npm i
nx dev storefront-v1
```

## 🍰 License

This project is licensed under the **MIT License** - see the [**MIT License**](https://github.com/next-orders/food/blob/main/LICENSE) file for details.
