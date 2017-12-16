import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/storage';

@Injectable()
export class FileUploadService {
  upload(path: string, file: File) {
    return firebase.storage().ref().child(path).put(file);
  }

  delete(path: string) {
    return firebase.storage().refFromURL(path).delete();
  }
}
