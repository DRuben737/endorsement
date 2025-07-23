// src/utils/weightAndBalanceCalculator.js

const aircraftTemplates = {
  R44: [
    { label: 'Empty', weight: 1486.5, longArm: 105.6, latArm: -0.3 },
    { label: 'Right Seat Fwd', weight: 155, longArm: 49.5, latArm: 12.2 },
    { label: 'Left Seat Fwd', weight: 150, longArm: 49.5, latArm: -10.4 },
    { label: 'Right Seat Aft', weight: 180, longArm: 79.5, latArm: 11.5 },
    { label: 'Front Baggage', weight: 44, longArm: 12.2, latArm: 0 },
    { label: 'Left Seat Aft', weight: 180, longArm: 79.5, latArm: 12.2 },
    { label: 'Doors Fwd', weight: -15, longArm: 49.4, latArm: 24 },
    { label: 'Doors Aft', weight: 0, longArm: 49.4, latArm: 23 },
    { label: 'Total Empty Fuel', weight: 2136.5, longArm: 93.59, latArm: 1.77 },
    { label: 'Fuel Main', weight: 0, longArm: 106, latArm: -13.5 }, // Placeholder, will be updated
    { label: 'Fuel Aux', weight: 0, longArm: 102, latArm: 13 }, // Placeholder, will be updated
    { label: 'Supplements', weight: 0, longArm: 0, latArm: 0 }, // Placeholder, if any
    { label: 'Total with Fuel', weight: 0, longArm: 0, latArm: 0 } // Placeholder, will be updated
  ]
};

export const calculateWeightAndBalance = (aircraftType, pilotWeight, passengerWeight, baggageWeight, fuelMainVolume, fuelAuxVolume) => {
  const data = aircraftTemplates[aircraftType];
  if (!data) {
    throw new Error('Aircraft type not supported');
  }

  let totalWeight = 0;
  let totalLongMoment = 0;
  let totalLatMoment = 0;

  let weightWithoutFuel = 0;
  let longMomentWithoutFuel = 0;
  let latMomentWithoutFuel = 0;

  data.forEach(item => {
    const { weight, longArm, latArm } = item;
    const longMoment = longArm * weight;
    const latMoment = latArm * weight;

    if (item.label.includes('Fuel')) {
      // Skip fuel items for weight and moment calculations for 'Total Empty Fuel'
    } else {
      totalWeight += weight;
      totalLongMoment += longMoment;
      totalLatMoment += latMoment;
    }

    // Include all items for general weight and moment calculations
    if (item.label !== 'Supplements') {
      weightWithoutFuel += weight;
      longMomentWithoutFuel += longMoment;
      latMomentWithoutFuel += latMoment;
    }
  });

  // Convert fuel volumes to weights (assuming 1 gallon = 6 lbs)
  const fuelMainWeight = Number(fuelMainVolume) * 6;
  const fuelAuxWeight = Number(fuelAuxVolume) * 6;

  // Update fuel weights in the data
  const fuelMainIndex = data.findIndex(item => item.label === 'Fuel Main');
  const fuelAuxIndex = data.findIndex(item => item.label === 'Fuel Aux');
  const totalWithFuelIndex = data.findIndex(item => item.label === 'Total with Fuel');

  // Calculate the fuel weight moments
  const fuelMainLongMoment = fuelMainWeight * 106; // Example long arm for fuel main
  const fuelAuxLongMoment = fuelAuxWeight * 102; // Example long arm for fuel aux

  const fuelMainLatMoment = fuelMainWeight * -13.5; // Example lat arm for fuel main
  const fuelAuxLatMoment = fuelAuxWeight * 13; // Example lat arm for fuel aux

  // Add user inputs to total weight and moments
  totalWeight += Number(pilotWeight) + Number(passengerWeight) + Number(baggageWeight) + fuelMainWeight + fuelAuxWeight;
  totalLongMoment += fuelMainLongMoment + fuelAuxLongMoment;
  totalLatMoment += fuelMainLatMoment + fuelAuxLatMoment;

  // Calculate 'Total Empty Fuel' arm values
  const emptyFuelLongArm = longMomentWithoutFuel / weightWithoutFuel;
  const emptyFuelLatArm = latMomentWithoutFuel / weightWithoutFuel;

  // Update the data with calculated values
  data[fuelMainIndex].weight = fuelMainWeight;
  data[fuelAuxIndex].weight = fuelAuxWeight;
  data[totalWithFuelIndex].weight = totalWeight;
  data[totalWithFuelIndex].longArm = totalLongMoment / totalWeight;
  data[totalWithFuelIndex].latArm = totalLatMoment / totalWeight;

  // Example chart data
  const chartData = {
    labels: data.map(d => d.label),
    datasets: [
      {
        label: 'Weight Distribution',
        data: data.map(d => d.weight),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  return {
    centerOfGravity: `Center of Gravity: ${emptyFuelLongArm.toFixed(2)} inches`,
    lateralMoment: `Lateral Moment: ${emptyFuelLatArm.toFixed(2)} inches`,
    chartData
  };
};
