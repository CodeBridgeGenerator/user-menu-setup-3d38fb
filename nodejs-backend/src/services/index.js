
const userContext = require("./userContext/userContext.service.js");
const menuItems = require("./menuItems/menuItems.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
    
  app.configure(userContext);
  app.configure(menuItems);
    // ~cb-add-configure-service-name~
};
