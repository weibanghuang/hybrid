import React from "react";
import Papa from "papaparse";
function Navbar({
  workout,
  setWorkout,
  localName,
  setLocalName,
  localRep,
  setLocalRep,
  localWeight,
  setLocalWeight,
}) {
  const [menu, setMenu] = React.useState(0);

  function toggleMenu() {
    setMenu((prevMenu) => (menu + 1) % 2);
  }

  React.useEffect(() => {
    localStorage.setItem("menu", JSON.stringify(menu));
  }, [menu]);

  React.useEffect(() => {
    localStorage.setItem("workout", JSON.stringify(workout));
  }, [menu]);

  function delete_all_data() {
    if (confirm("Delete all local data?")) {
      setWorkout((prevWorkout) => []);
    }
  }

  // const [file, setFile] = React.useState([]);
  // React.useEffect(() => {
  //   console.log(file);
  // }, [file]);
  // function setSelectedFile(item) {
  //   console.log(item);
  // }

  function import_json(event) {
    let reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
  }
  function onReaderLoad(event) {
    console.log(event.target.result);
    let obj = JSON.parse(event.target.result);
    console.log(obj);
    setWorkout((prevWorkout) => obj);
  }
  function export_json() {
    const dataStr =
      "data:application/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(workout));
    const download = document.createElement("a");
    download.setAttribute("href", dataStr);
    download.setAttribute("download", "workout" + ".json");
    document.body.appendChild(download);
    download.click();
    download.remove();
  }
  function printSomething() {
    // setWorkout((prevWorkOut) => [
    //   ...workout,
    //   ["10231122", "205632", "08", 56, 32, "PM", "Squat", "12", "12"],
    // ]);
    console.log("......", workout);
  }

  if (menu == 0) {
    return (
      <div className="navbar--wrap">
        <div className="navbar--wrap--inline">
          <div className="navbar--logo">HYBRID</div>
          <button className="navbar--menu" onClick={toggleMenu}>
            MENU
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="navbar--wrap">
        <div className="navbar--wrap--inline">
          <div className="navbar--logo">HYBRID</div>
          <button className="navbar--menu" onClick={toggleMenu}>
            CLOSE
          </button>
        </div>
        {/* display block---------- */}
        {/* JSON.parse(e.target.files[0], {
                header: false,
                skipEmptyLines: true,
                complete: function (results) {
                  console.log(results.data);
                },
              }); */}
        <div className="navbar--wrap--grid">
          <input
            type="file"
            name="uploadfile"
            id="fileInput"
            accept=".json"
            className="navbar--input"
            onChange={(e) => {
              import_json(e);
            }}
          />
          <label htmlFor="fileInput" className="navbar--import">
            Import Data
          </label>
          <div
            className="navbar--export"
            onClick={() => {
              export_json();
            }}
          >
            Export Data
          </div>
          <div className="navbar--analyze" onClick={printSomething}>
            Analyze Data
          </div>
          <div className="navbar--delete" onClick={delete_all_data}>
            Delete Data
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
