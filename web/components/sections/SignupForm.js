import React from 'react';
import styles from './SubmissionForm.module.css';
import { FiSend } from 'react-icons/fi';

function SignupForm(props) {
  const { name, heading, description } = props;

  return (
    <div className={styles.signupFormWrapper}>
      <form
        name={name}
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        action="/"
        className={styles.submissionFormContainer}
      >
        <input
          type="hidden"
          name="subject"
          value={`${name} submission from onlineresourcesinc.com`}
        />
        <input type="hidden" name="form-name" value={name} />
        <h2 id="signup-form">{heading}</h2>
        <p className={styles.description}>{description}</p>
        <div className={styles.signupFormInputs}>
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
              Company/organization <input type="text" name="company-name" />
            </label>
          </p>
          <p>
            <label>
              Number of participants <input type="number" name="number-of-participants" />
            </label>
          </p>
          <p>
            <button type="submit">
              <span>Send</span>
              <FiSend />
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}
export default SignupForm;
