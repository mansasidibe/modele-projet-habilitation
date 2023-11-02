function formatDate(inputDate) {
    // Split the input date into date and time parts
    const [datePart, timePart] = inputDate.split(' ');

    // Split the date part into year, month, and day
    const [year, month, day] = datePart.split('-');

    // Return the formatted date "dd/mm/yyyy"
    return `${day}/${month}/${year}`;
}
