import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import '../../styles/terms.css'

function Terms() {
  const navigate = useNavigate()

  return (
    <div className="terms-page">
      <button className="back-button-terms" onClick={() => navigate(-1)} title="Go back">
        <ArrowLeft size={20} />
        <span>Back</span>
      </button>

      <div className="terms-container">
        <div className="terms-content">
          {/* Terms of Service Section */}
          <section className="terms-section">
            <h1 className="terms-title">Terms of Service</h1>
            <p className="terms-date">Last updated: March 22, 2026</p>

            <div className="terms-body">
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing and using E-Sakay, you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>

              <h2>2. Use License</h2>
              <p>
                Permission is granted to temporarily download one copy of the materials (information or software) on E-Sakay's 
                platform for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of 
                title, and under this license you may not:
              </p>
              <ul>
                <li>Modifying or copying the materials</li>
                <li>Using the materials for any commercial purpose or for any public display</li>
                <li>Attempting to decompile or reverse engineer any software contained on E-Sakay</li>
                <li>Removing any copyright or other proprietary notations from the materials</li>
                <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
              </ul>

              <h2>3. Disclaimer</h2>
              <p>
                The materials on E-Sakay's platform are provided on an 'as is' basis. E-Sakay makes no warranties, expressed or 
                implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties 
                or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property 
                or other violation of rights.
              </p>

              <h2>4. Limitations</h2>
              <p>
                In no event shall E-Sakay or its suppliers be liable for any damages (including, without limitation, damages for 
                loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials 
                on E-Sakay's platform, even if E-Sakay or an authorized representative has been notified orally or in writing of 
                the possibility of such damage.
              </p>

              <h2>5. Accuracy of Materials</h2>
              <p>
                The materials appearing on E-Sakay's platform could include technical, typographical, or photographic errors. 
                E-Sakay does not warrant that any of the materials on E-Sakay's platform are accurate, complete, or current. 
                E-Sakay may make changes to the materials contained on its platform at any time without notice.
              </p>

              <h2>6. Links</h2>
              <p>
                E-Sakay has not reviewed all of the sites linked to its platform and is not responsible for the contents of any 
                such linked site. The inclusion of any link does not imply endorsement by E-Sakay of the site. Use of any such 
                linked website is at the user's own risk.
              </p>

              <h2>7. Modifications</h2>
              <p>
                E-Sakay may revise these terms of service for its platform at any time without notice. By using this platform, 
                you are agreeing to be bound by the then current version of these terms of service.
              </p>

              <h2>8. Governing Law</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction where 
                E-Sakay operates, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </div>
          </section>

          {/* Privacy Policy Section */}
          <section className="terms-section privacy-section">
            <h1 className="terms-title">Privacy Policy</h1>
            <p className="terms-date">Last updated: March 22, 2026</p>

            <div className="terms-body">
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

              <h2>3. Security of Data</h2>
              <p>
                The security of your data is important to us but remember that no method of transmission over the Internet or method 
                of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, 
                we cannot guarantee its absolute security.
              </p>

              <h2>4. Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy 
                on this page and updating the "Last updated" date at the top of this Privacy Policy.
              </p>

              <h2>5. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <ul>
                <li>By email: privacy@esakay.com</li>
                <li>By phone: +1 (555) 000-0000</li>
                <li>By mail: E-Sakay, 123 Main Street, City, Country</li>
              </ul>

              <h2>6. User Rights</h2>
              <p>
                You have the right to request access to, correction of, or deletion of your personal data. You may also request that 
                we restrict the processing of your personal data or request portability of your data. To exercise any of these rights, 
                please contact us using the information provided above.
              </p>

              <h2>7. Cookie Policy</h2>
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

export default Terms
