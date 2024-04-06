const express = require("express")
const app = express()
const path = require('path');

app.listen(3000, () => {
console.log('El servidor está inicializado en el puerto 3000')
})

// Json
const nombres = ['Juan','Jocelyn','Astrid','Maria','Ignacia','Javier','Brian'];
app.get("/abracadabra/usuarios",(req, res)=> {
    res.json({usuarios: nombres});
});

// Middleware
// Busca usuarios, si no está aparece imagen de who?
const validarUsuario = (req, res, next) => {
    const usuario = req.params.usuario;
    if (nombres.includes(usuario)) {
        next();
    } else {
        res.sendFile(path.join(__dirname + '/who.jpeg'));
    }
};

// Valida usuarios y da la bienvenida
app.use('/abracadabra/juego/:usuario', validarUsuario);
app.get('/abracadabra/juego/:usuario', (req, res) => {
    res.send('Bienvenido al juego 🥳');
});

// Ruta conejo + numero aleatorio
const validarNumero = (req, res, next) => {
    const numero = parseInt(req.params.n);
    const numeroAl = Math.floor(Math.random() * 4) + 1;
    if (numero === numeroAl) {
        next();
    } else {
        res.sendFile(path.join(__dirname + '/voldemort.jpg'));
    }
};

app.get('/abracadabra/conejo/:n', validarNumero, (req, res) => {
    res.sendFile(path.join(__dirname + '/conejito.jpg'));
});

// Error
app.use((req, res) => {
    res.status(404).send("Esta página no existe...😖");
});