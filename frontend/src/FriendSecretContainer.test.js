it("gerar sorteio randomico", () => {
  const friends = [
    { _id: 10101010, name: "guilherme" },
    { _id: 10101011, name: "joao" },
    { _id: 10101012, name: "bruna" },
    { _id: 10101013, name: "ju" }
  ];

  const friendsAfterDraw = draw(friends);
  console.log(friendsAfterDraw);

  expect(friendsAfterDraw).not.toEqual(draw(friends));
});

function draw(array) {
  return array
    .sort((a, b) => Math.random())
    .reduce((acc, value) => {
      const possibilities = array
        .filter(a => a._id !== value._id)
        .filter(a => !acc.some(l => l.friend._id === a._id))
        .map(a => {
          return { name: a.name, _id: a._id, email: a._email };
        });
      value.friend =
        possibilities[Math.floor(Math.random() * possibilities.length)];
      return acc.concat(value);
    }, []);
}
