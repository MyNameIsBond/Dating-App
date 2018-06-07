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

function menuicon(x) {
  x.classList.toggle("change")
}

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
  return `<div class="user-container" id="${text._id}">
    <div class="usercard2" >
      <img style="" src="../public/img/lopez.jpg">
      <h2><a href="">Nicky Smith</a></h2>
      <ul class="hover_icons">
        <li><a href='/messages'><i class="fas fa-envelope"></i></a></li>
      </ul>  
    </div>
    <div class='post-user'>
      <div class='post-text'>
        <span class="close" title="delete post" onclick="delete_post('${text._id}')">&times;</span>
        <div class='post-text2'>
        <p>${text.post}</p>
        <br>
        </div>
      </div>
        <hr>
      <div class='post-list'>
        <ul>
          <li><a href=""><i style="color: red;" class="far fa-heart"></i></a> (34)</li>
          <li><a href=""><i class="far fa-comment"></i></a> (3)</li>
          <li><small class='date'><i class="far fa-calendar"></i> ${text.date}</small></li>
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