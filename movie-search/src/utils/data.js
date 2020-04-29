export default class Data {
  static apikey = '4addd8c6';

  static async getSearchResults(word, pageNumber) {
    const requestResult = await fetch(`https://www.omdbapi.com/?s=${word}&page=${pageNumber}&apikey=${Data.apikey}`);
    const result = await requestResult.json();
    return result;
  }
}
