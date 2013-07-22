define([
    '../../masterpage/main',
    '../../../widget/css-render/main',
    'csstemplate!./default.css',
    'jquery'
], function (masterpage, cssRender, cssTxt, $) {
    $(function ($) {
        cssRender.append(cssTxt);

        var htmlStatus = '<select name="status">' + $('#plum-hide > select[name=status]').html() + '</select>',
            $frmStatus = $('#plum-admin-list-frm-status'),
            $frmDel = $('#plum-admin-list-frm-del');
        $('.plum-admin-list-status-feild').each(function () {
            var $td = $(this),
                txt = $td.html();
            $td.html(htmlStatus);
            $td.find('select > option').each(function () {
                var $option = $(this);
                if ($option.html() == txt) {
                    $td.find('select').val($option.val());
                    return false;
                }
            });
        });

        $frmStatus.find('input[name=url]').val(window.location.href);
        $frmDel.find('input[name=url]').val(window.location.href);

        $('.plum-admin-list-btn-status').each(function () {
            var $btn = $(this),
                $tr = $btn.parents('tr'),
                $id = $tr.find('.plum-admin-list-id-feild'),
                $status = $tr.find('.plum-admin-list-status-feild select');
            $btn.bind('click', function () {
                if (confirm('确定要 更改 订单 ' + $id.html() + ' 的状态为 \'' + $status.find('> option').eq($status.get(0).selectedIndex).html() + '\' 吗？')) {
                    $frmStatus.find('input[name=id]').val($id.html());
                    $frmStatus.find('input[name=status]').val($status.val());
                    $frmStatus.submit();
                }
            });
        });
        $('.plum-admin-list-btn-del').each(function () {
            var $btn = $(this),
                $tr = $btn.parents('tr'),
                $id = $tr.find('.plum-admin-list-id-feild');
            $btn.bind('click', function () {
                if (confirm('确定要 删除 订单 ' + $id.html() + ' 的记录吗？')) {
                    $frmDel.find('input[name=id]').val($id.html());
                    $frmDel.submit();
                }
            });
        });
    });
});