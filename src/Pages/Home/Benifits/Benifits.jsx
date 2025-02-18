import React, { useContext } from 'react';
import { ThemeContext } from '../../../Context/ThemeProvider';
import heart from '/src/assets/Image/heart.png';
import health from '/src/assets/Image/health.jpeg';
import feel from '/src/assets/Image/feel.png';

function Benefits() {
  const { theme } = useContext(ThemeContext);

  const getBgClass = () => (theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900');
  const getCardBgClass = () => (theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-800');
  const getTextClass = () => (theme === 'dark' ? 'text-gray-200' : 'text-gray-700');
  const getSubTextClass = () => (theme === 'dark' ? 'text-gray-400' : 'text-gray-600');

  return (
    <div className={``}>
      <div className="container mx-auto">
        <section>
          <h2 className={`text-3xl font-bold text-center ${getTextClass()} mb-8`}>
            Benefits of Donating Blood
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className={`p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl ${getCardBgClass()}`}>
              <div className="text-center">
                <img src={heart} className="w-20 h-20 rounded-full mx-auto" alt="heart" />
              </div>
              <h3 className={`text-xl font-bold text-center mt-4 ${getTextClass()}`}>Improves Heart Health</h3>
              <p className={`mt-2 ${getSubTextClass()}`}>
                Regular blood donation helps reduce harmful iron levels in the body, which can promote a healthier heart.
              </p>
            </div>

            {/* Card 2 */}
            <div className={`p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl ${getCardBgClass()}`}>
              <div className="text-center">
                <img src={health} className="w-20 h-20 rounded-full mx-auto" alt="health check-up" />
              </div>
              <h3 className={`text-xl font-semibold text-center mt-4 ${getTextClass()}`}>Health Check-Up</h3>
              <p className={`mt-2 ${getSubTextClass()}`}>
                Each donation includes a free health screening to ensure you are fit and healthy. This can help in early detection of potential health issues.
              </p>
            </div>

            {/* Card 3 */}
            <div className={`p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl ${getCardBgClass()}`}>
              <div className="text-center">
                <img src={feel} className="w-20 h-20 rounded-full mx-auto" alt="feel good" />
              </div>
              <h3 className={`text-xl font-semibold text-center mt-4 ${getTextClass()}`}>Feel Good Factor</h3>
              <p className={`mt-2 ${getSubTextClass()}`}>
                Donating blood can boost your mood and provide a sense of purpose and contribution. It’s a rewarding experience that can enhance your emotional well-being.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Benefits;
