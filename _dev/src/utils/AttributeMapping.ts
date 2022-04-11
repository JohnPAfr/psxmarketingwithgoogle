import {AttributesInfos} from '../store/modules/product-feed/state';

export type AttributeToMap = {
  category: string;
  fields: FieldsContent[];
}

export type FieldsContent = {
  label: string;
  name: string;
  tooltip: Boolean;
  recommended: RecommendedFieldType[];
  mapped: RecommendedFieldType[]|null;
  required: Boolean;
}

export type RecommendedFieldType = {
  name: string[]|string;
  type: string;
}

export type AttributeResponseFromAPI = {
  description?: CategoryDetail[];
  gtin?: CategoryDetail[];
  mpn?: CategoryDetail[];
  brand?: CategoryDetail[];
  ageGroup?: CategoryDetail[];
  color?: CategoryDetail[];
  gender?: CategoryDetail[];
  size?: CategoryDetail[];
  maxEnergyEfficiencyClass?: CategoryDetail[];
  minEnergyEfficiencyClass?: CategoryDetail[];
  energyEfficiencyClass?: CategoryDetail[];
  material?: CategoryDetail[];
  pattern?: CategoryDetail[];
}

export type CategoryDetail = {
  id?: string;
  ids?: string[];
  type: string;
}

export function formatMappingToApi(attributes: AttributeToMap[]): AttributeResponseFromAPI {
  return attributes
    .map((attr) => attr.fields)
    .reduce((acc, cur) => acc.concat(cur), [])
    .reduce((acc, cur) => {
      if (cur.mapped !== null) {
        acc[cur.name] = cur.mapped.map((attr) => makeMappingRetro(attr));
      } else {
        acc[cur.name] = cur.recommended.map((attr) => makeMappingRetro(attr));
      }
      return acc;
    }, {});
}

function makeMappingRetro(attr:RecommendedFieldType): CategoryDetail {
  if (Array.isArray(attr.name)) {
    return {
      ids: attr.name,
      type: attr.type,
    };
  }
  return {
    id: attr.name,
    type: attr.type,
  };
}

export function parseApiResponse(
  attributes,
  attributesFromShop: AttributesInfos[],
  mappingFromApi: AttributeResponseFromAPI,
): FieldsContent[] {
  const attributeToMap = attributes.reduce(
    (acc, curr) => [...acc, ...curr.fields],
    [],
  );

  attributeToMap.forEach((attribute) => {
    if (!attribute.mapped) {
      attribute.mapped = [];
    }
    attributesFromShop
      .filter((a) => oneInOne(mappingFromApi[attribute.name]?.map((e) => e.id) || [], a.name))
      .forEach((e) => {
        if (!deepEqual(attribute.mapped, e)) {
          attribute.mapped.push(e);
        }
      });
  });

  return attributeToMap;
}

export function filterMapping(mapping: AttributeResponseFromAPI): AttributeResponseFromAPI {
  const result = {};

  Object.keys(mapping).forEach((key) => {
    result[key] = mapping[key].filter((attr) => attr.id || attr.ids);
  });

  return result;
}

export function oneInOne(a: string[], b: string[]): boolean {
  return a.some((item) => b.includes(item));
}

export function deepEqual(x, y) : boolean {
  return x.some((item) => arrayEquals(item.name, y.name));
}

export function arrayEquals(a: string[], b: string[]): boolean {
  return Array.isArray(a)
    && Array.isArray(b)
    && a.length === b.length
    && a.every((val, index) => val === b[index]);
}
