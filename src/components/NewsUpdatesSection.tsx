const universityImage =
  "https://shut-same-76837773.figma.site/_assets/v11/821bd6fd6054433a98fc0662a0b94d1c8926d434.png";
const maltaImage =
  "https://shut-same-76837773.figma.site/_assets/v11/2bd6526e412158a35521a5178d022c9b7178303a.png";
const jagrutiImage =
  "https://shut-same-76837773.figma.site/_assets/v11/42b4f6d5d4330dbd1478aaa466cab6f971d10493.png";
const gangaAartiImage =
  "https://shut-same-76837773.figma.site/_assets/v11/b0e7912ebcbea7ef20e241506580e55d83884a76.png";
const gloryOfHanumanImage =
  "https://shut-same-76837773.figma.site/_assets/v11/89c8a4ed5608b03de9acc43379f831bb31e4cf1a.png";
const mahaHavanImage =
  "https://shut-same-76837773.figma.site/_assets/v11/b79a1296242bd599398f73a5bbd6ab81a3c0dfd8.png";

const tentpoleEvents = [
  {
    date: "September 2026",
    title: "Ganga Aarti on the Thames",
    body: "For the first time, we will invoke the Ganga in the heart of London. Sacred lights on the Thames. Aarti by the river. A moment where tradition meets the capital.",
    image: gangaAartiImage,
    alt: "Ganga Aarti on the Thames",
  },
  {
    date: "September 2026",
    title: "The Glory of Hanuman",
    subtitle: "A Series of Talks by Swami Swaroopananda, Global Head of Chinmaya Mission",
    body: "Swamiji will be in the UK delivering a powerful series on Hanuman - exploring devotion, strength, service and spiritual courage in a modern context.",
    image: gloryOfHanumanImage,
    alt: "The Glory of Hanuman",
  },
  {
    date: "20 September 2026",
    title: "Hanuman Chalisa Maha Havan",
    body: "In a vast London venue, we will light 108 havan kunds. Families and communities from across the country will gather around sacred fire in collective prayer.",
    image: mahaHavanImage,
    alt: "Hanuman Chalisa Maha Havan",
  },
];

export default function NewsUpdatesSection() {
  return (
    <section className="w-full max-w-[1277px] mx-auto px-4">
      <div className="rounded-[28px] bg-gradient-to-b from-[#fff9f1] to-[#fff3f6] border border-[#ffe5d2] p-6 md:p-10 lg:p-14">
        <div className="text-center max-w-[860px] mx-auto">
          <p className="font-lexend text-[12px] md:text-[13px] uppercase tracking-[0.24em] text-[#e89117] mb-3">
            News & Updates
          </p>
          <h2 className="font-philosopher font-bold text-[34px] md:text-[46px] leading-tight text-[#ba324f]">
            CM75: Four Months In - And The Momentum Is Building
          </h2>
          <p className="font-lexend text-[#5f5f5f] text-[15px] md:text-[18px] leading-relaxed mt-6">
            Less than four months into Chinmaya Mission&apos;s 75th year, CM75 has already moved beyond a commemorative milestone. It has become a movement.
          </p>
          <p className="font-lexend text-[#5f5f5f] text-[15px] md:text-[18px] leading-relaxed mt-3">
            Across campuses, communities and cities, something tangible is happening. Conversations are deepening. Youth are engaging. Families are stepping forward. Devotion is scaling.
          </p>
          <p className="font-lexend text-[#343434] text-[16px] md:text-[19px] font-medium mt-4">
            This is not anniversary activity. It is acceleration.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8">
          <article className="bg-white rounded-[22px] border border-[#f7dfca] p-6 md:p-8 shadow-[0px_8px_30px_rgba(186,50,79,0.08)]">
            <h3 className="font-philosopher text-[30px] md:text-[34px] text-[#ba324f] leading-tight">
              University Outreach: 270 Students Reached
            </h3>
            <p className="font-lexend text-[#525252] leading-relaxed mt-4">
              In partnership with NHSF, CM75 has reached 270 students across 20 campuses and youth centres in under four months.
            </p>
            <p className="font-lexend text-[#525252] leading-relaxed mt-3">
              From Imperial (35) and Loughborough (32) to Warwick (26) and Leicester Jagruti (23) - alongside Manchester, Leeds, Edinburgh, Oxford, Birmingham, UCL, LSE, Queen Mary, Brunel and more - the Bhagavad Gita has entered honest dialogue.
            </p>
            <img
              src={universityImage}
              alt="20 Universities reached across the UK"
              className="w-full h-auto rounded-[16px] mt-6"
              loading="lazy"
            />
            <p className="font-lexend text-[#525252] leading-relaxed mt-5">
              Students have asked difficult questions. They have debated destiny, duty and happiness. They have stayed back after sessions.
            </p>
            <p className="font-lexend text-[#3f3f3f] leading-relaxed mt-3 font-medium">
              The Gita is not being delivered as philosophy. It is being explored as guidance.
            </p>
          </article>

          <article className="bg-white rounded-[22px] border border-[#f7dfca] p-6 md:p-8 shadow-[0px_8px_30px_rgba(232,145,23,0.08)]">
            <h3 className="font-philosopher text-[30px] md:text-[34px] text-[#ba324f] leading-tight">
              A Growing National and Global Footprint
            </h3>
            <p className="font-lexend text-[#525252] leading-relaxed mt-4">
              The Yatra has travelled beyond lecture halls - reaching mandirs, embassies and communities across the UK and Europe.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <img
                src={maltaImage}
                alt="Malta Yatra - Celebrating 75 Years"
                className="w-full h-auto rounded-[16px]"
                loading="lazy"
              />
              <img
                src={jagrutiImage}
                alt="From Leeds to Lincoln - Regional Jagrutis"
                className="w-full h-auto rounded-[16px]"
                loading="lazy"
              />
            </div>
            <p className="font-lexend text-[#525252] leading-relaxed mt-5">
              Sweden. Malta. Regional Jagrutis. What we are witnessing is widening ownership.
            </p>
            <p className="font-lexend text-[#3f3f3f] leading-relaxed mt-3 font-medium">
              CM75 is not centralised. It is spreading.
            </p>
          </article>
        </div>

        <div className="mt-12 md:mt-14 text-center max-w-[900px] mx-auto">
          <h3 className="font-philosopher text-[32px] md:text-[42px] text-[#ba324f] leading-tight">
            TENTPOLE EVENTS: September 2026
          </h3>
          <p className="font-lexend text-[#5f5f5f] text-[15px] md:text-[18px] leading-relaxed mt-4">
            As momentum builds, three major national moments are emerging - gatherings that reflect the scale and spirit of this 75th year.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
          {tentpoleEvents.map((event) => (
            <article
              key={event.title}
              className="bg-white rounded-[22px] border border-[#f7dfca] overflow-hidden shadow-[0px_10px_30px_rgba(0,0,0,0.06)]"
            >
              <img src={event.image} alt={event.alt} className="w-full h-[230px] object-cover" loading="lazy" />
              <div className="p-6">
                <p className="font-lexend text-[#e89117] uppercase text-[12px] tracking-[0.18em]">
                  {event.date}
                </p>
                <h4 className="font-philosopher text-[30px] leading-tight text-[#ba324f] mt-2">
                  {event.title}
                </h4>
                {event.subtitle && (
                  <p className="font-lexend text-[#454545] text-[14px] leading-relaxed mt-3 font-medium">
                    {event.subtitle}
                  </p>
                )}
                <p className="font-lexend text-[#5f5f5f] leading-relaxed mt-3">{event.body}</p>
              </div>
            </article>
          ))}
        </div>

        <article className="mt-12 bg-white rounded-[22px] border border-[#f7dfca] p-6 md:p-8 shadow-[0px_8px_30px_rgba(186,50,79,0.06)]">
          <h3 className="font-philosopher text-[30px] md:text-[36px] text-[#ba324f] leading-tight">
            What These Four Months Tell Us
          </h3>
          <p className="font-lexend text-[#525252] leading-relaxed mt-4">
            The first chapter of CM75 has revealed something important.
          </p>
          <p className="font-lexend text-[#525252] leading-relaxed mt-3">
            When youth are invited into enquiry, they respond. When devotion is made collective, it multiplies. When communities are trusted to step forward, they do.
          </p>
          <p className="font-lexend text-[#3f3f3f] leading-relaxed mt-4 font-medium">CM75 is not slowing down.</p>
          <p className="font-lexend text-[#3f3f3f] leading-relaxed mt-1 font-medium">It is gathering strength.</p>
          <p className="font-lexend text-[#525252] leading-relaxed mt-4">
            And if the first four months are any indication, the months ahead will not just mark 75 years - they will define how we carry the next 75 forward.
          </p>
        </article>
      </div>
    </section>
  );
}
