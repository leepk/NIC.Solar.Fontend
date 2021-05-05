import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Pipe({
  name: 'youtubeSafeUrl'
})
export class YoutubeSafeUrlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {

  }

  transform(videoURL: string): SafeResourceUrl {
    let videoId = videoURL.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
    console.log(videoURL)
    console.log(videoId)
    var link = 'http://www.youtube.com/' + videoId[1];
    console.log(this.sanitizer.bypassSecurityTrustResourceUrl(link));
    return this.sanitizer.bypassSecurityTrustResourceUrl(link);
  }

}
