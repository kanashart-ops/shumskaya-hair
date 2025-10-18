"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Clock, MessageCircle } from "lucide-react";

type DayAvail = { date: string; slots: { label: string; iso: string }[] };
type Resp = { timezone: string; serviceDurationMin: number; days: number; availability: DayAvail[] };

export default function BookingPage() {
  const [data, setData] = useState<Resp | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeDate, setActiveDate] = useState<string | null>(null);
  const [selectedISO, setSelectedISO] = useState<string | null>(null);

  useEffect(() => {
    const from = new Date();
    const yyyy = from.getFullYear(), mm = String(from.getMonth() + 1).padStart(2, "0"), dd = String(from.getDate()).padStart(2, "0");
    fetch(`/api/availability?from=${yyyy}-${mm}-${dd}&days=14`)
      .then(r => r.json())
      .then((json: Resp) => {
        setData(json);
        setActiveDate(json.availability[0]?.date ?? null);
      })
      .finally(() => setLoading(false));
  }, []);

  const activeSlots = data?.availability.find(d => d.date === activeDate)?.slots ?? [];

  return (
    <main className="container mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">Запись онлайн</h1>
      <p className="text-black/70 mt-2">
        Выберите удобную дату и время. Длительность услуги — {data?.serviceDurationMin ?? 120} мин. Часовой пояс: {data?.timezone ?? "Europe/Minsk"}.
      </p>

      {/* Дни */}
      <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
        {loading && <div className="text-black/60">Загружаем свободные окна…</div>}
        {!loading && data?.availability.length === 0 && <div className="text-black/60">Свободных дат пока нет.</div>}

        {data?.availability.map((d) => {
          const [y, m, day] = d.date.split("-");
          const dateObj = new Date(Number(y), Number(m) - 1, Number(day));
          const label = dateObj.toLocaleDateString("ru-BY", { weekday: "short", day: "2-digit", month: "2-digit" });
          const active = activeDate === d.date;
          return (
            <button
              key={d.date}
              onClick={() => { setActiveDate(d.date); setSelectedISO(null); }}
              className={`min-w-[120px] rounded-2xl px-4 py-3 border transition ${active ? "bg-[#f59e0b] text-black border-transparent" : "border-black/10 hover:bg-black/5"}`}
              aria-pressed={active}
            >
              <div className="flex items-center gap-2 justify-center">
                <CalendarDays size={16}/>
                <span className="font-medium">{label}</span>
              </div>
              <div className="text-xs opacity-80 mt-1">{d.slots.length} слотов</div>
            </button>
          );
        })}
      </div>

      {/* Время */}
      {activeDate && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold flex items-center gap-2"><Clock size={18}/> Свободное время</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {activeSlots.map(s => {
              const active = selectedISO === s.iso;
              return (
                <button
                  key={s.iso}
                  onClick={() => setSelectedISO(s.iso)}
                  className={`rounded-xl px-4 py-2 border transition ${active ? "bg-[#f59e0b] text-black border-transparent" : "border-black/10 hover:bg-black/5"}`}
                >
                  {s.label}
                </button>
              );
            })}
            {activeSlots.length === 0 && <div className="text-black/60">На этот день свободных слотов нет — выберите другую дату.</div>}
          </div>
        </div>
      )}

      {/* Итог + CTA */}
      <div className="mt-8 rounded-2xl bg-white shadow-[0_10px_25px_rgba(0,0,0,.07)] p-6">
        <p className="text-black/80">
          {selectedISO
            ? <>Вы выбрали: <b>{new Date(selectedISO).toLocaleString("ru-BY")}</b></>
            : <>Выберите дату и время, затем нажмите «Записаться».</>
          }
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <a
            className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 ${selectedISO ? "bg-[#f59e0b] text-black" : "bg-black/10 text-black/60 pointer-events-none"}`}
            href={selectedISO
              ? `https://t.me/shumskaya_hair?text=${encodeURIComponent(
                  `Здравствуйте! Хочу записаться на наращивание волос. Дата/время: ${new Date(selectedISO).toLocaleString("ru-BY")} (${(data?.serviceDurationMin ?? 120)} мин).`
                )}`
              : "#"}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={18}/> Записаться в Telegram
          </a>

          {/* Можно добавить WhatsApp / email, если нужно */}
          {/* <a className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 border border-black/10 hover:bg-black/5" href="https://wa.me/37529XXXXXXX" target="_blank" rel="noreferrer">WhatsApp</a> */}
        </div>
      </div>
    </main>
  );
}
