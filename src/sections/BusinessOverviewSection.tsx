"use client";

// Minimal, form-only section inspired by the provided reference design
// Keeps the same exported component name for route/section compatibility.

type Props = Record<string, unknown>; // accept and ignore any incoming props safely

export default function BusinessOverviewSection(_: Props) {
  return (
    <section id="business-overview" className="h-[100dvh] md:h-screen overflow-hidden bg-[#ededed] text-black py-2.5 md:py-4">
      <div className="max-w-[92vw] md:max-w-[88vw] mx-auto h-full flex flex-col">
        {/* Top divider and small caption */}
        <div className="border-t border-black/60"></div>
        <div className="mt-2 text-[11px] uppercase tracking-wide font-extralight text-black/60">Contact Us</div>

        {/* Form */}
        <form className="mt-3 md:mt-5 flex flex-col flex-1">
          {/* HELLO, */}
          <div className="flex flex-wrap items-end gap-2">
            <div className="font-extrabold uppercase leading-[0.85] tracking-[-0.02em] text-[clamp(32px,8vw,96px)]">
              HELLO,
            </div>
          </div>

          {/* MY NAME IS  ______ */}
          <div className="mt-1 md:mt-2.5 flex items-end gap-2">
            <div className="font-extrabold uppercase leading-[0.85] tracking-[-0.02em] text-[clamp(28px,7.5vw,86px)] md:whitespace-nowrap">
              MY NAME IS
            </div>
            <input
              type="text"
              aria-label="Your name"
              className="min-w-0 flex-1 bg-transparent outline-none border-b border-black/60 text-right text-[12px] md:text-sm placeholder:text-gray-500 placeholder:italic py-2"
              placeholder="Enter your name here"
            />
          </div>
          {/* HERE IS MY EMAIL  ______ */}
          <div className="mt-1 md:mt-2.5 flex items-end gap-2">
            <div className="font-extrabold uppercase leading-[0.85] tracking-[-0.02em] text-[clamp(28px,7.5vw,86px)] md:whitespace-nowrap">
              HERE IS MY EMAIL
            </div>
            <input
              type="email"
              aria-label="Your email"
              className="min-w-0 flex-1 bg-transparent outline-none border-b border-black/60 text-right text-[12px] md:text-sm placeholder:text-gray-500 placeholder:italic py-2"
              placeholder="Enter your email here"
            />
          </div>

          {/* I'M LOOKING FOR  ______ */}
          <div className="mt-0.5 md:mt-1.5 flex items-end gap-2">
            <div className="font-extrabold uppercase leading-[0.85] tracking-[-0.02em] text-[clamp(22px,6.5vw,76px)] md:whitespace-nowrap">
              I’M LOOKING FOR
            </div>
            <textarea
              aria-label="Project details"
              rows={1}
              className="min-w-0 flex-1 bg-transparent outline-none border-b border-black/60 text-right text-[10px] md:text-xs placeholder:text-gray-500 placeholder:italic py-1.5 resize-none"
              placeholder="Enter your project details here"
            />
          </div>

          <div className="mt-auto mb-1 md:mb-2">
            <button
              type="submit"
              className="w-[82px] h-[82px] md:w-[118px] md:h-[118px] rounded-full bg-[#ff9f2e] text-white font-medium shadow-[0_10px_25px_rgba(0,0,0,0.15)] hover:scale-105 active:scale-95"
            >
              Send
            </button>
          </div>

        </form>
      </div>
    </section>
  );
}
