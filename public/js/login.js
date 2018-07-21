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


reg_button.addEventListener('click', (e) => {
  const xml = new XMLHttpRequest()
  e.preventDefault()
  xml.onload = function () {
    if (xml.readyState === 4 && xml.status === 200) {
      document.getElementById('reg_errors').innerHTML = this.responseText
      console.log(this.responseText)
    } else {
      const error = 'error'
      console.log(error, this.statusText)
    }
  }
  xml.open('POST', 'login/register', true)
  xml.send()
})

function tabs(tab, cl) {
  let form = document.getElementsByClassName('form')
  for (let i = 0; i < form.length; i++) {
    form[i].style.display = 'none'
  }
  document.getElementById(tab).style.display = 'block'
  let tabs = document.getElementById(cl)
  tabs.classList.add('actives')
}