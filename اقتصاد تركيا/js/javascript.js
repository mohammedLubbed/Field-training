$(document).ready(function(){
    $('.city-list li').eq(0).addClass('current').fadeIn(1000);
    var timer = setInterval('animateList()', 3000);
    $('.city-list li a').hover(
    function(){
        clearInterval(timer);
    },
    function(){
        clearInterval(timer);
        timer = setInterval('animateList()', 3000);
    });
});
function animateList()
{
var next = $('.city-list li.current').next();
if(next.length == 0)
next = $('.city-list li:first');
$('.city-list li.current').removeClass('current').slideUp(1000);
next.addClass('current').css('right', '0px').slideDown(1000);
}


