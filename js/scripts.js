function Pizza() {
    this.toppings = [],
    this.size = 0
}

Pizza.prototype.addTopping = function (topping) {
    this.toppings.push(topping);
}

Pizza.prototype.changeSize = function (size) {
    this.size = size;
}

Pizza.prototype.calculatePrice = function() {
    var price = 0;
    return price
}


$(document).ready(function() {



});
