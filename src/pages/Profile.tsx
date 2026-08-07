import { useState, useEffect, useRef } from "react";
import { FiMail, FiUser, FiCheck, FiCamera } from "react-icons/fi";
import useAuth from "../hooks/useAuth";
import getName from "../utils/getName";
import { profileAPI } from "../api/profile/api";

type ToastType = "success" | "error";

const ProfileSkeleton = () => (
  <div className="max-w-4xl mx-auto flex flex-col gap-6 animate-pulse">
    <div className="bg-(--color-surface) border border-(--color-border) rounded-(--btn-radius) shadow-sm overflow-hidden">
      <div className="h-32 bg-(--color-primary)/20"></div>
      <div className="px-6 pb-6 flex flex-col md:flex-row items-center gap-4">
        <div className="w-24 h-24 rounded-full bg-(--color-bg) border-4 border-(--color-surface) -mt-12 shadow-lg shrink-0 z-10"></div>
        <div className="flex-1 flex flex-col items-center md:items-start gap-2">
          <div className="h-5 w-32 bg-(--color-bg) rounded-(--btn-radius)"></div>
          <div className="h-4 w-48 bg-(--color-bg) rounded-(--btn-radius)"></div>
        </div>
      </div>
    </div>

    <div className="bg-(--color-surface) border border-(--color-border) rounded-(--btn-radius) shadow-sm p-6 md:p-8">
      <div className="h-6 w-40 bg-(--color-bg) rounded mb-6"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <div className="h-4 w-20 bg-(--color-bg) rounded"></div>
          <div className="h-11 w-full bg-(--color-bg) rounded-(--btn-radius) border border-(--color-border)"></div>
        </div>
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <div className="h-4 w-24 bg-(--color-bg) rounded"></div>
          <div className="h-11 w-full bg-(--color-bg) rounded-(--btn-radius) border border-(--color-border)"></div>
        </div>
      </div>
      <div className="flex justify-end mt-8">
        <div className="h-10 w-32 bg-(--color-primary)/30 rounded-(--btn-radius)"></div>
      </div>
    </div>
  </div>
);

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(user);
  const [isLoading, setIsLoading] = useState(true);

  const [fullName, setFullName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [toast, setToast] = useState<{
    type: ToastType;
    message: string;
  } | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await profileAPI.getProfile();
        if (response.success && response.user) {
          setProfile({
            _id: response.user._id,
            fullName: response.user.fullName,
            email: response.user.email,
            avatar: response.user.avatar,
          });
          setFullName(response.user.fullName);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const showToast = (type: ToastType, message: string) => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    setToast({ type, message });
    toastTimerRef.current = setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await profileAPI.updateProfile(fullName);
      if (response.success && response.user) {
        setProfile({
          _id: response.user._id,
          fullName: response.user.fullName,
          email: response.user.email,
          avatar: response.user.avatar,
        });
        showToast("success", "Profile updated successfully!");
      }
    } catch (error) {
      showToast(
        "error",
        error instanceof Error ? error.message : "Failed to update profile.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const response = await profileAPI.updateAvatar(file);
      if (response.success && response.user) {
        setProfile((prev) =>
          prev
            ? {
                ...prev,
                avatar: response.user.avatar,
              }
            : prev,
        );
        showToast("success", "Avatar updated successfully!");
      }
    } catch (error) {
      showToast(
        "error",
        error instanceof Error ? error.message : "Failed to upload avatar.",
      );
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Reset input so same file can be selected again
      }
    }
  };

  if (isLoading || !profile) {
    return <ProfileSkeleton />;
  }

  const isSaveDisabled =
    isSaving ||
    fullName.trim() === (profile.fullName || "").trim() ||
    fullName.trim() === "";

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 right-6 z-50 animate-[slideIn_0.3s_ease-out]">
          <div
            className={`flex items-center gap-3 px-4 py-3 rounded-(--btn-radius) shadow-lg border ${
              toast.type === "success"
                ? "bg-(--color-success)/10 border-(--color-success)/30 text-(--color-success)"
                : "bg-(--color-danger)/10 border-(--color-danger)/30 text-(--color-danger)"
            }`}
          >
            {toast.message}
          </div>
        </div>
      )}

      <div className="bg-(--color-surface) border border-(--color-border) rounded-(--btn-radius) shadow-sm overflow-hidden">
        <div className="h-32 bg-linear-to-br from-(--color-primary) to-(--color-primary-hover) relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_60%)]"></div>
        </div>
        <div className="px-6 pb-6 flex flex-col md:flex-row items-center gap-4">
          {/* Avatar Upload Container */}
          <div className="relative shrink-0 z-10 -mt-12">
            <div
              className="w-24 h-24 rounded-full bg-(--color-primary) text-(--color-surface) flex items-center justify-center text-3xl font-bold border-4 border-(--color-surface) shadow-lg overflow-hidden relative group cursor-pointer"
              onClick={() => !isUploading && fileInputRef.current?.click()} // <--- Added this line
            >
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt={profile.fullName}
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                profile?.email?.[0]?.toUpperCase() || "U"
              )}

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <FiCamera className="text-white" size={24} />
              </div>

              {/* Loading Overlay */}
              {isUploading && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white animate-spin rounded-full"></div>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
              disabled={isUploading}
            />
          </div>

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-xl font-bold text-(--color-text)">
              {getName(profile)}
            </h2>
            <p className="text-sm text-(--color-text-muted) flex items-center justify-center md:justify-start gap-1.5 mt-1">
              <FiMail size={14} />
              {profile?.email}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-(--color-surface) border border-(--color-border) rounded-(--btn-radius) shadow-sm p-6 md:p-8">
        <h3 className="text-lg font-bold text-(--color-text) mb-6">
          Personal Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-sm font-medium text-(--color-text)">
              Full Name
            </label>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-(--color-text-muted) z-10" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full border border-(--color-border) rounded-(--btn-radius) pl-9 pr-3 py-3 text-sm text-(--color-text) placeholder:text-(--color-text-muted)/60 focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary)/20 focus:outline-none transition-all bg-(--color-surface) cursor-text"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-sm font-medium text-(--color-text)">
              Email Address
            </label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-(--color-text-muted) z-10" />
              <input
                type="email"
                value={profile.email || ""}
                readOnly
                className="w-full border border-(--color-border) rounded-(--btn-radius) pl-9 pr-3 py-3 text-sm text-(--color-text) placeholder:text-(--color-text-muted)/60 focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary)/20 focus:outline-none transition-all bg-(--color-bg)/50 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button
            onClick={handleSave}
            disabled={isSaveDisabled}
            className="flex items-center gap-2 px-6 py-3 bg-(--color-primary) hover:bg-(--color-primary-hover) disabled:opacity-60 disabled:cursor-not-allowed text-(--color-surface) text-sm font-medium rounded-(--btn-radius) transition-colors shadow-sm"
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white animate-spin rounded-full"></div>
                Saving...
              </>
            ) : (
              <>
                <FiCheck size={16} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
