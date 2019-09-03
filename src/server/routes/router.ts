import { Router } from 'express';
import * as csrf from 'csurf';

import Technologies from './../data/technologies';
import BlogPostController from './../controllers/blogPostController';
import Breadcrumb from './../middleware/breadcrumb';

var csrfProtection = csrf({ cookie: true });
let router;

export default () => {
    router = Router();
    router.use('/', Breadcrumb);

    router.get('/callback', (req, res, next) => {
        console.log(req.params, req.body);
        res.status(200).end();
    });

    router.post('/callback', (req, res, next) => {
        console.log(req.params, req.body);
        res.status(200).end();
    });

    router.get('/.well-known/apple-developer-domain-association.txt', function (req, res) {
        res.setHeader('Content-disposition', 'attachment; filename=apple-developer-domain-association.txt');
        res.setHeader('Content-type', 'text/plain');
        res.charset = 'UTF-8';
res.write(`
MIIP4wYJKoZIhvcNAQcCoIIP1DCCD9ACAQExCzAJBgUrDgMCGgUAMHgGCSqGSIb3DQEHAaBrBGl7
InRlYW1JZCI6IlhTMzIzNFg4VkwiLCJkb21haW4iOiJuaWNob2xhc21vcmRlY2FpLmNvLnVrIiwi
ZGF0ZUNyZWF0ZWQiOiIyMDE5LTA5LTAzLDE1OjEwOjUxIiwidmVyc2lvbiI6MX2gggyyMIID8zCC
AtugAwIBAgIBFzANBgkqhkiG9w0BAQUFADBiMQswCQYDVQQGEwJVUzETMBEGA1UEChMKQXBwbGUg
SW5jLjEmMCQGA1UECxMdQXBwbGUgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkxFjAUBgNVBAMTDUFw
cGxlIFJvb3QgQ0EwHhcNMDcwNDEyMTc0MzI4WhcNMjIwNDEyMTc0MzI4WjB5MQswCQYDVQQGEwJV
UzETMBEGA1UEChMKQXBwbGUgSW5jLjEmMCQGA1UECxMdQXBwbGUgQ2VydGlmaWNhdGlvbiBBdXRo
b3JpdHkxLTArBgNVBAMTJEFwcGxlIGlQaG9uZSBDZXJ0aWZpY2F0aW9uIEF1dGhvcml0eTCCASIw
DQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKMevvBHwLSeEFtGpLghuE-GIXAoRWBcHMPICmRj
iPv8ae74VPzpW7cGTgQvw2szr0RM6kuACbSH9lu0_WTds3LgE7P9F9m856jtwoxhwir57M6lXtZp
62QLjQiPuKBQRgncGeTlsJRtu_eZmMTom0FO1PFl4xtSetzoA9luHdoQVYakKVhJDOpH1xU0M_bA
oERKcL4stSowN4wuFevR5GyXOFVWsTUrWOpEoyaF7shmSuTPifA9Y60p3q26WrPcpaOapwlOgBY1
ZaSFDWN7PmOK2n1KRuyjORg0ucYoZRi8E2Ccf1esFMmJ7aG2h2hStoROuMiD7PmeGauzwQuGx58C
AwEAAaOBnDCBmTAOBgNVHQ8BAf8EBAMCAYYwDwYDVR0TAQH_BAUwAwEB_zAdBgNVHQ4EFgQU5zQq
LiLeOWBrtJTOd4NhLzGgfDUwHwYDVR0jBBgwFoAUK9BpR5R2Cf70a40uQKb3R01_CF4wNgYDVR0f
BC8wLTAroCmgJ4YlaHR0cDovL3d3dy5hcHBsZS5jb20vYXBwbGVjYS9yb290LmNybDANBgkqhkiG
9w0BAQUFAAOCAQEAHdHVe910TtcX_IItDJmbXkJy8mnc1WteDQxrSz57FCXes5TooPoPgInyFz0A
AqKRkb50V9yvmp-hCn0wvgAqzCFZ6_1JrG51GeiaegPRhvbn9rAOS0n6o7dButfR41ahfYOrl674
UUomwYVCEyaNA1RmEF5ghAUSMStrVMCgyEG8VB7nVK0TANJKx7vBiq-BCI7wRgq_J6a-3M85OoBw
GSMyo2tmXZ5NqEdJsntFtVEzp3RnCU62bG9I9yy5MwVEa0W-dEtvsoaRtD4lKCWes8JRhvxP5a87
qrtELAFJ4nSzNPpE7xTCEfItGRpRidMISkFsWFbemzrhBVflYs_SDzCCA_gwggLgoAMCAQICCD1y
IOPPjPIlMA0GCSqGSIb3DQEBBQUAMHkxCzAJBgNVBAYTAlVTMRMwEQYDVQQKEwpBcHBsZSBJbmMu
MSYwJAYDVQQLEx1BcHBsZSBDZXJ0aWZpY2F0aW9uIEF1dGhvcml0eTEtMCsGA1UEAxMkQXBwbGUg
aVBob25lIENlcnRpZmljYXRpb24gQXV0aG9yaXR5MB4XDTE0MDcxMTAxMzUyNVoXDTIyMDQxMjE3
NDMyOFowWTELMAkGA1UEBhMCVVMxEzARBgNVBAoMCkFwcGxlIEluYy4xNTAzBgNVBAMMLEFwcGxl
IGlQaG9uZSBPUyBQcm92aXNpb25pbmcgUHJvZmlsZSBTaWduaW5nMIIBIjANBgkqhkiG9w0BAQEF
AAOCAQ8AMIIBCgKCAQEA59mawxejyekH1ceZpLR1IUwRA2gfMCwHnHeIMUjIRASNgc16xvjT9kcc
bU7uuuYUhXHE73mzS3XaaIWmc1WixodRe9ccgbUBauOMke56KvzPlV75caAofvmr1OHODk-V88rt
t5UKMv8lmTb2mJ0ki2RXtvX9vkUh-a5EdrfqsDtpn21_ftcRm7LqQ6Ll_SZHzszEB-Lndcbb_H4W
taSTxnyvPb3dwC-AeHY6TnzYZE8qJVGHQXYObuCTpCGqPl3KX6eLC0ClL7OzakrHxlO1H1wsioju
5JAvn91SPhZBxjgeaCSPMS3baXHPoPNCGigRSnScptZ4SVgNxLwcW_E9ewIDAQABo4GjMIGgMB0G
A1UdDgQWBBSkXms7_HpHcpFwCcEkvS87yXugvjAMBgNVHRMBAf8EAjAAMB8GA1UdIwQYMBaAFOc0
Ki4i3jlga7SUzneDYS8xoHw1MDAGA1UdHwQpMCcwJaAjoCGGH2h0dHA6Ly9jcmwuYXBwbGUuY29t
L2lwaG9uZS5jcmwwCwYDVR0PBAQDAgeAMBEGCyqGSIb3Y2QGAgIBBAIFADANBgkqhkiG9w0BAQUF
AAOCAQEAirZWTkHSsfMhQ50L2cf_tJhYme1BpzDx79vagG0htrNc3L6H8TkhvMSh2ibS7abx7cAR
lRmsR7gqDmmY1ObmzmvqIsErpwFuQUwsHeMjjIYno4wXnMwb7thkMw9EDos7SGITYlTTcU2SLYE6
_6bLjlxDcWyIMyI8ID8deLn_Gioh6HNpz5uhoeE96QwXvKlz1-lSusK2H6EihT64XBqymnufzMtQ
Ov6Wx_xIR_Qkoq0-TPtK22ecA3EVJz-DUvuy9BkWqT6p7BTsXsIKp_NN0TCq1K24MqFQL01VyEIn
rBzOcmTwLOAJ5Ey5CyA1N5zVC5HEMR3QK-Jcgr190P4ImTCCBLswggOjoAMCAQICAQIwDQYJKoZI
hvcNAQEFBQAwYjELMAkGA1UEBhMCVVMxEzARBgNVBAoTCkFwcGxlIEluYy4xJjAkBgNVBAsTHUFw
cGxlIENlcnRpZmljYXRpb24gQXV0aG9yaXR5MRYwFAYDVQQDEw1BcHBsZSBSb290IENBMB4XDTA2
MDQyNTIxNDAzNloXDTM1MDIwOTIxNDAzNlowYjELMAkGA1UEBhMCVVMxEzARBgNVBAoTCkFwcGxl
IEluYy4xJjAkBgNVBAsTHUFwcGxlIENlcnRpZmljYXRpb24gQXV0aG9yaXR5MRYwFAYDVQQDEw1B
cHBsZSBSb290IENBMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5JGpCR-R2x5HUOsF
7V55hC3rNqJXTFXsixmJ3vlLbPUHqyIwAugYPvhQCdN_QaiY-dHKZpwkaxHQo7vkGyrDH5Weegyk
R4tb1BY3M8vED03OFGnRyRly9V0O1X9fm_IlA7pVj01dDfFkNSMVSxVZHbOU9_acns9QusFYUGeP
CLQg98usLCBvcLY_ATCMt0PPD5098ytJKBrI_s61uQ7ZXhzWyz21Oq30Dw4AkguxIRYudNU8Ddti
FqujcZJHU1XBry9Bs_j743DN5qNMRX4fTGtQlkGJxHRiCxCDQYczioGxMFjsWgQyjGizjx3eZXP_
Z15lvEnYdp8zFGWhd5TJLQIDAQABo4IBejCCAXYwDgYDVR0PAQH_BAQDAgEGMA8GA1UdEwEB_wQF
MAMBAf8wHQYDVR0OBBYEFCvQaUeUdgn-9GuNLkCm90dNfwheMB8GA1UdIwQYMBaAFCvQaUeUdgn-
9GuNLkCm90dNfwheMIIBEQYDVR0gBIIBCDCCAQQwggEABgkqhkiG92NkBQEwgfIwKgYIKwYBBQUH
AgEWHmh0dHBzOi8vd3d3LmFwcGxlLmNvbS9hcHBsZWNhLzCBwwYIKwYBBQUHAgIwgbYagbNSZWxp
YW5jZSBvbiB0aGlzIGNlcnRpZmljYXRlIGJ5IGFueSBwYXJ0eSBhc3N1bWVzIGFjY2VwdGFuY2Ug
b2YgdGhlIHRoZW4gYXBwbGljYWJsZSBzdGFuZGFyZCB0ZXJtcyBhbmQgY29uZGl0aW9ucyBvZiB1
c2UsIGNlcnRpZmljYXRlIHBvbGljeSBhbmQgY2VydGlmaWNhdGlvbiBwcmFjdGljZSBzdGF0ZW1l
bnRzLjANBgkqhkiG9w0BAQUFAAOCAQEAXDaZTC14t-2Mm9zzd5vydtJ3ME_BH4WDhRuZPUc38qmb
QI4s1LGQEti-9HOb7tJkD8t5TzTYoj75eP9ryAfsfTmDi1Mg0zjEsb-aTwpr_yv8WacFCXwXQFYR
HnTTt4sjO0ej1W8k4uvRt3DfD0XhJ8rxbXjt57UXF6jcfiI1yiXV2Q_Wa9SiJCMR96Gsj3OBYMYb
WwkvkrL4REjwYDieFfU9JmcgijNq9w2Cz97roy_5U2pbZMBjM3f3OgcsVuvaDyEO2rpzGU-12TZ_
wYdV2aeZuTJC-9jVcZ5-oVK3G72TQiQSKscPHbZNnF5jyEuAF1CqitXa5PzQCQc3sHV1ITGCAoww
ggKIAgEBMIGFMHkxCzAJBgNVBAYTAlVTMRMwEQYDVQQKEwpBcHBsZSBJbmMuMSYwJAYDVQQLEx1B
cHBsZSBDZXJ0aWZpY2F0aW9uIEF1dGhvcml0eTEtMCsGA1UEAxMkQXBwbGUgaVBob25lIENlcnRp
ZmljYXRpb24gQXV0aG9yaXR5Agg9ciDjz4zyJTAJBgUrDgMCGgUAoIHcMBgGCSqGSIb3DQEJAzEL
BgkqhkiG9w0BBwEwHAYJKoZIhvcNAQkFMQ8XDTE5MDkwMzE1MTA1MVowIwYJKoZIhvcNAQkEMRYE
FJTDoTBzzkflSmam7pBMmGJy6Z6OMCkGCSqGSIb3DQEJNDEcMBowCQYFKw4DAhoFAKENBgkqhkiG
9w0BAQEFADBSBgkqhkiG9w0BCQ8xRTBDMAoGCCqGSIb3DQMHMA4GCCqGSIb3DQMCAgIAgDANBggq
hkiG9w0DAgIBQDAHBgUrDgMCBzANBggqhkiG9w0DAgIBKDANBgkqhkiG9w0BAQEFAASCAQDfjPcp
uAeQb-7juXGhdZsrQXpo6rZ2BtyKB9yurMSuD-kLrzsTa-SaJ5l_FYEz0vKfPiix_y8wmZIp-Jwt
6yvEcO9X9wcFGCW953285efZ552zb6_cl6amg49bx0MAKyeSj2bwKc1nsyi7M2s9GCGxVx3iJeJW
HeuPZf3ilz3vC-b_BOOPJ9RENxmtWk9pg2U4zVMPNSmfSJtMF7qFsziaxQqEsTQ0EA6-AFb99SDN
eN23PyjYCtEgBZ97dmWvRY7KcwMfNlSHk_CJS-QEtTe9ZGABxyIy-QkbiYMWBAvkgXL9ghd43Zmq
RCaHR9_nYE6NU54uLjA6PZuFox7CWmun`);
        res.end();
    })

    router.get('/', (req, res, next) => {
        res.render('pages/index', { home: true, title: 'Home' });
    });

    router.get('/test', (req, res, next) => {
        res.render('pages/test', { layout: 'test', home: true });
    });

    router.get('/about', (req, res, next) => {
        res.render('pages/about', { about: true, title: 'About Me', path: req.breadcrumbs });
    });

    router.get('/portfolio', (req, res, next) => {
        res.render('pages/portfolio', {
            portfolio: true,
            title: 'My Work',
            path: req.breadcrumbs,
            blogPost: BlogPostController.blogs
        });
    });

    router.get('/portfolio/:blogPostSlug', (req, res, next) => {
        let blogSlug = req.params.blogPostSlug;
        let blogData = BlogPostController.generateData(blogSlug);
        if (!blogData) {
            res.status(404).render('pages/404', { '404': true, title: '404 Not Found', slug: '404' });
            return;
        } else {
            res.render('pages/blog-single', {
                travels: true,
                title: blogData['title'],
                data: blogData,
                path: req.breadcrumbs
            });
        }
    });

    router.get('/technologies', (req, res, next) => {
        res.render('pages/technologies', {
            technologies: true,
            techs: Technologies.list,
            title: "Technologies I've used",
            path: req.breadcrumbs
        });
    });

    router.get('/contact', csrfProtection, (req, res, next) => {
        res.render('pages/contact', {
            contact: true,
            title: 'Contact Me',
            slug: 'Contact',
            csrfToken: req.csrfToken()
        });
    });

    // router.get('/about/music', (req, res, next) => {
    //     res.render('pages/music', {
    //         music: true,
    //         title: 'My Music',
    //         path: req.breadcrumbs
    //     });
    // });

    router.get('/about/photography', (req, res, next) => {
        res.render('pages/photography', {
            music: true,
            title: 'My Photography',
            path: req.breadcrumbs
        });
    });

    router.get('/about/travelling', (req, res, next) => {
        res.render('pages/travels', {
            travels: true,
            title: 'My Travels',
            path: req.breadcrumbs
        });
    });

    router.get('/about/programming', (req, res, next) => {
        res.render('pages/programming', {
            travels: true,
            title: 'My Travels',
            path: req.breadcrumbs
        });
    });

    router.get('/resume', (req, res, next) => {
        res.render('pages/resume', {
            resume: true,
            title: 'Resume',
            path: req.breadcrumbs
        });
    });

    return router;
}