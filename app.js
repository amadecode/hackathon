const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();

const hbs = exphbs.create({defaultLayout: 'main'});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res)=>{
	res.render("page-dashboard");
});


/*-------------------*/
app.get('/page-landing', (req, res)=>{
	res.render("page-landing", {layout:false});
});
app.get('/page-dashboard', (req, res)=>{
	res.render("page-dashboard");
});
app.get('/page-profile', (req, res)=>{
	res.render("page-profile");
});
app.get('/page-table', (req, res)=>{
	res.render("page-table");
});
app.get('/page-icon', (req, res)=>{
	res.render("page-icon");
});
app.get('/page-map', (req, res)=>{
	res.render("page-map");
});
app.get('/page-blank', (req, res)=>{
	res.render("page-blank");
});
app.get('/page-error404', (req, res)=>{
	res.render("page-error404", {layout:false});
});
/*-------------------*/

app.post('/send', (req, res) => {
	const output = `
		<p>You have a new contact request</p>
		<h3>Contact Details</h3>
		<ul>
			<li>Email: ${req.body.email}</li>
			<li>Message: ${req.body.message}</li>
		</ul>
	`;
	console.log(req.body);
	res.send(output);

	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth:{
			user: 'email@gmail.com',
			pass: 'password'
		}
	});

	let mailOptions = {
		from: 'from@gmail.com',
		to: 'to@gmail.com',
		subject: 'Test Nodemailer...',
		html: output
	};

	transporter.sendMail(mailOptions, (error, info)=>{
		if(error){
			return console.log(error);
		}
		else
			console.log(info);		
	});
});

app.listen(3000, ()=> {
	console.log('Server started...');
});


/*
	Ethreal
	auth:{
		user: 'v7vdnwwrknnirc76@ethereal.email',
		pass: '9etJNJdRXqxgneVupw'
	}

	NodeMailer + Gmail
	https://medium.com/@manojsinghnegi/sending-an-email-using-nodemailer-gmail-7cfa0712a799
*/