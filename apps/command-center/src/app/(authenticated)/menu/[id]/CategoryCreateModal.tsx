'use client';

import React from 'react';
import slugify from 'slug';
import { Modal } from '../../../../components/Modal';
import { useModalStore } from '../../../../store/modal';
import { useFormState, useFormStatus } from 'react-dom';
import { CreateMenuCategoryForm } from '../../../../server/actions';
import { Input } from '../../../../components/Input';
import { getDictionary, Locale } from '../../../../dictionaries';
import { Button } from '@next-orders/ui';

const initialState = {
  message: '',
};

type CategoryCreateModalProps = {
  menuId: string;
  locale: Locale;
};

export const CategoryCreateModal = ({
  menuId,
  locale,
}: CategoryCreateModalProps) => {
  const toggle = useModalStore((state) => state.toggleCreateMenuCategory);
  const isOpened = useModalStore((state) => state.isOpenedCreateMenuCategory);

  const {
    CREATE_MENU_CATEGORY_LABEL,
    NAME_LABEL,
    SLUG_LABEL,
    SLUG_PLACEHOLDER,
  } = getDictionary(locale);

  const [state, formAction] = useFormState(
    CreateMenuCategoryForm,
    initialState,
  );

  const [name, setName] = React.useState('');
  const [slug, setSlug] = React.useState('');

  // Lets generate slug on Name change
  const handleNameChange = (value: string) => {
    setName(value);
    setSlug(slugify(value));
  };

  return (
    <Modal
      title={CREATE_MENU_CATEGORY_LABEL}
      toggle={toggle}
      isOpened={isOpened}
    >
      <form action={formAction}>
        <div className="w-full text-center text-red-700">{state?.message}</div>

        <input type="hidden" name="menuId" value={menuId} />

        <div className="mb-4">
          <Input
            name="name"
            label={NAME_LABEL}
            isRequired
            value={name}
            onChange={handleNameChange}
          />
        </div>

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
    <Button type="submit" size="lg" className="w-full" disabled={pending}>
      {CREATE_BUTTON}
    </Button>
  );
};
