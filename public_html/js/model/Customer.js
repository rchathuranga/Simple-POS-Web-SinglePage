
function Customer(id, name, contact, address) {
    var _id=id;
    var _name=name;
    var _contact=contact;
    var _address=address;

    this.getId=function(){
        return _id;
    }
    this.getName=function(){
        return _name;
    }
    this.getContact=function(){
        return _contact;
    }
    this.getAddress=function () {
        return _address;
    }

    this.setId=function (id) {
        _id=id;
    }
    this.setName=function(name){
        _name=name;
    }
    this.setContact=function(contact){
        _contact=contact;
    }
    this.setAddress=function (address) {
        _address=address;
    }
}