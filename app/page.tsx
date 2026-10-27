"use client";

import { useEffect, useState } from "react";
import HeroImage from "./hero-image";

/* =====================================================================
   DATA & KONSTANTA
   ===================================================================== */

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSedbDuDom6u3fXvt5VdmRxavbi4faDvbV30gTLI7GpvDFBLOQ/viewform?usp=publish-editor";
const HERO_IMAGE = "/images/banner.jpg";
const WA_URL = "https://wa.me/60175693970";
const IG_URL =
  "https://www.instagram.com/pestarakyatuum?igsi=MWdpcDZjamV3bml1bA==";
const EVENT_DATE = "2026-12-18T00:00:00+08:00";

type Theme = "green" | "maroon" | "gold";

type Tier = {
  id: string;
  badge: string;
  name: string;
  tagline: string;
  price: string;
  normalPrice?: string; // harga kalau beli satuan (untuk coret)
  save?: string; // label hemat
  theme: Theme;
  people: number; // jumlah avatar
  bonus?: boolean; // bubble "+1"
  vip?: boolean;
  featured?: boolean; // kartu disorot
  ribbon?: string;
  perkTitle: string;
  perks: string[];
  note?: string;
  formUrl?: string; // opsional: kalau tiap paket punya form beda
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
    ribbon: string;
  }
> = {
  green: {
    border: "border-[#1f3423]",
    text: "text-[#1f3423]",
    badge: "bg-[#2e4a34]",
    btn: "bg-[#1f3423]",
    tint: "bg-[#dfe8d9]",
    ring: "ring-[#1f3423]/30",
    noteBox: "border-[#1f3423]/40 bg-[#1f3423]/[.07]",
    tumpal: "tumpal green",
    ribbon: "bg-[#1f3423]",
  },
  maroon: {
    border: "border-[#6a1620]",
    text: "text-[#6a1620]",
    badge: "bg-[#8c1f2b]",
    btn: "bg-[#6a1620]",
    tint: "bg-[#ecd5d2]",
    ring: "ring-[#6a1620]/30",
    noteBox: "border-[#6a1620]/40 bg-[#6a1620]/[.07]",
    tumpal: "tumpal",
    ribbon: "bg-[#6a1620]",
  },
  gold: {
    border: "border-[#8a5a12]",
    text: "text-[#7a4e0e]",
    badge: "bg-[#a26b17]",
    btn: "bg-[#8a5a12]",
    tint: "bg-[#f0dfba]",
    ring: "ring-[#8a5a12]/35",
    noteBox: "border-[#8a5a12]/45 bg-[#a26b17]/[.09]",
    tumpal: "tumpal gold",
    ribbon: "bg-[#8a5a12]",
  },
};

const TIERS: Tier[] = [
  {
    id: "nyok",
    badge: "Regular",
    name: "Nyok",
    tagline: "1 ticket for 1 person",
    price: "12",
    theme: "green",
    people: 1,
    perkTitle: "What you get",
    perks: ["Mineral water", "Snack"],
    note: "Benefits for the first 200 people only.",
  },
  {
    id: "amprok",
    badge: "VIP",
    name: "Amprok",
    tagline: "1 ticket, full treatment",
    price: "15",
    theme: "maroon",
    people: 1,
    vip: true,
    perkTitle: "What you get",
    perks: [
      "Snack",
      "Mineral water",
      "Merchandise: keychain + wallet",
    ],
  },
  {
    id: "gandengan",
    badge: "Bundle Couple",
    name: "Gandengan",
    tagline: "1 bundle for 2 people",
    price: "20",
    normalPrice: "24",
    save: "Save RM4",
    theme: "gold",
    people: 2,
    ribbon: "Better together",
    perkTitle: "Each person gets",
    perks: ["Mineral water", "Snack"],
    note: "Benefits for the first 200 people only.",
  },
  {
    id: "ramean",
    badge: "Bundle Gank",
    name: "Ramean",
    tagline: "Pay for 4, get 5 slots",
    price: "48",
    normalPrice: "60",
    save: "Save RM12",
    theme: "maroon",
    people: 4,
    bonus: true,
    featured: true,
    ribbon: "Best value · 1 free slot",
    perkTitle: "Each of the 5 slots gets",
    perks: ["Mineral water", "Snack"],
    note: "Benefits for the first 200 people only.",
  },
];

const GLOSSARY = [
  { term: "Nyok", meaning: "let's go!" },
  { term: "Amprok", meaning: "meet / bump into" },
  { term: "Gandengan", meaning: "holding hands / together as a pair" },
  { term: "Ramean", meaning: "together with a crowd" },
];

const STEPS = [
  { title: "Pick your ticket", text: "Regular, VIP, or a bundle for you and your friends." },
  { title: "Fill in the form", text: "Tap Buy Ticket and complete the registration form." },
  { title: "Confirm your payment", text: "Follow the payment instructions on the form." },
  { title: "See you at DTSO", text: "Show your ticket on 18 December 2026." },
];

const FAQS = [
  {
    q: "What is a slot?",
    a: "One slot is one seat for one person. The Ramean bundle gives you 5 slots, so 5 people can attend on one purchase.",
  },
  {
    q: "Who gets the snack and drink?",
    a: "The first 200 people who buy a Regular, Couple, or Gank ticket. Each person gets a mineral water and a snack.",
  },
  {
    q: "Still have questions?",
    a: "Message us on WhatsApp or Instagram. The contact section is at the bottom of this page.",
  },
];

const HIGHLIGHTS = [
  {
    title: "Kecak Dance Showcase",
    src: "/images/kecak.JPG",
    gradient: "bg-[linear-gradient(135deg,#6a1620,#8c1f2b,#c2402f)]",
    tags: [
      "Balinese Choral Dance",
      "Hypnotic Vocal Rhythm",
      "Ramayana Fire Dance",
      "Synchronized Cultural Performance",
    ],
  },
  {
    title: "Renjaka Music Showcase",
    src: "/images/renjaka.JPG",
    gradient: "bg-[linear-gradient(135deg,#3b1230,#8a2a5b,#d9548a)]",
    tags: [
      "Live Music Session",
      "Sound of the Archipelago",
      "Acoustic Night",
      "Indie & Heritage Beats",
    ],
  },
  {
    title: "Drama Musical Showcase",
    src: "/images/dramus.jpeg",
    gradient: "bg-[linear-gradient(135deg,#1f3423,#2e4a34,#6f9d73)]",
    tags: [
      "Theatrical Storytelling",
      "Folklore Brought to Life",
      "Epic Musical Drama",
      "Broadway Nusantara Style",
      "Heritage on Stage",
    ],
  },
  {
    title: "Indonesian Student Music Showcase",
    src: "/images/ukm music.JPG",
    gradient: "bg-[linear-gradient(135deg,#6a1620,#8c1f2b,#3a0d14)]",
    tags: [
      "Indonesian Songs",
      "Student Performers",
      "Live Performance",
      "Indonesian Music",
    ],
  },
];

const SPONSORS = [
  { name: "Kachif", src: "/images/kachif.png" },
  { name: "Kastara", src: "/images/kastara.jpeg" },
  { name: "Kelab Muzik", src: "/images/kelab-muzik.jpeg" },
  { name: "KJRI Penang", src: "/images/kjri-penang.png" },
  { name: "Malaya Roll", src: "/images/malaya-roll.png" },
  { name: "Music Addicts MY", src: "/images/music-addicts-my.jpeg" },
  { name: "Pupuk Kaltim", src: "/images/pupuk-kaltim.png" },
  { name: "Unifilm", src: "/images/unifilm.png" },
  { name: "CIA SCIMPA", src: "/images/CIA SCIMPA.jpeg" },
];

const NAV = [
  { href: "#home", label: "Home" },
  { href: "#tickets", label: "Tickets" },
  { href: "#bundle", label: "Bundle Deal" },
  { href: "#highlights", label: "Highlights" },
  { href: "#contact", label: "Contact" },
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
   AVATAR (1 / 2 / 4 orang + bonus slot)
   ===================================================================== */

const SKINS = ["#f1d3ad", "#e2b88c", "#f6dcc0", "#d6a574"];

function Person({
  skin,
  hair,
  vip,
}: {
  skin: string;
  hair: boolean;
  vip?: boolean;
}) {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
      <path d="M14 100c2-22 14-32 36-32s34 10 36 32z" fill="currentColor" />
      <circle cx="50" cy="47" r="16" fill={skin} />
      {hair && (
        <path d="M34 46a16 16 0 0 1 32 0c-7-9-25-9-32 0z" fill="#3a2c1e" />
      )}
      {vip && (
        <path d="M37 36L34 21l9 7 7-12 7 12 9-7-3 15z" fill="currentColor" />
      )}
    </svg>
  );
}

function AvatarGroup({ tier }: { tier: Tier }) {
  const t = THEMES[tier.theme];
  const single = tier.people === 1;
  const size = single
    ? "h-[76px] w-[76px] lg:h-20 lg:w-20"
    : tier.people === 2
      ? "h-[72px] w-[72px]"
      : "h-14 w-14 sm:h-16 sm:w-16 xl:h-14 xl:w-14";

  return (
    <div className="flex items-center" aria-label={`${tier.people} person`}>
      {Array.from({ length: tier.people }).map((_, i) => (
        <div
          key={i}
          style={{ zIndex: tier.people - i }}
          className={`relative shrink-0 overflow-hidden rounded-full ring-2 ${size} ${t.tint} ${t.ring} ${t.text} ${i > 0 ? "-ml-3.5" : ""}`}
        >
          <Person skin={SKINS[i % 4]} hair={i % 2 === 1} vip={tier.vip} />
        </div>
      ))}

      {tier.bonus && (
        <div
          className={`relative -ml-3.5 grid shrink-0 place-items-center rounded-full border-2 border-dashed bg-[#f6f0df] text-center font-black leading-none ${size} ${t.border} ${t.text}`}
          aria-label="1 bonus slot"
        >
          <span className="text-lg">+1</span>
        </div>
      )}
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
      className={`group relative flex flex-col overflow-hidden rounded-3xl border-2 bg-[#f6f0df] transition duration-300 md:hover:-translate-y-1 ${t.border} ${
        tier.featured
          ? "shadow-[0_0_0_4px_rgba(212,160,60,.55),0_26px_50px_-18px_rgba(212,160,60,.45)]"
          : "shadow-[0_22px_44px_-22px_rgba(0,0,0,.85)]"
      }`}
    >
      <div className={t.tumpal} />

      {tier.ribbon && (
        <div
          className={`px-4 py-1.5 text-center text-[11px] font-extrabold uppercase tracking-[.14em] text-[#f6f0df] ${t.ribbon}`}
        >
          {tier.ribbon}
        </div>
      )}

      <div className="flex flex-1 flex-col gap-5 p-5 lg:p-6">
        <div className="flex flex-col gap-4">
          <AvatarGroup tier={tier} />

          <div className="min-w-0">
            <span
              className={`inline-block rounded-full px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-[.12em] text-[#f6f0df] sm:text-xs ${t.badge}`}
            >
              {tier.badge}
            </span>

            <h3
              className={`mt-2 break-words text-[34px] font-black leading-none ${t.text}`}
            >
              {tier.name}
            </h3>

            <p className="mt-1.5 text-[13px] font-bold text-[#4a3d2c]/80">
              {tier.tagline}
            </p>
          </div>
        </div>

        <div>
          <p className="mb-2.5 text-[11px] font-extrabold uppercase tracking-[.16em] text-[#4a3d2c]/60">
            {tier.perkTitle}
          </p>

          <ul className="space-y-2.5 text-[15px] font-semibold leading-snug text-[#4a3d2c]">
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
        </div>

        {tier.note && (
          <p
            className={`flex items-start gap-2 rounded-xl border border-dashed px-3.5 py-2.5 text-xs font-extrabold italic leading-snug ${t.noteBox} ${t.text}`}
          >
            <InfoIcon className="mt-px h-4 w-4 shrink-0" />
            {tier.note}
          </p>
        )}
      </div>

      {/* Sobekan tiket */}
      <div className="relative mt-auto">
        <div className="mx-5 border-t-2 border-dashed border-[#3a2c1e]/35 lg:mx-6" />
        <span className="absolute -left-3.5 -top-3.5 h-7 w-7 rounded-full bg-[#131211]" />
        <span className="absolute -right-3.5 -top-3.5 h-7 w-7 rounded-full bg-[#131211]" />
      </div>

      <div className="flex flex-col gap-4 p-5 lg:p-6">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-[.2em] text-[#4a3d2c]/70">
            Price
          </span>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <p className="flex items-baseline gap-1.5 text-[#2c2013]">
              <span className="text-xl font-black">RM</span>
              <span className="text-[56px] font-black leading-none">
                {tier.price}
              </span>
            </p>

            {tier.normalPrice && (
              <div className="flex flex-col items-start gap-1">
                <s className="text-sm font-bold text-[#4a3d2c]/60">
                  RM{tier.normalPrice}
                </s>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wide text-[#f6f0df] ${t.badge}`}
                >
                  {tier.save}
                </span>
              </div>
            )}
          </div>
        </div>

        <a
          href={tier.formUrl ?? FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex min-h-[54px] w-full items-center justify-center gap-2.5 rounded-xl px-7 text-sm font-extrabold uppercase tracking-wide text-[#f6f0df] shadow-[0_4px_0_rgba(0,0,0,.25)] transition hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0.5 active:shadow-none ${t.btn}`}
        >
          <TicketIcon className="h-5 w-5" />
          Buy Ticket
        </a>
      </div>
    </article>
  );
}

/* =====================================================================
   COUNTDOWN
   ===================================================================== */

function Countdown() {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const tick = () =>
      setLeft(Math.max(0, new Date(EVENT_DATE).getTime() - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const s = left === null ? 0 : Math.floor(left / 1000);
  const units = [
    { label: "Days", value: Math.floor(s / 86400) },
    { label: "Hours", value: Math.floor((s % 86400) / 3600) },
    { label: "Min", value: Math.floor((s % 3600) / 60) },
    { label: "Sec", value: s % 60 },
  ];

  return (
    <div
      className="mx-auto grid w-fit grid-cols-4 gap-2.5 md:gap-4"
      aria-label="Countdown to the event"
    >
      {units.map((u) => (
        <div
          key={u.label}
          className="w-[68px] rounded-xl border border-dashed border-[#f6f0df]/35 bg-white/5 px-2 py-2.5 text-center md:w-24 md:py-3.5"
        >
          <div className="text-2xl font-black tabular-nums text-white md:text-4xl">
            {left === null ? "--" : String(u.value).padStart(2, "0")}
          </div>
          <div className="mt-0.5 text-[10px] font-extrabold uppercase tracking-[.16em] text-[#f6f0df]/60 md:text-[11px]">
            {u.label}
          </div>
        </div>
      ))}
    </div>
  );
}

/* =====================================================================
   BUNDLE PROMO (bandingkan reguler vs bundle)
   ===================================================================== */

function BundlePromo() {
  return (
    <section
      id="bundle"
      className="scroll-mt-16 border-y border-dashed border-white/15 bg-[#1a0d10] px-3 py-14 md:px-8 md:py-24"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-[30px] font-black leading-tight text-white md:text-5xl">
            Come together, pay less.
          </h2>
          <p className="mt-3 text-sm font-semibold text-[#f6f0df]/75 md:text-base">
            Bring your friends and the price per head drops. The Ramean bundle
            costs the same as 4 Regular tickets, but you get 5 slots.
          </p>
        </div>

        <div className="mt-9 grid gap-5 md:mt-12 md:grid-cols-[1fr_auto_1fr] md:items-stretch md:gap-4">
          {/* Regular x4 */}
          <div className="rounded-2xl border-2 border-dashed border-white/25 bg-white/[.04] p-6 text-center">
            <p className="text-xs font-extrabold uppercase tracking-[.16em] text-[#f6f0df]/60">
              4 x Regular
            </p>
            <p className="mt-3 flex items-baseline justify-center gap-1.5 text-white">
              <span className="text-xl font-black">RM</span>
              <span className="text-6xl font-black leading-none">48</span>
            </p>
            <p className="mt-4 text-lg font-black text-[#f6f0df]">4 slots</p>
            <p className="mt-1 text-sm font-semibold text-[#f6f0df]/60">
              RM12 per person
            </p>
          </div>

          <div className="grid place-items-center text-sm font-black uppercase tracking-widest text-[#f6f0df]/50">
            vs
          </div>

          {/* Ramean */}
          <div className="relative rounded-2xl border-2 border-[#d4a03c] bg-[#f6f0df] p-6 text-center shadow-[0_0_0_4px_rgba(212,160,60,.25)]">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#6a1620] px-4 py-1 text-[11px] font-extrabold uppercase tracking-[.14em] text-[#f6f0df]">
              +1 free slot
            </span>
            <p className="text-xs font-extrabold uppercase tracking-[.16em] text-[#6a1620]">
              Ramean Bundle
            </p>
            <p className="mt-3 flex items-baseline justify-center gap-1.5 text-[#2c2013]">
              <span className="text-xl font-black">RM</span>
              <span className="text-6xl font-black leading-none">48</span>
            </p>
            <p className="mt-4 text-lg font-black text-[#6a1620]">5 slots</p>
            <p className="mt-1 text-sm font-semibold text-[#4a3d2c]">
              About RM9.60 per person
            </p>
          </div>
        </div>

        <div className="mx-auto mt-6 flex max-w-2xl flex-col items-center gap-2 rounded-2xl border border-dashed border-[#d4a03c]/60 bg-[#d4a03c]/10 px-5 py-4 text-center text-sm font-bold text-[#f6f0df] md:flex-row md:justify-between md:text-left">
          <span>
            Just two of you? The Gandengan couple bundle is RM20 instead of RM24.
          </span>
          <a
            href="#tickets"
            className="shrink-0 rounded-lg bg-[#f6f0df] px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-[#6a1620] transition hover:brightness-95"
          >
            Choose a bundle
          </a>
        </div>
      </div>
    </section>
  );
}

/* =====================================================================
   HOME PAGE
   ===================================================================== */

export default function Home() {
  return (
    <main
      className="min-h-screen bg-[#131211] pb-20 text-[#f6f0df] md:pb-0"
      style={{
        fontFamily: "var(--font-nunito, 'Nunito Sans'), system-ui, sans-serif",
      }}
    >
      <style>{`
        html { scroll-behavior: smooth; background: #131211; }
        body { background: #131211; }

        .tumpal {
          height: 10px;
          width: 100%;
          background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='10'%3E%3Cpath d='M0 0h20L10 10z' fill='%238c1f2b'/%3E%3C/svg%3E") repeat-x;
        }
        .tumpal.green {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='10'%3E%3Cpath d='M0 0h20L10 10z' fill='%231f3423'/%3E%3C/svg%3E");
        }
        .tumpal.gold {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='10'%3E%3Cpath d='M0 0h20L10 10z' fill='%238a5a12'/%3E%3C/svg%3E");
        }
        .tumpal.flip { transform: scaleY(-1); }

        details > summary { list-style: none; }
        details > summary::-webkit-details-marker { display: none; }

        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(212,160,60,.55); }
          70% { box-shadow: 0 0 0 12px rgba(212,160,60,0); }
          100% { box-shadow: 0 0 0 0 rgba(212,160,60,0); }
        }
        .pulse-ring { animation: pulse-ring 2s infinite; }
        @media (prefers-reduced-motion: reduce) {
          .pulse-ring { animation: none; }
          html { scroll-behavior: auto; }
        }
      `}</style>

      {/* ===============================================================
          NAVBAR
          =============================================================== */}

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#131211]/90 backdrop-blur">
        <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:h-16 md:px-8">
          <a href="#home" className="text-lg font-black tracking-wide text-white">
            PRI 2026
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {NAV.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className="text-sm font-bold text-[#f6f0df]/80 transition hover:text-white"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#tickets"
            className="pulse-ring hidden rounded-lg bg-[#6a1620] px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-[#f6f0df] shadow-[0_3px_0_rgba(0,0,0,.35)] transition hover:brightness-110 md:inline-block"
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
              {NAV.map((n, i) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className={`block py-3 text-sm font-bold ${
                      i < NAV.length - 1
                        ? "border-b border-dashed border-white/10"
                        : ""
                    }`}
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </nav>
      </header>

      {/* ===============================================================
          HERO
          =============================================================== */}

      <section
        id="home"
        className="scroll-mt-16 px-3 pb-10 pt-5 md:px-8 md:pb-16 md:pt-10"
      >
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl border-2 border-[#6a1620] bg-[#f6f0df]">
          <div className="tumpal" />

          {/* Lubang tiket desktop */}
          <span className="absolute -left-3.5 top-1/2 z-10 hidden h-7 w-7 -translate-y-1/2 rounded-full bg-[#131211] md:block" />
          <span className="absolute -right-3.5 top-1/2 z-10 hidden h-7 w-7 -translate-y-1/2 rounded-full bg-[#131211] md:block" />

          <div className="grid gap-5 p-4 md:grid-cols-2 md:gap-0 md:p-10">
            {/* IMAGE (kanan) */}
            <div className="order-1 flex items-center justify-center md:order-2 md:pl-8 lg:pl-10">
              <div
                role="img"
                aria-label="Road to Pesta Rakyat Indonesia 2026"
                className="relative aspect-[16/10.5] w-full max-w-[560px] overflow-hidden rounded-xl border-2 border-[#6a1620] bg-[linear-gradient(135deg,#6a1620,#8c1f2b_55%,#3a0d14)] shadow-[0_15px_35px_-20px_rgba(0,0,0,.7)]"
              >
                {/* Fallback kalau gambar gagal */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-[#f6f0df]">
                  <span className="text-[11px] font-extrabold uppercase tracking-[.3em] opacity-70">
                    Road to
                  </span>
                  <span className="mt-1 text-5xl font-black leading-none md:text-6xl">
                    PRI
                  </span>
                  <span className="text-3xl font-black leading-none opacity-90 md:text-4xl">
                    2026
                  </span>
                </div>

                <HeroImage src={HERO_IMAGE} />

                <div className="tumpal flip absolute inset-x-0 bottom-0 opacity-60" />
              </div>
            </div>

            {/* TEXT (kiri) */}
            <div className="order-2 flex flex-col justify-center border-t-2 border-dashed border-[#3a2c1e] pt-5 md:order-1 md:border-r-2 md:border-t-0 md:pr-10 md:pt-0">
              <span className="w-fit rounded-full bg-[#8c1f2b] px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-[.09em] text-[#f6f0df] md:text-xs">
                Universiti Utara Malaysia
              </span>

              <h1 className="mt-3 text-[34px] font-black leading-[1.05] text-[#2c2013] md:text-5xl lg:text-[56px]">
                Road to <span className="text-[#8c1f2b]">Pesta Rakyat</span>{" "}
                Indonesia 2026
              </h1>

              <p className="mt-3 max-w-md text-[13.5px] font-semibold leading-relaxed text-[#4a3d2c] md:text-base">
                Universiti Utara Malaysia&apos;s premier annual cultural
                showcase. High-energy performances, immersive storytelling, and
                the vibrant spirit of Indonesian students.
              </p>

              <div className="mt-5 flex w-fit max-w-full overflow-hidden rounded-xl border-[1.5px] border-dashed border-[#3a2c1e]">
                <div className="px-4 py-2.5 md:px-5">
                  <small className="block text-[9px] font-extrabold uppercase tracking-[.12em] text-[#4a3d2c]/75">
                    Venue
                  </small>
                  <strong className="text-base font-black text-[#2c2013] md:text-lg">
                    DTSO
                  </strong>
                </div>
                <div className="border-l-[1.5px] border-dashed border-[#3a2c1e] px-4 py-2.5 md:px-5">
                  <small className="block text-[9px] font-extrabold uppercase tracking-[.12em] text-[#4a3d2c]/75">
                    Date
                  </small>
                  <strong className="text-base font-black text-[#2c2013] md:text-lg">
                    18 Desember 2026
                  </strong>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#tickets"
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-[#6a1620] px-6 text-sm font-extrabold uppercase tracking-wide text-[#f6f0df] shadow-[0_4px_0_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:brightness-110 sm:w-fit"
                >
                  <TicketIcon className="h-5 w-5" />
                  Get Your Tickets
                </a>
                <a
                  href="#bundle"
                  className="text-center text-sm font-extrabold text-[#6a1620] underline decoration-dashed underline-offset-4 sm:text-left"
                >
                  Bring friends, pay less
                </a>
              </div>
            </div>
          </div>

          <div className="tumpal flip" />
        </div>
      </section>

      {/* ===============================================================
          TICKETS
          =============================================================== */}

      <section
        id="tickets"
        className="relative scroll-mt-16 overflow-hidden bg-[radial-gradient(ellipse_at_top,rgba(140,31,43,.38),transparent_65%)] px-3 py-14 md:px-8 md:py-24"
      >
        <div className="relative mx-auto max-w-6xl">
          <div className="mx-auto mb-8 max-w-2xl text-center md:mb-12">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#d4a03c]/60 bg-[#d4a03c]/15 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[.16em] text-[#f1cf86] md:text-xs">
              <span className="h-2 w-2 rounded-full bg-[#f1cf86]" />
              Presale is open
            </span>

            <h2 className="mt-4 text-[38px] font-black leading-[1.05] text-white md:text-6xl">
              Get Your Tickets
            </h2>

            <p className="mt-3 text-sm font-semibold text-[#f6f0df]/75 md:text-base">
              Don&apos;t miss the celebration. The first 200 buyers of Regular,
              Couple, and Gank tickets get a free mineral water and donut.
            </p>
          </div>

          <div className="mb-10 md:mb-14">
            <p className="mb-3 text-center text-[11px] font-extrabold uppercase tracking-[.2em] text-[#f6f0df]/60">
              Event starts in
            </p>
            <Countdown />
          </div>

          <div className="mx-auto grid max-w-md gap-7 sm:max-w-none sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
            {TIERS.map((tier) => (
              <TicketCard key={tier.id} tier={tier} />
            ))}
          </div>

          {/* Cara beli */}
          <ol className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4 md:mt-16">
            {STEPS.map((s, i) => (
              <li
                key={s.title}
                className="rounded-2xl border border-dashed border-white/25 p-4"
              >
                <span className="grid h-8 w-8 place-items-center rounded-full bg-[#6a1620] text-sm font-black text-[#f6f0df]">
                  {i + 1}
                </span>
                <h3 className="mt-3 text-base font-black text-white">
                  {s.title}
                </h3>
                <p className="mt-1 text-sm font-semibold text-[#f6f0df]/65">
                  {s.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===============================================================
          BUNDLE PROMO
          =============================================================== */}

      <BundlePromo />

      {/* ===============================================================
          GLOSSARY
          =============================================================== */}

      <section className="px-3 py-14 md:px-8 md:py-20">
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
                <span className={`font-black uppercase tracking-wide ${ACCENT}`}>
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

          <div className="grid gap-5 md:grid-cols-2 md:gap-6 xl:grid-cols-4">
            {HIGHLIGHTS.map((h) => (
              <article
                key={h.title}
                className="group overflow-hidden rounded-2xl border-2 border-[#6a1620] bg-[#f6f0df]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div
                    className={`flex h-full w-full items-center justify-center ${h.gradient}`}
                  >
                    <img
                      src={h.src}
                      alt={h.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="tumpal flip absolute inset-x-0 bottom-0" />
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-black text-[#6a1620] md:text-2xl">
                    {h.title}
                  </h3>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {h.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-dashed border-[#3a2c1e] px-2.5 py-1 text-[11px] font-bold text-[#4a3d2c]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===============================================================
          FAQ
          =============================================================== */}

      <section className="px-3 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-black text-white md:text-4xl">
            Good to know
          </h2>

          <div className="mt-8 space-y-3">
            {FAQS.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-dashed border-white/25 px-5 py-4"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-black text-white">
                  {f.q}
                  <span className="text-xl text-[#f1cf86] transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm font-semibold leading-relaxed text-[#f6f0df]/75 md:text-base">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===============================================================
          SPONSORS
          =============================================================== */}

      <section
        id="sponsors"
        className="scroll-mt-16 border-t-2 border-[#6a1620] bg-[#f6f0df] px-3 py-12 md:px-8 md:py-16"
      >
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-black text-[#2c2013] md:text-5xl">
            Sponsors &amp; Media Partners
          </h2>

          <div className="mt-8 rounded-2xl border-2 border-[#6a1620] bg-[#fffaf0] p-4 shadow-[0_8px_25px_-18px_rgba(0,0,0,.5)] md:mt-10 md:p-8">
            <div className="grid grid-cols-2 items-center gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {SPONSORS.map((s) => (
                <div
                  key={s.name}
                  className="flex h-28 items-center justify-center rounded-xl border border-dashed border-[#6a1620]/30 bg-[#f6f0df] p-4 transition hover:-translate-y-1 hover:shadow-md"
                >
                  <img
                    src={s.src}
                    alt={s.name}
                    className="max-h-20 w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          <p className="mt-6 text-center text-sm font-bold text-[#4a3d2c]">
            Want to collaborate or sponsor PRI 2026?{" "}
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6a1620] underline decoration-dashed underline-offset-4"
            >
              Message us on WhatsApp
            </a>
          </p>
        </div>
      </section>

      {/* ===============================================================
          CONTACT
          =============================================================== */}

      <section id="contact" className="scroll-mt-16 px-3 py-12 md:px-8 md:py-20">
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
              <a
                href={IG_URL}
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
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
                @pestarakyatuum
              </a>

              <a
                href={WA_URL}
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

      {/* CTA mengambang (mobile) */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#131211]/95 px-3 py-2.5 backdrop-blur md:hidden">
        <a
          href="#tickets"
          className="pulse-ring flex min-h-12 items-center justify-center gap-2.5 rounded-xl bg-[#6a1620] text-sm font-extrabold uppercase tracking-wide text-[#f6f0df] shadow-[0_3px_0_rgba(0,0,0,.35)]"
        >
          <TicketIcon className="h-5 w-5" />
          Get Tickets from RM12
        </a>
      </div>
    </main>
  );
}
