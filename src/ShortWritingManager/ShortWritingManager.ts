import { ShortText, ShortTextJSON, GetShortTextListAsPlainTextInterface } from './interfaces';

class ShortWritingManager {
  private jsonVersion: number; // TODO: upgrade version from number to version text (like 0.2.13)
  private jsonTitle: string = '';
  private allShortTexts: ShortText[] = [];
  private categories: string[] = [];
  private tags: string[] = [];

  private getNextTextId() {
    const allCurrentid = this.allShortTexts.map(shortText => Number(shortText.id));
    const currentMaxId = allCurrentid.length ? Math.max(...allCurrentid) : 0;
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

  public addCategory(categoryName: string) {
    categoryName = categoryName.trim();
    if (categoryName && !this.categories.includes(categoryName)) {
      this.categories.push(categoryName);
    }
  }

  public addTag(tagName: string) {
    tagName = tagName.trim();
    if (tagName && !this.tags.includes(tagName)) {
      this.tags.push(tagName);
    }
  }

  public addText(shortText: ShortText) {
    shortText.id = this.getNextTextId();
    if (!shortText.category) {
      shortText.category = "uncategorized";
    }
    this.allShortTexts.push(shortText);
    shortText.tags.forEach(tag => this.addTag(tag));
    this.addCategory(shortText.category);
  }

  public getShortTextListAsPlainText({
    delimiter,
    showCategory,
    showTags
  }: GetShortTextListAsPlainTextInterface = {
      delimiter: "\n- - -\n",
      showCategory: false,
      showTags: true
    }): string {
    let allTextsInPlainText = `All texts (SUM: ${this.allShortTexts.length}):`;
    allTextsInPlainText += delimiter;
    this.allShortTexts.forEach((shortText, index) => {
      let rowText = shortText.text;
      if (showCategory) {
        rowText += ` [${shortText.category}] `
      }
      if (showTags && shortText.tags.length) {
        rowText += ` (${shortText.tags.join(',')}) `
      }
      allTextsInPlainText += rowText + delimiter;
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

  private mapShortTexts(): Map<string, number[]> {
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

  public getDuplicateTexts() {
    const mapOfTexts = this.mapShortTexts();
    mapOfTexts.forEach((idsOfTexts, text) => {
      if (idsOfTexts.length < 2) {
        mapOfTexts.delete(text);
      }
    });
    return mapOfTexts;
  }

  public showDuplicateTexts() {
    const mapOfCurrentTexts = this.mapShortTexts();
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

  private getWordsArrayFromText(text: string): string[] {
    // Adjust here to your own language. The following regex is for hungarian language.
    const REGEX_FOR_CHARS_TO_REMOVE = /[.,?!:'"]/g;
    let textToUse = text.replace(REGEX_FOR_CHARS_TO_REMOVE, ' ');
    textToUse = textToUse.replace(/\s+/g, ' ').trim().toLocaleLowerCase();
    return textToUse.split(' ');
  }

  private getSameWordCountBetweenTwoTexts(text1: string, text2: string): number {
    let sameWordCount = 0;
    const text1WordsArray = this.getWordsArrayFromText(text1);
    const text2WordsArray = this.getWordsArrayFromText(text2);
    text1WordsArray.forEach(word => {
      if (text2WordsArray.includes(word)) {
        sameWordCount++;
      }
    });
    return sameWordCount;
  }

  // TODO: refactor later, as this first approach uses getWordsArrayFromText() for wordsArrayOfTestedText in each iteration and it is unneccessary.
  // TODO: add proper types later
  // TODO: refactor to use better structure than an array
  public getExistingMostSimilars(text: string) {
    const similiarityArray: ShortText[][] = [];

    this.allShortTexts.forEach(shortText => {
      const sameWordCount = this.getSameWordCountBetweenTwoTexts(text, shortText.text);
      if (!similiarityArray[sameWordCount]) {
        similiarityArray[sameWordCount] = [];
      }
      similiarityArray[sameWordCount].push(shortText);
    });

    return similiarityArray;
  }

  public deleteAllShortTexts() {
    this.allShortTexts = [];
  }
}

export default ShortWritingManager;
