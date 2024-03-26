import React from 'react';
import * as XLSX from 'xlsx';
import * as XlsxPopulate from 'xlsx-populate';

const ExcelExportHelper = ({ data }) => {
  const createDownloadData = () => {
    handleExport().then(url => {
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute('href', url);
      downloadAnchorNode.setAttribute('download', 'teacher_allocations.xlsx');
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    });
  };

  const handleExport = () => {
    const title = [{ A: 'Teacher Allocations' }, {}];

    let table = [
      {
        A: 'Sr.no.',
        B: 'Classroom',
        C: 'Main Teacher',
        D: 'Co Teacher',
        E: 'Date',
        F: 'Time'
      }
    ];

    data.forEach((allocation, index) => {
      table.push({
        A: index + 1,
        B: allocation.classroom,
        C: allocation.main_teacher,
        D: allocation.co_teacher,
        E: allocation.date,
        F: `${allocation.start_time} - ${allocation.end_time}`
      });
    });

    const finalData = [...title, ...table];

    const wb = XLSX.utils.book_new();
    const sheet = XLSX.utils.json_to_sheet(finalData, { skipHeader: true });
    XLSX.utils.book_append_sheet(wb, sheet, 'teacher_allocations');

    const workbookBlob = workbook2blob(wb);

    return addStyle(workbookBlob);
  };

  const workbook2blob = workbook => {
    const wopts = {
      bookType: 'xlsx',
      bookSST: false,
      type: 'binary'
    };

    const wbout = XLSX.write(workbook, wopts);

    const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });

    return blob;
  };

  const s2ab = s => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i);
    return buf;
  };

  const addStyle = workbookBlob => {
    return XlsxPopulate.fromDataAsync(workbookBlob).then(workbook => {
      workbook.sheets().forEach(sheet => {
        sheet.usedRange().style({
          fontFamily: 'Arial',
          verticalAlignment: 'center'
        });
      });

      return workbook.outputAsync().then(workbookBlob => URL.createObjectURL(workbookBlob));
    });
  };

  return (
    <button
      onClick={() => {
        createDownloadData();
      }}
      className="btn btn-primary float-end"
    >
      Export
    </button>
  );
};

export default ExcelExportHelper;
