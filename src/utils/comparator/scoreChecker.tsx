import Badge from "../../components/Badge";

export const scoreChecker = (currentValue: number, previousValue: number) => {
  if (currentValue < 0) {
    currentValue = 0;
  }

  if (previousValue < 0) {
    previousValue = 0;
  }

  const result = currentValue - previousValue;

  if (result > 0) {
    return (
      <Badge variant="increased" message={`Increased ${result.toFixed(1)}`} />
    );
  }

  if (result < 0) {
    return (
      <Badge variant="decreased" message={`Decreased ${result.toFixed(1)}`} />
    );
  }

  return <Badge message={"Unchanged"} />;
};
