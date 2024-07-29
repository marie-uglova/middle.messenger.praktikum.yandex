import store from "./store";

export function connect(Component: any, selector?: Function) {
    return class extends Component {
        constructor(...args) {
            super(...args);

            store.subscribe(() => {
                if(selector) {
                    let props = selector(store.getState());
                    this.setProps(props);
                }

            });

            console.log(this)
        }
    }
}
