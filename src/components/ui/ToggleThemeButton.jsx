import { useTheme } from '../../context/ThemeProvider';
import { MoonIcon, SunIcon } from '@heroicons/react/16/solid';

export default function ToggleThemeButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="cursor-pointer">
      {theme === 'dark' ? (
        <SunIcon className="h-8 w-8 text-yellow-300" />
      ) : (
        <MoonIcon className="h-8 w-8 text-gray-900" />
      )}
    </button>
  );
}
