"use client";

import React from "react";
import { IconChefHat, IconSquareRoundedCheckFilled } from "@tabler/icons-react";
import { useModalStore } from "@/store/modal";
import { Button } from "@/components/Button";
import { EntityModal } from "@/components/EntityModal";
import { Product } from "@next-orders/api-sdk";
import { getDictionary, Locale } from "@/dictionaries";

type ProductChooseModalProps = {
  locale: Locale;
  products: Product[] | null;
  selected: string;
  // eslint-disable-next-line no-unused-vars
  setSelected: (value: string) => void;
};

export const ProductChooseModal = ({
  locale,
  products,
  selected,
  setSelected,
}: ProductChooseModalProps) => {
  const toggle = useModalStore((state) => state.toggleChooseProduct);
  const isOpened = useModalStore((state) => state.isOpenedChooseProduct);

  const { FIND_BY_NAME_PLACEHOLDER, CHOOSE_BUTTON, CHOOSE_A_PRODUCT_LABEL } =
    getDictionary(locale);

  const [find, setFind] = React.useState("");

  const showProducts = products
    ?.filter(
      (product) => product.type === "PRODUCTION" || product.type === "READY",
    )
    ?.filter((product) =>
      product.name.toLowerCase().includes(find.toLowerCase()),
    )
    ?.map((product) => {
      const isSelected = selected === product.id;

      return (
        <ProductChooseCard
          key={product.id}
          product={product}
          isSelected={isSelected}
          setSelected={setSelected}
        />
      );
    })
    .slice(0, 16);

  return (
    <EntityModal
      title={CHOOSE_A_PRODUCT_LABEL}
      toggle={toggle}
      isOpened={isOpened}
    >
      <input
        type="text"
        placeholder={FIND_BY_NAME_PLACEHOLDER}
        value={find}
        onWheel={(event) => event.currentTarget.blur()}
        onChange={(event) => setFind(event.currentTarget.value)}
        className="peer block w-full rounded-2xl border border-zinc-200 py-3 px-4 text-base outline-2 outline-offset-1 outline-zinc-500 placeholder:text-zinc-400"
      />

      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2">
        {showProducts}
      </div>

      <div className="mt-6">
        <Button onClick={toggle}>{CHOOSE_BUTTON}</Button>
      </div>
    </EntityModal>
  );
};

type ProductChooseCardProps = {
  product: Product;
  isSelected: boolean;
  // eslint-disable-next-line no-unused-vars
  setSelected: (value: string) => void;
};

const ProductChooseCard = ({
  product,
  isSelected,
  setSelected,
}: ProductChooseCardProps) => {
  return (
    <div
      className="relative px-4 py-4 bg-zinc-50 rounded-2xl cursor-pointer hover:scale-95 active:scale-90 duration-200 group border-4 border-transparent data-[active=true]:border-teal-500"
      data-active={isSelected}
      onClick={() => setSelected(product.id)}
    >
      <IconSquareRoundedCheckFilled
        stroke={1.5}
        className="z-10 w-8 h-8 absolute hidden top-2 left-2 text-teal-500 group-data-[active=true]:block"
      />

      <div className="mb-2 px-4 py-4 bg-white rounded-2xl group-hover:scale-105 duration-200">
        <IconChefHat
          stroke={1.5}
          className="mx-auto mb-2 w-12 h-12 text-zinc-400"
        />
      </div>

      <div className="text-center text-base font-medium line-clamp-2 leading-tight">
        {product.name}
      </div>
    </div>
  );
};
