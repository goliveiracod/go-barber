import fs from 'fs';
import { compile } from 'handlebars';

import IMailTemplateProvider from '../model/IMailTemplateProvider';
import IParseMailTemplateDTO from '../dtos/IParseTemplateMailDTO';

export default class HandlebarsMailTemplateProvider
  implements IMailTemplateProvider {
  public async parse({
    file,
    variables,
  }: IParseMailTemplateDTO): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });
    const parseTemplate = compile(templateFileContent);

    return parseTemplate(variables);
  }
}
