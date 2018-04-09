console.log('hey');
window.onload = nav_bar()

function nav_bar() {
  console.log('in');
  const xml = new XMLHttpRequest()
  xml.onload = function() {
    if (xml.readyState === 4 && xml.status === 200) {
      document.getElementById('nav').innerHTML = this.responseText
      console.log(this.responseText);
    } else {
      const error = 'error'
      console.log(error, this.statusText)
    }
  }

  xml.open('GET', '/nav_bar', true)
  xml.send()
}
