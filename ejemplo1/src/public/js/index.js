const socket = io();

let user;
let chatBox = document.getElementById('chatbox');

Swal.fire({
    title: "Identificate",
    input: "text",
    inputValidator: (value) => {
        return !value && "!Necesitas escribir un nombre de usuario para comenzar a escribir!"
    },
    allowOutsideClick: false
}).then(result => {
    user = result.value;
    socket.emit('authenticated', user)
})

chatbox.addEventListener('keyup', evt => {
    if (evt.key === "Enter") {
        socket.emit('message', {user: user, message: chatbox.value })
    }
})