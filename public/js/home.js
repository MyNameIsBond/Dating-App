function nav_bar() {
  const xml = new XMLHttpRequest()
  xml.onload = function () {
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

function sendpost() {
  post = document.getElementById('textarea').value
  const xml = new XMLHttpRequest()
  xml.onload = function () {
    if (xml.readyState === 4 && xml.status === 200) {
      document.getElementById('post').innerHTML = makepost(this.responseText)
    } else {
      const error = 'error'
      console.log(error, this.statusText)
    }
  }

  xml.open('GET', `/post/${post}`, true)
  xml.send()
}

function makepost(text1) {
  let text = JSON.parse(text1)
  console.log(text)
  return `
  <div class="user-card">
  <div class="user-card-items">
    <img src="../public/img/download2.jpeg" width="40px" height="40px">
    <br>
    <small>Mr. Smith</small>
  </div>

  <div class="user-card-items">
    <p>${text.post}</p>
  </div>
  <hr>
  <ul class="home-card-list">
    <li>30
      <a href="" class="like-link"> like(s) </a>
    </li>
    <li>${text.date}</li>
    <li>
    <button onclick="delete_post()" class="btn-delete" style="padding: 0px;">Delete</button>
  </li>
  </ul>
</div>
`
}


document.getElementById('refreshbtn').addEventListener('click', () => {
  document.getElementById('textarea').value = ''
})

function delete_post() {
  post = document.getElementById('textarea').value
  const xml = new XMLHttpRequest()
  xml.onload = function () {
    if (xml.readyState === 4 && xml.status === 200) {
      document.getElementById('post').innerHTML = makepost(this.responseText)
    } else {
      const error = 'error'
      console.log(error, this.statusText)
    }
  }

  xml.open('GET', `/delete/post/${post}`, true)
  xml.send()
}