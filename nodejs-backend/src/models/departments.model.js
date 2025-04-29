module.exports = function (app) {
  const modelName = "departments";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      companyId: { type: Schema.Types.ObjectId, ref: "companies" },
      name: {
        type: String,
        required: false,
        unique: false,
        lowercase: false,
        uppercase: false,
        maxLength: 100000000,
        index: true,
        trim: true,
      },
      code: {
        type: String,
        required: false,
        unique: false,
        lowercase: false,
        uppercase: false,
        minLength: 2,
        maxLength: 150,
        index: true,
        trim: true,
      },
      isDefault: { type: Boolean, default: false },

      createdBy: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
      updatedBy: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
    },
    {
      timestamps: true,
    },
  );

  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
};
