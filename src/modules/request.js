import { POP_UP, CONFIRM, AUTHORIZATION, FORM } from "./variables.js";
import Cookies from "js-cookie";
import { sendMessage } from "./messageCreate.js";

export async function getCode() {
    const body = {
        email: AUTHORIZATION.POST_INPUT.value,
    }; 
    Cookies.set('email', body.email);
    try {
        let response = await fetch(AUTHORIZATION.URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        if(!response.ok) {
            throw Error(response.statusText);
        } else {
            AUTHORIZATION.AUTHORIZE.style.visibility = 'hidden';
            CONFIRM.CONFIRM.style.visibility = 'visible';
        }
    } catch (err) {
        alert('Ошибка');
    }
}

export async function changeName() {
    const body = {
        name: POP_UP.INPUT.value,
    };
    try {
        let response = await fetch(POP_UP.URL, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${Cookies.get('code')}`,
            },
            body: JSON.stringify(body),
        });
        if(response.ok) {
            let res = await response.json();
            Cookies.set('name', res.name);
        }
    } catch (err) {
        alert('Ошибка');
    }
    getUserName();
}

export async function getUserName() {
    try {
        let response = await fetch(POP_UP.URLME, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${Cookies.get('code')}`,
            }
        });
        if(response.ok) {
            let res = await response.json();
            return res
        }
    } catch(err) {
        alert('Ошибка');
    }
}

export async function getMessages() {
    try{
        let response = await fetch(FORM.URL_MESSAGES, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${Cookies.get('code')}`,
            }
        });
        let res = await response.json();
        let messages = res.messages;
        let loadedMessagesCount = 0;

        messages.slice(0, 30).forEach(function(item) {
            sendMessage(item.user.name, item.text, item.createdAt, item.user.email, 'prepend');
        });

        FORM.SCREEN.addEventListener('scroll', () => {
            const scr = FORM.BLOCK_FOR_MESSAGES.getBoundingClientRect();
            if((scr.top * -1) < FORM.SCREEN.clientHeight) {
                messages.slice(loadedMessagesCount, loadedMessagesCount + 30).forEach(function(item) {
                    sendMessage(item.user.name, item.text, item.createdAt, item.user.email, 'prepend')
                });
                loadedMessagesCount += 30;
            } 
        });
        FORM.BLOCK_FOR_MESSAGES.scrollIntoView(false);
        return messages;
    } catch(err) {
        console.log('Ошибка');
    }
} 
















