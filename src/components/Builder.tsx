import { useStore } from '../context/Store';
import { generateUniqueId } from '../utils/apputils';
import Rule from './Rule';

const Builder: React.FC<any> = ({ builder }) => {
  const { dispatch } = useStore();

  function updateElement({
    elementId,
    keyToUpdate,
    value,
  }: {
    elementId: string;
    keyToUpdate: string;
    value: string;
  }) {
    dispatch({
      type: 'UPDATE_ELEMENT',
      payload: {
        targetElementId: elementId,
        keyToUpdate,
        value,
      },
    });
  }

  function addRule() {
    dispatch({
      type: 'ADD_ELEMENT',
      payload: {
        builderId: builder.id,
        rule: {
          id: generateUniqueId(),
          type: 'Dropdown',
          value: '',
        },
      },
    });
  }

  function addRuleGroup() {
    dispatch({
      type: 'ADD_ELEMENT',
      payload: {
        builderId: builder.id,
        rule: {
          operator: 'And',
          rules: [
            {
              type: 'Text',
              value: '',
            },
          ],
          id: generateUniqueId(),
          depth: 0,
        },
      },
    });
  }

  function deleteElement({ elementId }: { elementId: string }) {
    dispatch({
      type: 'DELETE_ELEMENT',
      payload: {
        targetElementId: elementId,
      },
    });
  }

  return (
    <div
      style={{
        margin: '20px',
        border: '1px solid grey',
        width: '90%',
        padding: '10px',
      }}
    >
      <p>Rule group</p>
      {builder.rules.map((ruleOrBuilder: any, index: any) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {index === 1 && (
            <select
              value={builder.operator}
              onChange={(e) =>
                updateElement({
                  elementId: builder.id,
                  keyToUpdate: 'operator',
                  value: e.target.value,
                })
              }
            >
              <option>AND</option>
              <option>OR</option>
            </select>
          )}
          {'operator' in ruleOrBuilder ? (
            <div style={{ margin: '10px' }}>
              <Builder key={ruleOrBuilder.id} builder={ruleOrBuilder} />
            </div>
          ) : (
            <Rule
              key={index}
              rule={ruleOrBuilder}
              updateElement={updateElement}
              deleteElement={deleteElement}
            />
          )}
        </div>
      ))}
      <button onClick={addRule}>Add Rule</button>
      <button onClick={addRuleGroup}>Add Rule Group</button>
    </div>
  );
};

export default Builder;
