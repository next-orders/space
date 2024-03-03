"use client";

import React from "react";
import Image from "next/image";
import { useFormState, useFormStatus } from "react-dom";
import { CreateShopForm } from "@/server/actions";
import { IconArrowRight } from "@tabler/icons-react";
import StaticEggs from "@/../public/static/eggs.png";

const initialState = {
  message: "",
};

export default function InstallPage() {
  const [state, formAction] = useFormState(CreateShopForm, initialState);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  return (
    <div className="w-full h-screen mx-auto flex flex-row justify-center items-center">
      <div>
        <Image
          src={StaticEggs}
          width={StaticEggs.width}
          height={StaticEggs.height}
          alt=""
          className="mx-auto mb-2 w-16 h-16"
        />

        <h1 className="mb-10 text-2xl text-center">
          Hi! Let&apos;s create a Shop.
        </h1>

        <form action={formAction} className="max-w-md">
          <div className="w-full mb-6">
            <div>
              <label
                className="mb-1 mt-5 block text-sm font-medium text-zinc-900"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="peer block w-full rounded-2xl border border-zinc-200 py-2 px-4 text-lg outline-2 placeholder:text-zinc-400"
                id="name"
                type="text"
                name="name"
                placeholder="Your Shop title"
                required
                minLength={2}
                value={name}
                onChange={(event) => setName(event.currentTarget.value)}
              />
            </div>
            <div className="mt-4">
              <label
                className="mb-1 mt-5 block text-sm font-medium text-zinc-900"
                htmlFor="description"
              >
                Description
              </label>
              <input
                className="peer block w-full rounded-2xl border border-zinc-200 py-2 px-4 text-lg outline-2 placeholder:text-zinc-400"
                id="description"
                type="description"
                name="description"
                placeholder="Some info about it"
                value={description}
                onChange={(event) => setDescription(event.currentTarget.value)}
              />
            </div>
          </div>

          <div className="flex flex-row gap-4 justify-center">
            <SubmitButton />
          </div>

          <div className="mt-4 w-full text-center text-red-700">
            {state.message}
          </div>
        </form>
      </div>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-disabled={pending}
      className="px-5 py-3 flex flex-row gap-2 justify-center text-base font-medium cursor-pointer bg-zinc-100 hover:bg-zinc-200 hover:scale-95 duration-200 rounded-2xl"
    >
      Ok, create this one! <IconArrowRight stroke={1.5} />
    </button>
  );
}
