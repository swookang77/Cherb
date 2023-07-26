export default interface Vitamin {
  id: string;
  title: string;
  supplementFacts: object;
}

export interface CombiListElem {
  uuid: string;
  title: string;
}

export interface VitaminListElem {
  uuid: string;
  title: string;
}

export interface TotalElem {
  fullname: string;
  name: string;
  AmountPerServing: number;
}

export interface CombinationData {
  total: Array<object>,
  vitaminList: Array<object>,
}