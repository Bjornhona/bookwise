import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import StatsContainer, { StatsData } from "./statsContainer";
import RecentsContainer, { RecentsDataType } from "./recentsContainer";
import { User, Book } from "@prisma/client";

const AdminDashboardPage = async () => {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/admin/login");
  };

  // Fetch data from database
  const [
    totalBooks,
    totalUsers,
    totalCategories,
    paidSubscriptions,
    recentUsers,
    recentBooks,
  ] = await Promise.all([
    prisma.book.count(),
    prisma.user.count(),
    prisma.category.count(),
    prisma.user.count({
      where: {
        subscriptionTier: {
          in: ["MONTHLY", "YEARLY", "LIFETIME"],
        },
      },
    }),
    prisma.user.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        fullName: true,
        email: true,
        subscriptionTier: true,
        createdAt: true,
      },
    }),
    prisma.book.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        author: true,
        isPublished: true,
        createdAt: true,
      },
    }),
  ]);

  const statsData: StatsData[] = [
    { label: "Total Books", value: totalBooks, icon: "📚" },
    { label: "Total Users", value: totalUsers, icon: "👥" },
    { label: "Paid Subscriptions", value: paidSubscriptions, icon: "💎" },
    { label: "Total Categories", value: totalCategories, icon: "🏷️" },
  ];

  const recentsData: RecentsDataType[] = [
    { type: "Users", data: recentUsers as User[] },
    { type: "Books", data: recentBooks as Book[] },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back, {session.user.name || "Admin"}
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat: StatsData) => (
          <StatsContainer key={stat.label} stat={stat} />
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        {recentsData.map((recent: RecentsDataType) => (
          <RecentsContainer key={recent.type} recent={recent} />
        ))}
        {/* <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Recent Users</h2>
          </div>
          <div className="p-6">
            {recentUsers.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No users yet</p>
            ) : (
            <div className="space-y-4">
              {recentUsers.map((user: any) => (
                <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">fullName</p>
                    <p className="text-sm text-gray-600">email</p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold   `}
                    >
                      subscriptionTier
                    </span>
                    <p className="text-xs text-gray-500 mt-1">createdAt</p>
                  </div>
                </div>))}
              </div>
            )}
          </div>
        </div> */}

        {/* Recent Books */}
        {/* <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Recent Books</h2>
          </div>
          <div className="p-6">
            <p className="text-gray-500 text-center py-8">No books yet</p>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">title</p>
                  <p className="text-sm text-gray-600">author</p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold  `}
                  >
                    PUBLISHED
                  </span>
                  <p className="text-xs text-gray-500 mt-1">createdAt</p>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/admin/books/new"
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-4 transition-all flex items-center space-x-3"
          >
            <span className="text-2xl">➕</span>
            <span className="font-semibold">Add New Book</span>
          </a>
          <a
            href="/admin/books"
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-4 transition-all flex items-center space-x-3"
          >
            <span className="text-2xl">📖</span>
            <span className="font-semibold">Manage Books</span>
          </a>
          <a
            href="/admin/users"
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-4 transition-all flex items-center space-x-3"
          >
            <span className="text-2xl">👤</span>
            <span className="font-semibold">Manage Users</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
