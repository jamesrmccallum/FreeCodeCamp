///<reference path="Typings\tsd.d.ts" />

class wikiSearch {

    private url: string;

    constructor() {
        this.url = 'http://crossorigin.me/https://en.wikipedia.org/w/api.php?action=query&list=search&utf8&format=json&srlimit=20'
    }

    search(f): Promise<IWIkiSearch> {
        return new Promise((res, rej) => {
            $.ajax({
                url: this.url,
                data: { 'srsearch': f },
                type: 'GET',
                success: data => res(data),
                error: e => rej(e)
            })
        })
    }

}

interface IWIkiSearch{
    batchcomplete: string,
    continue: {continue: string, sroffset: number},
    query: {search: IQuery[], searchinfo: {totalhits: number} }
}

interface IQuery {ns: number, size: number, snippet: string, timestamp: string, title: string}

interface IApp {
    api: wikiSearch
}

$(function (){

    let app: IApp = {api: new wikiSearch()};
    let resultspanel = $('#resultspanel');

    $('#searchform').on('submit', (e) => {
        e.preventDefault();
        let val = $('#searchbox').val();
        app.api.search(val)
            .then(d => { insertPanels(d.query.search) })
            .catch(e => console.log(e));
    })
    
    function makePanel(res: IQuery) {
        var t = <HTMLTemplateElement>document.querySelector('#wikiresult');
        t.content.querySelector('#title').innerHTML = res.title;
        t.content.querySelector('#snippet').innerHTML = res.snippet;
        
        let c = <HTMLDivElement>document.importNode(t.content,true);
        return c 
    }
    
    function insertPanels(a: IQuery[]){
        
        resultspanel.empty(); 
        
        a.forEach(b=>{
            let d = makePanel(b);
            resultspanel.append(d).slideDown('slow');
        })
    }

});


