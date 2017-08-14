import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {GameState} from './Components/game';

let App  = () => <GameState></GameState>;

ReactDOM.render(<App/>,document.getElementById('appRoot'));
