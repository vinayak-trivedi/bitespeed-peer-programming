import { useStore } from '../context/Store';
import Builder from './Builder';

const Main = () => {
  const { builder } = useStore();
  return <Builder builder={builder} />;
};

export default Main;
