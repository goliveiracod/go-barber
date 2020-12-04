import IMailTemplateProvider from '../model/IMailTemplateProvider';
import IParseMailTemplateDTO from '../dtos/IParseTemplateMailDTO';

export default class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse({ file }: IParseMailTemplateDTO): Promise<string> {
    return file;
  }
}
