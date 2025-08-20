#!/usr/bin/env node
import path from 'node:path';
import fs from 'fs-extra';
import chalk from 'chalk';
import { createPromptModule } from 'inquirer';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inquirer = createPromptModule();

async function main() {
  console.log(chalk.cyan.bold('\nTest Script'));
  
  try {
    const answers = await inquirer([
      {
        type: 'checkbox',
        name: 'ides',
        message: 'Select IDE(s) to configure',
        choices: [
          { name: 'Cursor', value: 'cursor' },
          { name: 'Claude Code', value: 'claude-code' },
        ],
        validate: (vals) => (vals.length ? true : 'Select at least one IDE'),
      },
      {
        type: 'input',
        name: 'dest',
        message: 'Install into which directory?',
        default: process.cwd(),
      },
    ]);

    console.log(chalk.dim('Debug: Got answers:', JSON.stringify(answers)));
    
    const destDir = path.isAbsolute(answers.dest)
      ? answers.dest
      : path.resolve(process.cwd(), answers.dest);

    console.log(chalk.dim(`Debug: Destination directory: ${destDir}`));
    
    // Test source path resolution
    const srcRoot = path.resolve(__dirname, '..', 'assets', 'agent-kit');
    console.log(chalk.dim(`Source files from: ${srcRoot}`));
    
    if (await fs.pathExists(srcRoot)) {
      console.log(chalk.green('✓ Source directory exists'));
    } else {
      console.log(chalk.red('✗ Source directory not found'));
    }
    
  } catch (error) {
    console.error(chalk.red('Error:'), error);
    console.error(chalk.red('Stack:'), error.stack);
  }
}

main().catch((err) => {
  console.error(chalk.red('Main failed:'), err);
  console.error(chalk.red('Stack:'), err.stack);
  process.exit(1);
});
