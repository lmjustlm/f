            $(function () {
            $("img.lazy").lazyload({
                load: function () {
                    $('#pic_container').BlocksIt({
                        numOfCol: 5,
                        offsetX: 8,
                        offsetY: 8
                    });
                }
            });
            $(window).scroll(function () {
                // 当滚动到最底部以上50像素时， 加载新内容
                if ($(document).height() - $(this).scrollTop() - $(this).height() < 50) {
                    $('#pic_container').append($("#test").html());
                    $('#pic_container').BlocksIt({
                        numOfCol: 5,
                        offsetX: 8,
                        offsetY: 8
                    });
                    $("img.lazy").lazyload();
                }
            });

            //window resize
            var currentWidth = 1100;
            $(window).resize(function () {
                var winWidth = $(window).width();
                var conWidth;
                if (winWidth < 660) {
                    conWidth = 440;
                    col = 2
                } else if (winWidth < 880) {
                    conWidth = 660;
                    col = 3
                } else if (winWidth < 1100) {
                    conWidth = 880;
                    col = 4;
                } else {
                    conWidth = 1100;
                    col = 5;
                }

                if (conWidth != currentWidth) {
                    currentWidth = conWidth;
                    $('#pic_container').width(conWidth);
                    $('#pic_container').BlocksIt({
                        numOfCol: col,
                        offsetX: 8,
                        offsetY: 8
                    });
                }
            });
        });