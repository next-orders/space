import type { ClientTrait } from '@next-orders/api-sdk';

export type Locale = 'EN' | 'ES' | 'RU';

export type Translation = typeof Translations;
export type TranslationKey = keyof Translation;

export type Dictionary = Record<TranslationKey, string>;

const Translations = {
  RETURN_BUTTON: { EN: 'Return', ES: 'Devolver', RU: 'Вернуться' },
  CHOOSE_BUTTON: { EN: 'Choose', ES: 'Elegir', RU: 'Выбрать' },
  OPEN_BUTTON: { EN: 'Open', ES: 'Abrir', RU: 'Открыть' },
  UPLOAD_BUTTON: { EN: 'Upload', ES: 'Subir', RU: 'Загрузить' },
  CREATE_BUTTON: { EN: 'Create', ES: 'Crear', RU: 'Создать' },
  SAVE_BUTTON: { EN: 'Save', ES: 'Ahorrar', RU: 'Сохранить' },
  SIGN_IN_BUTTON: { EN: 'Sign In', ES: 'Iniciar sesión', RU: 'Войти' },
  DEMO_EMPLOYEE_BUTTON: {
    EN: 'Demo Employee',
    ES: 'Empleado de demostración',
    RU: 'Демо-сотрудник',
  },
  SELECT_LABEL: {
    EN: 'Select',
    ES: 'Seleccionar',
    RU: 'Выберите',
  },
  GRAM_SHORT_LABEL: { EN: 'g', ES: 'g', RU: 'г' },
  KG_SHORT_LABEL: { EN: 'kg', ES: 'kg', RU: 'кг' },
  ML_SHORT_LABEL: { EN: 'ml', ES: 'ml', RU: 'мл' },
  L_SHORT_LABEL: { EN: 'l', ES: 'l', RU: 'л' },
  LB_SHORT_LABEL: { EN: 'lb', ES: 'lb', RU: 'фунт' },
  OZ_SHORT_LABEL: { EN: 'oz', ES: 'oz', RU: 'унция' },
  HI_LABEL: { EN: 'Hi', ES: 'Hola', RU: 'Привет' },
  COMMAND_CENTER_LABEL: {
    EN: 'Command Center',
    ES: 'Centro de comando',
    RU: 'Командный центр',
  },
  DASHBOARD_LABEL: {
    EN: 'Dashboard',
    ES: 'Tablero de mandos',
    RU: 'Панель управления',
  },
  CLIENT_BASE_LABEL: {
    EN: 'Client Base',
    ES: 'Base del cliente',
    RU: 'База клиентов',
  },
  CLIENT_PAGE_LABEL: {
    EN: 'Client Page',
    ES: 'Página del cliente',
    RU: 'Страница клиента',
  },
  CLIENTS_LABEL: { EN: 'Clients', ES: 'Clientes', RU: 'Клиенты' },
  EMPLOYEE_BASE_LABEL: {
    EN: 'Employee Base',
    ES: 'Base de empleados',
    RU: 'База сотрудников',
  },
  EMPLOYEES_LABEL: {
    EN: 'Employees',
    ES: 'Empleados',
    RU: 'Сотрудники',
  },
  CHANNELS_LABEL: { EN: 'Channels', ES: 'Canales', RU: 'Каналы' },
  CHANNEL_PAGE_LABEL: {
    EN: 'Channel Page',
    ES: 'Página del canal',
    RU: 'Страница канала',
  },
  DOMAINS_LABEL: { EN: 'Domains', ES: 'Dominios', RU: 'Домены' },
  CATEGORY_LABEL: {
    EN: 'Category',
    ES: 'Categoría',
    RU: 'Категория',
  },
  CATEGORY_ICON_LABEL: {
    EN: 'Category Icon',
    ES: 'Icono de categoría',
    RU: 'Иконка категории',
  },
  NAME_LABEL: {
    EN: 'Name',
    ES: 'Nombre',
    RU: 'Название',
  },
  DESCRIPTION_LABEL: {
    EN: 'Description',
    ES: 'Descripción',
    RU: 'Описание',
  },
  DESCRIPTION_PRODUCT_PLACEHOLDER: {
    EN: 'Short selling description',
    ES: 'Descripción de venta corta',
    RU: 'Короткое продающее описание',
  },
  WEIGHT_LABEL: {
    EN: 'Weight',
    ES: 'Peso',
    RU: 'Вес',
  },
  WEIGHT_UNIT_LABEL: {
    EN: 'Weight Unit',
    ES: 'Unidad de peso',
    RU: 'Весовая единица',
  },
  GROSS_LABEL: {
    EN: 'Gross',
    ES: 'Bruto',
    RU: 'Валовая цена',
  },
  GROSS_PLACEHOLDER: {
    EN: 'Final price for client, including taxes',
    ES: 'Precio final para el cliente, impuestos incluidos',
    RU: 'Конечная цена для клиента, включая налоги',
  },
  SLUG_LABEL: {
    EN: 'Slug',
    ES: 'URL de babosa',
    RU: 'Часть URL',
  },
  SLUG_PLACEHOLDER: {
    EN: 'Unique identifying part of a web address',
    ES: 'Parte de identificación única de una dirección web',
    RU: 'Уникальная часть веб-адреса',
  },
  CURRENCY_LABEL: {
    EN: 'Currency',
    ES: 'Divisa',
    RU: 'Валюта',
  },
  CURRENCY_PLACEHOLDER: {
    EN: 'Currency used in sales',
    ES: 'Moneda utilizada en las ventas',
    RU: 'Валюта, используемая в продажах',
  },
  LANGUAGE_LABEL: {
    EN: 'Language',
    ES: 'Idioma',
    RU: 'Язык',
  },
  COUNTRY_LABEL: {
    EN: 'Country',
    ES: 'País',
    RU: 'Страна',
  },
  MEDIA_LABEL: { EN: 'Media', ES: 'Medios', RU: 'Медиа' },
  UPLOAD_MEDIA_LABEL: {
    EN: 'Upload Media',
    ES: 'Subir medios',
    RU: 'Загрузить медиа',
  },
  MEDIA_ALT_PLACEHOLDER: {
    EN: "Brief description of what's in the photo",
    ES: 'Breve descripción de lo que hay en la foto',
    RU: 'Короткое описание что на фотографии',
  },
  MENUS_LABEL: { EN: 'Menus', ES: 'Menús', RU: 'Меню' },
  MENU_PAGE_LABEL: {
    EN: 'Menu Page',
    ES: 'Página de menú',
    RU: 'Страница меню',
  },
  MENU_CATEGORY_PAGE_LABEL: {
    EN: 'Menu Category Page',
    ES: 'Página de categoría de menú',
    RU: 'Страница категории меню',
  },
  MENUS_IN_THIS_CHANNEL_LABEL: {
    EN: 'Menus in this Channel',
    ES: 'Menús en este canal',
    RU: 'Меню в этом канале',
  },
  PRODUCTS_LABEL: { EN: 'Products', ES: 'Productos', RU: 'Продукты' },
  PRODUCTION_LABEL: {
    EN: 'Production',
    ES: 'Producción',
    RU: 'Производство',
  },
  PRODUCTION_DESCRIPTION: {
    EN: 'Items that need to be prepared',
    ES: 'Artículos que deben prepararse',
    RU: 'Товары, которые необходимо приготовить',
  },
  PRODUCT_PAGE_LABEL: {
    EN: 'Product page',
    ES: 'Página del producto',
    RU: 'Страница продукта',
  },
  INGREDIENT_LABEL: {
    EN: 'Ingredient',
    ES: 'Ingrediente',
    RU: 'Ингредиент',
  },
  INGREDIENT_DESCRIPTION: {
    EN: 'The basic components for production',
    ES: 'Los componentes básicos para la producción',
    RU: 'Основные компоненты для производства',
  },
  INGREDIENTS_PAGE_LABEL: {
    EN: 'Ingredients page',
    ES: 'Página de ingredientes',
    RU: 'Страница ингредиентов',
  },
  PRODUCTION_PAGE_LABEL: {
    EN: 'Production page',
    ES: 'Página de producción',
    RU: 'Страница производства',
  },
  READY_LABEL: {
    EN: 'Ready',
    ES: 'Listo',
    RU: 'Готовый',
  },
  READY_DESCRIPTION: {
    EN: 'Prepared and packaged for sale',
    ES: 'Preparado y empaquetado para la venta',
    RU: 'Приготовлено и упаковано для продажи',
  },
  READY_PAGE_LABEL: {
    EN: 'Ready page',
    ES: 'Página lista',
    RU: 'Страница готовых товаров',
  },
  PRODUCT_VARIANT_PAGE_LABEL: {
    EN: 'Product Variant Page',
    ES: 'Página de variantes del producto',
    RU: 'Страница варианта товара',
  },
  IT_IS_LABEL: {
    EN: "It's",
    ES: 'Es',
    RU: 'Это',
  },
  LOADING_LABEL: { EN: 'Loading', ES: 'Sobreprima', RU: 'Загружаем' },
  YOU_HAVE_SOME_LABEL: {
    EN: 'You have some',
    ES: 'Tienes un poco',
    RU: 'У вас есть несколько',
  },
  YOU_HAVE_NONE_LABEL: {
    EN: 'You have none',
    ES: 'No tienes ninguno',
    RU: 'У вас еще нет',
  },
  MAYBE_ITS_TIME_LABEL: {
    EN: "Maybe it's time?",
    ES: '¿Quizás es hora?',
    RU: 'Может быть, пришло время?',
  },
  CREATE_CHANNEL_LABEL: {
    EN: 'Create Channel',
    ES: 'Crear canal',
    RU: 'Создать канал',
  },
  CREATE_MENU_CATEGORY_LABEL: {
    EN: 'Create Category',
    ES: 'Crear categoría',
    RU: 'Создать категорию',
  },
  EDIT_MENU_CATEGORY_LABEL: {
    EN: 'Edit Category',
    ES: 'Editar categoria',
    RU: 'Редактировать категорию',
  },
  CREATE_MEDIA_LABEL: {
    EN: 'Create Media',
    ES: 'Crear medios',
    RU: 'Загрузить медиа',
  },
  CREATE_PRODUCTION_LABEL: {
    EN: 'Create Product',
    ES: 'Crear producto',
    RU: 'Создать продукт',
  },
  CREATE_PRODUCT_VARIANT_LABEL: {
    EN: 'Create Product Variant',
    ES: 'Crear variante de producto',
    RU: 'Создать вариант продукта',
  },
  SIGNIN_PAGE_WELCOME_LABEL: {
    EN: "We've been waiting for you!",
    ES: 'Lo hemos estado esperando!',
    RU: 'Мы вас заждались!',
  },
  EMAIL_LABEL: { EN: 'Email', ES: 'Email', RU: 'Email' },
  EMAIL_PLACEHOLDER: {
    EN: 'Your email address',
    ES: 'Su dirección de correo electrónico',
    RU: 'Ваш электронный адрес',
  },
  PASSWORD_LABEL: {
    EN: 'Password',
    ES: 'Contraseña',
    RU: 'Пароль',
  },
  PASSWORD_PLACEHOLDER: {
    EN: 'Your password',
    ES: 'Tu contraseña',
    RU: 'Ваш пароль',
  },
  SEARCH_PLACEHOLDER: {
    EN: 'Find anything',
    ES: 'Encontrar cualquier cosa',
    RU: 'Найти что-нибудь',
  },
  FIND_BY_NAME_PLACEHOLDER: {
    EN: 'Find by name',
    ES: 'Encontrar por nombre',
    RU: 'Найти по названию',
  },
  CHOOSE_A_PRODUCT_LABEL: {
    EN: 'Choose a Product',
    ES: 'Elija un producto',
    RU: 'Выберите продукт',
  },
  CLIENT_LOYALTY_TOOLTIP: {
    EN: 'This is the level of **Client Loyalty**. For each action he receives an increase. Every day the level decreases automatically – "passive cooling".',
    ES: 'Este es el nivel de **Fidelización del Cliente**. Por cada acción recibe un aumento. Cada día el nivel disminuye automáticamente – "enfriamiento pasivo".',
    RU: 'Это уровень **Лояльности клиента**. За каждое действие он получает прибавку. Каждый день уровень автоматически снижается – "пассивное охлаждение".',
  },
  CLIENT_LEVEL_TOOLTIP: {
    EN: 'This is the **Client Level**. It takes into account all actions for all time.',
    ES: 'Este es el **Nivel de Cliente**. Tiene en cuenta todas las acciones de todos los tiempos.',
    RU: 'Это **Уровень клиента**. Здесь учитываются все действия за все время.',
  },
  CLIENT_TRAIT_BLANK_TOOLTIP: {
    EN: 'No Trait here. Wait a while, the client will probably receive it.',
    ES: 'No hay rasgo aquí. Espera un momento, probablemente el cliente lo recibirá.',
    RU: 'Нет черты. Подождите немного, клиент наверняка ее получит.',
  },
  CLIENT_TRAIT_ORDERLY_TOOLTIP: {
    EN: 'Client have a **Orderly Trait**. Often orders, but for small amounts.',
    ES: 'El cliente tiene un **rasgo ordenado**. A menudo pedidos, pero por pequeñas cantidades.',
    RU: 'У клиента есть черта **Упорядоченность**. Заказывает часто, но на небольшие суммы.',
  },
  CLIENT_TRAIT_SPONTANEOUS_TOOLTIP: {
    EN: 'Client have a **Spontaneous Trait**. Rarely orders, but for large amounts.',
    ES: 'El cliente tiene un **rasgo espontáneo**. Rara vez se realizan pedidos, pero sí por grandes cantidades.',
    RU: 'У клиента есть черта **Спонтанность**. Заказывает редко, но на большие суммы.',
  },
  CLIENT_TRAIT_COLD_TOOLTIP: {
    EN: "Client have a **Cold Trait**. Hasn't ordered for a long time.",
    ES: 'El cliente tiene un **rasgo de frialdad**. Hace mucho que no ordeno.',
    RU: 'У клиента есть черта **Холод**. Давно не заказывал.',
  },
  CLIENT_TRAIT_WELL_FED_TOOLTIP: {
    EN: 'Client have a **Well-fed Trait**. Often orders for large amounts.',
    ES: 'El cliente tiene un **rasgo de bien alimentado**. A menudo se realizan pedidos por grandes cantidades.',
    RU: 'У клиента есть черта **Сытый**. Часто заказывает на большие суммы.',
  },
  CLIENT_TRAIT_SATISFIED_TOOLTIP: {
    EN: 'Client have a **Satisfied Trait**. Happy with everything and always.',
    ES: 'El cliente tiene un **rasgo de satisfacción**. Feliz con todo y siempre.',
    RU: 'У клиента есть черта **Удовлетворенность**. Доволен всем и всегда.',
  },
  CLIENT_TRAIT_PICKY_TOOLTIP: {
    EN: 'Client have a **Picky Trait**. Always dissatisfied.',
    ES: 'El cliente tiene un **rasgo exigente**. Siempre insatisfecho.',
    RU: 'У клиента есть черта **Придирчивость**. Всегда неудовлетворен.',
  },
  CLIENT_TRAIT_CAUTIOUS_TOOLTIP: {
    EN: "Client have a **Cautious Trait**. Don't know what's on the client's mind.",
    ES: 'El cliente tiene un **rasgo cauteloso**. No sé qué pasa por la mente del cliente.',
    RU: 'У клиента есть черта **Осторожность**. Не известно, что у него на уме.',
  },
  CLIENT_TRAIT_NO_TOOLTIP: {
    EN: 'No hint here.',
    ES: 'No hay ninguna pista aquí.',
    RU: 'Здесь нет подсказки.',
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

const traitToTooltipKeyMap: Record<ClientTrait['type'], TranslationKey> = {
  BLANK: 'CLIENT_TRAIT_BLANK_TOOLTIP',
  ORDERLY: 'CLIENT_TRAIT_ORDERLY_TOOLTIP',
  SPONTANEOUS: 'CLIENT_TRAIT_SPONTANEOUS_TOOLTIP',
  COLD: 'CLIENT_TRAIT_COLD_TOOLTIP',
  WELL_FED: 'CLIENT_TRAIT_WELL_FED_TOOLTIP',
  SATISFIED: 'CLIENT_TRAIT_SATISFIED_TOOLTIP',
  PICKY: 'CLIENT_TRAIT_PICKY_TOOLTIP',
  CAUTIOUS: 'CLIENT_TRAIT_CAUTIOUS_TOOLTIP',
};

export const getDropdownByTraitType = (
  type: ClientTrait['type'],
  locale: Locale,
): string => {
  const dictionary = getDictionary(locale);
  const tooltipKey = traitToTooltipKeyMap[type];
  return tooltipKey in dictionary
    ? dictionary[tooltipKey]
    : dictionary.CLIENT_TRAIT_NO_TOOLTIP;
};
