export default function Loading({ isFullScreen = false }) {
  return (
    <div
      className={`flex-1 flex bg-base-300 ${
        isFullScreen ? "h-screen" : "h-full"
      }`}
    >
      <div className="card m-auto flex items-center justify-center gap-4">
        <span className="loading loading-ring w-[100px]"></span>
        <div className="card-title">Loading...</div>
      </div>
    </div>
  );
}
