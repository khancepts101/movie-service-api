import app from './app.js'

const port = Number.parseInt(process.env.PORT ?? "3000", 10);
if (!Number.isInteger(port)) {
    throw new Error("PORT must be a valid port number")
}

app.listen(port, () => {
    console.log(`Movie service listening on port ${port}`);
})