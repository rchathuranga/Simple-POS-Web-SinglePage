
function OrderDetails(id,order,item,qty,discount,amount) {
    var _id=id;
    var _order=order;
    var _item=item;
    var _qty=qty;
    var _discount=discount;
    var _amount=amount;

    this.getId=function () {
        return _id;
    };

    this.getOrder=function () {
        return _order;
    };

    this.getItem=function () {
        return _item;
    };

    this.getQty=function () {
        return _qty;
    };

    this.getDiscount=function () {
        return _discount;
    };

    this.getAmount=function () {
        return _amount;
    }

    this.setId=function (id) {
        _id=id;
    };

    this.setOrder=function (order) {
        _order=order;
    };

    this.setItem=function (item) {
        _item=item;
    };

    this.setQty=function (qty) {
        _qty=qty;
    };

    this.setDiscount=function (discount) {
        _discount=discount;
    };

    this.setAmount=function (amount) {
        _amount=amount;
    }
}