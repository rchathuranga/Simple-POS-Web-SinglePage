
function Order(id,customer,no_of_item,total) {
    var _id=id;
    var _customer=customer;
    var _no_of_item=no_of_item;
    var _total=total;

    this.getId=function () {
        return _id;
    };

    this.getCustomer=function () {
        return _customer;
    };

    this.getNoOfItem=function () {
        return _no_of_item;
    };

    this.getTotal=function () {
        return _total;
    };

    this.setId=function (id) {
        _id=id;
    };

    this.setCustomer=function (customer) {
        _customer=customer;
    };


    this.setNoOfItem=function (no_of_item) {
        _no_of_item=no_of_item;
    };

    this.setTotal=function (total) {
        _total=total;
    };
}