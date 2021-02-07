import pkg from "../../package.json";

const AppConfig = {
  PORT: 4010,
  apiVersions: {
    "v1.0": "v1.0",
  },
  buildVersion: pkg.version,
  mongoDB_URI: "mongodb://root:examplePass@tretton_mongo_db:27017",
  DBName: "tretton_db",
};

export default AppConfig;
