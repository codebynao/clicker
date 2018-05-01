const socket = io(); 
var upgrade;

/* Afficher score (data) sur la page */
socket.on('Click', (data) => {
    $('.counter').text(data);

    /*Débloquer les améliorations si le score est suffisant*/
    socket.on('Prices', (prices) => {
        if(data >= prices[0]){
            $('#upgrade0').prop('disabled', false);
        }
        if(data >= prices[1]){
            $('#upgrade1').prop('disabled', false);
        }
        if(data >= prices[2]){
            $('#upgrade2').prop('disabled', false);
        }
        if(data >= prices[3]){
            $('#upgrade3').prop('disabled', false);
        }
    });
    
}); 

/*Récupérer le clic sur la div */
$('.clicker').click(() => {
    socket.emit('Click');
});

/*Récupérer les clics sur les boutons d'améliorations*/
$('#upgrade0').click(() => {
    upgrade = 0;
    socket.emit('Upgrade', upgrade);
});

$('#upgrade1').click(() => {
    upgrade = 1;
    socket.emit('Upgrade', upgrade);
});

$('#upgrade2').click(() => {
    upgrade = 2;
    socket.emit('Upgrade', upgrade);
});

$('#upgrade3').click(() => {
    upgrade = 3;
    socket.emit('Upgrade', upgrade);
});

/*Récupérer le score après améliorations, changer le score et désactiver les améliorations si nécessaire*/
socket.on('Upgrade', (data) => {
    $('.counter').text(data);
    socket.on('Prices', (prices) => {
        if(data < prices[0]){
            $('#upgrade0').prop('disabled', true);
        }
        if(data < prices[1]){
            $('#upgrade1').prop('disabled', true);
        }
        if(data < prices[2]){
            $('#upgrade2').prop('disabled', true);
        }
        if(data < prices[3]){
            $('#upgrade3').prop('disabled', true);
        }
    });
});

/*Changer le prix des améliorations*/
socket.on('Prices', (data) => {
    $('#price0').text(data[0]);
    $('#price1').text(data[1]);
    $('#price2').text(data[2]);
    $('#price3').text(data[3]);
});

/*Changer la quantité d'améliorations*/
socket.on('Quantity', (data) => {
    $('#quantity0').text(data[0]);
    $('#quantity1').text(data[1]);
    $('#quantity2').text(data[2]);
    $('#quantity3').text(data[3]);
});
