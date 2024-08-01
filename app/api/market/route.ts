import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.COINMARKETCAP_API_KEY;
  
  try {
    const listingsResponse = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
      params: {
        start: '1',
        limit: '500',
        convert: 'USD'
      },
      headers: {
        'X-CMC_PRO_API_KEY': apiKey
      }
    });

    const cryptos = listingsResponse.data.data;
    const ids = cryptos.map((crypto: any) => crypto.id).join(',');

    const infoResponse = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/info', {
      params: {
        id: ids
      },
      headers: {
        'X-CMC_PRO_API_KEY': apiKey
      }
    });

    const infoData = infoResponse.data.data;

    const combinedData = cryptos.map((crypto: any) => ({
      ...crypto,
      logo: infoData[crypto.id]?.logo
    }));

    return NextResponse.json({ data: combinedData });
  } catch (error) {
    return NextResponse.json({ error: 'Une erreur est survenue lors de la récupération des données' }, { status: 500 });
  }
}
