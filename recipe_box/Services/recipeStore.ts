
class RecipeStore {

    private storage: Storage;
    private recipes: IRecipe[];

    constructor() {

        this.storage = window.localStorage;
        this.recipes = this.storage.getItem('_recipeBox') ? JSON.parse(this.storage.getItem('_recipeBox')) : [];

    }

    getRecipes() {
        return this.recipes;
    }

    getBlankRecipe():IRecipe{
        return {
            id: this.nextId,
            name: '',
            ingredients: ''
        }
    }

    addRecipe(r: IRecipe): Promise<IRecipe[]> {

        r.id = this.nextId;

        return new Promise((res, rej) => {

            this.recipes.push(r);

            this.updateStore()
                .then(() => res(this.recipes))
                .catch(e => rej(e))
        })
    }

    deleteRecipe(id: number): Promise<IRecipe[]> {

        return new Promise((res, rej) => {

            this.recipes = this.recipes.filter(a => {
                a.id !== id;
            })

            this.updateStore()
                .then(() => res(this.recipes))
                .catch(e => rej(e));
        })
    }

    /** Update an existing recipe - sync to the store - return the recipe list */
    updateRecipe(recipe: IRecipe): Promise<IRecipe[]> {

        return new Promise((res, rej) => {
            let idx = this.recipes.findIndex(a => {
                return a.id == recipe.id
            })

            this.recipes[idx] = recipe;

            this.updateStore()
                .then(() => res(this.recipes))
                .catch(e => rej(e));
        })


    }

    get nextId() {
        return this.recipes.length;
    }

    private updateStore() {

        return new Promise((res, rej) => {
            try {
                this.storage.setItem('_recipeBox', JSON.stringify(this.recipes));
                res()
            } catch (e) {
                rej(e)
            }
        })

    }

}


const recipeStore: IRecipeStore = new RecipeStore();
Object.freeze(recipeStore);


export interface IRecipe {
    id: number,
    name: string,
    ingredients: string
}

export interface IRecipeStore {

    getRecipes: () => IRecipe[];
    addRecipe: (r: IRecipe) => Promise<IRecipe[]>
    deleteRecipe: (id: number) => Promise<IRecipe[]>
    updateRecipe: (r: IRecipe) => Promise<IRecipe[]>
    nextId: number
}

export default recipeStore;

