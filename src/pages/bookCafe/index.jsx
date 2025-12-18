// src/pages/Catalog.jsx
import { useEffect, useMemo, useState } from "react";
import Navbar from "../../components/ui/Navbar";
/* ------------- sample data ------------- */
function sampleBooks() {
  return [
    {
      id: 1,
      title: "The Silent Library",
      author: "A. Nurhadi",
      type: "Fiction",
      stock: 12,
      cover:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Manual of Coffee Brewing",
      author: "Siti Rahma",
      type: "Non-Fiction",
      stock: 4,
      cover:
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "City Sketches",
      author: "Rudy Deriyadi",
      type: "Art",
      stock: 0,
      cover:
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "Notes from the Workshop",
      author: "Lina Putri",
      type: "Non-Fiction",
      stock: 7,
      cover:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 5,
      title: "Short Poems Collection",
      author: "M. Anwar",
      type: "Poetry",
      stock: 20,
      cover:
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 6,
      title: "Indie Press Anthology",
      author: "Taksu Editors",
      type: "Anthology",
      stock: 3,
      cover:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1200&auto=format&fit=crop",
    },
    // add more if needed...
  ];
}

/* ------------- BookCard ------------- */
function BookCard({ book, onView }) {
  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition transform hover:-translate-y-1">
      <div className="relative w-full">
        {/* image */}
        <div className="w-full h-64 md:h-56 overflow-hidden">
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* badge type */}
        <div className="absolute top-3 left-3 bg-[#1f3d2b] text-[#f8f7f3] text-xs px-3 py-1 rounded-full font-semibold">
          {book.type}
        </div>

        {/* stock / overlay */}
        {book.stock === 0 && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-sm font-semibold">
            Out of Stock
          </div>
        )}
      </div>

      <div className="p-4">
        <h4 className="text-sm md:text-base font-semibold leading-tight truncate">
          {book.title}
        </h4>

        <p className="text-xs text-[#1f3d2b]/70 mt-1 truncate">
          oleh {book.author}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="text-xs text-[#1f3d2b]/80">
            {book.stock > 0 ? (
              <span className="inline-flex items-center gap-2 bg-green-50 text-green-800 px-2 py-1 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293A1 1 0 103.293 10.707l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" />
                </svg>
                <span className="font-medium">{book.stock} in stock</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-2 py-1 rounded">
                Out of stock
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onView?.(book)}
              className="text-xs px-3 py-1 rounded-full border hover:bg-[#f3f2ee] transition"
            >
              View
            </button>

            <button
              className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                book.stock > 0
                  ? "bg-[#1f3d2b] text-[#f8f7f3] hover:bg-[#2f5a40]"
                  : "opacity-50 cursor-not-allowed"
              } transition`}
              disabled={book.stock === 0}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ------------- Sidebar (desktop + mobile content) ------------- */
function Sidebar({
  search,
  setSearch,
  types,
  selectedType,
  setSelectedType,
  resetFilters,
}) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow sticky top-6">
      <label className="text-xs font-semibold tracking-wide text-[#1f3d2b]/80">
        Cari
      </label>

      <div className="mt-2 flex gap-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari judul atau penulis..."
          className="flex-1 px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#1f3d2b]/30"
        />
        <button
          onClick={() => setSearch("")}
          className="px-3 py-2 bg-[#f3f2ee] rounded-lg text-sm"
          aria-label="Clear search"
        >
          Clear
        </button>
      </div>

      <hr className="my-4 border-[#eee]" />

      <div className="flex items-center justify-between">
        <h5 className="text-sm font-semibold">Filter jenis</h5>
        <button
          onClick={resetFilters}
          className="text-xs text-[#1f3d2b]/60 hover:underline"
        >
          Reset
        </button>
      </div>

      <div className="mt-3 grid gap-2">
        <button
          onClick={() => setSelectedType(null)}
          className={`text-sm text-left px-3 py-2 rounded-lg ${
            selectedType === null ? "bg-[#1f3d2b] text-[#f8f7f3]" : "hover:bg-[#f3f2ee]"
          }`}
        >
          All Types
        </button>

        {types.map((t) => (
          <button
            key={t}
            onClick={() => setSelectedType(t)}
            className={`text-sm text-left px-3 py-2 rounded-lg ${
              selectedType === t ? "bg-[#1f3d2b] text-[#f8f7f3]" : "hover:bg-[#f3f2ee]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------- Mobile drawer wrapper ------------- */
function MobileFiltersDrawer({ open, onClose, children }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => (document.body.style.overflow = "");
  }, [open]);

  return (
    <>
      {/* backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* panel */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-full max-w-xs bg-white z-50 transform transition-transform ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div className="p-4 h-full overflow-auto">{children}</div>
      </aside>
    </>
  );
}

/* ------------- Main Catalog Page ------------- */
export default function Catalog() {
  const [books] = useState(sampleBooks());
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sortBy, setSortBy] = useState("title");
  const [viewBook, setViewBook] = useState(null);

  // derive types
  const types = useMemo(() => {
    const s = new Set();
    books.forEach((b) => s.add(b.type));
    return [...s].sort();
  }, [books]);

  // filtered & sorted
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let res = books.filter((b) => {
      const matchesType = selectedType ? b.type === selectedType : true;
      const matchesQuery =
        q.length === 0 ||
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q);
      return matchesType && matchesQuery;
    });

    if (sortBy === "title") {
      res = res.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "author") {
      res = res.sort((a, b) => a.author.localeCompare(b.author));
    } else if (sortBy === "stock") {
      res = res.sort((a, b) => b.stock - a.stock);
    }

    return res;
  }, [books, search, selectedType, sortBy]);

  // reset filters
  const resetFilters = () => {
    setSelectedType(null);
    setSearch("");
  };

  // close mobile drawer on resize (so UI doesn't stay broken)
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f7f3] text-[#1f3d2b] font-serif">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* header */}
        <Navbar/>
        <div className="mb-10"></div>
        <div className="flex items-start justify-between gap-6 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold">Katalog Buku</h1>
            <p className="text-sm text-[#1f3d2b]/70 mt-1 max-w-xl">
              Temukan buku yang kamu cari — gunakan pencarian cepat atau filter jenis buku.
            </p>
          </div>

          {/* actions */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-3 bg-white p-2 rounded-full shadow">
              <label className="text-xs text-[#1f3d2b]/70">Sort</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm px-3 py-2 rounded"
                aria-label="Sort books"
              >
                <option value="title">Judul (A-Z)</option>
                <option value="author">Penulis (A-Z)</option>
                <option value="stock">Stok (Desc)</option>
              </select>
            </div>

            <div className="lg:hidden">
              <button
                onClick={() => setMobileOpen(true)}
                className="px-3 py-2 rounded-full border bg-white shadow text-sm"
                aria-expanded={mobileOpen}
                aria-controls="mobile-filters"
              >
                Filters
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* desktop sidebar */}
          <div className="hidden lg:block lg:col-span-3">
            <Sidebar
              search={search}
              setSearch={setSearch}
              types={types}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              resetFilters={resetFilters}
            />
          </div>

          {/* content */}
          <main className="col-span-1 lg:col-span-9">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-[#1f3d2b]/70">
                Menampilkan <span className="font-semibold">{filtered.length}</span> buku
                {selectedType ? ` • ${selectedType}` : ""}
              </p>

              <div className="hidden sm:flex gap-3 items-center">
                <label className="text-xs text-[#1f3d2b]/70">View</label>
                {/* placeholder for view toggle */}
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-md bg-white border" aria-label="Grid view">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h6v6H4zM14 6h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* card grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((b) => (
                <BookCard key={b.id} book={b} onView={(bk) => setViewBook(bk)} />
              ))}

              {filtered.length === 0 && (
                <div className="col-span-full bg-white p-8 rounded-2xl shadow text-center">
                  <p className="text-sm">Tidak ada buku yang sesuai.</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* mobile filters drawer */}
      <MobileFiltersDrawer open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Filter & Cari</h3>
          <button onClick={() => setMobileOpen(false)} className="text-sm text-[#1f3d2b]/70">Close</button>
        </div>

        <Sidebar
          search={search}
          setSearch={setSearch}
          types={types}
          selectedType={selectedType}
          setSelectedType={(t) => {
            setSelectedType(t);
            setMobileOpen(false);
          }}
          resetFilters={() => {
            resetFilters();
            setMobileOpen(false);
          }}
        />
      </MobileFiltersDrawer>

      {/* simple book detail modal */}
      {viewBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setViewBook(null)} />
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 relative z-10 shadow-xl">
            <button onClick={() => setViewBook(null)} className="absolute top-4 right-4">✕</button>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/3 rounded-lg overflow-hidden">
                <img src={viewBook.cover} alt={viewBook.title} className="w-full h-56 object-cover rounded-lg" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{viewBook.title}</h3>
                <p className="text-sm text-[#1f3d2b]/70 mt-2">oleh {viewBook.author}</p>
                <p className="mt-4 text-sm text-[#1f3d2b]/80">
                  Tipe: <span className="font-medium">{viewBook.type}</span>
                </p>
                <p className="mt-2 text-sm">
                  Stok:{" "}
                  <span className={viewBook.stock > 0 ? "font-semibold" : "text-red-600 font-semibold"}>
                    {viewBook.stock > 0 ? `${viewBook.stock} tersedia` : "Kosong"}
                  </span>
                </p>

                <div className="mt-6 flex gap-3">
                  <button className="px-4 py-2 rounded-full bg-[#1f3d2b] text-white">Add to Cart</button>
                  <button onClick={() => setViewBook(null)} className="px-4 py-2 rounded-full border">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
