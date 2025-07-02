import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Contact model as received from/sent to the backend API.
 */
export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
}

/**
 * Model for creating a new contact (no id).
 */
export interface NewContact {
  name: string;
  email: string;
  phone: string;
}

/**
 * Service for interacting with the contacts backend API.
 */
@Injectable()
export class ContactService {
  // NOTE: Replace <backend_url> with the actual deployed backend API URL.
  private apiUrl = '<backend_url>/contacts';

  constructor(
    // eslint-disable-next-line no-unused-vars
    private http: HttpClient
  ) {}

  // PUBLIC_INTERFACE
  /** Fetches the contact list from the API. */
  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl);
  }

  // PUBLIC_INTERFACE
  /** Creates a new contact via the API. */
  createContact(contact: NewContact): Observable<Contact> {
    return this.http.post<Contact>(this.apiUrl, contact);
  }

  // PUBLIC_INTERFACE
  /** Deletes a contact by id via the API. */
  deleteContact(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
