import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import NavigationLinkItem, { NavigationLink } from "./navigationLinkItem";
import { navigationLinks } from "./navigationLinks";

const AdminLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link href="/admin" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">B</span>
                </div>
                <span className="text-xl font-bold">BookWise Admin</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{session.user.name}</span>
              <Link
                href="/"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                View Site
              </Link>
              <form action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}>
                <button type="submit" className="text-sm text-gray-600 hover:text-gray-900">
                  Sign Out
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-57px)] sticky top-[57px]">
          <nav className="p-4 space-y-1">
            {navigationLinks.map((link: NavigationLink) => (
              <NavigationLinkItem key={link.href} link={link} />
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}

export default AdminLayout;
