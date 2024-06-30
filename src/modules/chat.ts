import Block from './block';
import { Alert } from '../components/uikit/alert';
import { Input } from '../components/uikit/input';
import { Field } from '../components/uikit/field';
import { Button } from '../components/uikit/button';
import { ChatItem } from '../components/chat/chat-item';
import { ChatMessage } from '../components/chat/chat-message';
import { ChatTopbar } from '../components/chat/chat-topbar';
import { ChatForm } from '../components/chat/chat-form';
import { ChatPage } from '../pages/chat-page';

class InputComponent extends Block {
    render() {
        return Input;
    }
}

class AlertComponent extends Block {
    render() {
        return Alert;
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

const chatMessage = new ChatMessageComponent({
    message: 'С Байконура совершил старт корабль «Восток». Кстати, такое название присуще многим советским кораблям для полета в космос.',
    time: '12:56',
    className: '_outgoing'
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
            placeholder: 'Сообщение'
        }),
    }),
    button: new ButtonComponent({
        text: 'Отправить',
        type: 'submit'
    })
});

export class ChatPageContainer extends Block {
    constructor(props) {
        super({
            ...props,
            chatPageContent: new ChatPageComponent({
                chatItem: chatItem,
                chatTopbar: chatTopbar,
                chatMessage: chatMessage,
                chatForm: chatForm,
            }),
        })
    }

    override render() {
        return `{{{ chatPageContent }}}`
    }
}
