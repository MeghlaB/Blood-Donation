import React from 'react'

export default function Featured() {
    return (
        <div>
            <section class="bg-red-50 py-16">
                <div class="container mx-auto px-4">
                    {/* section title */}
                    <div class="text-center mb-12">
                        <h2 class="text-4xl font-bold text-red-600">Why Donate Blood Through <span class="text-gray-800">Our Platform?</span></h2>
                        <p class="text-gray-600 mt-4">
                            Saving lives has never been easier! Join hands with us and make an impact.
                        </p>
                    </div>

                    {/* feactured grid section */}
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* grid-1 */}
                        <div class="bg-white shadow-md rounded-lg p-6 text-center">
                            <div class="text-red-500 text-5xl mb-4">
                                <i class="fas fa-hand-holding-medical"></i>
                            </div>
                            <h3 class="text-2xl font-bold text-gray-800">Life-Saving Platform</h3>
                            <p class="text-gray-600 mt-2">
                                Connect with patients in need directly and be a hero by donating blood.
                            </p>
                        </div>

                        {/* grid-2 */}
                        <div class="bg-white shadow-md rounded-lg p-6 text-center">
                            <div class="text-blue-500 text-5xl mb-4">
                                <i class="fas fa-search-location"></i>
                            </div>
                            <h3 class="text-2xl font-bold text-gray-800">Real-Time Search</h3>
                            <p class="text-gray-600 mt-2">
                                Find and connect with nearby blood donation campaigns instantly.
                            </p>
                        </div>

                        {/* grid-3 */}
                        <div class="bg-white shadow-md rounded-lg p-6 text-center">
                            <div class="text-green-500 text-5xl mb-4">
                                <i class="fas fa-user-friends"></i>
                            </div>
                            <h3 class="text-2xl font-bold text-gray-800">Community Support</h3>
                            <p class="text-gray-600 mt-2">
                                Join a compassionate network of donors and volunteers dedicated to saving lives.
                            </p>
                        </div>

                        {/* grid-4 */}
                        <div class="bg-white shadow-md rounded-lg p-6 text-center">
                            <div class="text-yellow-500 text-5xl mb-4">
                                <i class="fas fa-check-circle"></i>
                            </div>
                            <h3 class="text-2xl font-bold text-gray-800">Verified & Secure</h3>
                            <p class="text-gray-600 mt-2">
                                All donors and recipients are verified for a secure and trustworthy experience.
                            </p>
                        </div>

                        {/* grid-5 */}
                        <div class="bg-white shadow-md rounded-lg p-6 text-center">
                            <div class="text-purple-500 text-5xl mb-4">
                                <i class="fas fa-calendar-alt"></i>
                            </div>
                            <h3 class="text-2xl font-bold text-gray-800">Organized Drives</h3>
                            <p class="text-gray-600 mt-2">
                                Participate in well-organized donation drives to help reach those in urgent need.
                            </p>
                        </div>

                        {/* grid-6 */}
                        <div class="bg-white shadow-md rounded-lg p-6 text-center">
                            <div class="text-teal-500 text-5xl mb-4">
                                <i class="fas fa-chart-line"></i>
                            </div>
                            <h3 class="text-2xl font-bold text-gray-800">Track Your Impact</h3>
                            <p class="text-gray-600 mt-2">
                                See how your blood donations are making a difference in the lives of others.
                            </p>
                        </div>
                    </div>
                </div>
            </section>


        </div>
    )
}
