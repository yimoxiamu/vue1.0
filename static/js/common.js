const comjs = {

}
comjs.buildPath = function(url,param1,param2){
    url = url + '/' + param1 + '/' + param2;
    return url;
}
comjs.buildPath2 = function(url,param1,param2,param3){
    url = url + '/' + param1 + '/' + param2 + '/' + param3;
    return url;
}
comjs.buildPath3 = function(url,param1,param2,param3,param4){
    url = url + '/' + param1 + '/' + param2 + '/' + param3 + '/' + param4;
    return url;
}


export default comjs;