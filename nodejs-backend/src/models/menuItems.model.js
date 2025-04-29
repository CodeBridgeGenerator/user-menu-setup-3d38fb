
    module.exports = function (app) {
        const modelName = "menu_items";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            menu: { type:  String , required: true, comment: "Menu, p, false, true, true, true, true, true, true, , , , ," },
subMenu: { type:  String , required: true, comment: "SubMenu, p, false, true, true, true, true, true, true, , , , ," },
routePage: { type:  String , required: true, comment: "RoutePage, p, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };