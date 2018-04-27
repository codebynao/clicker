module.exports = (io) => {
    var counter = 0;
    var persecond = 0;
    var upgrade1 = 0;
    var upgrade2 = 0;
    var prices = [15, 100];

    io.on('connection', (socket) => {
        /*Actualiser toutes les secondes le score et les prix après les améliorations et envoyer les données */
        setInterval(() => {
            counter += 1*upgrade1 + 10*upgrade2;
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
            switch(upgrade){
                case 1:
                    counter -= prices[0];
                    upgrade1 += 1;
                    prices[0] += prices[0]*upgrade1;
                    break;
                case 2:
                    counter -= prices[1];
                    upgrade2 += 1;
                    prices[1] += prices[1]*upgrade2;
                    break;
            }

            /*Envoyer le nouveau score, les nouveaux prix et le nombre de clics par seconde après améliorations */
            socket.emit('Upgrade', counter);  
            socket.emit('PerSecond', () => {
                persecond = 1*upgrade1 + 10*upgrade2;
            });
            socket.emit('Prices', prices);
        });
    });
};