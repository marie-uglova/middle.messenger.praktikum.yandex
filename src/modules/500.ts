import Block from './block';
import { Error500Page } from '../pages/error500-page';

class Error500PageComponent extends Block {
    render() {
        return Error500Page;
    }
}

export class Error500PageContainer extends Block {
    constructor(props) {
        super({
            ...props,
            errorPageContent: new Error500PageComponent({
                title: 'Ошибка 500',
                text: 'Мы уже чиним.',
            }),
        })
    }

    override render() {
        return `{{{ errorPageContent }}}`
    }
}
