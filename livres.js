var puppeteer = require('puppeteer');
var readline = require('readline-sync');
var growl = require('growl');

var counting = 1;
var popup_count = 0;

async function livres(email, pass, hideBrowser, pricePerPage) {

	  const browser = await puppeteer.launch({headless: hideBrowser});
	  const page = await browser.newPage();

	  try {
	  	await page.goto('https://oauth.dsh-agency.com/');
	  } catch {
		console.log('\x1b[31m%s\x1b[0m', '!Authorisation error!');
		growl('There are some problems with autorisation...', { title: 'ERROR', name: 'Liv Res', image: 'C:/Users/User/search/livres1.png', sticky: true});
	  };

	  await page.setViewport({width: 1366, height: 768});

	  const login_selector = '#root > div > div.App__form-container > div > form > div:nth-child(1) > input';
	  const pass_selector = '#root > div > div.App__form-container > div > form > div:nth-child(2) > input';
	  const log_button_selector = '#root > div > div.App__form-container > div > form > div:nth-child(3) > button';

	  await page.waitFor(log_button_selector);

	  await page.click(login_selector);
	  await page.keyboard.type(email);

	  await page.click(pass_selector);
	  await page.keyboard.type(pass);

	  await page.click(log_button_selector);
	  const loginError = '#root > div > div.App__form-container > div > p.mess.mess--error';
	  try {
	  await page.waitFor(1000);
	  let loginErrorText = await page.evaluate((sel) => {
		    str = document.querySelector(sel).innerHTML;
	  return str;}, loginError);
	  if (loginErrorText == "Login or password is wrong") {
	  	console.log('\x1b[31m%s\x1b[0m', 'Wrong login or pass');
	  	growl('Wrong login or pass', { title: 'ERROR', name: 'Liv Res', image: 'C:/Users/User/search/livres1.png', sticky: true});
	  	await page.close();
	  	await start();
	  	return 'Error'
	  }
	 } catch (err) {
	 	console.log('\x1b[32m%s\x1b[0m', 'Success');

	 } 

	  await page.waitFor('#app > div:nth-child(1) > nav > div > ul > li:nth-child(1) > a');


	  console.log('\x1b[35m%s\x1b[0m','===============================================================================');
	  console.log("User " + '\x1b[32m%s\x1b[0m', email);
	  console.log('Loading...');
	  console.log('\x1b[35m%s\x1b[0m','===============================================================================');

		

    async function reload_livres() {

		  const reserve_button = '#app > div:nth-child(2) > div > div.order-tab > div.order-tab-container > section > div:nth-child(2) > div.order-tab-actions.row.vertical.space-between > div.col-4.ta-right > button.btn.btn-light.btn-md';

		  var orders = '#app > div:nth-child(2) > div > div > div.sticky-table > div.sticky-table-body';

		  await page.waitFor(5000);

		  let orders_num = await page.evaluate((sel) => {
		        return document.querySelector(sel).childElementCount;
		      }, orders);

		const subject_index = '#app > div:nth-child(2) > div > div > div.sticky-table > div.sticky-table-body > div:nth-child(INDEX) > div.col-6';
		const id_index = '#app > div:nth-child(2) > div > div > div.sticky-table > div.sticky-table-body > div:nth-child(INDEX) > div.col-5';
		const price_index = '#app > div:nth-child(2) > div > div > div.sticky-table > div.sticky-table-body > div:nth-child(INDEX) > div:nth-child(5) > span';
		const estimation_index = '#app > div:nth-child(2) > div > div > div.sticky-table > div.sticky-table-body > div:nth-child(INDEX) > div.col-2';

		let oops = await page.evaluate((sel) => {
		    str = document.querySelector(sel).innerHTML;
		    return str;
		}, orders);

		if (oops.slice(12, 27) == 'page-not-result'){
			console.log('\x1b[35m%s\x1b[0m','===============================================================================');
			console.log('\x1b[33m%s\x1b[0m', 'ATTEMPT: ' + counting + '. NO ORDERS, reloading will start in a minute');
			console.log('\x1b[35m%s\x1b[0m','===============================================================================');
			counting = counting + 1;
			await page.waitFor(60*1000);
			await page.reload();
			await reload_livres();
		} else {
			await console.log('\x1b[35m%s\x1b[0m','===============================================================================');
			await console.log('\x1b[33m%s\x1b[0m', 'ATTEMPT: ' + counting + '. The number of available orders is ' + orders_num)
			counting = counting + 1;
			popup_count = popup_count + 1; 
			await console.log('\x1b[33m%s\x1b[0m', '_______________________________________________________________________________');
		};

				for (let i = 1; i <= orders_num; i++) {
					let id_iterator = id_index.replace("INDEX", i);
					let subject_iterator = subject_index.replace("INDEX", i);
				    let price_iterator = price_index.replace("INDEX", i);
				    let estimation_iterator = estimation_index.replace("INDEX", i);

/*
				    if (popup_count == 1 && i == 1) {
				    	if (hideBrowser == false){
					    	console.log('\x1b[33m%s\x1b[0m', 'Getting rid of the pop up notifications');
				    		console.log('\x1b[33m%s\x1b[0m', '_______________________________________________________________________________');			    		
				    	};
				    	await page.click(subject_iterator);
						await page.waitFor(7000);
						await page.click(subject_iterator);
						await page.waitFor(10000);
				    };
*/
				    let id = await page.evaluate((sel) => {
				        str = document.querySelector(sel).innerHTML;
				        var regex = /\>(.*?)\</g;
				        temp = regex.exec(str)[1]; 
				        return temp.replace('-', '+');
				    }, id_iterator);

				    let subject = await page.evaluate((sel) => {
				        str = document.querySelector(sel).innerHTML;
				        return str;
				    }, subject_iterator);

				    let price = await page.evaluate((sel) => {
				        str = document.querySelector(sel).innerHTML;
				        temp = str.slice(69);
				        return Number(temp.slice(0, -20));
				    }, price_iterator);

				    let estimation = await page.evaluate((sel) => {
				        str = document.querySelector(sel).innerHTML;
				        var temp;
				      if (str.slice(0,2) == '<a') {
				      	//complex orders


				      	return 'Complex';
				      } else if (str.length > 15) {
				        	var regex = /\>(.*?)\</;
				        	temp = regex.exec(str)[1];      
				    	    if (temp.slice(-5) == 'pages') {
				    	 			size = Number(temp.slice(0, -6));
				    	 			return size;
				    	 		} else if (temp.slice(-4) == 'page') {
				    	 			size = Number(temp.slice(0, -5));
				    	 			return size;
				    	 		} else if (temp.slice(-5) == 'words') {
				    	 			size = Number(temp.slice(0, -6));
				    	 			return size/300;
				    	 		} else if (temp.slice(-7) == 'minutes') {
				    	 			size = Number(temp.slice(0, -8));
				    	 			return size/60;
				    	 		} else if (temp.slice(-6) == 'slides') {
				    	 			size = Number(temp.slice(0, -7));
				    	 			return size/2;
				    	 		}
				    	 		else {
				    	 			return str;
				    	 		}
					 	} else {
				      	 		if (str.slice(-5) == 'pages') {
				      	 			size = Number(str.slice(0, -6));
				      	 			return size;
				      	 		} else if (str.slice(-4) == 'page') {
				      	 			size = Number(str.slice(0, -5));
				      	 			return size;	 			
				      	 		}
				      	 		else if (str.slice(-5) == 'words') {
				      	 			size = Number(str.slice(0, -6));
				      	 			return size/300;
				      	 		} else if (str.slice(-7) == 'minutes') {
				      	 			size = Number(str.slice(0, -8));
				      	 			return size/60;
				      	 		} else if (str.slice(-6) == 'slides') {
				    	 			size = Number(str.slice(0, -7));
				    	 			return size/2;
				    	 		}
				      	 		else {
				      	 			return str;
				      	 		}

					 	};

				    }, estimation_iterator);

				    if ((price / estimation) >= pricePerPage) {
				    	console.log('\x1b[32m%s\x1b[0m', '#' + i);
					    console.log('\x1b[32m%s\x1b[0m', id);
					    console.log('\x1b[32m%s\x1b[0m', subject);
					    console.log('\x1b[32m%s\x1b[0m', 'Price ($): ' + price);
					    console.log('\x1b[32m%s\x1b[0m', 'Size (pages): ' + estimation);
					    console.log('\x1b[32m%s\x1b[0m', 'Price per page ($): ' + price / estimation);
					    console.log('\x1b[33m%s\x1b[0m', '_______________________________________________________________________________');
					    growl(id + ' | ' + subject + ' | $' + price, { title: 'Check the order', name: 'Liv Res', image: 'C:/Users/User/search/livres1.png'});
					} else {

					    console.log('#' + i);
					    console.log(id);
					    console.log(subject);
					    console.log('Price ($): ' + price);
					    console.log('Size (pages): ' + estimation);
					    console.log('Price per page ($): ' + price / estimation);
					    console.log('\x1b[33m%s\x1b[0m', '_______________________________________________________________________________');
				};
				      
				};


				  console.log('\x1b[33m%s\x1b[0m', 'reloading will start in a minute');
				  console.log('\x1b[35m%s\x1b[0m','==============================================================================='); 
				  await page.waitFor(60*1000);
				  await page.reload();
				  try {
				  	await reload_livres();
				  } catch (err){
					console.log('\x1b[31m%s\x1b[0m', '!Reloading error!');
					growl('There are some problems with RELOADING...', { title: 'ERROR', name: 'Liv Res', image: 'C:/Users/User/search/livres1.png', sticky: true});
				  };
				  
				};
			
				await reload_livres();
};

function start (){
	console.log('\x1b[35m%s\x1b[0m','===============================================================================');
	var newEmail = readline.question("Email: ");
	while ( newEmail == '') {
		console.log('\x1b[31m%s\x1b[0m', 'Enter your Email')
		newEmail = readline.question("Email: ");
	}
	var newPass = readline.question("Pass: ", {hideEchoBack: true, mask: '$'});
	while (newPass == '') {
		console.log('\x1b[31m%s\x1b[0m', 'Enter your password')
		newPass = readline.question("Pass: ", {hideEchoBack: true});
	}
	hideBrowser = true;
	let pricePerPage = readline.question("Min price per page: ");
	console.log('\x1b[35m%s\x1b[0m','===============================================================================');

	livres(newEmail, newPass, hideBrowser, pricePerPage = 8);
};

start ();

