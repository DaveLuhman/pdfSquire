import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
// express imports
import fileUpload from 'express-fileupload';
import flash from 'express-flash';
import session from 'express-session';
import helmet from 'helmet';
// handlebards imports
import { create } from 'express-handlebars'; // templating engine
import handlebarsHelpers from 'handlebars-helpers';
// db imports
import PocketBase from 'pocketbase';
// router imports
import { indexRouter } from './routes/index.routes.js';

const PORT = process.env.PORT || 5000;
dotenv.config({ path: './src/config/.env', debug: true }); // Load environment variables

const app = express();
// Morgan Logging in development
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
  console.info(
    '[INIT]>>>>> Morgan enabled for logging in this development environment'
  );
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        'script-src': ["'unsafe-inline'", "'self'"], // allow client-side inline scripting
        'script-src-attr': ["'unsafe-inline'"],
      },
    })
  ); // Allow inline scripts for development
}
// Handlebars Setup
const hbs = create({
  helpers: { handlebarsHelpers },
  extname: '.hbs',
  defaultLayout: 'main',
  partialsDir: ['./src/views/partials', './src/views/partials/modals'],
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
});
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', './src/views');
// Express Middleware
app.use(express.static('./src/public')); // Serve Static Files
app.use(express.static('./src/public')); // Serve Static Files
app.use(fileUpload());
app.use(express.json()); // JSON Body Parser
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded values
app.use('/', indexRouter); // Express index router
app.use((_req, res) => {
  res.status(404).render('error/404', { layout: 'public', title: '404' });
});

app.listen(PORT, () => {
  console.info(`[INIT] Server is running on port ${PORT}`);
});
