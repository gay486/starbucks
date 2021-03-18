;(function(window,document,$,undefined){

    var t=0;
  
    setTimeout(init, 100);

    function init(){  
        $("#section6 .img-wrap").stop().animate({opacity:0},1000, function(){
            $("#section6 .img-wrap").stop().animate({opacity:1},3000);
        });
    }

    function formatFn(){
        $("#section6 .img-wrap").stop().animate({opacity:0},1000);
    }
    function animationFn(){
        $("#section6 .img-wrap").stop().animate({opacity:1},3000);
    }

    $(window).scroll(function(){
        if( $(this).scrollTop() < $("#section5").offset().top-200 ){
            if(t==1){
                t=0;
                formatFn();
            }
        }
        if( $(this).scrollTop() >= $("#section5").offset().top-200 ){
            if(t==0){
                t=1;
                animationFn();
            }
        }
    });

})(window,document,jQuery);