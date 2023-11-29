import React from "react";
function Workoutbox({
  setLocalName,
  setLocalRep,
  setLocalWeight,
  setWorkout,
  workout,
  workout_date,
  workout_time,
  workout_hour,
  workout_minute,
  workout_second,
  workout_ampm,
  workout_name,
  workout_weight,
  workout_rep,
}) {
  function fillInputbox() {
    setLocalName((prevLocalName) => workout_name);
    setLocalRep((prevLocalRep) => workout_rep);
    setLocalWeight((prevLocalWeight) => workout_weight);
  }
  function removeWorkoutBox() {
    setWorkout((prevWorkout) =>
      workout.filter(
        (work) =>
          !(
            work.date === workout_date &&
            work.time === workout_time &&
            work.name === workout_name
          )
      )
    );
  }
  return (
    <>
      <div className="workoutbox">
        <div>
          {workout_date.substr(4, 2)}/{workout_date.substr(6, 2)}/
          {workout_date.substr(0, 4)}
        </div>
        <div>
          {workout_hour}:{workout_minute}:{workout_second} {workout_ampm}
        </div>
        <div>{workout_name}</div>
        <div>{workout_rep} reps</div>
        <div>{workout_weight} pounds</div>
        <button className="workoutbox--delete" onClick={removeWorkoutBox}>
          X
        </button>
        <button className="workoutbox--copy" onClick={fillInputbox}>
          C
        </button>
      </div>
    </>
  );
}

export default Workoutbox;
