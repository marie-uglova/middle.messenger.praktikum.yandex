import Block from '../core/block';
import {checkMessage, validate, validateForm, validationResults} from './validation';
import {Input} from '../components/uikit/input';
import {Field} from '../components/uikit/field';
import {Button} from '../components/uikit/button';
import {ChatList} from '../components/chat/chat-list';
import {ChatDeleteUserButton} from '../components/chat/chat-delete-user-button';
import {ChatItem} from '../components/chat/chat-item';
import {ChatMessage} from '../components/chat/chat-message';
import {ChatMessageList} from '../components/chat/chat-message-list';
import {ChatSearchForm} from '../components/chat/chat-search-form/';
import {ChatSearchResultItem} from '../components/chat/chat-search-result-item/';
import {ChatSearchResult} from '../components/chat/chat-search-result/';
import {ChatForm} from '../components/chat/chat-form/';
import {ChatAdd} from '../components/chat/chat-add/';
import {ChatPage} from '../pages/chat-page';
import User from '../core/get-user';
import ChatController from '../controllers/chat-controller';

const user = new User();

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

class ChatDeleteUserButtonComponent extends Block {
    render() {
        return ChatDeleteUserButton;
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

const chatList = new ChatListComponent({
    chats: []
});

const messageList = new ChatMessageListComponent({
    messages: []
});

const chatAdd = new ChatAddComponent({
    events: {
        click: () => {
            showSearch();
        }
    }
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
    result: []
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
                messageList: messageList,
                chatForm: chatForm,
            }),
        })
        user.getUserStore();
    }

    override componentDidUpdate(oldProps: any, newProps: any): boolean {
        if(oldProps.props?.first_name !== newProps.props?.first_name) {
            ChatController.getChats()
                .then((response) => {
                    console.log(response)
                    if(Array.isArray(response) && response.length) {
                        const dataChatsWithMessages = response.filter(el => el.last_message);
                        chatList.lists = {
                            chats: dataChatsWithMessages.map(
                                (data) => new ChatItemComponent({
                                    name: data.last_message.user.first_name,
                                    title: data.title,
                                    intro: data.last_message.content,
                                    avatar: (() => {
                                        if (data.last_message.user.avatar !== null) {
                                            return `<img loading="lazy" src="https://ya-praktikum.tech/api/v2/resources${data.last_message.user.avatar}" alt="аватар юзера" />`;
                                        } else {
                                            return `<img loading="lazy" src="../assets/images/ava.png" alt="аватар юзера" />`;
                                        }
                                    })(),
                                    count: (() => {
                                        if (data.unread_count > 0) {
                                            return '<div class="chat__list-count">' + data.unread_count + '</div>';
                                        }
                                    })(),
                                    events: {
                                        click: () => {
                                            openChat(data.id);
                                        }
                                    }
                                })
                            )
                        }
                        chatList.setProps({a: 1});
                    }
                })
            return true;
        }
        return false;
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

function showSearch() {
    const addUserForm = document.querySelector('.chat__list-form');
    if(addUserForm) addUserForm.classList.toggle('hidden');
}

function searchUser(evt: Event) {
    evt.preventDefault();
    let input = (evt.target as HTMLInputElement).querySelector('input');
    if(input != null) {
        const dataSearchValue = {
            login: input.value,
        };
        ChatController.searchUser(JSON.stringify(dataSearchValue))
            .then(dataSearch => {
                if(Array.isArray(dataSearch) && dataSearch.length) {
                    const dataCreate = {
                        title: 'новый чат',
                    };
                    ChatController.createChat(JSON.stringify(dataCreate))
                        .then((response: any) => {
                            const chatId = response.id;
                            chatSearchResult.lists = {
                                result: dataSearch.map(
                                    (data) => new ChatSearchResultItemComponent({
                                        name: data.login,
                                        events: {
                                            click: () => {
                                                console.log('Добавить в чат', chatId, 'пользователя', data.id);
                                                const dataUsers = {
                                                    users: [data.id],
                                                    chatId: chatId,
                                                }
                                                ChatController.addUser(JSON.stringify(dataUsers))
                                                    .then(() => {
                                                        openChat(chatId);
                                                    })
                                            }
                                        }
                                    })
                                )
                            }
                            chatSearchResult.setProps({a: 1});
                        })
                }
            })
    }
}

let socket: WebSocket;

function openChat(id: number) {
    const chatContainer = document.querySelector('.chat__container');
    if(chatContainer) chatContainer.classList.remove('hidden');
    const chatId = id;
    user.getUserId().then((userId) => {
        // получаем токен
        ChatController.getToken(chatId)
            .then((dataToken: any) => {
                const token = dataToken.token;
                socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);
                socket.addEventListener('open', () => {
                    console.log('Соединение установлено');
                    socket.send(JSON.stringify({
                        content: 0,
                        type: 'get old',
                    }))
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
                    try {
                        const dataList = JSON.parse(event.data);
                        if(Array.isArray(dataList) && dataList.length) {
                            messageList.lists = {
                                messages: dataList.map(
                                    ({time, content, user_id}) => new ChatMessageComponent({
                                        message: content,
                                        time: time,
                                        className: userId === user_id ? '_outgoing' : null,
                                        deleteButton: userId !== user_id ? new ChatDeleteUserButtonComponent({
                                            events: {
                                                click: () => {
                                                    deleteUser(user_id, chatId);
                                                }
                                            }
                                        }) : null,
                                    }),
                                )
                            }
                            messageList.setProps({a: 1});
                        } else if (typeof dataList === 'object' && dataList?.type === 'message') {
                            messageList.lists.messages.push(new ChatMessageComponent({
                                message: dataList.content,
                                time: dataList.time,
                                className: userId === dataList.user_id ? '_outgoing' : null})
                            );
                            messageList.setProps({a: 1});
                        }
                    } catch (err) {
                        alert( err.message );
                    }
                });

                socket.addEventListener('error', () => {
                    console.log('Ошибка');
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

function deleteUser(userId: number, chatId: number) {
    console.log('Удалить юзера', userId, 'из чата', chatId);
    const dataDeleteUser = {
        users: [userId],
        chatId: chatId
    };
    ChatController.deleteUser(JSON.stringify(dataDeleteUser))
        .then(() => {
            alert('Юзер удален из чата');
        })
}
