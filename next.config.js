/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: "/nextjs-static-pages",
    output: "export",
    reactStrictMode: true,
    serverRuntimeConfig: {
        dbConfig: {
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: '2204', // @@@
            database: 'next-js-registration-login-example'
        },
        secret: process.env.JWT_PROTO_SECRET
    },
    publicRuntimeConfig: {
        apiUrl: process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000/api' // development api
            : process.env.SERVERLESS_PROTO_API
    }
}

module.exports = nextConfig
