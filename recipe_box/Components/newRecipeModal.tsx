import * as React from 'react'
import { IRecipe } from '../Services/recipeStore'

interface modalProps {
    show: boolean,
    recipe: IRecipe
    submitFn: (IRecipe) => void;
    closeFn: () => void;
}

interface modalState {
    id: number,
    name: string,
    ingredientsCsv: string
}

/** Modal window containing an add/edit form for recipes */
export class NewRecipeModal extends React.Component<modalProps, modalState>{

    recipeName: HTMLInputElement;

    constructor(props: modalProps) {
        super(props);

        this.state = {
            id: null,
            name: null,
            ingredientsCsv: null
        }
    }

    componentWillMount() {

        this.setState({
            id: this.props.recipe.id,
            name: this.props.recipe.name,
            ingredientsCsv: this.props.recipe.ingredients
        })
    }

    componentDidMount(){
        this.recipeName.focus();
    }

    postRecipe = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        let r = {
            id: this.state.id,
            name: this.state.name,
            ingredients: this.state.ingredientsCsv
        }

        this.props.submitFn(r)
    }

    render() {

        let namechange = (e) => this.setState({ name: e.target.value });

        let ingredientChange = (e) => this.setState({ ingredientsCsv: e.target.value });

        let close = (e) => this.props.closeFn();

        if (this.props.show) {

            return <div className="modalBackdrop">
                <div className="modalBody">
                    <form id='newRecipe' className="newRecipeForm" onSubmit={this.postRecipe}>

                        <div className='formRow' id='recipename'>
                            <label htmlFor='recipename'>Recipe:</label>
                            <input
                                ref={(input)=>{this.recipeName = input}}
                                className='input recipeName'
                                name='recipename'
                                placeholder='recipe name'
                                value={this.state.name}
                                onChange={namechange}
                            ></input>
                        </div>
                        <div className='formRow' id='ingredients'>
                            <label htmlFor='ingredients'>Ingredients:</label>
                            <textarea
                                className='input recipeIngredients'
                                name='ingredients'
                                placeholder='enter ingredients separated by commas'
                                value={this.state.ingredientsCsv}
                                onChange={ingredientChange}
                            ></textarea>
                        </div>

                    </form>

                    <div className='modalControls'>
                        <input className='btn' type="submit" form='newRecipe' value="Save Recipe"></input>
                        <button className='btn' onClick={this.props.closeFn}>Cancel</button>
                    </div>
                </div>
            </div >

        } else {
            return null;
        }
    }
}