import { registerCommand } from "@vendetta/commands"
import { logger } from "@vendetta"
import { toasts } from "@vendetta/metro/common"
import { findByProps } from "@vendetta/metro"
import Settings from "./Settings"


const ClydeUtils = findByProps("sendBotMessage")


const ask = async (args, ctx) => {
  var optionstest = "egorbabushka: "
  for (const i in args) {
    optionstest += `${i.name}: ${i.value}`
  }
  logger.log(optionstest)
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
      ClydeUtils.sendBotMessage(ctx.channel.id, data.choices[0].text)
      return {content: data.choices[0].text}
    });

}

export default {
    onLoad: () => {
        toasts.open({content: "hello, world"})
        const u = registerCommand({
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
        u()
    },
    settings: Settings,
}