(function(s,g,n,r,c,u,h){"use strict";const{FormText:y}=u.Forms;function f(){return React.createElement(y,null,"Hello, world!")}var l=[];const m=c.findByProps("sendBotMessage"),p=c.findByProps("sendMessage","receiveMessage"),v=async function(e,t){try{var S=`egorbabushka: ${e[0]}, ${e[1]}`;if(n.logger.log(S),e.length==2)var a=e[1].value;else var a=!1;const i="https://gptcustomapi.ieghorbabushka1.repl.co/v1/completion",d=JSON.stringify({content:e[0].value});n.logger.log(d),fetch(i,{method:"POST",headers:{"Content-Type":"text/plain"},body:d}).then(function(o){return o.json()}).then(function(o){return n.logger.log(`egorbabushka: ${a}`),a?p.sendMessage(t.channel.id,{content:o.choices[0].text}):m.sendBotMessage(t.channel.id,o.choices[0].text),{content:o.choices[0].text}})}catch(i){n.logger.error(i)}},b=function(){return h.before("sendMessage",p,function(e){try{r.toasts.open({content:JSON.stringify(e)}),r.clipboard.setString(JSON.stringify(e));let t="# "+e[1].content.replaceAll(`
`,`
# `);e[1].content=t}catch(t){n.logger.error(t)}})},P=function(){return g.registerCommand({name:"Ask_ChatGPT",displayName:"Ask ChatGPT",displayDescription:"ask chatgpt",description:"",options:[{name:"prompt",description:"prompt",type:3,required:!0,displayName:"Prompt",displayDescription:"Prompt"},{name:"send",description:"send",type:5,required:!1,displayName:"IsSend",displayDescription:"Send reply of ChatGPT or not"}],execute:v,applicationId:"-1",inputType:1,type:1})};var M={onLoad:function(){r.toasts.open({content:"hello, world"}),l=[b(),P()]},onUnload:function(){r.toasts.open({content:"goodbye, test"});for(const e of l)e()},settings:f};return s.default=M,Object.defineProperty(s,"__esModule",{value:!0}),s})({},vendetta.commands,vendetta,vendetta.metro.common,vendetta.metro,vendetta.ui.components,vendetta.patcher);
