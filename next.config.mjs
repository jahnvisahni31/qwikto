/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: { // Optional, disable debugging in development
    },

    webpack: (config) => {
        const webpack = require('webpack');
        config.cache = {
        type: 'filesystem',
        buildDependencies: {
            config: [__filename],
        },
        cacheLocation: path.resolve(__dirname, '.next/cache/webpack'),
        };
        webpack.util.serialization.register('Warning', Warning, { /* serializer logic */ });
        return config;
    },

    webpack: (config) => {
        config.infrastructureLogging = { level: 'verbose' };
        return config;
    },

    plugins: {
        autoprefixer: {},
    },

    webpack: (config) => {
        config.cache = false; // Disable caching
        return config;
    },

      
};

export default nextConfig;
