module.exports = (io) => {
    var counter = 0;
    var persecond = 0;
    var upgrade1 = 0;
    var upgrade2 = 0;
    var prices = [15, 100];

    io.on('connection', (socket) => {
        setInterval(() => {
            counter += 1*upgrade1 + 10*upgrade2;
            socket.emit('Click', counter);
            socket.emit('Prices', prices);
        }, 1000);
        
        socket.on('Click', () => {
            counter += 1;
            socket.emit('Click', counter);
        });
        socket.on('Upgrade', (upgrade) => {
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
            socket.emit('Upgrade', counter);  
            socket.emit('PerSecond', () => {
                persecond = 1*upgrade1 + 10*upgrade2;
            });
            socket.emit('Prices', prices);
        });
    });
};