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
  xml.onreadystatechange = function () {
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
    <li><button onclick="like_post()" class="btn-delete like" style="padding: 0px;">23 like(s) </button>
    </li>
    <li>${text.date}</li>
    <li>
    <button onclick="delete_post()" id='delete_post' class='btn-delete' data-id='${text._id}'">${text._id}</button>
  </li>
  </ul>
</div>
`
}


document.getElementById('refreshbtn').addEventListener('click', () => {
  document.getElementById('textarea').value = ''
})



// function delete_post() {
//     id  = document.getElementById('delete_post').value
//     let xml = new XMLHttpRequest()
//     xml.onload = function () {
//           if (xml.readyState === 4 && xml.status === 200) {
//           document.getElementById('user-card').remove()
//       } else {
//           const error = 'error'
//           console.log(error, this.statusText)
//       }
//   }
//       xml.open('GET', `/delete/post/${id}`, true)
//       xml.send()
//       window.location.reload()
// }

function delete_post() {
  let k = document.getElementsByClassName('btn-delete').id
  console.log(k)
}