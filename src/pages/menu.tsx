function Menu(props: any) {
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
