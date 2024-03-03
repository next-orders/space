type LoyaltyProgressProps = {
  percent: number;
};

export const LoyaltyProgress = ({ percent }: LoyaltyProgressProps) => {
  if (percent < 16) percent = 16;
  if (percent > 100) percent = 100;

  return (
    <div className="relative w-full md:group-hover:scale-105 duration-300">
      <div className="relative w-32 h-5 mx-auto bg-zinc-50 rounded-xl drop-shadow-md md:hover:scale-125 duration-200">
        <div
          className="absolute bottom-0 left-0 h-5 bg-indigo-500 rounded-xl"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};
