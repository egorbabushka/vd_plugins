import { registerCommand } from "@vendetta/commands"
import { toasts } from "@vendetta/metro/common"
import { findByProps } from "@vendetta/metro/common"
import Settings from "./Settings"


const ClydeUtils = findByProps("sendBotMessage")


const ask = async (args, ctx) => {
  const url = 'https://gptcustomapi.ieghorbabushka1.repl.co/v1/completion';
  const body = JSON.stringify({
    'content': args[0].value
  });
  console.log(body)
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
                required: !0,
                displayName: "Prompt",
                displayDescription: ""
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