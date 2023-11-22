const socket = io.connect('http://localhost:3000');

const sender = document.getElementById('sender');
const message = document.getElementById('message');
const submitBtn = document.getElementById('submitBtn');
const output = document.getElementById('chat-output');
const feedback = document.getElementById('chat-feedback');

submitBtn.addEventListener('click', () => {
    socket.emit('chat', {
        sender: sender.value,
        message: message.value
    });
    message.value = ''; // Gönderildikten sonra inputu temizle
});

message.addEventListener('keypress', () => {
    socket.emit('typing', sender.value);
});

socket.on('chat', data => {
    output.innerHTML += `<p><strong>${data.sender}: </strong>${data.message}</p>`;
});

socket.on('typing', data => {
    feedback.innerHTML = '<p><em> yazıyor...</em></p>';
});
