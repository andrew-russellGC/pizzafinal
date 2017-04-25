

let arr = [];


function createMenu() {
	var jqxhr=$.ajax("/getMenuItems")
	.done(function(docs) {
		for(doc of docs)
			arr.push(doc);
		showMenu();
	})
	.fail(function() {
		alert("Try Again!");
	})
}

function createCart() {
var jqxhr=$.ajax("/getMenuItems")
	.done(function(docs) {
		for(doc of docs)
			arr.push(doc);
		showCart()
	})
	.fail(function() {
		alert("Try Again!");
	})
}


function showMenu() {
	for (var item of arr) {
		pizzaDiv.innerHTML += `<div class="row">
			<div class="col-md-3 text-center">
				<h3>${item.name}</h3>
			</div> 
			<div class="col-md-3 text-center">
				<img src="./images/${item.img}" class="pizza" alt="Pepporoni Pizza"> <br> 
			</div>
			<div class="col-md-3 text-center">
				<h3>${item.price}</h3>
			</div> 
			<div class="col-md-3 text-center">
				<button class="btn btn-primary">Order</button>
			</div>
			</div>`;
	}

	registerButtonEvents();

	
}

function addToCart(pId) {
	let cartJ = localStorage.getItem("cart");
	let cart;
	if (cartJ ==null) 
		cart = [];
	else
		cart = cartJ.split(",");
	cart.push(pId);
	
	let number = localStorage.getItem("number");
	if (number == null)
		number = 0;
	document.getElementById("numItem").innerHTML = `${++number}`;
	localStorage.setItem("cart", cart.toString());
	localStorage.setItem("number",number);
}

function registerButtonEvents() {
	let buttons = document.getElementsByTagName("button");
	for(let i=0; i<arr.length; i++) {
		buttons[i].addEventListener("click", function () {
			addToCart(i);
		});
	}
	let number = localStorage.getItem("number");
	if (number == null)
		number = 0;
	document.getElementById("numItem").innerHTML = number;
}

function clearCart() {
	localStorage.removeItem("number");
	localStorage.removeItem("cart");
}

function showCart() {
	let cartJ = localStorage.getItem("cart");
	let info="";
	let item;
	let total=0;
	if (cartJ == null)
		document.getElementById("myCart").innerHTML="<h2>You have no items in the cart.</h2>";
	else{
		cart = cartJ.split(",");
		for (i in cart) {
			item = arr[cart[i]];
			if (cart.length != 0) 
				total += item.price;
			else
				total = 0;
			info += `<div class="row">
			<div class="col-md-3 text-center">
				<h3>${item.name}</h3>
			</div> 
			<div class="col-md-3 text-center">
				<img src="./images/${item.img}" class="pizza" alt="Pepporoni Pizza"> <br> 
			</div>
			<div class="col-md-3 text-center">
				<h3>${item.price}</h3>
			</div> 
			<div class="col-md-3 text-center">
				<button class="btn btn-primary" onclick="remove(${i});">remove</button>
			</div>
			</div>`;
		}
		total = total.toFixed(2);
		info += `<h3>Total: ${total}`;
		document.getElementById("myCart").innerHTML = info;
	}
	document.getElementById("numItem").innerHTML = localStorage.getItem("number");
}

function remove(i) {
	var cart = localStorage.getItem("cart");
	cart = cart.split(",");
	cart.splice(i,1);
	if (cart.length == 0)
		clearCart();
	else {
		localStorage.setItem("cart",cart);
		localStorage.setItem("number",cart.length);
		}
	showCart();
}


function sendOrder() {
	cartArr = JSON.parse("["+localStorage.getItem("cart")+"]");
	var itemIds=[];
	if (cartArr === null)
		document.getElementById("myCart").value="No item!";
	else
	{
		for (index of cartArr)
			itemIds.push(arr[index]._id);
		var phone=document.getElementById("phone").value;
		var order={"phone":phone, "itemIds":itemIds};
		$.ajax({
			method:"post",
			url:"processOrders",
			data: order
		})
		.done(function(result){
			$("#myCart").html("Your order has been placed!" + result);
			clearCart();
		})
	}
}

function submitUser() {
	username = document.getElementById("username").value;
	pwd = document.getElementById("password").value;
	var user = {"username":username, "pwd":pwd};
	$.ajax({
		method:"post",
		url:"signupServer",
		data: user
	})
	.done(function(result){
		if (result)
			$("#result").html("User Submitted");
		else
			$("#result").html("Username already taken. Please choose another.");
	})
}

function getSummary() {
	var jqxhr=$.ajax("/getOrders")
	.done(function(docs) {
		var total = 0;
		var numPizzas = 0;
		for(doc of docs) {
			numPizzas += doc.items.length;
			for (pizza of doc.items)
				total += pizza.price;
		}
		document.getElementById("numPizzas").innerHTML = "There were " + numPizzas + " pizzas sold today!";
		document.getElementById("total").innerHTML = "The total revenue for today was $"+total.toFixed(2);
	})
	.fail(function() {
		alert("Try Again!");
	})
}
