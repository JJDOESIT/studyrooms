import "@/app/globals.css";

export default function Navbar() {
  return (
    <header className="bg-white text-blue-600 py-4 shadow-md h-[10vh]">
      <div className="flex items-center justify-between max-w-6xl px-4 mx-auto">
        <a
          className="text-2xl font-bold no-underline hover:text-blue-400"
          href="/"
        >
          Studyrooms
        </a>
        <nav>
          <ul className="flex gap-6 text-lg">
            <li>
              <a href="/login" className="no-underline hover:text-blue-400">
                Login
              </a>
            </li>
            <li>
              <a href="/sign-up" className="no-underline hover:text-blue-400">
                Sign Up
              </a>
            </li>
            <li>
              <a href="#" className="no-underline hover:text-blue-400">
                About
              </a>
            </li>
            <li>
              <a href="#" className="no-underline hover:text-blue-400">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
