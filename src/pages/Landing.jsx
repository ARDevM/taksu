import { Link } from "react-router-dom";
import Navbar from "../components/ui/Navbar";
import ProfileBadge from "../components/ProfileBadges";
import { getAuth } from "../store/auth";
import { useState, useEffect } from "react";
import LoginModal from "../components/auth/LoginModal";
export default function Landing() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    setAuth(getAuth());
  }, []);

  const user = auth?.user;
  const role = auth?.role;
  const [showLogin, setShowLogin] = useState(false);
  return (
    <div className="min-h-screen bg-[#f8f7f3] text-[#1f3d2b] font-serif">

      <Navbar />
      {!user && (
          <div className="mt-10 flex justify-center gap-8 text-xs tracking-[0.35em] uppercase">
            <button
              onClick={() => setShowLogin(true)}
              className="hover:underline underline-offset-4"
            >
              Login
            </button>
            <Link
              to="/register"
              className="hover:underline underline-offset-4"
            >
              Register
            </Link>
          </div>
        )}

        {user && (role === "customer" || user.role === "customer") && (
          <div className="mt-10 flex justify-center">
            <ProfileBadge user={user} />
          </div>
        )}
      <LoginModal
        open={showLogin}
        onClose={() => setShowLogin(false)}
      />

      {/* ================= HERO ================= */}
      <section className="max-w-7xl mx-auto px-6 pt-28 pb-24 grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <img
              src="https://img.icons8.com/ios/100/1f3d2b/coffee.png"
              alt="coffee"
              className="h-12"
            />
            <span className="tracking-[0.3em] text-xs uppercase">
              Book Cafe & Library
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight">
            Ruang Tenang <br />
            untuk Pikiran <br />
            yang Lapar
          </h2>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#1f3d2b]/80">
            Ruang tenang bagi pembaca, seniman, dan penikmat kopi.
            Tempat bertemunya literasi, diskusi, dan inspirasi.
          </p>

          <div className="mt-10 flex flex-wrap gap-6">
            <Link
              to="/register"
              className="bg-[#1f3d2b] text-[#f8f7f3] px-10 py-4 rounded-full text-xs tracking-[0.35em] uppercase shadow-lg hover:bg-[#2f5a40] transition"
            >
              Become a Member
            </Link>

            <Link
              to="/books"
              className="border border-[#1f3d2b] px-10 py-4 rounded-full text-xs tracking-[0.35em] uppercase hover:bg-[#1f3d2b] hover:text-[#f8f7f3] transition"
            >
              Explore Books
            </Link>
          </div>

          {/* {user && (role === "customer" || user.role === "customer") && (
            <div className="mt-10">
              <ProfileBadge user={user} />
            </div>
          )} */}
        </div>

        {/* RIGHT */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1521017432531-fbd92d768814"
            alt="Book Cafe"
            className="rounded-3xl shadow-2xl w-full h-[420px] object-cover"
          />

          <div className="absolute -bottom-8 -left-8 bg-[#1f3d2b] text-[#f8f7f3] p-6 rounded-2xl shadow-xl hidden lg:block">
            <p className="text-sm tracking-widest uppercase">Since</p>
            <p className="text-2xl font-bold">2024</p>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-3 gap-12 text-center">

          {[
            {
              icon: "https://img.icons8.com/ios/100/1f3d2b/coffee-to-go.png",
              title: "Artisan Coffee",
              desc: "Biji kopi pilihan dengan metode seduh terbaik."
            },
            {
              icon: "https://img.icons8.com/ios/100/1f3d2b/books.png",
              title: "Independent Books",
              desc: "Koleksi kurasi buku lokal & internasional."
            },
            {
              icon: "https://img.icons8.com/ios/100/1f3d2b/conference-call.png",
              title: "Community Space",
              desc: "Diskusi, baca puisi, dan ruang kreatif."
            }
          ].map((item, i) => (
            <div key={i} className="px-6">
              <img src={item.icon} className="h-12 mx-auto mb-6" />
              <h3 className="font-semibold text-lg mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-[#1f3d2b]/70 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}

        </div>
      </section>

      {/* ================= NEW RELEASE ================= */}
      <section className="bg-[#f2f1ec] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-center text-2xl font-semibold mb-16 tracking-wide">
            New Release Books
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {[1, 2, 3, 4].map((_, i) => (
              <div key={i} className="group">
                <div className="overflow-hidden rounded-xl shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1544947950-fa07a98d237f"
                    className="h-64 w-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>

                <h4 className="mt-4 text-sm font-semibold">
                  The Silent Library
                </h4>
                <p className="text-xs text-[#1f3d2b]/60">
                  Rp 85.000
                </p>

                <button className="mt-4 w-full border py-2 text-xs tracking-widest hover:bg-[#1f3d2b] hover:text-white transition">
                  ADD TO CART
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="py-16 text-center text-sm text-[#1f3d2b]/60">
        © 2025 Taksu Book Cafe · All Rights Reserved
      </footer>
    </div>
  );
}
