import { NextResponse } from "next/server";

// ── НАСТРОЙКИ ─────────────────────────────────────────────
const timezone = "Europe/Minsk";             // локальный часовой пояс
const serviceDurationMin = 120;              // длительность записи (мин)
const slotStepMin = 30;                      // шаг стартов слотов
const workDays = [1, 2, 3, 4, 5, 6];         // пн=1 ... вс=7 (работаем пн-сб)
const workStart = { h: 10, m: 0 };           // рабочий день с 10:00
const workEnd   = { h: 19, m: 0 };           // до 19:00 (последний старт зависит от длительности)

// Блокировки дат (целые дни) в формате 'YYYY-MM-DD'
const blockedDates = new Set<string>([
  // "2025-10-23",
]);

// Уже занятые записи (пример). Формат: ISO-строка начала + длительность (мин)
const existingBookings: { startISO: string; durationMin: number }[] = [
  // { startISO: "2025-10-19T12:00:00+03:00", durationMin: 120 },
];

// ── ВСПОМОГАТЕЛЬНЫЕ ───────────────────────────────────────
function toLocalDate(date: Date): Date {
  // создаём новый Date с той же стеной времени в TZ Минска
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const [y, m, d] = fmt.format(date).split("-").map(Number);
  return new Date(y, m - 1, d);
}

function pad(n: number) { return n.toString().padStart(2, "0"); }

function formatLocal(date: Date) {
  // Возвращаем локальные компоненты + ISO со смещением (для кнопок)
  const dFmt = new Intl.DateTimeFormat("ru-BY", { timeZone: timezone, year: "numeric", month: "2-digit", day: "2-digit" });
  const tFmt = new Intl.DateTimeFormat("ru-BY", { timeZone: timezone, hour: "2-digit", minute: "2-digit", hour12: false });
  return { date: dFmt.format(date), time: tFmt.format(date) };
}

function getLocalOffsetISO(date: Date) {
  // Собираем ISO со сдвигом текущей TZ
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone, year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
  });
  const parts = Object.fromEntries(dtf.formatToParts(date).map(p => [p.type, p.value]));
  const yyyy = parts.year, MM = parts.month, dd = parts.day;
  const HH = parts.hour, mm = parts.minute, ss = parts.second;

  // смещение зоны:
  const local = new Date(`${yyyy}-${MM}-${dd}T${HH}:${mm}:${ss}`);
  const offsetMin = Math.round((local.getTime() - date.getTime()) / 60000);
  const sign = offsetMin >= 0 ? "+" : "-";
  const abs = Math.abs(offsetMin);
  const oh = pad(Math.floor(abs / 60)); const om = pad(abs % 60);

  return `${yyyy}-${MM}-${dd}T${HH}:${mm}:${ss}${sign}${oh}:${om}`;
}

function addMinutes(d: Date, min: number) { return new Date(d.getTime() + min * 60000); }

function isWorkDay(d: Date) {
  const wd = ((d.getDay() + 6) % 7) + 1; // JS: 0-вс, ... 6-сб -> делаем 1-пн ... 7-вс
  return workDays.includes(wd);
}

function sameDayKey(d: Date) {
  const y = d.getFullYear(), m = d.getMonth() + 1, day = d.getDate();
  return `${y}-${pad(m)}-${pad(day)}`;
}

function overlaps(aStart: Date, aEnd: Date, bStart: Date, bEnd: Date) {
  return aStart < bEnd && bStart < aEnd;
}

function isSlotFree(start: Date, durationMin: number) {
  const end = addMinutes(start, durationMin);
  // выходит ли за рамки рабочего времени?
  const startLimit = new Date(start); startLimit.setHours(workStart.h, workStart.m, 0, 0);
  const endLimit = new Date(start);   endLimit.setHours(workEnd.h,   workEnd.m,   0, 0);
  if (start < startLimit || end > endLimit) return false;

  // пересечения с существующими бронями
  for (const b of existingBookings) {
    const bStart = new Date(b.startISO);
    const bEnd = addMinutes(bStart, b.durationMin);
    if (overlaps(start, end, bStart, bEnd)) return false;
  }
  return true;
}

// ── HANDLER ───────────────────────────────────────────────
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from"); // YYYY-MM-DD
  const days = Number(searchParams.get("days") ?? 14);

  const today = toLocalDate(new Date());
  const startDate = from ? new Date(from + "T00:00:00") : today;

  const out: { date: string; slots: { label: string; iso: string }[] }[] = [];

  for (let i = 0; i < days; i++) {
    const day = new Date(startDate);
    day.setDate(day.getDate() + i);

    const key = sameDayKey(day);
    if (!isWorkDay(day)) continue;
    if (blockedDates.has(key)) continue;

    // старт последнего возможного начала
    const dayStart = new Date(day); dayStart.setHours(workStart.h, workStart.m, 0, 0);
    const dayEnd   = new Date(day); dayEnd.setHours(workEnd.h,   workEnd.m,   0, 0);
    const lastStart = addMinutes(dayEnd, -serviceDurationMin);

    const slots: { label: string; iso: string }[] = [];
    for (let t = new Date(dayStart); t <= lastStart; t = addMinutes(t, slotStepMin)) {
      if (isSlotFree(t, serviceDurationMin)) {
        const { time } = formatLocal(t);
        slots.push({ label: time, iso: getLocalOffsetISO(t) });
      }
    }
    if (slots.length) {
      out.push({ date: key, slots });
    }
  }

  return NextResponse.json({ timezone, serviceDurationMin, days, availability: out });
}
