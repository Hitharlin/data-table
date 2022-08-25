import DataTable from "./DataTable.js";

const data = [
    {
        id: 1,
        name: 'Albert',
        age: 60,
        hobby: 'traveling',
    },
    {
        id: 2,
        name: 'Gevorg',
        age: 51,
        hobby: 'hiking',
    },
    {
        id: 3,
        name: 'Anahit',
        age: 52,
        hobby: 'Reading',
    },
    {
        id: 4,
        name: 'Anna',
        age: 53,
        hobby: 'traveling',
    },
    {
        id: 5,
        name: 'Lilit',
        age: 54,
        hobby: 'gardening',
    },
    {
        id: 6,
        name: 'Arman',
        age: 51,
        hobby: 'learning',
    },
    {
        id: 7,
        name: 'Shushan',
        age: 51,
        hobby: 'blogging',
    },
    {
        id: 8,
        name: 'Elen',
        age: 51,
        hobby: 'traveling',
    },
    {
        id: 9,
        name: 'Sona',
        age: 35,
        hobby: 'traveling',
    },
    {
        id: 10,
        name: 'Arpi',
        age: 11,
        hobby: 'traveling',
    },
    {
        id: 11,
        name: 'Nargiz',
        age: 34,
        hobby: 'traveling',
    },
    {
        id: 12,
        name: 'Lucy',
        age: 33,
        hobby: 'traveling',
    },
    {
        id: 13,
        name: 'Babken',
        age: 54,
        hobby: 'traveling',
    },
    {
        id: 14,
        name: 'Gurgen',
        age: 76,
        hobby: 'traveling',
    },
    {
        id: 15,
        name: 'Hrach',
        age: 55,
        hobby: 'traveling',
    },
    {
        id: 16,
        name: 'Sone',
        age: 32,
        hobby: 'traveling',
    },
    {
        id: 17,
        name: 'Nare',
        age: 23,
        hobby: 'blogging',
    },
    {
        id: 18,
        name: 'Shushan',
        age: 51,
        hobby: 'blogging',
    },
    {
        id: 19,
        name: 'Saten',
        age: 12,
        hobby: 'blogging',
    },
    {
        id: 20,
        name: 'Gevorg',
        age: 25,
        hobby: 'blogging',
    },
    {
        id: 21,
        name: 'Sargis',
        age: 99,
        hobby: 'hiking',
    },
    {
        id: 22,
        name: 'Gevorg',
        age: 67,
        hobby: 'hiking',
    },
    {
        id: 23,
        name: 'Levon',
        age: 45,
        hobby: 'hiking',
    },
    {
        id: 24,
        name: 'Hovhannes',
        age: 56,
        hobby: 'hiking',
    },
    {
        id: 25,
        name: 'Haykuhi',
        age: 55,
        hobby: 'hiking',
    },
    {
        id: 26,
        name: 'Levon',
        age: 22,
        hobby: 'hiking',
    },
    {
        id: 27,
        name: 'Angin',
        age: 33,
        hobby: 'hiking',
    },
    {
        id: 28,
        name: 'Angin',
        age: 53,
        hobby: 'hiking',
    },
    {
        id: 29,
        name: 'Gevorg',
        age: 28,
        hobby: 'hiking',
    },
    {
        id: 30,
        name: 'Gevorg',
        age: 39,
        hobby: 'hiking',
    },
];

const options = {   

};

const columns = ['id', 'name', 'age', 'hobby'];

Element.prototype.DataTable = function(columns, data, options) {
    const dataTable = new DataTable(columns, data, options);
    dataTable.createTable(this);
}

const $dataTableContainer = document.querySelector('.data-table-container');
$dataTableContainer.DataTable(columns, data, options);
