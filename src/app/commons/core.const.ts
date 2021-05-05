export class CoreConst {
  static TABLE_PAGE_LENGTH: number = 10;
  static FORMAT_DATETIME: string = 'DD/MM/YYYY HH:mm:ss';
  static FORMAT_DATE: string = 'DD/MM/YYYY';
  static TABLE_ROWS_INFO: string = 'Hiển thị _END_/_TOTAL_';

  constructor(x: any) {
    CoreConst.TABLE_PAGE_LENGTH = x.TABLE_PAGE_LENGTH;
    CoreConst.FORMAT_DATETIME = x.FORMAT_DATETIME;
    CoreConst.FORMAT_DATE = x.FORMAT_DATE;
    CoreConst.TABLE_ROWS_INFO = 'Hiển thị _END_/_TOTAL_';
  }
}
export class Config {
  TABLE_CALENDAR_RANGE = 30;
  THUMBNAIL_PAGE_LENGTH: number = 4;
  TABLE_PAGE_LENGTH: number = 10;
  FORMAT_DATETIME: string = "DD/MM/YYYY HH:mm:ss";
  FORMAT_DATE: string = "DD/MM/YYYY";
  FORMAT_DAY_MONTH: string = "DD/MM";
  TABLE_ROWS_INFO: string = 'Hiển thị _END_/_TOTAL_';
  AES_KEY: string = '8056483646328763';
  AES_IV: string = '8056483646328763';
}

