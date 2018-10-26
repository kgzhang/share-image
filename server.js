// use express to server files
const express = require('express');
const morgan = require('morgan');
const ejs = require('ejs');
const cors = require('cors');
const puppeteer = require('puppeteer');
const app = express();

// app.engine('html', ejs.__express)

app.engine('html', ejs.__express);
app.set('view engine', 'html');
// app.set('view engine', 'ejs');
app.use(morgan('combined'));
app.use(express.static('dist'));
app.use(cors());

const http = require('http').Server(app);

const tags = [
	'最难留疤',
	'喝咖啡较多',
	'容易焦虑',
	'非常脆弱',
	'叶酸需求较高',
	'容易焦虑',
	'比较怕痛',
	'叶酸需求较高',
	'叶酸需求较高',
	'最难失眠',
	'最难留疤',
	'最难失眠',
	'叶酸需求较高'
];

const ancestries = [
	{
		name: '中国华北地区',
		percent: 0.3056,
		color: '#0086ff'
	},
	{
		name: '中国南方地区',
		percent: 0.1976,
		color: '#fd6603'
	},
	{
		name: '中国东北地区',
		percent: 0.15,
		color: '#0086ff'
	},
	{
		name: '中国西南地区',
		percent: 0.09,
		color: '#fd6603'
	},
	{
		name: '中国西北地区',
		percent: 0.0703,
		color: '#0086ff'
	},
	{
		name: '中国蒙古地区',
		percent: 0.0528,
		color: '#fd6603'
	}
];

app.get('/', (req, res) => {
	return 'hello'
});

app.get('/result', (req, res) => {
	res.render('result', { tags });
});

app.get('/ancestry', (req, res) => {
	res.render('ancestry', { locations: ancestries });
});

app.get('/detail', (req, res) => {
    res.render('detail');
});

app.get('/export/pdf', (req, res) => {
	(async () => {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();

		const template = req.query.name || 'result';

		await page.goto(`http://192.168.31.67:3000/${template}`, {
			waitUntil: 'networkidle2'
		});
		await page.setViewport({
			width: 375, // 320, 768, 1024, 1280'
			height: 718,
			deviceScaleFactor: 2
		});
		// const path = `screenshots/screen-${Date.now()}.png`
		const path = `screenshots/${template}.png`;

		await page.screenshot({
			path: `dist/${path}`,
			fullPage: true
		});

		res.type('application/json');
		res.send({
			path
		});
		browser.close();
	})();
});

app.get('/', (req, res) => {
	res.sendFile(__dirname, '/index.html');
});

const port = process.env.PORT || 3000;
http.listen(port, () => {
		console.log('Listening on:' + port);
	}
);
