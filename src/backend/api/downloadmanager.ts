import { DMQueueElement, InstallParams, UpdateParams } from 'common/types'
import {
  makeListenerCaller as lc,
  makeHandlerInvoker as hi,
  frontendListenerSlot as fls
} from 'common/ipc/frontend'

export const install = async (args: InstallParams) => {
  const dmQueueElement: DMQueueElement = {
    params: args,
    type: 'install',
    addToQueueTime: Date.now(),
    endTime: 0,
    startTime: 0
  }

  ipcRenderer.invoke('addToDMQueue', dmQueueElement)

  // Add Dlcs to the queue
  if (
    Array.isArray(args.installDlcs) &&
    args.installDlcs.length > 0 &&
    args.runner === 'legendary'
  ) {
    args.installDlcs.forEach(async (dlc) => {
      const dlcArgs: InstallParams = {
        ...args,
        appName: dlc
      }
      const dlcQueueElement: DMQueueElement = {
        params: dlcArgs,
        type: 'install',
        addToQueueTime: Date.now(),
        endTime: 0,
        startTime: 0
      }
      ipcRenderer.invoke('addToDMQueue', dlcQueueElement)
    })
  }
}

export const updateGame = (args: UpdateParams) => {
  const {
    gameInfo: {
      install: { platform, install_path }
    }
  } = args

  const dmQueueElement: DMQueueElement = {
    params: { ...args, path: install_path!, platformToInstall: platform! },
    type: 'update',
    addToQueueTime: Date.now(),
    endTime: 0,
    startTime: 0
  }

  ipcRenderer.invoke('addToDMQueue', dmQueueElement)
}

export const getDMQueueInformation = hi('getDMQueueInformation')

export const removeFromDMQueue = lc('removeFromDMQueue')

export const handleDMQueueInformation = fls('changedDMQueueInformation')

export const cancelDownload = lc('cancelDownload')

export const resumeCurrentDownload = lc('resumeCurrentDownload')

export const pauseCurrentDownload = lc('pauseCurrentDownload')
