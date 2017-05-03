///<reference path="Typings\tsd.d.ts" />
var wikiSearch = (function () {
    function wikiSearch() {
        this.url = 'http://crossorigin.me/https://en.wikipedia.org/w/api.php?action=query&list=search&utf8&format=json&srlimit=20';
    }
    wikiSearch.prototype.search = function (f) {
        var _this = this;
        return new Promise(function (res, rej) {
            $.ajax({
                url: _this.url,
                data: { 'srsearch': f },
                type: 'GET',
                success: function (data) { return res(data); },
                error: function (e) { return rej(e); }
            });
        });
    };
    return wikiSearch;
})();
$(function () {
    var app = { api: new wikiSearch() };
    var resultspanel = $('#resultspanel');
    $('#searchform').on('submit', function (e) {
        e.preventDefault();
        var val = $('#searchbox').val();
        app.api.search(val)
            .then(function (d) { insertPanels(d.query.search); })
            .catch(function (e) { return console.log(e); });
    });
    function makePanel(res) {
        var t = document.querySelector('#wikiresult');
        t.content.querySelector('#title').innerHTML = res.title;
        t.content.querySelector('#snippet').innerHTML = res.snippet;
        var c = document.importNode(t.content, true);
        return c;
    }
    function insertPanels(a) {
        resultspanel.empty();
        a.forEach(function (b) {
            var d = makePanel(b);
            resultspanel.append(d).slideDown('slow');
        });
    }
});
