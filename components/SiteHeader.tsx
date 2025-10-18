"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b border-black/5">
      <nav className="container mx-auto max-w-6xl px-4 flex h-16 items-center justify-between">
        {/* LOGO — крупнее и заметнее */}
        <a href="/" className="font-extrabold tracking-tight text-[20px] sm:text-2xl">
          Shumskaya Hair
        </a>

        {/* DESKTOP MENU */}
        <div className="hidden gap-4 sm:flex items-center">
          <a className="hover:underline" href="/portfolio">Мои работы</a>
          <a className="hover:underline" href="/info">Обо мне</a>
          <a className="hover:underline" href="/reviews">Отзывы</a>
          <a className="hover:underline" href="/contacts">Контакты</a>
          <a className="hover:underline font-semibold text-[#f59e0b]" href="/booking">Запись</a>
          <a
            className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 shadow-[0_10px_25px_rgba(0,0,0,.07)] bg-[#f59e0b] text-black hover:brightness-95"
            href="https://t.me/shumskaya_hair"
            target="_blank"
            rel="noreferrer"
          >
            Записаться
          </a>
        </div>

        {/* MOBILE: burger */}
        <button
          className="sm:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border border-black/10"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {/* MOBILE MENU PANEL */}
      {open && (
        <div className="sm:hidden border-t border-black/5 bg-white/95 backdrop-blur">
          <div className="container mx-auto max-w-6xl px-4 py-3 grid gap-2">
            <a className="py-2" href="/portfolio" onClick={() => setOpen(false)}>Мои работы</a>
            <a className="py-2" href="/info" onClick={() => setOpen(false)}>Обо мне</a>
            <a className="py-2" href="/reviews" onClick={() => setOpen(false)}>Отзывы</a>
            <a className="py-2" href="/contacts" onClick={() => setOpen(false)}>Контакты</a>
            <a className="py-2 font-semibold text-[#f59e0b]" href="/booking" onClick={() => setOpen(false)}>Запись</a>
            <a
              className="mt-2 inline-flex items-center justify-center rounded-2xl px-5 py-3 shadow-[0_10px_25px_rgba(0,0,0,.07)] bg-[#f59e0b] text-black hover:brightness-95"
              href="https://t.me/shumskaya_hair"
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
            >
              Записаться в Telegram
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
