import React from "react";

function Workoutlist({
  maxed_name,
  maxed_rep,
  maxed_weight,
  sorted_name,
  sorted_rep,
  sorted_weight,
  setLocalName,
  setLocalRep,
  setLocalWeight,
}) {
  function previousInput() {
    setLocalName((prevLocalName) => sorted_name);
    setLocalRep((prevLocalRep) => sorted_rep);
    setLocalWeight((prevLocalWeight) => sorted_weight);
  }
  function maxInput() {
    setLocalName((prevLocalName) => maxed_name);
    setLocalRep((prevLocalRep) => maxed_rep);
    setLocalWeight((prevLocalWeight) => maxed_weight);
  }
  return (
    <>
      <div className="workoutlist--list">
        <div>{sorted_name}</div>
        <div>
          Max: {maxed_rep} reps {maxed_weight} pounds
        </div>
        <div>
          Previous: {sorted_rep} reps {sorted_weight} pounds
        </div>
        <button className="workoutlist--previous" onClick={previousInput}>
          P
        </button>
        <button className="workoutlist--max" onClick={maxInput}>
          M
        </button>
      </div>
    </>
  );
}

export default Workoutlist;
