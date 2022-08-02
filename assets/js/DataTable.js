  class DataTable {
    constructor(columns = [], data = [], {
        perPageLimit = 5, 
        rowClassName = 'data-row',
        cellClassName = 'data-cell',
        tableClassName = 'data-table',
    }
    ){
      this.columns = columns;
      this.data = data;
      this.perPageLimit = perPageLimit;
      this.rowClassName = rowClassName;
      this.cellClassName = cellClassName;
      this.tableClassName = tableClassName;
    } ;
    
    createSortingBox(){
        const $label = document.createElement('label');
        $label.innerHTML = 'Sort by:';
        const $select = document.createElement('select');
        const $optionIdAsc = document.createElement('option');
        const $optionIdDesc = document.createElement('option');
        $optionIdAsc.value = 'id-asc'; 
        $optionIdAsc.innerHTML = 'by id asc';
        $optionIdDesc.value = 'id-desc'; 
        $optionIdDesc.innerHTML = 'by id desc';
        const $optionNameAsc = document.createElement('option');
        const $optionNameDesc = document.createElement('option');

        $optionNameAsc.value = 'name-asc'; 
        $optionNameAsc.innerHTML = 'by name asc';
        $optionNameDesc.value = 'name-desc'; 
        $optionNameDesc.innerHTML = 'by name desc';
        const $optionAgeAsc = document.createElement('option');
        const $optionAgeDesc = document.createElement('option');
        $optionAgeAsc.value = 'age-asc'; 
        $optionAgeAsc.innerHTML = 'by age asc'; 
        $optionAgeDesc.value = 'age-desc'; 
        $optionAgeDesc.innerHTML = 'by age desc'; 
        const data = this.data;

        $select.onchange = () => {

               data.sort((a, b) => {
                if($select.value == 'id-asc'){
                    return a.id - b.id
                }else  if($select.value == 'id-desc'){
                    return b.id - a.id
                }else if ($select.value == 'name-asc'){
                    if(a.name > b.name){
                        return -1
                    } else if(a.name < b.name){
                        return 1
                    }
                    return 0
                }else if($select.value == 'name-desc'){
                    if(a.name > b.name){
                        return 1
                    } else if(a.name < b.name){
                        return -1
                    }
                    return 0
                }else if($select.value == 'age-asc'){
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
        };

        document.querySelector('.table-options').appendChild($label);
        $label.appendChild($select);
        $select.appendChild($optionIdAsc);
        $select.appendChild($optionIdDesc);
        $select.appendChild($optionNameAsc);
        $select.appendChild($optionNameDesc);
        $select.appendChild($optionAgeAsc);
        $select.appendChild($optionAgeDesc);
   
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
        this.createSortingBox();

    }

  createThead() {
    const $thead = document.createElement('thead');
    const $tr = document.createElement('tr');   
    $tr.classList.add(this.rowClassName);    //////նոր կլաս
    this.columns.forEach((column) => {
      const $th = document.createElement('th');
      $th.innerHTML = column;
      $tr.appendChild($th);
    });

    $thead.appendChild($tr);
    this.table.appendChild($thead)

    // $optionAge.addEventListener('click')
   
    };
// console.log(on)



  

  
    


  createTbody() {
    const $tbody = document.createElement('tbody');
    this.table.appendChild($tbody);

    /////////////////////
    // console.log(sortByAge);     ////////////////////
  }

  renderData() {
        // const byId = data.sort((a, b) => b.id - a.id);
        // console.log(sort());
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
        // console.log($input.value);
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
            // document.querySelector('page-item').innerHTML = null;      //------չաշխատեց//

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
        // const $dataTableContainer = document.querySelector('.data-table-container').appendChild(paginationBox);
        // if(document.querySelector('.pagination-box') != null){
        //     const $pagination = document.querySelector('.pagination-box');
        //     $dataTableContainer
        // }
    }
}

displayList(startCount, endCount) {

    const eachPageItems = this.data.slice(startCount, endCount);
    
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
const options = {    /////// չեմ հասկացել ինչի համար ա

};

const columns = ['id', 'name', 'age'];

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
        name: 'Baghdasar',
        age: 25,
    },
    {
        id: 21,
        name: 'Sargis',
        age: 99,
    },
    {
        id: 22,
        name: 'Hripsime',
        age: 67,
    },
    {
        id: 23,
        name: 'Geo',
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







