const Rule: React.FC<any> = ({ updateElement, rule, deleteElement }) => {
  return (
    <div
      style={{
        margin: '10px',
        display: 'flex',
        gap: '20px',
        flexShrink: 0,
        padding: '15px',
      }}
    >
      <p>Rule</p>
      <select
        value={rule.type}
        onChange={(e) =>
          updateElement({
            value: e.target.value,
            elementId: rule.id,
            keyToUpdate: 'type',
          })
        }
      >
        <option>Dropdown</option>
        <option>Text</option>
      </select>
      {rule.type === 'Dropdown' ? (
        <select
          value={rule.value}
          onChange={(e) =>
            updateElement({
              value: e.target.value,
              elementId: rule.id,
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
            updateElement({
              value: e.target.value,
              ruleId: rule.id,
              keyToUpdate: 'value',
            })
          }
        />
      )}
      <button onClick={() => deleteElement({ elementId: rule?.id })}>
        Delete
      </button>
    </div>
  );
};

export default Rule;
