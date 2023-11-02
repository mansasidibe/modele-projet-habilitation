function formatMoneyJs(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
// utilisation console.log(formatMoneyJs(999999999999));


const  removeSpacesFromNumber=(numberString)=> {
    if (typeof numberString !== 'string') {
        throw new Error('Input must be a string');
    }
    // Use regex to remove all spaces from the number string
    return parseInt(numberString.replace(/\s+/g, ''));
}
const formatNumber=(input)=> {
    // Get the raw input value without spaces
    const rawValue = input.value.replace(/\s+/g, '');

    // Use the Intl.NumberFormat API to format the number with thousands separators
    const formattedValue = new Intl.NumberFormat().format(rawValue);
    // Update the input value with the formatted number
    input.value = formattedValue;
}
