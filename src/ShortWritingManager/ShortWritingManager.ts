interface ShortText {
  text: string;
  id: number;
  tags: string[];
  category: string;
};

interface Chapter {
  name: string;
  shortTextsInOrder: ShortText[];
};

interface OrderedShortTextCollection {
  name: string;
  chaptersInOrder: Chapter[];
};

interface ShortTextJSON extends JSON {
  version: string;
  title: string;
  categories: string[];
  tags: string[];
  texts: ShortText[];
  ordering?: { "TBD-later": string[] }
};

class ShortWritingManager {
  private allShortTexts: ShortText[];
  private categories: string[];
  private tags: string[];

  constructor() { }

  public readDataFromJSON(jsonData: ShortTextJSON) {
    this.categories = jsonData.categories;
    this.tags = jsonData.tags;
    this.allShortTexts = jsonData.texts;
  }

  public getShortTextListByModeAsPlainText(): string {
    let allTextsInPlainText = `All texts (SUM: ${this.allShortTexts.length}):`;
    const delimiter = "\n- - -\n";
    this.allShortTexts.forEach((shortText, index)=>{
      allTextsInPlainText += shortText.text + delimiter;
    });
    return allTextsInPlainText;
  }
}

export default ShortWritingManager;
