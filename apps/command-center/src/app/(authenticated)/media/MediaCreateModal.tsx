'use client';

import React from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useModalStore } from '../../../store/modal';
import { CreateMediaForm } from '../../../server/actions';
import { getDictionary, Locale } from '../../../dictionaries';
import { Modal } from '../../../components/Modal';
import { Input } from '../../../components/Input';
import { Button } from '@next-orders/ui';

const initialState = {
  message: '',
};

type MediaCreateModalProps = {
  locale: Locale;
};

export const MediaCreateModal = ({ locale }: MediaCreateModalProps) => {
  const toggle = useModalStore((state) => state.toggleCreateMedia);
  const isOpened = useModalStore((state) => state.isOpenedCreateMedia);

  const { UPLOAD_MEDIA_LABEL, NAME_LABEL, MEDIA_ALT_PLACEHOLDER } =
    getDictionary(locale);

  const [state, formAction] = useFormState(CreateMediaForm, initialState);

  const [alt, setAlt] = React.useState('');

  return (
    <Modal title={UPLOAD_MEDIA_LABEL} toggle={toggle} isOpened={isOpened}>
      <form action={formAction}>
        <div className="w-full text-center text-red-700">{state?.message}</div>

        <div className="mb-4">
          <Input
            name="alt"
            label={NAME_LABEL}
            placeholder={MEDIA_ALT_PLACEHOLDER}
            isRequired
            value={alt}
            onChange={setAlt}
          />
        </div>

        <div className="mb-4">
          <input type="file" name="file" required />
        </div>

        <div className="mt-6">
          <SubmitBlock locale={locale} />
        </div>
      </form>
    </Modal>
  );
};

const SubmitBlock = ({ locale }: { locale: Locale }) => {
  const { UPLOAD_BUTTON } = getDictionary(locale);
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size="lg" className="w-full" disabled={pending}>
      {UPLOAD_BUTTON}
    </Button>
  );
};
