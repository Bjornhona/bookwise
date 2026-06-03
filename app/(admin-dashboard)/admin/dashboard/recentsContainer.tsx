import { User, Book } from "@prisma/client";

export interface RecentsDataType {
  type: string;
  data: User[] | Book[];
}

const RecentsContainer = ({ recent }: { recent: RecentsDataType }) => (
  <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
    <div className="p-6 border-b border-gray-200">
      <h2 className="text-xl font-bold text-gray-900">Recent {recent.type}</h2>
    </div>
    <div className="p-6">
      {recent.data.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No {recent.type.toLowerCase()} yet
        </p>
      ) : (
        <div className="space-y-4">
          {recent.data.map((item: User | Book) => {
            const isUser = typeof item === "object" && "fullName" in item;
            const isBook = typeof item === "object" && "title" in item;
            const colorClass = isUser && item.subscriptionTier === "LIFETIME" 
            ? "bg-purple-100 text-purple-700" 
            : isUser && item.subscriptionTier === "YEARLY"
            ? "bg-indigo-100 text-indigo-700"
            : isUser && item.subscriptionTier === "MONTHLY"
            ? "bg-blue-100 text-blue-700"
            : isUser 
            ? "bg-gray-100 text-gray-700" 
            : isBook && item.isPublished
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700";

            return (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">
                    {isUser
                      ? (item.fullName ?? "No name")
                      : (item.title ?? "No title")}
                  </p>
                  <p className="text-sm text-gray-600">
                    {isUser
                      ? item.email
                      : (item.author ?? "No author")}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${colorClass}`}
                  >
                    {isUser
                      ? item.subscriptionTier
                      : item.isPublished
                        ? "PUBLISHED"
                        : "DRAFT"}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  </div>
);

export default RecentsContainer;
