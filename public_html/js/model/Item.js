
function Item(id,description,qty,brand,buyingPrice,sellingPrice){
    var _id=id;
    var _description=description;
    var _qty=qty;
    var _brand=brand;
    var _buyingPrice=buyingPrice;
    var _sellingPrice=sellingPrice;

    this.getId=function(){
        return _id;
    }

    this.getDescription=function(){
        return _description;
    }

    this.getBrand=function(){
        return _brand;
    }

    this.getBuyingPrice=function(){
        return _buyingPrice;
    }

    this.getSellingPrice=function(){
        return _sellingPrice;
    }

    this.getQty=function(){
        return _qty;
    }

    this.setId=function(id){
        _id=id;
    }

    this.setDescription=function(description){
        _description=description;
    }

    this.setBrand=function(brand){
        _brand=brand;
    }

    this.setQty=function(qty){
        _qty=qty;
    }

    this.setBuyingPrice=function(buyingPrice){
        _buyingPrice=buyingPrice;
    }

    this.setSellingPrice=function(sellingPrice){
        _sellingPrice=sellingPrice;
    }

}
