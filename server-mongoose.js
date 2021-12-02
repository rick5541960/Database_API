const mongoose = require('mongoose');
var uri = "mongodb+srv://nodeuser:nodeuser@cluster0-kgjub.mongodb.net/assignment06?retryWrites=true&w=majority";
/*
mongoose.connect(uri,{
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(()=>{
	console.log("Successfully Connected to MongoDB");
}).catch((err)=>{
	console.log('Connection Error: '+err);
	process.exit();
});
*/

var customerSchema = new mongoose.Schema({
	Title: String,
	FName: String,
	LName: String,
	Mobile: String,
	Email: String,
	Home: {
		Line1: String,
		Line2: String,
		Town: String,
		CountyOrCity: String,
		Eircode: String
	},
	Shipping: {
		Line1: String,
		Line2: String,
		Town: String,
		CountyOrCity: String,
		Eircode: String
	}
});

var orderSchema = new mongoose.Schema({
	customerID: mongoose.Schema.Types.ObjectId,
	items: [mongoose.Schema.Types.ObjectId]
});

var itemSchema = new mongoose.Schema({
	model: String,
	manufacturer: String,
	price: Number
});

var customer = mongoose.model('Customer',customerSchema);
var order = mongoose.model('Order',orderSchema);
var item = mongoose.model('Store',itemSchema);

customer.on('save',(obj)=>{
	return new Promise((resolve,reject)=>{
		resolve(obj);
	});
});

order.on('save',(obj)=>{
	return new Promise((resolve,reject)=>{
		resolve(obj);
	});
});

item.on('save',(obj)=>{
	return new Promise((resolve,reject)=>{
		resolve(obj);
	});
});


/*
	CUSTOMER RECORDS CRUD FUNCTIONS
*/

exports.createCustomer = function(model){
	return new Promise((resolve,reject)=>{
		mongoose.connect(uri,{
			useNewUrlParser: true,
			useUnifiedTopology: true
		}).then(async()=>{
			console.log("Successfully Connected to MongoDB");
			await new customer(model).save().then((obj)=>{
				mongoose.connection.close();
				console.log(obj);
				console.log('Successfully Disconnected From MongoDB');
				resolve(obj);
			});		
		}).catch((err)=>{
			console.log('Connection Error: '+err);
			reject(err);
			process.exit();
		});
	});
}

exports.updateCustomer = function(conditions,updates){
	return new Promise((resolve,reject)=>{
		mongoose.connect(uri,{
			useNewUrlParser: true,
			useUnifiedTopology: true
		}).then(async()=>{
			console.log("Successfully Connected to MongoDB");
			await customer.updateMany(conditions,updates,(err,res)=>{
				if(err)throw err;
				mongoose.connection.close();
				console.log(res);
				console.log('Successfully Disconnected From MongoDB');
				resolve(res);
			});
		}).catch((err)=>{
			console.log('Connection Error: '+err);
			reject(err);
			process.exit();
		});
	});
}

exports.deleteCustomer = function(conditions){
	return new Promise((resolve,reject)=>{
		mongoose.connect(uri,{
			useNewUrlParser: true,
			useUnifiedTopology: true
		}).then(async()=>{
			console.log("Successfully Connected to MongoDB");
			await customer.find(conditions,(err,res)=>{
				if(err)throw err;
				res.forEach(async(ID)=>{
					await order.deleteMany({customerID: ID},(err,result)=>{
						if(err)throw err;
						console.log(result);
					});
				});
			});
			await customer.deleteMany(conditions,async(err,res)=>{
				if(err)throw err;
				mongoose.connection.close();
				console.log(res);
				console.log('Successfully Disconnected From MongoDB');
				resolve(res);
			});
		}).catch((err)=>{
			console.log('Connection Error: '+err);
			reject(err);
			process.exit();
		});
	});
}

exports.findCustomer = function(conditions){
	return new Promise((resolve,reject)=>{
		mongoose.connect(uri,{
			useNewUrlParser: true,
			useUnifiedTopology: true
		}).then(async()=>{
			console.log("Successfully Connected to MongoDB");
			await customer.find(conditions,(err,res)=>{
				if(err)throw err;
				mongoose.connection.close();
				console.log(res);
				console.log('Successfully Disconnected From MongoDB');
				resolve(res);
			});
		}).catch((err)=>{
			console.log('Connection Error: '+err);
			reject(err);
			process.exit();
		});
	});
}

/*
	STORE RECORDS CRUD FUNCTIONS
*/

exports.createItem = function(model){
	return new Promise((resolve,reject)=>{
		mongoose.connect(uri,{
			useNewUrlParser: true,
			useUnifiedTopology: true
		}).then(async()=>{
			console.log("Successfully Connected to MongoDB");
			await new item(model).save().then((obj)=>{
				mongoose.connection.close();	
				console.log(obj);
				console.log('Successfully Disconnected From MongoDB');
				resolve(obj);
			});
		}).catch((err)=>{
			console.log('Connection Error: '+err);
			reject(err);
			process.exit();
		});
	});
}


exports.updateItem = function(conditions,updates){
	return new Promise((resolve,reject)=>{
		mongoose.connect(uri,{
			useNewUrlParser: true,
			useUnifiedTopology: true
		}).then(async()=>{
			console.log("Successfully Connected to MongoDB");
			await item.updateMany(conditions,updates,(err,res)=>{
				if(err)throw err;
				mongoose.connection.close();
				console.log(res);
				console.log('Successfully Disconnected From MongoDB');
				resolve(res);
			});
		}).catch((err)=>{
			console.log('Connection Error: '+err);
			reject(err);
			process.exit();
		});
	});
}

exports.deleteItem = function(conditions){
	return new Promise((resolve,reject)=>{
		mongoose.connect(uri,{
			useNewUrlParser: true,
			useUnifiedTopology: true
		}).then(async()=>{
			console.log("Successfully Connected to MongoDB");
			await item.find(conditions,(err,res)=>{
				if(err)throw err;
				res.forEach(async(ID)=>{
					await order.deleteMany({items: ID},(err,result)=>{
						if(err)throw err;
						console.log(result);
					});
				});
			});
			await item.deleteMany(conditions,async(err,res)=>{
				if(err)throw err;
				mongoose.connection.close();
				console.log(res);
				console.log('Successfully Disconnected From MongoDB');
				resolve(res);
			});
		}).catch((err)=>{
			console.log('Connection Error: '+err);
			reject(err);
			process.exit();
		});
	});
}

exports.findItem = function(conditions){
	return new Promise((resolve,reject)=>{
		mongoose.connect(uri,{
			useNewUrlParser: true,
			useUnifiedTopology: true
		}).then(async()=>{
			console.log("Successfully Connected to MongoDB");
			await item.find(conditions,(err,res)=>{
				if(err)throw err;
				mongoose.connection.close();
				console.log(res);
				console.log('Successfully Disconnected From MongoDB');
				resolve(res);
			});
		}).catch((err)=>{
			console.log('Connection Error: '+err);
			reject(err);
			process.exit();
		});
	});
}

/*
	ORDER RECORDS CRUD FUNCTIONS
*/

exports.createOrder = function(model){
	return new Promise((resolve,reject)=>{
		mongoose.connect(uri,{
			useNewUrlParser: true,
			useUnifiedTopology: true
		}).then(async()=>{
			console.log("Successfully Connected to MongoDB");
			await new order(model).save().then((obj)=>{
				mongoose.connection.close();	
				console.log(obj);
				console.log('Successfully Disconnected From MongoDB');
				resolve(obj);
			});
		}).catch((err)=>{
			console.log('Connection Error: '+err);
			reject(obj);
			process.exit();
		});
	});
}

exports.updateOrder = function(conditions,updates){
	return new Promise((resolve,reject)=>{
		mongoose.connect(uri,{
			useNewUrlParser: true,
			useUnifiedTopology: true
		}).then(async()=>{
			console.log("Successfully Connected to MongoDB");
			await order.updateMany(conditions,updates,(err,res)=>{
				if(err)throw err;
				mongoose.connection.close();
				console.log(res);
				console.log('Successfully Disconnected From MongoDB');
				resolve(res);
			});
		}).catch((err)=>{
			console.log('Connection Error: '+err);
			reject(err);
			process.exit();
		});
	});
}

exports.deleteOrder = function(conditions){
	return new Promise((resolve,reject)=>{
		mongoose.connect(uri,{
			useNewUrlParser: true,
			useUnifiedTopology: true
		}).then(async()=>{
			console.log("Successfully Connected to MongoDB");
			await order.deleteMany(conditions,(err,res)=>{
				if(err)throw err;
				mongoose.connection.close();
				console.log(res);
				console.log('Successfully Disconnected From MongoDB');
				resolve(res);
			});
		}).catch((err)=>{
			console.log('Connection Error: '+err);
			reject(err);
			process.exit();
		});
	});
}

exports.findOrder = function(conditions){
	return new Promise((resolve,reject)=>{
		mongoose.connect(uri,{
			useNewUrlParser: true,
			useUnifiedTopology: true
		}).then(async()=>{
			console.log("Successfully Connected to MongoDB");
			await order.find(conditions,(err,res)=>{
				if(err)throw err;
				mongoose.connection.close();
				console.log(res);
				console.log('Successfully Disconnected From MongoDB');
				resolve(res);
			});
		}).catch((err)=>{
			console.log('Connection Error: '+err);
			reject(err);
			process.exit();
		});
	});
}