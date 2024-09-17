# tawk.to AI Assist API Integration Samples
This repository provides sample integrations for the tawk.to AI Assist API,
demonstrating how to set up and implement these integrations using Google Apps
Script. Whether you're looking to streamline customer support or enhance chatbot
functionality, these examples will help you get started quickly and easily.

## How to use the samples

### Creating a Google App Script

There are different methods to access Google App Script from your document
- In Google Sheets, click `Extensions -> Apps Script`
- In Google Form, click the triple dot menu icon and click `Script editor`

1. Copy the sample code from `Code.gs`.
2. Modify any parameters to fit your requirements.
3. Deploy the script by selecting `Deploy -> New Deployment`.
4. Under `Execute As`, select `Me` to ensure the script has the correct permissions
to modify the file.
5. Under `Who has access`, select `Anyone` to allow AI Assist to call the Web App.
6. Click Deploy.
7. Copy and save the Web App URL. Note that a new URL is generated with each deployment.

### Creating a spec YAML File

This file must be publicly accessible in its raw format. Here's how to host it on GitHub Gist:
1. Create a new gist.
2. Enter a file name, making sure to use the .yml extension.
3. Copy the contents of `spec.yml` into the gist.
4. Update the value of servers.urls with the URL copied from the Google App Script
(Web App URL). Remove `/exec` from the end of the URL, it should already be included
in `paths`.
5. You can edit and test your spec using an online spec editor like
[Swagger](https://editor.swagger.io/).
6. Click `Create`.
7. Click `Raw`.
8. Copy the raw file URL.

### Adding the API Tool in AI Assist

1. Add a new API tool.
2. Paste the spec file URL into the `Schema File URL` field.
3. Click `Save`.
