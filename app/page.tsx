import HeroImage from "./hero-image";

/* =====================================================================
   DATA & KONSTANTA
   ===================================================================== */

const FORM_URL = "https://forms.gle/mYapuqZB98YUnT7Q8";
const HERO_IMAGE = "/images/banner.jpg";

type Theme = "green" | "maroon";

type Tier = {
  id: string;
  badge: string;
  name: string;
  price: string;
  theme: Theme;
  vip?: boolean;
  perks: string[];
  note?: string;
};

const THEMES: Record<
  Theme,
  {
    border: string;
    text: string;
    badge: string;
    btn: string;
    tint: string;
    ring: string;
    noteBox: string;
    tumpal: string;
  }
> = {
  green: {
    border: "border-[#1f3423]",
    text: "text-[#1f3423]",
    badge: "bg-[#2e4a34]",
    btn: "bg-[#1f3423]",
    tint: "bg-[#1f3423]/10",
    ring: "ring-[#1f3423]/25",
    noteBox: "border-[#1f3423]/40 bg-[#1f3423]/[.07]",
    tumpal: "tumpal green",
  },

  maroon: {
    border: "border-[#6a1620]",
    text: "text-[#6a1620]",
    badge: "bg-[#8c1f2b]",
    btn: "bg-[#6a1620]",
    tint: "bg-[#6a1620]/10",
    ring: "ring-[#6a1620]/25",
    noteBox: "border-[#6a1620]/40 bg-[#6a1620]/[.07]",
    tumpal: "tumpal",
  },
};

const TIERS: Tier[] = [
  {
    id: "nyok",
    badge: "Regular",
    name: "Nyok",
    price: "7",
    theme: "green",
    perks: ["Mineral water", "Snack"],
    note: "Benefits for the first 200 people only.",
  },

  {
    id: "amprok",
    badge: "VIP",
    name: "Amprok",
    price: "10",
    theme: "maroon",
    vip: true,
    perks: [
      "Snack",
      "Mineral water",
      "Merchandise",
    ],
  },
];

const GLOSSARY = [
  { term: "Nyok", meaning: "let's go!" },
  { term: "Amprok", meaning: "meet / bump into" },
];

const ACCENT = "text-[#FFFFFF]";

/* =====================================================================
   ICONS
   ===================================================================== */

function TicketIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M4 6h16a1 1 0 0 1 1 1v3a2 2 0 0 0 0 4v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-3a2 2 0 0 0 0-4V7a1 1 0 0 1 1-1z" />
      <path d="M14 7.5v9" strokeDasharray="2 2.2" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M5.5 10.5l3 3 6-7" />
    </svg>
  );
}

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className={className}
      aria-hidden
    >
      <circle cx="10" cy="10" r="8" />
      <path d="M10 9v5" />
      <circle cx="10" cy="6.2" r=".6" fill="currentColor" />
    </svg>
  );
}

/* =====================================================================
   AVATAR
   ===================================================================== */

function Avatar({ tier }: { tier: Tier }) {
  const t = THEMES[tier.theme];

  return (
    <div
      className={`relative h-[76px] w-[76px] shrink-0 overflow-hidden rounded-full ring-2 lg:h-24 lg:w-24 ${t.tint} ${t.ring}`}
    >
      <svg
        viewBox="0 0 100 100"
        className={`h-full w-full ${t.text}`}
        aria-hidden
      >
        <circle cx="50" cy="47" r="16" fill="#f1d3ad" />

        {tier.vip && (
          <path d="M37 36L34 21l9 7 7-12 7 12 9-7-3 15z" fill="currentColor" />
        )}

        <path d="M14 100c2-22 14-32 36-32s34 10 36 32z" fill="currentColor" />
      </svg>
    </div>
  );
}

/* =====================================================================
   TICKET CARD
   ===================================================================== */

function TicketCard({ tier }: { tier: Tier }) {
  const t = THEMES[tier.theme];

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-3xl border-2 bg-[#f6f0df] shadow-[0_22px_44px_-22px_rgba(0,0,0,.85)] transition duration-300 md:hover:-translate-y-1 ${t.border}`}
    >
      <div className={t.tumpal} />

      <div className="flex flex-1 flex-col gap-5 p-5 lg:p-7">
        <div className="flex items-center gap-4 lg:gap-5">
          <Avatar tier={tier} />

          <div className="min-w-0">
            <span
              className={`inline-block rounded-full px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-[.12em] text-[#f6f0df] sm:text-xs ${t.badge}`}
            >
              {tier.badge}
            </span>

            <h3
              className={`mt-2 text-[36px] font-black leading-none lg:text-[42px] ${t.text}`}
            >
              {tier.name}
            </h3>
          </div>
        </div>

        <ul className="space-y-3 text-[15px] font-semibold leading-snug text-[#4a3d2c] sm:text-base">
          {tier.perks.map((perk) => (
            <li key={perk} className="flex items-start gap-3">
              <span
                className={`mt-px grid h-5 w-5 shrink-0 place-items-center rounded-full text-[#f6f0df] ${t.badge}`}
              >
                <CheckIcon className="h-3 w-3" />
              </span>

              {perk}
            </li>
          ))}
        </ul>

        {tier.note && (
          <p
            className={`flex items-start gap-2 rounded-xl border border-dashed px-3.5 py-2.5 text-xs font-extrabold italic leading-snug sm:text-[13px] ${t.noteBox} ${t.text}`}
          >
            <InfoIcon className="mt-px h-4 w-4 shrink-0" />
            {tier.note}
          </p>
        )}
      </div>

      <div className="relative mt-auto">
        <div className="mx-5 border-t-2 border-dashed border-[#3a2c1e]/35 lg:mx-7" />

        <span className="absolute -left-3.5 -top-3.5 h-7 w-7 rounded-full bg-[#131211]" />
        <span className="absolute -right-3.5 -top-3.5 h-7 w-7 rounded-full bg-[#131211]" />
      </div>

      <div className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between lg:p-7">
        <div className="flex items-end justify-between gap-3 lg:block">
          <span className="text-[11px] font-extrabold uppercase tracking-[.2em] text-[#4a3d2c]/70">
            Price
          </span>

          <p className="flex items-baseline gap-1.5 text-[#2c2013] lg:mt-1">
            <span className="text-xl font-black lg:text-2xl">RM</span>

            <span className="text-[52px] font-black leading-none lg:text-6xl">
              {tier.price}
            </span>
          </p>
        </div>

        <a
          href={FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex min-h-[54px] w-full items-center justify-center gap-2.5 rounded-xl px-7 text-sm font-extrabold uppercase tracking-wide text-[#f6f0df] shadow-[0_4px_0_rgba(0,0,0,.25)] transition hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0.5 active:shadow-none lg:w-auto lg:min-w-[200px] ${t.btn}`}
        >
          <TicketIcon className="h-5 w-5" />
          Buy Ticket
        </a>
      </div>
    </article>
  );
}

/* =====================================================================
   HOME PAGE
   ===================================================================== */

export default function Home() {
  return (
    <main
      className="min-h-screen bg-[#131211] text-[#f6f0df]"
      style={{
        fontFamily: "var(--font-nunito, 'Nunito Sans'), system-ui, sans-serif",
      }}
    >
      <style>{`
        html {
          scroll-behavior: smooth;
          background: #131211;
        }

        body {
          background: #131211;
        }

        .tumpal {
          height: 10px;
          width: 100%;
          background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='10'%3E%3Cpath d='M0 0h20L10 10z' fill='%238c1f2b'/%3E%3C/svg%3E") repeat-x;
        }

        .tumpal.green {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='10'%3E%3Cpath d='M0 0h20L10 10z' fill='%231f3423'/%3E%3C/svg%3E");
        }

        .tumpal.flip {
          transform: scaleY(-1);
        }

        details > summary {
          list-style: none;
        }

        details > summary::-webkit-details-marker {
          display: none;
        }
      `}</style>

      {/* ===============================================================
          NAVBAR
          =============================================================== */}

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#131211]/90 backdrop-blur">
        <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:h-16 md:px-8">
          <a
            href="#home"
            className="text-lg font-black tracking-wide text-white"
          >
            PRI 2026
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            <li>
              <a
                href="#home"
                className="text-sm font-bold text-[#f6f0df]/80 transition hover:text-white"
              >
                Home
              </a>
            </li>

            <li>
              <a
                href="#tickets"
                className="text-sm font-bold text-[#f6f0df]/80 transition hover:text-white"
              >
                Tickets
              </a>
            </li>

            <li>
              <a
                href="#highlights"
                className="text-sm font-bold text-[#f6f0df]/80 transition hover:text-white"
              >
                Highlights
              </a>
            </li>

            <li>
              <a
                href="#contact"
                className="text-sm font-bold text-[#f6f0df]/80 transition hover:text-white"
              >
                Contact
              </a>
            </li>
          </ul>

          <a
            href="#tickets"
            className="hidden rounded-lg bg-[#6a1620] px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-[#f6f0df] shadow-[0_3px_0_rgba(0,0,0,.35)] transition hover:brightness-110 md:inline-block"
          >
            Get Tickets
          </a>

          <details className="group md:hidden">
            <summary
              className="flex h-10 w-10 cursor-pointer flex-col items-center justify-center gap-1.5"
              aria-label="Menu"
            >
              <span className="h-0.5 w-6 bg-[#f6f0df] transition group-open:translate-y-2 group-open:rotate-45" />
              <span className="h-0.5 w-6 bg-[#f6f0df] transition group-open:opacity-0" />
              <span className="h-0.5 w-6 bg-[#f6f0df] transition group-open:-translate-y-2 group-open:-rotate-45" />
            </summary>

            <ul className="absolute left-0 right-0 top-14 border-b border-white/10 bg-[#131211] px-4 pb-4">
              <li>
                <a
                  href="#home"
                  className="block border-b border-dashed border-white/10 py-3 text-sm font-bold"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="#tickets"
                  className="block border-b border-dashed border-white/10 py-3 text-sm font-bold"
                >
                  Tickets
                </a>
              </li>

              <li>
                <a
                  href="#highlights"
                  className="block border-b border-dashed border-white/10 py-3 text-sm font-bold"
                >
                  Highlights
                </a>
              </li>

              <li>
                <a href="#contact" className="block py-3 text-sm font-bold">
                  Contact
                </a>
              </li>
            </ul>
          </details>
        </nav>
      </header>

      <section
        id="home"
        className="scroll-mt-16 px-3 pb-10 pt-5 md:px-8 md:pb-16 md:pt-10"
      >
        {" "}
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl border-2 border-[#6a1620] bg-[#f6f0df]">
          {" "}
          <div className="tumpal" /> {/* Lubang tiket desktop */}{" "}
          <span className="absolute -left-3.5 top-1/2 z-10 hidden h-7 w-7 -translate-y-1/2 rounded-full bg-[#131211] md:block" />{" "}
          <span className="absolute -right-3.5 top-1/2 z-10 hidden h-7 w-7 -translate-y-1/2 rounded-full bg-[#131211] md:block" />{" "}
          <div className="grid gap-5 p-4 md:grid-cols-2 md:gap-0 md:p-10">
            {" "}
            {/* ========================================================= IMAGE — TETAP DI KANAN ========================================================= */}{" "}
            <div className="order-1 flex items-center justify-center md:order-2 md:pl-8 lg:pl-10">
              {" "}
              <div
                role="img"
                aria-label="Road to Pesta Rakyat Indonesia 2026"
                className="relative aspect-[16/10.5] w-full max-w-[560px] overflow-hidden rounded-xl border-2 border-[#6a1620] bg-[linear-gradient(135deg,#6a1620,#8c1f2b_55%,#3a0d14)] shadow-[0_15px_35px_-20px_rgba(0,0,0,.7)]"
              >
                {" "}
                {/* Fallback kalau gambar gagal */}{" "}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-[#f6f0df]">
                  {" "}
                  <span className="text-[11px] font-extrabold uppercase tracking-[.3em] opacity-70">
                    {" "}
                    Road to{" "}
                  </span>{" "}
                  <span className="mt-1 text-5xl font-black leading-none md:text-6xl">
                    {" "}
                    PRI{" "}
                  </span>{" "}
                  <span className="text-3xl font-black leading-none opacity-90 md:text-4xl">
                    {" "}
                    2026{" "}
                  </span>{" "}
                </div>{" "}
                {/* IMAGE */} <HeroImage src={HERO_IMAGE} /> {/* Tumpal */}{" "}
                <div className="tumpal flip absolute inset-x-0 bottom-0 opacity-60" />{" "}
              </div>{" "}
            </div>{" "}
            {/* ========================================================= TEXT — TETAP DI KIRI ========================================================= */}{" "}
            <div className="order-2 flex flex-col justify-center border-t-2 border-dashed border-[#3a2c1e] pt-5 md:order-1 md:border-r-2 md:border-t-0 md:pr-10 md:pt-0">
              {" "}
              <span className="w-fit rounded-full bg-[#8c1f2b] px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-[.09em] text-[#f6f0df] md:text-xs">
                {" "}
                Universiti Utara Malaysia{" "}
              </span>{" "}
              <h1 className="mt-3 text-[34px] font-black leading-[1.05] text-[#2c2013] md:text-5xl lg:text-[56px]">
                {" "}
                Road to <span className="text-[#8c1f2b]">
                  {" "}
                  Pesta Rakyat{" "}
                </span>{" "}
                Indonesia 2026{" "}
              </h1>{" "}
              <p className="mt-3 max-w-md text-[13.5px] font-semibold leading-relaxed text-[#4a3d2c] md:text-base">
                {" "}
                Universiti Utara Malaysia&apos;s premier annual cultural
                showcase. High-energy performances, immersive storytelling, and
                the vibrant spirit of Indonesian students.{" "}
              </p>{" "}
              {/* Venue + Date */}{" "}
              <div className="mt-5 flex w-fit max-w-full overflow-hidden rounded-xl border-[1.5px] border-dashed border-[#3a2c1e]">
                {" "}
                <div className="px-4 py-2.5 md:px-5">
                  {" "}
                  <small className="block text-[9px] font-extrabold uppercase tracking-[.12em] text-[#4a3d2c]/75">
                    {" "}
                    Venue{" "}
                  </small>{" "}
                  <strong className="text-base font-black text-[#2c2013] md:text-lg">
                    {" "}
                    DTSO{" "}
                  </strong>{" "}
                </div>{" "}
                <div className="border-l-[1.5px] border-dashed border-[#3a2c1e] px-4 py-2.5 md:px-5">
                  {" "}
                  <small className="block text-[9px] font-extrabold uppercase tracking-[.12em] text-[#4a3d2c]/75">
                    {" "}
                    Date &amp; Time{" "}
                  </small>{" "}
                  <strong className="text-base font-black text-[#2c2013] md:text-lg">
                    {" "}
                    TBA{" "}
                  </strong>{" "}
                </div>{" "}
              </div>{" "}
              {/* Button */}{" "}
              <a
                href="#tickets"
                className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-[#6a1620] px-6 text-sm font-extrabold uppercase tracking-wide text-[#f6f0df] shadow-[0_4px_0_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:brightness-110 sm:w-fit"
              >
                {" "}
                <TicketIcon className="h-5 w-5" /> Get Your Tickets{" "}
              </a>{" "}
            </div>{" "}
          </div>{" "}
          <div className="tumpal flip" />{" "}
        </div>{" "}
      </section>

      {/* ===============================================================
          TICKETS
          =============================================================== */}

      <section
        id="tickets"
        className="relative scroll-mt-16 overflow-hidden px-3 py-14 md:px-8 md:py-24"
      >
        <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[min(92vw,760px)] -translate-x-1/2 rounded-full bg-[#8c1f2b]/25 blur-3xl" />

        <div className="relative mx-auto max-w-5xl">
          <div className="mx-auto mb-9 max-w-2xl text-center md:mb-14">
            <div className="flex items-center justify-center gap-3 text-[11px] font-extrabold uppercase tracking-[.2em] text-[#f6f0df] md:text-xs">
              <span className="h-px w-8 bg-[linear-gradient(to_right,transparent,#f6f0df)] md:w-12" />
              Presale Ticket
              <span className="h-px w-8 bg-[linear-gradient(to_left,transparent,#f6f0df)] md:w-12" />
            </div>

            <h2 className="mt-3 text-[32px] font-black leading-tight text-white md:text-5xl">
              Get Your Tickets
            </h2>

            <p className="mt-3 text-sm font-semibold text-[#f6f0df]/70 md:text-base">
              Don&apos;t miss the celebration. Grab your ticket now and be part
              of something special.
            </p>
          </div>

          <div className="mx-auto grid max-w-md gap-7 md:max-w-none md:grid-cols-2 md:gap-8">
            {TIERS.map((tier) => (
              <TicketCard key={tier.id} tier={tier} />
            ))}
          </div>
        </div>
      </section>

      {/* ===============================================================
          GLOSSARY
          =============================================================== */}

      <section className="px-3 pb-14 md:px-8 md:pb-24">
        <div className="mx-auto max-w-3xl rounded-2xl border border-dashed border-white/25 px-5 py-6 text-center">
          <h3 className="text-xs font-extrabold uppercase tracking-[.2em] text-[#f6f0df]/60">
            Glossary
          </h3>

          <ul className="mt-4 flex flex-wrap items-center justify-center gap-3">
            {GLOSSARY.map((g) => (
              <li
                key={g.term}
                className="rounded-full border border-dashed border-white/25 px-4 py-2 text-sm md:text-base"
              >
                <span
                  className={`font-black uppercase tracking-wide ${ACCENT}`}
                >
                  {g.term}
                </span>

                <span className="font-semibold text-[#f6f0df]/80">
                  {" "}
                  — {g.meaning}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===============================================================
          PAST PERFORMANCE
          =============================================================== */}

      <section
        id="highlights"
        className="scroll-mt-16 border-y border-dashed border-white/15 bg-black px-3 py-12 md:px-8 md:py-20"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-8 max-w-2xl text-center md:mb-12">
            <div className="flex items-center justify-center gap-3 text-[11px] font-extrabold uppercase tracking-[.2em] text-[#f6f0df] md:text-xs">
              <span className="h-px w-8 bg-[linear-gradient(to_right,transparent,#f6f0df)] md:w-12" />
              Look Back
              <span className="h-px w-8 bg-[linear-gradient(to_left,transparent,#f6f0df)] md:w-12" />
            </div>

            <h2 className="mt-3 text-3xl font-black text-white md:text-5xl">
              Past Performance Highlights
            </h2>

            <p className="mt-3 text-sm font-semibold text-[#f6f0df]/70 md:text-base">
              A glimpse of the stage, the music, and the stories from our
              previous celebration.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4 md:gap-6">
            {/* Kecak */}
            <article className="group overflow-hidden rounded-2xl border-2 border-[#6a1620] bg-[#f6f0df]">
              <div className="relative aspect-[4/3] overflow-hidden">
                <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#6a1620,#8c1f2b,#c2402f)]">
                  <img
                    src="/images/kecak.JPG"
                    alt="Indonesian student music showcase at Universiti Utara Malaysia"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="tumpal flip absolute inset-x-0 bottom-0" />
              </div>

              <div className="p-5">
                <h3 className="text-xl font-black text-[#6a1620] md:text-2xl">
                  Kecak dance showcase
                </h3>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span className="rounded-full border border-dashed border-[#3a2c1e] px-2.5 py-1 text-[11px] font-bold text-[#4a3d2c]">
                    Balinese Choral Dance
                  </span>
                  <span className="rounded-full border border-dashed border-[#3a2c1e] px-2.5 py-1 text-[11px] font-bold text-[#4a3d2c]">
                    Hypnotic Vocal Rhythm
                  </span>
                  <span className="rounded-full border border-dashed border-[#3a2c1e] px-2.5 py-1 text-[11px] font-bold text-[#4a3d2c]">
                    Ramayana Fire Dance
                  </span>
                  <span className="rounded-full border border-dashed border-[#3a2c1e] px-2.5 py-1 text-[11px] font-bold text-[#4a3d2c]">
                    Synchronized Cultural Performance
                  </span>
                </div>
              </div>
            </article>

            {/* Renjaka */}
            <article className="group overflow-hidden rounded-2xl border-2 border-[#6a1620] bg-[#f6f0df]">
              <div className="relative aspect-[4/3] overflow-hidden">
                <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#3b1230,#8a2a5b,#d9548a)]">
                  <img
                    src="/images/renjaka.JPG"
                    alt="Indonesian student music showcase at Universiti Utara Malaysia"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="tumpal flip absolute inset-x-0 bottom-0" />
              </div>

              <div className="p-5">
                <h3 className="text-xl font-black text-[#6a1620] md:text-2xl">
                  Renjaka music showcase
                </h3>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span className="rounded-full border border-dashed border-[#3a2c1e] px-2.5 py-1 text-[11px] font-bold text-[#4a3d2c]">
                    Live Music Session
                  </span>
                  <span className="rounded-full border border-dashed border-[#3a2c1e] px-2.5 py-1 text-[11px] font-bold text-[#4a3d2c]">
                    Sound of the Archipelago
                  </span>
                  <span className="rounded-full border border-dashed border-[#3a2c1e] px-2.5 py-1 text-[11px] font-bold text-[#4a3d2c]">
                    Acoustic Night
                  </span>
                  <span className="rounded-full border border-dashed border-[#3a2c1e] px-2.5 py-1 text-[11px] font-bold text-[#4a3d2c]">
                    Indie &amp; Heritage Beats
                  </span>
                </div>
              </div>
            </article>

            {/* Drama */}
            <article className="group overflow-hidden rounded-2xl border-2 border-[#6a1620] bg-[#f6f0df]">
              <div className="relative aspect-[4/3] overflow-hidden">
                <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#1f3423,#2e4a34,#6f9d73)]">
                  <img
                    src="/images/dramus.jpeg"
                    alt="Indonesian student music showcase at Universiti Utara Malaysia"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="tumpal flip absolute inset-x-0 bottom-0" />
              </div>

              <div className="p-5">
                <h3 className="text-xl font-black text-[#6a1620] md:text-2xl">
                  Drama musical showcase
                </h3>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span className="rounded-full border border-dashed border-[#3a2c1e] px-2.5 py-1 text-[11px] font-bold text-[#4a3d2c]">
                    Theatrical Storytelling
                  </span>
                  <span className="rounded-full border border-dashed border-[#3a2c1e] px-2.5 py-1 text-[11px] font-bold text-[#4a3d2c]">
                    Folklore Brought to Life
                  </span>
                  <span className="rounded-full border border-dashed border-[#3a2c1e] px-2.5 py-1 text-[11px] font-bold text-[#4a3d2c]">
                    Epic Musical Drama
                  </span>
                  <span className="rounded-full border border-dashed border-[#3a2c1e] px-2.5 py-1 text-[11px] font-bold text-[#4a3d2c]">
                    Broadway Nusantara Style
                  </span>
                  <span className="rounded-full border border-dashed border-[#3a2c1e] px-2.5 py-1 text-[11px] font-bold text-[#4a3d2c]">
                    Heritage on Stage
                  </span>
                </div>
              </div>
            </article>

            {/* Indonesian Student Music UKM */}
            <article className="group overflow-hidden rounded-2xl border-2 border-[#6a1620] bg-[#f6f0df]">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src="/images/ukm music.JPG"
                  alt="Indonesian student music showcase at Universiti Utara Malaysia"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                <div className="absolute inset-x-0 bottom-0">
                  <div className="tumpal flip" />
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-xl font-black text-[#6a1620] md:text-2xl">
                  Indonesian student music showcase
                </h3>

                {/* <p className="mt-2 text-sm font-semibold leading-relaxed text-[#4a3d2c]">
        A special performance by Indonesian students at UUM, featuring a
        diverse selection of Indonesian songs and contemporary musical styles.
      </p> */}

                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span className="rounded-full border border-dashed border-[#3a2c1e] px-2.5 py-1 text-[11px] font-bold text-[#4a3d2c]">
                    Indonesian Songs
                  </span>
                  <span className="rounded-full border border-dashed border-[#3a2c1e] px-2.5 py-1 text-[11px] font-bold text-[#4a3d2c]">
                    Student Performers
                  </span>
                  <span className="rounded-full border border-dashed border-[#3a2c1e] px-2.5 py-1 text-[11px] font-bold text-[#4a3d2c]">
                    Live Performance
                  </span>
                  <span className="rounded-full border border-dashed border-[#3a2c1e] px-2.5 py-1 text-[11px] font-bold text-[#4a3d2c]">
                    Indonesian Music
                  </span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Sponsors & Collaborators */}
      <section
        id="sponsors"
        className="scroll-mt-16 border-t-2 border-[#6a1620] bg-[#f6f0df] px-3 py-12 md:px-8 md:py-16"
      >
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            {/* <span className="inline-flex rounded-full bg-[#8c1f2b] px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-[.12em] text-[#f6f0df] md:text-xs">
              Together We Make It Happen
            </span> */}

            <h2 className="mt-3 text-3xl font-black text-[#2c2013] md:text-5xl">
               Sponsors &amp; Collaborators
            </h2>

            {/* <p className="mx-auto mt-3 max-w-2xl text-sm font-semibold leading-relaxed text-[#4a3d2c] md:text-base">
              Supported by organizations, communities, and partners who share
              our passion for Indonesian culture, creativity, and student life.
            </p> */}
          </div>

          <div className="mt-8 rounded-2xl border-2 border-[#6a1620] bg-[#fffaf0] p-4 shadow-[0_8px_25px_-18px_rgba(0,0,0,.5)] md:mt-10 md:p-8">
            <div className="grid grid-cols-2 items-center gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
              {/* Kachif */}
              <div className="flex h-28 items-center justify-center rounded-xl border border-dashed border-[#6a1620]/30 bg-[#f6f0df] p-4 transition hover:-translate-y-1 hover:shadow-md">
                <img
                  src="/images/kachif.png"
                  alt="Kachif"
                  className="max-h-20 w-full object-contain"
                />
              </div>

              {/* Kastara */}
              <div className="flex h-28 items-center justify-center rounded-xl border border-dashed border-[#6a1620]/30 bg-[#f6f0df] p-4 transition hover:-translate-y-1 hover:shadow-md">
                <img
                  src="/images/kastara.jpeg"
                  alt="Kastara"
                  className="max-h-20 w-full object-contain"
                />
              </div>

              {/* Kelab Muzik */}
              <div className="flex h-28 items-center justify-center rounded-xl border border-dashed border-[#6a1620]/30 bg-[#f6f0df] p-4 transition hover:-translate-y-1 hover:shadow-md">
                <img
                  src="/images/kelab-muzik.jpeg"
                  alt="Kelab Muzik"
                  className="max-h-20 w-full object-contain"
                />
              </div>

              {/* KJRI Penang */}
              <div className="flex h-28 items-center justify-center rounded-xl border border-dashed border-[#6a1620]/30 bg-[#f6f0df] p-4 transition hover:-translate-y-1 hover:shadow-md">
                <img
                  src="/images/kjri-penang.png"
                  alt="KJRI Penang"
                  className="max-h-20 w-full object-contain"
                />
              </div>

              {/* Malaya Roll */}
              <div className="flex h-28 items-center justify-center rounded-xl border border-dashed border-[#6a1620]/30 bg-[#f6f0df] p-4 transition hover:-translate-y-1 hover:shadow-md">
                <img
                  src="/images/malaya-roll.png"
                  alt="Malaya Roll"
                  className="max-h-20 w-full object-contain"
                />
              </div>

              {/* Music Addicts MY */}
              <div className="flex h-28 items-center justify-center rounded-xl border border-dashed border-[#6a1620]/30 bg-[#f6f0df] p-4 transition hover:-translate-y-1 hover:shadow-md">
                <img
                  src="/images/music-addicts-my.jpeg"
                  alt="Music Addicts MY"
                  className="max-h-20 w-full object-contain"
                />
              </div>

              {/* Pupuk Kaltim */}
              <div className="flex h-28 items-center justify-center rounded-xl border border-dashed border-[#6a1620]/30 bg-[#f6f0df] p-4 transition hover:-translate-y-1 hover:shadow-md">
                <img
                  src="/images/pupuk-kaltim.png"
                  alt="Pupuk Kaltim"
                  className="max-h-20 w-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===============================================================
          CONTACT
          =============================================================== */}

      <section
        id="contact"
        className="scroll-mt-16 px-3 py-12 md:px-8 md:py-20"
      >
        <div className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl border-2 border-[#6a1620] bg-[#f6f0df] text-center">
          <div className="tumpal" />

          <div className="px-5 py-8 md:px-10 md:py-10">
            <h2 className="text-2xl font-black text-[#2c2013] md:text-4xl">
              Contact us for more information!
            </h2>

            <p className="mt-2 text-sm font-semibold text-[#4a3d2c] md:text-base">
              Questions about tickets or the event? Reach out to us anytime.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/pestarakyatuum?igsi=MWdpcDZjamV3bml1bA=="
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-14 items-center justify-center gap-3 rounded-xl bg-[#6a1620] px-6 text-sm font-extrabold text-[#f6f0df] shadow-[0_4px_0_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:brightness-110"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="1"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
                @pestarakyatuum
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/60175693970"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-14 items-center justify-center gap-3 rounded-xl bg-[#1f3423] px-6 text-sm font-extrabold text-[#f6f0df] shadow-[0_4px_0_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:brightness-110"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M3 21l1.6-4.7A8.5 8.5 0 1 1 8 19.6L3 21z" />
                  <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1.2-1.4-2-1-.8.7a3.5 3.5 0 0 1-1.7-1.7l.7-.8-1-2L9 9.5z" />
                </svg>
                +60 17-569 3970
              </a>
            </div>
          </div>

          <div className="tumpal flip" />
        </div>
      </section>

      {/* ===============================================================
          FOOTER
          =============================================================== */}

      <footer className="border-t border-dashed border-white/15 px-4 py-8 text-center text-xs font-semibold text-[#f6f0df]/50">
        © 2026 Pesta Rakyat Indonesia · Universiti Utara Malaysia
      </footer>
    </main>
  );
}
