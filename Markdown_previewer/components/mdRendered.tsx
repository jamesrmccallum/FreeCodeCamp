import * as React from 'react'

interface MarkdownRenderedProps {
    style?: React.CSSProperties,
    className?: string,
    rendered: string
}

type MarkdownRendererState = {renderedMarkdown: string;}

export class MarkdownRendered extends React.Component<MarkdownRenderedProps, MarkdownRendererState> {

    constructor(props: MarkdownRenderedProps) {
        super(props);
    }

    createMarkup(){
        return {__html: this.props.rendered}
    }

    render() {

        return <div 
                id="mdRender" 
                dangerouslySetInnerHTML={this.createMarkup()}
                >
                </div>
    }

}
