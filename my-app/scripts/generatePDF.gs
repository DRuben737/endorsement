// generatePDF.gs

function generatePDF() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const range = sheet.getRange('A1:C3');  // 假设数据在 A1 到 C3 范围内
  
  const pdf = DriveApp.getFileById(SpreadsheetApp.getActiveSpreadsheet().getId()).getAs('application/pdf');
  const folder = DriveApp.getFolderById('YOUR_FOLDER_ID');  // 替换为你的文件夹 ID
  
  folder.createFile(pdf);
}