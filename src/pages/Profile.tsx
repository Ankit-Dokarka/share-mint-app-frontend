import { useState, useEffect, useRef, memo, useCallback } from "react";
import {
  FiMail,
  FiUser,
  FiCheck,
  FiCamera,
  FiUpload,
  FiLock,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import useAuth from "../context/auth/AuthContext";
import getName from "../utils/getName";
import { profileAPI } from "../api/profile/api";
import type { User } from "../types/auth";

type ToastType = "success" | "error";

const ProfileSkeleton = memo(() => (
  <div className="max-w-10xl mx-auto flex flex-col gap-8 animate-pulse">
    <div className="flex flex-col gap-2">
      <div className="h-7 w-32 bg-(--color-surface-strong) rounded-md"></div>
      <div className="h-4 w-64 bg-(--color-surface-strong) rounded-md"></div>
    </div>
    <div className="bg-(--color-surface) border border-(--color-border) rounded-xl p-6 flex items-center gap-6">
      <div className="w-20 h-20 rounded-full bg-(--color-surface-strong)"></div>
      <div className="flex flex-col gap-2 flex-1">
        <div className="h-5 w-40 bg-(--color-surface-strong) rounded-md"></div>
        <div className="h-4 w-56 bg-(--color-surface-strong) rounded-md"></div>
      </div>
      <div className="h-9 w-32 bg-(--color-surface-strong) rounded-md"></div>
    </div>
    <div className="bg-(--color-surface) border border-(--color-border) rounded-xl p-6 flex flex-col gap-6">
      <div className="h-5 w-40 bg-(--color-surface-strong) rounded-md"></div>
      <div className="flex flex-col gap-2">
        <div className="h-4 w-20 bg-(--color-surface-strong) rounded"></div>
        <div className="h-11 w-full bg-(--color-surface-strong) rounded-md"></div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="h-4 w-24 bg-(--color-surface-strong) rounded"></div>
        <div className="h-11 w-full bg-(--color-surface-strong) rounded-md"></div>
      </div>
    </div>
  </div>
));

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<User | null>(user);
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
          setProfile(response.user);
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

  const showToast = useCallback((type: ToastType, message: string) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ type, message });
    toastTimerRef.current = setTimeout(() => setToast(null), 3000);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    try {
      const response = await profileAPI.updateProfile(fullName);
      if (response.success && response.user) {
        setProfile(response.user);
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
  }, [fullName, showToast]);

  const handleAvatarChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setIsUploading(true);
      try {
        const response = await profileAPI.updateAvatar(file);
        if (response.success && response.user) {
          setProfile((prev) =>
            prev ? { ...prev, avatar: response.user.avatar } : prev,
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
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    },
    [showToast],
  );

  const triggerFileInput = useCallback(() => {
    if (!isUploading) fileInputRef.current?.click();
  }, [isUploading]);

  if (isLoading || !profile) return <ProfileSkeleton />;

  const isSaveDisabled =
    isSaving ||
    fullName.trim() === (profile.fullName || "").trim() ||
    fullName.trim() === "";

  return (
    <div className="max-w-10xl mx-auto flex flex-col gap-8">
      {toast && (
        <div className="fixed top-20 right-6 z-50 animate-[slideIn_0.3s_ease-out]">
          <div
            className={`flex items-center gap-3 pl-3 pr-5 py-3 rounded-lg shadow-2xl border backdrop-blur-md ${
              toast.type === "success"
                ? "bg-(--color-success)/10 border-(--color-success)/30 text-(--color-success)"
                : "bg-(--color-danger)/10 border-(--color-danger)/30 text-(--color-danger)"
            }`}
          >
            {toast.type === "success" ? (
              <FiCheckCircle size={18} className="shrink-0" />
            ) : (
              <FiAlertCircle size={18} className="shrink-0" />
            )}
            <span className="text-sm font-medium">{toast.message}</span>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-1">
        <h1
          className="text-2xl font-bold text-(--color-text) tracking-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Profile
        </h1>
        <p className="text-sm text-(--color-text-muted)">
          Manage your personal information and account details.
        </p>
      </div>

      <div className="bg-(--color-surface) border border-(--color-border) rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <div className="relative shrink-0">
          <div
            className="w-20 h-20 rounded-full bg-(--color-surface-strong) text-(--color-text-soft) flex items-center justify-center text-2xl font-bold border border-(--color-border) overflow-hidden relative group cursor-pointer"
            onClick={triggerFileInput}
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
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <FiCamera className="text-white" size={24} />
            </div>
            {isUploading && (
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white animate-spin rounded-full"></div>
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

        <div className="flex-1 flex flex-col gap-1">
          <h2 className="text-lg font-bold text-(--color-text)">
            {getName(profile)}
          </h2>
          <p className="text-sm text-(--color-text-muted) flex items-center gap-1.5">
            <FiMail size={13} className="text-(--color-text-soft)" />
            {profile?.email}
          </p>
        </div>

        <button
          onClick={triggerFileInput}
          disabled={isUploading}
          className="px-4 py-2 border border-(--color-border) text-(--color-text) hover:bg-(--color-surface-strong) hover:border-(--color-text-soft) text-xs font-medium rounded-md transition-colors shadow-sm disabled:opacity-50"
        >
          <span className="flex items-center gap-2">
            <FiUpload size={14} />
            {isUploading ? "Uploading..." : "Change Photo"}
          </span>
        </button>
      </div>

      <div className="bg-(--color-surface) border border-(--color-border) rounded-xl">
        <div className="p-6 border-b border-(--color-border)">
          <h3 className="text-base font-semibold text-(--color-text)">
            Personal Information
          </h3>
          <p className="text-xs text-(--color-text-muted) mt-1">
            Update your personal details. Email address cannot be changed.
          </p>
        </div>

        <div className="p-6 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-(--color-text-muted) uppercase tracking-wider">
              Full Name
            </label>
            <div className="relative">
              <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-(--color-text-soft) z-10" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full border border-(--color-border) rounded-lg pl-10 pr-4 py-2.5 text-sm text-(--color-text) placeholder:text-(--color-text-soft) focus:border-(--color-primary) focus:ring-1 focus:ring-(--color-primary) focus:outline-none transition-all bg-(--color-bg) cursor-text"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-(--color-text-muted) uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-(--color-text-soft) z-10" />
              <input
                type="email"
                value={profile.email || ""}
                readOnly
                className="w-full border border-(--color-border) rounded-lg pl-10 pr-10 py-2.5 text-sm text-(--color-text-soft) focus:outline-none transition-all bg-(--color-bg) cursor-not-allowed"
              />
              <FiLock className="absolute right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-(--color-text-soft) z-10" />
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-(--color-surface-strong)/30 border-t border-(--color-border) rounded-b-xl flex justify-end">
          <button
            onClick={handleSave}
            disabled={isSaveDisabled}
            className="flex items-center gap-2 px-5 py-2 bg-(--color-primary) hover:bg-(--color-primary-hover) disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-md transition-colors shadow-sm"
          >
            {isSaving ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white animate-spin rounded-full"></div>
                Saving...
              </>
            ) : (
              <>
                <FiCheck size={14} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(Profile);
