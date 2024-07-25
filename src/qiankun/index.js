import { start, registerMicroApps,addGlobalUncaughtErrorHandler  } from "qiankun";
import apps from "./apps";

console.log("apps", apps)

registerMicroApps(apps);

addGlobalUncaughtErrorHandler(event => {
    console.log("error", event);
})

start();