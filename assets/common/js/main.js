$(document).ready(function(){
    $('.JS_loading').css({'display':'block'});
});

$(window).load(function(){
	$('.JS_loading').delay(1000).fadeOut();

    // 詳細をみる
    if($(document).width() <737){ //sp
        $('.JS_contentsArea').each(function(){
            $(this).css("height",$(this).outerHeight() + 65 + "px");
        });
        $('.JS_contentsArea').hide();
        $('.JS_contentsArea').append('<p class="contentsClose JS_contentsClose"><a class="contentsClose__btn" href="javascript:void(0);">close</a></p>');
        $('.JS_contentsCheck').click(function () {
            $(this).next('.JS_contentsArea').slideToggle('slow').siblings('.JS_contentsArea').slideUp('slow');
            $(this).siblings('.JS_contentsCheck').removeClass('STATE_btnNone');
            $(this).toggleClass('STATE_btnNone');
        });
        $('.JS_contentsClose').click(function () {
            $(this).parent().slideToggle();
            $(this).parent().siblings('.JS_contentsCheck').removeClass('STATE_btnNone');
        });

    }
});

$(function() {

    // メニュー開閉
    $('.JS_open').on("click",function(){
        $('.JS_navArea').css({'display':'block', 'opacity':'1'});
    });

    $('.JS_navCloseBtn').on("click",function(){
        $('.JS_navClose').css({'display':'none', 'opacity':'0'});
    });

    if($(document).width() > 737){  //PC
        // colorbox 呼び出し
        $('.JS_modalMovie').colorbox({
            iframe:true,
            innerWidth:640,   //幅の指定
            innerHeight:360, //高さの指定
            fixed:true
        });
    }

});