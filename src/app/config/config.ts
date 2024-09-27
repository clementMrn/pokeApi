export interface pokedexCardColor {
  type: string;
  mainColor: string;
  darkColor: string;
  lightColor: string;
}

export interface buttonFab {
  text: string;
  favIcon?: string;
  img?: string;
  action: string;
}

export interface cardType {
  text: string;
  img: string;
}

export interface buttonDetails {
  text: string;
  action: string;
}

export const pokeCardButtonConfig: pokedexCardColor[] = [
  {
    type: 'grass',
    mainColor: "#48D0B0",
    darkColor: "#41c4a4",
    lightColor: "#5DDFC6",
  },
  {
    type: 'fire',
    mainColor: "#FB6C6C",
    darkColor: "#F55D5D",
    lightColor: "#FD8585",
  },
  {
    type: 'water',
    mainColor: "#77BDFE",
    darkColor: "#6DB3F7",
    lightColor: "#90D1FE",
  },
  {
    type: 'electric',
    mainColor: "#FFCE4B",
    darkColor: "#daab42",
    lightColor: "#FFE580",
  },
  {
    type: 'psychic',
    mainColor: "#A06EB4",
    darkColor: "#8B5C99",
    lightColor: "#B085C5",
  },
  {
    type: 'fighting',
    mainColor: "#D1938C",
    darkColor: "#B0756F",
    lightColor: "#E1B0A7",
  },
  {
    type: 'normal',
    mainColor: "#A8A77A",
    darkColor: "#8B8A62",
    lightColor: "#C0BF95",
  },
  {
    type: 'bug',
    mainColor: "#A6B91A",
    darkColor: "#a0ab25",
    lightColor: "#C0D732",
  },
  {
    type: 'dragon',
    mainColor: "#6F35FC",
    darkColor: "#592BCC",
    lightColor: "#9A7FFC",
  },
  {
    type: 'dark',
    mainColor: "#705746",
    darkColor: "#574537",
    lightColor: "#8A705E",
  },
  {
    type: 'fairy',
    mainColor: "#D685AD",
    darkColor: "#B06A8B",
    lightColor: "#EBA3C2",
  },
  {
    type: 'ghost',
    mainColor: "#735797",
    darkColor: "#5D4777",
    lightColor: "#8D6FB3",
  },
  {
    type: 'ice',
    mainColor: "#98D8D8",
    darkColor: "#7BAAAA",
    lightColor: "#B4E4E4",
  },
  {
    type: 'steel',
    mainColor: "#B7B7D0",
    darkColor: "#9696AB",
    lightColor: "#D3D3E4",
  },
  {
    type: 'rock',
    mainColor: "#B6A136",
    darkColor: "#927B29",
    lightColor: "#D4BD48",
  },
  {
    type: 'flying',
    mainColor: "#A98FF3",
    darkColor: "#8A74CC",
    lightColor: "#C1AFF9",
  },
  {
    type: 'default',
    mainColor: "#b7b7b7",
    darkColor: "#929292",
    lightColor: "#D3D3D3",
  }
];

export const buttonFabConfig: buttonFab[] = [
  {
    text: "Search",
    favIcon: "search",
    action: "search"
  },
  {
    text: "All Gen",
    img: "../assets/poke-icon.png",
    action: "getAllGen"
  },
  {
    text: "All Type",
    img: "../assets/poke-icon.png",
    action: "getAllType"
  },
  {
    text: "Favorite Pokemon",
    favIcon: "favorite",
    action:'getFavorite'
  }
];

export const buttonDetailsConfig: buttonDetails[] = [
  {
    text: "About",
    action: "about"
  },
  {
    text: "Base Stats",
    action: "baseStats"
  },
  {
    text: "Evolution",
    action: "evolution"
  },
  {
    text: "Moves",
    action:'moves'
  }
];
