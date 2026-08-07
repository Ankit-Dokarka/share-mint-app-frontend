import {
  FiTag,
  FiCheckCircle,
  FiWifi,
  FiMapPin,
  FiClock,
} from "react-icons/fi";
import type { IconType } from "react-icons";

type Activity = {
  id: number;
  desc: string;
  amount: string;
  date: string;
  icon: IconType;
  isPositive: boolean;
};

export default function Recent() {
  const activities: Activity[] = [
    {
      id: 1,
      desc: "Movie Tickets",
      amount: "-$30.00",
      date: "Today, 8:30 PM",
      icon: FiTag,
      isPositive: false,
    },
    {
      id: 2,
      desc: "Settled up with Jane",
      amount: "+$50.00",
      date: "Yesterday, 2:15 PM",
      icon: FiCheckCircle,
      isPositive: true,
    },
    {
      id: 3,
      desc: "Internet Bill",
      amount: "-$25.00",
      date: "Oct 24, 10:00 AM",
      icon: FiWifi,
      isPositive: false,
    },
    {
      id: 4,
      desc: "Uber Ride",
      amount: "-$15.00",
      date: "Oct 23, 11:45 PM",
      icon: FiMapPin,
      isPositive: false,
    },
  ];

  return (
    <div className="bg-(--color-surface) border border-(--color-border) rounded-(--btn-radius) shadow-sm overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-(--color-border)">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-(--color-text)">
            Recent Activities
          </h2>
          <p className="text-sm text-(--color-text-muted) mt-1">
            Your latest transactions and settlements
          </p>
        </div>
        <div className="w-10 h-10 flex items-center justify-center rounded-(--btn-radius) bg-(--color-primary)/10 text-(--color-primary)">
          <FiClock size={20} />
        </div>
      </div>

      <div className="divide-y divide-(--color-border)">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div
              key={activity.id}
              className="flex items-center gap-4 p-5 hover:bg-(--color-bg) transition-colors duration-200 group cursor-pointer"
            >
              <div
                className={`w-11 h-11 flex items-center justify-center rounded-full shrink-0 transition-colors ${
                  activity.isPositive
                    ? "bg-(--color-success)/10 text-(--color-success)"
                    : "bg-(--color-danger)/10 text-(--color-danger)"
                } group-hover:scale-105 transition-transform`}
              >
                <Icon size={18} />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-(--color-text) truncate">
                  {activity.desc}
                </p>
                <p className="text-xs text-(--color-text-muted) mt-1">
                  {activity.date}
                </p>
              </div>

              <div className="text-right">
                <p
                  className={`text-sm font-bold inline-block px-2.5 py-1 rounded-full ${
                    activity.isPositive
                      ? "text-(--color-success) bg-(--color-success)/10"
                      : "text-(--color-danger) bg-(--color-danger)/10"
                  }`}
                >
                  {activity.amount}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 bg-(--color-bg)/50 border-t border-(--color-border) text-center">
        <button className="text-sm font-medium text-(--color-primary) hover:underline focus:outline-none">
          Load More Activities
        </button>
      </div>
    </div>
  );
}
