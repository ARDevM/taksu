import { clearAuth } from "../store/auth";

export default function ProfileBadge({ user }) {
  return (
    <div className="
      flex items-center gap-4
      bg-white/80 backdrop-blur
      px-5 py-3
      rounded-full
      shadow-md
      border border-black/5
      max-w-full
    ">

      {/* AVATAR */}
      <div className="
        h-10 w-10
        rounded-full
        bg-[#1f3d2b]
        text-white
        flex items-center justify-center
        font-bold text-sm
        shrink-0
      ">
        {user?.name?.charAt(0).toUpperCase()}
      </div>

      {/* USER INFO */}
      <div className="min-w-0">
        <p className="text-sm font-semibold truncate max-w-[140px]">
          {user.name}
        </p>
        <p className="text-xs text-[#1f3d2b]/60 tracking-wide">
          Customer
        </p>
      </div>

      {/* DIVIDER */}
      <div className="h-6 w-px bg-black/10 mx-2 hidden sm:block" />

      {/* LOGOUT */}
      <button
        onClick={() => {
          clearAuth();
          window.location.reload();
        }}
        className="
          text-xs
          text-[#1f3d2b]/70
          hover:text-red-600
          transition
          whitespace-nowrap
        "
      >
        Logout
      </button>
    </div>
  );
}
