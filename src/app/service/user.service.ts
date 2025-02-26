import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../enviroment/enviroment';
import { RoleHierarchy, Roles } from '../shared/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userRole: Roles | null = null;


  constructor(private http: HttpClient) {}
 
  login(user:any): Observable<any>{
    return this.http.post(`${environment.apiUrl}/login`, user)
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('token') !== null;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  testing() {
    return this.http.post(`${environment.apiUrl}/testing`, {});
  }

  testingUpdate(data: any[]) {
    return this.http.post(`${environment.apiUrl}/testingUpdate`, {data});
  }
  
  getUsers(): Observable<any> {
    return this.http.get( environment.apiUrl +  '/app/users/getAll')
      }
  
  getUser(): Observable<any> {
    return this.http.get( environment.apiUrl +  '/app/users');
  }

  getUserRole() {
    this.userRole = localStorage.getItem('role') as Roles | null;
    return this.userRole;
  }

  hasPermissionRole(requiredRole: Roles | Roles[]): boolean {
    const userRole = this.getUserRole(); // Obtener el rol del usuario actual
    if (!userRole) {
      return false;
    }
  
    if (Array.isArray(requiredRole)) {
      return requiredRole.some(role => RoleHierarchy[userRole]?.includes(role));
    }
  
    return RoleHierarchy[userRole]?.includes(requiredRole) || false;
  }
  

  getUserById(id: number): Observable<any> {
    return this.http.post( environment.apiUrl +  '/app/users/getById', {id});
  }

  changePassword(currentPassword: string, newPassword: string) {
    return this.http.post( environment.apiUrl +  '/app/users/passwordChange', {oldPassword: currentPassword, newPassword});
  }

  createUser(user: any) {
    return this.http.post( environment.apiUrl +  '/app/users/createUser', {user});
  }

  editUser(id: any, user: any) {
    return this.http.post( environment.apiUrl +  '/app/users/update', {id, user});
  }

  setPassword(id: any, password: any) {
    return this.http.post( environment.apiUrl +  '/app/users/setPassword', {id, password});
  }

  checkUser(id: number) {
    return this.http.post(`${environment.apiUrl}/app/users/${id}/findUser`, {});
  }

  show(userId: number) {
    return this.http.post(`${environment.apiUrl}/app/users/${userId}/show`, {});
  }

  forgotpassword(email:any): Observable<any>{
    return this.http.post(`${environment.apiUrl}/restore-token`, email);
  }

  verifyToken(token: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/restore-token/${token}`);
  }

  resetPassword(token: string, password: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/reset-password`, {token,password});
  }

  downloadMassiveTemplate() {
    return this.http.get(`${environment.apiUrl}/app/users/downloadUserMassiveTemplate`, {
      responseType: 'blob'
    });
  }

  uploadUserMassive(file: File) {
    const selectedFile = file;
    const fd = new FormData();
    fd.append('file', selectedFile, selectedFile.name);
    return this.http.post(environment.apiUrl + '/app/users/uploadUserMassive', fd, { responseType: 'blob' });
  }

}
