import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";

const makeCommits = (n) => {
  if (n === 0) return simpleGit().push();

  // Generate a random timestamp strictly before now
  const now = moment();
  const daysAgo = random.int(1, 365); // at least 1 day ago
  const hoursAgo = random.int(0, 23);
  const minutesAgo = random.int(0, 59);
  const secondsAgo = random.int(0, 59);

  const date = now
    .subtract(daysAgo, "days")
    .subtract(hoursAgo, "hours")
    .subtract(minutesAgo, "minutes")
    .subtract(secondsAgo, "seconds")
    .format("YYYY-MM-DDTHH:mm:ss");

  const data = { date };
  console.log("Commit on:", date);

  jsonfile.writeFile(path, data, () => {
    simpleGit()
      .add([path])
      .commit(date, { "--date": date }, makeCommits.bind(this, --n));
  });
};

makeCommits(50); // adjust number of commits