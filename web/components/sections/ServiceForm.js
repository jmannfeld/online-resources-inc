import React from 'react';
import styles from './SubmissionForm.module.css';
import { FiSend } from 'react-icons/fi';

function ServiceForm(props) {
  const { heading, subheading } = props;
  const options = ['.0005”', '.001”', '.002”', '.003”', '.005” or greater'];

  return (
    <div>
      <form
        name="Service Form"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        action="/"
        className={styles.submissionFormContainer}
      >
        <h2 id="service-form">{heading}</h2>
        <p>{subheading}</p>
        <input type="hidden" name="form-name" value="Service Form" />
        <p>
          <label>
            Full name <input type="text" name="name" />
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
            What is the purpose of having your part scanned?
            <select name="purpose[]">
              <option value="">--Select--</option>
              <option value="CAD">Reverse Engineering into CAD</option>
              <option value="Quality Control">Inspection/Analysis/Quality Control</option>
              <option value="3D">3D Printing</option>
              <option value="Other">Other</option>
            </select>
          </label>
        </p>
        <p>
          <label>
            What end deliverable file type is required?
            <select name="file-type[]">
              <option value="">--Select--</option>
              <option value="STL">STL</option>
              <option value="PC">Points Cloud</option>
              <option value="CAD">CAD model in STEP, IGES, Parasolids</option>
              <option value="PDF">Inspection report in PDF, HTML, Excel</option>
              <option value="Other">Other</option>
            </select>
          </label>
        </p>
        <p>
          <label>
            What is the approximate part size? <input type="text" name="part-size" />
          </label>
        </p>
        <p>
          <label>
            Is this a request for on-site scanning or can the items be shipped/delivered to Online
            Resources, Inc. office?
            <select name="location[]">
              <option value="">--Select--</option>
              <option value="Here">On-site</option>
              <option value="Shipped">Shipped/delivered</option>
            </select>
          </label>
        </p>
        <p>
          <label>
            What are the accuracy requirements?
            <select name="accuracy[]" className="custom-select">
              <option value="">--Select--</option>
              <option value=".0005">.0005”</option>
              <option value=".001">.001”</option>
              <option value=".002">.002”</option>
              <option value=".003">.003”</option>
              <option value=".005">.005” or greater</option>
            </select>
          </label>
        </p>
        <p>
          <label>
            Of what materials is the part made of?
            <input type="text" name="part-material" placeholder="metal, plastic, wood..." />
          </label>
        </p>
        <p>
          <label>
            Is the part rigid or flexible? <input type="text" name="part-flexibility" />
          </label>
        </p>
        <p>
          <label>
            Please attach a photo of the part so that we can better understand its scanning
            requirements.
            <input type="file" name="file-upload" />
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
export default ServiceForm;