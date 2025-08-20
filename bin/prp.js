#!/usr/bin/env node
import path from 'node:path';
import fs from 'fs-extra';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function ensureDir(dir) {
  await fs.mkdirp(dir);
}

async function writeFile(filePath, content) {
  await ensureDir(path.dirname(filePath));
  await fs.writeFile(filePath, content, 'utf8');
}

async function copyFile(src, dest) {
  await ensureDir(path.dirname(dest));
  await fs.copy(src, dest);
}

async function main() {
  console.log(chalk.cyan.bold('\nArchon Agent Kit Installer (Cursor + Claude Code)'));

  const answers = await inquirer.prompt([
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

  const destDir = path.isAbsolute(answers.dest)
    ? answers.dest
    : path.resolve(process.cwd(), answers.dest);

  // Source bundle path: prefer local project-structure, fallback to vendored assets
  let srcRoot = path.resolve(__dirname, '..', '..', 'project-structure', 'agent-kit');
  if (!(await fs.pathExists(srcRoot))) {
    srcRoot = path.resolve(__dirname, '..', 'assets', 'agent-kit');
  }

  // Common files to copy regardless of IDE
  const commonCopies = [
    ['INITIAL.template.md', 'INITIAL.md'],
    ['README-PRP.md', 'README-PRP.md'],
  ];

  for (const [srcRel, destRel] of commonCopies) {
    const src = path.join(srcRoot, srcRel);
    const dest = path.join(destDir, destRel);
    if (src.endsWith('INITIAL.template.md')) {
      const destInitial = path.join(destDir, 'INITIAL.md');
      const destTemplate = path.join(destDir, 'INITIAL.template.md');
      if (await fs.pathExists(destInitial)) {
        await copyFile(src, destTemplate);
        console.log(chalk.yellow('Found existing INITIAL.md, wrote INITIAL.template.md alongside it.'));
      } else {
        await copyFile(src, destInitial);
        console.log(chalk.green('Created INITIAL.md from template.'));
      }
    } else {
      await copyFile(src, dest);
    }
  }

  // Rule injection per IDE
  const rulesSrcDir = path.join(srcRoot, '.cursor', 'rules');
  const ruleFiles = [
    'project-rules.mdc',
    'generate-base-template.mdc',
    'create-prp.mdc',
    'execute-prp.mdc',
  ];

  if (answers.ides.includes('cursor')) {
    const cursorRulesDir = path.join(destDir, '.cursor', 'rules');
    await ensureDir(cursorRulesDir);
    for (const f of ruleFiles) {
      await copyFile(path.join(rulesSrcDir, f), path.join(cursorRulesDir, f));
    }
    console.log(chalk.green(`✓ Installed Cursor rules in ${path.relative(process.cwd(), cursorRulesDir)}`));
  }

  if (answers.ides.includes('claude-code')) {
    // Mirror BMAD structure: .claude/commands/BMad/{agents|tasks}
    // For this starter, install rules under .claude/commands/ArchonAgentKit/{rules}
    const base = path.join(destDir, '.claude', 'commands', 'ArchonAgentKit');
    const rulesDestDir = path.join(base, 'rules');
    await ensureDir(rulesDestDir);
    for (const f of ruleFiles) {
      // For Claude, store as .md content
      const src = path.join(rulesSrcDir, f);
      const content = await fs.readFile(src, 'utf8');
      const outName = f.replace(/\.mdc$/, '.md');
      await writeFile(path.join(rulesDestDir, outName), `# /${path.basename(outName, '.md')}\n\n${content}`);
    }
    console.log(chalk.green(`✓ Installed Claude Code commands in ${path.relative(process.cwd(), rulesDestDir)}`));
  }

  console.log(chalk.cyan('\nDone. Next steps:'));
  console.log(chalk.dim(' - Open your project in your IDE(s).'));
  console.log(chalk.dim(' - For Cursor, use the installed .mdc rules directly.'));
  console.log(chalk.dim(' - For Claude Code, open the Commands panel and look under ArchonAgentKit/rules.'));
}

main().catch((err) => {
  console.error(chalk.red('Installer failed:'), err);
  process.exit(1);
});


