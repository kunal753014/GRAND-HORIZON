document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('bookingForm');
    const checkInInput = document.getElementById('checkIn');
    const checkOutInput = document.getElementById('checkOut');
    const successMsg = document.getElementById('successMessage');

    // Set minimum date to today for check-in
    const today = new Date().toISOString().split('T')[0];
    checkInInput.min = today;

    // Update check-out min date when check-in changes
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

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Reset errors
        document.querySelectorAll('p[id$="Error"]').forEach(p => p.classList.add('hidden'));

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
            console.log('Booking Data:', data);
            form.classList.add('opacity-50', 'pointer-events-none');
            successMsg.classList.remove('hidden');
            form.reset();
            
            // Re-enable after delay
            setTimeout(() => {
                form.classList.remove('opacity-50', 'pointer-events-none');
                successMsg.classList.add('hidden');
            }, 5000);
        } else {
            // Shake the form on error
            form.classList.add('error-shake');
            setTimeout(() => form.classList.remove('error-shake'), 400);
        }
    });

    function showError(fieldId, message) {
        const errorEl = document.getElementById(`${fieldId}Error`);
        const inputEl = document.getElementById(fieldId);
        errorEl.textContent = message;
        errorEl.classList.remove('hidden');
        inputEl.classList.add('border-rose-500');
        inputEl.classList.remove('border-slate-700');
    }

    function hideError(fieldId) {
        const errorEl = document.getElementById(`${fieldId}Error`);
        const inputEl = document.getElementById(fieldId);
        errorEl.classList.add('hidden');
        inputEl.classList.remove('border-rose-500');
        inputEl.classList.add('border-slate-700');
    }
});
