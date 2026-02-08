document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('bookingForm');
    const checkInInput = document.getElementById('checkIn');
    const checkOutInput = document.getElementById('checkOut');
    const successMsg = document.getElementById('successMessage');

    let currentBookingData = {};

    // Hotel Data
    const hotels = [
        {
            id: 1,
            name: "Azure Bay Resort",
            contact: "+1 (555) 123-4567",
            location: "North Shore, Maldives",
            price: 450,
            roomNumber: "302",
            maxMembers: 2,
            image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            luxury: ["Private Infinity Pool", "Personal Butler", "Ocean View Terrace", "Spa Membership"]
        },
        {
            id: 2,
            name: "The Velvet Manor",
            contact: "+44 20 7946 0123",
            location: "Kensington, London",
            price: 680,
            roomNumber: "Penthouse A",
            maxMembers: 4,
            image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            luxury: ["Gold-leaf Interiors", "Private Chef", "Wine Cellar Access", "Chauffeur Service"]
        },
        {
            id: 3,
            name: "Summit Peak Lodge",
            contact: "+1 (555) 987-6543",
            location: "Aspen Mountain, Colorado",
            price: 320,
            roomNumber: "105",
            maxMembers: 3,
            image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            luxury: ["Heated Balcony", "Ski-in Access", "Fireplace Suite", "Gourmet Breakfast"]
        }
    ];

    // Navigation logic
    window.showSection = (section) => {
        const sections = ['bookingSection', 'dashboardSection', 'detailsSection', 'confirmationSection'];
        sections.forEach(s => {
            const el = document.getElementById(s);
            if (s === section + 'Section') {
                el.classList.remove('hidden');
            } else {
                el.classList.add('hidden');
            }
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.showHotelDetails = (id) => {
        const hotel = hotels.find(h => h.id === parseInt(id));
        if (!hotel) return;

        const detailsEl = document.getElementById('detailsSection');
        detailsEl.innerHTML = `
            <div class="glass-card rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-2xl">
                <div class="md:w-1/2 h-[400px] md:h-auto overflow-hidden">
                    <img src="${hotel.image}" class="w-full h-full object-cover transition-transform duration-700 hover:scale-110" alt="${hotel.name}">
                </div>
                <div class="md:w-1/2 p-12 flex flex-col justify-center">
                    <span class="text-indigo-400 font-bold tracking-widest text-xs uppercase mb-4">Luxury Experience</span>
                    <h2 class="text-5xl font-bold text-white mb-6">${hotel.name}</h2>
                    
                    <div class="mb-8 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl">
                        <p class="text-xs font-bold uppercase tracking-widest text-indigo-300 mb-1">Booking for</p>
                        <p class="text-white text-xl font-semibold">${currentBookingData.fullName}</p>
                    </div>

                    <div class="space-y-4 mb-10">
                        ${hotel.luxury.map(l => `
                            <div class="flex items-center gap-4 text-emerald-400/90 italic">
                                <span class="text-2xl">✦</span>
                                <span class="text-lg font-light">${l}</span>
                            </div>
                        `).join('')}
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white/5 rounded-3xl border border-white/10 mb-10">
                        <div>
                            <p class="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Contact</p>
                            <p class="text-white">${hotel.contact}</p>
                        </div>
                        <div>
                            <p class="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Room</p>
                            <p class="text-white">${hotel.roomNumber}</p>
                        </div>
                        <div class="md:col-span-2">
                            <p class="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Location</p>
                            <p class="text-white">${hotel.location}</p>
                        </div>
                    </div>

                    <div class="flex gap-4">
                        <button onclick="showSection('dashboard')" class="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-5 rounded-2xl transition-all duration-300">
                            Back
                        </button>
                        <button onclick="confirmBooking(${hotel.id})" class="flex-[2] bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-5 rounded-2xl shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        `;
        showSection('details');
    };

    window.confirmBooking = (id) => {
        const hotel = hotels.find(h => h.id === parseInt(id));
        if (!hotel) return;

        const confirmMsg = document.getElementById('confirmationMessage');
        const summaryEl = document.getElementById('bookingSummary');

        confirmMsg.innerText = `Congratulations ${currentBookingData.fullName}, your luxury stay at ${hotel.name} is all set!`;

        summaryEl.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h4 class="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-4">Guest Details</h4>
                    <div class="space-y-4">
                        <div>
                            <p class="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Name</p>
                            <p class="text-white text-lg">${currentBookingData.fullName}</p>
                        </div>
                        <div>
                            <p class="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Phone</p>
                            <p class="text-white text-lg">${currentBookingData.phone}</p>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <p class="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Check-in</p>
                                <p class="text-white">${currentBookingData.checkIn}</p>
                            </div>
                            <div>
                                <p class="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Check-out</p>
                                <p class="text-white">${currentBookingData.checkOut}</p>
                            </div>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <p class="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Guests</p>
                                <p class="text-white">${currentBookingData.guests}</p>
                            </div>
                            <div>
                                <p class="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Category</p>
                                <p class="text-white uppercase text-xs">${currentBookingData.roomType}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h4 class="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-4">Resort Details</h4>
                    <div class="space-y-4">
                        <div>
                            <p class="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Property</p>
                            <p class="text-white text-lg">${hotel.name}</p>
                        </div>
                        <div>
                            <p class="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Location</p>
                            <p class="text-white">${hotel.location}</p>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <p class="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Room</p>
                                <p class="text-white">${hotel.roomNumber}</p>
                            </div>
                            <div>
                                <p class="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Contact</p>
                                <p class="text-white">${hotel.contact}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        showSection('confirmation');
    };

    const renderDashboard = () => {
        const grid = document.getElementById('hotelGrid');
        grid.innerHTML = hotels.map(hotel => `
            <div class="glass-card rounded-[2.5rem] overflow-hidden group hover:border-indigo-500/50 transition-all duration-500 cursor-pointer" onclick="showHotelDetails(${hotel.id})">
                <div class="relative h-64 overflow-hidden">
                    <img src="${hotel.image}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="${hotel.name}">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                        <div class="flex justify-between items-end">
                            <h3 class="text-2xl font-bold text-white">${hotel.name}</h3>
                            <span class="text-indigo-400 font-bold">$${hotel.price}<span class="text-xs text-slate-400">/night</span></span>
                        </div>
                    </div>
                </div>
                <div class="p-8 space-y-4">
                    <div class="flex justify-between text-sm">
                        <span class="text-slate-400">Location: <span class="text-white text-xs">${hotel.location}</span></span>
                        <span class="text-slate-400">Guests: <span class="text-white">${hotel.maxMembers} Max</span></span>
                    </div>
                    <div class="pt-4 border-t border-white/5">
                        <span class="text-xs font-bold uppercase tracking-widest text-indigo-400">Room ${hotel.roomNumber}</span>
                    </div>
                </div>
            </div>
        `).join('');
    };

    // Set minimum date to today for check-in
    const today = new Date().toISOString().split('T')[0];
    if (checkInInput) checkInInput.min = today;

    // Update check-out min date when check-in changes
    if (checkInInput && checkOutInput) {
        checkInInput.addEventListener('change', () => {
            if (checkInInput.value) {
                const minCheckOut = new Date(checkInInput.value);
                minCheckOut.setDate(minCheckOut.getDate() + 1);
                checkOutInput.min = minCheckOut.toISOString().split('T')[0];

                // Clear checkout if it's now invalid
                if (checkOutInput.value && checkOutInput.value <= checkInInput.value) {
                    checkOutInput.value = '';
                    showError('checkOut', 'Check-out must be after check-in');
                } else {
                    hideError('checkOut');
                }
            }
        });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Reset errors
        document.querySelectorAll('p[id$="Error"]').forEach(p => p.classList.add('hidden'));

        // Validate Full Name
        if (!data.fullName) {
            showError('fullName', 'Please enter your full name');
            isValid = false;
        }

        // Validate Phone
        if (!data.phone) {
            showError('phone', 'Please enter your phone number');
            isValid = false;
        }

        // Validate Check-in
        if (!data.checkIn) {
            showError('checkIn', 'Please select a check-in date');
            isValid = false;
        }

        // Validate Check-out
        if (!data.checkOut) {
            showError('checkOut', 'Please select a check-out date');
            isValid = false;
        } else if (data.checkOut <= data.checkIn) {
            showError('checkOut', 'Check-out must be after check-in');
            isValid = false;
        }

        // Validate Room Type
        if (!data.roomType) {
            showError('roomType', 'Please select a room type');
            isValid = false;
        }

        // Validate Guests
        if (!data.guests || data.guests < 1) {
            showError('guests', 'At least 1 guest is required');
            isValid = false;
        }

        if (isValid) {
            currentBookingData = {
                fullName: data.fullName,
                phone: data.phone,
                checkIn: data.checkIn,
                checkOut: data.checkOut,
                guests: data.guests,
                roomType: data.roomType
            };
            form.classList.add('opacity-50', 'pointer-events-none');
            successMsg.classList.remove('hidden');

            // Redirect to dashboard after slight delay
            setTimeout(() => {
                form.classList.remove('opacity-50', 'pointer-events-none');
                successMsg.classList.add('hidden');
                form.reset();
                renderDashboard();
                showSection('dashboard');
            }, 2000);
        } else {
            // Shake the form on error
            form.classList.add('error-shake');
            setTimeout(() => form.classList.remove('error-shake'), 400);
        }
    });

    function showError(fieldId, message) {
        const errorEl = document.getElementById(`${fieldId}Error`);
        const inputEl = document.getElementById(fieldId);
        if (errorEl && inputEl) {
            errorEl.textContent = message;
            errorEl.classList.remove('hidden');
            inputEl.classList.add('border-rose-500');
            inputEl.classList.remove('border-slate-700');
        }
    }

    function hideError(fieldId) {
        const errorEl = document.getElementById(`${fieldId}Error`);
        const inputEl = document.getElementById(fieldId);
        if (errorEl && inputEl) {
            errorEl.classList.add('hidden');
            inputEl.classList.remove('border-rose-500');
            inputEl.classList.add('border-slate-700');
        }
    }
});
