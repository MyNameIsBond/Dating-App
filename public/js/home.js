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
  let xml = new XMLHttpRequest()
  xml.onload = function () {
    if (xml.readyState === 4 && xml.status === 200) {
      document.getElementById('post').innerHTML = makepost(this.responseText)
    } else {
      const error = 'error'
      console.log(error, this.statusText)
    }
  }

  xml.open('POST', `/post/${post}`, true)
  xml.send()
}

function makepost(text1) {
  let text = JSON.parse(text1)
  return `
    <div class="user-container" id='${text._id}'>
    <div class="usercard2">
      <img src="../public/img/lopez.jpg">
      <h1><a href="">Nicky Smith</a></h1>
      <ul>
        <li><a href="/poke">poke</a></li>
        <li><a href="/message">message</a></li>
        <li><a href="/username">username</a></li>
      </ul>  
    </div>
    <div class='post-user'>
      <div class='post-text'>
        <span class="close" title="delete post" onclick="delete_post('${text._id}')">&times;</span>
        <div class='post-text2'>
        <p>${text.post}</p>
        <br>
        <small>${text.date}</small>

        </div>
        
      </div>
        <hr>
      <div class='post-list'>
        <ul>
          <li><a href="">Like</a>(34)</li>
          <li><a href="">Comment</a>(3)</li>
        </ul>
      </div>

    </div>
    </div>
    `
}


document.getElementById('refreshbtn').addEventListener('click', () => {
  document.getElementById('textarea').value = ''
})

function delete_post(id) {
    let xml = new XMLHttpRequest()
    xml.onload = function () {
          if (xml.readyState === 4 && xml.status === 200) {
          document.getElementById(id).remove()
      } else {
          const error = 'error'
          console.log(error, this.statusText)
      }
  }
      xml.open('GET', `/delete/post/${id}`, true)
      xml.send()
}

