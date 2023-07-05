import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: null, // Get this from tina.io
  token: null, // Get this from tina.io

  build: {
    outputFolder: "admin",
    publicFolder: "/",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "/",
    },
  },
  schema: {
    collections: [
      {
        name: "redirects",
        label: "Redirects",
        path: "_redirects",
        defaultItem: () => {
          return {
            title: 'Title',
            target: 'https://'
          }
        },
        ui: {
          filename: {
            // if disabled, the editor can not edit the filename
            readonly: false,
            // Example of using a custom slugify function
            slugify: values => {
              return `${values?.title?.toLowerCase().replace(/ /g, '-')}`
            }
          },
        },
        fields: [
          { label: "Title",
            name: "title",
            type: "string",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "target",
            label: "Target",
            required: true,
          }
        ],
      },
    ],
  },
});
