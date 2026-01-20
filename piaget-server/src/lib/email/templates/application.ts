import { config } from "../../../config/app.config";

const clientOrigin = config.CLIENT_ORIGIN;

export const applicationFormTemplate = ({
  surname,
  firstname,
  email,
  phoneNumber,
  paymentReferenceCode,
  dateOfBirth,
  gender,
  nationality,
  highestEducationLevel,
  courseOfInterest,
  program,
  jambScore,
  waecSubjects,
  intendedStartDate,
  personalMessage,
  sourceOfInformation,
  otherSourceDetails,
}: {
  surname: string;
  firstname: string;
  email: string;
  phoneNumber: string;
  paymentReferenceCode: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  highestEducationLevel: string;
  courseOfInterest: string;
  program: string;
  jambScore: string;
  waecSubjects: string;
  intendedStartDate: string;
  personalMessage?: string;
  sourceOfInformation: string;
  otherSourceDetails?: string;
}) => ({
  to: "info@bitnoxsolution.com",
  subject: `New Application Submission from ${firstname} ${surname}`,
  text: `
You have received a new application submission via the Application Form on (${clientOrigin}).

Payment Reference Code: ${paymentReferenceCode}
Full Name: ${surname} ${firstname}
Email: ${email}
Phone Number: ${phoneNumber}
Date of Birth: ${dateOfBirth}
Gender: ${gender}
Nationality: ${nationality}
Highest Education Level: ${highestEducationLevel}
Course of Interest: ${courseOfInterest}
Program: ${program}
JAMB Score/Credits/Passes: ${jambScore}
WAEC/NECO Subjects: ${waecSubjects}
Intended Start Date: ${intendedStartDate}
Source of Information: ${sourceOfInformation}
${otherSourceDetails ? `Other Source Details: ${otherSourceDetails}` : ""}
${personalMessage ? `Personal Message: ${personalMessage}` : ""}
  `,
  html: `
    <html>
    <head>
      <style>
        body, html {
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          color: #333333;
        }
        .container {
          max-width: 700px;
          margin: 0 auto;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
          background-color: #a01e1e;
          font-size: 24px;
          font-weight: bold;
          color: #ffffff;
          padding: 20px;
          text-align: center;
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
        }
        .content {
          padding: 20px;
        }
        .content h2 {
          font-size: 20px;
          margin-bottom: 10px;
          color: #a01e1e;
        }
        .section {
          margin-bottom: 25px;
          border-bottom: 1px solid #e0d5cc;
          padding-bottom: 15px;
        }
        .section:last-of-type {
          border-bottom: none;
        }
        .section-title {
          font-weight: bold;
          color: #a01e1e;
          margin-bottom: 10px;
          font-size: 16px;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-bottom: 10px;
        }
        .form-row.full {
          grid-template-columns: 1fr;
        }
        .form-group {
          margin-bottom: 10px;
        }
        .label {
          font-weight: bold;
          color: #333333;
          font-size: 14px;
          margin-bottom: 5px;
        }
        .value {
          color: #555555;
          font-size: 14px;
          word-break: break-word;
        }
        .footer {
          font-size: 14px;
          color: #999999;
          text-align: center;
          padding: 20px;
          border-top: 1px solid #e0d5cc;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">New Application Submission</div>
        <div class="content">
          <h2>New Student Application Received</h2>
          <p>A new application has been submitted through the application form on ${clientOrigin}</p>

          <!-- Personal Information Section -->
          <div class="section">
            <div class="section-title">📋 Personal Information</div>
            <div class="form-row">
              <div class="form-group">
                <div class="label">Surname:</div>
                <div class="value">${surname}</div>
              </div>
              <div class="form-group">
                <div class="label">First Name:</div>
                <div class="value">${firstname}</div>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <div class="label">Email Address:</div>
                <div class="value">${email}</div>
              </div>
              <div class="form-group">
                <div class="label">Phone Number:</div>
                <div class="value">${phoneNumber}</div>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <div class="label">Date of Birth:</div>
                <div class="value">${dateOfBirth}</div>
              </div>
              <div class="form-group">
                <div class="label">Gender:</div>
                <div class="value">${gender}</div>
              </div>
            </div>
            <div class="form-row full">
              <div class="form-group">
                <div class="label">Nationality:</div>
                <div class="value">${nationality}</div>
              </div>
            </div>
          </div>

          <!-- Academic Information Section -->
          <div class="section">
            <div class="section-title">🎓 Academic Information</div>
            <div class="form-row full">
              <div class="form-group">
                <div class="label">Highest Level of Education:</div>
                <div class="value">${highestEducationLevel}</div>
              </div>
            </div>
            <div class="form-row full">
              <div class="form-group">
                <div class="label">WAEC/NECO Subjects:</div>
                <div class="value">${waecSubjects}</div>
              </div>
            </div>
            <div class="form-row full">
              <div class="form-group">
                <div class="label">JAMB Score/Credits/Passes:</div>
                <div class="value">${jambScore}</div>
              </div>
            </div>
          </div>

          <!-- Program Information Section -->
          <div class="section">
            <div class="section-title">📚 Program Information</div>
            <div class="form-row">
              <div class="form-group">
                <div class="label">Course of Interest:</div>
                <div class="value">${courseOfInterest}</div>
              </div>
              <div class="form-group">
                <div class="label">Program:</div>
                <div class="value">${program}</div>
              </div>
            </div>
            <div class="form-row full">
              <div class="form-group">
                <div class="label">Intended Start Date:</div>
                <div class="value">${intendedStartDate}</div>
              </div>
            </div>
          </div>

          <!-- Payment Information Section -->
          <div class="section">
            <div class="section-title">💳 Payment Information</div>
            <div class="form-row full">
              <div class="form-group">
                <div class="label">Payment Reference Code:</div>
                <div class="value">${paymentReferenceCode}</div>
              </div>
            </div>
          </div>

          <!-- Source & Message Section -->
          <div class="section">
            <div class="section-title">ℹ️ Additional Information</div>
            <div class="form-row full">
              <div class="form-group">
                <div class="label">Where did you hear about us?</div>
                <div class="value">${sourceOfInformation}</div>
              </div>
            </div>
            ${
              otherSourceDetails
                ? `
            <div class="form-row full">
              <div class="form-group">
                <div class="label">Other Source Details:</div>
                <div class="value">${otherSourceDetails}</div>
              </div>
            </div>
            `
                : ""
            }
            ${
              personalMessage
                ? `
            <div class="form-row full">
              <div class="form-group">
                <div class="label">Personal Message:</div>
                <div class="value">${personalMessage.replace(/\n/g, "<br/>")}</div>
              </div>
            </div>
            `
                : ""
            }
          </div>
        </div>
        <div class="footer">
          <p>This application was submitted from your platform's application form. Please review and update the application status accordingly.</p>
        </div>
      </div>
    </body>
    </html>
  `,
});
