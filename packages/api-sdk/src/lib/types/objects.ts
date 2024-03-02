// Main Entity
export type Shop = {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
};

// Shop Entities
export type Domain = {
  id: string;
  host: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Media = {
  id: string;
  alt: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Product = {
  id: string;
  type: ProductType;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  variants?: ProductVariant[];
  rating: number;
  score: number;
  isAvailableForPurchase: boolean;
};

export type ProductType = 'PRODUCTION' | 'READY' | 'INGREDIENT';

export type Employee = {
  id: string;
  firstName: string;
  lastName: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date | null;
};

export type EmployeePermission = {
  id: string;
  type: EmployeePermissionType;
  employeeId: string;
};

export type EmployeePermissionType =
  | 'READ_CLIENTS'
  | 'EDIT_CLIENTS'
  | 'READ_MEDIA'
  | 'EDIT_MEDIA'
  | 'READ_CHANNELS'
  | 'EDIT_CHANNELS'
  | 'READ_PRODUCTS'
  | 'EDIT_PRODUCTS'
  | 'READ_MENUS'
  | 'EDIT_MENUS';

export type EmployeePassword = {
  id: string;
  hash: string;
  createdAt: Date;
  updatedAt: Date;
  employeeId: string;
};

export type EmployeeContact = {
  id: string;
  type: EmployeeContactType;
  employeeId: string;
  value: string;
  isUsedForAuthentication: boolean;
};

export type EmployeeContactType = 'EMAIL';

export type Client = {
  id: string;
  firstName: string;
  lastName: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  level: number;
  gender: Gender;
  emotion: number;
  loyalty: number;
  avatarId: string;
  traits: ClientTrait[];
};

export type ClientTrait = {
  id: string;
  type: ClientTraitType;
  createdAt: Date;
  updatedAt: Date;
};

export type ClientTraitType =
  | 'BLANK'
  | 'ORDERLY'
  | 'SPONTANEOUS'
  | 'COLD'
  | 'WELL_FED'
  | 'SATISFIED'
  | 'PICKY'
  | 'CAUTIOUS';

export type Channel = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  currencyCode: CurrencyCode;
  languageCode: LanguageCode;
  countryCode: CountryCode;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  domainId?: string | null;
  accentTextColor: string;
  accentButtonColor: string;
  accentGradientFrom: string | null;
  accentGradientTo: string | null;
};

export type LanguageCode = 'EN' | 'ES' | 'RU';

export type CurrencyCode = 'USD' | 'EUR' | 'RUB';

// Channel Entities
export type Menu = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  channelId: string;
  categories: MenuCategory[];
};

export type MenuCategory = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  slug: string;
  icon: MenuCategoryIcon | null;
};

export type MenuCategoryIcon =
  | 'DEFAULT'
  | 'BURGER'
  | 'PIZZA'
  | 'ROLLS'
  | 'SUSHI'
  | 'WOK'
  | 'CAKE'
  | 'LASAGNA'
  | 'DRINK';

export type ProductVariant = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  sku: string | null;
  weightUnit: WeightUnit;
  weightValue: number;
  onSale: boolean;
  gross: number;
  net: number | null;
  tax: number | null;
  per100gEnergy: number | null;
  per100gProtein: number | null;
  per100gFat: number | null;
  per100gCarbohydrate: number | null;
  seoTitle: string | null;
  seoDescription: string | null;
  media: ProductMedia[];
  category: MenuCategory;
};

export type WeightUnit = 'G' | 'KG' | 'ML' | 'L' | 'OZ' | 'LB';

export type ProductMedia = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  media: Media;
};

export type Checkout = {
  id: string;
  deliveryMethod: CheckoutDeliveryMethod;
  shippingPrice: number;
  totalPrice: number;
  lines: CheckoutLine[];
};

export type CheckoutDeliveryMethod = 'DELIVERY' | 'WAREHOUSE';

export type CheckoutLine = {
  id: string;
  quantity: number;
  productVariant: ProductVariant;
};

export type AvatarParams = {
  gender?: Gender;
  emotion?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | number;
  clothing?: 'amber' | 'green' | 'blue' | 'teal' | 'pink' | 'violet';
};

export type Gender = 'MALE' | 'FEMALE' | 'UNKNOWN';

export type CountryCode =
  | 'AC'
  | 'AD'
  | 'AE'
  | 'AF'
  | 'AG'
  | 'AI'
  | 'AL'
  | 'AM'
  | 'AO'
  | 'AR'
  | 'AS'
  | 'AT'
  | 'AU'
  | 'AW'
  | 'AX'
  | 'AZ'
  | 'BA'
  | 'BB'
  | 'BD'
  | 'BE'
  | 'BF'
  | 'BG'
  | 'BH'
  | 'BI'
  | 'BJ'
  | 'BL'
  | 'BM'
  | 'BN'
  | 'BO'
  | 'BQ'
  | 'BR'
  | 'BS'
  | 'BT'
  | 'BW'
  | 'BY'
  | 'BZ'
  | 'CA'
  | 'CC'
  | 'CD'
  | 'CF'
  | 'CG'
  | 'CH'
  | 'CI'
  | 'CK'
  | 'CL'
  | 'CM'
  | 'CN'
  | 'CO'
  | 'CR'
  | 'CU'
  | 'CV'
  | 'CW'
  | 'CX'
  | 'CY'
  | 'CZ'
  | 'DE'
  | 'DJ'
  | 'DK'
  | 'DM'
  | 'DO'
  | 'DZ'
  | 'EC'
  | 'EE'
  | 'EG'
  | 'EH'
  | 'ER'
  | 'ES'
  | 'ET'
  | 'FI'
  | 'FJ'
  | 'FK'
  | 'FM'
  | 'FO'
  | 'FR'
  | 'GA'
  | 'GB'
  | 'GD'
  | 'GE'
  | 'GF'
  | 'GG'
  | 'GH'
  | 'GI'
  | 'GL'
  | 'GM'
  | 'GN'
  | 'GP'
  | 'GQ'
  | 'GR'
  | 'GT'
  | 'GU'
  | 'GW'
  | 'GY'
  | 'HK'
  | 'HN'
  | 'HR'
  | 'HT'
  | 'HU'
  | 'ID'
  | 'IE'
  | 'IL'
  | 'IM'
  | 'IN'
  | 'IO'
  | 'IQ'
  | 'IR'
  | 'IS'
  | 'IT'
  | 'JE'
  | 'JM'
  | 'JO'
  | 'JP'
  | 'KE'
  | 'KG'
  | 'KH'
  | 'KI'
  | 'KM'
  | 'KN'
  | 'KP'
  | 'KR'
  | 'KW'
  | 'KY'
  | 'KZ'
  | 'LA'
  | 'LB'
  | 'LC'
  | 'LI'
  | 'LK'
  | 'LR'
  | 'LS'
  | 'LT'
  | 'LU'
  | 'LV'
  | 'LY'
  | 'MA'
  | 'MC'
  | 'MD'
  | 'ME'
  | 'MF'
  | 'MG'
  | 'MH'
  | 'MK'
  | 'ML'
  | 'MM'
  | 'MN'
  | 'MO'
  | 'MP'
  | 'MQ'
  | 'MR'
  | 'MS'
  | 'MT'
  | 'MU'
  | 'MV'
  | 'MW'
  | 'MX'
  | 'MY'
  | 'MZ'
  | 'NA'
  | 'NC'
  | 'NE'
  | 'NF'
  | 'NG'
  | 'NI'
  | 'NL'
  | 'NO'
  | 'NP'
  | 'NR'
  | 'NU'
  | 'NZ'
  | 'OM'
  | 'PA'
  | 'PE'
  | 'PF'
  | 'PG'
  | 'PH'
  | 'PK'
  | 'PL'
  | 'PM'
  | 'PR'
  | 'PS'
  | 'PT'
  | 'PW'
  | 'PY'
  | 'QA'
  | 'RE'
  | 'RO'
  | 'RS'
  | 'RU'
  | 'RW'
  | 'SA'
  | 'SB'
  | 'SC'
  | 'SD'
  | 'SE'
  | 'SG'
  | 'SH'
  | 'SI'
  | 'SJ'
  | 'SK'
  | 'SL'
  | 'SM'
  | 'SN'
  | 'SO'
  | 'SR'
  | 'SS'
  | 'ST'
  | 'SV'
  | 'SX'
  | 'SY'
  | 'SZ'
  | 'TA'
  | 'TC'
  | 'TD'
  | 'TG'
  | 'TH'
  | 'TJ'
  | 'TK'
  | 'TL'
  | 'TM'
  | 'TN'
  | 'TO'
  | 'TR'
  | 'TT'
  | 'TV'
  | 'TW'
  | 'TZ'
  | 'UA'
  | 'UG'
  | 'US'
  | 'UY'
  | 'UZ'
  | 'VA'
  | 'VC'
  | 'VE'
  | 'VG'
  | 'VI'
  | 'VN'
  | 'VU'
  | 'WF'
  | 'WS'
  | 'XK'
  | 'YE'
  | 'YT'
  | 'ZA'
  | 'ZM'
  | 'ZW';
