const fetch = require('node-fetch');
const { format } = require('url');
const { promisify } = require('util');
const FormData = require('form-data');

const apiDomain = 'api.clippy.gg';
const apiProtocol = 'https';

class Clippy {
    constructor({ key, invisibleurl, randomdomain, showlink, longurl, domain }){
        this.key = key;
        this.domain = domain;
        this.invisibleurl = invisibleurl || false;
        this.randomdomain = randomdomain || false;
        this.showlink = showlink || false;
        this.longurl = longurl || false;
    }
    async upload({image}){
        const form = new FormData();

        if(image instanceof Buffer)
            form.append(
                'file',
                image.toString('binary'),
                {
                    filename: 'file',
                    contentType: 'image/png',
                }
            );

        return fetch(
            format({
                protocol: apiProtocol,
                host: apiDomain,
                pathname: 'files',
            }),
            {
                method: 'POST',
                headers: {
                    key: this.key,
                    invisibleurl: this.invisibleurl,
                    randomdomain: this.randomdomain,
                    showlink: this.showlink,
                    domain: this.domain,
                },
                body: form,
            }
        )
        .then(res => res.json());
    }
    async shortener({ url, longurl, domain }){
        return fetch(
            format({
                protocol: apiProtocol,
                host: apiDomain,
                pathname: 'shortener',
            }),
            {
                method: 'POST',
                headers: {
                    key: this.key,
                    longurl: this.longurl,
                    domain: this.domain,
                },
                body: JSON.stringify({url: url}),
            }
        )
        .then(res => res.json());
    }
}

module.exports = Clippy
