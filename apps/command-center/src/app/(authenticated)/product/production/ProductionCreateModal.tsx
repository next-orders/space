'use client';

import React from 'react';
import { Modal } from '../../../../components/Modal';
import { useFormState, useFormStatus } from 'react-dom';
import { CreateProductionForm } from '../../../../server/actions';
import { useModalStore } from '../../../../store/modal';
import { Input } from '../../../../components/Input';
import { getDictionary, Locale } from '../../../../dictionaries';
import { Button } from '@next-orders/ui';

const initialState = {
  message: '',
};

type ProductionCreateModalProps = {
  locale: Locale;
};

export const ProductionCreateModal = ({
  locale,
}: ProductionCreateModalProps) => {
  const toggle = useModalStore((state) => state.toggleCreateProduction);
  const isOpened = useModalStore((state) => state.isOpenedCreateProduction);

  const { CREATE_PRODUCTION_LABEL, NAME_LABEL, DESCRIPTION_LABEL } =
    getDictionary(locale);

  const [state, formAction] = useFormState(CreateProductionForm, initialState);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  return (
    <Modal title={CREATE_PRODUCTION_LABEL} toggle={toggle} isOpened={isOpened}>
      <form action={formAction}>
        <div className="w-full text-center text-red-700">{state?.message}</div>

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
