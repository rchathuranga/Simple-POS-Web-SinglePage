var cCount = 2;



let selectedCustomerId;
$('#btnDeleteCustomer').on('click', function () {
    for (let i = 0; i < customerTable.length; i++) {
        var customer = customerTable[i];
        if (selectedCustomerId == customer.getId()) {
            customerTable.splice(i, 1);
        }
    }
    loadCustomerTable();

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
        title: 'Customer Delete successfully'
    })
});

$('#btnUpdateCustomer').on('click', function () {
    let name = $('#customerUpdateForm>:nth-child(1)').val();
    let contact = $('#customerUpdateForm>:nth-child(2)').val();
    let address = $('#customerUpdateForm>:nth-child(3)').val();

    var regName = /^\D{0,}$/;
    var regContact = /^\d{10}$/;
    var regAddress = /[A-z0-9]{5,}/;
    if (regName.test(name) & (name.length != 0)) {
        $('#customerUpdateForm>:nth-child(1)').css('border-color', '#1c894a');
        if (regContact.test(contact)) {
            $('#customerUpdateForm>:nth-child(2)').css('border-color', '#1c894a');
            if (regAddress.test(address)) {
                $('#customerUpdateForm>:nth-child(3)').css('border-color', '#1c894a');

                for (let i = 0; i < customerTable.length; i++) {
                    var customer = customerTable[i];
                    if (selectedCustomerId == customer.getId()) {
                        customer.setName(name);
                        customer.setAddress(address);
                        customer.setContact(contact);
                    }
                }
                loadCustomerTable();
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
                    title: 'Customer Update successfully'
                })

            } else {
                $('#customerUpdateForm>:nth-child(3)').css('border-color', 'red');
                $('#customerUpdateForm>:nth-child(3)').focus();
            }
        } else {
            $('#customerUpdateForm>:nth-child(2)').css('border-color', 'red');
            $('#customerUpdateForm>:nth-child(2)').focus();
        }
    } else {
        $('#customerUpdateForm>:nth-child(1)').css('border-color', 'red');
        $('#customerUpdateForm>:nth-child(1)').focus();
    }

});

$('#btnCustomerSearch').on('click',function () {
    let search = $('#txtCustomerSearch').val();
    $('#searchCusResult').children().remove();
    searchCustomer(search,$('#searchCusResult'));
    // for (var s of customerTable) {
    //     if (s.getName().search(search) >= 0 || s.getId() == search) {
    //         var customerId = s.getId();
    //         var customer = s.getName();
    //         $('#searchCusResult').append("<div><h3>" + customerId + "</h3><h3>" + customer + "</h3></div>")
    //     }
    // }
    searchCusResultClickEvent();
});

$('#txtCustomerSearch').on('keyup', function () {
    let search = $('#txtCustomerSearch').val();
    $('#searchCusResult').children().remove();
    searchCustomer(search,$('#searchCusResult'));
    searchCusResultClickEvent();
});

function searchCusResultClickEvent() {
    $('#searchCusResult').children().on('click', function () {
        let customerId = $($(this).children()[0]).text();
        for (var customer of customerTable) {
            if (customer.getId() == customerId) {
                selectedCustomerId = customer.getId();
                $('#customerUpdateForm>:nth-child(1)').val(customer.getName());
                $('#customerUpdateForm>:nth-child(2)').val(customer.getContact());
                $('#customerUpdateForm>:nth-child(3)').val(customer.getAddress());
                break;
            }
        }
    });
}