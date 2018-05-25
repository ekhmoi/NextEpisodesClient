export class EpisodeOverview {
    public active: string;
    public channel: string;
    public creatorIds: string[];
    public description: string;
    public duration: number;
    public genres: string[];
    public image: string;
    public imdb: string;
    public nextEpisode: INextEpisode;
    public premiered: number;
    public prevEpisode: INextEpisode;
    public selfUrl: string;
    public showSeasons: number[];
    public showStatus: string;
    public title: string;
    public trailer: string; // Youtube ID


    constructor(json?: any) {
        if (json) {
            try {
                this.active = json.details.active[0];
                this.channel = json.details.channel[0];
                this.creatorIds = json.details.creatorIds;
                this.description = json.details.description[0];
                this.duration = parseInt(json.details.duration[0]);
                this.genres = json.details.genre[0].split(', ');
                this.image = json.details.imageUrl[0];
                this.imdb = json.details.imdb_url[0];
                this.nextEpisode = {
                    airDate: json.details.nextEpisode[0].air_date[0],
                    countDown: json.details.nextEpisode[0].countdown[0],
                    episodeName: json.details.nextEpisode[0].episode_name[0],
                    episodeNumber: json.details.nextEpisode[0].episode_number[0].length > 0 ? parseInt(json.details.nextEpisode[0].episode_number[0]) : 'Unknown',
                    seasonNumber: json.details.nextEpisode[0].season_number[0].length > 0 ? parseInt(json.details.nextEpisode[0].season_number[0]) : 'Unknown',
                };
                this.premiered = parseInt(json.details.premiered[0]);
                this.prevEpisode = {
                    airDate: json.details.prevEpisode[0].air_date[0],
                    episodeName: json.details.prevEpisode[0].episode_name[0],
                    episodeNumber: parseInt(json.details.prevEpisode[0].episode_number[0]),
                    seasonNumber: parseInt(json.details.prevEpisode[0].season_number[0]),
                };
                this.selfUrl = json.details.self_url[0];
                this.showSeasons = json.details.showSeasons[0].split(',').map((s) => parseInt(s.trim()));
                this.title = json.details.title[0];
                this.trailer = json.details.trailer[0];
                this.showStatus = json.details.show_status[0];

            } catch (err) {
                console.log(err)
            }
        }
    }
}

export interface INextEpisode {
    airDate: string;
    countDown?: string;
    episodeName: string;
    episodeNumber: any;
    seasonNumber: any;
} 