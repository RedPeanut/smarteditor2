const express = require("express");
const app = express();

app.use(express.static(__dirname));
app.post("/load", (req, res) => {
	res.send("/load is called...");
});
app.post("/download", (req, res) => {
	res.send("/download is called...");
});
app.listen(8080, () => console.log("Listening on port 8080!!!"));
