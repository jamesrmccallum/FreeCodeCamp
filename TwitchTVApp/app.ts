///<reference path="typings/tsd.d.ts" />

interface IStreamsEndpoint {
    streams: IStream[],
    _links: {}
}

interface IStream {
    _id: number,
    game: string,
    viewers: number,
    created_at: string,
    video_height: number,
    average_fps: number,
    delay: number,
    is_playlist: boolean;
    links: {},
    preview: { small: string, medium: string, large: string, template: string }
    channel: IChannel
}

interface IChannel {
    name: string,
    display_name: string,
    status: string,
    logo: string;
}

interface IChannelsEndpoint {
    name: string,
    logo: string
}

interface IChannelSummary { name: string, logo: string, status: string }

class twitchApi {

    private api: string;
    private channels: IChannelSummary[]

    constructor(channels?: string[]) {
        this.api = "http://crossorigin.me/https://api.twitch.tv/kraken";
        this.channels = channels.map(c => { 
            return { name: c, 
                logo: 'http://s3.amazonaws.com/nvest/Blank_Club_Website_Avatar_Gray.jpg', 
                status: 'Account Closed' 
            } 
        });
    }

    /**Parse the channels array, qeuery the endpoint, see what comes back */
    load(): Promise<IChannelSummary[]> {
        
        let channelstring = this.channels.map(c => c.name).join(',');
        return new Promise((res, rej) => {
            
            this.getStreams(channelstring)
                .then(d => {
                    return this.parseStream(d);
                })
                .then(e=>{
                    return Promise.all(this.channels.map(d=>{
                        return this.getChannelInfo(d.name)
                            .then(e=>{
                                
                            })
                            .catch(f=>{
                                
                            })
                    }))
                    
                })//Populate active channels  
            
        })
    }

    get ActiveChannels(): IChannelSummary[] {
        return this.channels.filter(c => c.status !== 'Offline' && c.status !== "Account Closed")
    }

    get InactiveChannels(): IChannelSummary[] {
        return this.channels.filter(c => c.status === 'Offline' || c.status === "Account Closed")
    }

    get AllChannels(): IChannelSummary[] {
        return this.channels;
    }

    private parseStream(d: IStreamsEndpoint): Promise<string> {
        return new Promise((res, rej) => {
            this.channels.forEach(c => {
                let e = d.streams.filter(f => f.channel.name === c.name);
                if (e.length) {
                    c.logo = e[0].channel.logo;
                    c.status = e[0].game + ':' + e[0].channel.status;
                }
            })
            res('OK');
        })
    }

    private getStreams(s: string): Promise<IStreamsEndpoint> {
        let url = this.api + '/streams?channel=' + s;
        return new Promise((res,rej)=>{
            $.ajax(url)
                .then(d=>res(d))
                .fail(e=>rej(e))
        })    
    }

    private async getChannelInfo(s: string): Promise<IChannelsEndpoint> {
        let url = this.api + '/channels/' + s;
        return new Promise((res,rej)=>{
            $.ajax(url)
                .then(d=>res(d))
                .fail(e=>rej(e))
        })  
        
    }
}


$(function() {

    let channels = ["freecodecamp", "storbeck", "terakilobyte", "habathcx", "robotcaleb", "thomasballinger", "noobs2ninjas", "beohoff", "brunofin", "comster404",'kanped'];
    let api = new twitchApi(channels);
    let streamlist = $('#streamlist');
    let colors = { active: '#4CAF50', inactive: '#9E9E9E' }

    //Get active channels then 
    api.load().then((d) => {
        d.forEach(c =>
            streamlist.append(newLi(c))
        );
    })


    function newLi(c: IChannelSummary) {
        let tmp = <HTMLTemplateElement>document.querySelector('#li_stream');

        (<HTMLImageElement>tmp.content.querySelector('.logo')).src = c.logo;
        (<HTMLSpanElement>tmp.content.querySelector('.streamname')).innerHTML = c.name;
        (<HTMLSpanElement>tmp.content.querySelector('.status')).innerHTML = c.status;

        return <HTMLLIElement>document.importNode(tmp.content, true);
    }
})