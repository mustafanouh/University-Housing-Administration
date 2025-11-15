export default function Header() {
  return (
    <header className="flex items-center justify-between bg-white shadow px-6 py-3">
      <h1 className="text-xl font-semibold text-gray-700">Dashboard</h1>
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="border rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <img
          src=".\src\assets\avatar.png"
          alt="User"
          className="w-9 h-9 rounded-full border"
        />
      </div>
    </header>
  );
}
