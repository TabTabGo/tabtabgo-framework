const config = require('appsettings.json');
let envSettings = {};
if (process.env.NODE_ENV) {
    envSettings = config[process.env.NODE_ENV];
}
export const AppSettings = Object.assign(Object.assign({}, config['default']), envSettings);
