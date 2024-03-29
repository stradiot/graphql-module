module.exports = Object.freeze({
    port: Number(process.env.GRAPHQL_SERVER_PORT),
    certificatePath: process.env.CERTIFICATE_PATH,
    privateKeyPath: process.env.PRIVATE_KEY_PATH,
    user: process.env.BASIC_AUTH_USER,
    pass: process.env.BASIC_AUTH_PASS
});
