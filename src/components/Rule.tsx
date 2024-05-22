const Rule: React.FC<any> = ({
  updateRule,
  rule,
  shouldShowAnd,
  operator,
  updateOperator,
}) => {
  return (
    <div style={{ margin: '20px' }}>
      <select
        value={rule.type}
        onChange={(e) =>
          updateRule({
            value: e.target.value,
            ruleId: rule.id,
            keyToUpdate: 'type',
          })
        }
      >
        <option>Dropdown</option>
        <option>Text</option>
      </select>
      {shouldShowAnd && (
        <select
          value={operator}
          onChange={(e) => updateOperator({ operator: e.target.value })}
        >
          <option>AND</option>
          <option>OR</option>
        </select>
      )}
      {rule.type === 'Dropdown' ? (
        <select
          value={rule.value}
          onChange={(e) =>
            updateRule({
              value: e.target.value,
              ruleId: rule.id,
              keyToUpdate: 'value',
            })
          }
        >
          <option>Testing</option>
          <option>Testing1</option>
          <option>Testing2</option>
        </select>
      ) : (
        <input
          value={rule.value}
          onChange={(e) =>
            updateRule({
              value: e.target.value,
              ruleId: rule.id,
              keyToUpdate: 'value',
            })
          }
        />
      )}
    </div>
  );
};

export default Rule;
