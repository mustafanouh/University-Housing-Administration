// import { Home, ListTodo, Users, Settings } from "lucide-react";

import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-60 bg-gray-600 text-gray-100 min-h-screen p-4">
     
      <ul className="space-y-3">
        <li className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded-lg cursor-pointer">
          <Link to="/add-task">  Add New Task </Link>
        </li>
        <li className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded-lg cursor-pointer">
          <Link to="/"> Tasks</Link>
        </li>
        <li className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded-lg cursor-pointer">
          <Link to="/calendar"> Calendar</Link>
        </li>
        <li className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded-lg cursor-pointer">
          <Link to="/settings"> Settings</Link>
        </li>
        <li className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded-lg cursor-pointer">
         <Link to="/login">Log In</Link>
        </li>
           <li className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded-lg cursor-pointer">
         <Link to="/register">Register</Link>
        </li>
           <li className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded-lg cursor-pointer">
         <Link to="/logout">Log out</Link>
        </li>
      </ul>
    </aside>
  );
}
