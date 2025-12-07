import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

// Arrancamos la nave. Al principio no entendía nada de frameworks, 
// pero Express te salva las papas para no escribir todo en crudo.
const app = express();
const PORT = 3000;

// MIDDLEWARE: Esto es crucial. 
// Este nos sirve para servir archivos estáticos que tengamos en la carpeta 'views'.
// Así podemos tener CSS, JS o imágenes si las necesitamos.
app.use(express.static(path.join(__dirname, '../views')));


// La verdad es que estuve un buen rato sin entender por qué mis datos no llegaban.
// Este comando le dice a Express: "Amigo, prestale atención a los datos que vienen del formulario HTML".
// Sin el 'urlencoded', el servidor es ciego a lo que el usuario escribe.
app.use(express.urlencoded({ extended: true }));

/**
 * RUTA GET ('/'):
 * Acá servimos el formulario.
 * Uso path.join para no tener un desorden con las rutas. 
 * las rutas se rompen si las escribís a mano. Esto te lo soluciona.
 */
app.get('/', (req: Request, res: Response) => {
    // Buscamos el html en la carpeta views y se lo mandamos al front.
    // Nada de cosas raras, simple y al pie.
    const rutaFormulario = path.join(__dirname, '../views/index.html');
    res.sendFile(rutaFormulario);
});

/**
 * RUTA POST ('/animal'):
 * Acá es donde llega la papa, recibimos el dato y hacemos la magia.
 */
app.post('/animal', (req: Request, res: Response) => {
    // Ojo acá: 'nombreAnimal' tiene que ser igual al name del input del HTML.
    // Si le pifias a una letra, no te llega nada.
    const animal = req.body.nombreAnimal;
    
    // Lo printeo en consola para ver qué está llegando.
    // Clave para debuggear y no ir a ciegas confiando en que todo anda.
    console.log(`request recibida: ${animal}`);

    // Leemos el html de respuesta a lo macho, con el file system (fs).
    const rutaRespuesta = path.join(__dirname, '../views/respuesta.html');

    fs.readFile(rutaRespuesta, 'utf8', (err, data) => {
        // Si falla la lectura, avisamos. Siempre hay que manejar el error,
        // no seas de esos que dejan que el server explote en silencio.
        if (err) {
            console.error('Error al leer la plantilla:', err);
            return res.status(500).send('Se rompió todo al procesar la vista.');
        }

        // Acá reemplazamos el placeholder {{animal}} por el dato real.
        // Es rústico, sí, pero quería entender cómo
        // funciona un motor de plantillas por detrás sin usar librerías extras todavía.
        let htmlModificado = data
            .replace('{{animal}}', animal);
        
        // Le mandamos la respuesta final al usuario, misión cumplida.
        res.send(htmlModificado);
    });
});

// Levantamos el server
app.listen(PORT, () => {
    console.log(`El server está joya escuchando en http://localhost:${PORT}`);
});