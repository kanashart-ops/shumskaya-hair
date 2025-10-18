export default function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-black/5">
      <div className="container mx-auto max-w-6xl px-4 py-10 text-sm text-black/70 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Shumskaya Hair, Молодечно</p>
        <p>
          Instagram:{" "}
          <a className="underline" href="https://instagram.com/shumskaya_hair" target="_blank">
            @shumskaya_hair
          </a>{" "}
          · Тел.:{" "}
          <a href="tel:+375-29-000-00-00" className="underline">
            +375 (29) 000-00-00
          </a>
        </p>
      </div>
    </footer>
  );
}
