import { ChangeEvent, useRef } from 'react';
import { trpc } from '../utils/trpc';

const getIngredients = () => {
  const { data, isLoading } = trpc.useQuery(['ingredients.get-ingredients']);

  if (isLoading || !data) return;

  return data.ingredients;
};

const getRecipes = () => {
  const { data, isLoading } = trpc.useQuery(['recipes.get-recipes']);

  if (isLoading || !data) return;

  return data.recipes;
};

function Ingredients(props: any) {
  const nameRef = useRef<HTMLInputElement>(null);
  const preparationRef = useRef<HTMLInputElement>(null);

  const ingredients = getIngredients();
  const recipes = getRecipes();

  const createRecipeMutation = trpc.useMutation(['recipes.create-recipe']);

  if (!ingredients || !recipes) return <div>Loading...</div>;

  const handleAddRecipe = () => {
    const name = nameRef.current!.value;
    const preparation = preparationRef.current!.value;
    const imagePath =
      'http://bruketa-zinic.com/wp-content/uploads/2017/02/chiavalon_mlado_packaging_1.jpg';

    createRecipeMutation.mutate({ name, preparation, imagePath });
  };

  return (
    <>
      <h1 className="text-sm">Ingredients</h1>
      <input ref={nameRef} />
      <input ref={preparationRef} />
      <select
        onChange={(event: ChangeEvent<HTMLSelectElement>) =>
          console.log('event.target.value', event.target.value)
        }
      >
        {ingredients.map((ingredient) => (
          <option key={ingredient.id} value={ingredient.id}>
            {ingredient.name}
          </option>
        ))}
      </select>
      <button onClick={handleAddRecipe}>Add recipe</button>
      {recipes.map((recipe) => {
        return <div key={recipe.id}>{recipe.name}</div>;
      })}
    </>
  );
}

export default Ingredients;
