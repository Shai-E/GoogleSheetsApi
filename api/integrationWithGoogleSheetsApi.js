import axios from './interceptor';

const SPREADSHEET_ID = '1XM4vzXT9ebvkfce2l0wF01zNytHnvZqFKNPpZFLBx8w';
const SPREADSHEET_NAME = 'HomeExercise';
const API_KEY = 'AIzaSyCHCKIM6FtLo2FNaOvlgfmFPpGROTez9Vo';
const GET_BASE = 'https://sheets.googleapis.com/v4/spreadsheets';
const CRUD_BASE =
  'https://sheet.best/api/sheets/c4505d61-3350-41ad-81a4-05c5bda07d1d';

export const fetchDataFromSpreadsheetAsync = async () => {
  const response = await axios.get(
    `${GET_BASE}/${SPREADSHEET_ID}/values/${SPREADSHEET_NAME}?valueRenderOption=FORMATTED_VALUE&key=${API_KEY}`,
  );
  if (!response.data?.values) return;
  return response.data.values;
};

export const handleValueChangeAsync = async (columnName, newValue, id) => {
  const url = `${CRUD_BASE}/Id/${id}`;
  const response = await axios.patch(url, {[columnName]: newValue});
  if (response.status !== 200) return;
  return true;
};
export const handleAddNewPersonAsync = async body => {
  const url = `${CRUD_BASE}`;
  const response = await axios.post(url, body);
  if (response.status !== 200) return;
  return true;
};
