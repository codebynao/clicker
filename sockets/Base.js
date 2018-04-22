module.exports = (io) => {
    var counter = 0;
    io.on('connection', (socket) => {
        console.log(counter);
        console.log('+1');
            // On envoie le nombre de personnes actuellement sur le socket à tout le monde (sauf la personne qui vient de se connecter)
            socket.broadcast.emit('UserState', io.engine.clientsCount);
            // On envoie le nombre de personnes actuellement sur le socket à la personne qui vient de se connecter
            socket.emit('UserState', io.engine.clientsCount);

             socket.on('disconnect', () => {
                 console.log('-1');
              // On prévient tout le monde qu'une personne s'est deconnectée
                socket.broadcast.emit('UserState', io.engine.clientsCount);
            });
            socket.emit('Click', counter);
            socket.on('Click', () => {
                counter += 1;
                socket.emit('Click', counter);
            })
    });
};