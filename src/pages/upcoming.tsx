import { Plus } from "lucide-react";

export default function Upcoming() {
  const setIsSessionDialogOpen = (isOpen: boolean) => {
    return;
  };
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="mb-12">
          <h2 className="text-3xl font-semibold text-[var(--text-primary)] mb-2">
            Pomodoro Sessions
          </h2>
          <p className="text-xl mt-2 text-[var(--text-secondary)]">
            Schedule and manage your focus sessions
          </p>
        </header>

        {/* Action buttons*/}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setIsSessionDialogOpen(true)}
            className="rounded-xl px-6 py-3 flex items-center gap-2"
            style={{ backgroundColor: "var(--soft-blue)", color: "#FFFFFF" }}
          >
            <Plus className="w-5 h-5" />
            New Session
          </button>

          <button
            onClick={() => setIsSessionDialogOpen(true)}
            className="rounded-xl px-6 py-3 flex items-center gap-2 border-2"
            style={{
              borderColor: "var(--soft-blue)",
              color: "var(--soft-blue)",
              backgroundColor: "transparent",
            }}
          >
            <Plus className="w-5 h-5" />
            Create Tag
          </button>
        </div>

        {/* Tags Section */}
        <div
          className="rounded-3xl p-6 mb-8"
          style={{
            backgroundColor: 'var(--surface-white)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          }}
        >
          <h3 className="mb-4" style={{ color: 'var(--text-primary)' }}>
            Available Tags
          </h3>
          <div className="flex flex-wrap gap-3">
            {tags.map((tag) => (
              <TagBadge key={tag.id} tag={tag} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
