# Bamazon

This is a Node.js App using MySQL that is an Amazon like store front.  
The first app, called bamazonCustomer.js will bring up the current inventory, taken from our database via MySQL.

![ScreenShot](screenshot1.jpg)

Using Inquirer, it will ask you which Item number you wish to purchase and how many you want to purchase.  When you answer, it will give you a total and update the current quantities and give you your total price.  It will then restart the purchase process.

![ScreenShot](screenshot2.jpg)

The second app, called bamazonManager.js will use Inquirer to bring up 4 options.  

The first option will let you see a current list of all items for sale.

![ScreenShot](screenshot3.jpg)

The second option will display items that are currently in short supply, IE less than 15 total.

![ScreenShot](screenshot4.jpg)

The third option will let you increase the amount of your inventory on hand.  You choose an item, and it will update the database and then show updated inventory.

![ScreenShot](screenshot5.jpg)

The final option will let you add a new item to the database.  You will be asked the name, department, price and quantity.  It will then add it to the database and then show the current inventory.

![ScreenShot](screenshot6.jpg)


I also used the Colors library to add a little color to it.  
