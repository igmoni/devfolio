
 const FreelanceText = () => {
    return (
        <div className="bg-[#3a9502]/60 dark:bg-[#3a9502]/20 flex w-[180px] relative text-[12px] items-center p-2 gap-2 text-white font-semibold rounded-[6px] px-3">

            {/* Pulse Animation */}
            <span className="relative inline-flex ">
                <span className="absolute inline-flex w-full h-full rounded-full bg-[#4ADE80] opacity-75 animate-ping"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4ADE80]"></span>
            </span>

            <span className="absolute left-8 z-20">Available for freelance</span>
        </div>
    );
};

export default FreelanceText;