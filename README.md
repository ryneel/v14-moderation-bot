<h1 align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=26&duration=3000&pause=1000&color=4FC3F7&center=true&vCenter=true&width=500&height=55&lines=rynel-guard;Discord+Moderation+Bot;Open+Source+%7C+Node.js" />
</h1>

<p align="center">
  <img src="https://img.shields.io/badge/discord.js-v14-5865F2?style=flat-square&logo=discord&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-18%2B-339933?style=flat-square&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/license-MIT-4FC3F7?style=flat-square" />
  <img src="https://img.shields.io/github/stars/ryneel/rynel-guard?style=flat-square&color=4FC3F7" />
</p>

<p align="center">
  A clean, open-source Discord moderation bot built with <b>Node.js</b> and <b>Discord.js v14</b>.<br/>
  Slash commands, embed responses, warning system — all ready to deploy.
</p>

---

## Features

- 🔨 `/ban` — Ban a member with an optional reason
- 👢 `/kick` — Kick a member from the server
- ⚠️ `/warn` — Warn a member and track warnings
- 📋 `/warnings` — View all warnings of a member
- 🧹 `/clearwarn` — Clear all warnings for a member
- 🔇 `/mute` — Timeout a member for a set duration
- 🔊 `/unmute` — Remove timeout from a member
- 🗑️ `/purge` — Bulk delete messages (up to 100)

---

## Getting Started

### Prerequisites

- Node.js v18 or higher
- A Discord bot token ([Discord Developer Portal](https://discord.com/developers/applications))

### Installation

```bash
git clone https://github.com/ryneel/rynel-guard.git
cd rynel-guard
npm install
```

### Configuration

```bash
cp .env.example .env
```

Fill in your `.env`:

```env
TOKEN=your_bot_token_here
CLIENT_ID=your_client_id_here
GUILD_ID=your_guild_id_here
```

### Running

```bash
# Production
npm start

# Development (auto-restart)
npm run dev
```

---

## Project Structure

```
rynel-guard/
├── src/
│   ├── commands/
│   ├── events/
│   ├── utils/
│   └── index.js
├── .env.example
└── package.json
```

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first.

1. Fork the repo
2. Create your branch: `git checkout -b feature/my-feature`
3. Commit: `git commit -m 'feat: add my feature'`
4. Push: `git push origin feature/my-feature`
5. Open a pull request

---

## License

MIT © [ryneel](https://github.com/ryneel)
