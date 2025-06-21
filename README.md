# MCP Client Compatibility

> **Last updated:** June 20, 2025

This repository tracks which MCP (Model Context Protocol) clients support which parts of the protocol.

## Detailed Breakdown

### AI Chat

| Client | Docs | Tools | Prompts | Resources | STDIO | SSE | HTTP | OAuth | Pass-through | Notes |
|--------|------|-------|---------|-----------|-------|-----|------|-------|-------------|--------|
| [Claude.ai (Web)](https://claude.ai) | [Docs](https://support.anthropic.com/en/articles/11175166-about-custom-integrations-using-remote-mcp) | ✅ | ❔ | ❔ | ❌ | ✅ | ✅ | ✅ | ✅ |  |
| [Claude (Desktop)](https://claude.ai/download) | [Docs](https://support.anthropic.com/en/articles/10949351-getting-started-with-model-context-protocol-mcp-on-claude-for-desktop) | ✅ | ❔ | ❔ | ✅ | ⚠️ | ⚠️ | ❔ | ❔ | SSE/HTTP via proxy only |
| [ChatGPT](https://chatgpt.com) |  | ❔ | ❔ | ❔ | ❔ | ❔ | ❔ | ❔ | ❔ |  |

### AI Coding Agents

| Client | Docs | Tools | Prompts | Resources | STDIO | SSE | HTTP | OAuth | Pass-through | Notes |
|--------|------|-------|---------|-----------|-------|-----|------|-------|-------------|--------|
| [Cursor](https://cursor.sh) | [Docs](https://docs.cursor.com/context/model-context-protocol) | ✅ | ❔ | ❌ | ✅ | ✅ | ✅ | ✅ | ❔ |  |
| [Windsurf](https://codeium.com/windsurf) | [Docs](https://docs.windsurf.com/windsurf/cascade/mcp#model-context-protocol-mcp) | ✅ | ❌ | ✅ | ✅ | ✅ | ❌ | ❔ | ❔ |  |
| [Cline](https://cline.bot/) |  | ❔ | ❔ | ❔ | ❔ | ❔ | ❔ | ❔ | ❔ |  |
| [VS Code GitHub Copilot](https://github.com/features/copilot) | [Docs](https://docs.github.com/en/copilot/customizing-copilot/using-model-context-protocol/extending-copilot-chat-with-mcp) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❔ | ❔ | Supports sampling |
| [Claude Code](https://claude.ai/code) | [Docs](https://docs.anthropic.com/en/docs/claude-code/mcp) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❔ | ❔ |  |

### Enterprise

| Client | Docs | Tools | Prompts | Resources | STDIO | SSE | HTTP | OAuth | Pass-through | Notes |
|--------|------|-------|---------|-----------|-------|-----|------|-------|-------------|--------|
| [Google Agentspace](https://cloud.google.com/agentspace) |  | ❔ | ❔ | ❔ | ❔ | ❔ | ❔ | ❔ | ❔ |  |

## Legend

- ✅ **Supported** - Feature is fully implemented and working
- ❌ **Not supported** - Feature is not available
- ❔ **Unknown** - Support status is unverified or unclear
- ⚠️ **Partial support** - Feature has limitations or conditions

## Contributing

To update compatibility information:

1. Edit `data/clients.json` with accurate information
2. Run `node scripts/generate-readme.js` to update this README file
3. Submit a pull request with your changes

Please include links to documentation or verification of compatibility claims.

## Data Format

The compatibility data is stored in `data/clients.json` and follows this schema:

```json
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
```

---

*This table is automatically generated from [data/clients.json](data/clients.json). Last updated: June 20, 2025*
