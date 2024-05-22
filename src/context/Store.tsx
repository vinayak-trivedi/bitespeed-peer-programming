import React, {
  ReactNode,
  createContext,
  useReducer,
  Dispatch,
  useContext,
} from 'react';

// Define types
type Rule = {
  type: string;
  value: string;
};

type Element = Rule | Builder;

type Builder = {
  operator: string;
  rules: Element[];
  id: string;
  depth: number;
};

type State = {
  builder: Builder;
};

type Action =
  | {
      type: 'UPDATE_BUILDER_OPERATOR';
      payload: { builderId: string; operator: string };
    }
  | { type: 'ADD_BUILDER'; payload: { parentId: string; element: Builder } };

const StoreContext = createContext<
  { state: State; dispatch: Dispatch<Action> } | undefined
>(undefined);

const initialState: State = {
  builder: {
    operator: '',
    rules: [
      {
        type: 'Dropdown',
        value: 'Testing1',
      },
      {
        operator: 'And',
        id: 'someting',
        depth: 1,
        rules: [
          {
            type: 'Text',
            value: 'testing fadsf',
          },
          {
            type: 'DropDown',
            value: 'testing fadsf',
          },
        ],
      },
      {
        type: 'Dropdown',
        value: 'Testing1',
      },
    ],
    id: 'root',
    depth: 0,
  },
};

const reducer = (state: State, action: Action): State => {
  const { payload, type } = action;

  switch (type) {
    case 'UPDATE_BUILDER_OPERATOR':
      return updateBuilder(state);
    case 'ADD_BUILDER':
      return addBuilder(state);
    default:
      return state;
  }
};

const addBuilder = (state: State) => {
  return state;
};

const updateBuilder = (state: State) => {
  return state;
};

const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }

  return { dispatch: context.dispatch, ...context.state };
};

export { StoreContext, StoreProvider };
