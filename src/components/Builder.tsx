import Rule from './Rule';

const Builder: React.FC<any> = ({ builder }) => {
  console.log(builder, 'jfaksdjflsdkfjsdafalakdsjf');
  return (
    <div style={{ margin: '20px' }}>
      {builder.rules.map((ruleOrBuilder: any, index: any) =>
        'operator' in ruleOrBuilder ? (
          <div style={{ margin: '10px' }}>
            <Builder key={ruleOrBuilder.id} builder={ruleOrBuilder} />
          </div>
        ) : (
          <Rule key={index} rule={ruleOrBuilder} />
        )
      )}
    </div>
  );
};

export default Builder;
