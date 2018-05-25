declare module TvMaze {

    export interface Image {
        medium: string;
        original: string;
    }

    export interface Schedule {
        time: string;
        days: string[];
    }

    export interface Rating {
        average?: number;
    }

    export interface Country {
        name: string;
        code: string;
        timezone: string;
    }

    export interface Network {
        id: number;
        name: string;
        country: Country;
    }

    export interface WebChannel {
        id: number;
        name: string;
        country: Country;
    }

    export interface Externals {
        tvrage: number;
        thetvdb: number;
        imdb: string;
    }

    export interface Self {
        href: string;
    }

    export interface PreviousEpisodeURL {
        href: string;
    }

    export interface NextEpisodeURL {
        href: string;
    }

    export interface Links {
        self: Self;
        previousepisode: PreviousEpisodeURL;
        nextepisode: NextEpisodeURL;
    }

    export interface Show {
        id: number;
        url: string;
        name: string;
        type: string;
        language: string;
        genres: string[];
        status: string;
        runtime: number;
        premiered: string;
        officialSite: string;
        schedule: Schedule;
        rating: Rating;
        weight: number;
        network: Network;
        webChannel: WebChannel;
        externals: Externals;
        image: Image;
        summary: string;
        updated: number;
        _links: Links;
    }

    export interface Self2 {
        href: string;
    }

    export interface Links2 {
        self: Self2;
    }

    export interface Schedule {
        id: number;
        url: string;
        name: string;
        season: number;
        number?: number;
        airdate: string;
        airtime: string;
        airstamp: Date;
        runtime: number;
        image: Image;
        summary: string;
        show: Show;
        _links: Links2;
    }

        export interface DetailsSchedule {
            time: string;
            days: string[];
        }
    
        export interface Rating {
            average?: number;
        }
    
        export interface Country {
            name: string;
            code: string;
            timezone: string;
        }
    
        export interface Network {
            id: number;
            name: string;
            country: Country;
        }
    
        export interface Externals {
            tvrage: number;
            thetvdb: number;
            imdb: string;
        }
    
        export interface Image {
            medium: string;
            original: string;
        }
    
        export interface Self {
            href: string;
        }
    
        export interface PreviousEpisodeURL {
            href: string;
        }
    
        export interface NextEpisodeURL {
            href: string;
        }
    
        export interface Links {
            self: Self;
            previousepisode: PreviousEpisodeURL;
            nextepisode: NextEpisodeURL;
        }
    
        export interface Self2 {
            href: string;
        }
    
        export interface Links2 {
            self: Self2;
        }
    
        export interface Nextepisode2 {
            id: number;
            url: string;
            name: string;
            season: number;
            number: number;
            airdate: string;
            airtime: string;
            airstamp: Date;
            runtime: number;
            image?: any;
            summary: string;
            _links: Links2;
        }
    
        export interface Image2 {
            medium: string;
            original: string;
        }
    
        export interface Self3 {
            href: string;
        }
    
        export interface Links3 {
            self: Self3;
        }
    
        export interface Previousepisode2 {
            id: number;
            url: string;
            name: string;
            season: number;
            number: number;
            airdate: string;
            airtime: string;
            airstamp: Date;
            runtime: number;
            image: Image2;
            summary: string;
            _links: Links3;
        }
    
        export interface Embedded {
            nextepisode: Nextepisode2;
            previousepisode: Previousepisode2;
        }
    
        export interface ShowDetails {
            id: number;
            url: string;
            name: string;
            type: string;
            language: string;
            genres: string[];
            status: string;
            runtime: number;
            premiered: string;
            officialSite: string;
            schedule: DetailsSchedule;
            rating: Rating;
            weight: number;
            network: Network;
            webChannel?: any;
            externals: Externals;
            image: Image;
            summary: string;
            updated: number;
            _links: Links;
            _embedded: Embedded;
        }

}
