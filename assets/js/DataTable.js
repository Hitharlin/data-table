  class DataTable {
    constructor(columns = [], data = [], table, pageCount) {
      this.columns = columns;
      this.data = data;
      this.table = table;
      this.pageCount = pageCount;
    } 
  
    createTable() {
      const $dataTableContainer = document.querySelector('.data-table-container');
      $dataTableContainer.appendChild(this.table);

        this.createThead();
        this.createTbody();
        this.renderData();
        this.createPagination();
    }

  createThead() {
    const $thead = document.createElement('thead');
    const $tr = document.createElement('tr');

    this.columns.forEach((column) => {
      const $th = document.createElement('th');
      $th.innerHTML = column;
      $tr.appendChild($th);
    });

    $thead.appendChild($tr);
    this.table.appendChild($thead)
  }

  createTbody() {
    const $tbody = document.createElement('tbody');
    this.table.appendChild($tbody);
  }

  renderData() {
    let $trs = [];
    this.data.map((item, index) => {
      const $tr = document.createElement('tr');

      if(index < this.pageCount) {
          for(const key in item) {
              const $td = document.createElement('td');
              $td.innerHTML = item[key];
              $tr.appendChild($td);
          }
      }

    document.getElementsByTagName('tbody')[0].appendChild($tr);

    // console.log(index)

    })
  }

  createPagination(){
        if(this.data.length > this.pageCount) {
            const paginationBox = document.createElement('div');
            
            const pageNumber = Math.ceil(this.data.length / this.pageCount);
            paginationBox.classList.add('pagination-box')
            for(let i=1; i<=pageNumber; i++){
                const pageButton = document.createElement('button');
                pageButton.classList.add('page-item');
                pageButton.classList.add('active');

                pageButton.innerHTML = i;
                paginationBox.appendChild(pageButton);
            }

            // document.getElementsByClassName('page-item')[0].classList.add('active');

            console.log(document.getElementsByClassName('page-item')[0]);
            document.getElementsByTagName('body')[0].appendChild(paginationBox);
        }
  }
}


// export default DataTable;


const columns = ['id', 'name', 'age'];

const data = [
    {
        id: 1,
        name: 'Albert',
        age: 50,
    },
    {
        id: 2,
        name: 'Gevorg',
        age: 51,
    },
    {
        id: 3,
        name: 'Anahit',
        age: 52,
    },
    {
        id: 4,
        name: 'Anna',
        age: 53,
    },
    {
        id: 5,
        name: 'Lilit',
        age: 54,
    },
    {
        id: 6,
        name: 'Arman',
        age: 51,
    },
    {
        id: 7,
        name: 'Shushan',
        age: 51,
    },
    {
        id: 8,
        name: 'Elen',
        age: 51,
    },
    {
        id: 9,
        name: 'Sona',
        age: 35,
    },
    {
        id: 10,
        name: 'Arpi',
        age: 11,
    },
    {
        id: 11,
        name: 'Nargiz',
        age: 34,
    },
    {
        id: 12,
        name: 'Lucy',
        age: 33,
    },
    {
        id: 13,
        name: 'Babken',
        age: 54,
    },
    {
        id: 14,
        name: 'Gurgen',
        age: 76,
    },
    {
        id: 15,
        name: 'Hrach',
        age: 55,
    },
    {
        id: 16,
        name: 'Sone',
        age: 32,
    },
    {
        id: 17,
        name: 'Nare',
        age: 23,
    },
    {
        id: 18,
        name: 'Shushan',
        age: 51,
    },
    {
        id: 19,
        name: 'Saten',
        age: 12,
    },
    {
        id: 20,
        name: 'Martin',
        age: 25,
    },
    {
        id: 21,
        name: 'Sargis',
        age: 99,
    },
    {
        id: 22,
        name: 'Jivan',
        age: 67,
    },
    {
        id: 23,
        name: 'Geo',
        age: 45,
    },
    {
        id: 24,
        name: 'Gevorg',
        age: 56,
    },
    {
        id: 25,
        name: 'Gevorg',
        age: 55,
    },
    {
        id: 26,
        name: 'Gevorg',
        age: 22,
    },
    {
        id: 27,
        name: 'Gevorg',
        age: 33,
    },
    {
        id: 28,
        name: 'Gevorg',
        age: 53,
    },
    {
        id: 29,
        name: 'Gevorg',
        age: 28,
    },
    {
        id: 30,
        name: 'Gevorg',
        age: 39,
    },
];

const table = document.createElement('table')

const dataTable = new DataTable(columns, data, table, 10);

dataTable.createTable();