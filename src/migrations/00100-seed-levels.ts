import fs from "fs";
import path from "path";
import { SmsApplication } from "../application";
import { Process } from "./processes";
import {LevelsRepository} from '../repositories';
const filePath = path.join(__dirname, "../../data/levels.csv");

export const seedLevel: Process = {
  name: "00100-seed-levels.ts",
  func: async (app: SmsApplication) => {
    try {
      const levelsRepository = await app.getRepository(
        LevelsRepository
      );
      const csvString = fs.readFileSync(filePath, "utf-8");
      const lines = csvString.split("\n");
      // loop through all the lines in the CSV data, starting from the second line
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim(); // Trim the line to remove leading/trailing white spaces
        if (line) {
          const values = line.split(",");
          const newBranch = {
            name: values[0],
            code: values[1],
          };
          await levelsRepository.create(newBranch);
        }
      }
      console.log("Successful levels seed");
    } catch (error) {
      console.log("Fail ", error);
    }
  },
};
