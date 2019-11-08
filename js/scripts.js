function Pizza(toppings, size) {
    this.toppings = toppings,
    this.size = size,
    this.price = 0
}

// Pizza.prototype.addTopping = function (topping) {
//     this.toppings.push(topping);
// }

// Pizza.prototype.changeSize = function (size) {
//     this.size = size;
// }

Pizza.prototype.calculatePrice = function() {
    console.log(this.toppings, this.size)
    return this.price
}


$(document).ready(function() {
    $("#pizzaForm").submit(function(event) {
        event.preventDefault();
        var chosenToppings = [];
        $("input:checkbox[name=toppings]:checked").each(function() {
            chosenToppings.push($(this).val());
        })
        var chosenSize = $("#sizes").val();
        var pizza = new Pizza(chosenToppings, chosenSize);
        pizza.calculatePrice();
    })


});
