document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('booking-form');
    const serviceSelection = document.querySelector('.service-selection');
    const serviceInput = document.getElementById('service-select');
    const datePicker = document.getElementById('date-picker');
    const timeSelect = document.getElementById('time-select');
    const confirmationMessage = document.getElementById('confirmation-message');

    // Manejar la selección de servicios
    serviceSelection.addEventListener('click', function(e) {
        const selectedBox = e.target.closest('.service-box');
        if (!selectedBox) return;

        // Desmarcar otros
        document.querySelectorAll('.service-box').forEach(box => {
            box.classList.remove('selected');
        });

        // Marcar el seleccionado
        selectedBox.classList.add('selected');
        serviceInput.value = selectedBox.dataset.value;

        // Disparar el evento de cambio de fecha para actualizar horarios
        datePicker.dispatchEvent(new Event('change'));
    });

    // Simulación de horarios disponibles
    const availableTimes = {
        'limpieza': ['09:00', '11:00', '14:00'],
        'blanqueamiento': ['10:00', '12:00', '15:00'],
        'implantes': ['09:30', '14:30'],
        'ortodoncia': ['10:30', '16:00'],
        'carillas': ['11:30', '15:30'],
        'protesis': ['09:00', '13:00']
    };

    // Actualizar horarios cuando se cambia la fecha
    datePicker.addEventListener('change', function() {
        const selectedService = serviceInput.value;
        const selectedDate = new Date(this.value);
        const dayOfWeek = selectedDate.getUTCDay(); // 0 = Domingo, 6 = Sábado

        timeSelect.innerHTML = '<option value="" disabled selected>Selecciona una hora</option>';

        if (!selectedService) {
            timeSelect.innerHTML = '<option value="" disabled>Primero elige un servicio</option>';
            return;
        }

        if (dayOfWeek === 0 || dayOfWeek === 6) { // No disponible en fines de semana
            timeSelect.innerHTML = '<option value="" disabled>No disponible en fines de semana</option>';
            return;
        }

        let times = availableTimes[selectedService] || [];

        // Simular horarios no disponibles aleatoriamente
        times = times.filter(() => Math.random() > 0.3);

        if (times.length > 0) {
            times.forEach(time => {
                const option = document.createElement('option');
                option.value = time;
                option.textContent = time;
                timeSelect.appendChild(option);
            });
        } else {
            timeSelect.innerHTML = '<option value="" disabled>No hay horarios disponibles</option>';
        }
    });

    // Manejar el envío del formulario
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Simulación de envío exitoso
        bookingForm.style.display = 'none';
        confirmationMessage.style.display = 'block';

        // Opcional: resetear el formulario después de un tiempo
        setTimeout(() => {
            bookingForm.reset();
            document.querySelectorAll('.service-box').forEach(box => box.classList.remove('selected'));
            bookingForm.style.display = 'block';
            confirmationMessage.style.display = 'none';
            timeSelect.innerHTML = '<option value="" disabled selected>Selecciona una hora</option>';
        }, 5000);
    });
});