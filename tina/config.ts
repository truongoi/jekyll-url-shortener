import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: '5c14b698-931f-4a0b-967a-2c4ad818c8d8', // Get this from tina.io
  token: '76829f8f2d779e905e00e1036e5b514dee46a745', // Get this from tina.io

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
