const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.getElementById('toy-collection')
let addToy = false
const toyURL = 'http://localhost:3000/toys'
const newToyForm = document.querySelector('.add-toy-form')
// YOUR CODE HERE
document.addEventListener("DOMContentLoaded", function (){

  fetchToys()
  newToyForm.addEventListener('submit', handleSubmit)
  let button = document.querySelector('button')

})

function handleSubmit(e){
  e.preventDefault()
  postToy()
  alert("New Toy Successfully Added!")
  newToyForm.reset()
}



function postToy(){
  let name = document.getElementById('name').value
  let newURL = document.getElementById('toy_url').value
  fetch(toyURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: name,
      image: newURL,
      likes: 0
    })
  })
  .then(response => response.json())
  .then(newToy => {
    handleToyData(newToy)
  })
}


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

// OR HERE!
function fetchToys(){
  fetch(toyURL)
  .then(response => response.json())
  .then(object => object.forEach(element => handleToyData(element)))
}

function handleToyData(element){
  const toy_div = document.createElement('div')
  const toy_header = document.createElement('h2')
  const toy_img = document.createElement('img')
  const paragraph = document.createElement('p')
  const button = document.createElement('button')
  toy_div.id = element.id
  button.className = 'like-btn'
  button.name = element.likes
  button.id = `btn-${element.id}`
  button.innerHTML = "Like <3"
  toy_header.innerHTML = element.name
  toy_img.src = element['image']
  toy_div.className = 'card'
  toy_img.className = 'toy-avatar'
  paragraph.innerHTML = `${element.likes} likes`
  // paragraph.id = element.id
  toy_div.append(toy_header, toy_img, paragraph, button)
  toyCollection.append(toy_div)
  button.addEventListener('click', buttonClick)
}

function buttonClick(e){
  let toy = e.currentTarget
  let toy_id = toy.id.split('-')[1]
  // let toyLikes = parseInt(toy.name)
  // toyLikes +=1
  // toy.name = toyLikes
  let toyLikes = parseInt(toy.name)
  ++toyLikes
  fetch(`http://localhost:3000/toys/${toy_id}`,{
    method: 'PATCH',
    headers:
    {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: toyLikes
    })
  })
  .then(res => res.json())
  .then(object => {
    toy.name = toyLikes
    updateLikes(object)})
}

function updateLikes(object){
  let divId = document.getElementById(`${object.id}`)
  divId.childNodes[2].innerHTML = `${object.likes} likes`
}
