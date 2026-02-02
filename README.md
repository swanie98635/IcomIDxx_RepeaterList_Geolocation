# Icom ID-xx Repeater List Geolocation Tools

A collection of utilities to process RepeaterBook CSV exports, extract location data, and generate geocoded repeater lists for Icom ID-series radios (e.g., ID-50, ID-52).

## Features

- **City Extraction**: Parses multiple CSV RepeaterBook exports to identify unique City/State combinations.
- **Normalization**: Cleans up city names and handles formatting inconsistencies.
- **Preparation**: Prepares data for geocoding (Lat/Lon lookup) to ensure accurate "Nearest Repeater" functionality on your radio.

## Installation

1.  **Install Node.js**:
    *   **Windows**: Download the installer from [nodejs.org](https://nodejs.org/) and run it.
    *   **Mac**: Download from [nodejs.org](https://nodejs.org/) or use Homebrew: `brew install node`
    *   **Linux**: Use your package manager (e.g., `sudo apt install nodejs`) or [install via nvm](https://github.com/nvm-sh/nvm).
2.  **Dependencies**:
    Currently, this tool uses only standard Node.js libraries (`fs`, `path`). No extra `npm install` is required yet.

## OS Compatibility

This tool is cross-platform and works on **Windows**, **macOS**, and **Linux**.

*   **Windows**: Open "Command Prompt" or "PowerShell". Navigate to the folder and run the commands.
*   **Mac/Linux**: Open "Terminal". Navigate to the folder and run the commands.

## Workflow

## Usage

### Extracting Cities

To scan your CSV files and see a list of unique City|State combinations:

```bash
node extract_cities.js
```

This will output the list to the console. You can redirect this to a file if needed:

```bash
node extract_cities.js > cities_list.txt
```

## Project Structure

- `extract_cities.js`: Main logic for parsing CSVs and extracting valid location names.
- `seed_cities.js`: Helper/Seed data for city validation (if applicable).
- `RAW Repeaterbook Downloads/`: Recommended folder structure for storing your source CSVs.

## Workflow

1) **Download Data**: Go to [RepeaterBook.com](https://www.repeaterbook.com/), select your State and Band (e.g., Oregon 70cm). Click "Export" and select "CSV".
2) **Place Files**: Copy the downloaded CSV files (e.g., `Oregon_70cm.csv`) directly into this folder (`IcomIDxx_RepeaterList_Geolocation`), alongside `extract_cities.js`.
3) **Run Extraction**: Open a terminal in this folder and run:
   ```bash
   node extract_cities.js
   ```
   This will output the list of valid cities found in your CSV files.
