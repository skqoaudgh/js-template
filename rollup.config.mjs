import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

export default {
	input: 'index.ts',
	output: {
		dir: 'dist',
		format: 'cjs',
	},
	plugins: [typescript({ target: 'es6' }), terser()],
};