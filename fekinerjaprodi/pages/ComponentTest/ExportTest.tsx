import React, { useEffect, useRef, useState } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

export default function ExportTest() {
  const testref = useRef(null);
  const [TbXL, setTbXL] = useState(Object);

  useEffect(() => {
    const TableToExcel = import("@linways/table-to-excel");
    // import TableToExcel from "@linways/table-to-excel";
    setTbXL(TableToExcel);
  }, []);

  const printExcel = async (event) => {
    event.preventDefault();
    TableToExcel.convert(testref.current, {
      name: "table1.xlsx",
      sheet: {
        name: "Sheet 1",
      },
    });
  };

  return (
    <div>
      <style jsx>{`
        table,
        td,
        th {
          border: 1px solid;
          text-align: center;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }
      `}</style>
      <ReactHTMLTableToExcel
        id="test-table-xls-button"
        className="download-table-xls-button btn btn-success ms-3"
        table="tableprint"
        filename="tablexls"
        sheet="tablexls"
        buttonText="Export Excel"
        border="1"
      />
      <button
        className="btn btn-primary btn-sm ms-auto"
        type="button"
        onClick={printExcel}
      >
        Cetak
      </button>
      <table id="tableprint" border={2} ref={testref} data-b-a-s="thick">
        <thead>
          <tr>
            <td rowSpan={3}>No</td>
            <td rowSpan={3}>Nama Dosen</td>
            <td rowSpan={3}>DTPS</td>
            <td colSpan={6}>
              Ekuivalen Waktu Mengajar Penuh (EWMP) pada saat TS dalam satuan
              kredit semester (sks)
            </td>
            <td rowSpan={3}>Jumlah</td>
            <td rowSpan={3}>Rata Rata per semester</td>
          </tr>
          <tr>
            <td colSpan={3}>Pendidikan: Pembelajaran dan Pembimbingan</td>
            <td rowSpan={2}>Penelitian</td>
            <td rowSpan={2}>PKM</td>
            <td rowSpan={2}>Tugas</td>
          </tr>
          <tr>
            <td>Ps Diakreditasi</td>
            <td>Ps Lain Dalam PT</td>
            <td>Ps Lain Luar PT</td>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
            <td>6</td>
            <td>7</td>
            <td>8</td>
            <td>9</td>
            <td>0</td>
            <td>0</td>
          </tr>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
            <td>6</td>
            <td>7</td>
            <td>8</td>
            <td>9</td>
            <td>0</td>
            <td>0</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
