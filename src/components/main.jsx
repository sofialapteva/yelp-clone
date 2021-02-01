import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import Card from './restaurants/card'

const Main = () => {
  const styles = {
    toggle: 'h-10 w-40 mx-auto text-center bg-yellow-400 rounded-lg p-2 m-2 hover:bg-yellow-500',
    card: 'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 justify-around m-3 '
  }
  const [restaurants, setRestaurants] = useState([])
  useEffect(() => {
    (async () => {
      const req = await fetch('http://localhost:3001/restaurant')
      const res = await req.json()
      setRestaurants(res)
    })()
  }, [])

  const [toggleRestaurants, setToggleRestaurants] = useState('hidden');
  const handleRestaurantsToggle = () => {
    toggleRestaurants === 'hidden' ? setToggleRestaurants('visible') : setToggleRestaurants('hidden')
  }
  return (
    <main className='m-4'>

      <h2 className='text-center'>
        Welcome to HlebHelb
      </h2>

      <p className='text-center'>
        HlebHelb is a service that provides information about restaurants around the world. There you can choose a place and leave a rating and a review. Enjoy!
      </p>

      <div onClick={handleRestaurantsToggle} className={styles.toggle}>
        <NavLink to={{ pathname: '/restaurants' }}>Show restaurants</NavLink>
      </div>

      <div className={styles.card + toggleRestaurants}>
        {restaurants.map((el, index) => (<Card name={el.name} cuisine={el.cuisine} location={el.location} rating={el.rating} reviews={el.reviews} check={el.check} key={index} />))}
      </div>

    </main >);
}

export default Main;

