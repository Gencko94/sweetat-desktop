import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { IUSER_ADDRESS } from '../../../lib/interfaces/IUserAddress';
import { convertCoordinateToAddress } from '../../../lib/queries/queries';

interface IGetAddressComponentsProps {
  lat?: number;
  lng?: number;
}

export const useGetAddressComponents = ({
  lat,
  lng,
}: IGetAddressComponentsProps) => {
  const { i18n } = useTranslation();
  return useQuery<IUSER_ADDRESS>(
    [lat, lng, i18n.language, 'user-address'],
    () => convertCoordinateToAddress({ lat, lng, lang: i18n.language }),
    { enabled: typeof lat && typeof lng !== 'undefined' }
  );
};
