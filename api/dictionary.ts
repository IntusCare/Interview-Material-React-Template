type Dictionary = Record<string, string>;

class DictionaryChecker {
  // Method to check dictionary for keys with a specific value
  static checkDictionaryForValue(
    dictionary: Dictionary,
    targetValue: string
  ): void {
    for (const key in dictionary) {
      if (dictionary[key] === targetValue) {
        console.log(`Key "${key}" has the value ${targetValue}`);
      }
    }
  }
}
