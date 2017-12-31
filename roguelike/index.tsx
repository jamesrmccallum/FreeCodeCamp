import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {GameState} from './components/game';

let App  = () => <GameState></GameState>;

ReactDOM.render(<App/>,document.getElementById('appRoot'));
