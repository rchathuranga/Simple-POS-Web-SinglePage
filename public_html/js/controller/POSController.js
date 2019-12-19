// ============================================================================================================= ITEM ==

$('#btnSearchItem').on('click', function () {
    let search = $('#txtSearchItem').val();
    searchItem(search,$('#searchItemResult'));
});
$('#txtSearchItem').on('keyup', function (e) {
    let search = $('#txtSearchItem').val();
    searchItem(search,$('#searchItemResult'));
});

let selectedItem;
function searchItemClickEvent() {
    $('#searchItemResult').children().on('click', function () {
        let itemId = $($(this).children()[0]).text();
        for (var item of itemTable) {
            if (item.getId() == itemId) {
                selectedItem=item;
                setSelectedItem(item);
                break;
            }
        }
    });
}
function setSelectedItem(item) {
    if(item!=null) {
        for (let i = 1; i < 4; i++) {
            $('main>section:nth-child(1)>:nth-child(2)>:nth-child(4)>:nth-child(1)>:nth-child(' + i + ')').css({
                'background': '#009879',
                'color': 'white'
            });
            setTimeout(function () {
                $('main>section:nth-child(1)>:nth-child(2)>:nth-child(4)>:nth-child(1)>:nth-child(' + i + ')').css({
                    'background': '#F1F1F1',
                    'color': '#444444'
                });
            }, 500);
        }

        $('main>section:nth-child(1)>:nth-child(2)>:nth-child(4)>:nth-child(1)>:nth-child(1)').text(item.getDescription());
        $('main>section:nth-child(1)>:nth-child(2)>:nth-child(4)>:nth-child(1)>:nth-child(2)').text(item.getQty());
        $('main>section:nth-child(1)>:nth-child(2)>:nth-child(4)>:nth-child(1)>:nth-child(3)').text(item.getSellingPrice());
        $('#addItemToOrder>:nth-child(3)').text(item.getSellingPrice());
        calculateAmount();
    }else {
        $('main>section:nth-child(1)>:nth-child(2)>:nth-child(4)>:nth-child(1)>:nth-child(1)').text('Item');
        $('main>section:nth-child(1)>:nth-child(2)>:nth-child(4)>:nth-child(1)>:nth-child(2)').text('Stock');
        $('main>section:nth-child(1)>:nth-child(2)>:nth-child(4)>:nth-child(1)>:nth-child(3)').text('Price');
    }
}

// ============================================================================================================ ORDER ==

let itemList=new Array();
$('#addItemToOrder>button').on('click',function () {
    if(selectedItem!=null) {
        let qty = $('#addItemToOrder>:nth-child(1)').val();
        let discount = $('#addItemToOrder>:nth-child(2)').val();
        let amount = $('#addItemToOrder>:nth-child(3)').val();

        if(validateAddToItemList(qty,discount,amount)){
            checkSameItem(qty,discount,amount);
            for(var item of itemTable){
                if(selectedItem.getId()==item.getId()){
                    item.setQty((+(item.getQty())-qty));
                }
            }
            loadItemTable();
        }
    }else
        {
        $('#txtSearchItem').focus();
        Swal.mixin({
            customClass: {
                popup: 'popup-class',
                title: 'title-class',
                icon: 'icon-class',
            },
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
        }).fire({
            icon: 'warning',
            title: 'Please Select an Item'
        });
    }
});

function checkSameItem(qty,discount,amount) {
    var boolean=true;
    for(var orderD of itemList) {
        if (selectedItem.getId() == orderD.getItem().getId()) {
            addItemToList(orderD);
            boolean=false;
        }
    }
    if(boolean){
        itemList.push(new OrderDetails(itemList.length+1,null,selectedItem,qty,discount,amount));
    }
    loadOrderDetailsTable();
}

function addItemToList(orderD) {
    console.log(orderD.getItem().getDescription());
    var pQty=+(orderD.getQty());
    // console.log(pQty);
    var qty=+($('#addItemToOrder>:nth-child(1)').val());
    orderD.setQty(qty+pQty);
    orderD.setDiscount($('#addItemToOrder>:nth-child(2)').val());
    orderD.setAmount((+(orderD.getQty()*orderD.getItem().getSellingPrice()))-(+orderD.getDiscount()));
}

function validateAddToItemList(qty,discount,amount) {
    var regQty=/^[0-9]{1,}$/;
    var regDiscount=/^[0-9]{1,}$/;
    var regAmount=/^[0-9]{1,}$/;

    if(regQty.test(qty)){
        $('#addItemToOrder>:nth-child(1)').css('border-color','#1C894A');
        if(regDiscount.test(discount)){
            $('#addItemToOrder>:nth-child(2)').css('border-color','#1C894A');
            if(regAmount.test(amount)){
                $('#addItemToOrder>:nth-child(3)').css('border-color','#1C894A');
                return true;
            }else {
                $('#addItemToOrder>:nth-child(3)').css('border-color','red');
                $('#addItemToOrder>:nth-child(3)').focus();
            }
        }else {
            $('#addItemToOrder>:nth-child(2)').val("00");
            $('#addItemToOrder>:nth-child(2)').css('border-color','red');
            $('#addItemToOrder>:nth-child(2)').focus();
        }
    }else {
        $('#addItemToOrder>:nth-child(1)').css('border-color','red');
        $('#addItemToOrder>:nth-child(1)').focus();
    }
    return false;
}

function loadOrderDetailsTable(){
    $('#tblItemDetail').children().remove();
    let total=0.0;
    for(var detail of itemList) {
        total+=+(detail.getAmount());
        var quary = " <tr>\n" +
            "<td>" +detail.getId()+"</td>\n" +
            "<td>"+ detail.getItem().getDescription() +"</td>\n" +
            "<td>"+ detail.getQty() +"</td>\n" +
            "<td>"+ detail.getDiscount()+"</td>\n" +
            "<td>"+ detail.getAmount()+"</td>\n" +
            "</tr>"
        $('#tblItemDetail').append(quary);
    }
    $('#total').text(total);
}
let orderId=600000;
$('#placeOrder').on('click', function () {
    var order=new Order(orderId++,selectedCustomer,itemList.length,$('#total').text());

    if(selectedCustomer!=null) {
        if(itemList.length>0) {
            for (var detail of itemList) {
                detail.setOrder(order);
            }
            pushOrder(order, itemList);
            itemList = new Array();
            resetOrder();
            placeOrderAlert();
        }else
            {
            $('#txtSearchItem').focus();
            Swal.mixin({
                customClass: {
                    popup: 'popup-class',
                    title: 'title-class',
                    icon: 'icon-class',
                },
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                onOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer);
                    toast.addEventListener('mouseleave', Swal.resumeTimer);
                }
            }).fire({
                icon: 'warning',
                title: 'Please Add Item to List'
            });
        }
    }else
        {
        $('#txtSearchCustomer').focus();
        Swal.mixin({
            customClass: {
                popup: 'popup-class',
                title: 'title-class',
                icon: 'icon-class',
            },
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
        }).fire({
            icon: 'warning',
            title: 'Please Select a Customer'
        });
    }
});
function placeOrderAlert(){
    Swal.mixin({
        customClass: {
            popup: 'popup-class',
            title: 'title-class',
            icon: 'icon-class',
        }
    }).fire({
        grow: true,
        icon: 'success',
        title: 'Order Placed Successfully',
        position: 'bottom-end',
        width: 320,
        heightAuto: false,
        showConfirmButton: false,
        showCloseButton: true,
        focusConfirm: true,
        timer: 3000,
        timerProgressBar: true,
        onAfterClose: function () {
            // console.log("invoke in time of alert close");
        }
    });
}
function resetOrder(){
    selectedCustomer=null;
    setSelectedCustomer(selectedCustomer);
    itemList=new Array();
    selectedItem=null;
    setSelectedItem(selectedItem);
    loadOrderDetailsTable();

    $('#addItemToOrder>:nth-child(1)').val("1");
    $('#addItemToOrder>:nth-child(2)').val("00.00");
    $('#addItemToOrder>:nth-child(3)').val("00.00");
}
$('#btnResetPlaceOrder').click(function () {
    resetOrder();
});

// ========================================================================================================= CUSTOMER ==

let selectedCustomer;

function cusAddNotify(name) {
    Swal.mixin({
        customClass: {
            popup: 'popup-class',
            title: 'title-class',
            icon: 'icon-class',
        },
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    }).fire({
        icon: 'success',
        title: 'Customer ' + name + ' Added'
    });
}

$('#customerAddForm>button').on('click', function () {
    // $('#customerAddForm>button').off('click');
    var cName = $('#customerAddForm>:nth-child(1)').val();
    var contact = $('#customerAddForm>:nth-child(2)').val();
    var address = $('#customerAddForm>:nth-child(3)').val();

    var regName = /^\D{0,}$/;
    var regContact = /^\d{10}$/;
    var regAddress = /[A-z0-9]{5,}/;
    if (regName.test(cName) & (cName.length != 0)) {
        $('#customerAddForm>:nth-child(1)').css('border-color', '#1c894a');
        if (regContact.test(contact)) {
            $('#customerAddForm>:nth-child(2)').css('border-color', '#1c894a');
            if (regAddress.test(address)) {
                $('#customerAddForm>:nth-child(3)').css('border-color', '#1c894a');
                selectedCustomer = new Customer(cCount++, cName, contact, address);
                pushCustomer(selectedCustomer);
                resetCustomerAddTxt();
                setSelectedCustomer(selectedCustomer);
                cusAddNotify(cName);
            } else {
                $('#customerAddForm>:nth-child(3)').css('border-color', 'red');
                $('#customerAddForm>:nth-child(3)').focus();
            }
        } else {
            $('#customerAddForm>:nth-child(2)').css('border-color', 'red');
            $('#customerAddForm>:nth-child(2)').focus();
        }
    } else {
        $('#customerAddForm>:nth-child(1)').css('border-color', 'red');
        $('#customerAddForm>:nth-child(1)').focus();
    }
});

function resetCustomerAddTxt() {
    $('#customerAddForm>:nth-child(1)').val('');
    $('#customerAddForm>:nth-child(2)').val('');
    $('#customerAddForm>:nth-child(3)').val('');
}


$('#btnSearchCustomer').on('click', function () {
    let search = $('#txtSearchCustomer').val();
    searchCustomer(search,$('#searchCustomerResult'));
});
$('#txtSearchCustomer').on('keyup', function (e) {
    let search = $('#txtSearchCustomer').val();
    searchCustomer(search,$('#searchCustomerResult'));
});
function searchCustomerClickEvent() {
    $('#searchCustomerResult').children().on('click', function () {
        let customerId = $($(this).children()[0]).text();
        for (var customer of customerTable) {
            if (customer.getId() == customerId) {
                selectedCustomer=customer;
                setSelectedCustomer(selectedCustomer);
                break;
            }
        }
    });
}
function setSelectedCustomer(customer) {
    if(customer!=null) {
        $('main>section:nth-child(1)>:nth-child(2)>:nth-child(2)').css({
            'background':'#009879',
            'color':'white'
        });
        setTimeout(function () {
            $('main>section:nth-child(1)>:nth-child(2)>:nth-child(2)').css({
                'background':'#F1F1F1',
                'color':'#444444'
            });
        },700);
        $('#selectedCustomer').text(customer.getName());
    }else {
        $('#selectedCustomer').text("Customer Name");
    }
}

// ============================================================================================================ OTHER ==

$('#addItemToOrder>:nth-child(1)').on('keyup',function () {
    calculateAmount();
});
$('#addItemToOrder>:nth-child(2)').on('keyup',function () {
    calculateAmount();
});
function calculateAmount() {
    var qty = +($('#addItemToOrder>:nth-child(1)').val());
    var discount=+($('#addItemToOrder>:nth-child(2)').val());
    var total=(selectedItem.getSellingPrice()*qty)-discount;
    $('#addItemToOrder>:nth-child(3)').val(total);
}