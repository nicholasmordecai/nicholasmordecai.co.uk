import { Router } from 'express';
import * as csrf  from 'csurf';

import Technologies from './../data/technologies';
import BlogPostController from './../controllers/blogPostController';
import Breadcrumb from './../middleware/breadcrumb';

var csrfProtection = csrf({ cookie: true });
let router;

export default () => {
    router = Router();
    router.use('/', Breadcrumb);

    router.get('/.well-known/apple-developer-domain-association.txt', (req, res, next) => {
        res.send(`MIIP6QYJKoZIhvcNAQcCoIIP2jCCD9YCAQExCzAJBgUrDgMCGgUAMH4GCSqGSIb3DQEHAaBxBG97
        InRlYW1JZCI6IlhTMzIzNFg4VkwiLCJkb21haW4iOiJhcHAtc2VydmljZS5tcnN3b3Jkc21pdGgu
        Y29tIiwiZGF0ZUNyZWF0ZWQiOiIyMDE5LTA5LTAyLDEwOjQ4OjM5IiwidmVyc2lvbiI6MX2gggyy
        MIID8zCCAtugAwIBAgIBFzANBgkqhkiG9w0BAQUFADBiMQswCQYDVQQGEwJVUzETMBEGA1UEChMK
        QXBwbGUgSW5jLjEmMCQGA1UECxMdQXBwbGUgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkxFjAUBgNV
        BAMTDUFwcGxlIFJvb3QgQ0EwHhcNMDcwNDEyMTc0MzI4WhcNMjIwNDEyMTc0MzI4WjB5MQswCQYD
        VQQGEwJVUzETMBEGA1UEChMKQXBwbGUgSW5jLjEmMCQGA1UECxMdQXBwbGUgQ2VydGlmaWNhdGlv
        biBBdXRob3JpdHkxLTArBgNVBAMTJEFwcGxlIGlQaG9uZSBDZXJ0aWZpY2F0aW9uIEF1dGhvcml0
        eTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKMevvBHwLSeEFtGpLghuE-GIXAoRWBc
        HMPICmRjiPv8ae74VPzpW7cGTgQvw2szr0RM6kuACbSH9lu0_WTds3LgE7P9F9m856jtwoxhwir5
        7M6lXtZp62QLjQiPuKBQRgncGeTlsJRtu_eZmMTom0FO1PFl4xtSetzoA9luHdoQVYakKVhJDOpH
        1xU0M_bAoERKcL4stSowN4wuFevR5GyXOFVWsTUrWOpEoyaF7shmSuTPifA9Y60p3q26WrPcpaOa
        pwlOgBY1ZaSFDWN7PmOK2n1KRuyjORg0ucYoZRi8E2Ccf1esFMmJ7aG2h2hStoROuMiD7PmeGauz
        wQuGx58CAwEAAaOBnDCBmTAOBgNVHQ8BAf8EBAMCAYYwDwYDVR0TAQH_BAUwAwEB_zAdBgNVHQ4E
        FgQU5zQqLiLeOWBrtJTOd4NhLzGgfDUwHwYDVR0jBBgwFoAUK9BpR5R2Cf70a40uQKb3R01_CF4w
        NgYDVR0fBC8wLTAroCmgJ4YlaHR0cDovL3d3dy5hcHBsZS5jb20vYXBwbGVjYS9yb290LmNybDAN
        BgkqhkiG9w0BAQUFAAOCAQEAHdHVe910TtcX_IItDJmbXkJy8mnc1WteDQxrSz57FCXes5TooPoP
        gInyFz0AAqKRkb50V9yvmp-hCn0wvgAqzCFZ6_1JrG51GeiaegPRhvbn9rAOS0n6o7dButfR41ah
        fYOrl674UUomwYVCEyaNA1RmEF5ghAUSMStrVMCgyEG8VB7nVK0TANJKx7vBiq-BCI7wRgq_J6a-
        3M85OoBwGSMyo2tmXZ5NqEdJsntFtVEzp3RnCU62bG9I9yy5MwVEa0W-dEtvsoaRtD4lKCWes8JR
        hvxP5a87qrtELAFJ4nSzNPpE7xTCEfItGRpRidMISkFsWFbemzrhBVflYs_SDzCCA_gwggLgoAMC
        AQICCD1yIOPPjPIlMA0GCSqGSIb3DQEBBQUAMHkxCzAJBgNVBAYTAlVTMRMwEQYDVQQKEwpBcHBs
        ZSBJbmMuMSYwJAYDVQQLEx1BcHBsZSBDZXJ0aWZpY2F0aW9uIEF1dGhvcml0eTEtMCsGA1UEAxMk
        QXBwbGUgaVBob25lIENlcnRpZmljYXRpb24gQXV0aG9yaXR5MB4XDTE0MDcxMTAxMzUyNVoXDTIy
        MDQxMjE3NDMyOFowWTELMAkGA1UEBhMCVVMxEzARBgNVBAoMCkFwcGxlIEluYy4xNTAzBgNVBAMM
        LEFwcGxlIGlQaG9uZSBPUyBQcm92aXNpb25pbmcgUHJvZmlsZSBTaWduaW5nMIIBIjANBgkqhkiG
        9w0BAQEFAAOCAQ8AMIIBCgKCAQEA59mawxejyekH1ceZpLR1IUwRA2gfMCwHnHeIMUjIRASNgc16
        xvjT9kccbU7uuuYUhXHE73mzS3XaaIWmc1WixodRe9ccgbUBauOMke56KvzPlV75caAofvmr1OHO
        Dk-V88rtt5UKMv8lmTb2mJ0ki2RXtvX9vkUh-a5EdrfqsDtpn21_ftcRm7LqQ6Ll_SZHzszEB-Ln
        dcbb_H4WtaSTxnyvPb3dwC-AeHY6TnzYZE8qJVGHQXYObuCTpCGqPl3KX6eLC0ClL7OzakrHxlO1
        H1wsioju5JAvn91SPhZBxjgeaCSPMS3baXHPoPNCGigRSnScptZ4SVgNxLwcW_E9ewIDAQABo4Gj
        MIGgMB0GA1UdDgQWBBSkXms7_HpHcpFwCcEkvS87yXugvjAMBgNVHRMBAf8EAjAAMB8GA1UdIwQY
        MBaAFOc0Ki4i3jlga7SUzneDYS8xoHw1MDAGA1UdHwQpMCcwJaAjoCGGH2h0dHA6Ly9jcmwuYXBw
        bGUuY29tL2lwaG9uZS5jcmwwCwYDVR0PBAQDAgeAMBEGCyqGSIb3Y2QGAgIBBAIFADANBgkqhkiG
        9w0BAQUFAAOCAQEAirZWTkHSsfMhQ50L2cf_tJhYme1BpzDx79vagG0htrNc3L6H8TkhvMSh2ibS
        7abx7cARlRmsR7gqDmmY1ObmzmvqIsErpwFuQUwsHeMjjIYno4wXnMwb7thkMw9EDos7SGITYlTT
        cU2SLYE6_6bLjlxDcWyIMyI8ID8deLn_Gioh6HNpz5uhoeE96QwXvKlz1-lSusK2H6EihT64XBqy
        mnufzMtQOv6Wx_xIR_Qkoq0-TPtK22ecA3EVJz-DUvuy9BkWqT6p7BTsXsIKp_NN0TCq1K24MqFQ
        L01VyEInrBzOcmTwLOAJ5Ey5CyA1N5zVC5HEMR3QK-Jcgr190P4ImTCCBLswggOjoAMCAQICAQIw
        DQYJKoZIhvcNAQEFBQAwYjELMAkGA1UEBhMCVVMxEzARBgNVBAoTCkFwcGxlIEluYy4xJjAkBgNV
        BAsTHUFwcGxlIENlcnRpZmljYXRpb24gQXV0aG9yaXR5MRYwFAYDVQQDEw1BcHBsZSBSb290IENB
        MB4XDTA2MDQyNTIxNDAzNloXDTM1MDIwOTIxNDAzNlowYjELMAkGA1UEBhMCVVMxEzARBgNVBAoT
        CkFwcGxlIEluYy4xJjAkBgNVBAsTHUFwcGxlIENlcnRpZmljYXRpb24gQXV0aG9yaXR5MRYwFAYD
        VQQDEw1BcHBsZSBSb290IENBMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5JGpCR-R
        2x5HUOsF7V55hC3rNqJXTFXsixmJ3vlLbPUHqyIwAugYPvhQCdN_QaiY-dHKZpwkaxHQo7vkGyrD
        H5WeegykR4tb1BY3M8vED03OFGnRyRly9V0O1X9fm_IlA7pVj01dDfFkNSMVSxVZHbOU9_acns9Q
        usFYUGePCLQg98usLCBvcLY_ATCMt0PPD5098ytJKBrI_s61uQ7ZXhzWyz21Oq30Dw4AkguxIRYu
        dNU8DdtiFqujcZJHU1XBry9Bs_j743DN5qNMRX4fTGtQlkGJxHRiCxCDQYczioGxMFjsWgQyjGiz
        jx3eZXP_Z15lvEnYdp8zFGWhd5TJLQIDAQABo4IBejCCAXYwDgYDVR0PAQH_BAQDAgEGMA8GA1Ud
        EwEB_wQFMAMBAf8wHQYDVR0OBBYEFCvQaUeUdgn-9GuNLkCm90dNfwheMB8GA1UdIwQYMBaAFCvQ
        aUeUdgn-9GuNLkCm90dNfwheMIIBEQYDVR0gBIIBCDCCAQQwggEABgkqhkiG92NkBQEwgfIwKgYI
        KwYBBQUHAgEWHmh0dHBzOi8vd3d3LmFwcGxlLmNvbS9hcHBsZWNhLzCBwwYIKwYBBQUHAgIwgbYa
        gbNSZWxpYW5jZSBvbiB0aGlzIGNlcnRpZmljYXRlIGJ5IGFueSBwYXJ0eSBhc3N1bWVzIGFjY2Vw
        dGFuY2Ugb2YgdGhlIHRoZW4gYXBwbGljYWJsZSBzdGFuZGFyZCB0ZXJtcyBhbmQgY29uZGl0aW9u
        cyBvZiB1c2UsIGNlcnRpZmljYXRlIHBvbGljeSBhbmQgY2VydGlmaWNhdGlvbiBwcmFjdGljZSBz
        dGF0ZW1lbnRzLjANBgkqhkiG9w0BAQUFAAOCAQEAXDaZTC14t-2Mm9zzd5vydtJ3ME_BH4WDhRuZ
        PUc38qmbQI4s1LGQEti-9HOb7tJkD8t5TzTYoj75eP9ryAfsfTmDi1Mg0zjEsb-aTwpr_yv8WacF
        CXwXQFYRHnTTt4sjO0ej1W8k4uvRt3DfD0XhJ8rxbXjt57UXF6jcfiI1yiXV2Q_Wa9SiJCMR96Gs
        j3OBYMYbWwkvkrL4REjwYDieFfU9JmcgijNq9w2Cz97roy_5U2pbZMBjM3f3OgcsVuvaDyEO2rpz
        GU-12TZ_wYdV2aeZuTJC-9jVcZ5-oVK3G72TQiQSKscPHbZNnF5jyEuAF1CqitXa5PzQCQc3sHV1
        ITGCAowwggKIAgEBMIGFMHkxCzAJBgNVBAYTAlVTMRMwEQYDVQQKEwpBcHBsZSBJbmMuMSYwJAYD
        VQQLEx1BcHBsZSBDZXJ0aWZpY2F0aW9uIEF1dGhvcml0eTEtMCsGA1UEAxMkQXBwbGUgaVBob25l
        IENlcnRpZmljYXRpb24gQXV0aG9yaXR5Agg9ciDjz4zyJTAJBgUrDgMCGgUAoIHcMBgGCSqGSIb3
        DQEJAzELBgkqhkiG9w0BBwEwHAYJKoZIhvcNAQkFMQ8XDTE5MDkwMjEwNDgzOVowIwYJKoZIhvcN
        AQkEMRYEFARl5KHKt44WckGzWuKYvuk_GYlaMCkGCSqGSIb3DQEJNDEcMBowCQYFKw4DAhoFAKEN
        BgkqhkiG9w0BAQEFADBSBgkqhkiG9w0BCQ8xRTBDMAoGCCqGSIb3DQMHMA4GCCqGSIb3DQMCAgIA
        gDANBggqhkiG9w0DAgIBQDAHBgUrDgMCBzANBggqhkiG9w0DAgIBKDANBgkqhkiG9w0BAQEFAASC
        AQB2JHAHwhhagAeUzbekCGSWCwVIe1l-4Lesv3RtYriSnhOE9NLyO4edJdFnwxao5XqP3tjyIdYr
        pfd2LYnWpVSaed4j4RtZK5wERXkI81m10SJQWoG9Qjh5UdI06lP_2dStu9lFSiRZksVVnqbdd_PJ
        vyPFp9pptWYKT6ja04tCDosb0_FkF_-cIpirfJQIxYWhmrBL1A_3xWdqX8PHGC0L2TJdvUoNqdom
        ygkfY_pi5yf_wRyxtfz846dHmVO2AfSH4dxmp7VtspQjCHvEQLqDbxRJrAjbzDnY1NKPb1z1Fa6Y
        wZQ-UKu0fxMcQfR7nr9yEihdnwaDF4-uQWm9RUv_`);
    });

    router.get('/', (req, res, next) => {
        res.render('pages/index', { home: true, title: 'Home'});
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