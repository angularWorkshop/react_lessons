import { spawn } from 'node:child_process';
import process from 'node:process';

const children = [];

function startProcess(label, command, args) {
  const child = spawn(command, args, {
    stdio: 'inherit',
    env: {
      ...process.env,
      FORCE_COLOR: '1',
    },
  });

  children.push(child);

  child.on('exit', (code) => {
    if (code && code !== 0) {
      process.exitCode = code;
    }
  });

  return child;
}

function shutdown() {
  for (const child of children) {
    if (!child.killed) {
      child.kill('SIGTERM');
    }
  }
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

startProcess('status', process.execPath, ['./scripts/stackblitz-status.mjs']);
startProcess('vite', process.execPath, ['./node_modules/vite/bin/vite.js', '--host', '0.0.0.0', '--port', '3000']);
