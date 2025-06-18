import React from 'react'
import { useTranslation } from 'react-i18next'
import { ToggleSwitch } from 'frontend/components/UI'
import useSetting from 'frontend/hooks/useSetting'
import InfoIcon from 'frontend/components/UI/InfoIcon'
import { isFlatpak } from 'backend/constants/environment'

const EscapeFlatpakSandbox = () => {
  const { t } = useTranslation()
  const [escapeFlatpakSandbox, setEscapeFlatpakSandbox] = useSetting(
    'escapeFlatpakSandbox',
    false
  )

  if (!isFlatpak) {
    return <></>
  }

  return (
    <div className="toggleRow">
      <ToggleSwitch
        htmlId="escapeflatpaksandbox"
        value={escapeFlatpakSandbox}
        handleChange={() => setEscapeFlatpakSandbox(!escapeFlatpakSandbox)}
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
