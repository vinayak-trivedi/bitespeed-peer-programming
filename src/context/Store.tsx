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
      type: 'UPDATE_ELEMENT';
      payload: any;
    }
  | { type: 'ADD_ELEMENT'; payload: any };

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
        id: 'jkfaldsjfkdsfljkd',
      },
      {
        operator: 'And',
        id: 'someting',
        depth: 1,
        rules: [
          {
            id: 'kfadsfjksdl',
            type: 'Text',
            value: 'testing fadsf',
          },
          {
            id: 'kfdaslfksd',
            type: 'Dropdown',
            value: 'testing fadsf',
          },
        ],
      },
      {
        id: 'kfaldsjkkfdsjfalskd',
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
    case 'UPDATE_ELEMENT':
      return updateElement(
        state,
        payload.targetElementId,
        payload.keyToUpdate,
        payload.value
      );
    case 'ADD_ELEMENT':
      return addElement(state, payload.builderId, payload.rule);
    default:
      return state;
  }
};

const addElement = (state: State, builderId: string, rule: Element) => {
  const updatedBuilder = traverseAndAddRule(state.builder, builderId, rule);
  return {
    ...state,
    builder: updatedBuilder,
  };
};

const traverseAndUpdateRule = (
  object: any,
  targetElementId: any,
  keyToUpdate: string,
  value: any
): any => {
  if (object.id === targetElementId) {
    if (keyToUpdate in object) {
      return {
        ...object,
        [keyToUpdate]: value,
      };
    } else {
      return object;
    }
  }

  const updatedRules = object.rules.map((nestedElement: any) => {
    if ('operator' in nestedElement) {
      return traverseAndUpdateRule(
        nestedElement,
        targetElementId,
        keyToUpdate,
        value
      );
    } else if (nestedElement.id === targetElementId) {
      if (keyToUpdate in nestedElement) {
        return {
          ...nestedElement,
          [keyToUpdate]: value,
        };
      } else {
        return nestedElement;
      }
    }
    return nestedElement;
  });

  return {
    ...object,
    rules: updatedRules,
  };
};

const traverseAndAddRule = (
  object: any,
  targetBuilderId: any,
  rule: Element
): any => {
  if (object.id === targetBuilderId) {
    return {
      ...object,
      rules: [...object.rules, rule],
    };
  }

  const updatedRules = object.rules.map((nestedRule: any) => {
    if ('operator' in nestedRule) {
      return traverseAndAddRule(nestedRule, targetBuilderId, rule);
    }
    return nestedRule;
  });

  return {
    ...object,
    rules: updatedRules,
  };
};

const updateElement = (
  state: State,
  targetElementId: any,
  keyToUpdate: any,
  value: any
) => {
  console.log(state, keyToUpdate, targetElementId, value);
  const updatedBuilder = traverseAndUpdateRule(
    state.builder,
    targetElementId,
    keyToUpdate,
    value
  );
  return {
    ...state,
    builder: updatedBuilder,
  };
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
