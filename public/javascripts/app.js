const socket = io(); 
var upgrade;

socket.on('Click', (data) => {
    $('.counter').text(data);
    socket.on('Prices', (prices) => {
        if(data >= prices[0]){
            $('#upgrade1').prop('disabled', false);
        }
        if(data >= prices[1]){
            $('#upgrade2').prop('disabled', false);
        }
    });
    
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
    socket.on('Prices', (prices) => {
        if(data < prices[0]){
            $('#upgrade1').prop('disabled', true);
        }
        if(data < prices[1]){
            $('#upgrade2').prop('disabled', true);
        }
    });
});

socket.on('PerSecond', (data) => {
    $('.persecond').text(data);
});

socket.on('Prices', (data) => {
    $('#price1').text(data[0]);
    $('#price2').text(data[1]);
});

