function Pizza(size, crust, cheese, hasSauce, sauce, meats, toppings) {
    this.size = size,
    this.crust = crust,
    this.cheese = cheese,
    this.hasSauce = hasSauce,
    this.sauce = sauce,
    this.meats = meats,
    this.toppings = toppings,
    this.price = 0
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

$(document).ready(function() {
    $("#sizes").change(function() {
        switch (this.value) {
            case "10":
                $(".small").css("display", "block");
                $(".medium").css("display", "none");
                $(".medium-large").css("display", "none");
                $(".large").css("display", "none");
                break;
            case "12":
                $(".small").css("display", "none");
                $(".medium").css("display", "block");
                $(".medium-large").css("display", "block");
                $(".large").css("display", "none");
                break;
            case "14":
                $(".small").css("display", "none");
                $(".medium").css("display", "none");
                $(".medium-large").css("display", "block");
                $(".large").css("display", "block");
                break;
        }
    })

    $("#sauce").change(function() {
        var chosenSauce = $(this).is(':checked');
        console.log(chosenSauce);
        if (chosenSauce) {
            $(".sauces").css("display", "block");
        } else {
            $(".sauces").css("display", "none");
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
        })

        var pizza = new Pizza(chosenSize, chosenCrust, chosenCheese,hasSauce,chosenSauce,chosenMeats,chosenToppings);
        var cost = pizza.calculatePrice();
        $("#finalCost").text(cost);
    })


});
