import constructorReducer, {
  addConstructorIngredient,
  removeConstructorIngredient,
  moveConstructorIngredientUp,
  moveConstructorIngredientDown
} from './constructorSlice';
import { TIngredient } from '../../utils/types';

const bun: TIngredient = {
  _id: 'bun_1',
  name: 'Тестовая булка',
  type: 'bun',
  proteins: 10,
  fat: 5,
  carbohydrates: 20,
  calories: 200,
  price: 100,
  image: 'bun.png',
  image_large: 'bun-large.png',
  image_mobile: 'bun-mobile.png'
};

const main1: TIngredient = {
  _id: 'main_1',
  name: 'Тестовая начинка 1',
  type: 'main',
  proteins: 12,
  fat: 10,
  carbohydrates: 8,
  calories: 150,
  price: 90,
  image: 'main-1.png',
  image_large: 'main-1-large.png',
  image_mobile: 'main-1-mobile.png'
};

const main2: TIngredient = {
  _id: 'main_2',
  name: 'Тестовая начинка 2',
  type: 'main',
  proteins: 14,
  fat: 11,
  carbohydrates: 9,
  calories: 170,
  price: 95,
  image: 'main-2.png',
  image_large: 'main-2-large.png',
  image_mobile: 'main-2-mobile.png'
};

describe('constructorSlice reducer', () => {
  it('handles adding ingredient', () => {
    const stateWithBun = constructorReducer(
      undefined,
      addConstructorIngredient(bun)
    );

    expect(stateWithBun.bun?._id).toBe('bun_1');
    expect(stateWithBun.ingredients).toHaveLength(0);

    const stateWithMain = constructorReducer(
      stateWithBun,
      addConstructorIngredient(main1)
    );

    expect(stateWithMain.ingredients).toHaveLength(1);
    expect(stateWithMain.ingredients[0]._id).toBe('main_1');
    expect(stateWithMain.ingredients[0].id).toBeDefined();
  });

  it('handles removing ingredient', () => {
    const stateWithItems = constructorReducer(
      constructorReducer(undefined, addConstructorIngredient(main1)),
      addConstructorIngredient(main2)
    );

    const removeId = stateWithItems.ingredients[0].id;

    const stateAfterRemove = constructorReducer(
      stateWithItems,
      removeConstructorIngredient(removeId)
    );

    expect(stateAfterRemove.ingredients).toHaveLength(1);
    expect(stateAfterRemove.ingredients[0]._id).toBe('main_2');
  });

  it('handles changing filling order', () => {
    const stateWithItems = constructorReducer(
      constructorReducer(undefined, addConstructorIngredient(main1)),
      addConstructorIngredient(main2)
    );

    const movedUpState = constructorReducer(
      stateWithItems,
      moveConstructorIngredientUp(1)
    );

    expect(movedUpState.ingredients[0]._id).toBe('main_2');
    expect(movedUpState.ingredients[1]._id).toBe('main_1');

    const movedDownState = constructorReducer(
      movedUpState,
      moveConstructorIngredientDown(0)
    );

    expect(movedDownState.ingredients[0]._id).toBe('main_1');
    expect(movedDownState.ingredients[1]._id).toBe('main_2');
  });
});
