const http = require('http');
const fs = require('fs');

http.get('http://jsonplaceholder.typicode.com/posts', (resp) => {
	let data = '';

	resp.on('data', (chunk) => {
		data += chunk;
	});

	resp.on('end', () => {
		if (fs.existsSync(`${__dirname}/results/post.json`)) {
			console.log('/results/post.json already exist');
			return true;
		}

		fs.mkdir(`${__dirname}/results`, { recursive: true }, (err) => {
			if (err) {
				throw err;
			}
			console.log('Folder successfully created');
		});

		fs.writeFile(`${__dirname}/results/post.json`, data, (err) => {
			if (err) {
				throw err;
			}
			console.log('File successfully written');
		});
	});
});