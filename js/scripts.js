function Pizza(size, crust, cheese, hasSauce, sauce, meats, toppings) {
    this.size = size,
    this.crust = crust,
    this.cheese = cheese,
    this.hasSauce = hasSauce,
    this.sauce = sauce,
    this.meats = meats,
    this.toppings = toppings,
    this.price = 0,
    this.ingredientsDisplay = size + "'', " + crust.toLowerCase() + " crust," + (cheese ? " cheese,": " no cheese,") + (hasSauce ? (sauce + ", ") : " no sauce,") + (meats.length > 0 ? (meats.join(", ")  + ", "): " no meat, ") + (toppings.length > 0 ? toppings.join(", ") : " no toppings");
}

Pizza.prototype.calculatePrice = function() {

    switch (this.size) {
        case "10":
            this.price = 7.99;
            break;
        case "12":
            this.price = 10.99;
            break;
        case "14":
            this.price = 12.99;
            break;
    }

    switch (this.crust) {
        case "Handmade pan":
        case "Gluten free crust":
            this.price += 1.5;
            break;
    }

    var ingredients = 0;
    if (this.cheese) {
        ingredients += 1;
    }
    if (this.meats) {
        ingredients += this.meats.length;
    }
    if(this.toppings) {
        ingredients += this.toppings.length
    }

    if (ingredients > 1) {
        switch (this.size) {
            case "10":
                this.price += (ingredients-1)*1.09;
                break;
            case "12":
                this.price += (ingredients-1)*1.29;
                break;
            case "14":
                this.price += (ingredients-1)*1.59;
                break;
        }
    }
    return this.price.toFixed(2);
}

function Cart() {
    this.items = [],
    this.total = 0,
    this.ingredientsDisplay = ""
}

Cart.prototype.addItem = function(item, ingredientsDisplay) {
    this.items.push(item);
    this.total += item.price;
}

Cart.prototype.removeItem = function(index) {
    this.total -= this.items[index].price;
    this.items = this.items.slice(0, index).concat(this.items.slice(index+1));
}

$(document).ready(function() {
    let cart = new Cart;
    var pizza;

    $("#sizes").change(function() {
        switch (this.value) {
            case "10":
                $(".small").show()
                $(".medium").hide();
                $(".medium-large").hide();
                $(".large").hide();
                break;
            case "12":
                $(".small").hide();
                $(".medium").show();
                $(".medium-large").show();
                $(".large").hide();
                break;
            case "14":
                $(".small").hide();
                $(".medium").hide();
                $(".medium-large").show();
                $(".large").show();
                break;
        }
    })

    $("#sauce").change(function() {
        var chosenSauce = $(this).is(':checked');
        if (chosenSauce) {
            $(".sauces").slideDown();
        } else {
            $(".sauces").slideUp();
        }
    })

    $("#pizzaForm").submit(function(event) {
        event.preventDefault();
        var chosenSize = $("#sizes").val();
        var chosenCrust = $("#crusts").val();
        var chosenCheese = $("input:checkbox[name=cheese]").is(":checked");
        var hasSauce = $("input:checkbox[name=sauce]").is(":checked");
        var chosenSauce = "";
        if (hasSauce) {
            chosenSauce = $("input:radio[name=sauces]:checked").val();
        }
        var chosenMeats = [];
        $("input:checkbox[name=meats]:checked").each(function() {
            chosenMeats.push($(this).val());
        })
        var chosenToppings = [];
        $("input:checkbox[name=toppings]:checked").each(function() {
            chosenToppings.push($(this).val());
        });

        pizza = new Pizza(chosenSize, chosenCrust, chosenCheese,hasSauce,chosenSauce,chosenMeats,chosenToppings);
        var cost = pizza.calculatePrice();
        $("#finalCost").text(cost);
        $("#result").show();
        $("#orderButton").show();
        $("#sizeDisplay").text(chosenSize);
        $("#ingredientsDisplay").text(pizza.ingredientsDisplay); 
    });

    $("#cartButton").click (function() {
        $("#myCart").show();
    });

    $("#orderButton").click(function() {
        cart.addItem(pizza);
        $("#orderList").append(`<li>${pizza.ingredientsDisplay} - $${pizza.price.toFixed(2)}  <input type="checkbox" name="cart"><span class="checkbox-custom"></span></li>`);
        $("#total").text(cart.total.toFixed(2));
        $("#orderButton").hide();
        $("#result").hide();
        $("#finalCost").text(0);
    })

    // When the user clicks on <span> (x), close the modal
    $(".close").click(function() {
        $("#myCart").hide();
    });

    $("#checkoutButton").click(function() {
        window.location.reload();
    });

    $("#removeButton").click(function() {

        for (let i = $("input:checkbox[name=cart]").length-1; i >= 0; i--) {
            let item = $("input:checkbox[name=cart]")[i];
        
            if ($(item).is(":checked")) {
                $(item).parent().remove();
                cart.removeItem(i);
            }
        }

        $("#total").text(cart.total.toFixed(2));
    })


});
