import type { ClientTrait } from '@next-orders/api-sdk';

export type Locale = 'EN' | 'ES' | 'RU' | 'DE';

export type Translation = typeof Translations;
export type TranslationKey = keyof Translation;

export type Dictionary = Record<TranslationKey, string>;

const Translations = {
  RETURN_BUTTON: {
    EN: 'Return',
    ES: 'Devolver',
    RU: 'Вернуться',
    DE: 'Zurückkehren',
  },
  CHOOSE_BUTTON: { EN: 'Choose', ES: 'Elegir', RU: 'Выбрать', DE: 'Wählen' },
  OPEN_BUTTON: { EN: 'Open', ES: 'Abrir', RU: 'Открыть', DE: 'Offen' },
  UPLOAD_BUTTON: {
    EN: 'Upload',
    ES: 'Subir',
    RU: 'Загрузить',
    DE: 'Hochladen',
  },
  CREATE_BUTTON: { EN: 'Create', ES: 'Crear', RU: 'Создать', DE: 'Erstellen' },
  SAVE_BUTTON: { EN: 'Save', ES: 'Ahorrar', RU: 'Сохранить', DE: 'Speichern' },
  SIGN_IN_BUTTON: {
    EN: 'Sign In',
    ES: 'Iniciar sesión',
    RU: 'Войти',
    DE: 'Einloggen',
  },
  DEMO_EMPLOYEE_BUTTON: {
    EN: 'Demo Employee',
    ES: 'Empleado de demostración',
    RU: 'Демо-сотрудник',
    DE: 'Demo-Mitarbeiter',
  },
  SELECT_LABEL: {
    EN: 'Select',
    ES: 'Seleccionar',
    RU: 'Выберите',
    DE: 'Wählen',
  },
  GRAM_SHORT_LABEL: { EN: 'g', ES: 'g', RU: 'г', DE: 'g' },
  KG_SHORT_LABEL: { EN: 'kg', ES: 'kg', RU: 'кг', DE: 'kg' },
  ML_SHORT_LABEL: { EN: 'ml', ES: 'ml', RU: 'мл', DE: 'ml' },
  L_SHORT_LABEL: { EN: 'l', ES: 'l', RU: 'л', DE: 'l' },
  LB_SHORT_LABEL: { EN: 'lb', ES: 'lb', RU: 'фунт', DE: 'lb' },
  OZ_SHORT_LABEL: { EN: 'oz', ES: 'oz', RU: 'унция', DE: 'oz' },
  HI_LABEL: { EN: 'Hi', ES: 'Hola', RU: 'Привет', DE: 'Hallo' },
  COMMAND_CENTER_LABEL: {
    EN: 'Command Center',
    ES: 'Centro de comando',
    RU: 'Командный центр',
    DE: 'Kommandozentrale',
  },
  DASHBOARD_LABEL: {
    EN: 'Dashboard',
    ES: 'Tablero de mandos',
    RU: 'Панель управления',
    DE: 'Armaturenbrett',
  },
  CLIENT_BASE_LABEL: {
    EN: 'Client Base',
    ES: 'Base del cliente',
    RU: 'База клиентов',
    DE: 'Kundenstamm',
  },
  CLIENT_PAGE_LABEL: {
    EN: 'Client Page',
    ES: 'Página del cliente',
    RU: 'Страница клиента',
    DE: 'Kundenseite',
  },
  CLIENTS_LABEL: { EN: 'Clients', ES: 'Clientes', RU: 'Клиенты', DE: 'Kunden' },
  EMPLOYEE_BASE_LABEL: {
    EN: 'Employee Base',
    ES: 'Base de empleados',
    RU: 'База сотрудников',
    DE: 'Mitarbeiterbasis',
  },
  EMPLOYEES_LABEL: {
    EN: 'Employees',
    ES: 'Empleados',
    RU: 'Сотрудники',
    DE: 'Mitarbeiter',
  },
  CHANNELS_LABEL: { EN: 'Channels', ES: 'Canales', RU: 'Каналы', DE: 'Kanäle' },
  CHANNEL_PAGE_LABEL: {
    EN: 'Channel Page',
    ES: 'Página del canal',
    RU: 'Страница канала',
    DE: 'Kanalseite',
  },
  DOMAINS_LABEL: { EN: 'Domains', ES: 'Dominios', RU: 'Домены', DE: 'Domänen' },
  CATEGORY_LABEL: {
    EN: 'Category',
    ES: 'Categoría',
    RU: 'Категория',
    DE: 'Kategorie',
  },
  CATEGORY_ICON_LABEL: {
    EN: 'Category Icon',
    ES: 'Icono de categoría',
    RU: 'Иконка категории',
    DE: 'Kategoriesymbol',
  },
  NAME_LABEL: {
    EN: 'Name',
    ES: 'Nombre',
    RU: 'Название',
    DE: 'Name',
  },
  DESCRIPTION_LABEL: {
    EN: 'Description',
    ES: 'Descripción',
    RU: 'Описание',
    DE: 'Beschreibung',
  },
  DESCRIPTION_PRODUCT_PLACEHOLDER: {
    EN: 'Short selling description',
    ES: 'Descripción de venta corta',
    RU: 'Короткое продающее описание',
    DE: 'Kurzverkaufsbeschreibung',
  },
  WEIGHT_LABEL: {
    EN: 'Weight',
    ES: 'Peso',
    RU: 'Вес',
    DE: 'Gewicht',
  },
  WEIGHT_UNIT_LABEL: {
    EN: 'Weight Unit',
    ES: 'Unidad de peso',
    RU: 'Весовая единица',
    DE: 'Gewichtseinheit',
  },
  GROSS_LABEL: {
    EN: 'Gross',
    ES: 'Bruto',
    RU: 'Валовая цена',
    DE: 'Brutto',
  },
  GROSS_PLACEHOLDER: {
    EN: 'Final price for client, including taxes',
    ES: 'Precio final para el cliente, impuestos incluidos',
    RU: 'Конечная цена для клиента, включая налоги',
    DE: 'Endpreis für den kunden, inklusive steuern',
  },
  SLUG_LABEL: {
    EN: 'Slug',
    ES: 'URL de babosa',
    RU: 'Часть URL',
    DE: 'Teil der URL',
  },
  SLUG_PLACEHOLDER: {
    EN: 'Unique identifying part of a web address',
    ES: 'Parte de identificación única de una dirección web',
    RU: 'Уникальная часть веб-адреса',
    DE: 'Eindeutiger identifizierender teil einer webadresse',
  },
  CURRENCY_LABEL: {
    EN: 'Currency',
    ES: 'Divisa',
    RU: 'Валюта',
    DE: 'Währung',
  },
  CURRENCY_PLACEHOLDER: {
    EN: 'Currency used in sales',
    ES: 'Moneda utilizada en las ventas',
    RU: 'Валюта, используемая в продажах',
    DE: 'Im verkauf verwendete währung',
  },
  LANGUAGE_LABEL: {
    EN: 'Language',
    ES: 'Idioma',
    RU: 'Язык',
    DE: 'Sprache',
  },
  COUNTRY_LABEL: {
    EN: 'Country',
    ES: 'País',
    RU: 'Страна',
    DE: 'Land',
  },
  MEDIA_LABEL: { EN: 'Media', ES: 'Medios', RU: 'Медиа', DE: 'Medien' },
  UPLOAD_MEDIA_LABEL: {
    EN: 'Upload Media',
    ES: 'Subir medios',
    RU: 'Загрузить медиа',
    DE: 'Medien hochladen',
  },
  MEDIA_ALT_PLACEHOLDER: {
    EN: "Brief description of what's in the photo",
    ES: 'Breve descripción de lo que hay en la foto',
    RU: 'Короткое описание что на фотографии',
    DE: 'Kurze beschreibung dessen, was auf dem foto zu sehen ist',
  },
  MENUS_LABEL: { EN: 'Menus', ES: 'Menús', RU: 'Меню', DE: 'Menüs' },
  MENU_PAGE_LABEL: {
    EN: 'Menu Page',
    ES: 'Página de menú',
    RU: 'Страница меню',
    DE: 'Menüseite',
  },
  MENU_CATEGORY_PAGE_LABEL: {
    EN: 'Menu Category Page',
    ES: 'Página de categoría de menú',
    RU: 'Страница категории меню',
    DE: 'Menükategorieseite',
  },
  MENUS_IN_THIS_CHANNEL_LABEL: {
    EN: 'Menus in this Channel',
    ES: 'Menús en este canal',
    RU: 'Меню в этом канале',
    DE: 'Menüs in diesem Kanal',
  },
  PRODUCTS_LABEL: {
    EN: 'Products',
    ES: 'Productos',
    RU: 'Продукты',
    DE: 'Produkte',
  },
  PRODUCTION_LABEL: {
    EN: 'Production',
    ES: 'Producción',
    RU: 'Производство',
    DE: 'Produktion',
  },
  PRODUCTION_DESCRIPTION: {
    EN: 'Items that need to be prepared',
    ES: 'Artículos que deben prepararse',
    RU: 'Товары, которые необходимо приготовить',
    DE: 'Elemente, die vorbereitet werden müssen',
  },
  PRODUCT_PAGE_LABEL: {
    EN: 'Product page',
    ES: 'Página del producto',
    RU: 'Страница продукта',
    DE: 'Produktseite',
  },
  INGREDIENT_LABEL: {
    EN: 'Ingredient',
    ES: 'Ingrediente',
    RU: 'Ингредиент',
    DE: 'Zutat',
  },
  INGREDIENT_DESCRIPTION: {
    EN: 'The basic components for production',
    ES: 'Los componentes básicos para la producción',
    RU: 'Основные компоненты для производства',
    DE: 'Die grundkomponenten für die produktion',
  },
  INGREDIENTS_PAGE_LABEL: {
    EN: 'Ingredients page',
    ES: 'Página de ingredientes',
    RU: 'Страница ингредиентов',
    DE: 'Zutatenseite',
  },
  PRODUCTION_PAGE_LABEL: {
    EN: 'Production page',
    ES: 'Página de producción',
    RU: 'Страница производства',
    DE: 'Produktionsseite',
  },
  READY_LABEL: {
    EN: 'Ready',
    ES: 'Listo',
    RU: 'Готовый',
    DE: 'Bereit',
  },
  READY_DESCRIPTION: {
    EN: 'Prepared and packaged for sale',
    ES: 'Preparado y empaquetado para la venta',
    RU: 'Приготовлено и упаковано для продажи',
    DE: 'Für den verkauf vorbereitet und verpackt',
  },
  READY_PAGE_LABEL: {
    EN: 'Ready page',
    ES: 'Página lista',
    RU: 'Страница готовых товаров',
    DE: 'Fertige seite',
  },
  PRODUCT_VARIANT_PAGE_LABEL: {
    EN: 'Product Variant Page',
    ES: 'Página de variantes del producto',
    RU: 'Страница варианта товара',
    DE: 'Produktvariantenseite',
  },
  IT_IS_LABEL: {
    EN: "It's",
    ES: 'Es',
    RU: 'Это',
    DE: 'Es ist',
  },
  LOADING_LABEL: {
    EN: 'Loading',
    ES: 'Sobreprima',
    RU: 'Загружаем',
    DE: 'Wird geladen',
  },
  YOU_HAVE_SOME_LABEL: {
    EN: 'You have some',
    ES: 'Tienes un poco',
    RU: 'У вас есть несколько',
    DE: 'Du hast ein paar',
  },
  YOU_HAVE_NONE_LABEL: {
    EN: 'You have none',
    ES: 'No tienes ninguno',
    RU: 'У вас еще нет',
    DE: 'Du hast keine',
  },
  MAYBE_ITS_TIME_LABEL: {
    EN: "Maybe it's time?",
    ES: '¿Quizás es hora?',
    RU: 'Может быть, пришло время?',
    DE: 'Vielleicht ist es an der zeit?',
  },
  CREATE_CHANNEL_LABEL: {
    EN: 'Create Channel',
    ES: 'Crear canal',
    RU: 'Создать канал',
    DE: 'Kanal erstellen',
  },
  CREATE_MENU_CATEGORY_LABEL: {
    EN: 'Create Category',
    ES: 'Crear categoría',
    RU: 'Создать категорию',
    DE: 'Kategorie erstellen',
  },
  EDIT_MENU_CATEGORY_LABEL: {
    EN: 'Edit Category',
    ES: 'Editar categoria',
    RU: 'Редактировать категорию',
    DE: 'Kategorie bearbeiten',
  },
  CREATE_MEDIA_LABEL: {
    EN: 'Create Media',
    ES: 'Crear medios',
    RU: 'Загрузить медиа',
    DE: 'Medien erstellen',
  },
  CREATE_PRODUCTION_LABEL: {
    EN: 'Create Product',
    ES: 'Crear producto',
    RU: 'Создать продукт',
    DE: 'Produkt erstellen',
  },
  CREATE_PRODUCT_VARIANT_LABEL: {
    EN: 'Create Product Variant',
    ES: 'Crear variante de producto',
    RU: 'Создать вариант продукта',
    DE: 'Produktvariante anlegen',
  },
  SIGNIN_PAGE_WELCOME_LABEL: {
    EN: "We've been waiting for you!",
    ES: 'Lo hemos estado esperando!',
    RU: 'Мы вас заждались!',
    DE: 'Wir haben auf sie gewartet!',
  },
  EMAIL_LABEL: { EN: 'Email', ES: 'Email', RU: 'Email', DE: 'Email' },
  EMAIL_PLACEHOLDER: {
    EN: 'Your email address',
    ES: 'Su dirección de correo electrónico',
    RU: 'Ваш электронный адрес',
    DE: 'Ihre E-Mail-Adresse',
  },
  PASSWORD_LABEL: {
    EN: 'Password',
    ES: 'Contraseña',
    RU: 'Пароль',
    DE: 'Passwort',
  },
  PASSWORD_PLACEHOLDER: {
    EN: 'Your password',
    ES: 'Tu contraseña',
    RU: 'Ваш пароль',
    DE: 'Ihr passwort',
  },
  SEARCH_PLACEHOLDER: {
    EN: 'Find anything',
    ES: 'Encontrar cualquier cosa',
    RU: 'Найти что-нибудь',
    DE: 'Irgendetwas finden',
  },
  FIND_BY_NAME_PLACEHOLDER: {
    EN: 'Find by name',
    ES: 'Encontrar por nombre',
    RU: 'Найти по названию',
    DE: 'Nach namen suchen',
  },
  CHOOSE_A_PRODUCT_LABEL: {
    EN: 'Choose a Product',
    ES: 'Elija un producto',
    RU: 'Выберите продукт',
    DE: 'Wählen sie ein produkt',
  },
  CLIENT_LOYALTY_TOOLTIP: {
    EN: 'This is the level of **Client Loyalty**. For each action he receives an increase. Every day the level decreases automatically – "passive cooling".',
    ES: 'Este es el nivel de **Fidelización del Cliente**. Por cada acción recibe un aumento. Cada día el nivel disminuye automáticamente – "enfriamiento pasivo".',
    RU: 'Это уровень **Лояльности клиента**. За каждое действие он получает прибавку. Каждый день уровень автоматически снижается – "пассивное охлаждение".',
    DE: 'Dies ist der Grad der **Kundentreue**. Für jede Aktion erhält er eine Erhöhung. Täglich sinkt der Füllstand automatisch – "passive Kühlung".',
  },
  CLIENT_LEVEL_TOOLTIP: {
    EN: 'This is the **Client Level**. It takes into account all actions for all time.',
    ES: 'Este es el **Nivel de Cliente**. Tiene en cuenta todas las acciones de todos los tiempos.',
    RU: 'Это **Уровень клиента**. Здесь учитываются все действия за все время.',
    DE: 'Dies ist die **Client-Ebene**. Es berücksichtigt alle Aktionen für alle Zeiten.',
  },
  CLIENT_TRAIT_BLANK_TOOLTIP: {
    EN: 'No Trait here. Wait a while, the client will probably receive it.',
    ES: 'No hay rasgo aquí. Espera un momento, probablemente el cliente lo recibirá.',
    RU: 'Нет черты. Подождите немного, клиент наверняка ее получит.',
    DE: 'Keine Eigenschaft hier. Warten Sie eine Weile, der Kunde wird es wahrscheinlich erhalten.',
  },
  CLIENT_TRAIT_ORDERLY_TOOLTIP: {
    EN: 'Client have a **Orderly Trait**. Often orders, but for small amounts.',
    ES: 'El cliente tiene un **rasgo ordenado**. A menudo pedidos, pero por pequeñas cantidades.',
    RU: 'У клиента есть черта **Упорядоченность**. Заказывает часто, но на небольшие суммы.',
    DE: 'Der Kunde hat eine **ordentliche Eigenschaft**. Oft Bestellungen, aber für kleine Mengen.',
  },
  CLIENT_TRAIT_SPONTANEOUS_TOOLTIP: {
    EN: 'Client have a **Spontaneous Trait**. Rarely orders, but for large amounts.',
    ES: 'El cliente tiene un **rasgo espontáneo**. Rara vez se realizan pedidos, pero sí por grandes cantidades.',
    RU: 'У клиента есть черта **Спонтанность**. Заказывает редко, но на большие суммы.',
    DE: 'Der Kunde hat eine **spontane Eigenschaft**. Selten Bestellungen, aber für große Mengen.',
  },
  CLIENT_TRAIT_COLD_TOOLTIP: {
    EN: "Client have a **Cold Trait**. Hasn't ordered for a long time.",
    ES: 'El cliente tiene un **rasgo de frialdad**. Hace mucho que no ordeno.',
    RU: 'У клиента есть черта **Холод**. Давно не заказывал.',
    DE: 'Der Kunde hat eine **Kälteeigenschaft**. Habe schon lange nicht mehr bestellt.',
  },
  CLIENT_TRAIT_WELL_FED_TOOLTIP: {
    EN: 'Client have a **Well-fed Trait**. Often orders for large amounts.',
    ES: 'El cliente tiene un **rasgo de bien alimentado**. A menudo se realizan pedidos por grandes cantidades.',
    RU: 'У клиента есть черта **Сытый**. Часто заказывает на большие суммы.',
    DE: 'Der Kunde hat eine **Wohlgenährte Eigenschaft**. Oft werden große Mengen bestellt.',
  },
  CLIENT_TRAIT_SATISFIED_TOOLTIP: {
    EN: 'Client have a **Satisfied Trait**. Happy with everything and always.',
    ES: 'El cliente tiene un **rasgo de satisfacción**. Feliz con todo y siempre.',
    RU: 'У клиента есть черта **Удовлетворенность**. Доволен всем и всегда.',
    DE: 'Der Kunde verfügt über eine **Zufriedenheitseigenschaft**. Mit allem und immer zufrieden.',
  },
  CLIENT_TRAIT_PICKY_TOOLTIP: {
    EN: 'Client have a **Picky Trait**. Always dissatisfied.',
    ES: 'El cliente tiene un **rasgo exigente**. Siempre insatisfecho.',
    RU: 'У клиента есть черта **Придирчивость**. Всегда неудовлетворен.',
    DE: 'Der Kunde hat eine **wählerische Eigenschaft**. Immer unzufrieden.',
  },
  CLIENT_TRAIT_CAUTIOUS_TOOLTIP: {
    EN: "Client have a **Cautious Trait**. Don't know what's on the client's mind.",
    ES: 'El cliente tiene un **rasgo cauteloso**. No sé qué pasa por la mente del cliente.',
    RU: 'У клиента есть черта **Осторожность**. Не известно, что у него на уме.',
    DE: 'Der Kunde hat eine **vorsichtige Eigenschaft**. Ich weiß nicht, was der Kunde denkt.',
  },
  CLIENT_TRAIT_NO_TOOLTIP: {
    EN: 'No hint here.',
    ES: 'No hay ninguna pista aquí.',
    RU: 'Здесь нет подсказки.',
    DE: 'Kein hinweis hier.',
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
