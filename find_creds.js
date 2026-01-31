const fs = require('fs');
const path = require('path');
const os = require('os');

const searchPaths = [
    path.join(process.env.APPDATA || '', 'gcloud'),
    path.join(process.env.LOCALAPPDATA || '', 'gcloud'),
    path.join(os.homedir(), '.config', 'gcloud'),
    path.join(os.homedir(), 'AppData', 'Roaming', 'gcloud')
];

console.log("Searching for credentials...");
searchPaths.forEach(dir => {
    if (fs.existsSync(dir)) {
        console.log(`Found gcloud dir: ${dir}`);
        const adc = path.join(dir, 'application_default_credentials.json');
        if (fs.existsSync(adc)) {
            console.log(`FOUND ADC: ${adc}`);
        } else {
            console.log(`No ADC file in ${dir}`);
            try {
                console.log('Files:', fs.readdirSync(dir).join(', '));
            } catch (e) {}
        }
    } else {
    }
});
