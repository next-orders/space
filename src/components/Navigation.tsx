import {
  IconClock,
  IconLink,
  IconMilk,
  IconTruckDelivery,
} from "@tabler/icons-react";

const navigation = [
  {
    id: "1",
    title: "First category",
  },
  {
    id: "2",
    title: "Second category",
  },
  {
    id: "3",
    title: "Third category",
  },
  {
    id: "4",
    title: "4-th category",
  },
  {
    id: "5",
    title: "5-th category",
  },
  {
    id: "6",
    title: "6-th category",
  },
  {
    id: "7",
    title: "7-th category",
  },
  {
    id: "8",
    title: "8-th category",
  },
  {
    id: "9",
    title: "9-th category",
  },
  {
    id: "10",
    title: "10-th category",
  },
  {
    id: "11",
    title: "11-th category",
  },
  {
    id: "12",
    title: "12-th category",
  },
  {
    id: "13",
    title: "13-th category",
  },
  {
    id: "14",
    title: "14-th category",
  },
  {
    id: "15",
    title: "15-th category",
  },
  {
    id: "16",
    title: "16-th category",
  },
];

export const Navigation = () => {
  const items = navigation.map((item) => (
    <li
      key={item.id}
      className="flex flex-row gap-2 items-center rounded-xl px-4 py-4 cursor-pointer hover:bg-zinc-200"
    >
      <IconMilk stroke={1.5} className="w-8 h-8" />
      {item.title}
    </li>
  ));

  return (
    <aside className="col-span-0 lg:col-span-2 hidden lg:block h-screen px-4">
      <div className="mb-8">
        <p className="font-semibold text-lg mb-2">Delivery</p>

        <div className="flex flex-row gap-2 items-center mb-2">
          <IconClock stroke={1.5} /> from 08:00
        </div>

        <div className="flex flex-row gap-2 items-center mb-2">
          <IconTruckDelivery stroke={1.5} /> free from 15$
        </div>

        <div className="flex flex-row gap-2 items-center">
          <IconLink stroke={1.5} /> find out details
        </div>
      </div>

      <div>
        <p className="font-semibold text-lg">Catalog</p>
        <ul>{items}</ul>
      </div>
    </aside>
  );
};
