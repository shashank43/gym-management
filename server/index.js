import Express from "express";

const app = Express();
const PORT = 8000;

app.listen(PORT, () => {
    console.log(`app listening at http://localhost:${PORT}`);
})

app.get('/', (req, res) => {
    res.send('Hello, World!');
})