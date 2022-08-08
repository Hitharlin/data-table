  class DataTable {
    constructor(columns = [], data = [], {
        perPageLimit = 5, 
        rowClassName = 'data-row',
        cellClassName = 'data-cell',
        tableClassName = 'data-table',
        arrowIcon = 'arrow-icon',
        blockOption = 'block-option',
    }
    ){
      this.columns = columns;
      this.data = data;
      this.perPageLimit = perPageLimit;
      this.rowClassName = rowClassName;
      this.cellClassName = cellClassName;
      this.tableClassName = tableClassName;
      this.arrowIcon = arrowIcon;
      this.blockOption = blockOption;
    } ;

    createSearchField(){
        const $input = document.createElement('input');
        $input.setAttribute("type", "search");
        $input.placeholder = 'search';
        document.querySelector('body').appendChild($input);
        
        $input.onchange = (event) => {
            const searchResult = [];
            let noResult = false;
            this.data.map((item) => {
                for(const key in item) {
                    if(item[key].toString().toLowerCase().startsWith($input.value.toLowerCase())){
                        searchResult.push(item);
                  }
                }
                document.querySelector('tbody').innerHTML = null;
            })

            if(searchResult.length > 0) {
                searchResult.forEach((item, index) => {
                    const $tr = document.createElement('tr');
                      
                    for(const key in item) {
                              const $td = document.createElement('td');
                              $td.innerHTML = item[key];
                              $tr.appendChild($td);
                      }
                                 
                    document.getElementsByTagName('tbody')[0].appendChild($tr);
                  })
                }else {
                    const $tr = document.createElement('tr');
                    const $noResultTd = document.createElement('td');
                    $noResultTd.colSpan = '4';
                    $noResultTd.innerHTML = 'No Result';
                    $tr.appendChild($noResultTd);
                    document.querySelector('tbody').appendChild($tr);
                }
        }
    }

    createTable($dataTableContainer) {
      const $table = document.createElement('table');
      $table.classList.add(this.tableClassName);  //////նոր կլաս  (ռեֆակտրինգ)
      this.table = $table;
      $dataTableContainer.appendChild(this.table);

        this.createThead();
        this.createTbody();
        this.renderData();
        this.createPagination();
        this.createInput();
        this.createSearchField();
    }

testSort(currentElement) {
    
    this.data.sort((a, b) => {
        if(currentElement == 'id-asc'){
            return a.id - b.id
        }else  if(currentElement == 'id-desc'){
            return b.id - a.id
        }else if (currentElement == 'name-desc'){
            if(a.name > b.name){
                return -1
            } else if(a.name < b.name){
                return 1
            }
            return 0
        }else if(currentElement == 'name-asc'){
            if(a.name > b.name){
                return 1
            } else if(a.name < b.name){
                return -1
            }
            return 0
        }else if(currentElement == 'age-asc'){
            return a.age - b.age
        }else {
            return b.age - a.age
        }
        }
    ) 
    this.table.querySelector('tbody').innerHTML = null; 
    document.querySelector('.page-info').innerHTML = null; 
    this.renderData();
    this.createPagination();
}


createThead() {
    const $thead = document.createElement('thead');
    const $tr = document.createElement('tr');

    columns.forEach((item) => {
        const $th = document.createElement('th');
        $th.dataset.filterBy = '';
        $th.innerHTML = item;
        $th.addEventListener('click', (event) =>{
            let $clickedItem = event.target;
            if($clickedItem.dataset.filterBy != (`${item}-asc`)){
                $clickedItem.dataset.filterBy = (`${item}-asc`);
            }else {
                $clickedItem.dataset.filterBy = (`${item}-desc`);
            }
            this.testSort($clickedItem.dataset.filterBy);
        })
   
        $tr.appendChild($th);  
    });

    const $dltTh = document.createElement('th');
    $tr.appendChild($dltTh);
    $thead.appendChild($tr);
    this.table.appendChild($thead);
    }

  createTbody() {
    const $tbody = document.createElement('tbody');
    this.table.appendChild($tbody);
  }

  renderData() {
    this.displayList(0, this.perPageLimit);
  }

  createInput(){
    const $input = document.createElement('input')
    $input.placeholder = '5 rows';
    const $btn = document.createElement('button');
    const dataTable = this;
    $btn.innerHTML="ok";
    $input.classList.add('count-field');
    
    document.querySelector('.page-count-info').appendChild($input);
    document.querySelector('.page-count-info').appendChild($btn);

    $btn.addEventListener('click', () => {
        this.table.querySelector('tbody').innerHTML = null;      //աշխատեց//
        document.querySelector('.page-info').innerHTML = null;
        dataTable.perPageLimit = $input.value;
        dataTable.createPagination();
        dataTable.renderData();
    })
  }

  createPagination(){
    
    if(this.data.length > this.perPageLimit) {
        const paginationBox = document.createElement('div');
        const pageNumber = Math.ceil(this.data.length / this.perPageLimit);
        paginationBox.classList.add('pagination-box')

        for(let i = 1; i <= pageNumber; i++){
            const $pageButton = document.createElement('button');
            $pageButton.classList.add('page-item');
            $pageButton.innerHTML = i;
            paginationBox.appendChild($pageButton);
            if( i==1 ){
                $pageButton.classList.add('page-active');
            }
        }

        document.querySelector('.data-table-container').appendChild(paginationBox);
        document.querySelector('.page-info').appendChild(paginationBox);
        const dataTable = this;
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
            }   
            ) 
        }) 
    }
}

displayList(startCount, endCount) {

    const eachPageItems = this.data.slice(startCount, endCount);
    
    eachPageItems.forEach((item) => {
      const $tr = document.createElement('tr');
        
      for(const key in item) {
                const $td = document.createElement('td');
                $td.innerHTML = item[key];
                $tr.appendChild($td);
        }
        const $deleteTd = document.createElement('td');
        const $tdBtn = document.createElement('button');
        

        const $iIcon = document.createElement('i');
        $iIcon.classList.add('fa');

        $iIcon.classList.add('fa-trash');

        $iIcon.dataset.currentRowId = item.id;
        $tdBtn.appendChild($iIcon)

        $iIcon.addEventListener('click', (event) => {
            console.log(event.target.dataset.currentRowId)
            const indexOfObject = this.data.findIndex(item => {
                return item.id == event.target.dataset.currentRowId;
              });

              this.data.splice(indexOfObject, 1);
              console.log('index', indexOfObject)
              console.log(this.data)
              this.table.querySelector('tbody').innerHTML = null;      //աշխատեց//
            document.querySelector('.page-info').innerHTML = null;
        this.createPagination();
        this.renderData();

        })

        $deleteTd.appendChild($tdBtn);
        $tr.appendChild($deleteTd);


        document.getElementsByTagName('tbody')[0].appendChild($tr);
    })
}
}



// export default DataTable;
const options = {    /////// չեմ հասկացել ինչի համար ա

};

const columns = ['id', 'name', 'age'];

// const columnsObject = [
//     {
//         value: 'ID';
//         dataIndex: 'id'
//     }
//     {
//         value: 'Name';
//         dataIndex: 'name'
//     }
//     {
//         value: 'Age';
//         dataIndex: 'age';  ///////սրան setAtribute ենք անելու 
//     }

// ]

const data = [
    {
        id: 1,
        name: 'Albert',
        age: 60,
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
        name: 'Gevorg',
        age: 25,
    },
    {
        id: 21,
        name: 'Sargis',
        age: 99,
    },
    {
        id: 22,
        name: 'Gevorg',
        age: 67,
    },
    {
        id: 23,
        name: 'Gevorg',
        age: 45,
    },
    {
        id: 24,
        name: 'Hovhannes',
        age: 56,
    },
    {
        id: 25,
        name: 'Haykuhi',
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

const dataTable = new DataTable(columns, data, {});  ///չգիտեմ ոնց ստեղ գրեմ
const $dataTableContainer = document.querySelector('.data-table-container');

dataTable.createTable($dataTableContainer);



