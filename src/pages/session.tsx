import { SessionTimer } from "../components/sessions/SessionTimer";

export default function Session() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Timer and Controls */}
      <div className="lg:col-span-2 space-y-8">
        {/* Timer*/}
        <div
          className="p-12 rounded-3xl shadow-lg flex justify-center"
          style={{
            backgroundColor: "var(--off-white)",
          }}
        >
          <SessionTimer
            elapsedTime={3750}
            isRunning={false}
            isOnBreak={false}
          />
        </div>
      </div>
    </div>
  );
}
