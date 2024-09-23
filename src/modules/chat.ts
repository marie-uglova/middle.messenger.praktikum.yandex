import Block from './block';
import {checkMessage, validate, validateForm, validationResults} from './validation';
import {Input} from '../components/uikit/input';
import {Field} from '../components/uikit/field';
import {Button} from '../components/uikit/button';
import {ChatItem} from '../components/chat/chat-item';
import {ChatMessage} from '../components/chat/chat-message';
import {ChatTopbar} from '../components/chat/chat-topbar';
import {ChatSearchForm} from '../components/chat/chat-search-form/';
import {ChatSearchResult} from '../components/chat/chat-search-result/';
import {ChatForm} from '../components/chat/chat-form/';
import {ChatAdd} from '../components/chat/chat-add/';
import {ChatPage} from '../pages/chat-page';
import User from './get-user';
import HTTPTransport from './http';
import {log} from "handlebars";

const http = new HTTPTransport(),
    user = new User();

class InputComponent extends Block {
    render() {
        return Input;
    }
}

class FieldComponent extends Block {
    render() {
        return Field;
    }
}

class ButtonComponent extends Block {
    render() {
        return Button;
    }
}

class ChatAddComponent extends Block {
    render() {
        return ChatAdd;
    }
}

class ChatItemComponent extends Block {
    render() {
        return ChatItem;
    }
}

class ChatMessageComponent extends Block {
    render() {
        return ChatMessage;
    }
}

class ChatTopbarComponent extends Block {
    render() {
        return ChatTopbar;
    }
}

class ChatSearchFormComponent extends Block {
    render() {
        return ChatSearchForm;
    }
}

class ChatSearchResultComponent extends Block {
    render() {
        return ChatSearchResult;
    }
}

class ChatFormComponent extends Block {
    render() {
        return ChatForm;
    }
}

class ChatPageComponent extends Block {
    render() {
        return ChatPage;
    }
}

const chatItem = new ChatItemComponent({
    /*events: {
        click: (evt: Event) => {
            openChat(evt);
        }
    }*/
});

const chatAdd = new ChatAddComponent({
    events: {
        click: (evt: Event) => {
            addChat(evt);
        }
    }
});

const chatTopbar = new ChatTopbarComponent({
    name: 'Константин'
});

const chatSearchForm = new ChatSearchFormComponent({
    field: new FieldComponent({
        for: 'search',
        input: new InputComponent({
            name: 'search',
            id: 'search',
            type: 'text',
            placeholder: 'Искать по логину',
        }),
    }),
    button: new ButtonComponent({
        text: 'Искать',
        type: 'submit'
    }),
    events: {
        submit: (evt: Event) => {
            searchUser(evt);
        }
    }
});

const chatSearchResult = new ChatSearchResultComponent({

});

const chatForm = new ChatFormComponent({
    field: new FieldComponent({
        for: 'message',
        input: new InputComponent({
            name: 'message',
            id: 'message',
            type: 'text',
            placeholder: 'Сообщение',
            events: {
                blur: (evt: Event) => {
                    validate(evt, checkMessage, 'message');
                }
            }
        }),
    }),
    button: new ButtonComponent({
        text: 'Отправить',
        type: 'submit'
    }),
    events: {
        submit: (evt: Event) => {
            checkForm(evt);
        }
    }
});

export class ChatPageContainer extends Block {
    constructor(props: {[key: string]: string}) {
        super({
            ...props,
            chatPageContent: new ChatPageComponent({
                chatAdd: chatAdd,
                chatSearchForm: chatSearchForm,
                chatSearchResult: chatSearchResult,
                chatItem: chatItem,
                chatTopbar: chatTopbar,
                messageList: [],
                chatForm: chatForm,
            }),
        })
    }

    override componentDidUpdate(oldProps: any, newProps: any): boolean {
        if(oldProps.props?.first_name !== newProps.props?.first_name) {
            http.get('https://ya-praktikum.tech/api/v2/chats', {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => {
                    const chats = JSON.parse(response.response);
                    console.log(chats)
                    const chatList = document.querySelector('.chat__list');
                    const chatListItem = document.querySelector('.ts-chat-list-item').content.querySelector('.chat__list-item');

                    function createChatItem(item) {
                        const listItem = chatListItem.cloneNode(true);
                        listItem.setAttribute('data-id', item.id);
                        listItem.querySelector('.chat__list-name').textContent = item.id;
                        listItem.querySelector('.chat__list-intro').textContent = item.title;
                        listItem.querySelector('.chat__list-count').textContent = item.unread_count;
                        return listItem;
                    }

                    renderList(chats, createChatItem, chatList);

                    const chatListItems = document.querySelectorAll('.chat__list-item');
                    chatListItems.forEach((el) => {
                        el.addEventListener('click', (item) => {
                            openChat(item.target.dataset.id);
                        })
                    })

                })
            return true;
        }
        return false;
    }

    componentDidMount(props) {
        //super.componentDidMount(props);
        this.componentDidUpdate;
    }

    override render() {
        return `<main class="main">{{{ chatPageContent }}}</main>`
    }
}

function checkForm(evt: Event) {
    evt.preventDefault();

    const messageValidationResults: Record<string, boolean | null> = {
        'message': validationResults.message
    }

    if(validationResults.message) {
        sendMessage(evt);
    } else {
        validateForm(evt, messageValidationResults);
    }
}

function addChat(evt: Event) {
    const data = {
        title: 'новый чат',
    };
    // создаем чат
    http.post('https://ya-praktikum.tech/api/v2/chats', {
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        data: JSON.stringify(data),
    })
        .then((response) => {
            const addUserForm = document.querySelector('.chat__list-form');
            addUserForm.classList.remove('hidden');
        })
}

function renderList(array, template, container) {
    const fragment = document.createDocumentFragment();
    for (const key of array) {
        fragment.appendChild(template(key));
    }
    container.appendChild(fragment);
}

function searchUser(evt: Event) {
    evt.preventDefault();
    let input = (evt.target as HTMLInputElement).querySelector('input');
    if(input != null) {
        const data = {
            login: input.value,
        };
        http.post('https://ya-praktikum.tech/api/v2/user/search', {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            data: JSON.stringify(data),
        })
            .then(data => {
                const result = JSON.parse(data.response);
                console.log(result);
                const searchResult = document.querySelector('.chat__result');
                const searchListItem = document.querySelector('.ts-chat-result-item').content.querySelector('.chat__result-item');
                function createResultItem(item) {
                    const listItem = searchListItem.cloneNode(true);
                    listItem.querySelector('.chat__result-name').textContent = item.login;
                    listItem.querySelector('.chat__result-btn').setAttribute('data-id', item.id);
                    return listItem;
                }
                renderList(result, createResultItem, searchResult);
                const usersToAdd = document.querySelectorAll('.chat__result-btn');
                usersToAdd.forEach((el) => {
                    el.addEventListener('click', (item) => {
                        console.log('Добавить в чат пользователя', item.target.dataset.id)
                    })
                })
            })
    }
}

let socket;

function openChat(id) {
    const chatContainer = document.querySelector('.chat__container');
    chatContainer.classList.remove('hidden');
    const chatId = id;
    user.getUserId().then((userId) => {
        const dataUsers = {
            users: [userId],
            chatId: chatId,
        };
        // получаем токен
        http.post(`https://ya-praktikum.tech/api/v2/chats/token/${chatId}`, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'credentials': 'include',
                'mode': 'cors',
            },
        })
            .then(data => {
                const token = JSON.parse(data.response).token;
                // подключаем к чату юзера
                http.put(`https://ya-praktikum.tech/api/v2/chats/users`, {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                    },
                    data: JSON.stringify(dataUsers),
                })
                    .then(response => {
                        if(response.status === 200) {
                            socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);
                            socket.addEventListener('open', (event) => {
                                console.log('Соединение установлено');
                                socket.send(JSON.stringify({
                                    content: 0,
                                    type: 'get old',
                                }))
                                console.log(socket)
                                //this._offset += 20;
                            });

                            socket.addEventListener('close', event => {
                                if (event.wasClean) {
                                    console.log('Соединение закрыто чисто');
                                } else {
                                    console.log('Обрыв соединения');
                                }

                                console.log(`Код: ${event.code} | Причина: ${event.reason}`);
                            });

                            socket.addEventListener('message', event => {
                                const data = JSON.parse(event.data);
                                const input = document.getElementById('message');
                                const messages = document.querySelector('.chat__feed');
                                const div = document.createElement('div');
                                div.classList.add('chat__message');
                                /*if(data.user_id === me.id) {
                                    div.classList.add('message_me');
                                }*/
                                div.textContent = data.content;
                                messages.append(div);
                                input.value = '';
                            });

                            socket.addEventListener('error', event => {
                                console.log('Ошибка', event.message);
                            });
                        } else {
                            console.log('Не получилось подключить пользователя');
                        }
                    })
            });
    })
}



function sendMessage(evt: Event) {
    let input = (evt.target as HTMLInputElement).querySelector('input');
    if(input != null) {
        socket.send(JSON.stringify({
            content: input.value,
            type: 'message',
        }));
    }
}
