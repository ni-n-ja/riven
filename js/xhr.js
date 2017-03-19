var get = function() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = function(e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log(JSON.parse(xhr.responseText).length,
                    xhr.responseText);
            } else {
                console.error(xhr.statusText);
            }
        }
    };
    xhr.send(null);
};

var search = function(query) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url + "?search=" + query, true);
    xhr.onload = function(e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                modSearchListUpdate(xhr.responseText);
            } else {
                console.error(xhr.statusText);
            }
        }
    };
    xhr.send(null);
};

var getMyMods = function(query) {
    $(".interrupt").css("display", "block");
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url + "?alias=" + query, true);
    xhr.onload = function(e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                //console.log(xhr.responseText);
                modExhibitionListUpdate(xhr.responseText);
            } else {
                console.error(xhr.statusText);
            }
        }
    };
    xhr.send(null);
};

var post = function(modData) {
    $(".interrupt").css("display", "block");
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function(e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                getMyMods(modData.alias);
            } else {
                console.error(xhr.statusText);
            }
        }
    };
    let encodedData = Object.keys(modData).map(function(n) {
        return encodeURIComponent(n) + '=' + encodeURIComponent(modData[n])
    }).join('&');
    xhr.send(encodedData);
};

var del = function(modData) {
    $(".interrupt").css("display", "block");
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function(e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log(xhr.responseText);
                getMyMods(modData.alias);
            } else {
                console.error(xhr.statusText);
            }
        }
    };
    let encodedData = Object.keys(modData).map(function(n) {
        return encodeURIComponent(n) + '=' + encodeURIComponent(modData[n])
    }).join('&');
    xhr.send(encodedData);
};
