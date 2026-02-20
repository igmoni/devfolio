const FreelanceText = () => {
  return (
    <div className="relative flex w-[180px] items-center gap-2 rounded-[6px] border border-emerald-300 bg-emerald-100/60 p-2 px-3 text-[12px] font-semibold text-emerald-700 dark:bg-emerald-500/10">
      {/* Pulse Animation */}
      <span className="relative inline-flex">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"></span>
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
      </span>

      <span className="absolute left-8 z-20 opacity-100">
        Available for freelance
      </span>
    </div>
  );
};

export default FreelanceText;
