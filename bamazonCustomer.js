var inquirer = require("inquirer");
var mysql = require("mysql");
var colors = require("colors");

var connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: "",
    database: 'Bamazon'
});

connection.connect(function(error) {
    if (error) throw error;
});

function displayInv() {
    connection.query('SELECT * FROM products', function(error, inv) {
        if (error) throw error;
        console.log('My Bamazon Inventory');
        for (var u = 0; u < inv.length; u++) {
            console.log("Item Id: " + inv[u].item_id + ' Product: ' + inv[u].product_name + ' Department: ' + inv[u].department_name + ' Price: ' + inv[u].price + ' Amount on Hand: ' + inv[u].stock_quantity);
        }

        inquirer.prompt([
        {

            type: "input",
            message: "What is the item number of the product you wish to purchase today?",
            name: 'id'
        }, {
            type: "input",
            message: "How many would you like to purchase?",
            name: 'quantity'

        }]).then(function(purchaseOrder) {
            var quantity = purchaseOrder.quantity;
            var itemId = purchaseOrder.id;
            connection.query('SELECT * FROM products WHERE item_id=' + itemId, function(error, itemInCart) {
            	if (error) throw error;
            	if (itemInCart[0].stock_quantity - quantity >= 0) {
            		console.log("Congratulations! Ted's Bamazon has enough of the item (".magenta + itemInCart[0].product_name + ")!".magenta);
            		console.log("Amount Avaliable for Purchase: ".red + itemInCart[0].stock_quantity);
            		console.log("Amount ordered: ".green + quantity);
            		console.log("The total amount due will be: $".yellow + (quantity * itemInCart[0].price));
            		console.log("Thank you for shopping at Ted's Bamazon today!  Have a wonderful day!");
            connection.query('UPDATE products SET stock_quantity=? WHERE item_id=?', [itemInCart[0].stock_quantity - quantity, itemId],
            	function(error, inv) {
            		if (error) throw error;
            		displayInv();
            	});
            } else {
            	console.log("I am sorry.  Insufficient quantity!");
            	console.log("Ted's Bamazon only has ".orange + itemInCart[0].stock_quantity + " " + itemInCart[0].product_name + "avaliable at this Time!".orange);
            	displayInv();
            }
           });
        });
    });
}
	displayInv();