import { NavigationLink } from "./navigationLinkItem";

export const navigationLinks: NavigationLink[] = [
  { href: "/admin/dashboard", icon: "📊", label: "Dashboard" },
  { href: "/admin/books", icon: "📚", label: "Books" },
  { href: "/admin/books/new", icon: "➕", label: "Add New Book" },
  { href: "/admin/categories", icon: "🏷️", label: "Categories" },
  { href: "/admin/users", icon: "👥", label: "Users" },
  { href: "/admin/reviews", icon: "⭐", label: "Reviews" },
  { href: "/admin/subscriptions", icon: "💳", label: "Subscriptions" },
  { href: "/admin/settings", icon: "⚙️", label: "Settings" },
];
