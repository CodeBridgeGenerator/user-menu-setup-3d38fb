
    module.exports = function (app) {
        const modelName = "user_context";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            role: { type: Schema.Types.ObjectId, ref: "users", comment: "Role, dropdown, false, true, true, true, true, true, true, users, users, one-to-one, name," },
position: { type: Schema.Types.ObjectId, ref: "users", comment: "Position, dropdown, false, true, true, true, true, true, true, users, users, one-to-one, name," },
profile: { type: Schema.Types.ObjectId, ref: "users", comment: "Profile, dropdown, false, true, true, true, true, true, true, users, users, one-to-one, name," },
user: { type: Schema.Types.ObjectId, ref: "users", comment: "User, dropdown, false, true, true, true, true, true, true, users, users, one-to-one, name," },
company: { type: Schema.Types.ObjectId, ref: "users", comment: "Company, dropdown, false, true, true, true, true, true, true, users, users, one-to-one, name," },
branch: { type: Schema.Types.ObjectId, ref: "users", comment: "Branch, dropdown, false, true, true, true, true, true, true, users, users, one-to-one, name," },
department: { type: Schema.Types.ObjectId, ref: "users", comment: "Department, dropdown, false, true, true, true, true, true, true, users, users, one-to-one, name," },
section: { type: Schema.Types.ObjectId, ref: "users", comment: "Section, dropdown, false, true, true, true, true, true, true, users, users, one-to-one, name," },

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