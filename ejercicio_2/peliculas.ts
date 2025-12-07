// ENUMS: La base de la solución.
// El problema pedía enumerar géneros y países.
// Lo hice así para evitar los "Magic Strings". Si escribís "Ación" (sin c)
// en un string normal, nadie te avisa. Con un Enum, TypeScript te grita el error antes de compilar.

enum GeneroPelicula {
    ACCION = "Acción",
    COMEDIA = "Comedia",
    DRAMA = "Drama",
    ROMANCE = "Romance",
    TERROR = "Terror",
    CIENCIA_FICCION = "Ciencia Ficción"
}

enum PaisPelicula {
    USA = "Estados Unidos",
    ESPANA = "España",
    MEXICO = "México",
    JAPON = "Japón",
    VENEZUELA = "Venezuela",
    UK = "Reino Unido"
}


// 2. INTERFACE: El molde.
// Acá defino qué propiedades TIENE que tener una película.
// Fíjense que en 'genero' y 'pais' no pongo 'string', pongo los Enums que creé arriba.
// Esto es para que TypeScript me avise si pongo un género o país que no existe.
interface Pelicula {
    titulo: string;
    director: string;
    genero: GeneroPelicula; // Esto conecta con la estructura.
    pais: PaisPelicula;// Esto conecta con la estructura.
}

// DATOS: La implementación.
// Al ponerle el tipo ': Pelicula[]', activo el autocompletado.
// Ya no tengo que adivinar si era 'genre' o 'genero', el editor me lo dice.
const cartelera: Pelicula[] = [
    {
        titulo: "Avengers: Endgame",
        director: "Hermanos Russo",
        genero: GeneroPelicula.ACCION, // Mucho más profesional que escribir "Acción" a mano.
        pais: PaisPelicula.USA
    },
    {
        titulo: "El Laberinto del Fauno",
        director: "Guillermo del Toro",
        genero: GeneroPelicula.CIENCIA_FICCION,
        pais: PaisPelicula.ESPANA
    },
    {
        titulo: "La chica del alquiler",
        director: "Carlos Caridad Montero",
        genero: GeneroPelicula.ROMANCE,
        pais: PaisPelicula.VENEZUELA // Orgullo nacional, siempre presente.
    },
    {
        titulo: "Jugada salvaje",
        director: "Simon West",
        genero: GeneroPelicula.ACCION,
        pais: PaisPelicula.USA
    },
    {
        titulo: "Puños mortales",
        director: "Ben Ramsey",
        genero: GeneroPelicula.ACCION,
        pais: PaisPelicula.USA
    }
];


// FUNCIÓN: El resultado final.
// Recibo el array tipado (Pelicula[]) para saber qué puedo mostrar.
function verCartelera(peliculas: Pelicula[]) {
    console.log(" ***** REPORTE DE PELÍCULAS *****");
    peliculas.forEach(p => {
        // Uso Template Strings (``) para que quede limpio y legible.
        console.log(`Título -> ${p.titulo} | Género -> ${p.genero} | Origen -> ${p.pais}`);
    });
}

verCartelera(cartelera);