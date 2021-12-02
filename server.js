const express = require('express');
const bodyParser = require('body-parser');
const crud = require('./server-mongoose.js');
const hbs = require('hbs');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'hbs');
app.use('/assets',express.static(__dirname + '/public'));

app.use((req,res,next)=>{
	console.log(req.headers);
	console.log(req.body);
	res.setHeader('Access-Control-Allow-Origin','*');
	res.setHeader('Access-Control-Allow-Headers','*');
	if(req.method=='OPTIONS'){
		res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE');
		return res.status(200).json({});
	}
	next();
});

app.get('/',(req,res)=>{
	res.render('view',{});
});

// retrieve all customer records
app.get('/customers',(req,res)=>{
	crud.findCustomer().then((result)=>{
		res.render('view',{customers: result});
	}).catch((err)=>{
		res.send(err);
	});
	//res.send("all customers records");
});

// retrieve the customer record with the given id
// app.get('/customers/:id',(req,res)=>{
	// crud.findCustomer({_id: req.params.id}).then((result)=>{
		// res.render('view',{results: result});
	// }).catch((err)=>{
		// res.send(err);
	// });
	// res.send(req.params.id+" customer records");
// });

// retrieve the customer record with the given name
app.get('/customers/:name',(req,res)=>{
	crud.findCustomer({FName: new RegExp(req.params.name, "ig")}).then((result)=>{
		res.render('view',{customers: result});
	}).catch((err)=>{
		res.send(err);
	});
	//res.send(req.params.id+" customer records");
});

// create a new customer record
app.post('/customers',(req,res)=>{
	crud.createCustomer(req.body).then((result)=>{
		res.send(result);
	}).catch((err)=>{
		res.send(err);
	});
	// res.send("create a customer record");
});

// update the customer record with given id
app.put('/customers/:id',(req,res)=>{
	crud.updateCustomer({_id: req.params.id},req.body).then((result)=>{
		res.send(result);
	}).catch((err)=>{
		res.send(err);
	});
	// res.send("update "+req.params.id+" customer record record");
});

// delete the customer record with given id
app.delete('/customers/:id',(req,res)=>{
	crud.deleteCustomer({_id: req.params.id}).then((result)=>{
		res.send(result);
	}).catch((err)=>{
		res.send(err);
	});
	// res.send("delete "+req.params.id+" customer record");
});




// retrieve all orders records
app.get('/orders',(req,res)=>{
	crud.findOrder().then((result)=>{
		res.send(result);
	}).catch((err)=>{
		res.send(err);
	});
	// res.send("all orders records");
});

// retrieve the order record with given id
app.get('/orders/:id',(req,res)=>{
	crud.findOrder({_id: req.params.id}).then((result)=>{
		res.send(result);
	}).catch((err)=>{
		res.send(err);
	});
	//res.send(req.params.id+" customer records");
});

// create a new order record
app.post('/orders',(req,res)=>{
	crud.createOrder(req.body).then((result)=>{
		res.send(result);
	}).catch((err)=>{
		res.send(err);
	});
	// res.send("create a customer record");
});

// update the order record with given id
app.put('/orders/:id',(req,res)=>{
	crud.updateOrder({_id: req.params.id},req.body).then((result)=>{
		res.send(result);
	}).catch((err)=>{
		res.send(err);
	});
	// res.send("update "+req.params.id+" customer record record");
});

// delete the order record with given id
app.delete('/orders/:id',(req,res)=>{
	crud.deleteOrder({_id: req.params.id}).then((result)=>{
		res.send(result);
	}).catch((err)=>{
		res.send(err);
	});
	// res.send("delete "+req.params.id+" customer record");
});




// retrieve all items records
app.get('/items',(req,res)=>{
	crud.findItem().then((result)=>{
		res.render('view',{items: result});
	}).catch((err)=>{
		res.send(err);
	});
	// res.send("all store items records");
});

// retrieve the item record with given id
app.get('/items/:manufacturer',(req,res)=>{
	crud.findItem({manufacturer: new RegExp(req.params.manufacturer, "ig")}).then((result)=>{
		res.render('view',{items: result});
	}).catch((err)=>{
		res.send(err);
	});
	//res.send(req.params.id+" customer records");
});

// create a new item record
app.post('/items',(req,res)=>{
	crud.createItem(req.body).then((result)=>{
		res.send(result);
	}).catch((err)=>{
		res.send(err);
	});
	// res.send("create a customer record");
});

// update the item record with given id
app.put('/items/:id',(req,res)=>{
	crud.updateItem({_id: req.params.id},req.body).then((result)=>{
		res.send(result);
	}).catch((err)=>{
		res.send(err);
	});
	// res.send("update "+req.params.id+" customer record record");
});

// delete the item record with given id
app.delete('/items/:id',(req,res)=>{
	crud.deleteItem({_id: req.params.id}).then((result)=>{
		res.send(result);
	}).catch((err)=>{
		res.send(err);
	});
	// res.send("delete "+req.params.id+" customer record");
});

app.listen(3000);