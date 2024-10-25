export default function Header({ darkMode, setDarkMode }) {
  return (
    <header>
      <h1 className="header-title">Activity Tracker</h1>
      <button
        className="theme-toggle"
        onClick={() => setDarkMode((prev) => !prev)}
      >
        {darkMode ? "🌞" : "🌙"}
      </button>
    </header>
  );
}
