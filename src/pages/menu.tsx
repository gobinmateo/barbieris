import { useEffect } from 'react';
import { trpc } from '../utils/trpc';

function Menu(props: any) {
  const { data, isLoading } = trpc.useQuery(['ingredients.get-ingredients']);
  const createIngredientMutation = trpc.useMutation([
    'ingredients.create-ingredient',
  ]);

  if (isLoading || !data) return <div>Loading...</div>;

  console.log('data', data);
  return (
    <>
      <h1 className="text-3xl">Menu</h1>
      <code>{props.questions}</code>
    </>
  );
}

export const getServerSideProps = () => {
  const questions = ['abc', 'def'];

  return {
    props: {
      questions,
    },
  };
};

export default Menu;
