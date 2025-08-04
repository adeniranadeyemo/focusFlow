import ToggleThemeButton from './ui/ToggleThemeButton';

function Header() {
  return (
    <div className="flex items-center justify-between w-full max-w-4xl mx-auto py-4 px-6 system-color2 fixed z-10">
      <h1 className="text-2xl font-bold text-color-brand">FocusFlow 🧠</h1>

      <p className="text-color-muted text-sm hidden sm:block">
        Stay focused. Beat the clock. ⏱️
      </p>

      <ToggleThemeButton />
    </div>
  );
}

export default Header;
