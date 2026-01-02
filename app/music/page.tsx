import Image from "next/image";

type Release = {
  title: string;
  cover: string;
  smartlink: string;
  tag?: string;
};

const releases: Release[] = [
  {
    title: "Yabai Type Shit",
    cover: "/images/singles/yabai-type-shit.jpg",
    smartlink: "https://ffm.to/yabaitg",
    tag: "Single",
  },
  {
    title: "Like A Rockstar",
    cover: "/images/singles/like-a-rockstar.jpg",
    smartlink: "https://ffm.to/rockstaraf",
    tag: "Single",
  },
  {
    title: "Welcome To New York",
    cover: "/images/singles/welcome-to-new-york.png",
    smartlink: "https://fanlink.tv/welcome2newyork",
    tag: "Single",
  },
  {
    title: "My Angel",
    cover: "/images/singles/my-angel.jpg",
    smartlink: "https://fanlink.tv/my_angel",
    tag: "Single",
  },
  {
    title: "Gorgeous",
    cover: "/images/singles/gorgeous.jpg",
    smartlink: "https://fanlink.tv/gorgeous444",
    tag: "Single",
  },
  {
    title: "Bitchiest",
    cover: "/images/singles/bitchiest.jpg",
    smartlink: "https://fanlink.tv/bitchiest",
    tag: "Single",
  },
  {
    title: "Ijburg",
    cover: "/images/singles/ijburg.jpg",
    // TODO: replace this placeholder with the real smartlink for IJburg
    smartlink: "https://example.com/ijburg",
    tag: "Single",
  },
];

export default function Music() {
  return (
    <section className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 py-16 space-y-10">
        <header className="space-y-2 text-center">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900">
            Music
          </h1>
          <p className="mt-1 text-sm font-extralight text-zinc-600">
            Explore my releases and tap any cover to listen on your favorite platform.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {releases.map((release) => (
            <a
              key={release.title}
              href={release.smartlink}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-xl border border-zinc-200 bg-white/80 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src={release.cover}
                  alt={release.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="px-4 py-4 flex flex-col gap-1">
                {release.tag && (
                  <span className="text-[0.65rem] uppercase tracking-[0.18em] text-zinc-500">
                    {release.tag}
                  </span>
                )}
                <h2 className="text-sm md:text-base font-semibold text-zinc-900">
                  {release.title}
                </h2>
                <span className="mt-2 inline-flex items-center justify-center rounded-full border border-zinc-900 bg-zinc-900 px-3 py-1 text-[0.7rem] uppercase tracking-[0.18em] text-white group-hover:bg-white group-hover:text-zinc-900 transition-colors">
                  Listen
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

