require('dotenv').config({ debug: true });

import * as fs from 'fs';
import * as express from 'express';
import * as hbs from 'express-hbs';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import * as http from 'http';
import * as https from 'https';

import MainRouter from './routes/router';
import APIRouter from './api/api';
import Error404 from './middleware/404';
import ErrorCSRF from './middleware/csrf';
import BlogPostController from './controllers/blogPostController';
import ErrorController from './controllers/errorController';

export default class Main {

    public static _app: express.Express;
    private _router: express.Router;
    private _hbs;

    constructor() {
        // create new instance of express
        Main._app = express();

        Main._app.use(helmet());

        ErrorController.init();
        BlogPostController.readJSONToCache();

        // setup the json parser middleware
        Main._app.use(bodyParser.urlencoded({ extended: true }));
        Main._app.use(bodyParser.json());

        Main._app.set('view engine', 'hbs');
        Main._app.set('views', __dirname + '/../views/');

        // configure views path
        Main._app.engine('hbs', hbs.express4({
            defaultLayout: __dirname + '/../views/layouts/main.hbs',
            partialsDir: __dirname + '/../views/partials',
            layoutsDir: __dirname + '/../views/layouts',
            extname: '.hbs'
        }));

        if (process.env.NODE_ENV === 'production') {
            Main._app.enable('view cache');
        }

        Main._app.use(compression());
        Main._app.use(cookieParser());

        // configure static path
        Main._app.use(express.static(__dirname + '/../website/public'));

        Main._app.use('/', MainRouter());
        Main._app.use('/api', APIRouter());

        // use the 404 custom middleware
        Main._app.use(Error404);
        Main._app.use(ErrorCSRF.handleError(Main._app));

        if (process.env.NODE_ENV === 'production') {
            console.log('in production')
            const privateKey = fs.readFileSync(process.env.PRIVATEKEY, 'utf8');
            const certificate = fs.readFileSync(process.env.CERT, 'utf8');
            const ca = fs.readFileSync(process.env.CA, 'utf8');

            const credentials = {
                key: privateKey,
                cert: certificate,
                ca: ca
            };

            var httpsServer = https.createServer(credentials, Main._app);

            httpsServer.listen(process.env.PORT);
            console.log('running httpson port:', process.env.PORT);
        } else {
            var httpServer = http.createServer(Main._app);

            httpServer.listen(process.env.PORT);
            console.log('--- DEV MODE --- running http on port:', process.env.PORT);
        }
    }
}

var server = new Main();

// here so supertest can access easily
module.exports = Main._app;