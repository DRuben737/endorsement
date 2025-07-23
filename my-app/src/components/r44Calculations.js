// r44Calculations.js
export const calculateR44 = (data) => {
  const {
    rightSeatFwd,
    leftSeatFwd,
    rightSeatAft,
    leftSeatAft,
    weight,
    longArm,
    latArm,
    frontdoorsoff,
    backdoorsoff,
    mainFuel,
    auxFuel,
  } = data;

  const gallonsToPounds = 6; // 1 gallon of aviation fuel weighs 6 pounds
  const doorsoffToPounds = -7.5; // each door weighs 7.5 pounds

  // Convert fuel volume to weight
  const fuelMainWeight = mainFuel * gallonsToPounds;
  const fuelAuxWeight = auxFuel * gallonsToPounds;
  const frontdoorsoffweight = frontdoorsoff * doorsoffToPounds;
  const backdoorsoffweight = backdoorsoff * doorsoffToPounds;

  // Calculate total weights and moments
  const totalWeight = weight + rightSeatFwd + leftSeatFwd + rightSeatAft + leftSeatAft + frontdoorsoffweight + backdoorsoffweight;
  const totalLongMoment = (rightSeatFwd * 49.5) +
                          (leftSeatFwd * 49.5) +
                          (rightSeatAft * 79.5) +
                          ((frontdoorsoffweight + backdoorsoffweight) * 49.4) +
                          (leftSeatAft * 79.5) +
                          (weight * longArm);
  const totalLatMoment = (rightSeatFwd * 12.2) +
                         (leftSeatFwd * -10.4) +
                         (rightSeatAft * 11.5) +
                         (frontdoorsoffweight * 24) +
                         (backdoorsoffweight * 23) +
                         (leftSeatAft * 12.2) +
                         (weight * latArm);

  const emptyWeight = totalWeight; // Empty weight without fuel
  const totalEmptyFuel = emptyWeight; // Assumed as example data

  // Calculate empty long arm and lat arm
  const emptyLongArm = totalLongMoment / emptyWeight;
  const emptyLatArm = totalLatMoment / emptyWeight;

  // Calculate fuel moments
  const totalLongMomentWithFuel = totalLongMoment +
                                  (fuelMainWeight * 106) +
                                  (fuelAuxWeight * 102);
  const totalLatMomentWithFuel = totalLatMoment +
                                 (fuelMainWeight * -13.5) +
                                 (fuelAuxWeight * 13);

  const totalWithFuelWeight = totalWeight + fuelMainWeight + fuelAuxWeight;
  const totalLongArmWithFuel = totalLongMomentWithFuel / totalWithFuelWeight;
  const totalLatArmWithFuel = totalLatMomentWithFuel / totalWithFuelWeight;

  return {
    totalWeight: totalWeight || 0,
    totalLongMoment: totalLongMoment || 0,
    totalLatMoment: totalLatMoment || 0,
    totalEmptyFuel: totalEmptyFuel || 0,
    emptyLongArm: emptyLongArm || 0,
    emptyLatArm: emptyLatArm || 0,
    totalWithFuelWeight: totalWithFuelWeight || 0,
    totalLongMomentWithFuel: totalLongMomentWithFuel || 0,
    totalLatMomentWithFuel: totalLatMomentWithFuel || 0,
    totalLongArmWithFuel: totalLongArmWithFuel || 0,
    totalLatArmWithFuel: totalLatArmWithFuel || 0,
    // For chart data
    totalEmptyFuelData: [
      { x: 91, y: totalEmptyFuel },
      { x: 92, y: totalEmptyFuel },
      { x: 93, y: totalEmptyFuel * 1.05 }, // Example additional points
      { x: 98, y: totalEmptyFuel * 1.05 },
      { x: 103, y: totalEmptyFuel },
    ],
    totalWithFuelData: [
      { x: 91, y: totalWithFuelWeight },
      { x: 92, y: totalWithFuelWeight },
      { x: 93, y: totalWithFuelWeight * 1.05 }, // Example additional points
      { x: 98, y: totalWithFuelWeight * 1.05 },
      { x: 103, y: totalWithFuelWeight },
    ],
    totalEmptyFuelLatArm: [
      { x: 91, y: emptyLatArm },
      { x: 92, y: emptyLatArm },
      { x: 93, y: emptyLatArm * 1.05 }, // Example additional points
      { x: 98, y: emptyLatArm * 1.05 },
      { x: 103, y: emptyLatArm },
    ],
    totalWithFuelLatArm: [
      { x: 91, y: totalLatArmWithFuel },
      { x: 92, y: totalLatArmWithFuel },
      { x: 93, y: totalLatArmWithFuel * 1.05 }, // Example additional points
      { x: 98, y: totalLatArmWithFuel * 1.05 },
      { x: 103, y: totalLatArmWithFuel },
    ],
  };
};