import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
// import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import stylistic from '@stylistic/eslint-plugin';
import stylisticJs from '@stylistic/eslint-plugin-js';
import stylisticTs from '@stylistic/eslint-plugin-ts';

export default [
	{ languageOptions: { globals: globals.browser } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	// pluginReactConfig,
	{
		plugins: {
			'@stylistic': stylistic,
			'@stylistic/js': stylisticJs,
			'@stylistic/ts': stylisticTs,
		},
		rules: {
			// '@stylistic/js/max-len': ['error', { 'code': 80, 'tabWidth': 4 }],

			'@stylistic/indent': ['error', 'tab'],
			'@stylistic/jsx-indent': ['error', 'tab'],
			'@stylistic/ts/indent': ['error', 'tab'],

			'@stylistic/semi': ['error', 'always'],
			'@stylistic/semi-style': ['error', 'last'],
			'@stylistic/no-extra-semi': 'error',
			'@stylistic/semi-spacing': 'error',

			'@stylistic/quotes': ['error', 'single'],
			'@stylistic/jsx-quotes': ['error', 'prefer-double'],

			'@stylistic/comma-dangle': ['error', 'always-multiline'],
			'@stylistic/comma-spacing': ['error', { 'before': false, 'after': true }],

			'@stylistic/object-curly-spacing': ['error', 'always'],

			'@stylistic/arrow-parens': ['error', 'always'],

			'@stylistic/no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0, maxBOF: 0 }],
		},
	},
];
