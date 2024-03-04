import { Options } from '@dicebear/open-peeps';
import { StyleOptions } from '@dicebear/core';
import { PossibleAccessories, PossibleEmotion } from './avatar.types';

// 1 to 10
export const emotions: PossibleEmotion[] = [
  'rage',
  'veryAngry',
  'solemn',
  'tired',
  'serious',
  'eyesClosed',
  'smile',
  'calm',
  'eatingHappy',
  'lovingGrin1',
];

const possibleAccessories: PossibleAccessories[] = [
  'glasses',
  'glasses2',
  'glasses3',
  'glasses4',
  'glasses5',
  'sunglasses',
  'sunglasses2',
];

const allFaces: Options['face'] = [
  ...emotions,
  'suspicious',
  'contempt',
  'hectic',
  'driven',
  'smileTeethGap',
  'smileLOL',
  'smileBig',
  'lovingGrin2',
  'fear',
  'explaining',
  'cute',
  'concernedFear',
  'concerned',
  'cheeky',
  'blank',
  'awe',
];

const availableClothingColors = [
  { name: 'amber', color: 'fcd34d' },
  { name: 'green', color: '86efac' },
  { name: 'blue', color: '93c5fd' },
  { name: 'teal', color: '5eead4' },
  { name: 'pink', color: 'f9a8d4' },
  { name: 'violet', color: 'c4b5fd' },
];

const male: Partial<StyleOptions<Options>> = {
  head: [
    'afro', // unisex
    'dreads1', // unisex
    'dreads2', // unisex
    'hatHip', // unisex
    'flatTop',
    'flatTopLong',
    'grayShort',
    'hatBeanie',
    'mohawk',
    'mohawk2',
    'noHair1',
    'noHair2',
    'noHair3',
    'pomp',
    'shaved2',
    'shaved3',
    'short1',
    'short2',
    'short3',
    'short4',
    'short5',
    'twists',
    'twists2',
  ],
  facialHairProbability: 10,
  facialHair: [
    'chin',
    'full',
    'full2',
    'full3',
    'full4', // with color
    'goatee1',
    'goatee2',
    'moustache1',
    'moustache2',
    'moustache3',
    'moustache4',
    'moustache5',
    'moustache6',
    'moustache7',
    'moustache9', // with color
  ],
};

const female: Partial<StyleOptions<Options>> = {
  facialHairProbability: 0,
  head: [
    'afro', // unisex
    'dreads1', // unisex
    'dreads2', // unisex
    'hatHip', // unisex
    'bangs',
    'bangs2',
    'bantuKnots',
    'bun',
    'bun2',
    'buns',
    'cornrows',
    'cornrows2',
    'grayBun',
    'grayMedium',
    'long',
    'longBangs',
    'longCurly',
    'medium1',
    'medium2',
    'medium3',
    'mediumBangs',
    'mediumBangs2',
    'mediumBangs3',
    'mediumStraight',
    'shaved1',
  ],
};

export const getRandInteger = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;

export const choosePartsByGender = (gender: string | undefined) => {
  if (!gender) {
    const sexVariants = ['male', 'female'];
    const randomSex =
      sexVariants[Math.floor(Math.random() * sexVariants.length)];

    return randomSex === 'male' ? male : female;
  }

  if (gender.toLowerCase() === 'male') return male;
  if (gender.toLowerCase() === 'female') return female;
};

const chooseEmotionByNumber = (emotion: number | null) => {
  let emotionChosen: PossibleEmotion | null = null;

  if (emotion && emotion >= 1 && emotion <= 10) {
    emotionChosen = emotions[emotion - 1];
  }

  return emotionChosen;
};

export const chooseClothingColor = (clothing: string | null | undefined) => {
  const findClothingColor = availableClothingColors.find(
    (color) => color.name === clothing,
  );
  return findClothingColor ? [findClothingColor.color] : ['f4f4f5'];
};

export const getPossibleFaces = (emotion: number | null) => {
  const emotionChosen = chooseEmotionByNumber(emotion);
  return emotionChosen ? [emotionChosen] : allFaces;
};

export const getPossibleAccessories = () => {
  return possibleAccessories;
};

export const getPossibleSkinColors = () => {
  return ['fce5d3'];
};

export const clearSvg = (svg: string) => {
  return svg
    .replace(/<metadata.*?>.*?<\/metadata>/gi, '')
    .replace(/<desc.*?>.*?<\/desc>/gi, '');
};

export const generateHSL = () => {
  const background1 = [
    getRandInteger(0, 360),
    getRandInteger(60, 100),
    getRandInteger(75, 90),
  ];
  const background2 = [
    background1[0] - getRandInteger(25, 70),
    getRandInteger(60, 100),
    getRandInteger(75, 90),
  ];

  const backgroundColor1 = `hsl(${background1[0]}deg ${background1[1]}% ${background1[2]}%)`;
  const backgroundColor2 = `hsl(${background2[0]}deg ${background2[1]}% ${background2[2]}%)`;

  return [backgroundColor1, backgroundColor2];
};
