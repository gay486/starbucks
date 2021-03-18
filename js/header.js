(function($){

    $(".main-btn").on({

        mouseenter:function(){  
            $(".main-btn").removeClass("addMainBtn");
            $(this).addClass("addMainBtn");  
            $(".sub").stop().slideUp(0);
            $(this).next().stop().slideDown(500,"swing");
        },
        focusin:function(){
            $(".main-btn").removeClass("addMainBtn");
            $(this).addClass("addMainBtn");
        },
    });

    $("#nav").on({
        mouseleave:function(){
            $(".sub").stop().slideUp(500);
            $(".main-btn").removeClass("addMainBtn");
        }
    });

    $(".main-btn").each(function(index){
        $(this).on({
            click:function(){
                if(index==0){
                    location.href="https://www.starbucks.co.kr/coffee/index.do";
                }
                else if(index==1){
                    location.href="https://www.starbucks.co.kr/menu/index.do";
                }
                else if(index==2){
                    location.href="https://www.starbucks.co.kr/store/index.do";
                }
                else if(index==3){
                    location.href="https://www.starbucks.co.kr/responsibility/index.do";
                }
                else if(index==4){
                    location.href="https://www.starbucks.co.kr/msr/index.do";
                }
                else if(index==5){
                    location.href="https://www.starbucks.co.kr/whats_new/index.do";
                }
            }
        });
    });

})(jQuery);