"use client";

import React from "react";
import { Modal } from "@/components/Modal";
import { useModalStore } from "@/store/modal";
import { Button } from "@/components/Button";
import { useFormState, useFormStatus } from "react-dom";
import { AddProductVariantMediaForm } from "@/server/actions";
import { Input } from "@/components/Input";

const initialState = {
  message: "",
};

type ProductVariantEditMediaModalProps = {
  productVariantId: string;
};

export const ProductVariantEditMediaModal = ({
  productVariantId,
}: ProductVariantEditMediaModalProps) => {
  const toggle = useModalStore((state) => state.toggleEditProductVariantMedia);
  const isOpened = useModalStore(
    (state) => state.isOpenedEditProductVariantMedia,
  );

  const [state, formAction] = useFormState(
    AddProductVariantMediaForm,
    initialState,
  );
  const { pending } = useFormStatus();

  const [mediaId, setMediaId] = React.useState("");

  return (
    <Modal title="Edit Media" toggle={toggle} isOpened={isOpened}>
      <form action={formAction}>
        <div className="w-full text-center text-red-700">{state?.message}</div>

        <input type="hidden" name="productVariantId" value={productVariantId} />

        <div className="mb-4">
          <Input
            name="mediaId"
            label="Media Id"
            placeholder="Media Id"
            isRequired
            value={mediaId}
            onChange={setMediaId}
          />
        </div>

        <div className="mt-6">
          <Button type="submit" isLoading={pending}>
            Add
          </Button>
        </div>
      </form>
    </Modal>
  );
};
