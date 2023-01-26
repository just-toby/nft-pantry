import { CodegenConfig } from "@graphql-codegen/cli";
import dotenv from "dotenv";

dotenv.config();

const config: CodegenConfig = {
  schema: {
    "https://2hm3d6i3bfb43hcx33dk56mfey.appsync-api.us-east-1.amazonaws.com/graphql":
      {
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_FEED_API_KEY ?? "",
        },
        method: "GET",
      },
  },
  documents: ["src/**/*.tsx", "graphql/**/*.graphql"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./gql/types.ts": {
      config: {
        rawRequest: true,
      },
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-graphql-request",
      ],
    },
  },
};

export default config;
