import "./Card.css";

function Card({ children }) {
  return (
    <div className="gradient">
      <div className="content">{children}</div>
    </div>
  );
}

export default Card;
