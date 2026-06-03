import Link from "next/link";

export interface NavigationLink {
  href: string;
  icon: string;
  label: string;
}

const NavigationLinkItem = ({link}: {link: NavigationLink}) => (
  <Link
    href={link.href}
    className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
  >
    <span className="text-xl">{link.icon}</span>
    <span className="font-medium">{link.label}</span>
  </Link>
);

export default NavigationLinkItem;
