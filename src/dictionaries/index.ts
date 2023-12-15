export type Locale = "EN" | "RU";

export type Translation = typeof Translations;
export type TranslationKey = keyof Translation;

type Dictionary = Record<TranslationKey, string>;

const Translations = {
  OPEN_CATEGORY_BUTTON: { EN: "Open category", RU: "Открыть категорию" },
  RETURN_BUTTON: { EN: "Return", RU: "Вернуться" },
  CART_NEXT_BUTTON: { EN: "Okay, next", RU: "Хорошо, далее" },
  HOME_PAGE_LABEL: { EN: "Home page", RU: "Главная страница" },
  FOUND_MOST_OFTEN_LABEL: { EN: "Found most often", RU: "Находят чаще всего" },
  NOTHING_FOUND_LABEL: { EN: "Nothing found", RU: "Ничего не найдено" },
  SHOW_DETAILS_LABEL: { EN: "show details", RU: "показать детали" },
  TODAY_UNTIL_LABEL: { EN: "today until", RU: "сегодня до" },
  FREE_FROM_LABEL: { EN: "free from", RU: "бесплатно от" },
  DISCOUNT_LABEL: { EN: "Discount", RU: "Скидка" },
  CHECKOUT_LABEL: { EN: "Checkout", RU: "Оформление заказа" },
  CATALOG_LABEL: { EN: "Catalog", RU: "Каталог" },
  DESCRIPTION_LABEL: { EN: "Description", RU: "Описание" },
  COURIER_PAYMENT_LABEL: { EN: "Courier payment", RU: "Курьерская оплата" },
  DELIVERY_LABEL: { EN: "Delivery", RU: "Доставка" },
  DELIVERY_DETAILS_LABEL: { EN: "Delivery Details", RU: "Детали доставки" },
  DELIVER_AT_LABEL: { EN: "Deliver at", RU: "Доставить к" },
  PREPARE_AT_LABEL: { EN: "Prepare at", RU: "Приготовить к" },
  SELF_PICKUP_LABEL: { EN: "Self-pickup", RU: "Самовывоз" },
  SELF_PICKUP_DETAILS_LABEL: {
    EN: "Self-pickup Details",
    RU: "Детали самовывоза",
  },
  CART_LABEL: { EN: "Cart", RU: "Корзина" },
  IN_CART_LABEL: { EN: "In Cart", RU: "В корзине" },
  ADD_LABEL: { EN: "Add", RU: "Добавить" },
  ADD_TO_CART_LABEL: { EN: "Add to Cart", RU: "Добавить в корзину" },
  IN_100_GRAMS_LABEL: { EN: "Per 100 grams", RU: "На 100 грамм" },
  KCAL_LABEL: { EN: "kcal", RU: "ккал" },
  PROTEINS_LABEL: { EN: "proteins", RU: "белки" },
  FATS_LABEL: { EN: "fats", RU: "жиры" },
  CARBS_LABEL: { EN: "carbs", RU: "углеводы" },
  DETAILED_CONDITIONS_LABEL: {
    EN: "Detailed conditions",
    RU: "Подробные условия",
  },
  DELIVERY_CONDITIONS_LABEL: {
    EN: "Delivery conditions",
    RU: "Условия доставки",
  },
  INDICATE_ADDRESS_LABEL: {
    EN: "Indicate your address",
    RU: "Укажите свой адрес",
  },
  ADDRESS_STREET_PLACEHOLDER: {
    EN: "Street",
    RU: "Улица и дом",
  },
  ADDRESS_APT_OFFICE_PLACEHOLDER: {
    EN: "Apt./office",
    RU: "Кв./офис",
  },
  ADDRESS_DOOR_PHONE_PLACEHOLDER: {
    EN: "Doorphone",
    RU: "Домофон",
  },
  ADDRESS_ENTRANCE_PLACEHOLDER: {
    EN: "Entrance",
    RU: "Подъезд",
  },
  ADDRESS_FLOOR_PLACEHOLDER: {
    EN: "Floor",
    RU: "Этаж",
  },
  COMMENT_PLACEHOLDER: {
    EN: "Comment",
    RU: "Комментарий",
  },
  DELIVERY_TIME_LABEL: { EN: "Delivery time", RU: "Время доставки" },
  COST_OF_DELIVERY_LABEL: { EN: "Cost of delivery", RU: "Стоимость доставки" },
  YOU_ORDER_LABEL: { EN: "You order", RU: "Вы заказываете" },
  TOTAL_LABEL: { EN: "Total", RU: "Итого" },
  HAVE_A_PROMO_LABEL: { EN: "Have a promo code", RU: "Есть промо код" },
  CREATE_ORDER_LABEL: { EN: "Create Order", RU: "Создать заказ" },
  ANYTHING_ELSE_LABEL: { EN: "Anything else", RU: "Что-нибудь еще" },
  PRICE_OF_GOODS_LABEL: { EN: "Price of goods", RU: "Стоимость товаров" },
  MORE_INFO_LABEL: { EN: "More info", RU: "Больше информации" },
  NOW_LABEL: { EN: "Now", RU: "Сейчас" },
  MIN_LABEL: { EN: "min", RU: "мин" },
  GRAM_SHORT_LABEL: { EN: "g", RU: "г" },
  KG_SHORT_LABEL: { EN: "kg", RU: "кг" },
  ML_SHORT_LABEL: { EN: "ml", RU: "мл" },
  L_SHORT_LABEL: { EN: "l", RU: "л" },
  LB_SHORT_LABEL: { EN: "lb", RU: "фунтов" },
  OZ_SHORT_LABEL: { EN: "oz", RU: "унций" },
  SEARCH_PLACEHOLDER: { EN: "Find a product", RU: "Найти товар" },
  EMPTY_CART_DESCRIPTION: {
    EN: "Your cart is empty",
    RU: "Ваша корзина пуста",
  },
  MINIMUM_ORDER_VALUE: {
    EN: "Minimum order value",
    RU: "Минимальная стоимость заказа",
  },
  MAXIMUM_ORDER_WEIGHT: {
    EN: "Maximum order weight",
    RU: "Максимальный вес заказа",
  },
  CHANNEL_IS_NOT_CONFIGURED_LABEL: {
    EN: "Channel is not configured",
    RU: "Канал не настроен",
  },
  CHANNEL_IS_NOT_CONFIGURED_DESCRIPTION: {
    EN: "You need to prepare all entities in Command Center.",
    RU: "Вам необходимо подготовить все сущности в Командном центре.",
  },
  DEMO_WARNING_DESCRIPTION: {
    EN: "This is a demo version of the website! All information is not real.",
    RU: "Это демо-версия сайта! Вся информация не соответствует действительности.",
  },
  CATEGORY_PAGE_DEFAULT_DESCRIPTION: {
    EN: "Here are all the products from this category",
    RU: "Здесь представлены все товары из этой категории",
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

export const getDictionary = (locale: Locale = "EN"): Dictionary => {
  return createDictionaryForLocale(locale);
};
