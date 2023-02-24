const CONFIG = require("./config");
const SENDGRID_MAIL = require("@sendgrid/mail");
console.log(CONFIG.email.sendGridApiKey);
SENDGRID_MAIL.setApiKey(CONFIG.email.sendGridApiKey);

export { SENDGRID_MAIL };
