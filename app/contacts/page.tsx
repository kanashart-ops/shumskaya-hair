import { Instagram, MessageCircle, Phone, Mail } from "lucide-react";

export default function ContactsPage() {
  return (
    <main className="container mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">Контакты</h1>
      <p className="text-black/70 mt-2">
        По записи. Напишите в мессенджер или позвоните — предложу ближайшие свободные окна.
      </p>

      <div className="grid gap-6 mt-6 sm:grid-cols-2">
        {/* Способы связи */}
        <div className="rounded-2xl bg-white shadow-[0_10px_25px_rgba(0,0,0,.07)] p-6">
          <h3 className="font-semibold text-lg">Связаться</h3>
          <div className="mt-4 flex flex-col gap-3">
            <a
              className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 border border-black/10 hover:bg-black/5"
              href="https://t.me/shumskaya_hair"
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={18} /> Telegram: @shumskaya_hair
            </a>

            {/* Если есть WhatsApp — раскомментируй и поставь реальный номер в формате 37529XXXXXXX */}
            {/* <a
              className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 border border-black/10 hover:bg-black/5"
              href="https://wa.me/375290000000"
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={18} /> WhatsApp
            </a> */}

            <a
              className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 border border-black/10 hover:bg-black/5"
              href="https://instagram.com/shumskaya_hair"
              target="_blank"
              rel="noreferrer"
            >
              <Instagram size={18} /> Instagram: @shumskaya_hair
            </a>

            <a
              className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 border border-black/10 hover:bg-black/5"
              href="tel:+375290000000"
            >
              <Phone size={18} /> +375 (29) 000-00-00
            </a>

            {/* Если используешь почту — замени адрес */}
            {/* <a
              className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 border border-black/10 hover:bg-black/5"
              href="mailto:hello@shumskaya-hair.by"
            >
              <Mail size={18} /> hello@shumskaya-hair.by
            </a> */}
          </div>
        </div>

        {/* Инфо/график */}
        <div className="rounded-2xl bg-white shadow-[0_10px_25px_rgba(0,0,0,.07)] p-6">
          <h3 className="font-semibold text-lg">График и город</h3>
          <ul className="mt-3 space-y-2 text-black/80">
            <li>Город: Молодечно</li>
            <li>График: по записи</li>
            <li>Учёт пожеланий по времени: утро/день/вечер</li>
          </ul>

          {/* CTA */}
          <div className="mt-6">
            <a
              className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 shadow-[0_10px_25px_rgba(0,0,0,.07)] bg-[#f59e0b] text-black hover:brightness-95"
              href="https://t.me/shumskaya_hair"
              target="_blank"
              rel="noreferrer"
            >
              Записаться в Telegram
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
