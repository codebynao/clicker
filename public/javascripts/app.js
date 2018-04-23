const socket = io(); 
var upgrade;

socket.on('Click', (data) => {
    $('.counter').text(data);
    if(data >= 10){
        $('#upgrade1').prop('disabled', false);
    }
    if(data >= 30){
        $('#upgrade2').prop('disabled', false);
    }
}); 
$('.clicker').click(() => {
    socket.emit('Click');
});

$('#upgrade1').click(() => {
    upgrade = 1;
    socket.emit('Upgrade', upgrade);
});

$('#upgrade2').click(() => {
    upgrade = 2;
    socket.emit('Upgrade', upgrade);
});

socket.on('Upgrade', (data) => {
    $('.counter').text(data);
    if (data < 10) {
        $('#upgrade1').prop('disabled', true);
    }
    if(data < 30){
        $('#upgrade2').prop('disabled', true);
    }
});

