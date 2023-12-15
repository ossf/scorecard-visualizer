import "../styles/NoAvailableDataMark.css";

export default function NoAvailableDataMark() {
  return (
    <abbr className="tooltip tooltip--top" data-tooltip="Data not available">
      <span className="not-available-data">?</span>
    </abbr>
  );
}
