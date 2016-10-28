;(function ($) {
    var DelAll = function (params) {
        var self = this;
        this.all = params.allClass; //能选取所有的checkbox的class名
        this.list = params.listClass; //被选取所有的checkbox列的class名
        this.btn = params.delAllBtn; //批量删除按钮
        this.url = params.delUrl; //后端删除功能的url
        this.imgUrl = params.imgUrl; //图片地址
        this.checkboxName = "'" + params.listCheckboxName + "'"; //被选取所有的checkbox列的name

        //批量删除提示框显示
        this.btn.click(function () {
            self.checkboxNames = $("input[name=" + self.checkboxName + "]:checked");
            self.size = self.checkboxNames.size();
            if (self.size > 0) {
                self.confirmStyle('您确定要删除吗？',1);
            } else {
                self.confirmStyle('请先选择您要删除的数据!',0);
            }
        });

        //批量选取功能
        // this.all.click(function () {
        //     self.selectAll();
        // });
        $('body').on('click','.all',function () {
            self.selectAll();
        });

    };

    DelAll.prototype = {
        //批量选取函数
        selectAll: function () {
            if (this.all.is(':checked')) {
                this.list.prop('checked', true);
            } else {
                this.list.prop('checked', false);
            }
        },

        //批量删除函数,传数据给服务端
        delCheckboxes: function () {
            var arr = [];
            for (var i = 0; i < this.size; i++) {
                arr.push(this.checkboxNames[i].value);
            }
            $.ajax({
                url: this.url,
                type: 'post',
                dataType: 'json',
                data: {
                    ids: arr.join(',')
                },
                success: function (response) {
                    if (response.state == 1) {
                        location.reload();
                    }
                }
            });
        },

        //改变confirm样式
        confirmStyle: function (msg, isAjax) {

            var self = this;

            $('body').append(this.confirmDom());
            //icon图标
            var error = "<img src='"+this.imgUrl+"/erro.png'/>";
            $('#msTitle').html('系统信息');
            $('#msIcon').html(error);
            $('#msContent').html(msg);
            $('#msExplain').html('如果是请点击确定按钮 ，否则请点取消。');

            var tip = $("#tip");
            tip.css('display', 'block');
            $("#sure").click(function () {
                tip.css('display', 'none');
                //调用批量删除函数
                if (isAjax) {
                    self.delCheckboxes();
                }
            });
            $("#cancel").click(function () {
                tip.css('display', 'none');
            });
            $("#msClose").click(function () {
                tip.css('display', 'none');
            });
        },

        //confirm的Dom结构
        confirmDom: function () {
            var msBox = '<style type="text/css">' +
                '*{font-size:9pt;border:0;margin:0;padding:0; font-style:normal;}' +
                'body{font-family:"微软雅黑"; margin:0 auto;min-width:980px;}' +
                'dl,dt,dd,span{margin:0;padding:0;display:block;}' +
                'a,a:focus{text-decoration:none;color:#000;outline:none;blr:expression(this.onFocus=this.blur());}' +
                'a:hover{color:#00a4ac;text-decoration:none;}' +
                '.tip{width:485px; height:260px; position:absolute;top:10%; left:30%;background:#fcfdfd;box-shadow:1px 8px 10px 1px #9b9b9b;border-radius:1px;behavior:url('+this.imgUrl+'/pie.htc); z-index:111111; display:none;}' +
                '.tiptop{height:40px; line-height:40px; background:url('+this.imgUrl+'/tcbg.gif)  repeat-x; cursor:pointer;}' +
                '.tiptop span{font-size:14px; font-weight:bold; color:#fff;float:left; text-indent:20px; line-height:40px;}' +
                '.tiptop a{display:block; background:url('+this.imgUrl+'/close.png) no-repeat; width:22px; height:22px;float:right;margin-right:7px; margin-top:10px; cursor:pointer;}' +
                '.tiptop a:hover{background:url('+this.imgUrl+'/close1.png) no-repeat;}' +
                '.tipinfo{padding-top:30px;margin-left:65px; height:95px;}' +
                '.tipinfo span{width:95px; height:95px;float:left;}' +
                '.tipright{float:left;padding-top:15px; padding-left:10px;}' +
                '.tipright p{font-size:14px; font-weight:bold; line-height:35px;}' +
                '.tipright cite{color:#858686;}' +
                '.tipbtn{margin:0 auto; margin-top:25px;}' +
                '.sure ,.cancel{width:96px; height:35px; line-height:35px; color:#fff; background:url('+this.imgUrl+'/btnbg1.png) repeat-x; font-size:14px; font-weight:bold;border-radius: 3px; cursor:pointer;}' +
                '.sure{margin-left:125px;}' +
                '.cancel{background:url('+this.imgUrl+'/btnbg2.png) repeat-x;color:#000;font-weight:normal;}' +
                '</style>' +
                '<div class="tip" id="tip">' +
                '<div class="tiptop"><span id="msTitle">提示信息</span><a id="msClose"></a></div>' +
                '<div class="tipinfo">' +
                '<span id="msIcon"></span>' +
                '<div class="tipright">' +
                '<p id="msContent">是否确认对信息的修改 ？</p>' +
                '<cite id="msExplain">如果是请点击确定按钮 ，否则请点取消。</cite>' +
                '</div></div>' +
                '<div class="tipbtn" id="tipbtn">' +
                '<input name="" type="button" id="sure"  class="sure" value="确定" />&nbsp;' +
                '<input name="" type="button" id="cancel"  class="cancel" value="取消" />' +
                '</div></div>';
            return msBox;
        }
    };

    window['DelAll'] = DelAll;
})(jQuery);