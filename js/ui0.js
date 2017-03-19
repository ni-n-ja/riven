'use strict'

var ui = function() {
    weaponInit();
    statsInit();
};

var statsInit = function() {
    var $this;
    stats.forEach(function(e, i, arr) {
        $(".stats-list").append('<p class="stats-list-content">' + e + '</p>');
    });
    $(".stats").click(function(e) {
        event.stopPropagation();
        $(document).click(function() {　
            $(".stats-list").css('display', 'none');
        });
        $this = $(this);
        $(".stats-list").width($(this).width() + "px");
        $(".stats-list").css('top', ($(this).height() + $(this).offset().top + 6) + "px");
        $(".stats-list").css('left', ($(this).offset().left + 2) + "px");
        $(".stats-list").css('display', 'block');
        $(".stats-list-content").click(function(event) {
            console.log("!");
            $this.val($(this).text());
            $(".stats-list").css('display', 'none');
            event.stopPropagation();
        });
    });
}

var weaponInit = function() {
    var $this;
    weapons.forEach(function(e, i, arr) {
        $(".weapons-list").append('<p class="weapons-list-content">' + e + '</p>');
    });
    $(".weapon-box").click(function(e) {
        event.stopPropagation();
        $(document).click(function() {　
            $(".weapons-list").css('display', 'none');
        });
        $this = $(this);
        $(".weapons-list").width($(this).width() + "px");
        $(".weapons-list").css('top', ($(this).height() + $(this).offset().top + 6) + "px");
        $(".weapons-list").css('left', ($(this).offset().left + 2) + "px");
        $(".weapons-list").css('display', 'block');
        $(".weapons-list-content").click(function(event) {
            $this.val($(this).text());
            $(".weapons-list").css('display', 'none');
            event.stopPropagation();
        });
    });
    $(".weapon-box").change(function() {
        console.log("!");
        let name = $(this).val().toUpperCase();
        weaponUpdate(name);
        $(this).val(name);
    });
};

var weaponUpdate = function(str) {
    var weaponsData = weapons.filter(function(e) {
        return e.substr(0, str.length) === str;
    });
    $(".weapons-list").empty();
    weaponsData.forEach(function(e, i, arr) {
        $(".weapons-list").append('<p class="weapons-list-content">' + e + '</p>');
    });
    $(".weapons-list-content").click(function(event) {
        $("#push-weapon-box").val($(this).text());
        $(".weapons-list").css('display', 'none');
        event.stopPropagation();
    });
};
