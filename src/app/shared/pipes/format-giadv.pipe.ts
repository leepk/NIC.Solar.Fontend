import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Pipe({
  name: 'giaDv'
})
export class FormatGiaDichVuPipe implements PipeTransform {

  constructor() {

  }

  transform(number: number, arg1: string = '') {
    var stringNum = number.toString().split("").reverse();
    var length = stringNum.length;
    var formatStringArr = [];
    var formatString = [];
    var count = 0;
    
    for (var i = 0; i < length; i++) {
      if (count == 2 && i < length -1) {
        formatStringArr.push(stringNum[i]);
        formatStringArr.push(arg1);
        count = 0;
      } else {
        formatStringArr.push(stringNum[i]);
        count = count + 1;
      }
    }
   
    formatStringArr = formatStringArr.reverse();
    for (var i = 0; i < formatStringArr.length; i++) {
      formatString = formatString + formatStringArr[i];
    }
    return formatString;
  }

}
