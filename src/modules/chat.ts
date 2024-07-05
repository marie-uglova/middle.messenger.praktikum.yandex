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

    override render() {
        return `{{{ chatPageContent }}}`
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

const testChatList: Record<string, string | null> = {
    'message': ''
}

function sendMessage(evt: Event) {
    let input = (evt.target as HTMLInputElement).querySelector('input');
    if(input != null) {
        testChatList.message = input.value;
        console.log(testChatList);
    }
}
