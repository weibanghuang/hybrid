import React from "react";
import { jsPDF } from "jspdf";

function Navbar({
  workout,
  setWorkout,
  localName,
  setLocalName,
  localRep,
  setLocalRep,
  localWeight,
  setLocalWeight,
  navbarPDF,
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
    if (confirm("Export JSON Data?")) {
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
  }
  function printSomething() {
    let temp = "";
    for (let i in navbarPDF) {
      temp =
        temp +
        navbarPDF[i].name +
        " " +
        navbarPDF[i].rep +
        " rep(s) " +
        navbarPDF[i].weight +
        " pound(s)\n";
    }
    navigator.clipboard.writeText(temp);
    NotificationManager.success("Success message", "Title here");
  }

  if (menu == 0) {
    return (
      <div className="navbar--wrap">
        <div className="navbar--wrap--inline">
          <div className="navbar--logo">HYBRID TRAININGS</div>
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
          <div className="navbar--logo">HYBRID TRAININGS</div>
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
            Copy Data
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

// let temp = "";
//       for (let i in navbarPDF) {
//         temp =
//           temp +
//           navbarPDF[i].name +
//           " " +
//           navbarPDF[i].rep +
//           " rep(s) " +
//           navbarPDF[i].weight +
//           " pound(s)\n";
//       }
//       let pdf_height = 40 + 10 * navbarPDF.length;
//       if (pdf_height < 300) {
//         pdf_height = 300;
//       }
//       const doc = new jsPDF("p", "px", [300, pdf_height]);
//       doc.setFillColor("#f6f6f6");
//       doc.rect(0, 0, 300, pdf_height, "F");
//       doc.setFillColor("#ff6961");
//       doc.roundedRect(
//         Math.floor(Math.random() * (300 - 71)) + 1,
//         Math.floor(Math.random() * (pdf_height - 71)) + 1,
//         69,
//         69,
//         8,
//         8,
//         "F"
//       );
//       doc.setFillColor("#93e9be");
//       doc.roundedRect(
//         Math.floor(Math.random() * (300 - 71)) + 1,
//         Math.floor(Math.random() * (pdf_height - 71)) + 1,
//         69,
//         69,
//         8,
//         8,
//         "F"
//       );
//       doc.setFillColor("#abd7eb");
//       doc.roundedRect(
//         Math.floor(Math.random() * (300 - 71)) + 1,
//         Math.floor(Math.random() * (pdf_height - 71)) + 1,
//         69,
//         69,
//         8,
//         8,
//         "F"
//       );
//       doc.setFont("Courier");
//       var img = new Image();
//       img.src = "hybrid.png";
//       doc.addImage(img, "png", 267, pdf_height - 33, 30, 30);
//       doc.addImage(img, "png", 267, 3, 30, 30);
//       doc.setFontSize(20);
//       let dateObj = new Date();
//       let month = dateObj.getMonth() + 1; //months from 1-12
//       let day = dateObj.getDate();
//       let year = dateObj.getFullYear();

//       let newdate = year + "-" + month + "/" + day;
//       doc.text("Hybrid Trainings\n" + newdate, 10, 15);

//       doc.setFontSize(12);
//       doc.text("https://weibanghuang.github.io/hybrid", 10, pdf_height - 10);
//       doc.setFontSize(10);
//       doc.text(temp, 10, 60);
//       doc.save("hybrid.pdf");
