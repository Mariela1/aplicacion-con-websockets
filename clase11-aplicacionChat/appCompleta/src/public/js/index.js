const socket = io();
let user;
let chatBox = document.getElementById("chatbox");
Swal.fire({
    title: "Identificate",
    input: "text",
    inputValidator: (value) => {
        return !value && "!Necesitas escribir un usuario para comenzar a chatear!"
    },
    allowOutsideClick: false
}).then(result => {
    user = result.value;
    socket.emit('authenticated', user)
})
chatBox.addEventListener('keyup', evt => {
    if (evt.key === "Enter") {
        if (chatBox.value.trim().length > 0) {
            socket.emit('message', {user:user, message: chatBox.value})
            chatBox.value = "";
        }
    }
})

socket.on('messageLogs', data => {
    if (!user) return;
    console.log({data});
    let log = document.getElementById('messageLogs');
    let messages = "";
    data.forEach(message => {
        messages += `${message.user} dice: ${message.message}<br/>`
    })
    console.log({messages});
    log.innerHTML = messages;
})