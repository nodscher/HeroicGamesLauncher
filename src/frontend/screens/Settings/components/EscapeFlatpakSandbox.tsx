import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { ToggleSwitch } from 'frontend/components/UI'
import useSetting from 'frontend/hooks/useSetting'
import ContextProvider from 'frontend/state/ContextProvider'
import InfoIcon from 'frontend/components/UI/InfoIcon'

const EscapeFlatpakSandbox = () => {
  const { t } = useTranslation()
  const { showDialogModal } = useContext(ContextProvider)
  const [escapeFlatpakSandbox, setEscapeFlatpakSandbox] = useSetting(
    'escapeFlatpakSandbox',
    false
  )
  const [useGameMode, setUseGameMode] = useSetting('useGameMode', false)
  const [showMangohud, setShowMangohud] = useSetting('showMangohud', false)
  const [gamescope, setGamescope] = useSetting('gamescope', {
    enableUpscaling: false,
    enableLimiter: false,
    enableForceGrabCursor: false,
    windowType: 'fullscreen',
    gameWidth: '',
    gameHeight: '',
    upscaleHeight: '',
    upscaleWidth: '',
    upscaleMethod: 'fsr',
    fpsLimiter: '',
    fpsLimiterNoFocus: '',
    additionalOptions: ''
  })

  if (!window.isFlatpak) {
    return <></>
  }

  function handleEscapeFlatpakSandbox() {
    if (
      (!escapeFlatpakSandbox && useGameMode) ||
      (!escapeFlatpakSandbox && showMangohud) ||
      ((gamescope.enableLimiter || gamescope.enableUpscaling) &&
        !escapeFlatpakSandbox)
    ) {
      showDialogModal({
        showDialog: true,
        title: t(
          'settings.gameMode.eacRuntimeEnabled.title',
          'MangoHud, Gamescope and/or GameMode enabled'
        ),
        message: t(
          'settings.gameMode.eacRuntimeEnabled.message',
          'Escaping the Flatpak Sandbox is incompatible with the MangoHud, Gamescope and GameMode in the Flatpak. If you want to use them install them natively and add those in the $PATH or as wrapper. Do you want to disable MangoHud, Gamescope and GameMode?'
        ),
        buttons: [
          {
            text: t('box.yes'),
            onClick: () => {
              setShowMangohud(false)
              setUseGameMode(false)
              setGamescope({
                ...gamescope,
                enableLimiter: false,
                enableUpscaling: false
              })
            }
          },
          { text: t('box.no') }
        ]
      })
    }
    setEscapeFlatpakSandbox(!escapeFlatpakSandbox)
  }

  return (
    <div className="toggleRow">
      <ToggleSwitch
        htmlId="escapeflatpaksandbox"
        value={escapeFlatpakSandbox}
        handleChange={handleEscapeFlatpakSandbox}
        title={t('setting.escapeFlatpakSandbox', 'Escape the Flatpak Sandbox')}
      />

      <InfoIcon
        text={t(
          'help.EscapeFlatpakSandbox',
          'Enabling this option allows Games to escape the Flatpak sandbox, which mainly allows better integration with Steam. Use with caution. You will have to allow Heroic to talk to org.freedesktop.Flatpak on the session bus manually (in Flatseal/ KDE-Systemsettings).'
        )}
      />
    </div>
  )
}

export default EscapeFlatpakSandbox
