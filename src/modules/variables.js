const FORM = {
    MAIN: document.querySelector('.main-form'),
    MESSAGE_INPUT: document.querySelector('.message-input'),
    BLOCK_FOR_MESSAGES: document.querySelector('.message-block'),
    SEND_BTN: document.querySelector('.bottom-send'),
    NAME: document.querySelector('.my-name-message'),
    URL_MESSAGES: 'https://edu.strada.one/api/messages/ ',
    OUT: document.querySelector('.btn-exit'),
    SOCKET: `wss://edu.strada.one/websockets?`,
    SCREEN: document.querySelector('.main-screen'),
    CHAT: document.querySelector('.main-chat'),
};

const AUTHORIZATION = {
    POST_INPUT: document.querySelector('.authorize-input'),
    GET_CODE_BTN: document.querySelector('.btn-getCode'),
    TYPE_CODE__BTN: document.querySelector('.btn-typeCode'),
    URL: 'https://edu.strada.one/api/user',
    BLOCK: document.querySelector('.block'),
    AUTHORIZE: document.querySelector('.authorize_wrapper'),
    ERROR: document.querySelector('.error-input'),
};

const CONFIRM = {
    CONFIRM: document.querySelector('.confirm_wrapper'),
    CLOSE: document.querySelector('.confirm-close'),
    IN: document.querySelector('.btn-getIn'),
    INPUT: document.querySelector('.confirm-input'),
    ERROR_INPUT: document.querySelector('.error'),
}

const POP_UP = {
    BTN_SETTINGS: document.querySelector('.btn-setting'),
    CLOSE_SETTINGS: document.querySelector('.close-modal'),
    SETTINGS_BLOCK: document.querySelector('.settings_wrapper'),
    INPUT: document.querySelector('.settings-input'),
    SEND: document.querySelector('.settings-send'),
    URL: 'https://edu.strada.one/api/user',
    URLME: 'https://edu.strada.one/api/user/me',
};

export {POP_UP, CONFIRM, AUTHORIZATION, FORM};