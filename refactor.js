#!/usr/bin/env node

const fs          = require('fs');
const _WHITESPACE = new Array(256).fill('    ').join('');


let buffer = fs.readFileSync('README.md');
let lines  = buffer.toString().split('\n').map(val => val.trim()).filter(val => val !== '');
let sizes  = [ 0, 0, 0 ];


lines.forEach(function(line) {

	let tmp = line.split('|').map(val => val.trim()).filter(val => val !== '');

	for (let t = 0, tl = tmp.length; t < tl; t++) {

		let size = sizes[t];
		if (size === undefined) {
			size = sizes[t] = 0;
		}

		sizes[t] = Math.max(tmp[t].length, size);

	}

});


let output = lines.map(function(line) {

	let tmp = line.split('|')
		.map(val => val.trim())
		.filter(val => val !== '')
		.map((val, t) => {

			let size = sizes[t];
			if (val.length < size) {
				return val + _WHITESPACE.substr(0, size - val.length);
			} else {
				return val;
			}

		});

	return ' | ' + tmp.join(' | ') + ' |';

}).join('\n');


fs.writeFileSync('README.md', output);

