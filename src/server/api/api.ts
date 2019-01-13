import { Router } from 'express';
import EmailController from './../controllers/emailController';
import * as request from 'request';
import * as csrf from 'csurf';

var csrfProtection = csrf({ cookie: true });
let router;

export default () => {
    router = Router();

    router.post('/contact-form', csrfProtection, (req, res, next) => {
        let captureResponse = req.body['g-recaptcha-response'];
        request.post({ url: process.env.RECAPTURE_URL, form: { secret: process.env.RECAPTURE_SECRET, response: captureResponse } }, (err, httpResponse, body) => {
            let data = JSON.parse(body);
            if (!data.success) {
                res.status(500).json({ error: 'Invalid recapture, please confirm you are a human being', response: httpResponse, err: err });
            } else {
                EmailController.sendEmail(req.body.mail, req.body.subject, req.body.comment, (error, info) => {
                    res.status(200).json({ error: error, info: info });
                });
            }
        });
    });

    router.post('/test', (req, res, next) => {
        res.status(200).json('abcdefg');
    });

    return router;
}