import type { LanguageCode } from '@next-orders/api-sdk';

export type Locale = LanguageCode;

export type Translation = typeof Translations;
export type TranslationKey = keyof Translation;

type Dictionary = Record<TranslationKey, string>;

const Translations = {
  OPEN_CATEGORY_BUTTON: {
    EN: 'Open category',
    ES: 'Categoría abierta',
    RU: 'Открыть категорию',
  },
  RETURN_BUTTON: { EN: 'Return', ES: 'Devolver', RU: 'Вернуться' },
  CART_NEXT_BUTTON: {
    EN: 'Okay, next',
    ES: 'Ok el siguiente',
    RU: 'Хорошо, далее',
  },
  HOME_PAGE_LABEL: {
    EN: 'Home page',
    ES: 'Pagina de inicio',
    RU: 'Главная страница',
  },
  FOUND_MOST_OFTEN_LABEL: {
    EN: 'Found most often',
    ES: 'Se encuentra más a menudo',
    RU: 'Находят чаще всего',
  },
  NOTHING_FOUND_LABEL: {
    EN: 'Nothing found',
    ES: 'Nada encontrado',
    RU: 'Ничего не найдено',
  },
  SHOW_DETAILS_LABEL: {
    EN: 'show details',
    ES: 'mostrar detalles',
    RU: 'показать детали',
  },
  TODAY_UNTIL_LABEL: { EN: 'today until', ES: 'hoy hasta', RU: 'сегодня до' },
  FREE_FROM_LABEL: { EN: 'free from', ES: 'gratis desde', RU: 'бесплатно от' },
  DISCOUNT_LABEL: { EN: 'Discount', ES: 'Descuento', RU: 'Скидка' },
  CHECKOUT_LABEL: {
    EN: 'Checkout',
    ES: 'Orden de compra',
    RU: 'Оформление заказа',
  },
  CATALOG_LABEL: { EN: 'Catalog', ES: 'Catalogar', RU: 'Каталог' },
  DESCRIPTION_LABEL: { EN: 'Description', ES: 'Descripción', RU: 'Описание' },
  COURIER_PAYMENT_LABEL: {
    EN: 'Courier payment',
    ES: 'Pago de mensajería',
    RU: 'Курьерская оплата',
  },
  DELIVERY_LABEL: { EN: 'Delivery', ES: 'Entrega', RU: 'Доставка' },
  DELIVERY_DETAILS_LABEL: {
    EN: 'Delivery Details',
    ES: 'Detalles de la entrega',
    RU: 'Детали доставки',
  },
  DELIVER_AT_LABEL: {
    EN: 'Deliver at',
    ES: 'Entregar a las',
    RU: 'Доставить к',
  },
  PREPARE_AT_LABEL: {
    EN: 'Prepare at',
    ES: 'Prepárate a las',
    RU: 'Приготовить к',
  },
  SELF_PICKUP_LABEL: {
    EN: 'Self-pickup',
    ES: 'Auto-recogida',
    RU: 'Самовывоз',
  },
  SELF_PICKUP_DETAILS_LABEL: {
    EN: 'Self-pickup Details',
    ES: 'Detalles de auto-recogida',
    RU: 'Детали самовывоза',
  },
  CART_LABEL: { EN: 'Cart', ES: 'Carreta', RU: 'Корзина' },
  IN_CART_LABEL: { EN: 'In Cart', ES: 'En el carrito', RU: 'В корзине' },
  ADD_LABEL: { EN: 'Add', ES: 'Agregar', RU: 'Добавить' },
  ADD_TO_CART_LABEL: {
    EN: 'Add to Cart',
    ES: 'Añadir al carrito',
    RU: 'Добавить в корзину',
  },
  IN_100_GRAMS_LABEL: {
    EN: 'Per 100 grams',
    ES: 'Por 100 gramos',
    RU: 'На 100 грамм',
  },
  KCAL_LABEL: { EN: 'kcal', ES: 'kcal', RU: 'ккал' },
  PROTEINS_LABEL: { EN: 'proteins', ES: 'proteínas', RU: 'белки' },
  FATS_LABEL: { EN: 'fats', ES: 'grasas', RU: 'жиры' },
  CARBS_LABEL: { EN: 'carbs', ES: 'carbohidratos', RU: 'углеводы' },
  DETAILED_CONDITIONS_LABEL: {
    EN: 'Detailed conditions',
    ES: 'Condiciones detalladas',
    RU: 'Подробные условия',
  },
  DELIVERY_CONDITIONS_LABEL: {
    EN: 'Delivery conditions',
    ES: 'Condiciones de entrega',
    RU: 'Условия доставки',
  },
  CONTACTS_LABEL: {
    EN: 'Contacts',
    ES: 'Contactos',
    RU: 'Контакты',
  },
  CONTACT_PHONE_PLACEHOLDER: {
    EN: 'Your phone',
    ES: 'Su teléfono',
    RU: 'Ваш телефон',
  },
  CONTACT_NAME_PLACEHOLDER: {
    EN: 'Your name',
    ES: 'Su nombre',
    RU: 'Ваше имя',
  },
  PAYMENT_METHOD_LABEL: {
    EN: 'Payment method',
    ES: 'Método de pago',
    RU: 'Метод оплаты',
  },
  INDICATE_ADDRESS_LABEL: {
    EN: 'Indicate your address',
    ES: 'Indique su dirección',
    RU: 'Укажите свой адрес',
  },
  ADDRESS_STREET_PLACEHOLDER: {
    EN: 'Street',
    ES: 'Calle',
    RU: 'Улица и дом',
  },
  ADDRESS_APT_OFFICE_PLACEHOLDER: {
    EN: 'Apt./office',
    ES: 'Apto./oficina',
    RU: 'Кв./офис',
  },
  ADDRESS_DOOR_PHONE_PLACEHOLDER: {
    EN: 'Doorphone',
    ES: 'Interfono',
    RU: 'Домофон',
  },
  ADDRESS_ENTRANCE_PLACEHOLDER: {
    EN: 'Entrance',
    ES: 'Entrada',
    RU: 'Подъезд',
  },
  ADDRESS_FLOOR_PLACEHOLDER: {
    EN: 'Floor',
    ES: 'Piso',
    RU: 'Этаж',
  },
  COMMENT_PLACEHOLDER: {
    EN: 'Comment',
    ES: 'Comentario',
    RU: 'Комментарий',
  },
  DELIVERY_TIME_LABEL: {
    EN: 'Delivery time',
    ES: 'El tiempo de entrega',
    RU: 'Время доставки',
  },
  COST_OF_DELIVERY_LABEL: {
    EN: 'Cost of delivery',
    ES: 'Costo de entrega',
    RU: 'Стоимость доставки',
  },
  YOU_ORDER_LABEL: {
    EN: 'You order',
    ES: 'Usted ordena',
    RU: 'Вы заказываете',
  },
  TOTAL_LABEL: { EN: 'Total', ES: 'Total', RU: 'Итого' },
  HAVE_A_PROMO_LABEL: {
    EN: 'Have a promo code',
    ES: 'Tener un código promocional',
    RU: 'Есть промо код',
  },
  CREATE_ORDER_LABEL: {
    EN: 'Create Order',
    ES: 'Crear orden',
    RU: 'Создать заказ',
  },
  ANYTHING_ELSE_LABEL: {
    EN: 'Anything else',
    ES: 'Algo más',
    RU: 'Что-нибудь еще',
  },
  PRICE_OF_GOODS_LABEL: {
    EN: 'Price of goods',
    ES: 'Precio de los bienes',
    RU: 'Стоимость товаров',
  },
  MORE_INFO_LABEL: {
    EN: 'More info',
    ES: 'Más información',
    RU: 'Больше информации',
  },
  NOW_LABEL: { EN: 'Now', ES: 'Ahora', RU: 'Сейчас' },
  MIN_LABEL: { EN: 'min', ES: 'min', RU: 'мин' },
  GRAM_SHORT_LABEL: { EN: 'g', ES: 'g', RU: 'г' },
  KG_SHORT_LABEL: { EN: 'kg', ES: 'kg', RU: 'кг' },
  ML_SHORT_LABEL: { EN: 'ml', ES: 'ml', RU: 'мл' },
  L_SHORT_LABEL: { EN: 'l', ES: 'l', RU: 'л' },
  LB_SHORT_LABEL: { EN: 'lb', ES: 'lb', RU: 'фунтов' },
  OZ_SHORT_LABEL: { EN: 'oz', ES: 'oz', RU: 'унций' },
  SEARCH_PLACEHOLDER: {
    EN: 'Find a product',
    ES: 'Encuentre un producto',
    RU: 'Найти товар',
  },
  EMPTY_CART_DESCRIPTION: {
    EN: 'Your cart is empty',
    ES: 'Tu carrito esta vacío',
    RU: 'Ваша корзина пуста',
  },
  MINIMUM_ORDER_VALUE: {
    EN: 'Minimum order value',
    ES: 'Valor mínimo de pedido',
    RU: 'Минимальная стоимость заказа',
  },
  MAXIMUM_ORDER_WEIGHT: {
    EN: 'Maximum order weight',
    ES: 'Peso máximo del pedido',
    RU: 'Максимальный вес заказа',
  },
  CHANNEL_IS_NOT_CONFIGURED_LABEL: {
    EN: 'Channel is not configured',
    ES: 'El canal no está configurado',
    RU: 'Канал не настроен',
  },
  CHANNEL_IS_NOT_CONFIGURED_DESCRIPTION: {
    EN: 'You need to prepare all entities in Command Center.',
    ES: 'Debes preparar todas las entidades en el Centro de comando.',
    RU: 'Вам необходимо подготовить все сущности в Командном центре.',
  },
  DEMO_WARNING_DESCRIPTION: {
    EN: 'This is a demo version of the website! All information is not real.',
    ES: '¡Esta es una versión de demostración del sitio web! Toda la información no es real.',
    RU: 'Это демо-версия сайта! Вся информация не соответствует действительности.',
  },
  CATEGORY_PAGE_DEFAULT_DESCRIPTION: {
    EN: 'Here are all the products from this category',
    ES: 'Aquí están todos los productos de esta categoría',
    RU: 'Здесь представлены все товары из этой категории',
  },
};

const createDictionaryForLocale = (locale: Locale): Dictionary =>
  Object.entries(Translations).reduce(
    (dictionary: Dictionary, [key, value]) => {
      dictionary[key as TranslationKey] = value[locale];
      return dictionary;
    },
    {} as Dictionary,
  );

export const getDictionary = (locale: Locale = 'EN'): Dictionary => {
  return createDictionaryForLocale(locale);
};
