const form = document.querySelector('form')
form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const email = form.email.value
  const password = form.password.value
  try {
    const res = await fetch('http://localhost:5000/api/user/login', {
      method: 'post',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await res.json()
    console.log(`This is from ${JSON.stringify(data)}`)
    if (data.user) {
      location.assign('/scan.html')
    }
  } catch (err) {
    console.log(err.message)
  }
})

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const firstname = form.firstname.value
  const lastname = form.lastname.value
  const email = form.email.value
  const password = form.password.value
  try {
    const res = await fetch('http://localhost:5000/api/user/register', {
      method: 'post',
      body: JSON.stringify({ firstname, lastname, email, password }),
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await res.json()
    console.log(`What is coming out of ${JSON.stringify(data)}`)
    if (data.user) {
      //location.assign('/scan.html?token='+(data._id))
      location.assign('/scan.html')
    }
  } catch (err) {
    console.log(err.message)
  }
})
