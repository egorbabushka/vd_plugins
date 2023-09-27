import { logger } from "@vendetta"
import { toasts } from "@vendetta/metro/common"
import { findByProps } from "@vendetta/metro"
import Settings from "./Settings"
import { before } from "@vendetta/patcher";


const MessageActions = findByProps("sendMessage", "receiveMessage");
const Locale = findByProps("Messages");

const endings = [
    "рррр x3",
    "OwO",
    "UwU",
    "o.O",
    "-.-",
    ">w<",
    "(⑅˘꒳˘)",
    "(ꈍᴗꈍ)",
    "(˘ω˘)",
    "(U ᵕ U❁)",
    "σωσ",
    "òωó",
    "(///ˬ///✿)",
    "(U ﹏ U)",
    "( ͡o ω ͡o )",
    "ʘwʘ",
    ":3",
    ":3", // important enough to have twice
    ":3", // important enough to have thrice
    "XD",
    "ньяяя~~",
    "мья",
    ">_<",
    "😳",
    "🥺",
    "😳😳😳",
    "ррр~~",
    "^^",
    "^^;;",
    "(ˆ ﻌ ˆ)♡",
    "^•ﻌ•^",
    "/(^•ω•^)",
    "(✿oωo)"
];

const replacements = [
    ["милый", "кавайный~~~"],
    ["мягкий", "мяфенький~"],
    ["что", "фто~~"],
    ["мяу", "нья"],
    ["привет", "ку-ку)"],
];


function selectRandomElement(arr) {
    // generate a random index based on the length of the array
    const randomIndex = Math.floor(Math.random() * arr.length);

    // return the element at the randomly generated index
    return arr[randomIndex];
}
const isOneCharacterString = (str: string): boolean => {
    return str.split('').every((char: string) => char === str[0]);
};


function replaceString(inputString) {
    let replaced = false;
    for (const replacement of replacements) {
        const regex = new RegExp(`\\b${replacement[0]}\\b`, "gi");
        if (regex.test(inputString)) {
            inputString = inputString.replace(regex, replacement[1]);
            replaced = true;
        }
    }
    return replaced ? inputString : false;
}


function uwuify(message: string): string {
    const rule = /\S+|\s+/g;
    const words: string[] | null = message.match(rule);
    let answer = "";

    if (words === null) return "";

    for (let i = 0; i < words.length; i++) {
        if (isOneCharacterString(words[i]) || words[i].startsWith("https://")) {
            answer += words[i];
            continue;
        }

        if (!replaceString(words[i])) {
            answer += words[i]
                .replace(/n(?=[аео])/g, "нь")
                .replace(/l|[прг]/g, "w");
        } else answer += replaceString(words[i]);

    }

    answer += " " + selectRandomElement(endings);
    return answer;
}

function uwuifyArray(arr) {
    const newArr = [...arr];

    newArr.forEach((item, index) => {
        if (Array.isArray(item)) {
            newArr[index] = uwuifyArray(item);
        } else if (typeof item === "string") {
            newArr[index] = uwuify(item);
        }
    });

    return newArr;
}


var unpatchs = [];
const MessageUtils = findByProps(
	"sendMessage",
  "receiveMessage"
);


const patchMessages = () => {
  return before("sendMessage", MessageUtils, (args) => {
      try {
        toasts.open({content: JSON.stringify(args)})
        let content = uwuify(args[1].content as string)
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