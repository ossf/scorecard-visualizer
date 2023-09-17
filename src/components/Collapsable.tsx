import { ComparatorDiff } from "./ComparatorDiff";
import "../styles/Collapsable.css";

const Collapsible = (props: any) => {
  return (
    <>
      <details>
        <summary>Details</summary>
        <div className="details__wrapper content">
          <ul>
            {props.details.map((el: string, i: number) =>
              props.prevDetails && props.prevDetails[i] ? (
                <li key={i}>
                  <ComparatorDiff
                    previous={props.prevDetails[i]}
                    current={el}
                  />
                </li>
              ) : (
                <li key={i}>{el}</li>
              ),
            )}
          </ul>
        </div>
      </details>
    </>
  );
};

export default Collapsible;
