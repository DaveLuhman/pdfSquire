import { Router } from 'express'

export const indexRouter = new Router()

// Render Public Landing Page
indexRouter.get('/', (_req, res) => {
  res.render('index', { layout: 'main.hbs' })
})

