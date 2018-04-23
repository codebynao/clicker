module.exports = (io) => {
    var counter = 0;
    var upgrade1 = 0;
    var upgrade2 = 0;

    io.on('connection', (socket) => {
        socket.emit('Click', counter);
        socket.on('Click', () => {
            counter += 1;
            socket.emit('Click', counter);
        });
        socket.on('Upgrade', (upgrade) => {
            switch(upgrade){
                case 1:
                    counter -= 10;
                    upgrade1 += 1;
                    break;
                case 2:
                    counter -= 30;
                    upgrade2 += 1;
                    break;
            }
            socket.emit('Upgrade', counter);
        });
    });
};