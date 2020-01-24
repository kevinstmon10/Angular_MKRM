import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceUnderscore'
})
export class ReplaceUnderscorePipe implements PipeTransform {

  transform(value: string): string {

    //console.log(value.charAt(0).toUpperCase()+value.slice(1).replace("_"," "));
    return value.charAt(0).toUpperCase()+value.slice(1).replace(/_/g," ");
  }

}
