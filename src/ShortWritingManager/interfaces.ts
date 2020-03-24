export interface ShortText {
  text: string;
  id?: number;
  tags: string[];
  category: string;
};

export interface Chapter {
  name: string;
  shortTextsInOrder: ShortText[];
};

export interface OrderedShortTextCollection {
  name: string;
  chaptersInOrder: Chapter[];
};

export interface ShortTextJSON {
  version: string;
  title: string;
  categories: string[];
  tags: string[];
  texts: ShortText[];
  ordering?: { "TBD-later": string[] }
};
