import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import '../../styles/privacy.css'

function Privacy() {
  const navigate = useNavigate()

  return (
    <div className="privacy-page">
      <button className="back-button-privacy" onClick={() => navigate(-1)} title="Go back">
        <ArrowLeft size={20} />
        <span>Back</span>
      </button>

      <div className="privacy-container">
        <div className="privacy-content">
          <section className="privacy-section">
            <h1 className="privacy-title">Privacy Policy</h1>
            <p className="privacy-date">Last updated: March 22, 2026</p>

            <div className="privacy-body">
              <h2>1. Introduction</h2>
              <p>
                E-Sakay ("we" or "us" or "Company") operates the E-Sakay mobile application. This page informs you of our policies 
                regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have 
                associated with that data.
              </p>

              <h2>2. Information Collection and Use</h2>
              <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>

              <h3>Types of Data Collected:</h3>
              <ul>
                <li><strong>Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally 
                identifiable information that can be used to contact or identify you ("Personal Data"). This may include, but is not 
                limited to:
                  <ul>
                    <li>Email address</li>
                    <li>First name and last name</li>
                    <li>Phone number</li>
                    <li>Address, State, Province, ZIP/Postal code, City</li>
                    <li>Cookies and Usage Data</li>
                  </ul>
                </li>
                <li><strong>Usage Data:</strong> We may also collect information on how the Service is accessed and used ("Usage Data"). 
                This may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser 
                version, the pages you visit, the time and date of your visit, the time spent on those pages, and other diagnostic data.
                </li>
              </ul>

              <h2>3. Use of Data</h2>
              <p>E-Sakay uses the collected data for various purposes:</p>
              <ul>
                <li>To provide and maintain our Service</li>
                <li>To notify you about changes to our Service</li>
                <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
                <li>To provide customer care and support</li>
                <li>To gather analysis or valuable information so that we can improve our Service</li>
                <li>To monitor the usage of our Service</li>
                <li>To detect, prevent and address technical issues</li>
              </ul>

              <h2>4. Security of Data</h2>
              <p>
                The security of your data is important to us but remember that no method of transmission over the Internet or method 
                of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, 
                we cannot guarantee its absolute security.
              </p>

              <h2>5. Sharing Your Information</h2>
              <p>
                We may share your information with third parties in the following circumstances:
              </p>
              <ul>
                <li>With your consent for any other purpose</li>
                <li>If required by law or as a result of legal process</li>
                <li>To protect and defend our rights and property</li>
                <li>To prevent or investigate possible wrongdoing in connection with the Service</li>
                <li>To protect the personal safety of users of the Service or the public</li>
              </ul>

              <h2>6. Data Retention</h2>
              <p>
                E-Sakay will retain your Personal Data only for as long as necessary for the purposes set out in this Privacy Policy. 
                We will retain and use your Personal Data to the extent necessary to comply with our legal obligations.
              </p>

              <h2>7. Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy 
                on this page and updating the "Last updated" date at the top of this Privacy Policy.
              </p>

              <h2>8. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <ul>
                <li>By email: privacy@esakay.com</li>
                <li>By phone: +1 (555) 000-0000</li>
                <li>By mail: E-Sakay, 123 Main Street, City, Country</li>
              </ul>

              <h2>9. User Rights</h2>
              <p>
                You have the right to request access to, correction of, or deletion of your personal data. You may also request that 
                we restrict the processing of your personal data or request portability of your data. To exercise any of these rights, 
                please contact us using the information provided above.
              </p>

              <h2>10. Cookie Policy</h2>
              <p>
                E-Sakay uses cookies to enhance your experience. Cookies are small files that a site or its service provider transfers 
                to your computer's hard drive through your Web browser (if you allow). You can choose to have your computer warn you each 
                time a cookie is being sent, or you can choose to turn off all cookies.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Privacy
