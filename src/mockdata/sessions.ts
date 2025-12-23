import type { SessionAndTag } from "../types/session";

export const mockSessionTags = [
  {
    id: "tag-1",
    name: "Development",
    color: "#3B82F6",
  },
  {
    id: "tag-2",
    name: "Design",
    color: "#EC4899",
  },
  {
    id: "tag-3",
    name: "Review",
    color: "#F59E0B",
  },
  {
    id: "tag-4",
    name: "Learning",
    color: "#10B981",
  },
  {
    id: "tag-5",
    name: "Documentation",
    color: "#8B5CF6",
  },
];

const createMockSession = (
  id: string,
  name: string,
  startDate: Date,
  tagIndex: number,
  status: string = "SCHEDULED"
): SessionAndTag => {
  const endDate = new Date(startDate);
  endDate.setHours(endDate.getHours() + 1.5); // 1.5 hour session

  return {
    id,
    name,
    start_at: startDate.toISOString(),
    end_at: endDate.toISOString(),
    status,
    break_time: 5,
    tag: mockSessionTags[tagIndex],
  };
};

export const mockScheduledSessions: SessionAndTag[] = [
  createMockSession(
    "session-1",
    "React Component Design",
    new Date(new Date().setHours(14, 30, 0, 0)),
    0
  ),
  createMockSession(
    "session-2",
    "UI/UX Refinement",
    new Date(new Date().setHours(16, 0, 0, 0)),
    1
  ),
  createMockSession(
    "session-3",
    "Code Review",
    new Date(
      new Date(new Date().setDate(new Date().getDate() + 1)).setHours(
        10,
        0,
        0,
        0
      )
    ),
    2
  ),
  createMockSession(
    "session-4",
    "TypeScript Patterns",
    new Date(
      new Date(new Date().setDate(new Date().getDate() + 1)).setHours(
        14,
        30,
        0,
        0
      )
    ),
    3
  ),
  createMockSession(
    "session-5",
    "API Documentation",
    new Date(
      new Date(new Date().setDate(new Date().getDate() + 2)).setHours(
        10,
        0,
        0,
        0
      )
    ),
    4
  ),
];
