import Image from "next/image";

export default function StatsSection() {
    return (
        <div className="w-full flex flex-col items-center justify-center py-12 px-4 overflow-visible">
            {/* Header Content with Background Pattern */}
            <div className="relative w-full flex flex-col items-center justify-center pt-12 md:pt-16 pb-12 mb-4">
                {/* Background Mandala Image */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[1200px] pointer-events-none z-0 flex justify-center items-center">
                    <Image
                        src="/stats_header_background.png"
                        alt="Background Mandala"
                        width={1200}
                        height={800}
                        className="w-[800px] md:w-[1200px] object-contain opacity-90 md:opacity-100"
                        priority
                    />
                </div>

                <div className="text-center w-full z-10">
                    <h2 className="text-[28px] md:text-[44px] lg:text-[52px] font-bold text-[#ba324f] !font-philosopher leading-tight tracking-wide whitespace-nowrap mx-auto">
                        75 Years. Infinite Reach. One Movement.
                    </h2>
                    <p className="text-[#646464] text-[16px] md:text-[18px] max-w-[800px] mx-auto !font-lexend mt-6 leading-relaxed whitespace-normal px-4 md:px-0">
                        From a single spark of vision to a global force for spiritual upliftment — explore the journey,
                        legacy, and impact of the Chinmaya Movement through an interactive, live timeline.
                    </p>
                </div>
            </div>

            {/* Stats Image */}
            <div className="w-full max-w-[1100px] mx-auto mb-16 relative z-10 flex justify-center">
                <Image
                    src="/stats.png"
                    alt="Impact Statistics"
                    width={1277}
                    height={400}
                    className="w-full h-auto object-contain"
                    priority
                />
            </div>


        </div>
    );
}
