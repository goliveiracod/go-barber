export default interface IStoraProvider {
  saveFile(file: string): Promise<string>;
  deleteFile(file: string): Promise<void>;
}
