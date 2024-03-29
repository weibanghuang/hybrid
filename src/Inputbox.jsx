import React from "react";
import CreatableSelect from "react-select/creatable";

function Inputbox({
  workout,
  setWorkout,
  localName,
  setLocalName,
  localRep,
  setLocalRep,
  localWeight,
  setLocalWeight,
  inputWorkout,
}) {
  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "#f6f6f6",
      borderRadius: "8px",
      border: 0,
      boxShadow:
        "0 4px 3px 0 rgba(0, 0, 0, 0.2), 0 4px 10px 0 rgba(0, 0, 0, 0.19)",
      marginBottom: "15px",
    }),
    menu: (base, state) => ({
      ...base,
      marginTop: 0,
    }),
    menuList: (base) => ({
      ...base,
      padding: 0,
    }),
  };
  const [options, setOptions] = React.useState(inputWorkout);
  // const [InputLocalName, setInputLocalName] = React.useState(localName);
  // React.useEffect(() => {
  //   console.log("hehe");
  //   setLocalName((prevInputLocalName) => localName);
  // }, [localName]);
  React.useEffect(() => {
    setOptions((prevOptions) => inputWorkout);
  }, [inputWorkout]);
  function updateWorkout(target) {
    if (target.id === "localName") {
      setLocalName((prevLocalName) => target.value);
    }
    if (target.id === "localRep") {
      setLocalRep((prevLocalRep) => target.value);
    }
    if (target.id === "localWeight") {
      setLocalWeight((prevLocalWeight) => target.value);
    }
  }

  function double_format(a) {
    if (a.toString().length == 1) {
      a = "0" + a;
    }
    return a;
  }
  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
  function submitWorkout() {
    const name = toTitleCase(localName.trim()).replace(/\s+/g, " ").trim();
    const rep = localRep.replace(/\s+/g, "").trim();
    const weight = localWeight.replace(/\s+/g, "").trim();
    const today = new Date();

    //yyyymmdd complete
    const year = double_format(today.getFullYear());
    const month = double_format(today.getMonth() + 1);
    const day = double_format(today.getDate());

    const date = year + "" + month + "" + day;

    //hhmmss 24 hr complete
    const hour = double_format(today.getHours());
    const minute = double_format(today.getMinutes());
    const second = double_format(today.getSeconds());

    //hhmmss 12 hr complete
    const ampm = hour >= 12 ? "PM" : "AM";
    let twelvehour = hour;
    if (hour >= 13) {
      twelvehour = hour - 12;
    } else if (hour == 0) {
      twelvehour = 12;
    }
    const time = hour + "" + minute + "" + second;
    setWorkout((prevWorkOut) => [
      ...workout,

      {
        date: date,
        time: time,
        hour: double_format(twelvehour),
        minute: minute,
        second: second,
        ampm: ampm,
        name: name,
        rep: rep,
        weight: weight,
      },
    ]);
  }
  function clearLocal() {
    setLocalName((prevLocalName) => "");
    setLocalRep((prevLocalRep) => "");
    setLocalWeight((prevLocalWeight) => "");
  }

  return (
    <div className="inputbox--wrap">
      {/* <input
        id="localName"
        className="inputbox--name"
        type="text"
        placeholder="Workout Name"
        value={localName}
        onChange={(evt) => {
          updateWorkout(evt.target);
        }}
      /> */}
      <CreatableSelect
        placeholder={"Workout Name"}
        value={{ value: localName, label: localName }}
        onChange={(e) => {
          setLocalName((prevLocalName) =>
            typeof e.value === "undefined" ? "" : e.value
          );
          setLocalRep((prevLocalRep) =>
            typeof e.rep === "undefined" ? "" : e.rep
          );
          setLocalWeight((prevLocalWeight) =>
            typeof e.weight === "undefined" ? "" : e.weight
          );
        }}
        options={options}
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
        }}
        styles={customStyles}
      />
      <input
        id="localRep"
        className="inputbox--rep"
        type="text"
        placeholder="Repetitions"
        value={localRep}
        onChange={(evt) => {
          updateWorkout(evt.target);
        }}
      />
      <input
        id="localWeight"
        className="inputbox--weight"
        type="text"
        placeholder="Pounds"
        value={localWeight}
        onChange={(evt) => {
          updateWorkout(evt.target);
        }}
      />
      <div className="inputbox--button--wrap">
        <button className="inputbox--submit" onClick={submitWorkout}>
          Submit
        </button>
        <button className="inputbox--clear" onClick={clearLocal}>
          Clear
        </button>
      </div>
    </div>
  );
}

export default Inputbox;
