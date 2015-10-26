# Group orders

## Getting Started

### Requirements

- [node v4.1.1](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Init project

```
git clone https://github.com/edlb/group-orders.git
cd group-orders
npm install
```

Duplicate file `src/app/app.constants-example.js` and rename it to `app.constants.js`

Create a new Google spreadsheet

Make it publicly available: File > Publish to the web... > Publish

Create a new Google script: Tools > Script editor...

Paste this into the script: [code.gs](src/code.gs)

Run setup

Publish > Deploy as web app...

- Execute the app as: Me
- Who has access to the app: Anyone, even anonymous

Copy 'Current web app URL' and paste it in `app.constants.js` as `GOOGLE_SCRIPT_URL`'s constant value

Add a new 'Incoming WebHook' to Slack's integrations

Copy 'Webhook URL' and paste it in `app.constants.js` as `SLACK_WEBHOOK_URL`'s constant value

### Development env

`npm run dev`

Open your browser at http://localhost:7357

### Production env

`npm run prod`

Make your web server root point to the `dist/` folder

## Enabled restaurants

[Frichti](http://frichti.co/)

## Credits

- [Real Favicon Generator](http://realfavicongenerator.net/)
- [Google sheets as a database insert](https://mashe.hawksey.info/2014/07/google-sheets-as-a-database-insert-with-apps-script-using-postget-methods-with-ajax-example/)
- [Material icons](https://www.google.com/design/icons/)
