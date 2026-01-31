import Panda from "./panda.svg";
import Cat from "./cat.svg";
import Cat2 from "./cat_2.svg";
import Bird from "./bird.svg";
import Bird2 from "./bird_2.svg";
import Bug from "./bug.svg";
import Bull from "./bull.svg";
import Cow from "./cow.svg";
import Crocodile from "./crocodile.svg";
import Octopus from "./octopus.svg";
import Pig from "./pig.svg";
import Whale from "./whale.svg";
export const DEFAULT_AVATARS = {
  panda: Panda,
  cat: Cat,
  cat2: Cat2,
  bird: Bird,
  bird2: Bird2,
  bug: Bug,
  bull: Bull,
  cow: Cow,
  crocodile: Crocodile,
  octopus: Octopus,
  pig: Pig,
  whale: Whale,
};

export type DefaultAvatarKey = keyof typeof DEFAULT_AVATARS;
