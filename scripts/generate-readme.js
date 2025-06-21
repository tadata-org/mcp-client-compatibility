#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read the clients data
const clientsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/clients.json'), 'utf8'));

// Helper function to format status with tooltip
function formatStatus(status, tooltip = '') {
  const statusMap = {
    '✅': 'Supported',
    '❌': 'Not supported',
    '❔': 'Unknown',
    '⚠️': 'Partial support'
  };
  
  if (tooltip) {
    return `<span title="${tooltip}">${status}</span>`;
  }
  return status;
}

// Generate the README content
function generateReadme() {
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  let readme = `# MCP Client Compatibility

> **Last updated:** ${lastUpdated}

This repository tracks which MCP (Model Context Protocol) clients support which parts of the protocol.

## Detailed Breakdown

`;

  // Group clients by category
  const categories = [...new Set(clientsData.clients.map(c => c.category))];
  
  categories.forEach(category => {
    const categoryClients = clientsData.clients.filter(c => c.category === category);
    
    readme += `### ${category}\n\n`;
    readme += `| Client | Docs | Tools | Prompts | Resources | STDIO | SSE | HTTP | OAuth | Pass-through | Notes |\n`;
    readme += `|--------|------|-------|---------|-----------|-------|-----|------|-------|-------------|--------|\n`;
    
    categoryClients.forEach(client => {
      const notes = client.notes || '';
      const docs = client.docsUrl ? `[Docs](${client.docsUrl})` : '';
      readme += `| [${client.name}](${client.website}) | ${docs} | ${client.features.tools} | ${client.features.prompts} | ${client.features.resources} | ${client.transport.stdio} | ${client.transport.sse} | ${client.transport.streamableHttp} | ${client.auth.oauth} | ${client.auth.passthroughAuth} | ${notes} |\n`;
    });
    
    readme += `\n`;
  });

  readme += `## Legend

- ✅ **Supported** - Feature is fully implemented and working
- ❌ **Not supported** - Feature is not available
- ❔ **Unknown** - Support status is unverified or unclear
- ⚠️ **Partial support** - Feature has limitations or conditions

## Contributing

To update compatibility information:

1. Edit \`data/clients.json\` with accurate information
2. Run \`node scripts/generate-readme.js\` to update this README file
3. Submit a pull request with your changes

Please include links to documentation or verification of compatibility claims.

## Data Format

The compatibility data is stored in \`data/clients.json\` and follows this schema:

\`\`\`json
{
  "category": "AI Chat|AI Coding Agents|Enterprise",
  "name": "string", 
  "website": "string",
  "docsUrl": "string",
  "features": {
    "tools": "✅|❌|❔|⚠️",
    "prompts": "✅|❌|❔|⚠️", 
    "resources": "✅|❌|❔|⚠️"
  },
  "transport": {
    "stdio": "✅|❌|❔|⚠️",
    "sse": "✅|❌|❔|⚠️",
    "streamableHttp": "✅|❌|❔|⚠️"
  },
  "auth": {
    "oauth": "✅|❌|❔|⚠️",
    "passthroughAuth": "✅|❌|❔|⚠️"
  },
  "configuration": "string",
  "notes": "string"
}
\`\`\`

---

*This table is automatically generated from [data/clients.json](data/clients.json). Last updated: ${lastUpdated}*
`;

  return readme;
}

// Write the README file
const readmeContent = generateReadme();
fs.writeFileSync(path.join(__dirname, '../README.md'), readmeContent);

console.log('✅ README.md generated successfully!');
console.log(`📊 Processed ${clientsData.clients.length} clients across ${[...new Set(clientsData.clients.map(c => c.category))].length} categories`);