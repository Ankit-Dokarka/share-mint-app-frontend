import { useState, memo, useCallback } from "react";

type ToggleProps = {
  enabled: boolean;
  onChange: () => void;
};

const Toggle = memo(({ enabled, onChange }: ToggleProps) => (
  <button
    type="button"
    onClick={onChange}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
      enabled ? "bg-(--color-primary)" : "bg-(--color-border)"
    }`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        enabled ? "translate-x-6" : "translate-x-1"
      }`}
    />
  </button>
));
Toggle.displayName = "Toggle";

type NotificationSettings = {
  email: boolean;
  push: boolean;
  weekly: boolean;
};

const Settings = () => {
  const [notifications, setNotifications] = useState<NotificationSettings>({
    email: true,
    push: false,
    weekly: true,
  });

  const handleToggle = useCallback((key: keyof NotificationSettings) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  return (
    <div className="max-w-10xl mx-auto flex flex-col gap-6">
      {/* Notification Settings */}
      <div className="bg-(--color-surface) border border-(--color-border) rounded-(--btn-radius) shadow-sm p-6">
        <h3 className="text-lg font-semibold text-(--color-text) mb-1">
          Notifications
        </h3>
        <p className="text-sm text-(--color-text-muted) mb-6">
          Manage how you receive updates and alerts.
        </p>

        <div className="flex flex-col gap-1 divide-y divide-(--color-border)">
          <div className="flex items-center justify-between py-4">
            <div>
              <p className="text-sm font-medium text-(--color-text)">
                Email Notifications
              </p>
              <p className="text-xs text-(--color-text-muted)">
                Get notified about new expenses and settlements via email.
              </p>
            </div>
            <Toggle
              enabled={notifications.email}
              onChange={() => handleToggle("email")}
            />
          </div>

          <div className="flex items-center justify-between py-4">
            <div>
              <p className="text-sm font-medium text-(--color-text)">
                Push Notifications
              </p>
              <p className="text-xs text-(--color-text-muted)">
                Receive alerts directly on your device.
              </p>
            </div>
            <Toggle
              enabled={notifications.push}
              onChange={() => handleToggle("push")}
            />
          </div>

          <div className="flex items-center justify-between py-4">
            <div>
              <p className="text-sm font-medium text-(--color-text)">
                Weekly Summary
              </p>
              <p className="text-xs text-(--color-text-muted)">
                A weekly email summarizing your group expenses.
              </p>
            </div>
            <Toggle
              enabled={notifications.weekly}
              onChange={() => handleToggle("weekly")}
            />
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-(--color-surface) border border-(--color-border) rounded-(--btn-radius) shadow-sm p-6">
        <h3 className="text-lg font-semibold text-(--color-text) mb-1">
          Preferences
        </h3>
        <p className="text-sm text-(--color-text-muted) mb-6">
          Customize your application experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-(--color-text)">
              Default Currency
            </label>
            <select
              className="w-full border border-(--color-border) rounded-(--btn-radius) px-3 py-2.5 text-sm text-(--color-text) focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary)/20 focus:outline-none transition-all bg-(--color-surface) cursor-pointer"
              defaultValue="USD"
            >
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="INR">INR - Indian Rupee</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-(--color-text)">
              Time Zone
            </label>
            <select
              className="w-full border border-(--color-border) rounded-(--btn-radius) px-3 py-2.5 text-sm text-(--color-text) focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary)/20 focus:outline-none transition-all bg-(--color-surface) cursor-pointer"
              defaultValue="UTC-5"
            >
              <option value="UTC-5">(UTC-05:00) Eastern Time</option>
              <option value="UTC-0">(UTC+00:00) London</option>
              <option value="UTC+1">(UTC+01:00) Central Europe</option>
              <option value="UTC+5">(UTC+05:30) India</option>
            </select>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-(--color-surface) border border-(--color-danger)/20 rounded-(--btn-radius) shadow-sm p-6">
        <h3 className="text-lg font-semibold text-(--color-danger) mb-1">
          Danger Zone
        </h3>
        <p className="text-sm text-(--color-text-muted) mb-6">
          Irreversible and destructive actions.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 border border-(--color-danger)/20 rounded-(--btn-radius) bg-(--color-danger)/5">
          <div>
            <p className="text-sm font-medium text-(--color-text)">
              Delete Account
            </p>
            <p className="text-xs text-(--color-text-muted)">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
          </div>
          <button className="px-4 py-2 bg-(--color-danger) hover:bg-(--color-danger-hover) text-(--color-surface) text-sm font-medium rounded-(--btn-radius) transition-colors shadow-sm whitespace-nowrap">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(Settings);
