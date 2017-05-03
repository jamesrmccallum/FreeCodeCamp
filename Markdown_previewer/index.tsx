
import * as marked from 'marked';
import {MarkdownInput} from './components/mdInput';
import {MarkdownRendered} from './components/mdRendered';
import * as React from 'react'
import * as ReactDOM from 'react-dom'

interface mdAppState{
    rendered: string;
}
class MarkDownApp extends React.Component < any, mdAppState > {

    constructor(props: any) {
        super(props);
        this.state = {rendered: ''}
    }

    inputChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>)=>{
        let el = e.target as HTMLTextAreaElement;
        this.setState({
            rendered:marked(el.value)
        }) 
    }

    render() {

        let appStyle: React.CSSProperties = {
            display: 'flex',
            flexAlign: 'stretch'
        }

        return <div id="mdApp" style={appStyle}>
                <MarkdownInput chngHandler={this.inputChangeHandler}></MarkdownInput>
                <MarkdownRendered rendered={this.state.rendered}></MarkdownRendered>
                </div>
    }



}



ReactDOM.render(<MarkDownApp></MarkDownApp>, document.getElementById('mdApp'));