import store from "./store";

export function connect(Component: any, selector?: Function) {
    return class extends Component {
        constructor(...args: any) {
            super(...args);

            store.subscribe(() => {
                if(selector) {
                    let props = selector(store.getState());
                    this.setProps({props: props});
                }

            });

            console.log(this)
        }
    }
}
