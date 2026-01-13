import { Octokit } from '@octokit/rest'
import * as fs from 'fs'
import * as path from 'path'

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('GitHub not connected');
  }
  return accessToken;
}

async function getUncachableGitHubClient() {
  const accessToken = await getAccessToken();
  return new Octokit({ auth: accessToken });
}

const IGNORE_PATTERNS = [
  'node_modules',
  '.git',
  '.replit',
  '.config',
  '.upm',
  'dist',
  '.cache',
  '*.log',
  '.env',
  '.env.*',
  'replit.nix',
  '.breakpoints',
  'generated-icon.png',
  'package-lock.json',
];

function shouldIgnore(filePath: string): boolean {
  const parts = filePath.split('/');
  for (const pattern of IGNORE_PATTERNS) {
    if (pattern.startsWith('*.')) {
      const ext = pattern.slice(1);
      if (filePath.endsWith(ext)) return true;
    } else {
      if (parts.includes(pattern) || filePath === pattern) return true;
    }
  }
  return false;
}

function getAllFiles(dir: string, baseDir: string = dir): string[] {
  const files: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.relative(baseDir, fullPath);
    
    if (shouldIgnore(relativePath)) continue;
    
    if (entry.isDirectory()) {
      files.push(...getAllFiles(fullPath, baseDir));
    } else if (entry.isFile()) {
      files.push(relativePath);
    }
  }
  
  return files;
}

async function pushToGitHub() {
  const octokit = await getUncachableGitHubClient();
  const { data: user } = await octokit.users.getAuthenticated();
  const owner = user.login;
  const repo = 'partyline-modern';
  
  console.log(`Pushing to ${owner}/${repo}...`);
  
  const workDir = process.cwd();
  const files = getAllFiles(workDir);
  
  console.log(`Found ${files.length} files to push`);
  
  // First, create a README to initialize the repo
  const readmeContent = fs.readFileSync(path.join(workDir, 'replit.md'), 'utf-8');
  
  try {
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: 'README.md',
      message: 'Initial commit - Add README',
      content: Buffer.from(readmeContent).toString('base64'),
    });
    console.log('Created README.md to initialize repository');
  } catch (e: any) {
    if (e.status !== 422) throw e;
    console.log('README already exists, continuing...');
  }
  
  // Now we can use the Git Data API
  // Get the latest commit SHA
  const { data: ref } = await octokit.git.getRef({
    owner,
    repo,
    ref: 'heads/main',
  });
  const latestCommitSha = ref.object.sha;
  
  // Get the tree SHA
  const { data: commit } = await octokit.git.getCommit({
    owner,
    repo,
    commit_sha: latestCommitSha,
  });
  const baseTreeSha = commit.tree.sha;
  
  // Create blobs for all files
  const blobs: { path: string; sha: string; mode: string; type: string }[] = [];
  
  for (const file of files) {
    const content = fs.readFileSync(path.join(workDir, file));
    const base64Content = content.toString('base64');
    
    const { data: blob } = await octokit.git.createBlob({
      owner,
      repo,
      content: base64Content,
      encoding: 'base64',
    });
    
    blobs.push({
      path: file,
      sha: blob.sha,
      mode: '100644',
      type: 'blob',
    });
    
    console.log(`  Uploaded: ${file}`);
  }
  
  // Create a new tree
  const { data: tree } = await octokit.git.createTree({
    owner,
    repo,
    base_tree: baseTreeSha,
    tree: blobs as any,
  });
  
  console.log('Created tree:', tree.sha);
  
  // Create a new commit
  const { data: newCommit } = await octokit.git.createCommit({
    owner,
    repo,
    message: 'Add all project files - PartyLine Modern',
    tree: tree.sha,
    parents: [latestCommitSha],
  });
  
  console.log('Created commit:', newCommit.sha);
  
  // Update the reference
  await octokit.git.updateRef({
    owner,
    repo,
    ref: 'heads/main',
    sha: newCommit.sha,
  });
  
  console.log(`\nSuccess! Code pushed to: https://github.com/${owner}/${repo}`);
}

pushToGitHub().catch(console.error);
