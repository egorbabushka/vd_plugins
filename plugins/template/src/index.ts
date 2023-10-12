import { logger } from "@vendetta"
import { toasts } from "@vendetta/metro/common"
import { findByProps } from "@vendetta/metro"
import Settings from "./Settings"
import { before } from "@vendetta/patcher";


const MessageUtils = findByProps("sendMessage", "receiveMessage");


const patchMessages = () => {
  return before("sendMessage", MessageUtils, (args) => {
      try {
        toasts.open({content: JSON.stringify(args)})
        let content = "@silent " + args[1].content
        args[1].content = content
      } catch (e: any) {
        logger.error(e)
      }
  })
}


export default {
    onLoad: () => {
        toasts.open({content: "hello, world"})
        unpatchs = [
          patchMessages(),
        ]
    },
    onUnload: () => {
        toasts.open({content: "goodbye, test"})
        for (const unpatch of unpatchs) {
            unpatch()
        }
    },
    settings: Settings,
}