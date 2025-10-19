import { Instagram, MessageCircle, Phone } from "lucide-react";

export default function ContactsPage() {
  return (
    <main className="container mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">Контакты</h1>
      <p className="text-black/70 mt-2">
        Работаю по предварительной записи. Напишите в мессенджер или позвоните — предложу ближайшие свободные окна.
      </p>

      <div className="grid gap-6 mt-6 sm:grid-cols-2">
        {/* СПОСОБЫ СВЯЗИ */}
        <div className="rounded-2xl bg-white shadow-[0_10px_25px_rgba(0,0,0,.07)] p-6">
          <h3 className="font-semibold text-lg">Связаться</h3>
          <div className="mt-4 flex flex-col gap-3">

            {/* Telegram */}
            <a
              className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 border border-black/10 hover:bg-black/5"
              href="https://t.me/+375333507019"
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={18} />
              Telegram: +375 33 350-70-19
            </a>

            {/* Viber */}
            <a
              className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 border border-black/10 hover:bg-black/5"
              href="viber://chat?number=%2B375333507019"
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={18} />
              Viber: +375 33 350-70-19
            </a>

            {/* Instagram */}
            <a
              className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 border border-black/10 hover:bg-black/5"
              href="https://www.instagram.com/shumskaya_hair/"
              target="_blank"
              rel="noreferrer"
            >
              <Instagram size={18} />
              Instagram: @shumskaya_hair
            </a>

            {/* Телефон */}
            <a
              className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 border border-black/10 hover:bg-black/5"
              href="tel:+375333507019"
            >
              <Phone size={18} />
              +375 (33) 350-70-19
            </a>
          </div>
        </div>

        {/* ГРАФИК / ГОРОД */}
        <div className="rounded-2xl bg-white shadow-[0_10px_25px_rgba(0,0,0,.07)] p-6">
          <h3 className="font-semibold text-lg">График и город</h3>
          <ul className="mt-3 space-y-2 text-black/80">
            <li>Город: Молодечно</li>
            <li>График: по записи</li>
            <li>Возможны утренние и вечерние приёмы</li>
          </ul>

          {/* CTA */}
          <div className="mt-6">
            <a
              className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 shadow-[0_10px_25px_rgba(0,0,0,.07)] bg-[#f59e0b] text-black hover:brightness-95"
              href="https://t.me/+375333507019"
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
