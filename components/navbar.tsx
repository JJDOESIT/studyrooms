import "@/app/globals.css";
import Door from "@/components/door.svg";

export default function Navbar() {
  return (
    <header className="bg-white text-blue-600 py-1 shadow-md h-[10vh] flex justify-center items-center z-50 relative">
      <div className="flex items-center justify-between w-full max-w-6xl px-4 mx-auto">
        <div className="flex items-center">
          <Door className="inline w-8 h-8 text-blue-600 md:w-16 md:h-16" />
          <a
            className="text-xl text-3xl font-bold no-underline hover:text-blue-400 md:text-4xl"
            href="/"
          >
            Studyrooms
          </a>
        </div>
        <nav>
          <ul className="flex items-center justify-center gap-6 p-0 m-0">
            <li>
              <a
                href="/login"
                className="text-xs no-underline hover:text-blue-400 md:text-lg"
              >
                Login
              </a>
            </li>
            <li>
              <a
                href="/sign-up"
                className="text-xs no-underline hover:text-blue-400 md:text-lg"
              >
                Sign Up
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
