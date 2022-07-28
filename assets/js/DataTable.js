  class DataTable {
    constructor(columns = [], data = [], perPageLimit) {
      this.columns = columns;
      this.data = data;
      this.perPageLimit = perPageLimit;
    } ;
     
    createTable() {
      const $dataTableContainer = document.querySelector('.data-table-container');
      const $table = document.createElement('table');
      this.table = $table
      $dataTableContainer.appendChild(this.table);

        this.createThead();
        this.createTbody();
        this.renderData();
        this.createPagination();
        this.createInput();
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
    this.displayList(0, this.perPageLimit);
  }

  createInput(){
    const $input = document.createElement('input');
    const $btn = document.createElement('button');
    const dataTable = this;

    $btn.innerHTML="ok";
    $input.classList.add('count-field');
    document.getElementsByClassName('page-count-info')[0].appendChild($input);
    document.getElementsByClassName('page-count-info')[0].appendChild($btn);

    $btn.addEventListener('click', function(){
        console.log($input.value);
        dataTable.perPageLimit = $input.value;
        dataTable.createPagination();
        dataTable.renderData();
        document.getElementsByTagName('body')[0].removeChild('table');
    })
  }

  createPagination(){
    if(this.data.length > this.perPageLimit) {

        const paginationBox = document.createElement('div');
        const pageNumber = Math.ceil(this.data.length / this.perPageLimit);
        paginationBox.classList.add('pagination-box')

        for(let i=1; i<=pageNumber; i++){
            const $pageButton = document.createElement('button');
            $pageButton.classList.add('page-item');
            $pageButton.innerHTML = i;
            paginationBox.appendChild($pageButton);
            if(i==1){
                $pageButton.classList.add('page-active');
            }
        }

        document.querySelector('.data-table-container').appendChild(paginationBox);
        document.getElementsByClassName('page-info')[0].appendChild(paginationBox);
        const dataTable = this;
        console.log(this);
        document.querySelectorAll('.page-item').forEach((eachItem)=> {
        eachItem.addEventListener('click', function(){
            if(document.querySelector('.page-active')){
                document.querySelector('.page-active').classList.remove('page-active');
            }

            const $current_page = this;
            $current_page.classList.add('page-active');
            let start = 0;
            let end = dataTable.perPageLimit;

            if(parseInt(document.querySelector('.page-active').innerHTML)>1){
                start = dataTable.perPageLimit * (parseInt(document.querySelector('.page-active').innerHTML) - 1);
                end = parseInt(document.querySelector('.page-active').innerHTML) * dataTable.perPageLimit;
            }

            document.getElementsByTagName('tbody')[0].replaceChildren();
            dataTable.displayList(start, end);
            // console.log(parseInt(document.querySelector('.page-active').innerHTML));
            }   
            ) 
        })
    }
}

displayList(startCount, endCount) {

    const eachPageItems = this.data.slice(startCount, endCount);
    console.log(startCount, endCount);
        
    eachPageItems.forEach((item, index) => {
      const $tr = document.createElement('tr');
        for(const key in item) {
                const $td = document.createElement('td');
                $td.innerHTML = item[key];
                $tr.appendChild($td);
            }
        
         document.getElementsByTagName('tbody')[0].appendChild($tr);
    })
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

const dataTable = new DataTable(columns, data, 5);

dataTable.createTable();
