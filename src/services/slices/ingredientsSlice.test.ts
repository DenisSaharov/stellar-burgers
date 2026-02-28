import ingredientsReducer, { fetchIngredients } from './ingredientsSlice';
import { TIngredient } from '../../utils/types';

const ingredientsMock: TIngredient[] = [
  {
    _id: '1',
    name: 'Тестовый ингредиент',
    type: 'main',
    proteins: 10,
    fat: 20,
    carbohydrates: 30,
    calories: 40,
    price: 50,
    image: 'image.png',
    image_large: 'image-large.png',
    image_mobile: 'image-mobile.png'
  }
];

describe('ingredientsSlice reducer', () => {
  it('handles request action', () => {
    const state = ingredientsReducer(
      undefined,
      fetchIngredients.pending('', undefined)
    );

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('handles success action', () => {
    const state = ingredientsReducer(
      { ingredients: [], loading: true, error: null },
      fetchIngredients.fulfilled(ingredientsMock, '', undefined)
    );

    expect(state.loading).toBe(false);
    expect(state.ingredients).toEqual(ingredientsMock);
  });

  it('handles failed action', () => {
    const error = new Error('Network error');

    const state = ingredientsReducer(
      { ingredients: [], loading: true, error: null },
      fetchIngredients.rejected(error, '', undefined)
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Network error');
  });
});
