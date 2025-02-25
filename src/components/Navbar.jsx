import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 h-16 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-between items-center">
        {/* 로고 */}
        <NavLink to="/" className="text-2xl font-bold text-blue-600">
          MyLogo
        </NavLink>

        {/* 네비게이션 버튼들 */}
        <div className="space-x-4">
          <NavLink to="/blogs" className="text-gray-700 hover:text-blue-500">
            Blogs
          </NavLink>
          <NavLink to="/projects" className="text-gray-700 hover:text-blue-500">
            Projects
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;