import "./index.css";
export default function MainSection(props) {
  const { value, holdDice, isHeld, id } = props;
  const styles = {
    backgroundColor: isHeld ? "#c856f1" : "white",
  };
  return (
    <button
      style={styles}
      onClick={() => holdDice(id)}
      value={value}
      id={id}
      aria-pressed={isHeld}
      aria-label={`Die with value ${value}, 
            ${isHeld ? "held" : "not held"}`}
    >
      {value}
    </button>
  );
}
