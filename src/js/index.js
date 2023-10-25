import Cookies from "js-cookie";
import { POP_UP, CONFIRM, AUTHORIZATION, FORM } from "../modules/variables.js";
import { getCode, changeName, getUserName,  getMessages } from "../modules/request.js";
import { sendMessage } from "../modules/messageCreate.js";
import { hideSettings, showSettings } from "../modules/popUp.js";

const socket = new WebSocket(`${FORM.SOCKET}${Cookies.get('code')}`);
socket.onmessage = function(event) {
    const data = JSON.parse(event.data)
    sendMessage(data.user.name, data.text, data.createdAt, data.user.email, 'append');
};

document.addEventListener('DOMContentLoaded', (event)=> {
    event.preventDefault()
    if(Cookies.get('code')) {
        getMessages();
        AUTHORIZATION.AUTHORIZE.style.visibility = 'hidden';
    } else {
        AUTHORIZATION.AUTHORIZE.style.visibility = 'visible';
    }
});

POP_UP.BTN_SETTINGS.addEventListener('click', showSettings);

POP_UP.CLOSE_SETTINGS.addEventListener('click', hideSettings);

FORM.OUT.addEventListener('click', deleteHistory);

function deleteHistory() {
    Cookies.remove('code');
    AUTHORIZATION.AUTHORIZE.style.visibility = 'visible';
    FORM.BLOCK_FOR_MESSAGES.innerHTML = '';
}

CONFIRM.CLOSE.addEventListener('click', ()=> {
    CONFIRM.CONFIRM.style.visibility = 'hidden';
})

AUTHORIZATION.GET_CODE_BTN.addEventListener('click', (event)=> {
    event.preventDefault();
    getCode();
});

AUTHORIZATION.TYPE_CODE__BTN.addEventListener('click', (event)=> {
    event.preventDefault();
    typeCode();
});

FORM.MAIN.addEventListener('submit', (event)=> {
    event.preventDefault();
    const message = FORM.MESSAGE_INPUT.value;
    socket.send(JSON.stringify({ text: message }));
    FORM.MESSAGE_INPUT.value = '';
});

CONFIRM.IN.addEventListener('click', ()=> {
    getCookieCode();
    CONFIRM.CONFIRM.style.visibility = 'hidden';
    getMessages();
});

POP_UP.SEND.addEventListener('click', (event)=> {
    event.preventDefault();
    changeName();
    getUserName();
})

function getCookieCode() {
    let result = CONFIRM.INPUT.value;
    Cookies.set('code', result);
}

function typeCode() {
    AUTHORIZATION.AUTHORIZE.style.visibility = 'hidden';
    CONFIRM.CONFIRM.style.visibility = 'visible';
}

AUTHORIZATION.POST_INPUT.addEventListener('blur', ()=> {
    if(!AUTHORIZATION.POST_INPUT.value.match(/^[^@]+@[^@]+\.[^@]+$/)) {
        AUTHORIZATION.POST_INPUT.classList.add('input_red');
        AUTHORIZATION.ERROR.innerHTML = 'Введите правильный email';
    }
})

CONFIRM.INPUT.addEventListener('blur', ()=> {
    if(CONFIRM.INPUT.value.length === 0) {
        CONFIRM.IN.disabled = true;
        CONFIRM.INPUT.classList.add('input_red');
        CONFIRM.ERROR_INPUT.innerHTML = 'Введите код';
    } else {
        CONFIRM.IN.disabled = false;
        CONFIRM.INPUT.classList.remove('input_red');
        CONFIRM.ERROR_INPUT.innerHTML = '';
    }
})










