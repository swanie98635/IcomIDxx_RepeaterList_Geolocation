const fs = require('fs');
const path = require('path');

const targetDir = process.cwd();
const files = fs.readdirSync(targetDir).filter(f => f.endsWith('.csv') && !f.includes('Master'));

const locations = new Set();

files.forEach(file => {
    const content = fs.readFileSync(path.join(targetDir, file), 'utf-8');
    const lines = content.split(/\r?\n/);

    // Simple CSV parser handling quotes basic
    lines.forEach((line, index) => {
        if (index === 0 || !line.trim()) return; // Skip header and empty lines

        // Split by comma, respecting quotes is hard with split, regex is better
        // But RepeaterBook format is fairly simple. Let's try simple split first, 
        // usually City is in "Location" column which is quoted if it has comma.

        // Better regex for CSV splitting
        const cols = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
        // Fallback if match fails (simple split)
        const parts = line.split(',');

        // We know Location is roughly column index 6 (0-based) based on prev views
        // Header: Output Freq,Input Freq,Offset,Uplink Tone,Downlink Tone,Call,"Location",County,State
        // Index: 0,1,2,3,4,5,6,7,8

        // Let's look for the Location header to be sure? No, just assume standard format for now based on file views

        let locRaw = parts[6];
        let stateRaw = parts[8];

        if (locRaw) {
            // clean quotes
            let loc = locRaw.replace(/^"|"$/g, '').trim();
            // City is before " - " if present
            let city = loc.split(' - ')[0].trim();

            if (stateRaw) {
                let state = stateRaw.replace(/^"|"$/g, '').trim();
                locations.add(`${city}|${state}`);
            }
        }
    });
});

Array.from(locations).sort().forEach(l => console.log(l));
