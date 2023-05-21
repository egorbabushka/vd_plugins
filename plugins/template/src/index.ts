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
  var optionstest = `egorbabushka: ${args[0]}, ${args[1]}`
  logger.log(optionstest)
  var isSend = args[1].value ?? false
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
      if (!args[1].value || typeof args[1] === "undefined") {
        ClydeUtils.sendBotMessage(ctx.channel.id, data.choices[0].text)
      } else {
        MessageUtils.sendMessage(ctx.channel.id, {content: data.choices[0].text})
      }
      return {content: data.choices[0].text}
    });

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