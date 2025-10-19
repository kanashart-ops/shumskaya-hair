export default function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-black/5 relative">
      <div className="container mx-auto max-w-6xl px-4 py-10 text-sm text-black/70 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Shumskaya Hair, Молодечно</p>
        <p>
          Instagram:{" "}
          <a
            className="underline"
            href="https://instagram.com/shumskaya_hair"
            target="_blank"
            rel="noreferrer"
          >
            @shumskaya_hair
          </a>{" "}
          · Тел.:{" "}
          <a href="tel:+375-33-350-70-19" className="underline">
            +375 (33) 350-70-19
          </a>
        </p>
      </div>

      {/* подпись в правом нижнем углу */}
      <div className="absolute bottom-2 right-4 text-xs text-black/40">
        Created by{" "}
        <a
          href="https://t.me/Art_aeee"
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-black/70"
        >
          ArtPab
        </a>
      </div>
    </footer>
  );
}
