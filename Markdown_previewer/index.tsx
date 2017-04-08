
interface MarkdownViewerProps { name: string, message: string }

class MarkdownViewer extends React.Component<MarkdownViewerProps, any> {

    private foo: number;
    public name: string;
    public message: string;

    constructor(props: MarkdownViewerProps) {
        super(props);
        this.foo = 42;
    }

    public handleOnChange(event: Event): void {
        let t = event.target as HTMLInputElement
        this.setState({ name: t.value });
    }

    render() {
        return <div>Hello World!</div>
    }

}

interface InputProps { markdown: string }

class Input extends React.Component<InputProps, any> {

    constructor(props: InputProps) {
        super(props);
        this.state = '';
    }

    render() {
        return <Input>this.state></Input>
    }
}

class MarkDownApp Extends React.Component {

}

const input = <MarkdownViewer name="james" message="You're a cunt!"></MarkdownViewer>;
const renderer = <Input markdown=''></Input>;

ReactDOM.render(input, document.getElementById('mdInput'));
ReactDOM.render(renderer, document.getElementById('mdRender'));