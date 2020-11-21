$(function() {
    // .nav dropdown
    var drop = $(".header > .nav > ul > li");

    // drop
    drop.each(function() {
        $(this).hover(
            function() {$(this).children(".nav_menu").addClass("drop").parents(".nav").addClass("on");},
            function() {$(this).children(".nav_menu").removeClass("drop").parents(".nav").removeClass("on");}
        )
    }); /*drop end*/

    // side_menu_button click
    var side_menu_button = $(".header .mid .side_menu_button");

    side_menu_button.on("click", function() {
        if (side_menu_button.is(".close")) {
            side_menu_button.removeClass("close").parents(".header").next(".side").removeClass("move");
        } else {
            side_menu_button.addClass("close").parents(".header").next(".side").addClass("move");
        }
    }); /*side_menu_button click end*/


    // side dropdown
    var dropdown = $(".side .side_nav > ul > li > a"),
        side_menu = dropdown.next(".side_menu");

    dropdown.on("click",function(event) {
        event.preventDefault();
        if ($(this).next(".side_menu").is(":visible")) {
            $(this).removeClass("color").next(".side_menu").slideUp();
        } else {
            $(".side_menu:visible").slideUp();
            $(".color").removeClass("color");
            $(this).addClass("color").next(".side_menu").slideDown();
        }
    }); /*side dropdown end*/


    // content_01 .left tab_bar
    var tab = $(".container > .content_01 > .left > .tab > div"),
        site = $(".container > .content_01 > .left > .tab_site");

    tab.each(function() {
        $(this).children("h2").on("click", function() {
            $(".on").removeClass("on");
            $(this).addClass("on").next("div").addClass("on");
        })
    }) /* tab_bar end */

    // content_01 .left hover 이미지 교체
    site.find("li").each(function() {
        $(this).hover(
            function() {$(this).find("img:first-child").css("display", "none").next("img").css("display", "block")},
            function() {$(this).find("img:first-child").css("display", "block").next("img").css("display", "none")}
        );
    }); /* hover 이미지 교체 */

    // content_01 .reservation button 클릭시 .left 보여진다.
    var reservation = $(".container > .content_01 > .reservation");

    /*open 버튼 클릭시 content left 요소가 나온다.*/
    reservation.find(".button > .open").on("click", function() {
        $(this).removeClass("click").next(".close").addClass("click").parents(".reservation").next(".left").addClass("show");
    }) /*open 버튼 클릭시 content left 요소 end*/

    /*close 버튼 클릭시 content left 요소가 들어간다.*/
    reservation.find(".button > .close").on("click", function() {
        $(this).removeClass("click").prev(".open").addClass("click").parents(".reservation").next(".left").removeClass("show");
    }) /*close 버튼 클릭시 content left 요소 end*/


    // content_01 .mid slide
    var slide = $(".container > .content_01 > .mid > ul"),
        slideLength = slide.children("li").length,
        buHtml = '',
        bu = $(".container > .content_01 > .mid .bu"),
        bu_index = 0,
        img_index = 0,

        play_button = $(".container > .content_01 > .mid .play_button");

    var timer = window.setInterval(slide_fade, 3000);

    // slide_fade 함수
    function slide_fade() {
        window.setTimeout(function() {
            if (img_index < slideLength - 1) {
                img_index++;
                // console.log(img_index);
                slide.fadeOut(300, function() {
                    slide.children("li.out").removeClass("out").next("li").addClass("out").parent("ul").fadeIn(600);
                });
                buMove();
            } else {
                img_index = 0;

                slide.fadeOut(300, function() {
                    slide.children("li.out").removeClass("out");
                    slide.children("li:first-child").addClass("out").parent("ul").fadeIn(600);
                });
                buMove();
            }
        }, 300);
    }; /*slide_fade end*/

    // slide 요소의 li 만큼의 bu 생성
    slide.children("li").each(function(i) {
        buHtml += '<li><span>' + (i+1) + '</span></li>';
    }); /*bu 생성 end*/

    var bu_button = bu.html(buHtml).children();

    // bu_button
    bu_button.each(function(j) {
        $(this).on("click", function() {
            bu_index = j;
            goSlide(bu_index);
            // console.log(bu_index);
            buMove();
        });
    }); /*bu_button end*/

    // buMove 함수
    function buMove() {
        bu.children("li").removeClass("move");
        bu.children("li").eq(img_index).addClass("move");
    } /*buMove 함수 end */

    buMove();

    // goslide 함수
    function goSlide() {
         slide.children("li").removeClass("out");
         slide.children("li").eq(bu_index).addClass("out");
         img_index = bu_index;
         buMove();
    }; // goslide 함수 end

    //slide start, stop 타이머
    // start 버튼 클릭시
    play_button.children(".start").on("click", function() {
        window.clearInterval(timer);
        play_button.children(".start").removeClass("time").next(".stop").addClass("time");
    });
    // stop 버튼 클릭시
    play_button.children(".stop").on("click", function() {
        timer = window.setInterval(slide_fade, 3000);
        play_button.children(".stop").removeClass("time").prev(".start").addClass("time");
    });
}); // 전체 event function end
