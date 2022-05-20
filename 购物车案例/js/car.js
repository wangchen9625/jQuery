$(function(){
    //1.全选按钮状态发生改变
    $('.allpick').change(function(){
        let status = $(this).prop('checked');
        // console.log(status);
        // $('.itemcheckbox').prop('checked',status);
        // $('.allpick').prop('checked',status);
        //两个class一起改,可以这么写
        $('.itemcheckbox, .allpick' ).prop('checked',status);
        setBgdColor();
        getSum();
    });
    $('.itemcheckbox').change(function(){
        console.log($('.itemcheckbox:checked'));
        if($('.itemcheckbox:checked').length == $('.itemcheckbox').length){
            $('.allpick').prop('checked',true);
        }else{
            $('.allpick').prop('checked',false);
        }
        setBgdColor();
        getSum();   
    })

    //+ 添加商品的数量
    $('.jia').click(function(){
        let pcs = $(this).siblings('input').val();
        pcs++;
        $(this).siblings('input').val(pcs);
        itemPayChange($(this));
        
    })
    //-减少商品的数量
    $('.jian').click(function(){
        let pcs = $(this).siblings('input').val();
        if(pcs >= 2){
            pcs--;
            $(this).siblings('input').val(pcs);
        }
        itemPayChange($(this));
    })
    //输入商品数量
    $('.pcsinput').change(function(){
        let n = parseInt($(this).val());
        if(isNaN(n) || n <= 0){
            alert("商品数量不正确");
            $(this).val(1);
            
        }
        itemPayChange($(this));
        
    })
    function itemPayChange(ele){
        let pirceele = ele.parent('.pcsop').siblings('.price');
        let price = pirceele.text().substr(1);
        let payele = ele.parent('.pcsop').siblings('.pay');
        let pcs;
        if(ele.attr('class') == 'pcsinput'){
            pcs = ele.val();
        }else{
            pcs = parseInt(ele.siblings('input').val());
        }
        payele.text('¥' + (price * pcs).toFixed(2));
        console.log(ele.parent('.pcsop').siblings('.itemcheckbox')[0].checked);
        if(ele.parent('.pcsop').siblings('.itemcheckbox').eq(0)[0].checked){
            console.log("changeite");
            getSum();
        }
    }
    function getSum(){
        console.log("getsum");
        let count = 0;
        let money = 0;
        // console.log($(".pcsop > input"));
        let pcslist = $(".itemcheckbox");
        pcslist.each(function(i,ele){
            if(ele.checked){
                let pcsop  = $(ele).siblings('.pcsop');
                count += parseInt(pcsop.children().eq(1).val());
                let pay = $(ele).siblings('.pay');
                // console.log(pay.text().substr(1));
                money += pay.text().substr(1) - 0;
            }
        });
        $('.pickcount i').text(' ' + count);
        $('.moneycount i').text(money.toFixed(2));
    }
    //初始化加载数据
    function initData(){
        $('.pcsinput').each(function(i,ele){
            itemPayChange($(ele));
        })
        getSum();
        setBgdColor();
    }
    initData();
    //2.通过小的按钮,确认全选按钮要不要勾上
    //删除操作
    $('.delitem').click(function(){
        $(this).parent('li').remove();
        if($(this).siblings('.itemcheckbox')[0].checked){
            getSum();
        }
        setBgdColor();
        
    })
    $('.clear_checked').click(function(){
        $('.info li').remove();
        getSum();
    })
    $('.del_allpick').click(function(){
        $('.itemcheckbox:checked').parent('li').remove();
        getSum();
    })
    function setBgdColor(){
        $('.itemcheckbox').each(function(i,domele){
            if($(domele).prop("checked")){
                $(domele).parents('li').addClass('item_pick_bgc');
            }else{
                $(domele).parents('li').removeClass('item_pick_bgc');
            }
        })
    }
})