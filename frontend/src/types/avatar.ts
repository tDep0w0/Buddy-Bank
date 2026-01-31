import { DefaultAvatarKey } from "../../assets/images/Generic_Profile_Avatar";

export type AvatarValue =
  | { type: "photo"; uri: string }
  | { type: "default"; key: DefaultAvatarKey };

