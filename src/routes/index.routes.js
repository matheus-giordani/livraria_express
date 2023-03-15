import express from "express"
import livrosRouter from "./livros.routes.js"
import autorRouter from "./autor.routes.js"

const routes = (app) => {
    app.route('/').get((req, res) => {
      res.status(200).send({titulo: "Curso de node"})
    })
  
    app.use(
      express.json(),
      livrosRouter,
      autorRouter
    )
  }
  
  export default routes