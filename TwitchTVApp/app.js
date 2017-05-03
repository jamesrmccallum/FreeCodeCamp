///<reference path="typings/tsd.d.ts" />
class TwitchApi {
    constructor(channels) {
        this.api = "http://crossorigin.me/https://api.twitch.tv/kraken";
        this.channels = channels.map(c => {
            return { name: c,
                logo: 'http://s3.amazonaws.com/nvest/Blank_Club_Website_Avatar_Gray.jpg',
                status: undefined,
                url: undefined
            };
        });
    }
    /**Parse the channels array, qeuery the endpoint, see what comes back */
    load() {
        let channelstring = this.channels.map(c => c.name).join(',');
        return new Promise((res, rej) => {
            this.getStreams(channelstring)
                .then(d => {
                return this.parseStream(d);
            })
                .then(e => {
                return this.getAllChannelInfo(this.channels);
            })
                .then(() => {
                res(this.AllChannels);
            });
        }); //Populate active channels
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
                    c.url = e[0].channel.url;
                }
            });
            res('OK');
        });
    }
    getStreams(s) {
        let url = this.api + `/streams?channel=${s}`;
        return new Promise((res, rej) => {
            $.ajax(url)
                .then(res, rej);
        });
    }
    getAllChannelInfo(c) {
        return Promise.all(c.map(d => {
            return this.getChannelInfo(d.name)
                .then(e => {
                d.logo = e.logo ? e.logo : d.logo;
                d.status = d.status ? d.status : 'Offline';
                d.url = e.url;
            })
                .catch(f => {
                d.status = 'Account Closed';
            });
        }));
    }
    getChannelInfo(s) {
        let url = this.api + `/channels/${s}`;
        return new Promise((res, rej) => {
            $.ajax(url)
                .then(res, rej);
        });
    }
}
$(function () {
    let channels = ["freecodecamp", "storbeck", "terakilobyte", "habathcx", "robotcaleb", "thomasballinger", "noobs2ninjas", "beohoff", "brunofin", "comster404", 'kanped', 'ogamingsc2'];
    let api = new TwitchApi(channels);
    let streamlist = $('#streamlist');
    let colors = { active: '#4CAF50', inactive: '#9E9E9E' };
    //Get active channels then 
    api.load().then((d) => {
        console.log(d);
        d.forEach(c => streamlist.append(newLi(c)));
    });
    $('#ctrlall').click(() => { showAll(); });
    $('#ctrlactive').click(() => { hideInactive(); });
    $('#ctrlinactive').click(() => { hideActive(); });
    function newLi(c) {
        let tmp = document.querySelector('#li_stream');
        let status = tmp.content.querySelector('.status');
        tmp.content.querySelector('.logo').src = c.logo;
        tmp.content.querySelector('.streamname').innerHTML = c.name;
        status.innerHTML = c.status;
        let state = c.status === 'Offline' || c.status === 'Account Closed' ? 'inactive' : 'active';
        status.href = c.url;
        let li = document.importNode(tmp.content, true);
        li.children[0].classList.add(state);
        return li;
    }
    function hideInactive() {
        $('.active').show();
        $('.inactive').hide();
    }
    function hideActive() {
        $('.inactive').show();
        $('.active').hide();
    }
    function showAll() {
        $('.active,.inactive').show();
    }
});
