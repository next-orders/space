import {
  IconCircleFilled,
  IconHexagonFilled,
  IconPentagonFilled,
  IconSquareRotatedFilled,
  IconTriangleFilled,
} from '@tabler/icons-react';

type LevelBadgeProps = {
  level: number;
  size: 'sm' | 'md' | 'lg' | 'xl';
};

export const LevelBadge = ({ level, size }: LevelBadgeProps) => {
  let textLeft;
  let textSize;
  let widthAndHeight = '';

  if (size === 'sm') {
    textLeft = 'pl-[0.1rem]';
    textSize = 'text-[0.9rem]';
    widthAndHeight = 'w-8 h-8';
  }
  if (size === 'md') {
    textLeft = 'pl-[0.2rem]';
    textSize = 'text-[1.4rem]';
    widthAndHeight = 'w-12 h-12';
  }
  if (size === 'lg') {
    textLeft = 'pl-[0.3rem]';
    textSize = 'text-[1.9rem]';
    widthAndHeight = 'w-16 h-16';
  }
  if (size === 'xl') {
    textLeft = 'pl-[0.4rem]';
    textSize = 'text-[2.4rem]';
    widthAndHeight = 'w-20 h-20';
  }

  const icon = getIconByLevel(level, widthAndHeight);

  return (
    <div className={`relative cursor-default ${widthAndHeight}`}>
      {icon}
      <div
        className={`absolute bottom-1 left-1 ${textLeft} ${textSize} text-white font-semibold leading-normal tracking-tight`}
      >
        {level}
      </div>
    </div>
  );
};

const getIconByLevel = (level: number, widthAndHeight: string) => {
  if (level < 10) {
    return (
      <IconCircleFilled
        className={`absolute bottom-0 left-0 drop-shadow-md text-amber-400 ${widthAndHeight}`}
      />
    );
  }
  if (level < 20) {
    return (
      <IconTriangleFilled
        className={`absolute bottom-0 left-0 drop-shadow-md text-green-400 ${widthAndHeight}`}
      />
    );
  }
  if (level < 30) {
    return (
      <IconSquareRotatedFilled
        className={`absolute bottom-0 left-0 drop-shadow-md text-blue-400 ${widthAndHeight}`}
      />
    );
  }
  if (level < 40) {
    return (
      <IconPentagonFilled
        className={`absolute bottom-0 left-0 drop-shadow-md text-teal-400 ${widthAndHeight}`}
      />
    );
  }
  if (level < 50) {
    return (
      <IconHexagonFilled
        className={`absolute bottom-0 left-0 drop-shadow-md text-pink-400 ${widthAndHeight}`}
      />
    );
  }

  return (
    <IconHexagonFilled
      className={`absolute bottom-0 left-0 drop-shadow-md text-violet-400 ${widthAndHeight}`}
    />
  );
};
