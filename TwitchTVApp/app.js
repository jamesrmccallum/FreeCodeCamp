///<reference path="typings/tsd.d.ts" />
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, Promise, generator) {
    return new Promise(function (resolve, reject) {
        generator = generator.call(thisArg, _arguments);
        function cast(value) { return value instanceof Promise && value.constructor === Promise ? value : new Promise(function (resolve) { resolve(value); }); }
        function onfulfill(value) { try { step("next", value); } catch (e) { reject(e); } }
        function onreject(value) { try { step("throw", value); } catch (e) { reject(e); } }
        function step(verb, value) {
            var result = generator[verb](value);
            result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);
        }
        step("next", void 0);
    });
};
class twitchApi {
    constructor(channels) {
        this.api = "http://crossorigin.me/https://api.twitch.tv/kraken";
        this.channels = channels.map(c => {
            return { name: c,
                logo: 'http://s3.amazonaws.com/nvest/Blank_Club_Website_Avatar_Gray.jpg',
                status: undefined
            };
        });
    }
    /**Parse the channels array, qeuery the endpoint, see what comes back */
    load() {
        let channelstring = this.channels.map(c => c.name).join(',');
        return new Promise((res, rej) => {
            this.getStreams(channelstring)
                .then(d => {
                this.parseStream(d);
            })
                .then(e => {
                Promise.all(this.channels.map(d => {
                    return this.getChannelInfo(d.name)
                        .then(e => {
                        d.logo = e.logo ? e.logo : d.logo;
                        d.status = d.status ? d.status : 'Offline';
                    })
                        .catch(f => {
                        d.status = 'Account Closed';
                    });
                }))
                    .then(() => res(this.AllChannels));
            }); //Populate active channels  
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
        return new Promise((res, rej) => {
            $.ajax(url)
                .then(res, rej);
        });
    }
    getChannelInfo(s) {
        return __awaiter(this, void 0, Promise, function* () {
            let url = this.api + '/channels/' + s;
            return new Promise((res, rej) => {
                $.ajax(url)
                    .then(res, rej);
            });
        });
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
        let state = c.status === 'Offline' || c.status === 'Account Closed' ? 'Offline' : 'Online';
        return document.importNode(tmp.content, true);
    }
});
