import "../styles/Badge.css";

interface BadgeTypes {
  variant?: string;
  message: string;
}

function Badge(props: BadgeTypes) {
  return (
    <span className={`badge badge-${props.variant}`}>{props.message}</span>
  );
}

export default Badge;
