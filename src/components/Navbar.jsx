import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-600 shadow-md z-50 h-16 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-between items-center">
        {/* 로고 */}
        <NavLink to="/" className="text-2xl font-bold text-stone-50">
          MyLogo
        </NavLink>

        {/* 네비게이션 버튼들 */}
        <div className="space-x-6">
          <NavLink to="/blogs" className="text-gray-100 hover:text-white">
            Blogs
          </NavLink>
          <NavLink to="/projects" className="text-gray-100 hover:text-white">
            Projects
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;