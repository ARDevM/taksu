import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    const menus = [
        { label: "Home", to: "/" },
        { label: "Taksu Pustaka", to: "/pustaka" },
        { label: "Book Cafe", to: "/cafe" },
        { label: "Space", to: "/space" },
        { label: "Events & Workshops", to: "/events" },
    ];

    return (
        <header className="bg-[#f8f7f3] text-[#1f3d2b] relative z-40">
            <section className="max-w-7xl mx-auto px-6 pt-20 pb-14 text-center">

                {/* BRAND ICON */}
                <div className="flex justify-center mb-8">
                    <svg
                        width="48"
                        height="48"
                        viewBox="0 0 64 64"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-[#1f3d2b]"
                    >
                        <path
                            d="M20 44C20 49 25 54 32 54C39 54 44 49 44 44V22H20V44Z"
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                        <path
                            d="M20 22C20 16 44 16 44 22"
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                        <path
                            d="M46 26C51 26 54 30 54 34C54 38 51 42 46 42"
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                        <path
                            d="M26 14C26 10 24 8 22 6"
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                        <path
                            d="M32 14C32 10 30 8 28 6"
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                    </svg>
                </div>

                {/* BRAND NAME */}
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-[0.12em]">
                    TAKSU BOOK CAFE
                </h1>

                {/* TAGLINE */}
                <p className="mt-5 text-sm md:text-base tracking-[0.35em] uppercase text-[#1f3d2b]/70">
                    Book Cafe & Independent Library
                </p>

            </section>
            {/* ================= DESKTOP NAV ================= */}
            <div className="hidden lg:flex justify-center">
                <nav className="
          bg-[#1f3d2b]
          px-16 py-4

          shadow-lg
        ">
                    <ul className="
            flex items-center gap-16
            text-xs tracking-[0.3em] uppercase
            text-[#f8f7f3]
          ">
                        {menus.map((menu, i) => (
                            <li key={i} className="relative group">
                                <Link
                                    to={menu.to}
                                    className="opacity-90 hover:opacity-100 transition"
                                >
                                    {menu.label}
                                </Link>

                                {/* underline */}
                                <span
                                    className="
                    absolute left-1/2 -bottom-2
                    h-px w-0
                    bg-[#f8f7f3]
                    transition-all duration-300
                    group-hover:w-full
                    group-hover:left-0
                  "
                                />
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            {/* ================= MOBILE NAV ================= */}
            <div className="lg:hidden px-6 flex justify-between items-center py-4">

                <span className="text-xs tracking-[0.3em] uppercase font-semibold">
                    Menu
                </span>

                <button
                    onClick={() => setOpen(!open)}
                    className="flex flex-col gap-1"
                >
                    <span className={`h-px w-6 bg-[#1f3d2b] transition ${open && "rotate-45 translate-y-[6px]"}`} />
                    <span className={`h-px w-6 bg-[#1f3d2b] transition ${open && "opacity-0"}`} />
                    <span className={`h-px w-6 bg-[#1f3d2b] transition ${open && "-rotate-45 -translate-y-[6px]"}`} />
                </button>
            </div>

            {/* ================= MOBILE MENU ================= */}
            {open && (
                <div className="
          lg:hidden
          absolute top-full left-0 w-full
          bg-[#f8f7f3]
          border-t
          shadow-xl
        ">
                    <ul className="
            flex flex-col
            text-sm tracking-widest uppercase
          ">
                        {menus.map((menu, i) => (
                            <li key={i} className="border-b">
                                <Link
                                    to={menu.to}
                                    onClick={() => setOpen(false)}
                                    className="
                    block px-6 py-4
                    hover:bg-[#1f3d2b]
                    hover:text-[#f8f7f3]
                    transition
                  "
                                >
                                    {menu.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* ================= DOUBLE DIVIDER ================= */}
            <div className="max-w-7xl mx-auto px-6 mt-4">
                <div className="space-y-1">
                    <div className="h-px bg-[#1f3d2b]/80" />
                    <div className="h-px bg-[#1f3d2b]/40" />
                </div>
            </div>
        </header>
    );
}
