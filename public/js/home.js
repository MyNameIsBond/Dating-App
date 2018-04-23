function nav_bar() {
  const xml = new XMLHttpRequest()
  xml.onload = function() {
    if (xml.readyState === 4 && xml.status === 200) {
      document.getElementById('nav').innerHTML = this.responseText
    } else {
      const error = 'error'
      console.log(error, this.statusText)
    }
  }

  xml.open('GET', '/nav_bar', true)
  xml.send()
}
nav_bar()


document.getElementById('refreshbtn').addEventListener('click', () => {
  document.getElementById('textarea').value = ''
})

function sendpost() {
  post = document.getElementById('textarea').value
  console.log(post);
  const xml = new XMLHttpRequest()
  xml.onload = function() {
    if (xml.readyState === 4 && xml.status === 200) {
      document.getElementById('nav').innerHTML = this.responseText
      console.log(this.responseText)
    } else {
      const error = 'error'
      console.log(error, this.statusText)
    }
  }

  xml.open('GET', `/post/${post}`, true)
  xml.send()
}
