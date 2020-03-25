import { ShortText, ShortTextJSON } from './interfaces';

class ShortWritingManager {
  private jsonVersion: number; // TODO: upgrade version from number to version text (like 0.2.13)
  private jsonTitle: string;
  private allShortTexts: ShortText[];
  private categories: string[];
  private tags: string[];

  constructor() {
    this.getNextTextId = this.getNextTextId.bind(this);
    this.readDataFromJSON = this.readDataFromJSON.bind(this);
    this.addText = this.addText.bind(this);
    this.getShortTextListAsPlainText = this.getShortTextListAsPlainText.bind(this);
    this.getJsonFromCurrentData = this.getJsonFromCurrentData.bind(this);
  }

  private getNextTextId() {
    const allCurrentid = this.allShortTexts.map(shortText => Number(shortText.id));
    const currentMaxId = Math.max(...allCurrentid);
    return currentMaxId + 1;
  }

  public readDataFromJSON(jsonData: ShortTextJSON | string) {
    if (typeof jsonData === 'string') {
      jsonData = JSON.parse(jsonData) as ShortTextJSON;
    }
    this.jsonVersion = Number(jsonData.version);
    this.jsonTitle = jsonData.title;
    this.categories = jsonData.categories;
    this.tags = jsonData.tags;
    this.allShortTexts = jsonData.texts;
  }

  public addText(shortText: ShortText) {
    shortText.id = this.getNextTextId();
    this.allShortTexts.push(shortText);
  }

  public getShortTextListAsPlainText(): string {
    const delimiter = "\n- - -\n";
    let allTextsInPlainText = `All texts (SUM: ${this.allShortTexts.length}):`;
    allTextsInPlainText += delimiter;
    this.allShortTexts.forEach((shortText, index) => {
      allTextsInPlainText += shortText.text + delimiter;
    });
    return allTextsInPlainText;
  }

  public getJsonFromCurrentData() {
    const fullObject: ShortTextJSON = {
      version: `${this.jsonVersion}`,
      title: this.jsonTitle,
      categories: this.categories,
      tags: this.tags,
      texts: this.allShortTexts,
    };
    return JSON.stringify(fullObject, null, 2);
  }

  public bumpVersion() {
    this.jsonVersion += 1;
  }
}

export default ShortWritingManager;
