const fs = require('fs');
const path = require('path');
const readline = require('readline');
const inquirer = require('inquirer');
const inquirerDirectory = require('inquirer-directory');

inquirer.registerPrompt('directory', inquirerDirectory);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function saveToJson(data, filepath) {
    fs.writeFileSync(filepath, JSON.stringify(data, null, 4), 'utf-8');
}

function saveToXml(data, filepath) {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<items>\n';
    data.forEach(item => {
        xml += `  <item>${item}</item>\n`;
    });
    xml += '</items>';
    fs.writeFileSync(filepath, xml, 'utf-8');
}

function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
    const answers = await inquirer.prompt([
        {
            type: 'directory',
            name: 'directory',
            message: 'Choose the directory where you want to save your items:',
            basePath: '.'
        }
    ]);

    const directory = answers.directory;

    const items = [];
    console.log("Enter your items one by one. Type 'exit' to quit and save the items.");

    while (true) {
        const item = await askQuestion("Enter item: ");
        if (item.toLowerCase() === 'exit') {
            break;
        }
        items.push(item);
    }

    // Save as JSON
    const jsonFilepath = path.join(directory, "items.json");
    saveToJson(items, jsonFilepath);
    console.log(`Items have been saved to ${jsonFilepath}`);

    // Save as XML
    // const xmlFilepath = path.join(directory, "items.xml");
    // saveToXml(items, xmlFilepath);
    // console.log(`Items have been saved to ${xmlFilepath}`);

    rl.close();
}

main();