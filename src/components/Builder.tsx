import { useStore } from '../context/Store';
import { generateUniqueId } from '../utils/apputils';
import Rule from './Rule';

const Builder: React.FC<any> = ({ builder }) => {
  const { dispatch } = useStore();

  function updateRule({
    ruleId,
    keyToUpdate,
    value,
  }: {
    ruleId: string;
    keyToUpdate: string;
    value: string;
  }) {
    dispatch({
      type: 'UPDATE_ELEMENT',
      payload: {
        targetElementId: ruleId,
        keyToUpdate,
        value,
      },
    });
  }

  function addRule() {
    console.log('new value', 'function called');
    dispatch({
      type: 'ADD_ELEMENT',
      payload: {
        builderId: builder.id,
        rule: {
          id: generateUniqueId(),
          type: '',
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
              type: '',
              value: '',
            },
          ],
          id: generateUniqueId(),
          depth: 0,
        },
      },
    });
  }

  return (
    <div style={{ margin: '20px', border: '1px solid grey' }}>
      {builder.rules.map((ruleOrBuilder: any, index: any) =>
        'operator' in ruleOrBuilder ? (
          <div style={{ margin: '10px' }}>
            <Builder key={ruleOrBuilder.id} builder={ruleOrBuilder} />
          </div>
        ) : (
          <Rule key={index} rule={ruleOrBuilder} updateRule={updateRule} />
        )
      )}
      <button onClick={addRule}>Add Rule</button>
      <button onClick={addRuleGroup}>Add Rule Group</button>
    </div>
  );
};

export default Builder;
