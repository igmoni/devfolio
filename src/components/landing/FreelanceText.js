const FreelanceText = () => {
    return (
        <div className="
            bg-emerald-100/60 
            dark:bg-emerald-500/10  
            border border-emerald-300  
            flex w-[180px] relative text-[12px] items-center 
            p-2 gap-2 text-emerald-700 font-semibold rounded-[6px] px-3
        ">
            {/* Pulse Animation */}
            <span className="relative inline-flex ">
                <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-500 opacity-75 animate-ping"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>

            <span className="absolute opacity-100 left-8 z-20">Available for freelance</span>
        </div>
    );
};

export default FreelanceText;
