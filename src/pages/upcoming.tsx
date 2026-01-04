import toast from "react-hot-toast";
import { SessionForm } from "../components/upcoming/SessionForm";
import { TagManager } from "../components/upcoming/TagManager";
import { useAddTag, useGetTags } from "../hooks/useUpcoming";
import type { AddTagBody } from "../types/upcoming";

export default function Upcoming() {
  // Fetch users tags
  const { data: tagsData } = useGetTags();
  const tags = tagsData?.data.tags ?? [];

  const { mutate: addTag } = useAddTag();
  const handleAddTag = (tag: AddTagBody) => {
    addTag(tag, {
      onSuccess: () => {
        toast.success("Tag created");
      },
      onError: () => {
        toast.error("Failed to create tag");
      },
    });
  };
  const handleCreateSession = () => {};
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

        {/* Tags Section */}
        <section>
          <h2
            style={{
              fontSize: "36px",
              fontWeight: 600,
              color: "var(--text-primary)",
              marginBottom: "16px",
            }}
          >
            Tags
          </h2>
          <TagManager onAddTag={handleAddTag} />
        </section>

        {/* Create Session Section */}
        <section className="pt-5">
          <SessionForm tags={tags} onCreateSession={handleCreateSession} />
        </section>
      </div>
    </div>
  );
}
