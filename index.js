const fetch = require('node-fetch');
const { format } = require('url');
const FormData = require('form-data');

const apiDomain = 'api.dny.wtf';
const apiProtocol = 'https';

class DNYWTF {
    constructor({ key, invisibleurl, randomdomain, showlink, domain }){
        this.key = key;
        this.domain = domain;
        this.invisibleurl = invisibleurl || false;
        this.randomdomain = randomdomain || false;
        this.showlink = showlink || false;
    }
    upload({image}){
        const form = new FormData();

        if(image instanceof Buffer)
            form.append('file', image.toString('binary'));

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
}

module.exports = DNYWTF
