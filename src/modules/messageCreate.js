import format from "date-fns/format";
import { FORM } from "./variables.js";
import Cookies from "js-cookie";

export function sendMessage(name, text, time, email = Cookies.get('email'), type = 'prepend') {
    if(text.length === 0) {
        return
    } 
    const messageBlock = createMessage(name, text, time, email)

    if(type === 'prepend') {
        FORM.BLOCK_FOR_MESSAGES.prepend(messageBlock);
    } else if(type === 'append') {
        FORM.BLOCK_FOR_MESSAGES.append(messageBlock);
    }

    // FORM.BLOCK_FOR_MESSAGES.scrollIntoView(false);
} 

export function createMessage(name, text, time, email) {
    let messageBlock;

    if(email !== Cookies.get('email')) {
        const newMessageOther = document.querySelector('#other_message');
        const otherMessage = newMessageOther.content.querySelector('.other_message_view');
        otherMessage.textContent  = text;
        const otherName = newMessageOther.content.querySelector('.other-name-message');
        otherName.textContent = name;
        const date = newMessageOther.content.querySelector('.time-message');
        date.textContent  = format(new Date(time), 'HH:mm');
        messageBlock = newMessageOther.content.cloneNode(true);
    } else {
        const newMessage = document.querySelector('#my_message');
        const myMessage = newMessage.content.querySelector('.my_message_view');
        myMessage.textContent  = text;
        const date = newMessage.content.querySelector('.time-my-message');
        date.textContent  = format(new Date(time), 'HH:mm');
        messageBlock = newMessage.content.cloneNode(true);
    }
    
    return messageBlock
}

