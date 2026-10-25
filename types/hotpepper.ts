
export type Area = {
  code: string;
  name: string;
};

export type Genre = {
  code?: string;
  name: string;
  catch?: string;
};

export type Budget = {
  code: string;
  name: string;
  average: string;
};

export type Shop = {
  id: string;
  name: string;
  logo_image?: string;
  name_kana?: string;
  address: string;
  station_name?: string;
  ktai_coupon?: string;

  large_service_area?: Area;
  service_area?: Area;
  large_area?: Area;
  middle_area?: Area;
  small_area?: Area;

  lat: number;
  lng: number;

  genre: Genre;
  sub_genre?: {
    code: string;
    name: string;
  };

  budget?: Budget;
  budget_memo?: string;

  catch: string;
  capacity?: number;
  access: string;
  mobile_access?: string;

  urls: {
    pc: string;
  };

  photo: {
    pc: {
      l: string;
      m: string;
      s: string;
    };
    mobile?: {
      l: string;
      s: string;
    };
  };

  open?: string;
  close?: string;
  party_capacity?: number;

  wifi?: string;
  wedding?: string;
  course?: string;
  free_drink?: string;
  free_food?: string;
  private_room?: string;
  horigotatsu?: string;
  tatami?: string;
  card?: string;
  non_smoking?: string;
  charter?: string;
  ktai?: string;
  parking?: string;
  barrier_free?: string;
  other_memo?: string;
  sommelier?: string;
  open_air?: string;
  show?: string;
  equipment?: string;
  karaoke?: string;
  band?: string;
  tv?: string;
  english?: string;
  pet?: string;
  child?: string;
  lunch?: string;
  midnight?: string;
  shop_detail_memo?: string;

  coupon_urls?: {
    pc: string;
    sp: string;
  };
};

export type HotPepperResponse = {
  results: {
    api_version: string;
    results_available: number;
    results_returned: number;
    results_start: number;
    shop: Shop[];
  };
};
