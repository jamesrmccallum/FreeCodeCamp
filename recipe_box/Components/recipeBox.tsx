import * as React from 'react'
import recipeStore, { IRecipeStore, IRecipe } from '../Services/recipeStore'
import { RecipeCard } from './recipeCard'
import { NewRecipeModal } from './newRecipeModal'

interface RecipeBoxProps { }

interface RecipeBoxState {
    recipes: IRecipe[],
    cardStates: boolean[]
    modalVisible: boolean,
    modalRecipe: IRecipe,
    editing: boolean

}

export class RecipeBox extends React.Component<RecipeBoxProps, RecipeBoxState> {

    private storage: IRecipeStore;

    constructor(props: RecipeBoxProps) {
        super(props);
        this.storage = recipeStore;

        this.state = {
            recipes: [],
            modalRecipe: null,
            cardStates: [],
            modalVisible: false,
            editing: false
        };
    }

    componentWillMount() {

        let recipes = this.storage.getRecipes();

        this.setState({
            recipes: recipes,
            cardStates: recipes.map(r => false)
        })
    }

    /** Add a new recipe, or update an existing 
     * Adjust the card toggle states array
    */
    addOrUpdateRecipe = (r: IRecipe) => {

        this.storage.addOrUpdateRecipe(r).then(r => {
            this.setState({
                recipes: r,
                cardStates: r.map(r => false)
            }, () => {
                this.closeModal();
            })
        })
    }

    /** Delete the recipe with the given id */
    deleteRecipe = (id: number) => {

        this.storage.deleteRecipe(id).then(r => {
            this.setState({
                recipes: r,
                cardStates: r.map(r=>false)
            })
        })
    }

    openModal = (id?: number) => {

        let recipe = id == undefined ? this.storage.getBlankRecipe() : this.storage.getRecipeById(id) 

        this.setState({
            modalRecipe: recipe
        }, () => {
            this.setState({
                modalVisible: true
            })
        })
    }


    closeModal = () => {
        this.setState({
            modalVisible: false
        })
    }

    toggleExpandedCard = (id: number) => {

        console.log(`Toggling card ${id}`);
        let states = this.state.cardStates.slice()

        for (let i = 0; i < states.length; i++) {
            states[i] = i == id ? !states[i] : false;
        }

        this.setState({
            cardStates: states
        })
        console.log(states);
    }

    render() {

        let addRecipeClickHandler = (e) => {
            e.preventDefault();
            this.openModal();
        }

        return <div className='recipeBox'>

            {this.state.recipes.map((r, i) => {
                return <RecipeCard
                    expanded={this.state.cardStates[i]}
                    expandCard={this.toggleExpandedCard}
                    deleteFn={this.deleteRecipe}
                    editFn={this.openModal}
                    key={i}
                    recipe={r}
                ></RecipeCard>
            })}

            <div className='buttonContainer'>
                <button className='btn addNew shadow' onClick={addRecipeClickHandler}>Add New Recipe></button>
            </div>

            {this.state.modalVisible &&
                <NewRecipeModal
                    show={this.state.modalVisible}
                    recipe={this.state.modalRecipe}
                    submitFn={this.addOrUpdateRecipe}
                    closeFn={this.closeModal}
                ></NewRecipeModal>
            }
        </div >

    }

}