import styles from './index.module.scss';
import Head from 'next/head';
import { format } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';
import axios from 'axios';

export default function Home({ cases }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Covid 19 Tracker 🇦🇴</title>
      </Head>
      <div className={styles.nav}>
        <div className='logo'>
          <h1>
            COVID 19 Tracker <span> 🇦🇴 </span>
          </h1>
          <h2>Ultima Actualização {cases?.updatedAt}</h2>
        </div>
        <div>
          <span>{cases?.today}</span>
        </div>
      </div>
      <div className={styles.main}>
        <div>
          <img src='/angola.svg' />
        </div>
        <div className={styles.covidcases}>
          <div className={styles.card}>
            <h2>Casos Confirmados</h2>
            <span>{cases?.confirmed}</span>
          </div>
          <div className={styles.card}>
            <h2>Casos Activos</h2>
            <span>{cases?.active}</span>
          </div>
          <div className={styles.card}>
            <h2>Total de Mortes</h2>
            <span>{cases?.deaths}</span>
          </div>
          <div className={styles.card}>
            <h2>Total de Recuperados</h2>
            <span className={styles.recovery}>{cases?.recovered}</span>
          </div>
          <p>Powered By @IdarcioOliveira</p>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const { data } = await axios.get(
    'https://covid-19-ao.herokuapp.com/api/general'
  );

  const cases = {
    active: data?.data?.active,
    recovered: data?.data?.recovered,
    deaths: data?.data?.deaths,
    confirmed: data?.data?.confirmed,
    updatedAt: format(new Date(data?.data?.updated_at), 'EEEE, dd LLLL YYY', {
      locale: ptBr,
    }),
    today: format(new Date(), 'EEEE, dd LLLL YYY', {
      locale: ptBr,
    }),
  };

  return {
    props: {
      cases,
    },
  };
};
