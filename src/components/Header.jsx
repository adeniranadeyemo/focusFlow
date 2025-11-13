import { useState } from 'react'
import ToggleThemeButton from './ui/ToggleThemeButton'
import SettingsModal from './SettingsModal'
import { MdSettingsApplications } from 'react-icons/md'

function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex items-center justify-between w-full mx-auto py-4 px-6 system-color2 fixed z-10">
      <h1 className="text-2xl font-bold text-color-brand">FocusFlow </h1>

      <p className="text-color-muted text-sm hidden sm:block">
        Stay focused. Beat the clock.
      </p>

      <div>
        <ToggleThemeButton />
        <button
          className="cursor-pointer h-8 w-8 text-color"
          onClick={() => setIsOpen(true)}
        >
          <MdSettingsApplications className="h-8 w-8" />
        </button>
      </div>

      <SettingsModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  )
}

export default Header
