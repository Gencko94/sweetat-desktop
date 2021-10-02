export interface IUser {
  id: number;
  auth_token: string;
  name: string;
  email: string;
  phone: string;
  default_address_id: number;
  default_address: {
    id: number;
    user_id: number;
    address: string;
    house: string | null;
    landmark: string | null;
    tag: string | null;
    created_at: string;
    updated_at: string;
    latitude: string;
    longitude: string;
    nickname: string | null;
    area: string | null;
    type: string | null;
    block: string | null;
    street: string | null;
    avenue: string | null;
    building: string | null;
    floor: string | null;
    apartment: string | null;
    directions: string | null;
    mobile_number: string | null;
    landline: string | null;
    coverage_area_id: number;
  };
  delivery_pin: string;
  wallet_balance: number;
}
