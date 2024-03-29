import React from 'react';
import styles from './SubmissionForm.module.css';
import { FiSend } from 'react-icons/fi';
import CompanyContact from './CompanyContact';
import ReCAPTCHA from 'react-google-recaptcha';

function ContactForm(props) {
  const { name: formTitle, config } = props;
  return (
    <div className={styles.submissionFormWrapper}>
      <CompanyContact config={config} />
      <form
        name="Contact Form"
        method="POST"
        data-netlify="true"
        data-netlify-recaptcha="true"
        netlify-honeypot="bot-field"
        action="/"
        className={styles.submissionFormContainer}
      >
        <input
          type="hidden"
          name="subject"
          data-remove-prefix
          value="Sales inquiry from onlineresourcesinc.com"
        />
        <h2>{formTitle}</h2>
        <input type="hidden" name="form-name" value="Contact Form" />
        <p className={styles.hiddenInput}>
          <label>
            Don’t fill this out if you’re human: <input name="bot-field" />
          </label>
        </p>
        <p>
          <label>
            Name <input type="text" name="name" />
          </label>
        </p>
        <p>
          <label>
            Email <input type="email" name="email" />
          </label>
        </p>
        <p>
          <label>
            Company/organization name <input type="text" name="company-name" />
          </label>
        </p>
        <p>
          <label>
            Phone <input type="tel" name="phone" />
          </label>
        </p>
        <p>
          <label>
            Message <textarea name="message" rows="4"></textarea>
          </label>
        </p>
        <p>
          <label title="current-customer-label">
            I am a current customer <input type="checkbox" name="current-customer" />
          </label>
        </p>
        <ReCAPTCHA sitekey="6LfNb94gAAAAAHFFYPcMAI1AMzZU_nJktsG_7I4p" />
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
