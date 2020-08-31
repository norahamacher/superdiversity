export function getHighestValue(data, parameter ){
    //Toan:
    //  barHeight = Math.max(value * currData.json.scale[col] * feature.scale, 10)
    var highest= -1
    for(var i = 0; i < data.features.length; i ++){
        if ( data.features[i].properties[parameter] > highest) 
            highest = data.features[i].properties[parameter]
    }
    return highest;
}