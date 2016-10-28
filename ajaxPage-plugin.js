;(function ($) {
    var AjaxPage = function (params) {
        var self = this;
        this.operate = params.operate;
        this.ajaxBtnClass = params.ajaxBtnClass;
        this.pageClass = params.pageClass;
        this.listClass = params.listClass;
        this.htmlTemp = params.htmlTemp;
        this.ajaxUrl = params.ajaxUrl;
        this.imgUrl = params.imgUrl;
        this.pageBtn = this.pageClass.find('span a');
        this.curPage = 1; //当前页码

        if (this.ajaxBtnClass != '') {//有点击加载的分页
            this.ajaxBtnClass.on('click', function () {
                self.getData(self.operate, 1, '');
                self.param = $(this).attr('data-id');
                $(this).addClass('select-car').siblings().removeClass('select-car');
                if (self.param) {
                    self.getData(self.operate, 1, self.param);
                }
                $(document).on('click', '.curr-page span a', function () {
                    page = $(this).attr('rel');
                    if (page) {
                        if (self.param) {
                            self.getData(self.operate, page, self.param);
                        }
                        self.getData(self.operate, page, '');
                    }
                });
            });
        } else {//无点击加载的分页
            this.getData(self.operate,1,'');
            $(document).on('click', '.curr-page span a', function () {
                page = $(this).attr('rel');
                if (page) {
                    self.getData(self.operate, page, '');
                }
            });
        }
    };

    AjaxPage.prototype = {
        /*客户端与服务端数据传输*/
        getData: function (operate, page, param) {
            param = param == '' ? '' : param;
            var self = this;
            $.ajax({
                url: this.ajaxUrl,
                type: 'post',
                dataType: 'json',
                data: {
                    operate: this.operate,
                    p: page - 1,
                    param: param
                },
                beforeSend:function () {
                    // self.listClass.html('<div class="load-car"><img src="'+self.imgUrl+'/images/load-car.gif"/><span>正在努力加载中...</span></div>');
                },
                success: function (response) {
                    setTimeout(function () {
                        var html = '';
                        $.each(response.list, function (i, v) {
                            self.total = response.total; //总记录数
                            self.pageSize = response.pageSize; //每页显示条数
                            self.curPage = page; //当前页
                            self.totalPage = response.pageNum; //总页数
                            html += '<tr>'+
                            '<td><input type="checkbox" class="cBox" name="ids[]" value="'+v.id+'">'+(i+1)+
                            '</td>'+
                            '<td>'+v.username+'</td>'+
                            '<td>'+v.email+'</td>'+
                            '<td>'+v.sex+'</td>'+
                            '</tr>';
                            self.listClass.html(html);
                            self.getPageBar();
                        });
                    }, 500);
                }
            });
        },

        /*生成分页条*/
        getPageBar: function () {
            var pageStr = '';
            //页码大于最大页数
            if (this.curPage > this.totalPage) this.curPage = this.totalPage;
            //如果是第一页
            if (this.curPage == 1) {
                pageStr += "<span>首页</span> <span>上一页</span>";
            } else {
                pageStr += "<span><a href='javascript:void(0)' rel='1'>首页</a></span><span><a href='javascript:void(0)' rel='" + (this.curPage - 1) + "'>上一页</a></span>";
            }

            //页码
            for (var i = 1; i <= this.totalPage; i++) {
                if (this.curPage == i) {
                    pageStr += "<span class='current'>" + i + "</span>";
                } else {
                    pageStr += "<span><a href='javascript:void(0)' rel='" + i + "'>" + i + "</a></span>";
                }
            }

            //如果是最后页
            if (this.curPage >= this.totalPage) {
                pageStr += "<span>下一页</span> <span>尾页</span>";
            } else {
                pageStr += "<span><a href='javascript:void(0)' rel='" + (parseInt(this.curPage) + 1) + "'>下一页</a></span><span><a href='javascript:void(0)' rel='" + this.totalPage + "'>尾页</a></span>";
            }
            //页码小于1
            if (this.curPage < 1) this.curPage = 1;
            pageStr += "<span> 共" + this.total + "条记录</span><span> 第" + this.curPage + "页/共" + this.totalPage + "页</span>";
            this.pageClass.html(pageStr);
        }

    };

    window['AjaxPage'] = AjaxPage;
})(jQuery);