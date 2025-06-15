import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="font-bold text-xl">Logo</Link>
          <div>
            <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar