let mix = require('laravel-mix');
let tailwindcss = require('tailwindcss');
require('laravel-mix-purgecss');

mix.sass('scss/main.scss', 'dist/styles/main.css')
	.options({
		processCssUrls: false,
		postCss: [ tailwindcss('./tailwind.js') ]
	})
    .purgeCss({
        extensions: ['html'],
        folders: ['views']
    });
