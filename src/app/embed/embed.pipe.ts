import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'embed'
})
export class EmbedPipe implements PipeTransform {
  transform(text: string, values: Record<string, any>) {
    if (!text) return text;

    let match = text.match(URL_REGEXP);
    const html: string[] = [];
    while (match) {
      const url = match[0];
      const website = match[1];

      // Add all text before the URL
      html.push(text.substr(0, match.index));

      // Embed the URL
      html.push(`<a target="_blank" rel="nofollow" href="${url}">${url}</a>`);

      // Strip the text and the URL from the string and move on
      text = text.substring(match.index + url.length);
      match = text.match(URL_REGEXP);
    }
    html.push(text);

    return html.join('');
  }
}

// https://gist.github.com/dperini/729294
const URL_REGEXP = new RegExp(
  // protocol identifier
  '(?:(?:https?|ftp)://)' +
  // user:pass authentication
  '(?:\\S+(?::\\S*)?@)?' +
  '(' +
  // IP address exclusion
  // private & local networks
  '(?!(?:10|127)(?:\\.\\d{1,3}){3})' +
  '(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})' +
  '(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})' +
  // IP address dotted notation octets
  // excludes loopback network 0.0.0.0
  // excludes reserved space >= 224.0.0.0
  // excludes network & broacast addresses
  // (first & last IP address of each class)
  '(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])' +
  '(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}' +
  '(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))' +
  '|' +
  // host name
  '(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)' +
  // domain name
  '(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*' +
  // TLD identifier
  '(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))' +
  ')' +
  // port number
  '(?::\\d{2,5})?' +
  // resource path
  '(?:/\\S*)?', 'i'
);
