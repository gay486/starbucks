;(function(window,document,$){

    var cnt=0;
    var setId = 0;
    var setId2 = 0;

        function nextSlideCountFn(){
            cnt++;
            mainSlideFn();
        }
        function prevSlideCountFn(){ 
            cnt--;
            mainSlideFn();
        }

        function mainSlideFn(){ 
            $(".slide-wrap").stop().animate({ left:-829*cnt }, 600, function(){   
                if(cnt>3){ cnt=0; } 
                if(cnt<0){ cnt=3; }
                $(".slide-wrap").stop().animate({ left:-829*cnt }, 0);
                $(".slide").removeClass("addSlide");
                $(".slide").eq(cnt+1).addClass("addSlide"); 
            });
            pageBtnFn(cnt);  
        }

        $(".next-btn").on({  
            click: function(){  
                if( !$(".slide-wrap").is(":animated") ){ 
                    nextSlideCountFn(); 
                }
                timerControlFn();
            }
        });
     
        $(".prev-btn").on({
            click: function(){
                if( !$(".slide-wrap").is(":animated") ){
                    prevSlideCountFn();
                }
                timerControlFn();
            }
        });

        $(".slide-wrap").swipe({
            swipeLeft: function(){  

                if( !$(".slide-wrap").is(":animated") ){ 
                    nextSlideCountFn();  
                }
                timerControlFn();
            },
            swipeRight: function(){ 

                if( !$(".slide-wrap").is(":animated") ){
                    prevSlideCountFn();
                }
                timerControlFn();
            }
        });

        function timerControlFn(){

            clearInterval(setId);   
            clearInterval(setId2);  
            $(".pause-play-btn").addClass("addPlay"); 

            var cnt2 = 0;
            setId2 = setInterval(function(){
                cnt2++;   
                if(cnt2>10){         
                    nextSlideCountFn(); 
                    initTimerFn(); 
                    clearInterval(setId2);  
                    $(".pause-play-btn").removeClass("addPlay"); 

                }
            },1000);   
        }

        $(".page-btn").each(function(index){
            $(this).on({
                click: function(){
                    cnt=index;    
                    mainSlideFn(); 
                    clearInterval(setId);  
                    $(".pause-play-btn").addClass("addPlay");
                    timerControlFn();
                }
            });
        });

        function pageBtnFn(z){
            z>3 ? z=0 :z;
            $(".page-btn").removeClass("addPagebtn");                  
            $(".page-btn").eq(z).addClass("addPagebtn"); 
        }

        function initTimerFn(){  
            setId = setInterval(nextSlideCountFn, 3000);
        }

        $(".pause-play-btn").on({
            click: function(){
                var x = null;  
                    x = $(this).hasClass("addPlay");   
                    if(x==false){  
                        clearInterval(setId);
                        clearInterval(setId2);
                        $(this).addClass("addPlay"); 
                    }
                    else if(x==true){ 
                        clearInterval(setId);
                        clearInterval(setId2);
                        initTimerFn();
                        $(this).removeClass("addPlay"); 
                    }
            }
        });

        $(".promotion-btn").on({
            click:function(e){
                e.preventDefault();

                $(this).toggleClass("addUp");
                $("#section3").stop().slideToggle(500);

                if($(this).hasClass("addUp")){   
                    initTimerFn();   
                    $(".pause-play-btn").removeClass("addPlay");  
                }
                else{   
                    clearInterval(setId);  
                    clearInterval(setId2);
                    cnt=0;  
                    $(".slide-wrap").stop().animate({ left:-829*cnt }, 0); 
                    $(".slide").removeClass("addSlide");   
                    $(".slide").eq(cnt+1).addClass("addSlide");  
                    pageBtnFn(cnt);  
                    $(".pause-play-btn").addClass("addPlay"); 
                }
            }
        });

})(window,document,jQuery);