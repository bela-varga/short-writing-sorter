import { ShortText, ShortTextJSON } from './interfaces';

class ShortWritingManager {
  private jsonVersion: number; // TODO: upgrade version from number to version text (like 0.2.13)
  private jsonTitle: string = '';
  private allShortTexts: ShortText[] = [];
  private categories: string[] = [];
  private tags: string[] = [];

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

  private mapShortTexts(shortTextArray: ShortText[]): Map<string, number[]> {
    const mapOfTexts = new Map<string, number[]>();
    this.allShortTexts.forEach((shortText) => {
      const text = shortText.text.trim();
      const id = Number(shortText.id);
      if (mapOfTexts.has(text)) {
        const idArrayForThisText = mapOfTexts.get(text);
        idArrayForThisText?.push(id);
      } else {
        mapOfTexts.set(text, [id]);
      }
    });
    return mapOfTexts;
  }

  public showDuplicateTexts() {
    const mapOfCurrentTexts = this.mapShortTexts(this.allShortTexts);
    let hasDuplicate = false;
    mapOfCurrentTexts.forEach((idsOfTexts, text) => {
      if (idsOfTexts.length > 1) {
        hasDuplicate = true;
        console.log(`Duplicate text: '${text}' - ids: ${idsOfTexts.join(',')}`);
      }
    });
    if (!hasDuplicate) {
      console.log(`There was no duplicate texts amongst the ${mapOfCurrentTexts.size} texts.`)
    }
  }

  public getAllTags(): string[] {
    return this.tags;
  }

  public getAllUsedTags(): string[] {
    const usedTagsSet = new Set<string>();
    this.allShortTexts?.forEach((shortText) => {
      shortText.tags.forEach(tag => usedTagsSet.add(tag));
    });
    return Array.from(usedTagsSet);
  }

  public getUnusedTags(): string[] {
    const allUsedTags = this.getAllUsedTags();
    return this.tags?.filter(tag => !allUsedTags.includes(tag));
  }
}

export default ShortWritingManager;
