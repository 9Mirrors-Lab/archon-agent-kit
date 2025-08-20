#!/usr/bin/env node
import inquirer from 'inquirer';

async function main() {
  console.log('Starting minimal test...');
  
  try {
    const answers = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'test',
        message: 'Select options:',
        choices: [
          { name: 'Option 1', value: 'opt1' },
          { name: 'Option 2', value: 'opt2' }
        ],
        validate: (vals) => vals.length ? true : 'Select at least one option'
      },
      {
        type: 'input',
        name: 'dest',
        message: 'Enter destination:',
        default: 'test'
      }
    ]);
    
    console.log('Got answer:', answers);
    console.log('Test completed successfully');
    
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
