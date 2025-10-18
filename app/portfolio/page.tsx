"use client";

import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

type Item = {
  src: string;
  caption?: string;
};

const items: Item[] = [
  { src: "/images/portfolio/1.jpg", caption: "Удлинение, мягкие капсулы" },
  { src: "/images/portfolio/2.jpg", caption: "Локальные височные зоны" },
  { src: "/images/portfolio/3.jpg", caption: "Добавление густоты" },
  { src: "/images/portfolio/4.jpg", caption: "Удлинение до лопаток" },
  { src: "/images/portfolio/5.jpg", caption: "Натуральный блонд" },
  { src: "/images/portfolio/6.jpg", caption: "Максимальный объём" },
  // Добавишь больше — просто продолжай список:
  // { src: "/images/portfolio/7.jpg", caption: "..." },
];

export default function PortfolioPage() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const onKey = useCallback((e: KeyboardEvent) => {
    if (!open) return;
    if (e.key === "Escape") setOpen(false);
    if (e.key === "ArrowRight") setIndex((i) => (i + 1) % items.length);
    if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + items.length) % items.length);
  }, [open]);

  useEffect(() => {
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onKey]);

  return (
    <main className="container mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">Портфолио</h1>
      <p className="text-black/70 mt-2">
        Реальные работы после наращивания. Цвет/структура подбираются индивидуально под свои волосы.
      </p>

      {/* ГРИД */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <button
            key={it.src}
            className="group relative rounded-2xl overflow-hidden bg-white shadow-[0_10px_25px_rgba(0,0,0,.07)]"
            onClick={() => { setIndex(i); setOpen(true); }}
            aria-label={`Открыть ${it.caption ?? "фото"}`}
          >
            <div
              className="aspect-[3/4] bg-center bg-cover transition-transform group-hover:scale-[1.02]"
              style={{ backgroundImage: `url(${it.src})` }}
            />
            {it.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-sm px-3 py-2">
                {it.caption}
              </div>
            )}
            <div className="absolute top-2 right-2 rounded-full bg-white/90 p-2 opacity-0 group-hover:opacity-100 transition">
              <Maximize2 size={16} />
            </div>
          </button>
        ))}
      </div>

      {/* МОДАЛЬНЫЙ ПРОСМОТРЩИК */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Изображение */}
            <div
              className="w-full aspect-[3/2] bg-center bg-contain bg-no-repeat rounded-xl"
              style={{ backgroundImage: `url(${items[index].src})` }}
              aria-label={items[index].caption ?? "Фото"}
            />
            {/* Подпись */}
            {items[index].caption && (
              <div className="mt-3 text-center text-white/90">{items[index].caption}</div>
            )}

            {/* Кнопки управления */}
            <button
              className="absolute top-2 right-2 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2"
              onClick={() => setOpen(false)}
              aria-label="Закрыть"
            >
              <X />
            </button>
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3"
              onClick={() => setIndex((i) => (i - 1 + items.length) % items.length)}
              aria-label="Предыдущее фото"
            >
              <ChevronLeft />
            </button>
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3"
              onClick={() => setIndex((i) => (i + 1) % items.length)}
              aria-label="Следующее фото"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
