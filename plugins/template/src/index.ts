import { registerCommand } from "@vendetta/commands";
import { toasts } = from "@vendetta/metro/common"


const ask = async (args, ctx) => {
  const url = 'https://gptcustomapi.ieghorbabushka1.repl.co/v1/completion';
  const body = JSON.stringify({
    'content': args[0]
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
      return {content: data.choices[0].text}
    });

}

export default {
    onLoad: () => {
        toasts.open({content: "hello, tehello
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
