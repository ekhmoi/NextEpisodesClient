import { Episode } from "../models/Episode";

export class RecentEpisodes {
    public today: Episode[] = [];
    public tomorrow: Episode[] = [];
    public yesterday: Episode[] = [];

    constructor(uglyJson?: any) {
        if (uglyJson) {
            console.info('starting parsing xml to RecentEpisode');
            try {
                let todays: any[] = uglyJson.results.date_period[0].episodes[0].result;
                let tomorrows: any[] = uglyJson.results.date_period[1].episodes[0].result;
                let yesterdays: any[] = uglyJson.results.date_period[2].episodes[0].result;
    
                this.today = todays.map(i => new Episode(i));
                this.tomorrow = tomorrows.map(i => new Episode(i));
                this.yesterday = yesterdays.map(i => new Episode(i));
            } catch(err) {
                console.warn('could not parse xml for RecentEpisodes', err);
            }
        }
    }
}