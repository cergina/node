// client side js

const socket = io('http://localhost:3000')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const messageContainer = document.getElementById('message-container')

const name = prompt('What is your name?')
appendMessage(`You joined as ${name}`)
socket.emit('new-user', name)


// on event that was emitted this function call happens
socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`)
})

// on event that was emitted this function call happens
socket.on('user-connected', name => {
    appendMessage(`User with name ${name} has just joined.`)
})

// on event that was emitted this function call happens
socket.on('user-disconnected', name => {
    appendMessage(`User ${name} is disconnected.`)
})

//  when we submit form, it is going to stop it from refreshing and posting to server
messageForm.addEventListener('submit', e => {
    e.preventDefault()

    const message = messageInput.value
    appendMessage(`You: ${message}`)

    socket.emit('send-chat-message', message)
    messageInput.value = ''
})

function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message,
    messageContainer.append(messageElement)
}