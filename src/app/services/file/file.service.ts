import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  uploadFile(file: File, userId: string | null) {
    const formData = new FormData();
    formData.append('file', file);
    console.log('FormData content:', {
      file: formData.get('file'),
      userId: formData.get('user_id')
    });

    return this.http.post(`${this.apiUrl}/avatar/upload/${userId}`, formData);
  }

  getAvatar(fileId: string | null) {
    return this.http.get(`${this.apiUrl}/un_auth/files/download/${fileId}`, 
      { responseType: 'blob' }
    ).pipe(
      map(blob => {
        return URL.createObjectURL(blob);
      })
    );
  }
}

