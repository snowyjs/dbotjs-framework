# DbotJS Framework
This framework makes creating a bot much easier! With this module you can create a good basis for bot

<a href="https://www.npmjs.com/package/dbotjs-framework"><img src="https://img.shields.io/npm/v/dbotjs-framework.svg?maxAge=3600" alt="NPM version" /></a>
<a href="https://www.npmjs.com/package/dbotjs-framework"><img src="https://img.shields.io/npm/dt/dbotjs-framework.svg?maxAge=3600" alt="NPM downloads" /></a>

#💻 Installation

1. Install module: `npm install dbotjs-framework`
2. Make a index.js file. Example:
```
const DF = require("dbotjs-framework");
let Dbot = new DF.Client({
    prefix: "!", // Bot prefix > !help, !test
    token: "TOKEN" // Bot token
})

Dbot.connect();
```

3. Make a coomands folder with the name: "commands". Example:
``` 
module.exports = {
    name: "test",
    description: "This is an test command",
    run: async (client, message, args) => {
        // Code here
    },
};
```

# ⚙ Options
```
new DF.Client({
    prefix: "!", // Bot prefix > !help, !test
    token: "TOKEN", // Bot token
    status: "test", // Bot status
    statusType: "WATCHING", // Bot status type
    embedColor: "#ff0000" // Color of a embed
})
```

# 🤖 All functions
## Embeds
- Success embed:
```if (args[0]) message.success("This is a success embed!")```

- Send a automatic error
```if (!args[0]) return message.error("No args provided")```

- Embed:
```message.sendEmbed({title: "test", desc: "test", color: "#00ff00"})```

- Find a member:
```
let member = message.getMember(args[0]);
if (!member) return message.error("No member found!");
```

- Find a channel:
```
let channel = message.getChannel(args[0]);
if (!channel) return message.error("No channel found!");
```

- Find a role:
```
let role = message.getRole(args[0]);
if (!role) return message.error("No role found!");
```

- Check user is guild owner:
```if(!message.member.isOwner()) return message.error("User is no owner!");```

- Check user is admin:
```if(!message.member.isAdmin()) return message.error("User is no admin!");```

# 📑 License
This project has an <a href="https://github.com/DotwoodMedia/dbotjs-framework/blob/main/LICENSE">Apache 2.0</a> license