import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const zip = (a, b) =>
  Array.from(Array(Math.max(b.length, a.length)), (_, i) => [a[i], b[i]]);

const loglvl = (lvl, ...params) => {
  return;
  console.log(
    Array(lvl + 1)
      .fill("  ")
      .join(""),
    ...params,
  );
};

const compare = (pairs, lvl = 0) => {
  for (const [l, r] of pairs) {
    loglvl(lvl, "- Compare", l, "vs", r);
    if (typeof l === "undefined") {
      loglvl(
        lvl,
        "- Left side ran out of items, so inputs are in the right order",
      );
      return true;
    }
    if (typeof r === "undefined") {
      loglvl(
        lvl,
        "- Right side ran out of items, so inputs are not in the right order",
      );
      return false;
    }
    if (typeof l === "number" && typeof r === "number") {
      if (l !== r) {
        if (l < r) {
          loglvl(
            lvl,
            "- Left side is smaller, so inputs are in the right order",
          );
          return l < r;
        }
        loglvl(
          lvl,
          "- Right side is smaller, so inputs are not in the right order",
        );
        return false;
      }
    }
    let res;
    if (typeof l === "object" && typeof r === "object") {
      res = compare(zip(l, r), lvl + 1);
    }
    if (typeof l === "object" && typeof r === "number") {
      res = compare(zip(l, [r]), lvl + 1);
    }
    if (typeof l === "number" && typeof r === "object") {
      res = compare(zip([l], r), lvl + 1);
    }
    if (typeof res !== "undefined") return res;
  }
};

const part1 = (rawInput) => {
  const pairs = parseInput(rawInput)
    .split("\n\n")
    .map((p) => p.split("\n").map((a) => JSON.parse(a)));
  let total = 0;
  pairs.forEach((p, i) => {
    const left = p[0];
    const right = p[1];
    loglvl(-1, "Compare", left, "vs", right);
    const zipped = zip(left, right);
    const isCorrect = compare(zipped);
    // if (!isCorrect) {
    //   console.log(p);
    // }
    if (isCorrect) {
      // console.log({ isCorrect }, i + 1);
      total += i + 1;
    }
  });
  return total;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return;
};

const testInput = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`;

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
