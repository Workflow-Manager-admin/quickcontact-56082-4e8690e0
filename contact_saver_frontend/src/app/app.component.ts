import { Component, OnInit } from '@angular/core';
import { ContactService, Contact, NewContact } from './contact.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * The root component for the Contact Saver App.
 * It renders the navigation bar, add contact form, and the contact list.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ContactService],
})
export class AppComponent implements OnInit {
  title = 'Contact Saver';

  contacts: Contact[] = [];
  loading: boolean = false;
  form: NewContact = { name: '', email: '', phone: '' };
  error: string | null = null;
  submitting: boolean = false;

  // eslint-disable-next-line no-unused-vars
  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.fetchContacts();
  }

  /** Loads the list of contacts from the backend */
  // PUBLIC_INTERFACE
  fetchContacts() {
    this.loading = true;
    this.error = null;
    this.contactService.getContacts().subscribe({
      next: (contacts) => { this.contacts = contacts; this.loading = false; },
      error: () => { this.loading = false; this.error = 'Failed to load contacts.'; }
    });
  }

  /** Handles form submission for adding a new contact */
  // PUBLIC_INTERFACE
  submitContact() {
    if (!this.form.name.trim() || !this.form.email.trim() || !this.form.phone.trim()) {
      this.error = 'All fields are required.';
      return;
    }
    this.submitting = true;
    this.error = null;
    this.contactService.createContact(this.form).subscribe({
      next: (contact) => {
        this.contacts.unshift(contact);
        this.form = { name: '', email: '', phone: '' };
        this.submitting = false;
      },
      error: () => {
        this.error = 'Failed to add contact.';
        this.submitting = false;
      }
    });
  }

  /** Handles deletion of a contact */
  // PUBLIC_INTERFACE
  deleteContact(contact: Contact) {
    if (this.confirmDialog(`Delete contact "${contact.name}"?`)) {
      this.contactService.deleteContact(contact.id).subscribe({
        next: () => {
          this.contacts = this.contacts.filter(c => c.id !== contact.id);
        },
        error: () => {
          this.error = 'Failed to delete contact.';
        }
      });
    }
  }

  /** Lint-safe confirm dialog */
  private confirmDialog(msg: string): boolean {
    // eslint-disable-next-line no-undef
    return typeof confirm === 'function' ? confirm(msg) : false;
  }

  /** Dismisses the error message */
  // PUBLIC_INTERFACE
  dismissError() {
    this.error = null;
  }
}
