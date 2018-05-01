module.exports = (io) => {
    var counter = 0;
    var upgrades = [0, 0, 0, 0];
    var pricesInit = [15, 200, 1200, 5400];
    var prices = [15, 200, 1200, 5400];
    var persecond = 0;

    io.on('connection', (socket) => {
        socket.emit('Quantity', upgrades);
        socket.emit('PerSecond', persecond);

        /*Actualiser toutes les secondes le score et les prix après les améliorations et envoyer les données */
        setInterval(() => {
            counter += 1*upgrades[0] + 10*upgrades[1] + 50*upgrades[2] + 100*upgrades[3];
            socket.emit('Click', counter);
            socket.emit('Prices', prices);
        }, 1000);
        
        /*Augmenter le score à chaque clic et envoyer les données */
        socket.on('Click', () => {
            counter += 1;
            socket.emit('Click', counter);
        });

        

        /*Ecoute des améliorations*/
        socket.on('Upgrade', (upgrade) => {
            /*Déduire le prix des améliorations du score en cas d'achat et augmenter le prix des améliorations*/
            for(var i = 0; i < upgrades.length; i++){
                if(i == upgrade) {
                    counter -= prices[i];
                    upgrades[i] += 1;
                    prices[i] += pricesInit[i]*upgrades[i];
                }
            }
            persecond = 1*upgrades[0] + 10*upgrades[1] + 50*upgrades[2] + 100*upgrades[3];
            /*Envoyer le nouveau score, les nouveaux prix et le nombre de clics par seconde après améliorations */
            socket.emit('Upgrade', counter);  
            socket.emit('Prices', prices);
            socket.emit('Quantity', upgrades);
            socket.emit('PerSecond', persecond);
        });
    });
};