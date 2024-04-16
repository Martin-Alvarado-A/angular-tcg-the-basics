import { Ingredient } from '../../shared/ingredient.model';
import * as SLA from './shopping-list.actions';

export interface AppState {
  shoppingList: State;
}

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

export function shoppingListReducer(
  state: State = initialState,
  action: SLA.ShoppingListActions
) {
  switch (action.type) {
    case SLA.ADD_INGREDIENT:
      return { ...state, ingredients: [...state.ingredients, action.payload] };

    case SLA.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      };

    case SLA.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[action.payload.index];
      const updatedIngredient = {
        ...ingredient, // Demo: it could be that this object has other properties not being updated in the payload
        ...action.payload.ingredient,
      };
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[action.payload.index] = updatedIngredient;

      return {
        ...state,
        ingredients: updatedIngredients,
      };

    case SLA.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ing, i) => {
          return i !== action.payload;
        }),
      };

    case SLA.START_EDIT:
      return {
        ...state,
        editedIngredient: { ...state.ingredients[action.payload] },
        editedIngredientIndex: action.payload,
      };

    case SLA.STOP_EDIT:
      return { ...state, editedIngredient: null, editedIngredientIndex: -1 };

    default:
      return state;
  }
}
