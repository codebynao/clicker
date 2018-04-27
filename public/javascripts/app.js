const socket = io(); 
var upgrade;

/* Afficher score (data) sur la page */
socket.on('Click', (data) => {
    $('.counter').text(data);

    /*Débloquer les améliorations si le score est suffisant*/
    socket.on('Prices', (prices) => {
        if(data >= prices[0]){
            $('#upgrade1').prop('disabled', false);
        }
        if(data >= prices[1]){
            $('#upgrade2').prop('disabled', false);
        }
    });
    
}); 

/*Récupérer le clic sur la div */
$('.clicker').click(() => {
    socket.emit('Click');
});

/*Récupérer les clics sur les boutons d'améliorations*/
$('#upgrade1').click(() => {
    upgrade = 1;
    socket.emit('Upgrade', upgrade);
});

$('#upgrade2').click(() => {
    upgrade = 2;
    socket.emit('Upgrade', upgrade);
});

/*Récupérer le score après améliorations, changer le score et désactiver les améliorations si nécessaire*/
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

/*Afficher le nombre de clics automatiques par seconde*/
socket.on('PerSecond', (data) => {
    $('.persecond').text(data);
});

/*Changer le prix des améliorations*/
socket.on('Prices', (data) => {
    $('#price1').text(data[0]);
    $('#price2').text(data[1]);
});

