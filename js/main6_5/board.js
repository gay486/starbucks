;(function($,window,document,undefined){

    var board = {
        init:   function(){
            var that = this;

            that.ajaxFn();
        },
        ajaxFn: function(){
            var a = [];
            var txt = '';     
            var total = 279;
            var list = 5;
            var pageCount = Math.ceil(total/list);
            
      
            var pageBtnNumber = 0;
            var startNum = pageBtnNumber * list; 
            var endNum = startNum + list;
                if(endNum > total){
                    endNum = total;
                }

            var groupNum = 0;
            var groupList = 10;
            var groupStar = groupNum * groupList;
            var groupEnd  = groupStar + groupList;

            if(groupEnd > pageCount){
                groupEnd = pageCount;
            }
            
            setTimeout(mainAjaxFn,100);
            function mainAjaxFn(){


                $.ajax({
                    url:"./data/json/notice.json",
                    type:"POST",
                    dataType:"JSON",
                    success:function(data){
                        
                        $.each(data.notice, function(idx, obj){
                            a[idx] = [];

                            a[idx][0] = obj.NO;
                            a[idx][1] = obj.제목;
                            a[idx][2] = obj.날짜;
                            a[idx][3] = obj.조회수;
                        });


                        total = a.length; 
                        list = 10; 
                        groupList = 10;
                        pageCount = Math.ceil(total/list);
                        


                        bindBoardListFn();
                        function bindBoardListFn(){

                            
                            startNum = pageBtnNumber * list;
                            endNum = startNum + list;
                            if(endNum > total){ 
                                endNum = total;
                            }

                            txt += "<dt class='fixedclear'>";
                            txt += "<span>NO</span>";
                            txt += "<span>제목</span>";
                            txt += "<span>날짜</span>";
                            txt += "<span>조회수</span>";
                            txt += "</dt>";

                            for(var i=startNum;i<endNum;i++){
                                txt += "<dd>";
                                txt += "<span>" + a[i][0] + "</span>";
                                txt += "<span><a href='#'>" + a[i][1] + "</a></span>";
                                txt += "<span>" + a[i][2] + "</span>";
                                txt += "<span>" + a[i][3] + "</span>";
                                txt += "</dd>";
                            }
                            
                            $('.notice-table dl').html(txt);
                            txt='';
                        }                        
                        
                        $('.prevBtn-wrap').stop().hide(0);
                        $('.nextBtn-wrap').stop().show(0);

                        pageNationFn();
                        function pageNationFn(){
                        
                            pageBtnNumber = groupNum * groupList;
                            bindBoardListFn();

                            groupStar = groupNum * groupList;
                            groupEnd  = groupStar + groupList;                          
                            
                            if(groupEnd > pageCount){
                                groupEnd = pageCount;
                                $('.nextBtn-wrap').stop().hide(0);
                            }
                            else{
                                $('.nextBtn-wrap').stop().show(0); 
                            }
                            
                            if(groupNum > 0){
                                $('.prevBtn-wrap').stop().show(0);
                            }
                            else{
                                $('.prevBtn-wrap').stop().hide(0);
                            }

                            for(var i=groupStar;i<groupEnd;i++){
                                if( 0 == ( i % groupList ) ){
                                    txt += "<li>";
                                    txt += "<a href='#' class='pageBtn addCurrent'>" + (i+1) + "</a>";
                                    txt += "</li>";
                                }
                                else{
                                    txt += "<li>";
                                    txt += "<a href='#' class='pageBtn'>" + (i+1) + "</a>";
                                    txt += "</li>";
                                }
                            }

                            $('.page-wrap ul').html(txt);
                            txt='';
                        }

                        $(document).on('mouseenter','.pageBtn', function(){
                        
                            $('.pageBtn').each(function(index){
                                $(this).on({
                                    click:  function(event){
                                        event.preventDefault();
                                        
                                        $('.pageBtn').removeClass('addCurrent');
                                        $(this).addClass('addCurrent');
    
                                        pageBtnNumber = Number($(this).text())-1;
                                        bindBoardListFn();
                                    }
                                });
                            });
                        });

                        $('.nextBtn').on({
                            click:  function(e){
                                e.preventDefault();
                                groupNum ++;
                                pageNationFn();
                            }
                        });

                        $('.prevBtn').on({
                            click:  function(e){
                                e.preventDefault();
                                groupNum --;
                                pageNationFn();
                            }
                        });


                    },
                    error:  function(){
                        alert('AJAX ERROR!!!');
                    }

                });
            }

        }
    };

    board.init();

})(jQuery,window,document);