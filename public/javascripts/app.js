const socket = io(); 

socket.on('UserState', (data) => {
    $('.connected-number').text(data);
});
socket.on('Click', (data) => {
    $('.counter').text(data);
}); 
$('.clicker').click(() => {
    socket.emit('Click');
});
