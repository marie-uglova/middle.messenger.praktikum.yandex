import Block from '../core/block';
import {checkMessage, validate, validateForm, validationResults} from './validation';
import {Input} from '../components/uikit/input';
import {Field} from '../components/uikit/field';
import {Button} from '../components/uikit/button';
import {ChatList} from '../components/chat/chat-list';
import {ChatItem} from '../components/chat/chat-item';
import {ChatMessage} from '../components/chat/chat-message';
import {ChatMessageList} from '../components/chat/chat-message-list';
import {ChatTopbar} from '../components/chat/chat-topbar';
import {ChatSearchForm} from '../components/chat/chat-search-form/';
import {ChatSearchResultItem} from '../components/chat/chat-search-result-item/';
import {ChatSearchResult} from '../components/chat/chat-search-result/';
import {ChatForm} from '../components/chat/chat-form/';
import {ChatAdd} from '../components/chat/chat-add/';
import {ChatPage} from '../pages/chat-page';
import User from '../core/get-user';
import HTTPTransport from '../core/http';

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

class ChatListComponent extends Block {
    render() {
        return ChatList;
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

class ChatMessageListComponent extends Block {
    render() {
        return ChatMessageList;
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

class ChatSearchResultItemComponent extends Block {
    render() {
        return ChatSearchResultItem;
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
    name: '',
    intro: '',
    count: '',
    events: {
        click: (evt: Event) => {
            openChat(evt);
        }
    }
});

const chatList = new ChatListComponent({
    chats: ''
});

const messageList = new ChatMessageListComponent({
    messages: ''
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
    result: ''
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
                chatList: chatList,
                chatTopbar: chatTopbar,
                messageList: messageList,
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
                    const dataChats = JSON.parse(response.response);
                    console.log(dataChats);
                    if(Array.isArray(dataChats) && dataChats.length) {
                        chatList.lists = {
                            chats: dataChats.map(
                                (data) => new ChatItemComponent({
                                    name: data.last_message?.user.first_name,
                                    intro: data.last_message?.content,
                                    count: data.unread_count
                                })
                            )
                        }
                        chatList.setProps({a: 1});
                    }
                    /*
                    const chatListItems = document.querySelectorAll('.chat__list-item');
                    chatListItems.forEach((el) => {
                        el.addEventListener('click', (item) => {
                            openChat(item.target.dataset.id);
                        })
                    })*/

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
                const dataResult = JSON.parse(data.response);
                console.log(dataResult);
                if(Array.isArray(dataResult) && dataResult.length) {
                    chatSearchResult.lists = {
                        result: dataResult.map(
                            (data) => new ChatSearchResultItemComponent({
                                name: data.login,
                            })
                        )
                    }
                    chatSearchResult.setProps({a: 1});
                }
                /*usersToAdd.forEach((el) => {
                    el.addEventListener('click', (item) => {
                        console.log('Добавить в чат пользователя', item.target.dataset.id);
                        const dataUsers = {
                            users: [item.target.dataset.id],
                            chatId: 27005,
                        }
                        http.put(`https://ya-praktikum.tech/api/v2/chats/users`, {
                            headers: {
                                'Content-Type': 'application/json; charset=UTF-8',
                            },
                            data: JSON.stringify(dataUsers),
                        })
                            .then(response => {
                                console.log(response.status);
                            })
                    })
                })*/
            })
    }
}

let socket;

function openChat(id) {
    const chatContainer = document.querySelector('.chat__container');
    chatContainer.classList.remove('hidden');
    const chatId = id;
    user.getUserId().then((userId) => {
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
                socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);
                socket.addEventListener('open', (event) => {
                    console.log('Соединение установлено');
                    socket.send(JSON.stringify({
                        content: 0,
                        type: 'get old',
                    }))
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
                    const dataList = JSON.parse(event.data);
                    if(Array.isArray(dataList) && dataList.length) {
                        messageList.lists = {
                            messages: dataList.map(
                                ({time, content, user_id}) => new ChatMessageComponent({
                                    message: content,
                                    time: time,
                                    className: userId === user_id ? '_outgoing' : null  })
                            )
                        }
                        messageList.setProps({a: 1});
                    } else if (typeof dataList === 'object' && dataList?.type === 'message') {
                        console.log(dataList);
                    }
                });

                socket.addEventListener('error', event => {
                    console.log('Ошибка', event.message);
                });

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
        input.value = '';
    }
}
