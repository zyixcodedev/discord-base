const FS = require('fs')
const Logger = require('../utils/Logger')
const path = require('path')



const init = async() => {

    Logger.info("Reading current Config...")
    var currentConfig = await JSON.parse(FS.readFileSync('config.json', 'utf-8'))
    Logger.info("Cleaning `discord.modules`...")
    currentConfig.discord.modules = {}

    let commands = currentConfig.discord.commands

    Logger.info("Fetching all classes in `modules/discord/commands`...")
    let commandClasses = []
    await crawl(path.join(__dirname, "../discord/commands/"), commandClasses)

    Logger.info("Fetched " + commandClasses.length + " files")
    await commandClasses.forEach( async (commandClass) => {
        if (commandClass.toString().includes(".js")) {
            var lines = await FS.readFileSync(commandClass, 'utf-8').toString().split("\n")
            lines.forEach(async(line) => {
                if (line.startsWith("//!")){
                    var invoke = line.split(' ')[0].substring("//!"),
                        args   = line.toString().replace('\r', '').split(' ').slice(1)
                    if (args[0] === "name:") {
                        if (!currentConfig.discord.modules.args[1]) {
                            currentConfig.discord.modules += {
                                "moduleName": {
                                    enabled: false
                                }
                            }
                        } else {
                            currentConfig.discord.modules = {
                                "moduleName": {
                                    enabled: false
                                }
                            }
                        }
                        

                    }
                }
            })
        }
    })

    FS.writeFileSync("config.json", JSON.stringify(currentConfig, null, 4).toString())

    Logger.info("Successfully register all commands!")

}


init()


async function crawl(directory, filesArray) {
    const dirs = await FS.promises.readdir(directory, {
        withFileTypes: true 
    });
    for (let i = 0; i < dirs.length; i++) {
        const currentDir = dirs[i];
        const newPath = path.join(directory, currentDir.name);
         if (currentDir.isDirectory()) {
             await crawl(newPath, filesArray);
         }
         else {
             filesArray.push(newPath);
         }
    }
}