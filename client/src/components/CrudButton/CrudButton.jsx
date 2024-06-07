import "./Button.scss";

export default function AddButton(props) {
  return (
    <button
      className="button"
      type={props.type}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}


