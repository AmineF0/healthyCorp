import React from 'react';
import Hero from '../components/Hero';
import CompanyGraph from '../components/CompanyGraph';
import Stats from '../components/Stats';

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Hero />
      
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Company Structure</h2>
        <CompanyGraph />
      </section>

      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Company Analytics</h2>
        <Stats />
      </section>

      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">NexusCode</h3>
              <p>Engineering Tomorrow's Solutions</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact</h3>
              <p>info@nexuscode.com</p>
              <p>+1 (555) 123-4567</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Address</h3>
              <p>123 Innovation Drive</p>
              <p>Tech Valley, CA 94025</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>&copy; 2024 NexusCode. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;