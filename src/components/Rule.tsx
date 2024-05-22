const Rule: React.FC<any> = ({
  updateRule,
  rule,
  shouldShowAnd,
  operator,
  updateOperator,
}) => {

  return (
    <div>
      <select
        onChange={(e) => updateRule({ type: e.target.value, ruleId: rule.id })}
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
            updateRule({ value: e.target.value, ruleId: rule.id })
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
            updateRule({ value: e.target.value, ruleId: rule.id })
          }
        />
      )}
    </div>
  );
};

export default Rule;
