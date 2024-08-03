import { PickerValidDate } from "@mui/x-date-pickers";
import { BackendResponse } from "./base";

export type BestHand = 'left-handed' | 'right-handed';
export type Backhand = 'one-handed' | 'two-handed';

export interface CreatePlayerRequest {
  avatar: File | null;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  date_of_birth: string;
  hometown_country: string;
  hometown_state_province: string;
  hometown_city: string;
  weight: string;
  height: string;
  best_hand: BestHand;
  backhand: Backhand;
}

export interface CreatePlayerResponse extends BackendResponse {
  data: {
    avatar: string;
    email: string;
    first_name: string;
    last_name: string;
    date_of_birth: PickerValidDate;
    hometown_country: string;
    hometown_state_province: string;
    hometown_city: string;
    weight: string;
    height: string;
    best_hand: BestHand;
    backhand: Backhand;
  };
}
