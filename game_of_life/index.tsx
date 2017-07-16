import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Board} from './components/board';

let App  = () => <Board></Board>;

ReactDOM.render(<App/>,document.getElementById('appRoot'));
