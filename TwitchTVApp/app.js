///<reference path="typings/tsd.d.ts" />
class twitchApi {
    constructor(channels) {
        this.api = "http://crossorigin.me/https://api.twitch.tv/kraken";
        this.channels = channels.map(c => { return { name: c, logo: 'http://s3.amazonaws.com/nvest/Blank_Club_Website_Avatar_Gray.jpg', status: 'Account Closed' }; });
    }
    /**Parse the channels array, qeuery the endpoint, see what comes back */
    load() {
        let channelstring = this.channels.map(c => c.name).join(',');
        return new Promise((res, rej) => {
            this.getStreams(channelstring)
                .then(d => this.parseStream(d)) //Populate active channels  
                .then(() => Promise.all(this.channels.map(c => {
                this.getChannelInfo(c.name)
                    .then(i => {
                    c.logo = null ? c.logo : i.logo;
                    c.status = 'Offline';
                })
                    .fail(e => {
                    c.status = c.status;
                    c.logo = c.logo;
                });
            }))).then(() => res(this.AllChannels));
        });
    }
    get ActiveChannels() {
        return this.channels.filter(c => c.status !== 'Offline' && c.status !== "Account Closed");
    }
    get InactiveChannels() {
        return this.channels.filter(c => c.status === 'Offline' || c.status === "Account Closed");
    }
    get AllChannels() {
        return this.channels;
    }
    parseStream(d) {
        return new Promise((res, rej) => {
            this.channels.forEach(c => {
                let e = d.streams.filter(f => f.channel.name === c.name);
                if (e.length) {
                    c.logo = e[0].channel.logo;
                    c.status = e[0].game + ':' + e[0].channel.status;
                }
            });
            res('OK');
        });
    }
    getStreams(s) {
        let url = this.api + '/streams?channel=' + s;
        return $.ajax(url);
    }
    getChannelInfo(s) {
        let url = this.api + '/channels/' + s;
        return $.ajax(url);
    }
}
$(function () {
    let channels = ["freecodecamp", "storbeck", "terakilobyte", "habathcx", "robotcaleb", "thomasballinger", "noobs2ninjas", "beohoff", "brunofin", "comster404", 'kanped'];
    let api = new twitchApi(channels);
    let streamlist = $('#streamlist');
    let colors = { active: '#4CAF50', inactive: '#9E9E9E' };
    //Get active channels then 
    api.load().then((d) => {
        d.forEach(c => streamlist.append(newLi(c)));
    });
    function newLi(c) {
        let tmp = document.querySelector('#li_stream');
        tmp.content.querySelector('.logo').src = c.logo;
        tmp.content.querySelector('.streamname').innerHTML = c.name;
        tmp.content.querySelector('.status').innerHTML = c.status;
        return document.importNode(tmp.content, true);
    }
});
