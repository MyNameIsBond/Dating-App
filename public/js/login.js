const reg_button = window.document.getElementById('reg_button')

window.document.getElementById('login_btn').addEventListener('click', () => {
  const xml = new XMLHttpRequest()
  xml.onload = function () {
    if (xml.readyState === 4 && xml.status === 200) {
      document.getElementById('profile').innerHTML = this.responseText
    } else {
      const error = 'error'
      console.log(error, this.statusText)
    }
  }
  xml.open('POST', '/profile', true)
  xml.send()
})


// reg_button.addEventListener('click', (e) => {
//   const xml = new XMLHttpRequest()
//   xml.onload = function () {
//     if (xml.status === 200) {
//       document.getElementById('reg_errors').innerHTML = this.responseText
//       console.log(this.responseText)
//     } else {
//       const error = 'error'
//       console.log(error, this.statusText)
//     }
//   }
//   xml.open('POST', 'login/register', true)
//   xml.send()
// })

function tabs(tab, cl) {
  let form = document.getElementsByClassName('form')
  for (let i = 0; i < form.length; i++) {
    form[i].style.display = 'none'
  }
  document.getElementById(tab).style.display = 'block'
  let tabs = document.getElementById(cl)
  tabs.classList.add('actives')
}

window.document.getElementById('load_test').addEventListener('click', () => {
  console.log('hey')
  user = {
    name: 'Miltos',
    surname: 'Hajdini',
    country: 'Greece',
    hungry: 'yes'
  }
  window.history.pushState(user, 'Tony', '/messages')
  location.replace("http://127.0.0.1:8080/messages")
})





// Register Animations


const reg_username = document.getElementById('reg_username')
const reg_email = window.document.getElementById('reg_email')
const reg_password = window.document.getElementById('reg_password')
const reg_password2 = window.document.getElementById('reg_password2')



reg_password2.addEventListener('keypress', () => {
  const pic = document.getElementById('password2_pic')
  const length = reg_password2.value.length
  console.log(length)
  if (length > 4) {
    reg_password2.style.boxShadow = '0px 1px 25px rgb(59, 224, 95)'
    pic.classList.add('fas')
    pic.classList.add('fa-check')
    pic.style.color = 'green'
  } else {
    reg_password2.style.boxShadow = ' 0px 1px 25px rgb(172, 19, 90)'
    pic.style.color = 'red'
  }
})

reg_password.addEventListener('keypress', () => {
  const pic = document.getElementById('password_pic')
  const length = reg_password.value.length
  console.log(length)
  if (length > 4) {
    reg_password.style.boxShadow = '0px 1px 25px rgb(59, 224, 95)'
    pic.classList.add('fas')
    pic.classList.add('fa-check')
    pic.style.color = 'green'
  } else {
    reg_password.style.boxShadow = ' 0px 1px 25px rgb(172, 19, 90)'
    pic.style.color = 'red'
  }
})

reg_username.addEventListener('keypress', () => {
  const pic = document.getElementById('username_pic')
  const length = reg_username.value.length
  console.log(length)
  if (length > 2) {
    reg_username.style.boxShadow = '0px 1px 25px rgb(59, 224, 95)'
    pic.classList.add('fas')
    pic.classList.add('fa-check')
    pic.style.color = 'green'
  } else {
    reg_username.style.boxShadow = ' 0px 1px 25px rgb(172, 19, 90)'
    pic.style.color = 'red'

  }
})


function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email)
}

reg_email.addEventListener('keypress', () => {
  const pic = document.getElementById('email_pic')
  const val = reg_email.value
  if (validateEmail(val)) {
    reg_email.style.boxShadow = '0px 1px 25px rgb(59, 224, 95)'
    pic.classList.add('fas')
    pic.classList.add('fa-check')
    pic.style.color = 'green'
  } else {
    reg_email.style.boxShadow = ' 0px 1px 25px rgb(172, 19, 90)'
    pic.style.color = 'red'
  }
})