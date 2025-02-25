import { Link } from "react-router-dom"

function Button({to, children}) {
  return (
    <Link
      to={to}
      className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
    >
      {children}
    </Link>
  )
}

export default Button;
