'use strict'
var initSearch = function(arr) {
    $(".search-list").width($(".search-weapon-box").width() + "px");
    $(".search-list").css('top', ($(".search-weapon-box").height() + $(".search-weapon-box").offset().top + 6) + "px");
    $(".search-list").css('left', ($(".search-weapon-box").offset().left + 2) + "px");
    weapons.forEach(function(e, i, arr) {
        $(".search-list").append('<p class="search-list-content">' + e + '</p>');
    });
    $(".search-list-content").click(function(event) {
        $(".search-weapon-box").val($(this).text());
        $(".search-list").css('display', 'none');
    });
};

var updateSearch = function(str) {
    var weaponsData = weapons.filter(function(e) {
        return e.substr(0, str.length) === str;
    });
    $(".search-list").empty();
    weaponsData.forEach(function(e, i, arr) {
        $(".search-list").append('<p class="search-list-content">' + e + '</p>');
    });
    $(".search-list-content").click(function(event) {
        $(".search-weapon-box").val($(this).text());
        $(".search-list").css('display', 'none');
    });
};

var search = function() {
    initSearch(weapons);
    $(".search-weapon-box").click(function(e) {
        initSearch(weapons);
        $(".search-list").css('display', 'block');
    });
    document.getElementsByClassName("search-weapon-box")[0].onkeyup = function() {
        let name = $(".search-weapon-box").val().toUpperCase();
        updateSearch(name);
        $(".search-box").val(name);
    };
};
