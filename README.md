# 🍔 Food Orders
Modern e-commerce self-hosted platform: clients will be happy to order delicious food!

👉 [Check out demo website](https://demo.nextorders.space/)

🎯 [Admin panel](https://demo.nextorders.space/command-center). Use **demo** as login and password. Read mode only.

![main-screen-desktop](https://github.com/next-orders/space/blob/main/.github/media/main-screen-desktop.jpg?raw=true)

## 🍕 Main idea and architecture of Next-Orders

There is a great desire to create software that is ideal for ordering and delivering food.
It will be a set of solutions that can work together. It is important that each element can be easily replaced later.
So the project does not become one big monolith.

![next-orders-arch](https://github.com/next-orders/space/blob/main/.github/media/next-orders-arch.png?raw=true)

I'm currently working on the first version of the website. Next year there will be a new version that will easily replace the old one as the Main API with business logic will remain the same.

Let's see what happens. Give the project a star ⭐. Offer your ideas and make commits.

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

## 🌎 Locales

The application has [several localizations](https://github.com/next-orders/space/tree/main/apps/food/app/locales):

- en | English
- ru | Russian | Русский
- ka | Georgian | ქართული

## 🥒 Structure

- [Food e-commerce](https://github.com/next-orders/space/tree/main/apps/food): Storefront and Command Center. Client can order delicious food.
- [NextOrders Website](https://github.com/next-orders/space/tree/main/apps/website): Documentation

## ☕ How to deploy

⚠️ Warn: work in progress. Be careful with updates! Your images and DB data are at risk.

You can deploy @next-orders/food on your server (1GB+ RAM) by this:

```shell
# Connect over SSH and use with args: version, locale, your domain, your email
curl -fsSL https://nextorders.space/food/install.sh | bash -s -- "v0.6.0" "en" "test.nextorders.space" "resolve@nextorders.space"

# It will install Docker, Docker Compose and download latest docker-compose.yaml
# After, it will bring up Traefik to serve web requests, create and autoupdate SSL certificate
# Food app, DB, migrations... You are ready to check your domain!
```

Also, you can use single Docker Image to create container:

```shell
# Use the specific version
docker pull ghcr.io/next-orders/food:v0.6.0

# Warn: you need an external PostgreSQL as DB
```

Check [**.env.example**](https://github.com/next-orders/space/tree/main/apps/food/.env.example) for more info about required config variables.

## 🍿 How to develop

You can develop in isolated container with prepared options:

[![Open in Dev Containers](https://img.shields.io/static/v1?label=Dev%20Containers&message=Open&color=blue&logo=visualstudiocode)](https://vscode.dev/redirect?url=vscode://ms-vscode-remote.remote-containers/cloneInVolume?url=https://github.com/next-orders/space)

Make a fork. Or clone this repo and use standard commands:

```shell
git clone https://github.com/next-orders/space
pnpm i
pnpm dev:food
```

## 🍰 License

This project is licensed under the **MIT License** - see the [**MIT License**](https://github.com/next-orders/space/blob/main/LICENSE) file for details.
