"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  LayoutGrid,
  ClipboardList,
  MessageCircle,
  ListTodo,
  Clock,
  Star,
  Users,
  MessageSquare,
  MessagesSquare,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const mainNav = [
  { name: "Overview", href: "/", icon: LayoutGrid },
  { name: "Projects", href: "/projects", icon: ClipboardList, badge: "" },
  { name: "Inbox", href: "/inbox", icon: MessageCircle, badge: "05" },
  { name: "My Tasks", href: "/tasks", icon: ListTodo, badge: "03" },
  { name: "Activities", href: "/activities", icon: Clock },
];

const workspaces = [
  { name: "My Workspace", href: "/workspace", icon: LayoutGrid },
  { name: "Xenvo Project", href: "/xenvo", icon: "X", badge: "04", color: "bg-purple-500" },
  { name: "UI UX Design", href: "/design", icon: "U", color: "bg-orange-500" },
  { name: "Favorites", href: "/favorites", icon: Star },
];

const collaboration = [
  { name: "Xenvo Team", href: "/team", icon: "X", color: "bg-purple-500" },
  { name: "DMs", href: "/messages", icon: MessageSquare, badge: "10" },
  { name: "Channels", href: "/channels", icon: MessagesSquare },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const NavItem = ({ item }: { item: any }) => {
    const isActive = pathname === item.href;
    const IconComponent = typeof item.icon === "string" ? null : item.icon;

    if (isCollapsed) {
      return (
        <Link
          href={item.href}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg relative group",
            isActive ? "bg-secondary" : "hover:bg-secondary/80"
          )}
        >
          {IconComponent ? (
            <IconComponent className="h-5 w-5" />
          ) : (
            <div className={cn("h-5 w-5 rounded flex items-center justify-center text-white", item.color)}>
              {item.icon}
            </div>
          )}
          {item.badge && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
              {item.badge}
            </span>
          )}
          <div className="absolute left-12 hidden rounded-md bg-popover px-2 py-1 text-sm text-popover-foreground shadow-md group-hover:block">
            {item.name}
          </div>
        </Link>
      );
    }

    return (
      <Link
        href={item.href}
        className={cn(
          "flex items-center gap-x-3 rounded-lg px-3 py-2 text-sm font-medium",
          isActive ? "bg-secondary" : "hover:bg-secondary/80"
        )}
      >
        {IconComponent ? (
          <IconComponent className="h-5 w-5" />
        ) : (
          <div className={cn("h-5 w-5 rounded flex items-center justify-center text-white", item.color)}>
            {item.icon}
          </div>
        )}
        <span className="flex-1">{item.name}</span>
        {item.badge && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
            {item.badge}
          </span>
        )}
      </Link>
    );
  };

  return (
    <div className="relative flex">
      <div
        className={cn(
          "flex flex-col gap-y-4 border-r p-4 transition-all duration-300",
          isCollapsed ? "w-[72px]" : "w-64"
        )}
      >
        <div className="flex items-center justify-between">
          {!isCollapsed && <h2 className="text-lg font-semibold">Manus</h2>}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={cn(
              "rounded-lg p-1.5 hover:bg-secondary/80",
              isCollapsed && "mx-auto"
            )}
          >
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
        </div>

        <div>
          <nav className="space-y-1">
            {mainNav.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </nav>
        </div>

        <div className="h-px bg-border" />

        <div>
          {!isCollapsed && (
            <h3 className="mb-2 px-2 text-sm font-medium text-muted-foreground">
              Workspaces
            </h3>
          )}
          <nav className="space-y-1">
            {workspaces.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </nav>
        </div>

        <div className="h-px bg-border" />

        <div>
          {!isCollapsed && (
            <h3 className="mb-2 px-2 text-sm font-medium text-muted-foreground">
              Team Collaboration
            </h3>
          )}
          <nav className="space-y-1">
            {collaboration.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}