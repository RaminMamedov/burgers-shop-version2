export type Suggestion = {
  value: string;
  unrestricted_value: string;
};

export type YandexGeocodeResponse = {
  response: {
    GeoObjectCollection: GeoObjectCollection;
  };
};

type GeoObjectCollection = {
  featureMember: Array<{ GeoObject: GeoObject }>;
};

type GeoObject = {
  metaDataProperty: {
    GeocoderMetaData: {
      text: string;
      Address: {
        formatted: string;
      };
    };
  };
};