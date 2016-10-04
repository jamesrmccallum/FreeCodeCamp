
export function spinalCase(str:string) {
    
    var caps = /(?=[A-Z])|[^a-zA-Z0-9]/

    return str.split(caps).map(a=>a.toLowerCase()).join('-');
}