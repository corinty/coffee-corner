/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")(["reactive-qr"]);
module.exports = withTM({
    reactStrictMode: true,
});
