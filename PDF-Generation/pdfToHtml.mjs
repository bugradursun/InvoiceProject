import * as pdfjs from 'pdfjs-dist/legacy/build/pdf';

type ELUS = {
  islemTarihi: string;
  alimSatimBelgeNo: string;
  duzenlemeTarihi: string;
  yatSatIslemNo: string;
  saticiAdSoyadUnvan: string;
  saticiTcknVkn: string;
  saticiAdres: string;
  yatAlIslemNo: string;
  aliciAdSoyadUnvan: string;
  aliciTcknVkn: string;
  aliciAdres: string;
  urunBilgisi: string;
  isin: string;
  urunSinifi: string;
  urunTuru: string;
  urunGrubu: string;
  urunTipi: string;
  urunAltGrubu: string;
  hasatYili: string;
  depolandigiYer: string;
  lisansliDepo: string;
  islemMiktari: string;
  birimFiyat: string;
  islemTutari: string;
  tescilUcreti: string;
  tazminFonu: string;
  depoUcreti: string;
  kesintilerSonrasiNetTutar: string;
};

const checkEmptyString = (str: string): boolean => {
  return !(!str || str.trim() === '' || str.trim() === ' ');
};

const isNum = (val: number | string): boolean => {
  return !Number.isNaN(Number(val));
};

const findTcknVkn = (array: string[]): string[] => {
  return array.filter((item) => {
    return isNum(item) && (item.length === 10 || item.length === 11);
  });
};

const getContent = async (file: Uint8Array): Promise<ELUS> => {
  const doc = await pdfjs.getDocument(file).promise;
  const page = await doc.getPage(1);
  const result = await page.getTextContent();

  const strings = result.items
    .map((item) => {
      if ('str' in item) {
        return item.str;
      }

      return '';
    })
    .filter((item) => item !== '');

  let content = strings.filter(checkEmptyString);

  content = content.splice(10, content.length);

  const badWords = [
    'DEPO REZERV BELGESİ',
    'BELGE NO:',
    'DÜZENLEME TARİHİ:',
    'FATURA TARİHİ:',
    'SATICI BİLGİLERİ',
    'İŞLEM',
    'NO',
    'AD SOYAD / ÜNVAN',
    'SAHİPLİK',
    'ORANI',
    'TCKN / VKN',
    'ADRES',
    'VERGİ DAİRESİ',
    'VERGİ DAİRESİ',
    'ALICI BİLGİLERİ',
    'İŞLEM NO',
    'YAT.',
    'AL.',
    'İŞLEM',
    'NO',
    'AD SOYAD / ÜNVAN',
    'SAHİPLİK',
    'ORANI',
    'TCKN / VKN',
    'ADRES',
    'VERGİ',
    'DAİRESİ',
    'ÜRÜN BİLGİLERİ',
    'ÜRÜN TÜRÜ:',
    'ÜRÜN SINIFI:',
    'ÜRÜN GRUBU:',
    'ÜRÜN TİPİ:',
    'ISIN:',
    'ÜRÜN KODU:',
    'ÜRÜN ALT GRUBU:',
    'HASAT YILI:',
    'DEPOLANDIĞI YER:',
    'DEPO:',
    'BİRİM FİYAT (TL/KG)',
    'İŞLEM MİKTARI',
    'İŞLEM TUTARI',
    'KDV',
    'İŞLEM BİLGİLERİ',
    'KESİNTİLER',
    'NET TUTAR',
    'KESİNTİLER SONRASI NET TUTAR',
  ];

  content = content.filter((item) => badWords.indexOf(item) === -1);

  const arrayOfTcknVkns = findTcknVkn(content);
  const indexOfSaticiTcknVkn = content.indexOf(arrayOfTcknVkns[0]);

  const saticiAdSoyadUnvan = !isNum(content[indexOfSaticiTcknVkn - 2])
    ? ${content[indexOfSaticiTcknVkn - 2]} ${content[indexOfSaticiTcknVkn - 1]}
    : content[indexOfSaticiTcknVkn - 1];

  const indexOfAliciTcknVkn = content.indexOf(arrayOfTcknVkns[1]);

  const aliciAdSoyadUnvan = !isNum(content[indexOfAliciTcknVkn - 2])
    ? ${content[indexOfAliciTcknVkn - 2]} ${content[indexOfAliciTcknVkn - 1]}
    : content[indexOfAliciTcknVkn - 1];

  const saticiAdres = ${content[indexOfSaticiTcknVkn + 1]} ${content[indexOfSaticiTcknVkn + 2]};
  const aliciAdres = ${content[indexOfAliciTcknVkn + 1]} ${content[indexOfAliciTcknVkn + 2]};

  const elus = {
    islemTarihi: content[0],
    alimSatimBelgeNo: content[1],
    duzenlemeTarihi: content[2],
    yatSatIslemNo: content[3],
    saticiAdSoyadUnvan,
    saticiTcknVkn: arrayOfTcknVkns[0],
    saticiAdres,
    yatAlIslemNo: content[indexOfAliciTcknVkn - 3],
    aliciAdSoyadUnvan,
    aliciTcknVkn: arrayOfTcknVkns[1],
    aliciAdres,
    urunBilgisi: content[content.length - 17],
    isin: content[content.length - 14],
    urunSinifi: content[content.length - 12],
    urunTuru: content[content.length - 16],
    urunGrubu: content[content.length - 13],
    urunTipi: content[content.length - 15],
    urunAltGrubu: content[content.length - 11],
    hasatYili: content[content.length - 10],
    depolandigiYer: content[content.length - 9],
    lisansliDepo: content[content.length - 8],
    islemMiktari: content[content.length - 7],
    birimFiyat: content[content.length - 6],
    islemTutari: content[content.length - 5],
    tescilUcreti: content[content.length - 4],
    tazminFonu: content[content.length - 3],
    depoUcreti: content[content.length - 2],
    kesintilerSonrasiNetTutar: content[content.length - 1],
  };
  console.log(elus);

  return elus;
};

export {getContent};