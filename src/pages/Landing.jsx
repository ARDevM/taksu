    import { Link } from "react-router-dom";

    export default function Landing() {
    return (
        <div className="min-h-screen bg-[#f5f1e8] text-neutral-900 font-serif">
        {/* Header */}
        <header className="border-b border-neutral-800 py-6 text-center">
            <h1 className="text-4xl font-bold tracking-widest">
            TAKSU BOOK CAFE
            </h1>
            <p className="italic text-sm mt-2">
            Since 2025 · Coffee · Books · Stories
            </p>
        </header>

        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">
            <div>
            <h2 className="text-3xl font-bold mb-4">
                A Place Where Coffee Meets Stories
            </h2>
            <p className="leading-relaxed text-lg">
                Taksu Book Cafe menghadirkan suasana klasik layaknya membaca
                koran pagi sambil menikmati kopi hangat.
            </p>

            <div className="mt-8 flex gap-4">
                <Link
                to="/login"
                className="px-6 py-3 border border-neutral-800 hover:bg-neutral-800 hover:text-white transition"
                >
                Masuk
                </Link>
                <Link
                to="/register"
                className="px-6 py-3 bg-neutral-800 text-white hover:bg-neutral-700 transition"
                >
                Daftar Member
                </Link>
            </div>
            </div>

            <div className="border border-neutral-800 p-6">
            <p className="uppercase tracking-widest text-xs mb-2">
                Daily Brew
            </p>
            <h3 className="text-2xl font-bold mb-3">
                Today’s Special
            </h3>
            <p className="italic">
                “A good coffee and a good book make the world quieter.”
            </p>
            </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-neutral-800 text-center py-6 text-sm">
            © 2025 Taksu Book Cafe · All Rights Reserved
        </footer>
        </div>
    );
    }
