import Main from "./components/Main";
import { StoreProvider } from "./context/Store";

function App() {
  return (
    <StoreProvider>
      <Main />
    </StoreProvider>
  )
}

export default App;
