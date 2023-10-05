"use server";

export const GetCategories = async () => {
  // Imitate fetching
  await new Promise((resolve) => {
    setTimeout(() => resolve("OK"), 600);
  });

  return [
    {
      id: "1",
      type: "SINGLE",
      label: "Пицца",
      link: "/pizza",
    },
    {
      id: "2",
      type: "SINGLE",
      label: "Суши",
      link: "/sushi",
    },
    {
      id: "3",
      type: "SINGLE",
      label: "Вок",
      link: "/wok",
    },
    {
      id: "4",
      type: "SINGLE",
      label: "Бургеры",
      link: "/burger",
    },
    {
      id: "5",
      type: "SINGLE",
      label: "Десерты",
      link: "/dessert",
    },
    {
      id: "6",
      type: "SINGLE",
      label: "Еще категория",
      link: "#",
    },
    {
      id: "7",
      type: "SINGLE",
      label: "Еще категория",
      link: "#",
    },
    {
      id: "8",
      type: "SINGLE",
      label: "Еще категория",
      link: "#",
    },
    {
      id: "9",
      type: "SINGLE",
      label: "Еще категория",
      link: "#",
    },
    {
      id: "10",
      type: "SINGLE",
      label: "Еще категория",
      link: "#",
    },
    {
      id: "11",
      type: "SINGLE",
      label: "Еще категория",
      link: "#",
    },
    {
      id: "12",
      type: "SINGLE",
      label: "Еще категория",
      link: "#",
    },
    {
      id: "13",
      type: "SINGLE",
      label: "Еще категория",
      link: "#",
    },
    {
      id: "14",
      type: "SINGLE",
      label: "Еще категория",
      link: "#",
    },
    {
      id: "15",
      type: "SINGLE",
      label: "Еще категория",
      link: "#",
    },
    {
      id: "16",
      type: "SINGLE",
      label: "Еще категория",
      link: "#",
    },
  ];
};
