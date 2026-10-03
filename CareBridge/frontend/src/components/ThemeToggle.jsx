import { Moon, Sun } from "lucide-react";
import { useTheme } from "../theme/ThemeProvider";

function ThemeToggle() {
  const {
    darkMode,
    setDarkMode,
  } = useTheme();

  return (
    <button
      onClick={() =>
        setDarkMode(!darkMode)
      }
      className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
    >
      {darkMode ? (
        <Sun
          size={18}
          className="text-yellow-400"
        />
      ) : (
        <Moon
          size={18}
          className="text-slate-700 dark:text-slate-300"
        />
      )}
    </button>
  );
}

export default ThemeToggle;