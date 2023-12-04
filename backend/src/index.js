import initApp from './server.js';

const main = async () => {
    await initApp.listen(8080);
    console.log("Servidor ejecutandose en el puerto 8080");
}

main();