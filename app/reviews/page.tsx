export default function ReviewsPage() {
  return (
    <main className="container mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">Отзывы</h1>
      <p className="text-black/70 mt-2">
        Здесь будут отзывы клиентов. Пришлите скриншоты или тексты — оформлю красиво (карточки, звёздочки, дата, ссылка на профиль).
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-white shadow-[0_10px_25px_rgba(0,0,0,.07)] p-6">
          <p className="font-semibold">Марина</p>
          <p className="text-black/70 mt-2">
            Делала локальные височные зоны — получилось очень натурально, капсулы не ощущаются. Спасибо, Настя!
          </p>
        </div>
        <div className="rounded-2xl bg-white shadow-[0_10px_25px_rgba(0,0,0,.07)] p-6">
          <p className="font-semibold">Анна</p>
          <p className="text-black/70 mt-2">
            Хотела чуть длины и объёма — сделали за 2 часа, всё супер. Рекомендую!
          </p>
        </div>
      </div>
    </main>
  );
}
