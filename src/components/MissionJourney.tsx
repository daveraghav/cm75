"use client";

const imgGurudev = "/gurudev.png";
const imgSwaroopananda = "/swamiji.png";
const imgLeaf = "https://www.figma.com/api/mcp/asset/1cc77d07-d58d-45ea-939f-66cd0f9cc1b5";

export default function MissionJourney() {
  return (
    <section className="w-full max-w-[1277px] mx-auto py-16 px-4">
      <h2 className="text-[40px] md:text-[48px] font-bold font-philosopher text-[#ba324f] text-center mb-16">
        The Journey of Chinmaya Mission
      </h2>

      <div className="flex flex-col gap-16 md:gap-24">
        {/* Section 1: Gurudev */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="w-full lg:w-[682px] bg-[#fdf1f4] p-8 md:p-10 rounded-[20px] order-2 lg:order-1">
            <h3 className="text-[28px] md:text-[32px] font-bold font-philosopher text-[#323232] mb-5">
              Pujya Gurudev Swami Chinmayananda
            </h3>
            <div className="space-y-4 text-[16px] md:text-[18px] font-light font-lexend text-[#606060] leading-[1.5]">
              <p>
                Born of Pujya Gurudev Swami Chinmayananda’s fearless clarity and compassionate vision, the Chinmaya Movement has taken the eternal wisdom of Vedanta across the world. A Yuga Purusha, a sage of all times, Pujya Gurudev gave voice to the silent truths of the scriptures and made them accessible to all, stirring a culture to an awakening.
              </p>
              <p>
                Chinmaya devotees are uniting worldwide - through signature festivals, spiritual initiatives, cultural offerings, Centre-led events, and global online offerings.
              </p>
            </div>
          </div>
          <div className="relative order-1 lg:order-2">
            <div className="absolute -top-10 -right-10 w-24 h-24 hidden lg:block">
              <img src={imgLeaf} alt="" className="w-full h-full object-contain opacity-20" />
            </div>
            <div className="w-full max-w-[300px] md:max-w-[400px]">
              <img
                src={imgGurudev}
                alt="Pujya Gurudev Swami Chinmayananda"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Swaroopananda */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="relative order-1">
            <div className="absolute -bottom-10 -left-10 w-24 h-24 hidden lg:block rotate-180">
              <img src={imgLeaf} alt="" className="w-full h-full object-contain opacity-20" />
            </div>
            <div className="w-full max-w-[300px] md:max-w-[400px]">
              <img
                src={imgSwaroopananda}
                alt="Swami Swaroopananda"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
          <div className="w-full lg:w-[682px] bg-[#fdf1f4] p-8 md:p-10 rounded-[20px] order-2">
            <h3 className="text-[28px] md:text-[32px] font-bold font-philosopher text-[#323232] mb-5">
              Swami Swaroopananda - Global Head
            </h3>
            <div className="text-[16px] md:text-[18px] font-light font-lexend text-[#606060] leading-[1.5]">
              <p>
                In the light of the Guru, the darkness fades; in the grace of the Gita, the soul awakens. The Chinmaya Movement is not just a legacy, but a living flame that continues to illuminate our hearts and guide us on the path of eternal bliss.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
