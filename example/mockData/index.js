const humanoids = [
  {
    id: '1000',
    name: 'Luke Skywalker',
    appearsIn: ['NEWHOPE', 'EMPIRE', 'JEDI'],
    homePlanet: 'Tatooine',
    height: 1.72,
    mass: 77,
    starships: ['3001', '3003'],
  },
  {
    id: '1001',
    name: 'Darth Vader',
    droidFriends: [],
    appearsIn: ['NEWHOPE', 'EMPIRE', 'JEDI'],
    homePlanet: 'Tatooine',
    height: 2.02,
    mass: 136,
    starships: ['3002'],
  },
  {
    id: '1002',
    name: 'Han Solo',
    appearsIn: ['NEWHOPE', 'EMPIRE', 'JEDI'],
    homePlanet: null,
    height: 1.8,
    mass: 80,
    starships: ['3000', '3003'],
  },
  {
    id: '1003',
    name: 'Leia Organa',
    appearsIn: ['NEWHOPE', 'EMPIRE', 'JEDI'],
    homePlanet: 'Alderaan',
    height: 1.5,
    mass: 49,
    starships: [],
  },
  {
    id: '1004',
    name: 'Wilhuff Tarkin',
    droidFriends: [],
    appearsIn: ['NEWHOPE'],
    homePlanet: null,
    height: 1.8,
    mass: null,
    starships: [],
  },
];

const droids = [
  {
    id: '2000',
    name: 'C-3PO',
    friends: ['1000', '1002', '1003', '2001'],
    appearsIn: ['NEWHOPE', 'EMPIRE', 'JEDI'],
    primaryFunction: 'Protocol',
  },
  {
    id: '2001',
    name: 'R2-D2',
    friends: ['1000', '1002', '1003'],
    appearsIn: ['NEWHOPE', 'EMPIRE', 'JEDI'],
    primaryFunction: 'Astromech',
  },
];

const starships = [
  {
    id: '3000',
    name: 'Millenium Falcon',
    length: 34.37,
  },
  {
    id: '3001',
    name: 'X-Wing',
    length: 12.5,
  },
  {
    id: '3002',
    name: 'TIE Advanced x1',
    length: 9.2,
  },
  {
    id: '3003',
    name: 'Imperial shuttle',
    length: 20,
  },
];

module.exports = {
  humanoids,
  droids,
  starships,
};
