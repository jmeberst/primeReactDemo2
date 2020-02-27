import namor from "namor";

const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const colors = ["red", "blue", "green", "yellow"];

const newPerson = () => {
  return {
    firstName: namor.generate({ words: 1, numbers: 0, saltLength: 0 }),
    lastName: namor.generate({ words: 1, numbers: 0, saltLength: 0 }),
    middleName: namor.generate({ words: 1, numbers: 0, saltLength: 0 }),
    enterDate: randomDate(new Date(2012, 0, 1), new Date()).toDateString(),
    withdrawDate: randomDate(new Date(2012, 0, 1), new Date()).toDateString(),
    color: colors[getRandomInt(3)]
  };
};

const randomDate = (start, end) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map(d => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined
      };
    });
  };

  return makeDataLevel();
}
