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
  /**
   * The backend API base URL.
   * For local development: adjust the port below if your Flask backend uses a different port.
   * Backend is served at http://localhost:3001 per container config.
   * For production, update as needed (consider environment variables).
   */
  private apiUrl = 'http://localhost:3001/contacts';

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
