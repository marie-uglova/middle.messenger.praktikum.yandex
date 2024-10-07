import {expect} from 'chai';
import Block from './block';

interface Props {
    text?: string,
    events?: Record<string, () => void>
}

describe('Block', () => {
    let PageClass: typeof Block;

    before(() => {
        class Page extends Block {
            constructor(props: Props) {
                super({
                    ...props
                })
            }

            render(): string {
                return `<div><span id="test-text">{{text}}</span></div>`
            }
        }

        PageClass = Page;
    })

    it('Создать компонент с пропсами', () => {
        const text = 'Привет!';
        const pageComponent: any = new PageClass({text});

        const spanText = pageComponent.element?.querySelector('#test-text')?.textContent;

        expect(spanText).to.be.eq(text);

    })
})
