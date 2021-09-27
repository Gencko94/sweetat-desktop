import { Typography } from '@mui/material'
import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'react-i18next'


export const getServerSideProps: GetServerSideProps = async ({locale}) => {
 
  return {
    props: {
      ...(await serverSideTranslations(locale as string,['common']))
    }
  }
}

const Home: NextPage = () => {
  const {t} = useTranslation()
  return (
   <Typography color='secondary' variant='h1'>{t("order-total")}</Typography>
  )
}

export default Home
