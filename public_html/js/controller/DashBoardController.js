
$(function () {
    hideAll();
    $('#dashboard').css('display', 'block');
    searchItemClickEvent();
});
function hideAll() {
    $('#dashboard').css('display', 'none');
    $('#POS').css('display', 'none');
    $('#item').css('display', 'none');
    $('#customer').css('display', 'none');
    $('#viewOrder').css('display', 'none');
}


function view(visible) {
    hideAll();
    visible.css('display','block');
}

$('#dashboardhtml').on('click',function (event) {
    view($('#dashboard'));
    $('#header').text('DashBoard');
    $('#CssIndex').attr('href',"css/dashboard/dashboard.css");
    $('#CssIndexMedia').attr('href',"css/dashboard/dashboard768media.css");
});

$('#manageCustomerhtml').on('click',function () {
    $('#header').text('Manage customer');
    view($('#customer'));
    $('#CssIndex').attr('href',"css/customer/CustomerStyle.css");
    $('#CssIndexMedia').attr('href',"css/customer/table768media.css");
});

$('#poshtml').on('click',function () {
    $('#header').text('P O S');
    view($('#POS'));
    $('#CssIndex').attr('href',"css/pos/style.css");
    $('#CssIndexMedia').attr('href',"css/pos/table768media.css");
});

$('#manageItemhtml').on('click',function () {
    $('#header').text('Manage item');
    view($('#item'));
    $('#CssIndex').attr('href',"css/item/ItemStyle.css");
    $('#CssIndexMedia').attr('href',"css/item/table768media.css");
});

$('#viewOrderhtml').on('click',function () {
    $('#header').text('View Orders');
    view($('#viewOrder'));
    $('#CssIndex').attr('href',"css/order/OrderStyle.css");
    $('#CssIndexMedia').attr('href',"css/order/table768media.css");
});

