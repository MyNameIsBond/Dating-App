function profile() {
  const xml = new XMLHttpRequest()
  xml.onload = function () {
    if (xml.readyState === 4 && xml.status === 200) {
      document.getElementById('profile').innerHTML = this.responseText
    } else {
      const error = 'error'
      console.log(error, this.statusText)
    }
  }
  xml.open('GET', '/profile/test', true)
  xml.send()
}
profile()

document.getElementById('add_pic').addEventListener('click', () => {
  document.getElementById('add_pic_list').classList.toggle('add_pic_list')


})

document.getElementById('add_pic_list').addEventListener('onmouseover', () => {
  console.log('hey')
})


function userInfoMenu() {

  const action = document.getElementById('user-menu')
  const openButton = document.getElementById('ellipsis-menu')
  document.onclick = function (e) {
    if (e.target === openButton) {
      action.style.display = 'block'
    } else {
      action.style.display = 'none'
    }
  }
}