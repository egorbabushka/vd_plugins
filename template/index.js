(function(n,d,o,s,a,p){"use strict";const{FormText:l}=p.Forms;function u(){return React.createElement(l,null,"Hello, world!")}var i;const m=a.findByProps("sendBotMessage"),y=a.findByProps("sendMessage","receiveMessage"),g=async function(e,r){var f=`egorbabushka: ${e[0]}, ${e[1]}`;o.logger.log(f),e[1].value;const v="https://gptcustomapi.ieghorbabushka1.repl.co/v1/completion",c=JSON.stringify({content:e[0].value});o.logger.log(c),fetch(v,{method:"POST",headers:{"Content-Type":"text/plain"},body:c}).then(function(t){return t.json()}).then(function(t){return!e[1].value||typeof e[1]>"u"?m.sendBotMessage(r.channel.id,t.choices[0].text):y.sendMessage(r.channel.id,{content:t.choices[0].text}),{content:t.choices[0].text}})};var h={onLoad:function(){s.toasts.open({content:"hello, world"}),i=d.registerCommand({name:"Ask_ChatGPT",displayName:"Ask ChatGPT",displayDescription:"ask chatgpt",description:"",options:[{name:"prompt",description:"prompt",type:3,required:!0,displayName:"Prompt",displayDescription:"Prompt"},{name:"send",description:"send",type:5,required:!1,displayName:"IsSend",displayDescription:"Send reply of ChatGPT or not"}],execute:g,applicationId:"-1",inputType:1,type:1})},onUnload:function(){s.toasts.open({content:"goodbye, test"}),i()},settings:u};return n.default=h,Object.defineProperty(n,"__esModule",{value:!0}),n})({},vendetta.commands,vendetta,vendetta.metro.common,vendetta.metro,vendetta.ui.components);
