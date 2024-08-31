# 🍔 Food Orders
Modern e-commerce self-hosted platform: clients will be happy to order delicious food!

![main-screen-desktop](https://github.com/next-orders/food/blob/main/.github/media/main-screen-desktop.jpg?raw=true)

## 🍕 Main idea and architecture of Next-Orders

There is a great desire to create software that is ideal for ordering and delivering food.
It will be a set of solutions that can work together. It is important that each element can be easily replaced later.
So the project does not become one big monolith.

![next-orders-arch](https://github.com/next-orders/food/blob/main/.github/media/next-orders-arch.png?raw=true)

I'm currently working on first version of the website. Next year there will be a new version that will easily replace the old one as the Main API with business logic will remain the same.

Let's see what happens. Give the project a star ⭐. Offer your ideas and make commits.

## 🥒 Structure

- [Website](https://github.com/next-orders/food/tree/main/apps/storefront-v1): First version of storefront, where client can order delicious food.
- [Main API and SDK](https://github.com/next-orders/food/tree/main/apps/api): All business entities in one spot. Other parts can access data here.
- [Command Center](https://github.com/next-orders/food/tree/main/apps/command-center): Headless CMS designed to build and manage storefronts.

## 🍿 How to develop

You can develop in isolated container with prepared options:

[![Open in Dev Containers](https://img.shields.io/static/v1?label=Dev%20Containers&message=Open&color=blue&logo=visualstudiocode)](https://vscode.dev/redirect?url=vscode://ms-vscode-remote.remote-containers/cloneInVolume?url=https://github.com/next-orders/space)

Clone this repo and use standard commands:

```shell
git clone https://github.com/next-orders/food
npm i
nx dev storefront-v1 # or other nx commands
```

## 🍰 License

This project is licensed under the **MIT License** - see the [**MIT License**](https://github.com/next-orders/food/blob/main/LICENSE) file for details.
