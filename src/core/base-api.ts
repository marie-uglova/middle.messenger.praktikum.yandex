export class BaseAPI {
    // На случай, если забудете переопределить метод и используете его, — выстрелит ошибка
    create() { throw new Error('Not implemented'); }

    request() { throw new Error('Not implemented'); }

    update() { throw new Error('Not implemented'); }

    delete() { throw new Error('Not implemented'); }
}

// chat-api.js
import HTTP from 'modules/http';
import { BaseAPI } from 'modules/http/base-api';

const chatAPIInstance = new HTTP('api/v1/chats');

class ChatAPI extends BaseAPI {
    create() {
        // Здесь уже не нужно писать полный путь /api/v1/chats/
        return chatAPIInstance.post('/', {title: 'string'});
    }

    request() {
        // Здесь уже не нужно писать полный путь /api/v1/chats/
        return chatAPIInstance.get('/full');
    }
}

// chat-messages-api.js
import HTTP from 'modules/http';
import { BaseAPI } from 'modules/http/base-api';

const chatMessagesAPIInstance = new HTTP('api/v1/messages');

class ChatMessagesAPI extends BaseAPI {
    request({id}) {
        return chatMessagesAPIInstance.get(`/${id}`);
    }
}
  
