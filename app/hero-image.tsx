"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Foto hero. Kalau URL foto rusak/404, komponen ini menghilang sendiri
 * sehingga tampilan cadangan (blok maroon "PRI 2026") yang terlihat,
 * tanpa ikon gambar rusak.
 */
export default function HeroImage({ src }: { src: string }) {
  const [ok, setOk] = useState(true);
  const ref = useRef<HTMLImageElement>(null);

  // Kalau gambar sudah gagal sebelum React aktif (hydration), cek manual.
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setOk(false);
  }, []);

  if (!ok) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={src}
      alt=""
      fetchPriority="high"
      onError={() => setOk(false)}
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}
