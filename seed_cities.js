const fs = require('fs');
const path = require('path');

const sampleFile = String.raw`C:\Users\eric\Downloads\DSTAR\sample dstar list of or and wa.csv`;
const outFile = String.raw`C:\Users\eric\Downloads\DSTAR\Icom ID 50 Repeater lists\cities.csv`;

const cities = new Map();

try {
    const content = fs.readFileSync(sampleFile, 'utf-8');
    const lines = content.split(/\r?\n/);

    lines.forEach((line, index) => {
        if (index === 0 || !line.trim()) return;

        // Sample file format:
        // Group No,Group Name,Name,Sub Name,Repeater Call Sign,Gateway Call Sign,Frequency,Dup,Offset,Mode,TONE,Repeater Tone,RPT1USE,Position,Latitude,Longitude,UTC Offset
        // Name = City
        // Sub Name = State
        // Latitude = col 14
        // Longitude = col 15

        const cols = line.split(',');
        // Be careful with simple split if quotes exist. Sample file looked fairly clean in view_file.
        // Let's assume Name and Sub Name might range.
        // It's safer to use the same logic as before or a regex/library.

        // Let's try simple split first.
        // If Name is quoted "Location", removing quotes.

        let name = cols[2];
        let subName = cols[3];
        let lat = cols[14];
        let lon = cols[15];

        if (name && subName && lat && lon) {
            name = name.replace(/"/g, '').trim();
            subName = subName.replace(/"/g, '').trim();

            // Clean "City - Landmark"
            let city = name.split('-')[0].trim();

            // Key: City|State
            let key = `${city}|${subName}`;

            // Only add if valid lat/lon
            if (!isNaN(parseFloat(lat)) && !isNaN(parseFloat(lon))) {
                cities.set(key, { lat, lon });
            }
        }
    });

} catch (err) {
    console.error("Error reading sample file:", err.message);
}

// Write to CSV
// Header: City,State,Latitude,Longitude
let csvContent = "City,State,Latitude,Longitude\n";
cities.forEach((coord, key) => {
    const [city, state] = key.split('|');
    csvContent += `${city},${state},${coord.lat},${coord.lon}\n`;
});

// Add some manual BC/AB/Other cities just in case, since sample is only OR/WA/AK
const extras = [
    // BC
    "Vancouver,British Columbia,49.2827,-123.1207",
    "Victoria,British Columbia,48.4284,-123.3656",
    "Kelowna,British Columbia,49.8880,-119.4960",
    "Kamloops,British Columbia,50.6745,-120.3273",
    "Nanaimo,British Columbia,49.1659,-123.9401",
    "Prince George,British Columbia,53.9171,-122.7497",
    "Surrey,British Columbia,49.1913,-122.8490",
    "Burnaby,British Columbia,49.2488,-122.9805",
    "Richmond,British Columbia,49.1666,-123.1336",
    "Abbotsford,British Columbia,49.0504,-122.3045",
    "Coquitlam,British Columbia,49.2838,-122.7932",
    "Saanich,British Columbia,48.4840,-123.3810",
    "Langley,British Columbia,49.1024,-122.5658",
    "Delta,British Columbia,49.0847,-123.0587",
    "North Vancouver,British Columbia,49.3199,-123.0724",
    "Maple Ridge,British Columbia,49.2193,-122.6019",
    "New Westminster,British Columbia,49.2057,-122.9109",
    "Port Coquitlam,British Columbia,49.2625,-122.7816",
    "North Cowichan,British Columbia,48.8245,-123.7196",
    "Port Moody,British Columbia,49.2827,-122.8295",
    "Penticton,British Columbia,49.4928,-119.5947",
    "Vernon,British Columbia,50.2696,-119.2720",
    "Campbell River,British Columbia,50.0163,-125.2446",
    // Alberta
    "Calgary,Alberta,51.0447,-114.0719",
    "Edmonton,Alberta,53.5461,-113.4938",
    "Red Deer,Alberta,52.2690,-113.8115",
    "Lethbridge,Alberta,49.6956,-112.8451",
    "St. Albert,Alberta,53.6358,-113.6275",
    "Medicine Hat,Alberta,50.0417,-110.6775",
    "Grande Prairie,Alberta,55.1699,-118.7986",
    "Airdrie,Alberta,51.2917,-114.0144",
    "Spruce Grove,Alberta,53.5472,-113.9016",
    "Leduc,Alberta,53.2594,-113.5492",
    "Sherwood Park,Alberta,53.5168,-113.3183",
    "Fort Saskatchewan,Alberta,53.7126,-113.2133"
];

csvContent += extras.join('\n') + '\n';

fs.writeFileSync(outFile, csvContent);
console.log("Created cities.csv with " + (cities.size + extras.length) + " entries.");
