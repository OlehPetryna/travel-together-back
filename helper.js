module.exports.changeTourDatesToObject = changeTourDatesToObject = (tour) => {
    const { arrival, departure } = tour;

    return { ...tour, arrival: new Date(arrival), departure: new Date(departure) };
};