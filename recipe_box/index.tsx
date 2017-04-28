import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {RecipeBox} from './Components/recipeBox'

let App  = () => <RecipeBox></RecipeBox>

ReactDOM.render(<App/>,document.getElementById('appRoot'));

