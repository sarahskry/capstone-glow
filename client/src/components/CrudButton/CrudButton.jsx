import "./CrudButton.scss";

export default function CrudButton({ type = "button", onClick, children }) {
  return (
    <button
      className="crud-button"
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}


