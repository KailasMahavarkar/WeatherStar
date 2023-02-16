export type weatherConditionCodes = "Thunderstorm" |
    "Drizzle" |
    "Rain" |
    "Snow" |

    "Mist" |
    "Smoke" |
    "Haze" |
    "Dust" |
    "Fog" |
    "Sand" |
    "Ash" |
    "Squall" |
    "Tornado" |

    "Clear" |
    "Clouds"


export interface IWeatherData {
    coord: {
        lon: number;
        lat: number;
    };
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }[];
    base: string;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    };
    visibility: number;
    wind: {
        speed: number;
        deg: number;
    };
    clouds: {
        all: number;
    };
    dt: number;
    sys: {
        type: number;
        id: number;
        country: string;
        sunrise: number;
        sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

export interface userContextType {
    // handle city logic
    city: string;

    search: string;

    countryName: string;

    // handle temperature
    temperatureMode: "celcius" | "fahrenheit";

    // handle weather
    weather: IWeatherData;

    // handle loading
    loading: boolean;

    // handle search
    showSearch: boolean;

    // handle errors
    errors: {
        search: boolean
    },

    // favourites
    favourites: {
        temperature: number;
        city: string;
    }[];

}