import app from "./src/app.js";

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0' 


const server = app.listen(PORT,HOST, () => {
  console.log(`servidor escutando no link http://localhost:${PORT}`);
});


export default server 