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

I'm currently working on first version of the website. Next year there will be a new version that will easily replace the old one as the Main API with business logic will remain the same.

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

## 🥒 Structure

- [Food e-commerce](https://github.com/next-orders/space/tree/main/apps/food): Storefront and Command Center. Client can order delicious food.
- [NextOrders Website](https://github.com/next-orders/space/tree/main/apps/website): Documentation and SaaS

## ☕ How to deploy

You can use Docker Image:

```shell
# use the specific version
docker pull ghcr.io/next-orders/food:v0.6.0
```

Check **.env.example** for more info about required config variables.

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
