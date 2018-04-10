window.onload = profile()

function profile() {
  const xml = new XMLHttpRequest()
  xml.onload = function() {
    if (xml.readyState === 4 && xml.status === 200) {
      document.getElementById('profile').innerHTML = this.responseText
      console.log(this.responseText)
    } else {
      const error = 'error'
      console.log(error, this.statusText)
    }
  }

  xml.open('GET', '/some', true)
  xml.send()
}
