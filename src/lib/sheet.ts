// Source: https://github.com/wevisdemo/conforall/blob/main/web/src/utils/sheets.ts

import { csv } from 'd3-fetch';

export interface Row {
  nouns: string;
  adjective: string;
  verbs: string;
  adverbs: string;
}

const LOCATION_SHEET_ID = '143LAVljEpg9deO-tgjNm9Hfgodr-2aXu016RB4PHikU';
const LOCATION_SHEET_NAME = 'sorted';

const locationUrl = encodeURI(
  `https://docs.google.com/spreadsheets/d/${LOCATION_SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${LOCATION_SHEET_NAME}`,
);

export const fetchWords = async () =>
  csv(
    locationUrl,
    (d: any) => ({
      nouns: d['nouns'],
      adjective: d['adjective'],
      verbs: d['verbs'],
      adverbs: d['adverbs'],
    }) as Row,
  ) as Promise<Row[]>;