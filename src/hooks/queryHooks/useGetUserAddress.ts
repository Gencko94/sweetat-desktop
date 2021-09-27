import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { IUSER_ADDRESS } from "../../../lib/interfaces/IUserAddress";
import { convertCoordinateToAddress } from "../../../lib/queries/queries";

interface IGetUserAddressProps {
  lat?: number;
  lng?: number;
}

export const useGetUserAddress = ({ lat, lng }: IGetUserAddressProps) => {
  const { i18n } = useTranslation();
  return useQuery<IUSER_ADDRESS>(
    [lat, lng, i18n.language, "user-address"],
    () => convertCoordinateToAddress({ lat, lng, lang: i18n.language }),
    { enabled: typeof lat && typeof lng !== "undefined" }
  );
};
