var inquirer = require("inquirer");
var colors = require("colors");
var mysql = require("mysql");


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "Bamazon"
});

connection.connect(function(error) {
    if (error) throw error;
});

inquirer.prompt([{

    type: 'list',
    message: 'What would you like to do?',
    choices: ['Display Items for Sale', 'Display Low Inventory', 'Increase Inventory', 'Add New Items'],
    name: 'decision'

}]).then(function(manager) {
    switch (manager.decision) {

        case "Display Items for Sale":
            currentInventory();
            break;

        case "Display Low Inventory":
            lowInventory();
            break;

        case "Increase Inventory":
            inquirer.prompt([{

            	type: 'input',
            	message: 'What is the Product ID that you would like to increase?',
            	name: "itemId"
            },
            	{

            	type: 'input',
            	message: 'How many do you wish to add?',
            	name: 'amount'
            	
            }]).then(function(req) {
            	connection.query('SELECT * FROM products WHERE item_id=' + req.itemId, function(error, itemSelected) {
            		if (error) throw error;
            		console.log('Item added: ' .red + req.amount + " " + itemSelected[0].product_name.red);
            		connection.query('UPDATE products SET stock_quantity=? WHERE item_id=?', [itemSelected[0].stock_quantity + Number(req.amount), req.itemId],
            			function(error, inv) {
            				if (error) throw error;
            				currentInventory();
            		
            	});
            	});
            });
            
            	break;

			case "Add New Items":

			inquirer.prompt([{

				type: 'input',
				message: 'What is the name of the product you wish to add?',
				name: 'product_name'
			},{

				type: 'input',
				message: 'What department will your product be located in?',
				name: 'department_name'
			},{
				
				type: 'input',
				message: 'What price would you like to sell the product for?',
				name: 'price'
			},{

				type: 'input',
				message: 'How many of these items are you adding?',
				name: 'stock_quantity'
			}			
			]).then(function(newItem) {
				connection.query('INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?,?,?,?)',[newItem.product_name, newItem.department_name, newItem.price, newItem.stock_quantity],
					function(error, inventory) {
						if (error) throw error;
					console.log(newItem.product_name + " was added to the Store!");	
					});
					currentInventory();				
			});

}

    });


function currentInventory() {
    connection.query('SELECT * FROM products', function(error, inv) {
        if (error) throw error;
        console.log("Bamazon Inventory".red);
        for (var i = 0; i < inv.length; i++) {
            console.log("|-| Item Id: " + inv[i].item_id + "|-| Product: " + inv[i].product_name + "|-| Department: " + inv[i].department_name + "|-| Price: $" + inv[i].price + "|-| Amount on Hand: " + inv[i].stock_quantity);
        }
    process.exit("Thank you!");
    });
}

function lowInventory() {
    connection.query('SELECT * FROM products WHERE stock_quantity < 15', function(error, inventory) {
        if (error) throw error;
        console.log("Bamazon Inventory".green);
        for (var i = 0; i < inventory.length; i++) {
            console.log("Item Id: " + inventory[i].item_id + "\nProduct: " + inventory[i].product_name + "\nDepartment: " + inventory[i].department_name + "\nPrice: $" + inventory[i].price + "\nAmount on Hand: " + inventory[i].stock_quantity);
        }
      process.exit("Thank you!");
    });
}
