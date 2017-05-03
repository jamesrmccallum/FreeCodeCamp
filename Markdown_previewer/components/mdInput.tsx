import * as React from 'react'

type InputProps = {
    chngHandler: (e: React.ChangeEvent<HTMLTextAreaElement>)=>void;
    style?: React.CSSProperties,
    className?: string
}

interface InputState { value: string }

export class MarkdownInput extends React.Component<InputProps, InputState> {

    constructor(props: InputProps) {
        super(props);
    }

    handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement> )=> {
        this.props.chngHandler(e);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

    render() {

        return <form>
                <textarea
                    onChange={this.handleInputChange}>
                </textarea>
               </form>
    }

}