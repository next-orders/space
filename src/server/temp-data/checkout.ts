import { Checkout } from "@/types";

export const checkout: Checkout = {
  id: "123",
  lines: [
    {
      id: "1",
      quantity: 1,
      variant: {
        id: "12",
        name: "Европейская",
        sku: "1212",
        weight: {
          unit: "г",
          value: 540,
        },
        pricing: {
          onSale: false,
          price: {
            currency: "RUB",
            gross: {
              currency: "RUB",
              amount: 689,
            },
            net: {
              currency: "RUB",
              amount: 689,
            },
            tax: {
              currency: "RUB",
              amount: 0,
            },
          },
        },
        media: [
          {
            id: "12",
            alt: "Фото",
            url: "/static/products/pizza/12.jpeg",
          },
        ],
      },
    },
    {
      id: "2",
      quantity: 1,
      variant: {
        id: "9",
        name: "Биг Чикен",
        sku: "99",
        weight: {
          unit: "г",
          value: 560,
        },
        pricing: {
          onSale: false,
          price: {
            currency: "RUB",
            gross: {
              currency: "RUB",
              amount: 689,
            },
            net: {
              currency: "RUB",
              amount: 689,
            },
            tax: {
              currency: "RUB",
              amount: 0,
            },
          },
        },
        media: [
          {
            id: "9",
            alt: "Фото",
            url: "/static/products/pizza/9.jpeg",
          },
        ],
      },
    },
    {
      id: "3",
      quantity: 1,
      variant: {
        id: "5",
        name: "Суши Угорь",
        sku: "55",
        weight: {
          unit: "г",
          value: 40,
        },
        pricing: {
          onSale: false,
          price: {
            currency: "RUB",
            gross: {
              currency: "RUB",
              amount: 140,
            },
            net: {
              currency: "RUB",
              amount: 140,
            },
            tax: {
              currency: "RUB",
              amount: 0,
            },
          },
        },
        media: [
          {
            id: "5",
            alt: "Фото",
            url: "/static/products/sushi/5.jpeg",
          },
        ],
      },
    },
  ],
};
