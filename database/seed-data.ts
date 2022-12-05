
//interface para tipar el seedData
interface SeedData {
    entries: SeedEntry[]
}

//interface para tipar las entries de la interface SeedData de arriba
interface SeedEntry {
    description: string;
    status: string;
    createdAt: number;
}


//en desarroyo automaticamente podemos llenar con un solo comando la base de datos
export const seedData: SeedData = {
    entries: [
        {
            description: 'Pendiente: Enim ea sunt ea pariatur elit adipisicing nostrud non. Excepteur veniam fugiat magna exercitation ullamco adipisicing labore.',
            status: 'pending',
            createdAt: Date.now(),
        },
        {
            description: 'En Progreso: Consectetur proident duis do exercitation culpa aute dolore adipisicing exercitation nulla sit.',
            status: 'in-progress',
            createdAt: Date.now() - 1000000,
        },
        {
            description: 'Terminadas: Culpa ea cillum deserunt Lorem sit reprehenderit ullamco aliquip Lorem dolor amet sit quis.',
            status: 'finished',
            createdAt: Date.now() - 100000,
        },
    ]
}