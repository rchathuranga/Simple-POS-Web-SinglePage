var count = itemTable.length + 1;
$('#btnAddItem').on('click', function () {
    var itemdesc = $('#itemform>:nth-child(1)').val();
    var qty = $('#itemform>:nth-child(2)').val();
    var brand = $('#itemform>:nth-child(3)').val();
    var buying = $('#itemform>:nth-child(4)').val();
    var selling = $('#itemform>:nth-child(5)').val();

    if(validateItem()) {
        resetTxt();
        var item = new Item(count++, itemdesc, qty, brand, buying, selling);
        pushItem(item);

        Swal.mixin({
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
            icon: 'success',
            title: 'Item Add successfully'
        })
    }
});

let selectedItemId;

function resetTxt() {
    $('#itemform>:nth-child(1)').val('');
    $('#itemform>:nth-child(2)').val("");
    $('#itemform>:nth-child(3)').val("");
    $('#itemform>:nth-child(4)').val("");
    $('#itemform>:nth-child(5)').val("");
}

$('#btnDeleteItem').on('click', function () {
    for (let i = 0; i < itemTable.length; i++) {
        var item = itemTable[i];
        if (item.getId() == selectedItemId) {
            itemTable.splice(i, 1);
        }
    }
    loadItemTable();

    Swal.mixin({
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
        icon: 'success',
        title: 'Item Delete successfully'
    })
});

$('#btnUpdateItem').on('click', function () {

    let desc = $('#itemform>:nth-child(1)').val();
    let qty = $('#itemform>:nth-child(2)').val();
    let brand = $('#itemform>:nth-child(3)').val();
    let buyingP = $('#itemform>:nth-child(4)').val();
    let sellingP = $('#itemform>:nth-child(5)').val();

    if(validateItem()) {
        for (let i = 0; i < itemTable.length; i++) {
            var item = itemTable[i];
            if (item.getId() == selectedItemId) {
                item.setDescription(desc);
                item.setQty(qty);
                item.setBrand(brand);
                item.setBuyingPrice(buyingP);
                item.setSellingPrice(sellingP);
            }
        }
        loadItemTable();

        Swal.mixin({
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
            icon: 'success',
            title: 'Item Update successfully'
        })
    }
});


$('#txtSearchItems').on('keyup', function () {
    let search = $('#txtSearchItems').val();
    searchItem(search, $('#searchItemsResult'));
    searchItemsResultClickEvent();
});

$('#btnSearchItems').on('click', function () {
    let search = $('#txtSearchItems').val();
    searchItem(search, $('#searchItemsResult'));
    searchItemsResultClickEvent();
});

function searchItemsResultClickEvent() {
    $('#searchItemsResult').children().on('click', function () {
        var itemId = ($($(this).children()[0]).text());
        for (var item of itemTable) {
            if (item.getId() == itemId) {
                selectedItemId = item.getId();
                $('#itemform>:nth-child(1)').val(item.getDescription());
                $('#itemform>:nth-child(2)').val(item.getQty());
                $('#itemform>:nth-child(3)').val(item.getBrand());
                $('#itemform>:nth-child(4)').val(item.getBuyingPrice());
                $('#itemform>:nth-child(5)').val(item.getSellingPrice());
                break;
            }
        }
    });
}


function validateItem() {
    let desc = $('#itemform>:nth-child(1)').val();
    let qty = $('#itemform>:nth-child(2)').val();
    let brand = $('#itemform>:nth-child(3)').val();
    let buyingP = $('#itemform>:nth-child(4)').val();
    let sellingP = $('#itemform>:nth-child(5)').val();

    var regDesc =/[A-z0-9]/;
    var regQty =/^[0-9]{1,}$/;
    var regBrand =/[A-z0-9]/;
    var regBuying =/^[0-9]{1,}$/;
    var regSelling =/^[0-9]{1,}$/;

    if(regDesc.test(desc)){
        $('#itemform>:nth-child(1)').css('border-color', '#1c894a');
        if(regQty.test(qty)){
            $('#itemform>:nth-child(2)').css('border-color', '#1c894a');

            if(regBrand.test(brand)){
                $('#itemform>:nth-child(3)').css('border-color', '#1c894a');

                if(regBuying.test(buyingP)){
                    $('#itemform>:nth-child(4)').css('border-color', '#1c894a');

                    if(regSelling.test(sellingP)){
                        $('#itemform>:nth-child(5)').css('border-color', '#1c894a');

                        if(+(buyingP)<+(sellingP)){
                            return true;
                        }else {
                            Swal.mixin({
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
                                title: 'Err: Buying Price Greater than Selling Price'
                            })
                        }
                    }else {
                        $('#itemform>:nth-child(5)').css('border-color', 'red');
                        $('#itemform>:nth-child(5)').focus();
                    }
                }else {
                    $('#itemform>:nth-child(4)').css('border-color', 'red');
                    $('#itemform>:nth-child(4)').focus();
                }
            }else {
                $('#itemform>:nth-child(3)').css('border-color', 'red');
                $('#itemform>:nth-child(3)').focus();
            }
        }else {
            $('#itemform>:nth-child(2)').css('border-color', 'red');
            $('#itemform>:nth-child(2)').focus();
        }
    }else {
        $('#itemform>:nth-child(1)').css('border-color', 'red');
        $('#itemform>:nth-child(1)').focus();
    }
    return false;
}