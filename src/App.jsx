import React from "react";

import Navbar from "./Navbar.jsx";
import Inputbox from "./Inputbox.jsx";
import Workoutbox from "./Workoutbox.jsx";
import Workoutlist from "./Workoutlist.jsx";
import Logoslide from "./Logoslide.jsx";
import Clock from "./Clock.jsx";

import "./App.css";
function App() {
  const [todayWorkout, setTodayWorkout] = React.useState([]);
  const [sortedWorkout, setSortedWorkout] = React.useState([]);
  const [todayHour, setTodayHour] = React.useState(0);
  const [todayMinute, setTodayMinute] = React.useState(0);
  const [todaySecond, setTodaySecond] = React.useState(0);
  const [workout, setWorkout] = React.useState(
    () => JSON.parse(localStorage.getItem("workout")) || []
  );
  const [localName, setLocalName] = React.useState(
    () => JSON.parse(localStorage.getItem("localName")) || ""
  );
  const [localRep, setLocalRep] = React.useState(
    () => JSON.parse(localStorage.getItem("localRep")) || ""
  );
  const [localWeight, setLocalWeight] = React.useState(
    () => JSON.parse(localStorage.getItem("localWeight")) || ""
  );
  React.useEffect(() => {
    localStorage.setItem("workout", JSON.stringify(workout));
    setTodayWorkout((prevTodayWorkout) => getTodayWorkout(workout));
    setSortedWorkout((prevSortedWorkout) => getSortedWorkout(workout));
  }, [workout]);
  React.useEffect(() => {
    localStorage.setItem("localName", JSON.stringify(localName));
  }, [localName]);
  React.useEffect(() => {
    localStorage.setItem("localRep", JSON.stringify(localRep));
  }, [localRep]);
  React.useEffect(() => {
    localStorage.setItem("localWeight", JSON.stringify(localWeight));
  }, [localWeight]);
  function double_format(a) {
    if (a.toString().length == 1) {
      a = "0" + a;
    }
    return a;
  }
  // function getMaxedWorkout(item) {
  //   if (item.length < 2) {
  //     const cards = item.map((item) => {
  //       return (
  //         <Workoutlist
  //           key={item[0] + item[1] + item[2]}
  //           name={item[0]}
  //           rep={item[1]}
  //           weight={item[2]}
  //         />
  //       );
  //     return cards;
  //   }
  //   const temp = Object.values(
  //     item.reduce(function (r, e) {
  //       if (!r[e.name]) r[e.name] = e;
  //       else if (e.weight > r[e.name].weight) r[e.name] = e;
  //       return r;
  //     }, {})
  //   );
  //   return temp.sort((a, b) => a.name.localeCompare(b.name));
  // }
  function getSortedWorkout(item) {
    if (item.length < 2) {
      const cards = item.map((item, index) => {
        return (
          <Workoutlist
            key={index}
            maxed_name={item.name}
            maxed_rep={item.rep}
            maxed_weight={item.weight}
            sorted_name={item.name}
            sorted_rep={item.rep}
            sorted_weight={item.weight}
            setLocalName={setLocalName}
            setLocalRep={setLocalRep}
            setLocalWeight={setLocalWeight}
          />
        );
      });
      return cards;
    }
    let maxPrev = [];
    let workouts_copy = [...item];
    //change from a[4]-b[4]. from sort by weight to sort by date.
    workouts_copy.sort((a, b) => b.date + "" + b.time - (a.date + "" + a.time));

    for (let i = 0; i < workouts_copy.length; i++) {
      if (!maxPrev.some((row) => row.includes(workouts_copy[i].name))) {
        maxPrev.push([
          workouts_copy[i].date,
          workouts_copy[i].time,
          workouts_copy[i].name,
          workouts_copy[i].rep,
          workouts_copy[i].weight,
        ]);
      }
    }
    maxPrev.sort((a, b) => a[2].localeCompare(b[2]));
    let maxMax = Object.values(
      item.reduce(function (r, e) {
        if (!r[e.name]) r[e.name] = e;
        else if (Number(e.weight) > Number(r[e.name].weight)) r[e.name] = e;
        return r;
      }, {})
    );

    maxMax.sort((a, b) => a.name.localeCompare(b.name));
    const cards = maxPrev.map((item, index) => {
      return (
        <Workoutlist
          key={index}
          maxed_name={maxMax[index].name}
          maxed_rep={maxMax[index].rep}
          maxed_weight={maxMax[index].weight}
          sorted_name={item[2]}
          sorted_rep={item[3]}
          sorted_weight={item[4]}
          setLocalName={setLocalName}
          setLocalRep={setLocalRep}
          setLocalWeight={setLocalWeight}
        />
      );
    });
    return cards;
  }

  function getTodayWorkout(item) {
    const today = new Date();
    const year = double_format(today.getFullYear());
    const month = double_format(today.getMonth() + 1);
    const day = double_format(today.getDate());
    let temp = [];
    for (let i in item) {
      if (
        item[i].date.substr(0, 4) == year &&
        item[i].date.substr(4, 2) == month &&
        item[i].date.substr(6, 2) == day
      ) {
        temp.push(item[i]);
      }
    }
    const cards = temp.toReversed().map((item, index) => {
      return (
        <Workoutbox
          key={index}
          setLocalName={setLocalName}
          setLocalRep={setLocalRep}
          setLocalWeight={setLocalWeight}
          workout={workout}
          setWorkout={setWorkout}
          workout_date={item.date}
          workout_time={item.time}
          workout_hour={item.hour}
          workout_minute={item.minute}
          workout_second={item.second}
          workout_ampm={item.ampm}
          workout_name={item.name}
          workout_rep={item.rep}
          workout_weight={item.weight}
        />
      );
    });

    return cards;
  }

  return (
    <>
      <Logoslide />
      <Navbar
        workout={workout}
        setWorkout={setWorkout}
        localName={localName}
        setLocalName={setLocalName}
        localRep={localRep}
        setLocalRep={setLocalRep}
        localWeight={localWeight}
        setLocalWeight={setLocalWeight}
      />
      <div className="workoutlist--wrap">{sortedWorkout}</div>

      <Inputbox
        workout={workout}
        setWorkout={setWorkout}
        localName={localName}
        setLocalName={setLocalName}
        localRep={localRep}
        setLocalRep={setLocalRep}
        localWeight={localWeight}
        setLocalWeight={setLocalWeight}
      />
      <Clock />
      {todayWorkout}
    </>
  );
}

export default App;
