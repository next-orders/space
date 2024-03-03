"use client";

import React from "react";
import { Modal } from "@/components/Modal";
import { useModalStore } from "@/store/modal";
import { Button } from "@/components/Button";
import { useFormState, useFormStatus } from "react-dom";
import { CreateChannelForm } from "@/server/actions";
import { Input } from "@/components/Input";
import { getDictionary, Locale } from "@/dictionaries";
import { Select } from "@/components/Select";

const initialState = {
  message: "",
};

type ChannelCreateModalProps = {
  locale: Locale;
};

export const ChannelCreateModal = ({ locale }: ChannelCreateModalProps) => {
  const toggle = useModalStore((state) => state.toggleCreateChannel);
  const isOpened = useModalStore((state) => state.isOpenedCreateChannel);

  const {
    CREATE_CHANNEL_LABEL,
    SLUG_LABEL,
    SLUG_PLACEHOLDER,
    NAME_LABEL,
    DESCRIPTION_LABEL,
    CURRENCY_LABEL,
    LANGUAGE_LABEL,
    COUNTRY_LABEL,
  } = getDictionary(locale);

  const [state, formAction] = useFormState(CreateChannelForm, initialState);

  const [slug, setSlug] = React.useState("");
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [currencyCode, setCurrencyCode] = React.useState("");
  const [languageCode, setLanguageCode] = React.useState("");
  const [countryCode, setCountryCode] = React.useState("");

  return (
    <Modal title={CREATE_CHANNEL_LABEL} toggle={toggle} isOpened={isOpened}>
      <form action={formAction}>
        <div className="w-full text-center text-red-700">{state?.message}</div>

        <div className="mb-4">
          <Input
            name="slug"
            label={SLUG_LABEL}
            placeholder={SLUG_PLACEHOLDER}
            isRequired
            value={slug}
            onChange={setSlug}
          />
        </div>

        <div className="mb-4">
          <Input
            name="name"
            label={NAME_LABEL}
            isRequired
            value={name}
            onChange={setName}
          />
        </div>

        <div className="mb-4">
          <Input
            name="description"
            label={DESCRIPTION_LABEL}
            isRequired={false}
            value={description}
            onChange={setDescription}
          />
        </div>

        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <Select
              name="currencyCode"
              label={CURRENCY_LABEL}
              isRequired
              defaultValue={currencyCode}
              onChange={setCurrencyCode}
              locale={locale}
              options={[
                { value: "USD", label: "USD" },
                { value: "EUR", label: "EUR" },
                { value: "RUB", label: "RUB" },
              ]}
            />
          </div>
          <div>
            <Select
              name="languageCode"
              label={LANGUAGE_LABEL}
              isRequired
              defaultValue={languageCode}
              onChange={setLanguageCode}
              locale={locale}
              options={[
                { value: "EN", label: "EN" },
                { value: "ES", label: "ES" },
                { value: "RU", label: "RU" },
              ]}
            />
          </div>
          <div>
            <Select
              name="countryCode"
              label={COUNTRY_LABEL}
              isRequired
              defaultValue={countryCode}
              onChange={setCountryCode}
              locale={locale}
              options={[
                { value: "US", label: "US" },
                { value: "GB", label: "GB" },
                { value: "ES", label: "ES" },
                { value: "MX", label: "MX" },
                { value: "RU", label: "RU" },
              ]}
            />
          </div>
        </div>

        <div className="mt-6">
          <SubmitBlock locale={locale} />
        </div>
      </form>
    </Modal>
  );
};

const SubmitBlock = ({ locale }: { locale: Locale }) => {
  const { CREATE_BUTTON } = getDictionary(locale);
  const { pending } = useFormStatus();

  return (
    <Button type="submit" isLoading={pending}>
      {CREATE_BUTTON}
    </Button>
  );
};
