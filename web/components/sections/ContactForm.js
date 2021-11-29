import React from 'react';
import styles from './ContactForm.module.css';

function ContactForm() {
  return (
    <div>
      <a href="/">Link to Home</a>
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
        <input type="hidden" name="form-name" value="Contact Form" />
        <p>
          <label>
            Your Name: <input type="text" name="name" />
          </label>
        </p>
        <p>
          <label>
            Your Email: <input type="email" name="email" />
          </label>
        </p>
        <p>
          <label>
            Your Role:{' '}
            <select name="role[]" multiple>
              <option value="leader">Leader</option>
              <option value="follower">Follower</option>
            </select>
          </label>
        </p>
        <p>
          <label>
            Message: <textarea name="message"></textarea>
          </label>
        </p>
        <p>
          <button type="submit">Send</button>
        </p>
      </form>
    </div>
  );
}
export default ContactForm;
