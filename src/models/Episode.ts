import cheerio from 'cheerio';

export class Parser {
    public $: CheerioStatic;
    constructor(html) {
        this.$ = cheerio.load(html);
    }
}

export class Episode {
    public channelName: string;
    public episodeName: string;
    public episodeNumber: number;
    public hour: string;
    public image: string;
    public seasonNumber: number;
    public showId: string;
    public title: string;

    constructor(json?: any) {
        if (json) {
            try {
                this.channelName = json.channel_name[0];
                this.episodeName = json.episodeName[0];
                this.episodeNumber = parseInt(json.episodeNumber[0]);
                this.hour = json.hour[0];
                this.image = json.imageUrl[0].replace('/thumb/', '/huge/');
                this.seasonNumber = parseInt(json.seasonNumber[0]);
                this.showId = json.showid[0];
                this.title = json.title[0];
            } catch(err) {
                console.warn('could not parse xml for Episode', err);
            }
        }
    }
}
