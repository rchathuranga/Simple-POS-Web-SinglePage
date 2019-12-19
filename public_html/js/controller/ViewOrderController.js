
function loadTotalOrderTable() {
    $('#totalOrder').children().remove();
    for (var order of orderTable) {
        var quary = "<tr>\n" +
            "<td>" + order.getCustomer().getId() + "</td>\n" +
            "<td>" + order.getCustomer().getName() + "</td>\n" +
            "<td>" + order.getId() + "</td>\n" +
            "<td>" + order.getNoOfItem() + "</td>\n" +
            "<td>" + order.getTotal() + "</td>\n" +
            "</tr>";
        $('#totalOrder').append(quary);
    }
    orderTableClickEvent();
}

$('#txtSearchOrders').on('keyup',function () {
    var search=$('#txtSearchOrders').val();
    searchOrders(search,$('#searchOrdersResult'));
    searchOrdersResultClickEvent();
});

$('#btnSearchOrders').on('click',function () {
    var search=$('#txtSearchOrders').val();
    searchOrders(search,$('#searchOrdersResult'));
    searchOrdersResultClickEvent();
});

let selectedOrder;
function orderTableClickEvent() {
    $('#totalOrder').children().on('click', function () {
        var orderId = $($(this).children()[2]).text();
        for (var order of orderTable) {
            if (order.getId() == orderId) {
                selectedOrder = order;
                setSelectedOrder(selectedOrder);
                break;
            }
        }
    });
}

function setSelectedOrder(order) {
    $('#customerId').text(order.getCustomer().getId());
    $('#customerName').text(order.getCustomer().getName());

    $('#tblOrderDetail').children().remove();
    for(var orderD of orderDetailsTable){
        if(orderD.getOrder().getId()==order.getId()){
            var quary="<tr>\n" +
                "<td>"+ orderD.getItem().getId() +"</td>\n" +
                "<td>"+ orderD.getItem().getDescription() +"</td>\n" +
                "<td>"+ orderD.getQty() +"</td>\n" +
                "<td>"+ orderD.getDiscount() +"</td>\n" +
                "<td>"+ orderD.getAmount() +"</td>\n" +
                "</tr>";
            $('#tblOrderDetail').append(quary);
        }
    }
    orderDetailTblClickEvent();
}

function searchOrdersResultClickEvent() {
    $('#searchOrdersResult').children().on('click',function () {
        var orderId = $($(this).children()[0]).text();
        for (var order of orderTable) {
            if (order.getId() == orderId) {
                selectedOrder = order;
                setSelectedOrder(selectedOrder);
                break;
            }
        }
    });
}

function orderDetailTblClickEvent() {
    $('#tblOrderDetail').children().on('click',function () {
        var itemId=$($(this).children()[0]).text();

        for(var item of itemTable){
            if(item.getId()==itemId){
                $($('#orderView').children()[0]).text(item.getDescription());
                $($('#orderView').children()[1]).text(item.getQty());
                $($('#orderView').children()[2]).text(item.getSellingPrice());
                break;
            }
        }
    });

}