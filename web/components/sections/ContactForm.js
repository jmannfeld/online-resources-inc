import React from 'react';
import styles from './ContactForm.module.css';
import { FiSend } from 'react-icons/fi';

function ContactForm(props) {
  console.log('ContactForm props', props);
  const { name: formTitle } = props;
  return (
    <div>
      <form name="contact" netlify netlify-honeypot="bot-field" hidden>
        <input type="text" name="name" />
        <input type="email" name="email" />
        <textarea name="message"></textarea>
      </form>
      <form
        name="Contact Form"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        action="/"
        className={styles.contactFormContainer}
      >
        <h2>{formTitle}</h2>
        <input type="hidden" name="form-name" value="Contact Form" />
        <p>
          <label>
            Full name <input type="text" name="name" />
          </label>
        </p>
        <p>
          <label>
            Company/organization name <input type="text" name="company-name" />
          </label>
        </p>
        <p>
          <label>
            Email <input type="email" name="email" />
          </label>
        </p>
        <p>
          <label>
            Phone <input type="tel" name="phone" />
          </label>
        </p>
        <p>
          <label>
            I am a current customer <input type="checkbox" name="current-customer" />
          </label>
        </p>
        <p>
          <label>
            Message <textarea name="message"></textarea>
          </label>
        </p>
        <p>
          <button type="submit">
            <span>Send</span>
            <FiSend />
          </button>
        </p>
      </form>
    </div>
  );
}
export default ContactForm;