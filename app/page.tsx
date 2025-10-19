"use client";
import { Phone, Instagram, MessageCircle } from "lucide-react";

export default function HomePage() {
  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto max-w-6xl px-4 grid gap-10 py-14 sm:grid-cols-2 sm:items-center">
          {/* Текст */}
          <div className="order-2 sm:order-1">
            <p className="uppercase tracking-wide text-sm text-black/60">
              Мастер по наращиванию волос
            </p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight">
              Наращивание волос в Молодечно
            </h1>

            <p className="mt-4 text-lg text-black/80">
              Редкие височные зоны? Нужна длина, а волосы не растут?{" "}
              <b>Решу проблему за пару часов.</b> Капсулы <b>НЕ</b> тянут и не
              сползают — комфорт и натуральный вид.
            </p>

            <div className="mt-6 grid gap-2">
              <span className="inline-flex items-center rounded-full bg-[#fef3c7] px-3 py-1 text-sm">
                15 лет в бьюти-сфере · преподаватель
              </span>
              <span className="inline-flex items-center rounded-full bg-[#fef3c7] px-3 py-1 text-sm">
                Минский ГТК · художник-модельер
              </span>
              <span className="inline-flex items-center rounded-full bg-[#fef3c7] px-3 py-1 text-sm">
                БНТУ + РИПО · преподаю новых парикмахеров
              </span>
              <span className="inline-flex items-center rounded-full bg-[#fef3c7] px-3 py-1 text-sm">
                Обучение @perfecthairby — 5 недель
              </span>
            </div>

            {/* Кнопки */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 shadow-[0_10px_25px_rgba(0,0,0,.07)] bg-[#f59e0b] text-black hover:brightness-95"
                href="/portfolio"
              >
                Мои работы
              </a>
              <a
                className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 border border-black/10 hover:bg-black/5"
                href="/info"
              >
                Информация
              </a>
            </div>

            {/* Мессенджеры */}
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 border border-black/10 hover:bg-black/5"
                href="https://t.me/+375333507019"
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={18} /> Telegram
              </a>
              <a
                className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 border border-black/10 hover:bg-black/5"
                href="https://www.instagram.com/shumskaya_hair/"
                target="_blank"
                rel="noreferrer"
              >
                <Instagram size={18} /> Instagram
              </a>
              <a
                className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 border border-black/10 hover:bg-black/5"
                href="tel:+375333507019"
              >
                <Phone size={18} /> Позвонить
              </a>
            </div>
          </div>

          {/* Фото Насти */}
          <div className="order-1 sm:order-2">
            <div
              className="aspect-[4/5] w-full rounded-3xl bg-[url('/images/hero.jpg')] bg-cover bg-center shadow-[0_10px_25px_rgba(0,0,0,.07)]"
              aria-label="Фото Насти"
            />
          </div>
        </div>
      </section>

      {/* FAQ без заголовка */}
      <section className="container mx-auto max-w-6xl px-4 mt-6">
        <div className="mt-4 grid gap-4">
          {[
            {
              q: "Вредно ли наращивание волос?",
              a: "При грамотном подборе техники и количества прядей — нет. Ключевое — уход и своевременная коррекция.",
            },
            {
              q: "Какой вид наращивания мне выбрать?",
              a: "Капсульное — универсально от 15 см длины. Микрокапсулы — идеальны для тонких/редких и коротких (от 5–6 см). Ленты — быстрее, но лучше для средне-плотных волос; для очень тонких — микро-ленты.",
            },
            {
              q: "Сколько капсул или лент нужно?",
              a: "Капсулы: ~50–100 для тонких, 100–150 для обычных, 150–220 для объёмных; для каре +~50. Микрокапсулы — ориентируйтесь на те же цифры ×2. Ленты: обычно 40–50 лент (20–25 пар).",
            },
            {
              q: "Сколько носятся волосы и когда делать коррекцию?",
              a: "Капсулы: коррекция каждые 3–4 месяца, волосы служат 2–3 коррекции при хорошем уходе. Ленты: коррекция ~каждые 2 месяца; ресурс 1–2 коррекции — зависит от клеевой основы.",
            },
            {
              q: "Какие волосы лучше: «славянские» или «азиатские»?",
              a: "Важнее не «страна», а качество: правильный сбор (по направлению) и щадящая обработка. Хорошие волосы бывают и «славянские», и «азиатские».",
            },
            {
              q: "Можно ли в баню/сауну?",
              a: "Капсулы — нежелательно, кратковременно возможно с защитой полотенцем. Ленты — нет, риск отслаивания. Афро/трессы — можно.",
            },
            {
              q: "Можно ли красить?",
              a: "Корни — обычной краской. Полотно наращенных — щадящими составами без аммиака/масел у креплений.",
            },
            {
              q: "Как ухаживать за наращёнными волосами?",
              a: "Мойте аккуратно, не спутывая; используйте маски/бальзамы/спреи только по длине (не на корни); чаще расчёсывайте спец-щеткой, особенно у корней.",
            },
            {
              q: "Есть ли противопоказания?",
              a: "Да: заболевания кожи головы (зуд, покраснение), онкология в активной терапии, педикулёз. Сначала лечим, потом наращиваем.",
            },
          ].map((item, i) => (
            <details
              key={i}
              className="rounded-2xl bg-white shadow-[0_10px_25px_rgba(0,0,0,.07)] p-6"
            >
              <summary className="cursor-pointer font-semibold">
                {item.q}
              </summary>
              <p className="mt-2 text-black/70">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto max-w-6xl px-4 my-12">
        <div className="rounded-2xl bg-white shadow-[0_10px_25px_rgba(0,0,0,.07)] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold">
              Хотите примерить длину и объём?
            </h3>
            <p className="text-black/70">
              Напишите в Telegram, пришлите фото — подскажу по объёму, длине и стоимости.
            </p>
          </div>
          <a
            className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 shadow-[0_10px_25px_rgba(0,0,0,.07)] bg-[#f59e0b] text-black hover:brightness-95"
            href="https://t.me/+375333507019"
            target="_blank"
            rel="noreferrer"
          >
            Консультация бесплатно
          </a>
        </div>
      </section>
    </main>
  );
}
