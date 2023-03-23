export interface Personaje {
    id: number;
    name: string;
    status: any;
    species: string;
    type: string;
    gender: string
    origin: {
        name: string;
        url: string;
    };
    location: {
        name: string;
        url: string;
    };
    image: string;
}