import { Controller, Get, Header, Param, Query } from '@nestjs/common';
import {
  chooseClothingColor,
  choosePartsByGender,
  clearSvg,
  generateHSL,
  getPossibleAccessories,
  getPossibleFaces,
  getPossibleSkinColors,
} from './avatar.helpers';
import { Public } from '../auth/auth.decorator';
import { Options } from './avatar.types';

const dynamicImport = async (packageName: string) =>
  new Function(`return import('${packageName}')`)();

@Controller('avatar')
export class AvatarController {
  @Public()
  @Header('Cache-Control', 'max-age=31536000, public')
  @Header('Etag', 'static')
  @Header('Content-Type', 'image/svg+xml')
  @Get(':seed')
  async generateSVGAvatar(
    @Param('seed') seed: string,
    @Query('gender') gender: string,
    @Query('size') size: string,
    @Query('emotion') emotion: string,
    @Query('clothing') clothing: string,
  ) {
    const sizeNumber = size ? Number(size) : 150;
    const emotionNumber = emotion ? Number(emotion) : null;

    const options: Partial<Options> = {
      seed,
      size: sizeNumber,
      scale: 80,
      translateX: -5,
      accessoriesProbability: 20,
      maskProbability: 0,
      face: getPossibleFaces(emotionNumber),
      accessories: getPossibleAccessories(),
      skinColor: getPossibleSkinColors(),
      clothingColor: chooseClothingColor(clothing),
      ...choosePartsByGender(gender),
    };

    const openPeeps = await dynamicImport('@dicebear/open-peeps');
    const { createAvatar } = await dynamicImport('@dicebear/core');

    const svg = createAvatar(openPeeps, options).toString();

    // Dynamic Background
    const [backgroundColor1, backgroundColor2] = generateHSL();

    const gradient = `
    <linearGradient id="linear-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop stop-color="${backgroundColor1}" />
      <stop offset="1" stop-color="${backgroundColor2}"/>
    </linearGradient>
    <rect xmlns="http://www.w3.org/2000/svg" fill="url(#linear-gradient)" width="704" height="704" x="0" y="0"/>`;

    const svgWithBackground = svg.replace(/<g transform/, `${gradient} $&`);
    return clearSvg(svgWithBackground);
  }
}
