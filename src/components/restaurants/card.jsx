const Card = (props) => {
  return (<div className='border-2 border-yellow-500 h-54 w-44 p-3 m-3 hover:bg-yellow-100'>
    <strong>{props.name}</strong>
    <div>{props.cuisine}</div>
    <div>{props.location}</div>
    <div>{props.rating} - {props.reviews.length} reviews</div>
    <div>Average check:{props.check}</div>
    <a href={`/restaurants/${props.name}`}> Details
    </a>
  </div>);
}

export default Card;
