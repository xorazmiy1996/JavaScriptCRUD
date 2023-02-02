const formCreate = document.getElementById('form-create')
const formEdit = document.getElementById('form-config')

const messageCreate = document.getElementById('message-create')
const messageEdit = document.getElementById('message-config')
const listGroupTodo = document.getElementById('list-group-todo')
const fullDay = document.getElementById('full-day')
const hoursEl = document.getElementById('hour')
const minuteEl = document.getElementById('minute')
const secondEl = document.getElementById('second')
const modalEl = document.getElementById('modal')
const overlayEl = document.getElementById('overlay')
const closeEl = document.getElementById('close')


let editItemId


let todo = JSON.parse(localStorage.getItem('list')) ? JSON.parse(localStorage.getItem('list')) : []

if (todo.length) showToDO()

function setToDO() {
    localStorage.setItem('list', JSON.stringify(todo))
}

function getTime() {

    //date
    const now = new Date()
    const date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate()
    const month = now.getMonth() < 10 ? '0' + (now.getMonth() + 1) : (now.getMonth() + 1)
    const year = now.getFullYear()

    //time

    const hours = now.getHours() < 10 ? '0' + now.getHours() : now.getHours()
    const minute = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()
    const second = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds()

    const months = [
        'January',
        'February',
        'February',
        'April ',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ]
    fullDay.textContent = `${date} ${months[now.getMonth()]} ${year}`
    hoursEl.textContent = hours
    minuteEl.textContent = minute
    secondEl.textContent = second

    return `${hours}:${minute}, ${date}.${month}.${year}`
}

setInterval(getTime, 1000)


function showToDO() {
    listGroupTodo.innerHTML = '';
    todo.forEach((value, index) => {

        listGroupTodo.innerHTML += `            
             <li ondblclick="complatedTodo(${index})" class="list-group-item d-flex justify-content-between ${value.completed ? 'complated' : ''} ">
                  ${index} ${value['text']}      
                  <div class="todo-icons">  
                    <span class="opacity-50 me-2">${value['time']}</span>
                    <img onclick="editTodo(${index})"   src="img/edit.svg" width="20" height="20" alt="">
                    <img onclick="deleteTodo(${index})" src="img/delete.svg" width="25" height="25" alt="">
                  </div>
             </li>            
            `
    })

}

formCreate.addEventListener('submit', (e) => {

    e.preventDefault()
    const inputCreate = e.target['input-create'].value.trim()
    formCreate.reset()
    if (inputCreate.length > 0) {
        todo.push({text: inputCreate, time: getTime(), completed: false})

        setToDO()
        showToDO()


    } else {
        messageCreate.textContent = `Iltimo to'g'ri malumot kiriting`
    }


    setTimeout(() => {
        messageCreate.textContent = ''
    }, 2000)


})


// delete Todo
function deleteTodo(index) {
    const deleteTodosList = todo.filter((value, i) => {
        return index !== i
    })

    todo = deleteTodosList
    setToDO()
    showToDO()

}


function complatedTodo(index) {
    const complatedList = todo.map((item, i) => {
        if (i == index) {
            return {...item, completed: item.completed == false ? true : false}
        } else {
            return {...item}
        }
    })
    todo = complatedList
    setToDO()
    showToDO()

}

closeEl.addEventListener('click', close)
overlayEl.addEventListener('click', close)

formEdit.addEventListener('submit', (e) => {
    e.preventDefault()
    const inputEdit = e.target['input-config'].value.trim()
    formEdit.reset()

    if (inputEdit.length > 0) {
        todo.splice(editItemId, 1,{
            text: inputEdit,
            time: getTime(),
            completed: false
        })
        setToDO()
        showToDO()
        close()


    } else {
        messageEdit.textContent = `Iltimo to'g'ri malumot kiriting`
    }


    setTimeout(() => {
        messageEdit.textContent = ''
    }, 2000)

})


function editTodo(index) {
    open()
    editItemId = index


}

function open() {
    modalEl.classList.remove('hidden')
    overlayEl.classList.remove('hidden')

}

function close() {
    modalEl.classList.add('hidden')
    overlayEl.classList.add('hidden')


}







