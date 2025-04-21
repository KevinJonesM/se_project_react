import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  return (
    <li className="card">
      <img
        src={item.link}
        alt={item.name}
        className="card__image"
        onClick={() => onCardClick(item)}
      />
      <h2 className="card__name">{item.name}</h2>
    </li>
  );
}

export default ItemCard;