import { registerCommand } from "@vendetta/commands"
import { logger } from "@vendetta"
import { toasts } from "@vendetta/metro/common"
import { findByProps } from "@vendetta/metro"
import Settings from "./Settings"

var unregister;
const ClydeUtils = findByProps("sendBotMessage")
const MessageUtils = findByProps(
	"sendMessage",
  "receiveMessage"
);
const ask = async (args, ctx) => {
  try {
    var optionstest = `egorbabushka: ${args[0]}, ${args[1]}`
    logger.log(optionstest)
    if args.length == 2 {
      var isSend = args[1].value
    } else {
      var isSend = false
    }
    const url = 'https://gptcustomapi.ieghorbabushka1.repl.co/v1/completion';
    const body = JSON.stringify({
      'content': args[0].value
    });
    logger.log(body)
    const headers = {
      'Content-Type': 'text/plain'
    }
    
    fetch(url, {
      method: 'POST',
      headers,
      body,
    })
      .then(response => response.json())
      .then(data => {
        logger.log(`egorbabushka: ${isSend}`)
        if (!isSend) {
          ClydeUtils.sendBotMessage(ctx.channel.id, data.choices[0].text)
        } else {
          MessageUtils.sendMessage(ctx.channel.id, {content: data.choices[0].text})
        }
        return {content: data.choices[0].text}
      });
  } catch (e: any) {
    logger.error(e)
  }
}

export default {
    onLoad: () => {
        toasts.open({content: "hello, world"})
        unregister = registerCommand({
            name: "Ask_ChatGPT", 
            displayName: "Ask ChatGPT",
            displayDescription: "ask chatgpt",
            description: "",
            options: [{
                name: "prompt",
                description: "prompt",
                type: 3,
                required: true,
                displayName: "Prompt",
                displayDescription: "Prompt"
            },
            {
                name: "send",
                description: "send",
                type: 5,
                required: false,
                displayName: "IsSend",
                displayDescription: "Send reply of ChatGPT or not"
            }],
            execute: ask,
            applicationId: "-1",
            inputType: 1,
            type: 1
        })
    },
    onUnload: () => {
        toasts.open({content: "goodbye, test"})
        unregister()
    },
    settings: Settings,
}