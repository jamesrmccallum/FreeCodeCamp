import * as React from 'react'
import recipeStore, { IRecipeStore, IRecipe } from '../Services/recipeStore'
import { RecipeCard } from './recipeCard'
import { NewRecipeModal } from './newRecipeModal'

interface RecipeBoxProps { }

interface RecipeBoxState {
    recipes: IRecipe[],
    cardStates: boolean[]
    modalVisible: boolean,
    editing: boolean
}

export class RecipeBox extends React.Component<RecipeBoxProps, RecipeBoxState> {

    private storage: IRecipeStore;

    constructor(props: RecipeBoxProps) {
        super(props);
        this.storage = recipeStore;

        this.state = {
            recipes: [],
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

    /** Add a new recipe */
    addNewRecipe = (r: IRecipe) => {

        this.storage.addRecipe(r).then(r => {
            this.setState({
                recipes: r,
                cardStates: this.state.cardStates.concat([false])
            }, () => {
                this.toggleModal();
            })
        })
    }

    /** Delete the recipe with the given id */
    deleteRecipe = (id: number) => {

        this.storage.deleteRecipe(id).then(r => {
            this.setState({
                recipes: r
            })
        })
    }

    updateRecipe(r: IRecipe) {

        this.storage.updateRecipe(r).then(r => {
            this.setState({
                recipes: r
            })
        })
    }

    openModal(mode: 'add'|'edit') {

        this.setState({
            modalVisible:true
        })
    }

    toggleExpandedCard = (e: React.MouseEvent<HTMLAnchorElement>) => {

        let id = parseInt((e.target as HTMLAnchorElement).dataset.id)
        console.log(`Toggling card ${id}`);
        let states = this.state.cardStates.slice()

        for (let i = 0; i < states.length; i++) {
            //If this is the 
            states[i] = i == id ? !states[i] : false;
        }

        this.setState({
            cardStates: states
        })
        console.log(states);
    }



    closeModal = () => {
        this.setState({
            modalVisible: false
        })
    }


    render() {

        let addRecipeClickHandler = (e) => {
            e.preventDefault();
            this.toggleModal();
        }

        return <div className='recipeBox'>
            {this.state.recipes.map((r, i) => {

                return <RecipeCard
                    expanded={this.state.cardStates[i]}
                    expandCard={this.toggleExpandedCard}
                    deleteFn={this.deleteRecipe}
                    editFn={this.updateRecipe}
                    key={i}
                    recipe={r}
                ></RecipeCard>
            })}

            <div className='buttonContainer'>
                <button className='btn addNew shadow' onClick={addRecipeClickHandler}>Add New Recipe></button>
            </div>

            <NewRecipeModal
                show={this.state.modalVisible}
                recipe: {this.state.}
                submitFn={this.addNewRecipe}
                updateFn={this.updateRecipe}
                closeFn={this.closeModal}
            ></NewRecipeModal>
        </div>

    }

}