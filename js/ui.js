'use strict'

var ui = function() {
    weaponInit();
    statsInit();
    searchButtonInit();
    exhibitButtonInit();
    exhibitorNameInit();
};

var statsInit = function() {
    var $this;
    stats.forEach(function(e, i, arr) {
        $(".stats-list").append('<option class="stats-list-content">' + e + '</option>');
    });
}

var weaponInit = function() {
    var $this;
    weapons.forEach(function(e, i, arr) {
        $(".weapon-box").append('<option class="weapons-list-content">' + e + '</option>');
    });

};

var searchButtonInit = function() {
    $("#searchButton").click(function(e) {
        var txt = $('#search-box option:selected').text();
        var $this = $(this);
        console.log(txt);
        search(txt);
    });
};

var exhibitButtonInit = function() {
    $("#exhibitButton").click(function(e) {
        var $this = $(this);
        var modData = {};
        modData.weapon = $('#exhibit-weapon-box option:selected').text();
        modData.action = "create";
        modData.alias = $('#alias').val().toString();
        modData.stats1 = ($('#stats1 option:selected').text() === "なし") ? "" : $('#stats1 option:selected').text();
        modData.value1 = parseFloat($('#value1').val()) ? parseFloat($('#value1').val()) : "";
        modData.stats2 = ($('#stats2 option:selected').text() === "なし") ? "" : $('#stats2 option:selected').text();
        modData.value2 = parseFloat($('#value2').val()) ? parseFloat($('#value2').val()) : "";
        modData.stats3 = ($('#stats3 option:selected').text() === "なし") ? "" : $('#stats3 option:selected').text();
        modData.value3 = parseFloat($('#value3').val()) ? parseFloat($('#value3').val()) : "";
        modData.disposition = ($('#disposition option:selected').text() === "なし") ? "" : $('#disposition option:selected').text();
        modData.valueDisposition = parseFloat($('#valueDisposition').val()) ? parseFloat($('#valueDisposition').val()) : "";
        exhibitorNameRefresh(modData.alias);
        if (modData.alias != "" &&
            modData.stats1 != "" &&
            modData.stats2 != "" &&
            modData.value1 != "" &&
            modData.value2 != ""
        ) {
            post(modData);
        } else {
            console.log("!");
        }
    });
};

var exhibitorNameInit = function() {
    if (('localStorage' in window) && (window.localStorage !== null)) {
        if (localStorage.getItem("alias")) {
            $('#alias').val(localStorage.getItem("alias"));
            getMyMods(localStorage.getItem("alias"));
        }
    }
};

var exhibitorNameRefresh = function(str) {
    if (('localStorage' in window) && (window.localStorage !== null)) {
        if (localStorage.getItem("alias") != str && $('#alias').val() != "") {
            localStorage.setItem("alias", str);
            $('#alias').val(str);
            //localStorage.clear();
        }
    }
};

var modSearchListUpdate = function(XHRresponseText) {
    $(".modResultList").empty();
    let list = JSON.parse(XHRresponseText);
    list.forEach(function(e, i, arr) {
        $(".modResultList").append('<div class="mod">' +
            e.alias + '<br>' +
            e.stats1 + " " + e.value1 + "%" + '<br>' +
            e.stats2 + " " + e.value2 + "%" + '<br>' +
            e.stats3 + " " + e.value3 + "%" + '<br>' +
            e.disposition + " " + e.valueDisposition + "%" + '</div>');
    });
};

var modExhibitionListUpdate = function(XHRresponseText) {
    $(".modExhibitionList").empty();
    let list = JSON.parse(XHRresponseText);
    list.forEach(function(e, i, arr) {
        $(".modExhibitionList").append('<div class="mod">' +
            e.weapon + '<br>' +
            e.stats1 + " " + e.value1 + "%" + '<br>' +
            e.stats2 + " " + e.value2 + "%" + '<br>' +
            e.stats3 + " " + e.value3 + "%" + '<br>' +
            e.disposition + " " + e.valueDisposition + "%" +
            '<p class="uuid" style="display:none;">' + e.uuid + '</p>' +
            '<button type="button" class="deleteButton">削除</button>' +
            '</div>');
    });
    $(".interrupt").css("display", "none");
    $(".deleteButton").click(function(e) {
        var $this = $(this).parent();
        var uuid = $this.children('.uuid').text();
        del({
            action: "delete",
            uuid: uuid,
            alias: localStorage.getItem("alias")
        });
    });
};
