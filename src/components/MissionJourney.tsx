"use client";

const imgGurudev = "/gurudev.png";
const imgSwaroopananda = "/swamiji.png";

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
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full object-contain opacity-20 text-[#ba324f]">
                <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8.13,20C11,20 13.85,18.84 15.91,16.78C18.97,13.72 20.13,9.54 18.94,5.46L19.5,4L18.1,3.46C14,2.27 9.83,3.43 6.77,6.49C4.71,8.55 3.55,11.39 3.55,14.26C3.55,14.75 3.68,15.24 3.85,15.73L1.5,16.4L2.2,18.28C7.38,16.2 13.55,14.1 15.5,5.21C15.5,5.21 15.5,5.21 15.5,5.21C8.79,6.46 3,11.75 3,18C3,18.83 3.1,19.64 3.29,20.42C2.1,18.57 2,16.14 3.03,13.5C3.58,12.1 4.5,10.87 5.66,9.87C7.5,10.61 8.94,11.95 9.77,13.58C11,16 11,18.5 10.5,20.5C12.5,20 14.5,18.5 16,16.5C17.5,14.5 18,12 17,8Z" />
              </svg>
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
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full object-contain opacity-20 text-[#ba324f]">
                <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8.13,20C11,20 13.85,18.84 15.91,16.78C18.97,13.72 20.13,9.54 18.94,5.46L19.5,4L18.1,3.46C14,2.27 9.83,3.43 6.77,6.49C4.71,8.55 3.55,11.39 3.55,14.26C3.55,14.75 3.68,15.24 3.85,15.73L1.5,16.4L2.2,18.28C7.38,16.2 13.55,14.1 15.5,5.21C15.5,5.21 15.5,5.21 15.5,5.21C8.79,6.46 3,11.75 3,18C3,18.83 3.1,19.64 3.29,20.42C2.1,18.57 2,16.14 3.03,13.5C3.58,12.1 4.5,10.87 5.66,9.87C7.5,10.61 8.94,11.95 9.77,13.58C11,16 11,18.5 10.5,20.5C12.5,20 14.5,18.5 16,16.5C17.5,14.5 18,12 17,8Z" />
              </svg>
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
