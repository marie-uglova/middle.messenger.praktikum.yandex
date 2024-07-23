import EventBus from "./event-bus";
import * as Handlebars from 'handlebars';

export default class Block<Props extends Record<string, any> = any> {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    };

    _element = null;
    _id = Math.floor(100000 + Math.random() * 900000);
    props: Props;
    children: Record<string, any>;
    lists: Record<string, any>;
    private eventBus: () => EventBus;
    controller = new AbortController();
    signal = this.controller;

    constructor(propsWithChildren = {}) {
        const eventBus = new EventBus();
        const {props, children, lists} = this._getChildrenPropsAndProps(propsWithChildren);
        this.props = this._makePropsProxy({...props});
        this.children = children;
        this.lists = lists;
        this.eventBus = () => eventBus;
        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    _addEvents() {
        const {events = {}} = this.props;
        Object.keys(events).forEach(eventName => {
            (this._element as unknown as HTMLAreaElement).addEventListener(eventName, events[eventName])
        }, this.signal );
    }

    _removeEvents() {
        this.controller.abort();
    }

    _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    init() {
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    _componentDidMount() {
        this.componentDidMount();
        Object.values(this.children).forEach(child => {child.dispatchComponentDidMount();});
    }

    componentDidMount(oldProps) {}

    dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    _componentDidUpdate(oldProps: string | number | null, newProps: string | number | null) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        }
        this._render();
    }

    componentDidUpdate(oldProps, newProps) {
        return true;
    }

    _getChildrenPropsAndProps(propsAndChildren: ArrayLike<unknown> | { [s: string]: unknown; }) {
        const children: Record<string, any> = {};
        const props: Record<string, any> = {};
        const lists: Record<string, any> = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else if(Array.isArray(value)) {
                lists[key] = value;
            } else {
                props[key] = value;
            }
        });

        return {children, props, lists};
    }

    addAttributes() {
        const {attr = {}} = this.props;

        Object.entries(attr).forEach(([key, value]) => {
            if (typeof value === "string") {
                (this._element as unknown as HTMLAreaElement).setAttribute(key, value);
            }
        });
    }

    setProps = (nextProps: any) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    }

    get element() {
        return this._element;
    }

    _render() {
        //console.log("Render")
        const propsAndStubs: Record<string, any> = { ...this.props };
        const _tmpId =  Math.floor(100000 + Math.random() * 900000);
        Object.entries(this.children).forEach(([key, child]) => {
            propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
        });

        Object.entries(this.lists).forEach(([key, __]) => {
            propsAndStubs[key] = `<div data-id="__l_${_tmpId}"></div>`;
        });

        const fragment = this._createDocumentElement('template');
        fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);

        Object.values(this.children).forEach(child => {
            const stub = (fragment as HTMLTemplateElement).content.querySelector(`[data-id="${child._id}"]`) as Element;
            stub.replaceWith(child.getContent());
        });

        Object.entries(this.lists).forEach(([__, child]) => {
            const template = document.createElement('template') as HTMLTemplateElement;
            const listCont = template.content;

            child.forEach((item: { getContent: () => string | Node; }) => {
                if (item instanceof Block) {
                    listCont.append(item.getContent()!);
                } else {
                    listCont.append(document.createTextNode(`${item}`));
                }
            });

            const stub = (fragment as HTMLTemplateElement).content.querySelector(`[data-id="__l_${_tmpId}"]`) as Element;
            stub.replaceWith(template.content);
        })

        const newElement: any = (fragment as HTMLTemplateElement).content.firstElementChild as Element;
        if (this._element) {
            (this._element as HTMLAreaElement).replaceWith(newElement);
        }
        this._element = newElement;
        this._addEvents();
        this.addAttributes();
    }

    render() {}

    getContent() {
        return this.element;
    }

    _makePropsProxy(props: {}) {
        const self = this;

        return new Proxy(props, {
            get(target: any, prop: string) {
                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set(target: any, prop: string, value: string) {
                const oldTarget = {...target};
                target[prop] = value;
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty() {
                throw new Error('No access');
            }
        });
    }

    _createDocumentElement(tagName: string) {
        return document.createElement(tagName);
    }

    show() {
        this.getContent()!.style.display = "block";
    }

    hide() {
        this.getContent()!.style.display = "none";
    }
}
