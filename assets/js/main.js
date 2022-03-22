"use strict";

let typed = new Typed('#typed', {
    stringsElement: '#typed_strings',
    showCursor: false,
    typeSpeed: 60,
    startDelay: 100,
    backSpeed: 50,
    backDelay: 2500,
    loop: true
});

// jQuery

$(function() {

    // menu bar
    $('.menu_toggle').click(function() {
        $(this).toggleClass('active');
        $('.header .nav_bar ul').toggleClass('active');
    });

    $(window).scroll(function() {

        $('.header .nav_bar ul, .menu_toggle').removeClass('active');

        let scrollTop = $(window).scrollTop();
        if (scrollTop > 150) {
            $('.header').addClass('animTop');
        } else {
            $('.header').removeClass('animTop');
        }
        if (scrollTop > 200) {
            $('.header').addClass('animBot');
        } else {
            $('.header').removeClass('animBot');
        }

        if (scrollTop > 50) {
            $('.service_main_pkg_wrapper').addClass('sticky');
        } else {
            $('.service_main_pkg_wrapper').removeClass('sticky');
        }

        let main_serv_deta_wrapper = $('.main_serv_deta_wrapper').height();
        let service_main_pkg_wrapper = $('.service_main_pkg_wrapper').height();
        let service_main_result = main_serv_deta_wrapper - service_main_pkg_wrapper;

        if (scrollTop > service_main_result) {
            $('.service_main_pkg_wrapper').addClass('relative');
            $('.service_main_pkg_wrapper.sticky.relative').css('top', service_main_result);
        } else {
            $('.service_main_pkg_wrapper').removeClass('relative');
            $('.service_main_pkg_wrapper.sticky').css('top', '13rem');
        }


        // scroll Spy
        $(".card_wrapper").each(function(index) {
            var elemTop = $(this).offset().top - 200;
            var elemBottom = elemTop + $(this).height();
            if (scrollTop >= elemTop && scrollTop <= elemBottom) {
                var id = $(this).attr("id");
                var navElem = $('a[href="#' + id + '"]');
                navElem.parent().addClass("active").siblings().removeClass("active");
            }
        });
    });

    // active class
    $('.header .nav_bar ul li').click(function() {
        $(this).addClass('active').siblings().removeClass('active');
    });

    // padding top
    $('.header .nav_bar ul li a').click(function() {
        $('.card_wrapper').css('paddingTop', '12rem');
    });

    // bx slider
    $('.slider_inner').bxSlider({
        swipeThreshold: 15,
        speed: 300,
        pager: false,
        responsive: true
    });

    // faq list
    $(".faq_list dt").click(function() {
        $(this).toggleClass('rotate').siblings().removeClass('rotate');
        // self clicking close
        if ($(this).next(".faq_list dd").hasClass("active")) {
            $(this).next(".faq_list dd").removeClass("active").slideUp();
        } else {
            $(".faq_list dd").removeClass("active").slideUp();
            $(this).next(".faq_list dd").addClass("active").slideDown();
        }
    })

    // counter active
    // must be an array, could have only one element
    let visibilityIds = ['#counters_1'];

    // default counter class
    let counterClass = '.counter';

    // default animation speed
    let defaultSpeed = 3000;

});