import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    alias: {
      core: './src/core',
      modules: './src/modules',
      ioc: './src/ioc',
    },
    include: ['**/*.{e2e,spec}.ts'],
    coverage: {
      reporter: ['html', 'text'],
      exclude: [
        ...configDefaults.exclude,
        '*.js',
        'src/**/{index,types,module}.ts',
        'build/*',
      ],
    },
  },
});
