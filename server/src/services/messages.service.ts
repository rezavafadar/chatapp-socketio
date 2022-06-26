import { I18n, ConfigurationOptions } from 'i18n';
import path from 'path';

class MessagesService {
  private i18n: I18n;
  constructor() {
    this.i18n = new I18n();
    this.config({
      directory: path.join(__dirname, '..', 'constants', 'i18n-locals'),
    });
  }

  private config(config: ConfigurationOptions) {
    this.i18n.configure(config);
  }

  getMessage(key: string) {
    return this.i18n.__(key);
  }
}

export const messageService = new MessagesService();
