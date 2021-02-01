import { useState } from "react";
import { useHistory } from 'react-router-dom'

const Review = () => {
  const { location } = useHistory()
  const restaurant = location.pathname.split('/')[2];
  const styles = {
    button: 'h-8 w-48 mx-auto rounded-md border-2 bg-yellow-400 border-yellow-400 h-10 hover:bg-yellow-500',
    form: 'grid grid-rows-6 p-3 mx-auto',
    login: 'uppercase',
    review: 'border-2 border-yellow-500 my-3 row-span-4'
  }
  const [visibility, setVisibility] = useState('')
  const handleReview = async (e) => {
    if (e.target.review.value === '') {
      alert('Insert the text of the review');
      return
    }
    e.preventDefault()
    const review = {
      login: e.target.login.value,
      text: e.target.review.value
    }
    await fetch('http://localhost:3001/review', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        restaurant: restaurant,
        review: review,
      })
    })
    e.target.login.value = '';
    e.target.review.value = '';
    setVisibility('hidden')
  }

  return (
    <div className={visibility}>
      <h3 className='text-center'>New review for {restaurant}</h3>
      <form onSubmit={handleReview} className={styles.form}>
        <input type='hidden' name='login' value={'login'} />
        <textarea name='review' className={styles.review} />
        <button type='submit' className={styles.button}>Leave a review</button>
      </form>
    </div>
  );
}

export default Review;
