export default function Footer() {
  return (
    <footer className="bg-white shadow text-center py-3 mt-auto">
      <p className="text-gray-500 text-sm">
        © {new Date().getFullYear()} All rights reserved.
      </p>
    </footer>
  );
}
