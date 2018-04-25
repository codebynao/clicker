module.exports = (io) => {
    var counter = 0;
    var upgrade1 = 0;
    var upgrade2 = 0;

    io.on('connection', (socket) => {
        setInterval(() => {
            counter += 1*upgrade1 + 10*upgrade2;
            socket.emit('Click', counter);
        }, 1000);
        
        socket.on('Click', () => {
            counter += 1;
            socket.emit('Click', counter);
        });
        socket.on('Upgrade', (upgrade) => {
            switch(upgrade){
                case 1:
                    counter -= 15;
                    upgrade1 += 1;
                    break;
                case 2:
                    counter -= 100;
                    upgrade2 += 1;
                    break;
            }
            socket.emit('Upgrade', counter);
            
        });
    });
};