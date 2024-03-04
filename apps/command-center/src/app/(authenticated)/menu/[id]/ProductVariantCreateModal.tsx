'use client';

import React from 'react';
import slugify from 'slug';
import { useFormState, useFormStatus } from 'react-dom';
import { useModalStore } from '../../../../store/modal';
import { CreateProductVariantForm } from '../../../../server/actions';
import { ProductChooseModal } from './ProductChooseModal';
import { Menu, MenuCategory, Product } from '@next-orders/api-sdk';
import { getDictionary, Locale } from '../../../../dictionaries';
import { Modal } from '../../../../components/Modal';
import { Input } from '../../../../components/Input';
import { EntitySelect } from '../../../../components/EntitySelect';
import { Select } from '../../../../components/Select';
import { Button } from '@next-orders/ui';

const initialState = {
  message: '',
};

type ProductVariantCreateModalProps = {
  locale: Locale;
  products: Product[] | null;
  categories: MenuCategory[] | null | undefined;
  menu: Menu | null;
};

export const ProductVariantCreateModal = ({
  locale,
  products,
  categories,
  menu,
}: ProductVariantCreateModalProps) => {
  const toggle = useModalStore((state) => state.toggleCreateProductVariant);
  const isOpened = useModalStore((state) => state.isOpenedCreateProductVariant);

  const toggleChooseProduct = useModalStore(
    (state) => state.toggleChooseProduct,
  );

  const {
    CREATE_PRODUCT_VARIANT_LABEL,
    CATEGORY_LABEL,
    NAME_LABEL,
    DESCRIPTION_LABEL,
    DESCRIPTION_PRODUCT_PLACEHOLDER,
    WEIGHT_LABEL,
    WEIGHT_UNIT_LABEL,
    GROSS_LABEL,
    GROSS_PLACEHOLDER,
    GRAM_SHORT_LABEL,
    KG_SHORT_LABEL,
    ML_SHORT_LABEL,
    L_SHORT_LABEL,
    LB_SHORT_LABEL,
    OZ_SHORT_LABEL,
  } = getDictionary(locale);

  const [state, formAction] = useFormState(
    CreateProductVariantForm,
    initialState,
  );

  const menuId = menu?.id;
  const [categoryId, setCategoryId] = React.useState('');
  const [productId, setProductId] = React.useState('');
  const [slug, setSlug] = React.useState('');
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [weightUnit, setWeightUnit] = React.useState('');
  const [weightValue, setWeightValue] = React.useState('');
  const [gross, setGross] = React.useState('');

  // Lets generate slug on Name change
  const handleNameChange = (value: string) => {
    setName(value);
    setSlug(slugify(value));
  };

  // Find selected Product
  const productSelected = products?.find((p) => p.id === productId);

  // Prepare categories for select
  const categoriesOptions = categories?.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  return (
    <>
      <Modal
        title={CREATE_PRODUCT_VARIANT_LABEL}
        toggle={toggle}
        isOpened={isOpened}
      >
        <form action={formAction}>
          <input type="hidden" name="menuId" value={menuId} required />
          <input type="hidden" name="productId" value={productId} required />
          <input type="hidden" name="slug" value={slug} required />

          <div className="w-full text-center text-red-700">
            {state?.message}
          </div>

          <div className="mb-4">
            <EntitySelect
              type="PRODUCT"
              entity={productSelected}
              onClick={toggleChooseProduct}
              locale={locale}
            />
          </div>

          <div className="mb-4">
            <Select
              name="categoryId"
              label={CATEGORY_LABEL}
              isRequired
              defaultValue={categoryId}
              onChange={setCategoryId}
              locale={locale}
              options={categoriesOptions}
            />
          </div>

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
              name="description"
              label={DESCRIPTION_LABEL}
              placeholder={DESCRIPTION_PRODUCT_PLACEHOLDER}
              isRequired={false}
              value={description}
              onChange={setDescription}
            />
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <Input
                type="number"
                name="weightValue"
                label={WEIGHT_LABEL}
                isRequired
                value={weightValue}
                onChange={setWeightValue}
              />
            </div>

            <div>
              <Select
                name="weightUnit"
                label={WEIGHT_UNIT_LABEL}
                isRequired
                defaultValue={weightUnit}
                onChange={setWeightUnit}
                locale={locale}
                options={[
                  {
                    value: 'G',
                    label: GRAM_SHORT_LABEL,
                  },
                  {
                    value: 'KG',
                    label: KG_SHORT_LABEL,
                  },
                  {
                    value: 'ML',
                    label: ML_SHORT_LABEL,
                  },
                  {
                    value: 'L',
                    label: L_SHORT_LABEL,
                  },
                  {
                    value: 'LB',
                    label: LB_SHORT_LABEL,
                  },
                  {
                    value: 'OZ',
                    label: OZ_SHORT_LABEL,
                  },
                ]}
              />
            </div>
          </div>

          <div className="mb-4">
            <Input
              type="number"
              name="gross"
              label={GROSS_LABEL}
              placeholder={GROSS_PLACEHOLDER}
              isRequired
              value={gross}
              onChange={setGross}
            />
          </div>

          <div className="mt-6">
            <SubmitBlock locale={locale} />
          </div>
        </form>
      </Modal>

      <ProductChooseModal
        locale={locale}
        products={products}
        selected={productId}
        setSelected={setProductId}
      />
    </>
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
