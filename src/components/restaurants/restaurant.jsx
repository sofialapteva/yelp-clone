import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'

const Restaurant = () => {
  const styles = {
    form: 'border-2 border-yellow-500 p-3 m-3 hover:bg-yellow-100 text-center',
    title: 'flex items-start justify-center',
    button: 'bg-yellow-400 text-sm rounded-md px-1 mx-2',
    review: 'border-2 border-yellow-500 px-3 my-2 mx-3 hover:bg-yellow-100 text-center'
  }
  const history = useHistory();
  //устанавливаем state для компонентов, зависящих от поведения пользователя
  const [toggleEdit, setToggleEdit] = useState(true)
  const [buttonText, setButtonText] = useState('edit')
  const [restaurant, setRestaurant] = useState('')
  const [location, setLocation] = useState('')
  const [cuisine, setCuisine] = useState('')
  //получаем с сервера информацию о ресторане
  useEffect(() => {
    (async () => {
      let request = await fetch('http://localhost:3001/restaurant')
      let restaurants = await request.json()
      let restaurant = restaurants.find(el => el.name === history.location.pathname.split('/').pop())
      setRestaurant(restaurant)
      setLocation(restaurant?.location);
      setCuisine(restaurant?.cuisine)
    })()
  })
  //отправляем на сервер информацию о ресторане после редактирования
  const handleEdit = async (e) => {
    e.preventDefault()
    toggleEdit === true ? setToggleEdit(false) : setToggleEdit(true)
    buttonText === 'edit' ? setButtonText('submit') : setButtonText('edit')
    if (buttonText === 'submit') {
      await fetch('http://localhost:3001/restaurant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: restaurant.name, 
          cuisine: e.target.parentElement.parentElement.cuisine.value, 
          location: e.target.parentElement.parentElement.location.value, 
          rating: restaurant.rating, 
          reviews: restaurant.reviews, 
          check: restaurant.check
        })
      })
    }
  }
  //контролируемый ввод в поля input
  const inputLocationHandler = (e) => {
    setLocation(e.target.value)
  }
  const inputCuisineHandler = (e) => {
    setCuisine(e.target.value)
  }

  return (
    <div>
      <form className={styles.form}>
        <div className={styles.title}>
          <h2 type='text' className='inline px-4'>{restaurant?.name}</h2>
          <button type={buttonText} className={styles.button} onClick={handleEdit}>{buttonText}</button>
          <a href={`/restaurants/${restaurant?.name}/reviews/new`} className={styles.button}>Leave a review</a>
        </div>
        <input type='text' name='cuisine' value={cuisine} onChange={inputCuisineHandler} disabled={toggleEdit} /> <br />
        <input type='text' name='location' value={location} onChange={inputLocationHandler} disabled={toggleEdit} />
        <div>Rating: {restaurant?.rating}*</div>
        <div>Average check: {restaurant?.check}</div>
        <div>
          <h4>Reviews: {restaurant?.reviews?.length} reviews</h4>
          {restaurant?.reviews?.map(el => (
            <div className={styles.review}>Review by {el.login} : "{el.text}"</div>))}
        </div>
      </form>
    </div>
  );
}

export default Restaurant;
