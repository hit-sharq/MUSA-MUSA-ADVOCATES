import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Use | Musa & Musa Advocates",
  description: "Terms of Use for Musa & Musa Advocates website and legal services.",
}

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Use</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and using the Musa & Musa Advocates website ("Website"), you accept and agree to be bound
                by the terms and provision of this agreement. If you do not agree to abide by the above, please do not
                use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. No Attorney-Client Relationship</h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <p className="text-yellow-800 font-medium">
                  <strong>IMPORTANT:</strong> Use of this website does not create an attorney-client relationship
                  between you and Musa & Musa Advocates.
                </p>
              </div>
              <p className="text-gray-700 mb-4">
                The information provided on this website is for general informational purposes only and should not be
                construed as legal advice. An attorney-client relationship is formed only through a signed retainer
                agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Legal Disclaimer</h2>
              <p className="text-gray-700 mb-4">
                The information on this website is provided "as is" without any representations or warranties, express
                or implied. We make no representations or warranties in relation to the legal information on this
                website.
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>This website does not constitute legal advice</li>
                <li>Laws vary by jurisdiction and change frequently</li>
                <li>Each legal situation is unique and fact-specific</li>
                <li>You should consult with a qualified attorney for legal advice</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Confidentiality Notice</h2>
              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                <p className="text-red-800 font-medium">
                  <strong>WARNING:</strong> Do not send confidential information through this website or email until an
                  attorney-client relationship has been established.
                </p>
              </div>
              <p className="text-gray-700 mb-4">
                Communications via this website or email are not secure and may not be privileged or confidential.
                Unsolicited information sent to our firm cannot be considered confidential.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Use License</h2>
              <p className="text-gray-700 mb-4">
                Permission is granted to temporarily download one copy of the materials on this website for personal,
                non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and
                under this license you may not:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Modify or copy the materials</li>
                <li>Use the materials for commercial purposes or public display</li>
                <li>Attempt to reverse engineer any software on the website</li>
                <li>Remove any copyright or proprietary notations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. User Conduct</h2>
              <p className="text-gray-700 mb-4">You agree not to use the website to:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Violate any applicable laws or regulations</li>
                <li>Transmit harmful, threatening, or offensive content</li>
                <li>Interfere with the website's operation or security</li>
                <li>Collect information about other users</li>
                <li>Impersonate any person or entity</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                All content on this website, including text, graphics, logos, images, and software, is the property of
                Musa & Musa Advocates and is protected by copyright and other intellectual property laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                In no event shall Musa & Musa Advocates or its suppliers be liable for any damages (including, without
                limitation, damages for loss of data or profit, or due to business interruption) arising out of the use
                or inability to use the materials on this website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Privacy Policy</h2>
              <p className="text-gray-700 mb-4">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the
                website, to understand our practices.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Jurisdiction and Governing Law</h2>
              <p className="text-gray-700 mb-4">
                These terms and conditions are governed by and construed in accordance with the laws of Kenya. Any
                disputes relating to these terms shall be subject to the exclusive jurisdiction of the courts of Kenya.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Professional Responsibility</h2>
              <p className="text-gray-700 mb-4">
                Musa & Musa Advocates is licensed to practice law in Kenya and is subject to the rules and regulations
                of the Law Society of Kenya. We maintain professional liability insurance and adhere to all applicable
                ethical standards.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Modifications</h2>
              <p className="text-gray-700 mb-4">
                We may revise these terms of use at any time without notice. By using this website, you are agreeing to
                be bound by the then current version of these terms of use.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms of Use, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Musa & Musa Advocates</strong>
                </p>
                <p className="text-gray-700">Email: officialmutuku@gmail.com</p>
                <p className="text-gray-700">Phone: +254 758 251 399</p>
                <p className="text-gray-700">Address: Nairobi, Kenya</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Severability</h2>
              <p className="text-gray-700 mb-4">
                If any provision of these Terms of Use is found to be invalid or unenforceable, the remaining provisions
                shall remain in full force and effect.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
