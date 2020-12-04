import IParseMailTemplateDTO from '../dtos/IParseTemplateMailDTO';

export default interface IMailTemplateProvider {
  parse(data: IParseMailTemplateDTO): Promise<string>;
}
