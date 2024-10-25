import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

export default function Header({ darkMode, setDarkMode }) {
  return (
    <header className="flex justify-between items-center mb-10">
      <h1 className="text-4xl font-bold">Activity Tracker</h1>
      <button
        className="p-2 rounded-full border border-gray-300"
        onClick={() => setDarkMode(!darkMode)}
      >
        <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
      </button>
    </header>
  );
}
