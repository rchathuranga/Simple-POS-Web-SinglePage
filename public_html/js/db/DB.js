let itemTable = new Array();
let customerTable = new Array();
let orderTable = new Array();
let orderDetailsTable= new Array();

addingItemList();

function addingItemList() {
    var item1 = new Item(1, 'Iphone X', 10, 'Apple', 120000, 156000);
    var item2 = new Item(2, 'OnePlus 7 Pro', 10, 'OnePlus', 120000, 156000);
    var item3 = new Item(3, 'Galaxy S8', 10, 'Samsung', 120000, 156000);
    var item4 = new Item(4, 'Galaxy Note 10+', 10, 'Samsung', 120000, 156000);
    var item5 = new Item(5, 'Galaxy A8', 10, 'Samsung', 120000, 156000);
    var item6 = new Item(6, 'Nokia 8', 10, 'Nokia', 120000, 156000);
    var item7 = new Item(7, 'MI band 2', 10, 'Xiami', 120000, 156000);
    var item8 = new Item(8, 'Pixel 3 Xl', 10, 'Google', 120000, 156000);
    var item9 = new Item(8, 'Pixel 3 Xl', 10, 'Google', 120000, 156000);
    var item10 = new Item(8, 'Pixel 3 Xl', 10, 'Google', 120000, 156000);
    var item11 = new Item(8, 'Pixel 3 Xl', 10, 'Google', 120000, 156000);
    pushItem(item1);
    pushItem(item2);
    pushItem(item3);
    pushItem(item4);
    pushItem(item5);
    pushItem(item6);
    pushItem(item7);
    pushItem(item8);
    pushItem(item9);
    pushItem(item10);
    pushItem(item11);
}

var customer1 = new Customer(1, 'Ravindu', '0770180886', 'Horana');
var customer2 = new Customer(2, 'Alistor', '0770180886', 'Horana');
var customer3 = new Customer(3, 'Dilshan', '0770180886', 'Horana');
pushCustomer(customer1);
pushCustomer(customer2);
pushCustomer(customer3);

function loadItemTable() {
    $('#tblItems').children().remove();
    for (let i = 0; i < itemTable.length; i++) {
        let item = itemTable[i];
        var row = "<tr><td>" + item.getId() + "</td><td>" + item.getDescription() + "</td>" +
            "<td>" + item.getBrand() + "</td><td>" + item.getQty() + "</td><td>" + item.getBuyingPrice() + "</td>" +
            "<td>" + item.getSellingPrice() + "</td></tr>";
        $('#tblItems').append(row);
    }
    itemTableClickEvent();
}
function itemTableClickEvent() {
    $('#tblItems>tr').on('click', function () {
        selectedItemId = $($(this).children().get(0)).text();
        var name = $($(this).children().get(1)).text();
        var qty = $($(this).children().get(2)).text();
        var brand = $($(this).children().get(3)).text();
        var buying = $($(this).children().get(4)).text();
        var selling = $($(this).children().get(5)).text();

        $('#itemform>:nth-child(1)').val(name);
        $('#itemform>:nth-child(2)').val(brand);
        $('#itemform>:nth-child(3)').val(qty);
        $('#itemform>:nth-child(4)').val(buying);
        $('#itemform>:nth-child(5)').val(selling);
    });
}
function loadCustomerTable() {
    $('#tblCustomers').children().remove();
    for (let i = 0; i < customerTable.length; i++) {
        let customer = customerTable[i];
        var row = "<tr><td>" + customer.getId() + "</td><td>" + customer.getName() + "</td><td>" + customer.getContact() + "</td>" +
            "<td>" + customer.getAddress() + "</td></tr>";
        $('#tblCustomers').append(row);
    }
    customerTableClickEvent();
}
function customerTableClickEvent() {
    $('#tblCustomers').children().on('click', function () {
        selectedCustomerId = $($(this).children().get(0)).text();
        let name = $($(this).children().get(1)).text();
        let contact = $($(this).children().get(2)).text();
        let address = $($(this).children().get(3)).text();

        $('#customerUpdateForm>:nth-child(1)').val(name);
        $('#customerUpdateForm>:nth-child(2)').val(contact);
        $('#customerUpdateForm>:nth-child(3)').val(address);
    });
}


function pushItem(item) {
    itemTable.push(item);
    loadItemTable();
}
function pushCustomer(customer) {
    customerTable.push(customer);
    loadCustomerTable();
}
function pushOrder(order,itemList) {
    orderTable.push(order);
    loadTotalOrderTable();
    pushOrderDetails(itemList);
}
function pushOrderDetails(orderDetails) {
    orderDetailsTable=orderDetailsTable.concat(orderDetails);
}


function searchItem(input,loadId) {
    loadId.children().remove();
    for (var s of itemTable) {
        if (s.getDescription().search(input) >= 0 || s.getId() == input) {
            var item = s.getDescription();
            var itemID = s.getId();
            loadId.append("<div><h3>" + itemID + "</h3><h3>" + item + "</h3></div>")
            searchItemClickEvent();
        }
    }
}
function searchCustomer(input,loadId) {
    loadId.children().remove();
    for (var s of customerTable) {
        if (s.getName().search(input) >= 0 || s.getId() == input) {
            var customerId = s.getId();
            var customer = s.getName();
            loadId.append("<div><h3>" + customerId + "</h3><h3>" + customer + "</h3></div>")
            searchCustomerClickEvent();
        }
    }
}
function searchOrders(input,loadId) {
    loadId.children().remove();
    for (var order of orderTable) {
        if (input.search(order.getId()) || input==order.getId()) {
            var id = order.getId();
            var customerName = order.getCustomer().getName();
            var total=order.getTotal();
            loadId.append("<div><h3>" + id + "</h3><h3>" + customerName + "</h3><h3>"+ total +"</h3></div>")
            // searchCustomerClickEvent();
        }
    }
}