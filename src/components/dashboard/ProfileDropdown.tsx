import { useState } from "react";
import { FiUser, FiSettings, FiLogOut, FiChevronDown } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import getName from "../../utils/getName";

export default function ProfileDropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = async () => {
    await logout();
    setIsDropdownOpen(false);
    navigate("/");
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center gap-2 p-1 pr-2 rounded-full hover:bg-(--color-bg) border border-transparent hover:border-(--color-border) transition-all"
      >
        <div className="w-9 h-9 rounded-full bg-(--color-primary) text-(--color-surface) flex items-center justify-center font-semibold text-sm ring-2 ring-(--color-surface) shadow-sm">
          {user?.email?.[0]?.toUpperCase() || "U"}
        </div>
        <span className="hidden md:block text-sm font-medium text-(--color-text) capitalize">
          {getName(user)}
        </span>
        <FiChevronDown
          className="hidden md:block text-(--color-text-muted) transition-transform duration-200"
          style={{
            transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>

      {isDropdownOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsDropdownOpen(false)}
          ></div>
          <div className="absolute right-0 mt-2 w-64 bg-(--color-surface) border border-(--color-border) rounded-(--btn-radius) shadow-xl z-20 overflow-hidden origin-top-right">
            <div className="p-4 border-b border-(--color-border) bg-(--color-bg)/50">
              <p className="text-sm font-semibold text-(--color-text) capitalize">
                {getName(user)}
              </p>
              <p className="text-xs text-(--color-text-muted) truncate mt-0.5">
                {user?.email}
              </p>
            </div>

            <div className="p-2 flex flex-col gap-1">
              <button
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-(--color-text) hover:bg-(--color-bg) rounded-(--btn-radius) transition-colors"
                onClick={() => {
                  navigate("/dashboard/profile");
                  setIsDropdownOpen(false);
                }}
              >
                <FiUser size={16} className="text-(--color-text-muted)" />
                Profile
              </button>
              <button
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-(--color-text) hover:bg-(--color-bg) rounded-(--btn-radius) transition-colors"
                onClick={() => {
                  navigate("/dashboard/settings");
                  setIsDropdownOpen(false);
                }}
              >
                <FiSettings size={16} className="text-(--color-text-muted)" />
                Settings
              </button>

              <div className="my-1 h-px bg-(--color-border)"></div>

              <button
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-(--color-danger) hover:bg-(--color-danger)/10 rounded-(--btn-radius) transition-colors"
                onClick={handleLogout}
              >
                <FiLogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
