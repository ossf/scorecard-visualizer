import "../styles/Collapsable.css";

const Collapsible = ({ details }: any) => {
  return (
    <>
      <details>
        <summary>Details</summary>
        <div className="details__wrapper content">
          <ul>
            {details.map((el: string, i: number) => (
              <li key={i}>{el}</li>
            ))}
          </ul>
        </div>
      </details>
    </>
  );
};
export default Collapsible;
