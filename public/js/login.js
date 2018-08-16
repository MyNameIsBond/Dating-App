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


function tabs(link) {
  location.replace(`/${link}`)
}