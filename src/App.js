import { NavLink, Route } from 'react-router-dom'
import Main from './components/main'
import Login from './components/login'
import Info from './components/info'
import { Button } from 'reactstrap';
import Restaurant from './components/restaurants/restaurant';
import Review from './components/review'


function App() {
  const styles = {
    nav: 'h-10 grid grid-cols-3 md:grid-cols-10 md:justify-end bg-yellow-600',
    logo: 'md:col-span-8 ml-5 uppercase font-extrabold',
    main: 'w-9/12 border-2 border-black mx-auto my-5'
  }
  return (
    <div className='main'>
      <nav className={styles.nav}>

        <NavLink exact to={{ pathname: '/' }} className={styles.logo}>
          <Button color="warning">HlebHelb</Button>
        </NavLink>

        <NavLink to={{ pathname: '/login' }} >
          <Button color="warning">Login</Button>
        </NavLink>
        <NavLink to={{ pathname: '/info' }} >
          <Button color="warning">Info</Button>
        </NavLink>

      </nav>
      <div className={styles.main}>
        <Route path='/login' component={Login} />
        <Route path='/' component={Main} />
        <Route path='/info' component={Info} />
        <Route exact path='/restaurants/:id' component={Restaurant} />
        <Route path='/restaurants/:id/reviews/new' component={Review} />
      </div>
    </div >
  );
}

export default App;
