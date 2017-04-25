//class declaration in JS
class Validation
{
	constructor(id, re, errorMsg)
	{
		this.id = id;
		this.re = re;
		this.errorMsg = errorMsg; //string to show the error msg
		this.nodeMsg = null; //an HTML node element to hold the node containing error msg
	}
	//in a class, functions don't need the keyword 'function' before the function name
	validate()
	{
		let input = this.id.value;
		let validResults = this.re.test(input);
		if(!validResults)
		{
			if(this.nodeMsg === null) //lets add the error message on screen
			{	
				this.id.style.backgroundColor = "red";
				//Use DOM to add a node to the HTML. This node is a 'p' element containing the error message
				this.nodeMsg = document.createElement("p"); 
				//p is HTML tag
				this.nodeMsg.textContent = this.errorMsg;
				let parent = document.getElementById("signup");
				parent.insertBefore(this.nodeMsg, this.id);
			}
		}
		else //validation passes
		{
			if(this.nodeMsg !== null) //we have some error message on the screen, need to clean it up
			{
				let parent = document.getElementById("signup");
				parent.removeChild(this.nodeMsg);
				this.id.style.backgroundColor = "white";
			}
		}
		return validResults;
	}
}

function validateEmail()
{
	let id = document.getElementById("email");
	//below, \S means anthing that is not whitespace
	//+ means the letter must appear at least once
	let re = /\S+@\S+.\S/;
	let v = new Validation(id, re, "Invalid Password");
	//blur: when the element loses focus
	id.addEventListener("blur", function(){
		return v.validate();
		//closure: the inside function can use any variables defined in its parent function (v for example)
	});
}

function validatePwd()
{
	let id = document.getElementById("pwd");
	//below, \S means anthing that is not whitespace
	//at least one upper, one lower, and one digit, and length greater than 8 
	let re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z].{8,})/;
	let v = new Validation(id, re, "Invalid Email");
	//blur: when the element loses focus
	id.addEventListener("blur", function(){
		return v.validate();
		//closure: the inside function can use any variables defined in its parent function (v for example)
	});
}