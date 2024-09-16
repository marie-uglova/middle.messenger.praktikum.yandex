import Block from './block';
import {checkMessage, validate, validateForm, validationResults} from './validation';
import {Input} from '../components/uikit/input';
import {Field} from '../components/uikit/field';
import {Button} from '../components/uikit/button';
import {ChatItem} from '../components/chat/chat-item';
import {ChatMessage} from '../components/chat/chat-message';
import {ChatTopbar} from '../components/chat/chat-topbar';
import {ChatForm} from '../components/chat/chat-form/';
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
    events: {
        click: (evt: Event) => {
            openChat(evt);
        }
    }
});

const chatTopbar = new ChatTopbarComponent({
    name: 'Константин'
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
                chatItem: chatItem,
                chatTopbar: chatTopbar,
                chatList: [
                    new ChatMessageComponent({
                        message: 'С Байконура совершил старт корабль «Восток». Кстати, такое название присуще многим советским кораблям для полета в космос.',
                    }),
                    new ChatMessageComponent({
                        message: 'С Байконура совершил старт корабль «Восток». Кстати, такое название присуще многим советским кораблям для полета в космос.',
                    }),
                    new ChatMessageComponent({
                        message: 'С Байконура совершил старт корабль «Восток». Кстати, такое название присуще многим советским кораблям для полета в космос.',
                    }),
                    new ChatMessageComponent({
                        message: 'С Байконура совершил старт корабль «Восток». Кстати, такое название присуще многим советским кораблям для полета в космос.',
                    }),
                    new ChatMessageComponent({
                        message: 'С Байконура совершил старт корабль «Восток». Кстати, такое название присуще многим советским кораблям для полета в космос.',
                    }),
                    new ChatMessageComponent({
                        message: 'С Байконура совершил старт корабль «Восток». Кстати, такое название присуще многим советским кораблям для полета в космос.',
                    }),
                    new ChatMessageComponent({
                        message: 'С Байконура совершил старт корабль «Восток». Кстати, такое название присуще многим советским кораблям для полета в космос.',
                    }),
                    new ChatMessageComponent({
                        message: 'С Байконура совершил старт корабль «Восток». Кстати, такое название присуще многим советским кораблям для полета в космос.',
                    }),
                    new ChatMessageComponent({
                        message: 'С Байконура совершил старт корабль «Восток». Кстати, такое название присуще многим советским кораблям для полета в космос.',
                    }),
                    new ChatMessageComponent({
                        message: 'С Байконура совершил старт корабль «Восток». Кстати, такое название присуще многим советским кораблям для полета в космос.',
                    }),
                    new ChatMessageComponent({
                        message: 'С Байконура совершил старт корабль «Восток». Кстати, такое название присуще многим советским кораблям для полета в космос.',
                    }),
                    new ChatMessageComponent({
                        message: 'С Байконура совершил старт корабль «Восток». Кстати, такое название присуще многим советским кораблям для полета в космос.',
                    }),
                ],
                chatForm: chatForm,
            }),
        })

    }

    /*override componentDidUpdate(oldProps: any, newProps: any): boolean {
        if(oldProps.props?.first_name !== newProps.props?.first_name) {
            chatTopbar.setProps({name: newProps.props.id});
            return true;
        }
        return false;
    }*/

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

function openChat(evt: Event) {

}



function sendMessage(evt: Event) {
    let input = (evt.target as HTMLInputElement).querySelector('input');
    if(input != null) {
        const data = {
            title: input.value,
        };
        // создаем чат
        http.post('https://ya-praktikum.tech/api/v2/chats', {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            data: JSON.stringify(data),
        })
            .then((response) => {
                if(response.status === 200) {
                    const chatId = JSON.parse(response.response).id;
                    //const userId = 2103;
                    const userId = user.getUserId();
                    const userIdAnother = 2102;
                    const dataUsers = {
                        users: [userIdAnother],
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
                                        // запускаем WebSocket
                                        const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);
                                        socket.addEventListener('open', () => {
                                            console.log('Соединение установлено');

                                            socket.send(JSON.stringify({
                                                content: 'Моё первое сообщение миру!',
                                                type: 'message',
                                            }));
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
                                            console.log('Получены данные', event.data);
                                        });

                                        socket.addEventListener('error', event => {
                                            console.log('Ошибка', event.message);
                                        });
                                    } else {
                                        console.log('Не получилось подключить пользователя');
                                    }
                                })
                        });

                } else {
                    alert(JSON.parse(response.response).reason);
                }
            });
    }
}
