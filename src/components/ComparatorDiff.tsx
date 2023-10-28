import * as Diff from "diff";
import "../styles/ComparatorDiff.css";

type Props = {
  previous: string;
  current: string;
};

export const ComparatorDiff = (props: Props) => {
  const diff = Diff.diffLines(props.previous, props.current);
  return (
    <>
      {diff.map((part: any, i: number) => (
        <span
          key={`${part.value}-${i}`}
          className={
            part.added ? "text-addition" : part.removed ? "text-removal" : ""
          }
        >
          {part.value}
        </span>
      ))}
    </>
  );
};
