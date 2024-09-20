declare global {
  type BackgroundType = 'solid' | 'gradientLinear'

  interface Options {
    seed?: string
    flip?: boolean
    rotate?: number
    scale?: number
    radius?: number
    size?: number
    backgroundColor?: string[]
    backgroundType?: BackgroundType[]
    backgroundRotation?: number[]
    translateX?: number
    translateY?: number
    clip?: boolean
    randomizeIds?: boolean
    head?: (
      | 'afro'
      | 'bangs'
      | 'bangs2'
      | 'bantuKnots'
      | 'bear'
      | 'bun'
      | 'bun2'
      | 'buns'
      | 'cornrows'
      | 'cornrows2'
      | 'dreads1'
      | 'dreads2'
      | 'flatTop'
      | 'flatTopLong'
      | 'grayBun'
      | 'grayMedium'
      | 'grayShort'
      | 'hatBeanie'
      | 'hatHip'
      | 'hijab'
      | 'long'
      | 'longAfro'
      | 'longBangs'
      | 'longCurly'
      | 'medium1'
      | 'medium2'
      | 'medium3'
      | 'mediumBangs'
      | 'mediumBangs2'
      | 'mediumBangs3'
      | 'mediumStraight'
      | 'mohawk'
      | 'mohawk2'
      | 'noHair1'
      | 'noHair2'
      | 'noHair3'
      | 'pomp'
      | 'shaved1'
      | 'shaved2'
      | 'shaved3'
      | 'short1'
      | 'short2'
      | 'short3'
      | 'short4'
      | 'short5'
      | 'turban'
      | 'twists'
      | 'twists2'
    )[]
    face?: (
      | 'angryWithFang'
      | 'awe'
      | 'blank'
      | 'calm'
      | 'cheeky'
      | 'concerned'
      | 'concernedFear'
      | 'contempt'
      | 'cute'
      | 'cyclops'
      | 'driven'
      | 'eatingHappy'
      | 'explaining'
      | 'eyesClosed'
      | 'fear'
      | 'hectic'
      | 'lovingGrin1'
      | 'lovingGrin2'
      | 'monster'
      | 'old'
      | 'rage'
      | 'serious'
      | 'smile'
      | 'smileBig'
      | 'smileLOL'
      | 'smileTeethGap'
      | 'solemn'
      | 'suspicious'
      | 'tired'
      | 'veryAngry'
    )[]
    facialHair?: (
      | 'chin'
      | 'full'
      | 'full2'
      | 'full3'
      | 'full4'
      | 'goatee1'
      | 'goatee2'
      | 'moustache1'
      | 'moustache2'
      | 'moustache3'
      | 'moustache4'
      | 'moustache5'
      | 'moustache6'
      | 'moustache7'
      | 'moustache8'
      | 'moustache9'
    )[]
    facialHairProbability?: number
    mask?: ('medicalMask' | 'respirator')[]
    maskProbability?: number
    accessories?: (
      | 'eyepatch'
      | 'glasses'
      | 'glasses2'
      | 'glasses3'
      | 'glasses4'
      | 'glasses5'
      | 'sunglasses'
      | 'sunglasses2'
    )[]
    accessoriesProbability?: number
    skinColor?: string[]
    clothingColor?: string[]
    headContrastColor?: string[]
  }

  type PossibleEmotion =
    | 'rage'
    | 'veryAngry'
    | 'solemn'
    | 'tired'
    | 'serious'
    | 'eyesClosed'
    | 'smile'
    | 'calm'
    | 'eatingHappy'
    | 'lovingGrin1'

 type PossibleAccessories =
   | 'glasses'
   | 'glasses2'
   | 'glasses3'
   | 'glasses4'
   | 'glasses5'
   | 'sunglasses'
   | 'sunglasses2'

 interface AvatarParams {
   gender?: Gender
   emotion?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | number
   clothing?: 'amber' | 'green' | 'blue' | 'teal' | 'pink' | 'violet'
 }

 type Gender = 'MALE' | 'FEMALE' | 'UNKNOWN'
}

export {}
