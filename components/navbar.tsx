import "@/app/globals.css";

export default function Navbar() {
    return (
      <header className="bg-white text-blue-600 py-4 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold">Studyrooms</h1>
          <nav>
            <ul className="flex gap-6 text-lg">
              <li><a href="#" className="hover:text-blue-400">Login</a></li>
              <li><a href="#" className="hover:text-blue-400">Sign Up</a></li>
              <li><a href="#" className="hover:text-blue-400">About</a></li>
              <li><a href="#" className="hover:text-blue-400">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
  