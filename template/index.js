(function(t,i,n,c){"use strict";const{FormText:s}=c.Forms;function a(){return React.createElement(s,null,"Hello, world!")}const r=async function(d,m){const l="https://gptcustomapi.ieghorbabushka1.repl.co/v1/completion",o=JSON.stringify({content:d[0]});console.log(o),fetch(l,{method:"POST",headers:{"Content-Type":"text/plain"},body:o}).then(function(e){return e.json()}).then(function(e){return{content:e.choices[0].text}})};var p={onLoad:function(){n.toasts.open({content:"hello, world"}),i.registerCommand({name:"Ask_ChatGPT",displayName:"Ask ChatGPT",displayDescription:"ask chatgpt",description:"",options:[{name:"prompt",description:"prompt",type:3,required:!0,displayName:"Prompt",displayDescription:""}],execute:r,applicationId:"-1",inputType:1,type:1})},onUnload:function(){n.toasts.open({content:"goodbye, test"}),u()},settings:a};return t.default=p,Object.defineProperty(t,"__esModule",{value:!0}),t})({},vendetta.commands,vendetta.metro.common,vendetta.ui.components);
