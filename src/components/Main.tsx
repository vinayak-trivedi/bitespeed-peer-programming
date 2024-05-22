import { useStore } from '../context/Store';
import Builder from './Builder';

const Main = () => {
  const { builder } = useStore();
  const shouldHideDeleteButton = builder.rules.length === 1;
  return (
    <Builder
      builder={builder}
      shouldHideDeleteButton={shouldHideDeleteButton}
    />
  );
};

export default Main;
