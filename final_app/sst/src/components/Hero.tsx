import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Code2, Cloud } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3')] bg-cover bg-center opacity-10"></div>
      
      <div className="relative container mx-auto px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Engineering Tomorrow's Solutions
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12">
            At the intersection of innovation and artificial intelligence
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-gray-800 bg-opacity-50 rounded-xl"
            >
              <Brain className="w-12 h-12 mx-auto mb-4 text-blue-400" />
              <h3 className="text-xl font-semibold mb-2">AI Integration</h3>
              <p className="text-gray-400">Cutting-edge AI solutions for modern business challenges</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-gray-800 bg-opacity-50 rounded-xl"
            >
              <Code2 className="w-12 h-12 mx-auto mb-4 text-green-400" />
              <h3 className="text-xl font-semibold mb-2">Custom Development</h3>
              <p className="text-gray-400">Tailored software solutions that scale with your needs</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-gray-800 bg-opacity-50 rounded-xl"
            >
              <Cloud className="w-12 h-12 mx-auto mb-4 text-purple-400" />
              <h3 className="text-xl font-semibold mb-2">Cloud Solutions</h3>
              <p className="text-gray-400">Future-proof cloud-native applications</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;