import * as React from 'react'
import { IRecipe } from '../Services/recipeStore'

interface RecipeCardProps {
    recipe: IRecipe
    key: number
    expandCard: (id: number) => void;
    editFn: (id: number) => void;
    deleteFn: (id: number) => void;
    expanded: boolean
}

interface RecipeCardState {
    expanded: boolean
}

export class RecipeCard extends React.Component<RecipeCardProps, RecipeCardState> {

    constructor(props: RecipeCardProps) {
        super(props)
    }

    toggleExpand(e: React.MouseEvent<HTMLAnchorElement>) {
        e.preventDefault();
        this.props.expandCard(this.props.recipe.id);
    }

    toggleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        this.props.editFn(this.props.recipe.id);
    }

    deleteCard = (e) => {
        e.preventDefault();
        this.props.deleteFn(this.props.recipe.id);
    }

    render() {

        let bodyClasses = ['recipeBody', 'tr'];

        //If this card is expanded
        if (this.props.expanded) {
            bodyClasses.push('show');
        }

        return <div className="recipeCard shadow">
            <div className="recipeName tr">
                <a
                    href='#'
                    data-id={this.props.recipe.id}
                    onClick={(e) => this.toggleExpand(e)}>{this.props.recipe.name}
                </a>
            </div>
            <div className={bodyClasses.join(' ')}>

                <div className="recipeHeader tr">
                    Ingredients
                </div>

                {this.props.recipe.ingredients.split(',').map((ing, i) => {
                    return <div key={i} className='ingredient tr'>{ing.trim()}</div>
                })}

                <div className='recipeCardControls tr'>
                    <button className='btn' onClick={this.toggleEdit}>Edit</button>
                    <button className='btn' onClick={this.deleteCard}>Delete</button>
                </div>

            </div>
        </div>
    }
}