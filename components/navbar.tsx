import "@/app/globals.css";
import Door from "@/components/door.svg";

export default function Navbar() {
    return (
      <header className="bg-white text-blue-600 py-1 shadow-md h-[10vh] flex justify-center items-center">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-4 w-full">
          <div className="flex items-center">
          <Door className="w-8 h-8 text-blue-600 inline md:w-16 md:h-16"/>
          <a className="no-underline text-3xl font-bold hover:text-blue-400 text-xl md:text-4xl" href="/">Studyrooms</a>
          </div>
          <nav>
            <ul className="flex gap-6 justify-center items-center p-0 m-0">
              <li><a href="/login" className="no-underline hover:text-blue-400 text-xs md:text-lg">Login</a></li>
              <li><a href="/sign-up" className="no-underline hover:text-blue-400 text-xs md:text-lg">Sign Up</a></li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
  