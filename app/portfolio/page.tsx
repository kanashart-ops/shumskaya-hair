"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

type Media = { type: "image" | "video"; src: string; alt?: string };
type Work = {
  title: string;
  summary?: string; // короткое описание под обложкой
  cover?: number;   // индекс обложки
  media: Media[];   // фото/видео только этой работы
};

// 4 кейса, у каждого 4 фото + 1 видео (заглушки)
const works: Work[] = [
  {
    title: "Увеличение плотности концов",
    summary:
      "Длина хорошая, но концам не хватало плотности. Первый опыт, волосы тонкие — работаем деликатно. Решение: 50 г волос ≈ 120 микро/нано-капсул.",
    media: [
      { type: "image", src: "/images/portfolio/case1/1.jpg", alt: "Кейс 1 — вид спереди" },
      { type: "image", src: "/images/portfolio/case1/2.jpg", alt: "Кейс 1 — вид сзади" },
      { type: "image", src: "/images/portfolio/case1/3.jpg", alt: "Кейс 1 — детали" },
      { type: "video", src: "/videos/case1.mp4", alt: "Кейс 1 — видео" },
    ],
  },
  {
    title: "Локальные височные зоны",
    summary:
      "Редкие виски, важно не перегрузить и без дискомфорта. Подобрали 40 г, сделала ~100 микро/нано-капсул для тонких височных зон.",
    media: [
      { type: "image", src: "/images/portfolio/case2/1.jpg", alt: "Кейс 2 — правая височная зона" },
      { type: "image", src: "/images/portfolio/case2/2.jpg", alt: "Кейс 2 — левая височная зона" },
      { type: "image", src: "/images/portfolio/case2/3.jpg", alt: "Кейс 2 — общий вид" },
      { type: "video", src: "/videos/case2.mp4", alt: "Кейс 2 — видео" },
    ],
  },
  {
    title: "Полное наращивание",
    summary:
      "Полное наращивание: 130 г волос. Ровная линия и мягкий переход, естественная посадка.",
    media: [
      { type: "image", src: "/images/portfolio/case3/1.jpg", alt: "Кейс 3 — до/исходник" },
      { type: "image", src: "/images/portfolio/case3/2.jpg", alt: "Кейс 3 — процесс" },
      { type: "video", src: "/videos/case3.mp4", alt: "Кейс 3 — видео" },
    ],
  },
  {
    title: "Коррекция волос",
    summary:
      "Аккуратная коррекция: снятие/перестановка капсул, обновление объёма и формы, чистая стыковка.",
    media: [
      { type: "image", src: "/images/portfolio/case4/1.jpg", alt: "Кейс 4 — исходное состояние" },
      { type: "image", src: "/images/portfolio/case4/2.jpg", alt: "Кейс 4 — процесс коррекции" },
      { type: "video", src: "/videos/case4.mp4", alt: "Кейс 4 — видео" },
      { type: "video", src: "/videos/case41.mp4", alt: "Кейс 4 — видео" },
    ],
  },
];

export default function PortfolioPage() {
  const [openWorkIdx, setOpenWorkIdx] = useState<number | null>(null);
  const [slideIdx, setSlideIdx] = useState(0);

  const currentWork = openWorkIdx !== null ? works[openWorkIdx] : null;
  const totalSlides = currentWork ? currentWork.media.length : 0;

  const openModal = (workIndex: number, coverIndex = 0) => {
    setOpenWorkIdx(workIndex);
    setSlideIdx(coverIndex);
  };
  const closeModal = () => {
    setOpenWorkIdx(null);
    setSlideIdx(0);
  };
  const goPrev = () => currentWork && setSlideIdx((i) => (i - 1 + totalSlides) % totalSlides);
  const goNext = () => currentWork && setSlideIdx((i) => (i + 1) % totalSlides);

  // Клавиши: Esc / ← / →
  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (openWorkIdx === null) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    },
    [openWorkIdx, totalSlides]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onKey]);

  // Блокируем скролл фона при открытой модалке
  useEffect(() => {
    if (openWorkIdx !== null) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [openWorkIdx]);

  return (
    <main className="container mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">Мои работы</h1>
      <p className="text-black/70 mt-2">
        4 реальных кейса. Один клик — и смотри все фото/видео конкретной работы.
      </p>

      {/* ГРИД КЕЙСОВ */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {works.map((work, idx) => {
          const cover = work.cover ?? 0;
          const coverMedia = work.media[cover];
          // если обложка вдруг видео — возьмем первую картинку
          const coverSrc =
            coverMedia?.type === "image"
              ? coverMedia.src
              : work.media.find((m) => m.type === "image")?.src ?? "";

          return (
            <article
              key={idx}
              className="group rounded-2xl overflow-hidden bg-white shadow-[0_10px_25px_rgba(0,0,0,.07)]"
            >
              <button
                className="relative block w-full text-left"
                onClick={() => openModal(idx, cover)}
                aria-label={`Открыть работу: ${work.title}`}
              >
                <div
                  className="aspect-[3/4] bg-center bg-cover transition-transform group-hover:scale-[1.02]"
                  style={{ backgroundImage: `url(${coverSrc})` }}
                />
                <div className="absolute top-2 right-2 rounded-full bg-white/90 p-2 opacity-0 group-hover:opacity-100 transition">
                  <Maximize2 size={16} />
                </div>
              </button>

              <div className="px-4 pt-3 pb-4">
                <h3 className="text-lg font-semibold">{work.title}</h3>
                {work.summary && (
                  <p className="text-sm text-black/70 mt-1">{work.summary}</p>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* МОДАЛКА ОДНОГО КЕЙСА */}
      {currentWork && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          onClick={closeModal}
        >
          <div
            className="relative max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Слайд */}
            <div className="w-full aspect-[3/2] rounded-xl bg-black/20 flex items-center justify-center overflow-hidden">
              {currentWork.media[slideIdx].type === "image" ? (
                <Image
                  src={currentWork.media[slideIdx].src}
                  alt={currentWork.media[slideIdx].alt ?? currentWork.title}
                  width={1600}
                  height={1066}
                  className="w-full h-full object-contain"
                  priority
                />
              ) : (
                <video
                  src={currentWork.media[slideIdx].src}
                  controls
                  className="w-full h-full object-contain bg-black"
                />
              )}
            </div>

            {/* Заголовок/счётчик */}
            <div className="mt-3 flex items-center justify-center gap-2 text-white/90 text-sm">
              <span className="font-medium">{currentWork.title}</span>
              <span className="text-white/60">— {slideIdx + 1}/{totalSlides}</span>
            </div>

            {/* Кнопки */}
            <button
              className="absolute top-2 right-2 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2"
              onClick={closeModal}
              aria-label="Закрыть"
              title="Закрыть (Esc)"
            >
              <X />
            </button>
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3"
              onClick={goPrev}
              aria-label="Предыдущее"
              title="Предыдущее (←)"
            >
              <ChevronLeft />
            </button>
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3"
              onClick={goNext}
              aria-label="Следующее"
              title="Следующее (→)"
            >
              <ChevronRight />
            </button>

            {/* Миниатюры */}
            <div className="mt-4 grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 gap-2">
              {currentWork.media.map((m, i) => (
                <button
                  key={m.src + i}
                  className={`relative aspect-square rounded-lg overflow-hidden ring-2 transition ${
                    i === slideIdx ? "ring-white" : "ring-transparent hover:ring-white/60"
                  }`}
                  onClick={() => setSlideIdx(i)}
                  aria-label={`Показать слайд ${i + 1}`}
                  title={`Слайд ${i + 1}`}
                >
                  {m.type === "image" ? (
                    <Image
                      src={m.src}
                      alt={m.alt ?? currentWork.title}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  ) : (
                    <div className="w-full h-full bg-black/40 flex items-center justify-center text-white text-xs">
                      VIDEO
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
