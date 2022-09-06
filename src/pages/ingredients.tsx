import { useRef } from 'react';
import { trpc } from '../utils/trpc';

function Ingredients(props: any) {
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const imagePathRef = useRef<HTMLInputElement>(null);

  const { data, isLoading, refetch } = trpc.useQuery([
    'ingredients.get-ingredients',
  ]);
  const createIngredientMutation = trpc.useMutation(
    ['ingredients.create-ingredient'],
    { onSuccess: () => refetch() }
  );

  if (isLoading || !data) return <div>Loading...</div>;

  const handleAddIngredient = () => {
    const name = nameRef.current!.value;
    const description = descriptionRef.current!.value;
    const imagePath =
      'http://bruketa-zinic.com/wp-content/uploads/2017/02/chiavalon_mlado_packaging_1.jpg';

    createIngredientMutation.mutate({ name, description, imagePath });
  };

  console.log('data', data);
  return (
    <>
      <h1 className="text-sm">Ingredients</h1>
      <input ref={nameRef} />
      <input ref={descriptionRef} />
      <input ref={imagePathRef} />
      <button onClick={handleAddIngredient}>Add ingredient</button>
      {data.ingredients.map((ingredient) => {
        return <div key={ingredient.id}>{ingredient.name}</div>;
      })}
    </>
  );
}

export default Ingredients;
