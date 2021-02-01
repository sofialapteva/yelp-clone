import React, { useState } from 'react';
const Login = () => {
  const [visibility, setVisibility] = useState('')
  const styles = {
    input: 'h-8 w-full border-2 border-yellow-500 block m-2 text-center',
    button: 'h-8 w-full border-2 bg-yellow-400 border-yellow-500 hover:bg-yellow-500 block m-2',
    form: 'mx-auto w-9/12'
  }

  const handleLogin = async (e) => {
    if (e.target.login.value === '' || e.target.login.value === '') {
      alert('Insert the login and the password');
      return
    }
    e.preventDefault()
    const req = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        login: e.target.login.value,
        password: e.target.password.value,
      })
    })
    e.target.login.value = '';
    e.target.password.value = '';
    const res = await req.json()
    const login = res.login;
    alert(`Hello, ${login}`)
    setVisibility('hidden')
  }

  return (
    <div className={visibility}>
      <form className={styles.form} onSubmit={handleLogin}>

        <input type='text' name='login' className={styles.input} placeholder='Login' />

        <input type='password' name='password' className={styles.input} placeholder='Password' />

        <button type='submit' className={styles.button}>Log in</button>

      </form>
    </div>
  );
}

export default Login;
