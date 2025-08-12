import { useEffect, useState } from 'react'

export function useInstallPrompt() {
  const [promptEvent, setPromptEvent] = useState(null)

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      setPromptEvent(e)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const promptToInstall = async () => {
    if (!promptEvent) return
    promptEvent.prompt()
    const choice = await promptEvent.userChoice
    setPromptEvent(null)
    return choice
  }

  return { promptEvent, promptToInstall }
}
