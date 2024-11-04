import { Command } from "commander";

const args = new Command();

args.option("-p <port>", "port", 8000);
args.option("--mode <mode", "modo", "prod");

args.parse();

export default args.opts();